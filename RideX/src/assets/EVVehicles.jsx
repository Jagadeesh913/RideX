import React, { useState } from 'react';
import { Heart, MapPin, Zap, Star, Eye, Share2, Calendar } from 'lucide-react';

const PremiumEVCard = ({ vehicle, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => `₹ ${price?.toLocaleString('en-IN')}`;

  const cardTransforms = {
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const ActionBtn = ({ onClick, bg, color, children }) => (
    <button onClick={onClick} style={{ padding: '0.5rem', borderRadius: '50%', backdropFilter: 'blur(16px)', backgroundColor: bg, color, transition: 'all 0.3s ease', boxShadow: isLiked ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none' }}>
      {children}
    </button>
  );

  const DetailBox = ({ icon, iconColor, bgColor, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
      <div style={{ padding: '0.5rem', backgroundColor: bgColor, borderRadius: '0.5rem' }}>
        {React.cloneElement(icon, { size: 16, color: iconColor })}
      </div>
      <div>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>{label}</div>
        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ease-out transform cursor-pointer border border-gray-100"
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => onClick(vehicle)} style={cardTransforms}>
        
        {/* Badges and Actions */}
        <div className="absolute top-4 left-4 z-20">
          <div style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.75rem', borderRadius: '9999px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Zap size={12} />Electric
          </div>
        </div>

        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <ActionBtn onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} bg={isLiked ? '#ef4444' : 'rgba(255, 255, 255, 0.8)'} color={isLiked ? 'white' : '#4b5563'}>
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </ActionBtn>
          <ActionBtn onClick={(e) => e.stopPropagation()} bg="rgba(255, 255, 255, 0.8)" color="#4b5563">
            <Share2 size={16} />
          </ActionBtn>
        </div>

        {/* Main Image */}
        <div style={{ position: 'relative', height: '14rem', overflow: 'hidden', background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
          <img src={vehicle.photos?.[0]?.url || 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&crop=center'} alt={`${vehicle.make} ${vehicle.model}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&crop=center'; }} />
          
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 50%, transparent 100%)' }} />
          
          <div className="absolute bottom-4 left-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
              <Eye size={12} /><span>{Math.floor(Math.random() * 200 + 50)} views</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.9)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              🌱 ECO
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Vehicle Info Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', lineHeight: '1.25' }}>{vehicle.make} {vehicle.model}</h3>
              <span style={{ fontSize: '0.875rem', color: '#059669', backgroundColor: '#d1fae5', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontWeight: '500' }}>{vehicle.year}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>{vehicle.rating || '4.7'}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>({vehicle.reviews || Math.floor(Math.random() * 50 + 10)} reviews)</span>
            </div>
          </div>

          {/* Price Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: '900', background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {formatPrice(vehicle.listPrice)}
            </div>
            <div style={{ height: '0.25rem', width: '4rem', background: 'linear-gradient(135deg, #10b981, #06b6d4)', borderRadius: '9999px' }} />
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '500' }}>💰 Save ₹{Math.floor(Math.random() * 50000 + 10000).toLocaleString('en-IN')} on fuel/year</div>
          </div>

          {/* Feature Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Zero Emission', 'Fast Charging', 'Smart Features'].slice(0, 3).map((feature, idx) => (
              <span key={idx} style={{ fontSize: '0.75rem', background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', color: '#065f46', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid #34d399', fontWeight: '500' }}>
                {feature}
              </span>
            ))}
          </div>

          {/* Vehicle Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4b5563' }}>
              <DetailBox icon={<Zap />} iconColor="#10b981" bgColor="#d1fae5" label="Range" value={`${vehicle.range || Math.floor(Math.random() * 200 + 100)} km`} />
              <DetailBox icon={<MapPin />} iconColor="#4f46e5" bgColor="#e0e7ff" label="Location" value={vehicle.location || 'Hyderabad, TG'} />
            </div>

            {/* Charging Information */}
            <div style={{ backgroundColor: '#f0fdf4', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Zap size={14} color="#16a34a" />
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#15803d' }}>Fast Charging Available</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#166534', margin: 0 }}>0-80% in {Math.floor(Math.random() * 60 + 30)} minutes</p>
            </div>

            {/* Dealer Information */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', background: 'linear-gradient(135deg, #10b981, #06b6d4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  {(vehicle.dealer || vehicle.shopName || 'EV').charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>{vehicle.dealer || vehicle.shopName || 'EV Specialist'}</span>
                    <div style={{ width: '1rem', height: '1rem', backgroundColor: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" fill="white" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontSize: '0.75rem', color: '#4b5563' }}>4.9 rating</span>
                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>• EV Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem' }}>
            <button onClick={(e) => { e.stopPropagation(); onClick(vehicle); }} style={{ flex: 1, background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: 'white', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', transform: isHovered ? 'scale(1.05)' : 'scale(1)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              Test Drive
            </button>
            <button onClick={(e) => e.stopPropagation()} style={{ padding: '0.75rem 1rem', border: '2px solid #10b981', color: '#059669', borderRadius: '0.75rem', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <Calendar size={20} />
            </button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: '1.5rem', transition: 'opacity 0.5s ease', pointerEvents: 'none', opacity: isHovered ? 1 : 0, background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1))' }} />
      </div>
    </div>
  );
};

const EVVehicles = ({ vehicles, onCardClick }) => (
  <div style={{ padding: '2rem 0' }}>
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #10b981, #06b6d4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', textAlign: 'center', marginBottom: '0.5rem' }}>
        ⚡ Premium Electric Vehicles
      </h2>
      <div style={{ height: '0.25rem', width: '6rem', background: 'linear-gradient(135deg, #10b981, #06b6d4)', borderRadius: '9999px', margin: '0 auto' }} />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      {vehicles.map((vehicle) => (
        <PremiumEVCard key={vehicle._id} vehicle={vehicle} onClick={onCardClick} />
      ))}
    </div>
  </div>
);

export default EVVehicles;