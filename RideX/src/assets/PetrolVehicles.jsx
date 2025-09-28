import React, { useState } from "react";
import { Heart, MapPin, Gauge, Star, Eye, Share2, Calendar } from "lucide-react";

const PremiumVehicleCard = ({ vehicle, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => `₹ ${price?.toLocaleString("en-IN")}`;

  const cardStyles = {
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const ActionBtn = ({ onClick, isActive, children, customStyle = {} }) => (
    <button onClick={onClick} style={{ padding: "0.5rem", borderRadius: "50%", backdropFilter: "blur(16px)", backgroundColor: isActive ? "#ef4444" : "rgba(255, 255, 255, 0.8)", color: isActive ? "white" : "#4b5563", transition: "all 0.3s ease", boxShadow: isActive ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none", ...customStyle }}>
      {children}
    </button>
  );

  const DetailItem = ({ icon, iconColor, bgColor, label, value }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
      <div style={{ padding: "0.5rem", backgroundColor: bgColor, borderRadius: "0.5rem" }}>
        {React.cloneElement(icon, { size: 16, color: iconColor })}
      </div>
      <div>
        <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: "500" }}>{label}</div>
        <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937" }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ease-out transform cursor-pointer border border-gray-100"
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => onClick(vehicle)} style={cardStyles}>
        
        {/* Badge & Action Buttons */}
        <div className="absolute top-4 left-4 z-20">
          <div style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", fontSize: "0.75rem", fontWeight: "bold", padding: "0.25rem 0.75rem", borderRadius: "9999px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
            Petrol
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <ActionBtn onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} isActive={isLiked}>
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </ActionBtn>
          <ActionBtn onClick={(e) => e.stopPropagation()}>
            <Share2 size={16} />
          </ActionBtn>
        </div>

        {/* Vehicle Image */}
        <div style={{ position: "relative", height: "14rem", overflow: "hidden", background: "linear-gradient(135deg, #fef3c7, #fed7aa)" }}>
          <img src={vehicle.photos?.[0]?.url || "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center"} alt={`${vehicle.make} ${vehicle.model}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease", transform: isHovered ? "scale(1.1)" : "scale(1)" }}
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center"; }} />

          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 50%, transparent 100%)" }} />

          <div className="absolute bottom-4 left-4">
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)", color: "white", fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "9999px" }}>
              <Eye size={12} />
              <span>{Math.floor(Math.random() * 200 + 50)} views</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          {/* Vehicle Header */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#1f2937", lineHeight: "1.25" }}>
                {vehicle.make} {vehicle.model}
              </h3>
              <span style={{ fontSize: "0.875rem", color: "#6b7280", backgroundColor: "#f3f4f6", padding: "0.25rem 0.5rem", borderRadius: "0.5rem", fontWeight: "500" }}>
                {vehicle.year}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151" }}>{vehicle.rating || "4.5"}</span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                ({vehicle.reviews || Math.floor(Math.random() * 50 + 10)} reviews)
              </span>
            </div>
          </div>

          {/* Price Display */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <div style={{ fontSize: "1.875rem", fontWeight: "900", color: "#059669" }}>{formatPrice(vehicle.listPrice)}</div>
            <div style={{ height: "0.25rem", width: "4rem", backgroundColor: "#059669", borderRadius: "9999px" }} />
          </div>

          {/* Feature Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["Single Owner", "Service Records", "Insurance Valid"].slice(0, 3).map((feature, index) => (
              <span key={index} style={{ fontSize: "0.75rem", backgroundColor: "#f0f9ff", color: "#0369a1", padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid #0ea5e9", fontWeight: "500" }}>
                {feature}
              </span>
            ))}
          </div>

          {/* Vehicle Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingTop: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#4b5563" }}>
              <DetailItem icon={<Gauge />} iconColor="#f59e0b" bgColor="#fef3c7" label="Mileage" value={`${vehicle.mileage?.toLocaleString() || "0"} km`} />
              <DetailItem icon={<MapPin />} iconColor="#16a34a" bgColor="#dcfce7" label="Location" value={vehicle.location || "Hyderabad, TG"} />
            </div>

            {/* Seller Information */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", backgroundColor: "#3b82f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "0.875rem" }}>
                  {(vehicle.dealer || vehicle.shopName || "Dealer").charAt(0)}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#1f2937" }}>
                      {vehicle.dealer || vehicle.shopName || "Authorized Dealer"}
                    </span>
                    <div style={{ width: "1rem", height: "1rem", backgroundColor: "#3b82f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" fill="white" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontSize: "0.75rem", color: "#4b5563" }}>4.8 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "1rem" }}>
            <button onClick={(e) => { e.stopPropagation(); onClick(vehicle); }} style={{ flex: 1, backgroundColor: "#3b82f6", color: "white", fontWeight: "bold", padding: "0.75rem 1.5rem", borderRadius: "0.75rem", border: "none", cursor: "pointer", transition: "all 0.3s ease", transform: isHovered ? "scale(1.05)" : "scale(1)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              Contact Seller
            </button>
            <button onClick={(e) => e.stopPropagation()} style={{ padding: "0.75rem 1rem", border: "2px solid #e5e7eb", color: "#374151", borderRadius: "0.75rem", backgroundColor: "transparent", cursor: "pointer", transition: "all 0.3s ease" }}>
              <Calendar size={20} />
            </button>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "1.5rem", transition: "opacity 0.5s ease", pointerEvents: "none", opacity: isHovered ? 1 : 0, background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))" }} />
      </div>
    </div>
  );
};

const PetrolVehicles = ({ vehicles, onCardClick }) => {
  const displayVehicles = vehicles.slice(0, 3);

  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#1a202c", textAlign: "center", marginBottom: "0.5rem" }}>
          Premium Petrol Vehicles
        </h2>
        <div style={{ height: "0.25rem", width: "6rem", backgroundColor: "#3b82f6", borderRadius: "9999px", margin: "0 auto" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        {displayVehicles.map((vehicle) => (
          <PremiumVehicleCard key={vehicle._id} vehicle={vehicle} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
};

export default PetrolVehicles;