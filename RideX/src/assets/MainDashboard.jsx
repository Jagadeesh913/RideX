import React, { useState } from 'react';
import PetrolVehicles from './PetrolVehicles';
import EVVehicles from './EVVehicles'; 
import AppFooter from './AppFooter';
import LaunchCountdown from './LaunchCountdown';
import VehicleDetailsModal from './VehicleDetailsModal';
import SearchResults from './SearchResults';
import vehicleData from '../data/vehicles.json';

function MainDashboard({ searchTerm }) { 
  const [activeModalVehicle, setActiveModalVehicle] = useState(null);
  const isSearching = searchTerm?.trim().length > 0;
  
  const [petrolList, evList, dealList] = [
    vehicleData.filter(v => v.fuelType === 'Petrol'),
    vehicleData.filter(v => v.fuelType === 'EV'),
    vehicleData.filter(v => v.isDeal === true)
  ];
  const dealsToDisplay = dealList.slice(0, 3);
  const genericExpiryTime = React.useMemo(() => new Date().getTime() + (24 * 60 * 60 * 1000), []);

  const handleCardClick = (vehicle) => setActiveModalVehicle(vehicle);
  const handleCloseModal = () => setActiveModalVehicle(null);

  const styles = {
    mainDashboardContainer: { minHeight: '100vh', backgroundColor: '#f8fafc',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '40px' },
    dashboardTitle: { fontSize: '2.5rem', fontWeight: '800', color: '#e00808ff', textAlign: 'center',
      margin: '40px 0 50px 0', letterSpacing: '-0.025em', lineHeight: '1.2', position: 'relative',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' },
    dealsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '32px',
      margin: '0 auto 80px auto', padding: '0 20px', maxWidth: '1400px' },
    dealCard: { position: 'relative', backgroundColor: '#ffffff', borderRadius: '24px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', overflow: 'hidden',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.2)', opacity: 1, transform: 'scale(1)' },
    dealImageContainer: { position: 'relative', height: '240px', overflow: 'hidden',
      background: 'linear-gradient(135deg, #fef3c7, #fed7aa)' },
    dealImage: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' },
    gradientOverlay: { position: 'absolute', inset: 0,
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 50%, transparent 100%)' },
    dealTag: { position: 'absolute', top: '16px', right: '16px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
      color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
      textTransform: 'uppercase', letterSpacing: '0.5px', zIndex: 10, boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)' },
    dealInfo: { padding: '32px', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)' },
    dealName: { fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '12px', letterSpacing: '-0.025em' },
    releaseDateText: { fontSize: '0.95rem', color: '#3b82f6', fontWeight: '600', marginBottom: '18px',
      padding: '10px 16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px',
      border: '1px solid rgba(59, 130, 246, 0.2)', backdropFilter: 'blur(4px)' },
    priceDetails: { marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' },
    oldPrice: { fontSize: '1.1rem', color: '#9ca3af', textDecoration: 'line-through', fontWeight: '500' },
    dealPrice: { fontSize: '1.6rem', fontWeight: '900', color: '#059669', marginBottom: '8px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' },
    placeholderDeal: { backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '2px dashed #d1d5db',
      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '380px', position: 'relative',
      borderRadius: '24px', backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)' },
    placeholderBackground: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%)', borderRadius: '24px' },
    dealPlaceholderText: { fontSize: '1.3rem', fontWeight: '700', color: '#6b7280', textAlign: 'center',
      position: 'relative', zIndex: 1, textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' },
    sectionContainer: { margin: '80px 0', position: 'relative' },
    hoverGlow: { position: 'absolute', inset: 0, borderRadius: '24px', transition: 'opacity 0.5s ease',
      pointerEvents: 'none', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))' }
  };

  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes shimmerEffect { 0% { background-position: -200px 0; } 100% { background-position: calc(200px + 100%) 0; } }
      .deal-card { animation: fadeInUp 0.8s ease-out; }
      .deal-card:nth-child(2) { animation-delay: 0.15s; }
      .deal-card:nth-child(3) { animation-delay: 0.3s; }
      .placeholder-shimmer { background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0)); background-repeat: no-repeat; background-size: 200px 100%; animation: shimmerEffect 2s infinite; }
      @media (max-width: 768px) { .deals-grid { grid-template-columns: 1fr; padding: 0 16px; gap: 24px; } .dashboard-title { font-size: 2.2rem; margin: 30px 0 40px 0; } }
      @media (max-width: 480px) { .dashboard-title { font-size: 1.9rem; margin: 24px 0 32px 0; } .deal-info { padding: 24px; } .deal-name { font-size: 1.5rem; } }`;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const handleCardHover = (e) => {
    const card = e.currentTarget;
    const [image, glow] = [card.querySelector('.deal-image'), card.querySelector('.hover-glow')];
    
    Object.assign(card.style, {
      opacity: '0.95', transform: 'scale(1.02) translateY(-4px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', borderColor: 'rgba(59, 130, 246, 0.3)'
    });
    if (image) image.style.transform = 'scale(1.08)';
    if (glow) glow.style.opacity = '1';
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    const [image, glow] = [card.querySelector('.deal-image'), card.querySelector('.hover-glow')];
    
    Object.assign(card.style, {
      opacity: '1', transform: 'scale(1) translateY(0)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)'
    });
    if (image) image.style.transform = 'scale(1)';
    if (glow) glow.style.opacity = '0';
  };

  const DealCard = ({ deal, index }) => {
    const targetDate = deal.releaseDate || genericExpiryTime;
    return (
      <div className="deal-card" key={deal._id} onClick={() => handleCardClick(deal)}
        style={{ ...styles.dealCard, animationDelay: `${index * 0.15}s` }}
        onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
        
        <div style={styles.dealImageContainer}>
          <img src={deal.photos[0]?.url || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center'}
            alt={`${deal.make} ${deal.model} Deal`} className="deal-image" style={styles.dealImage}
            onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center'} />
          <div style={styles.gradientOverlay} />
        </div>
        
        <div style={styles.dealTag}>{deal.releaseDate ? 'UPCOMING LAUNCH' : 'FLASH SALE'}</div>
        
        <div style={styles.dealInfo}>
          <h3 style={styles.dealName}>{deal.make} {deal.model}</h3>
          
          {deal.releaseDate && (
            <p style={styles.releaseDateText}>
              Releases on: {new Date(deal.releaseDate).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </p>
          )}

          <LaunchCountdown releaseDate={targetDate} />

          <div style={styles.priceDetails}>
            {deal.oldPrice && <p style={styles.oldPrice}>₹ {deal.oldPrice.toLocaleString('en-IN')}</p>}
            <p style={styles.dealPrice}>NOW: ₹ {deal.listPrice.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="hover-glow" style={{ ...styles.hoverGlow, opacity: 0 }} />
      </div>
    );
  };

  const PlaceholderCard = ({ index }) => (
    <div key={`ph-${index}`} style={{ ...styles.dealCard, ...styles.placeholderDeal,
      animationDelay: `${(dealsToDisplay.length + index) * 0.15}s` }} className="placeholder-shimmer">
      <div style={styles.placeholderBackground}></div>
      <p style={styles.dealPlaceholderText}>Next Deal Coming Soon</p>
    </div>
  );

  return (
    <div style={styles.mainDashboardContainer}>
      {isSearching ? (
        <>
          <SearchResults searchTerm={searchTerm} />
          <AppFooter />
        </>
      ) : (
        <>
          <div style={{ position: 'relative' }}>
            <h2 className="dashboard-title" style={styles.dashboardTitle}>🔥 Upcoming New Launches</h2>
          </div>
          
          <div className="deals-grid" style={styles.dealsGrid}>
            {dealsToDisplay.map((deal, index) => <DealCard key={deal._id} deal={deal} index={index} />)}
            {Array(3 - dealsToDisplay.length).fill(0).map((_, index) => 
              <PlaceholderCard key={`ph-${index}`} index={index} />)}
          </div>
          
          <div style={styles.sectionContainer}>
            <PetrolVehicles vehicles={petrolList} onCardClick={handleCardClick} />
          </div>
          
          <div style={styles.sectionContainer}>
            <EVVehicles vehicles={evList} onCardClick={handleCardClick} />
          </div>
          
          <AppFooter />
        </>
      )}

      <VehicleDetailsModal vehicle={activeModalVehicle} onClose={handleCloseModal} />
    </div>
  );
}

export default MainDashboard;