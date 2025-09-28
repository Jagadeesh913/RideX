const express = require("express");
const User = require("./models/user");
const validateSignUpData = require("./utils/validationUser");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("./DB/db");
const { userAuth } = require("./middlewares/auth");
const Bike = require("./models/newBike");
const validateBikeData = require("./utils/validationBike");

const Dealer = require("./models/dealer");
const validateDealerData = require("./utils/validationDealer");
const { dealerAuth } = require("./middlewares/dealerAuth");


const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cookieParser());

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // allow cookies & auth headers
}));

app.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);

        const { name, age, gender, password, emailId } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ name, emailId, password: passwordHash, age, gender });
        await user.save();

        res.send("Signup successful");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!validator.isEmail(emailId)) {
            throw new Error("Enter valid email");
        }

        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Account not found");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        const token = user.getJWT();
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 3600000 });
        res.send(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("Logged out successfully");
});

app.get("/profile", userAuth, async (req, res) => {
    res.send(req.user); // send the logged-in user
});

app.patch("/updateUser", userAuth, async (req, res) => {
    try {
        const allowedUpdates = ["name", "age", "gender", "phoneNo", "address", "password"];
        const updates = Object.keys(req.body);

        const isValidUpdate = updates.every((field) => allowedUpdates.includes(field));
        if (!isValidUpdate) {
            return res.status(400).send("Invalid updates");
        }

        updates.forEach((field) => {
            if (field === "password") {
                req.user.password = bcrypt.hashSync(req.body.password, 10);
            } else {
                req.user[field] = req.body[field];
            }
        });

        await req.user.save();
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

app.delete("/deleteUser", userAuth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.clearCookie("token");
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Error at deleteUser: " + err.message);
    }
});

app.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.status(200).json({ 
      message: "User fetched successfully", 
      data: req.user 
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile: " + err.message });
  }
});



app.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request: please check the fields.");
    }

    const loggedInUser = req.user;

    // Only update fields present in the request
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.name}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message || "Something went wrong while updating profile.",
    });
  }
});



app.post("/dealer/signup", async (req, res) => {
    try {
        validateDealerData(req)

        const { name, emailId, password, phoneNo, address } = req.body
        const passwordHash = await bcrypt.hash(password, 10)

        const dealer = new Dealer({
            name, emailId, password: passwordHash, phoneNo, address
        })

        await dealer.save()
        res.send("Dealer signup successful")

    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// dealer login
app.post("/dealer/login", async (req, res) => {
    try {
        const { emailId, password } = req.body

        if (!validator.isEmail(emailId)) {
            throw new Error("Enter valid email")
        }

        const dealer = await Dealer.findOne({ emailId })
        if (!dealer) {
            throw new Error("Account not found")
        }

        const isValid = await dealer.validatePassword(password)
        if (isValid) {
            const token = await dealer.getJWT()
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) })
            res.send("Dealer login successful")
        } else {
            throw new Error("Incorrect password")
        }

    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// dealer profile
app.get("/dealer/profile", dealerAuth, async (req, res) => {
    try {
        res.send(req.dealer)
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// dealer logout
app.post("/dealer/logout", async (req, res) => {
    res.clearCookie("token")
    res.send("Dealer logged out")
})

// dealer adds a new bike
app.post("/dealer/bike", dealerAuth, async (req, res) => {
    try {
        validateBikeData(req)

        const bikeObj = new Bike({
            brand: req.body.brand,
            modelName: req.body.modelName,
            manufactureYear: req.body.manufactureYear,
            mileageKm: req.body.mileageKm,
            price: req.body.price,
            images: req.body.images,
            shopId: req.dealer._id, // dealer linked
            shopName: req.dealer.name,
            shopAddress: req.body.shopAddress,
            shopPhone: req.body.shopPhone,
            conditionStatus: req.body.conditionStatus,
            vehicleType: req.body.vehicleType,
            bikeStatus: req.body.bikeStatus
        })

        await bikeObj.save()
        res.send("Bike added successfully")

    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// dealer adds a used bike
app.post("/dealer/used-bike", dealerAuth, async (req, res) => {
    try {
        validateBikeData(req)

        const usedBikeObj = new UsedBike({
            brand: req.body.brand,
            modelName: req.body.modelName,
            manufactureYear: req.body.manufactureYear,
            mileageKm: req.body.mileageKm,
            price: req.body.price,
            images: req.body.images,
            shopId: req.dealer._id,
            shopName: req.dealer.name,
            shopAddress: req.body.shopAddress,
            shopPhone: req.body.shopPhone,
            conditionStatus: req.body.conditionStatus,
            vehicleType: req.body.vehicleType,
            bikeStatus: "Used",
            previousOwners: req.body.previousOwners,
            registrationNumber: req.body.registrationNumber
        })

        await usedBikeObj.save()
        res.send("Used bike added successfully")

    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// get all bikes added by dealer
app.get("/dealer/bikes", dealerAuth, async (req, res) => {
    try {
        const bikes = await Bike.find({ shopId: req.dealer._id })
        if (!bikes || bikes.length == 0) {
            res.status(400).send("No bikes found")
        } else {
            res.send(bikes)
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// get all used bikes added by dealer
app.get("/dealer/used-bikes", dealerAuth, async (req, res) => {
    try {
        const bikes = await UsedBike.find({ shopId: req.dealer._id })
        if (!bikes || bikes.length == 0) {
            res.status(400).send("No used bikes found")
        } else {
            res.send(bikes)
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// update a bike
app.patch("/dealer/bike", dealerAuth, async (req, res) => {
    try {
        const bikeChanges = req.body
        const bike = await Bike.findById(bikeChanges._id)
        if (!bike || bike.shopId.toString() !== req.dealer._id.toString()) {
            res.status(400).send("Bike not found or not yours")
        } else {
            await Bike.updateOne({ _id: bikeChanges._id }, bikeChanges)
            res.send("Bike updated successfully")
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// delete a bike
app.delete("/dealer/bike", dealerAuth, async (req, res) => {
    try {
        const id = req.body._id
        const bike = await Bike.findById(id)
        if (!bike || bike.shopId.toString() !== req.dealer._id.toString()) {
            res.status(400).send("Bike not found or not yours")
        } else {
            await Bike.deleteOne({ _id: id })
            res.send("Bike deleted successfully")
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

// delete a used bike
app.delete("/dealer/used-bike", dealerAuth, async (req, res) => {
    try {
        const id = req.body._id
        const bike = await UsedBike.findById(id)
        if (!bike || bike.shopId.toString() !== req.dealer._id.toString()) {
            res.status(400).send("Used bike not found or not yours")
        } else {
            await UsedBike.deleteOne({ _id: id })
            res.send("Used bike deleted successfully")
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})


// update a used bike
app.patch("/dealer/used-bike", dealerAuth, async (req, res) => {
    try {
        const bikeChanges = req.body
        const bike = await UsedBike.findById(bikeChanges._id)
        if (!bike || bike.shopId.toString() !== req.dealer._id.toString()) {
            res.status(400).send("Used bike not found or not yours")
        } else {
            await UsedBike.updateOne({ _id: bikeChanges._id }, bikeChanges)
            res.send("Used bike updated successfully")
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

app.get("/bikes", async (req, res) => {
    try {
        const bikes = await Bike.find({})
        res.send(bikes)
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

app.get("/used-bikes", async (req, res) => {
    try {
        const bikes = await UsedBike.find({})
        res.send(bikes)
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})



app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
});
