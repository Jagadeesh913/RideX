# 🏍️ RideX: The Ultimate Two-Wheeler Marketplace

## Welcome to RideX! Your Future of Vehicle Shopping.


Have you ever tried to buy a bike online? It's a mess! You jump between manufacturers, check sketchy used sites, and then go searching for an EMI calculator. **RideX was born to end that frustration.**

We built one single, powerful platform that acts as the ultimate digital showroom, combining new bikes, EVs, and trusted used listings with all the tools a buyer needs to decide, finance, and book a ride immediately.

---

## 🛠️ Tech Stack & Architecture

### Frontend Highlights (React.js)
* **Zero-Friction UX:** We replaced clunky navigation with a modern, full-screen search experience, managed by **`Navbar.jsx`** and **`SearchSuggestions.jsx`**.
* **Dynamic Inventory Display:** Listings are handled by dedicated sibling components: **`PetrolVehicles.jsx`** and **`EVVehicles.jsx`**.
* **The Power of Portals:** Critical details (like vehicle specs and seller info) pop up instantly via the **`VehicleDetailsModal.jsx`** component, rendered using React Portals, without losing your place on the main page.
* **Launch Urgency:** The **`LaunchCountdown.jsx`** component provides live timer functionality for upcoming deals.

### Backend Infrastructure (Node.js/Express Ready)
The backend is structured to support modular, role-based operations and is prepared for MongoDB integration.

| Directory / File | Purpose |
| :--- | :--- |
| **Modular Schemas** | Dedicated file structures (`models/`) for **Users, Dealers, New Bikes, and Used Bikes**. |
| **Protected Access** | Middleware is set up for **role-based authentication** (`auth.js`, `dealerAuth.js`). |
| **Validation Utilities** | Clear utilities files are in place to ensure data integrity for all incoming user and bike data. |

### Frontend Technology
| Component | Technology Used |
| :--- | :--- |
| **Frontend Core** | **React.js** (Functional Components, Hooks) |
| **Routing** | **React Router DOM** (`useNavigate`, `Routes`) |
| **Authentication** | Custom **AuthService** with `localStorage` (for persistence) |

---

## ✨ RideX Features Implemented & Planned

### Implemented Core Functionality
* **Instant Search & Filtering:** Functional search logic filtering by Make, Model, and Price Range.
* **Detail Modal:** Displays full vehicle specs, shop address, and dealer contact information.
* **Test Ride Booking:** Dedicated full-page booking form (`/booking-form`) that captures necessary details.
* **Authentication:** Fully functional Customer Login/Register and **Dealer Login/Registration** flows (implemented using `DealerLogin.jsx` and `DealerRegistration.jsx`).
* **Dealer Dashboard:** Implemented the foundational dashboard view for dealers to manage listings and view stats.
* **Personalized Favorites:** Implemented the structure for **Add to Favorites** for logged-in users.

### Future/Planned Features
* **Comparison Engine:** Implementing the **side-by-side comparison** component.
* **Finance Suite:** Activating the **EMI and Fuel Cost Calculator** components.
* **Email Notifications:** Integrate a service layer for sending automated booking confirmations.

---

## 👥 Meet the Debuggers: Team Contributions

| Member Name | Core Contribution |
| :--- | :--- |
| **Jagadeesh Sakhamuri** | **Backend Lead & Persistence:** Built the core Node.js architecture, defined the modular database schemas, and implemented local session management (Login/Logout/Roles). |
| **Somanadh Gunti** | **Frontend Architecture & Navigation:** Designed the scalable router structure, implemented the dynamic Navbar, Footer, and integrated the **Live Countdown Timer** logic. |
| **Rahul Das** | **Filtering & Features:** Implemented the full **Search and Multi-Parameter Filtering Logic**. Prepared the codebase for EMI and finance tool integration. |
| **Naga Srinivasa Rao Kotapati** | **Visual Design & Components:** Implemented and styled the responsive **Image Carousels**, fixed image loading issues, and focused on overall component excellence. |
| **Vasam Jeshwanth** | **User Conversion & Flow:** Designed and implemented the complete **Test Ride Booking Flow**, including the vehicle detail modal and the redirect to the final booking page. |

