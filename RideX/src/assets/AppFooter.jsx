import { useState } from 'react';
import { Mail, MapPin, Phone, Users, Code, Palette, Layers, Zap, Github, Linkedin, Twitter } from 'lucide-react';

function AppFooter() {
  const [hoveredTeamMember, setHoveredTeamMember] = useState(null);

  const baseStyles = {
    footer: { background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', color: '#e2e8f0', position: 'relative', overflow: 'hidden' },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)', pointerEvents: 'none' },
    container: { maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 2rem', position: 'relative', zIndex: 1 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '3rem' },
    sectionTitle: { fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    linkList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    link: { color: '#cbd5e1', textDecoration: 'none', transition: 'all 0.3s ease', padding: '0.5rem 0', borderRadius: '0.25rem' },
    contactItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' },
    teamSection: { background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)', borderRadius: '1rem', padding: '2rem', marginBottom: '3rem', border: '1px solid rgba(148, 163, 184, 0.1)' },
    teamGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    teamMember: { background: 'rgba(15, 23, 42, 0.5)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(148, 163, 184, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative', overflow: 'hidden' },
    memberAvatar: { width: '3rem', height: '3rem', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.125rem' },
    memberEmail: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontSize: '0.875rem', textDecoration: 'none', marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.3s ease' },
    bottomBar: { borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' },
    brandCredit: { color: '#60a5fa', fontSize: '0.95rem', fontWeight: 600, margin: 0, background: 'linear-gradient(135deg, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    socialLink: { width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', transition: 'all 0.3s ease', textDecoration: 'none' }
  };

  const sections = [
    { title: 'Marketplace', icon: Zap, links: [
      { text: 'New Petrol Vehicles', href: '/listings?type=petrol' },
      { text: 'Electric Vehicles (EV)', href: '/listings?type=ev' },
      { text: 'Pre-Owned Market', href: '/used' },
      { text: 'Dealer Showrooms', href: '/showrooms' },
      { text: 'Upcoming Launches', href: '/launches' }
    ]},
    { title: 'Resources', icon: Code, links: [
      { text: 'EMI & Fuel Calculators', href: '/finance' },
      { text: 'Price Alert Setup', href: '/alerts' },
      { text: 'Reviews & Ratings', href: '/reviews' },
      { text: 'Your Favorites', href: '/favorites' },
      { text: 'Smart Recommendations', href: '/recommendations' }
    ]},
    { title: 'Legal', icon: Layers, links: [
      { text: 'Privacy Statement', href: '/privacy' },
      { text: 'Terms of Use', href: '/terms' },
      { text: 'Cookie Policy', href: '/cookies' },
      { text: 'Site Map', href: '/sitemap' }
    ]}
  ];

  const teamMembers = [
    { name: 'Jagadeesh Sahkamuri', role: 'Team Lead', email: '231fa04913@gmail.com', icon: Users, initials: 'JS' },
    { name: 'Rahul Das', role: 'Logic & Advanced Development', email: 'rahul.das@ridex.com', icon: Code, initials: 'RD' },
    { name: 'Somanadh Gunti', role: 'Frontend Architecture', email: 'somanadh.gunti@ridex.com', icon: Layers, initials: 'SG' },
    { name: 'Naga Srinivasa Rao', role: 'Visual Design & Component Excellence', email: 'srinivasa.rao@ridex.com', icon: Palette, initials: 'NSR' },
    { name: 'Vasan Jeswanth', role: 'Core User Conversion Flow', email: 'vasan.jeswanth@ridex.com', icon: Zap, initials: 'VJ' }
  ];

  const LinkComponent = ({ href, children, style = baseStyles.link }) => (
    <a href={href} style={style} 
       onMouseEnter={(e) => { e.target.style.color = '#60a5fa'; e.target.style.transform = 'translateX(8px)'; }}
       onMouseLeave={(e) => { e.target.style.color = '#cbd5e1'; e.target.style.transform = 'translateX(0)'; }}>
      {children}
    </a>
  );

  return (
    <footer style={baseStyles.footer}>
      <div style={baseStyles.overlay}></div>
      <div style={baseStyles.container}>
        <div style={baseStyles.grid}>
          {sections.map((section, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={baseStyles.sectionTitle}>
                <section.icon size={20} />
                {section.title}
              </h3>
              <ul style={baseStyles.linkList}>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}><LinkComponent href={link.href}>{link.text}</LinkComponent></li>
                ))}
              </ul>
            </div>
          ))}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={baseStyles.sectionTitle}><MapPin size={20} />Corporate</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={baseStyles.contactItem}><MapPin size={16} /><span>Global HQ, Tech Avenue, India</span></div>
              <div style={baseStyles.contactItem}><Mail size={16} /><span>support@ridex.com</span></div>
              <div style={baseStyles.contactItem}><Phone size={16} /><span>careers@ridex.com</span></div>
              <div style={baseStyles.contactItem}><Users size={16} /><LinkComponent href="/dealer-login">Dealer Portal - Login / Register</LinkComponent></div>
            </div>
          </div>
        </div>

        <div style={baseStyles.teamSection}>
          <h2 style={{ ...baseStyles.sectionTitle, fontSize: '1.5rem', textAlign: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Users size={24} />Meet Team Debuggers
          </h2>
          <div style={baseStyles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{
                ...baseStyles.teamMember,
                ...(hoveredTeamMember === index ? { transform: 'translateY(-4px)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)', borderColor: 'rgba(59, 130, 246, 0.3)' } : {})
              }} onMouseEnter={() => setHoveredTeamMember(index)} onMouseLeave={() => setHoveredTeamMember(null)}>
                <member.icon style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.3, width: '2rem', height: '2rem' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={baseStyles.memberAvatar}>{member.initials}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f1f5f9', margin: 0 }}>{member.name}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>{member.role}</p>
                  </div>
                </div>
                <a href={`mailto:${member.email}`} style={{
                  ...baseStyles.memberEmail,
                  ...(hoveredTeamMember === index ? { backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.4)' } : {})
                }}>
                  <Mail size={16} />{member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <div style={baseStyles.bottomBar}>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>© {new Date().getFullYear()} RideX. All rights reserved.</p>
          <p style={baseStyles.brandCredit}>Developed with passion by Team Debuggers</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {[Github, Linkedin, Twitter].map((Icon, idx) => (
              <a key={idx} href="#" style={baseStyles.socialLink}
                 onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'; e.target.style.color = '#60a5fa'; }}
                 onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(148, 163, 184, 0.1)'; e.target.style.color = '#94a3b8'; }}>
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;