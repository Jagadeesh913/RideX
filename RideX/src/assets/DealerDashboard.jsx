import React, { useState } from 'react';
import { 
  Plus, DollarSign, Users, LogOut, Edit3, Eye, BarChart3, 
  Calendar, Star, Clock, Building, Phone, Mail, MapPin, Bike, Award, 
  MessageSquare, Camera, Filter, Bell, X, Save, Upload
} from 'lucide-react';

const DealerDashboard = ({ onLogout, userInfo }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddBikeModal, setShowAddBikeModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPhotoStudio, setShowPhotoStudio] = useState(false);
  const [showInquiries, setShowInquiries] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [timeFilter, setTimeFilter] = useState('This Month');

  const [stats, setStats] = useState({ 
    totalListings: 0, totalValue: 0, activeBikes: 0, 
    soldThisMonth: 0, viewsThisWeek: 0, inquiries: 0 
  });
  const [recentListings, setRecentListings] = useState([]);
  const [profile, setProfile] = useState({
    name: userInfo?.name || 'admin',
    email: userInfo?.email || '231f604974@gmail.com',
    phone: '7896541235',
    businessName: userInfo?.businessName || 'BikeShop Pro',
    location: 'chirala - 523155',
    joinDate: 'September 2025',
    rating: 4.8,
    totalSales: 0,
    experience: 'Beginner'
  });
  const [newBike, setNewBike] = useState({
    brand: '', model: '', year: '', price: '', category: 'Sport Bikes'
  });

  const notifications = [
    { id: 1, message: 'New inquiry on Honda CBR 600RR', time: '2 mins ago', unread: true },
    { id: 2, message: 'Your listing has been viewed 15 times today', time: '1 hour ago', unread: true },
    { id: 3, message: 'Welcome to RideX Pro!', time: 'Just now', unread: false }
  ];

  const inquiries = [
    { id: 1, customer: 'John Doe', bike: 'Honda CBR 600RR', message: 'Is this bike still available?', time: '2 hours ago' },
    { id: 2, customer: 'Sarah Smith', bike: 'Yamaha R15', message: 'Can I schedule a test ride?', time: '1 day ago' }
  ];

  const quickActions = [
    { icon: Camera, title: 'Photo Studio', desc: 'Upload and manage bike photos', onClick: () => setShowPhotoStudio(true) },
    { icon: MessageSquare, title: 'Customer Inquiries', desc: 'View and respond to buyer messages', onClick: () => setShowInquiries(true) },
    { icon: BarChart3, title: 'Sales Analytics', desc: 'Track your performance and insights', onClick: () => setShowAnalytics(true) }
  ];

  const performanceData = [
    { icon: <Bike size={28} color="#f97316" />, value: stats.totalListings, title: 'Total Inventory', desc: 'Active listings' },
    { icon: <DollarSign size={28} color="#10b981" />, value: `₹${stats.totalValue.toLocaleString()}`, title: 'Portfolio Value', desc: 'Current inventory worth' },
    { icon: <Eye size={28} color="#3b82f6" />, value: stats.viewsThisWeek.toLocaleString(), title: 'Profile Views', desc: 'This week' },
    { icon: <MessageSquare size={28} color="#f59e0b" />, value: stats.inquiries, title: 'Active Leads', desc: 'Customer inquiries' }
  ];

  const profileInfo = [
    { icon: <Building size={20} color="#6b7280" />, label: 'Business Name', value: profile.businessName },
    { icon: <Users size={20} color="#6b7280" />, label: 'Owner Name', value: profile.name },
    { icon: <Phone size={20} color="#6b7280" />, label: 'Phone Number', value: profile.phone },
    { icon: <Mail size={20} color="#6b7280" />, label: 'Email Address', value: profile.email },
    { icon: <MapPin size={20} color="#6b7280" />, label: 'Location', value: profile.location },
    { icon: <Calendar size={20} color="#6b7280" />, label: 'Member Since', value: profile.joinDate }
  ];

  const businessMetrics = [
    { number: stats.soldThisMonth, text: 'Total Sales' },
    { number: `₹${stats.totalValue.toLocaleString()}`, text: 'Revenue' },
    { number: profile.rating, text: 'Rating' },
    { number: '0', text: 'Reviews' }
  ];

  const handleLogout = () => { if (onLogout) onLogout(); };

  const handleAddBike = () => {
    if (newBike.brand && newBike.model && newBike.year && newBike.price) {
      const bike = { id: Date.now(), ...newBike, dateAdded: new Date().toLocaleDateString() };
      setRecentListings([bike, ...recentListings]);
      setStats(prev => ({
        ...prev,
        totalListings: prev.totalListings + 1,
        totalValue: prev.totalValue + parseInt(newBike.price),
        activeBikes: prev.activeBikes + 1
      }));
      setNewBike({ brand: '', model: '', year: '', price: '', category: 'Sport Bikes' });
      setShowAddBikeModal(false);
    }
  };

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setShowEditProfile(false);
  };

  const handlePreviewStore = () => {
    alert('Store preview would open in a new tab showing your public dealer profile');
  };

  const AddBikeModal = () => (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', borderRadius: '12px', padding: '24px',
        maxWidth: '500px', width: '90%', maxHeight: '90vh', overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Add New Bike</h3>
          <button onClick={() => setShowAddBikeModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Brand', key: 'brand', placeholder: 'e.g., Honda, Yamaha, Kawasaki' },
            { label: 'Model', key: 'model', placeholder: 'e.g., CBR 600RR, R15 V4' }
          ].map(field => (
            <div key={field.key}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{field.label}</label>
              <input type="text" value={newBike[field.key]}
                onChange={(e) => setNewBike({...newBike, [field.key]: e.target.value})}
                style={{
                  width: '100%', padding: '12px', border: '1px solid #d1d5db',
                  borderRadius: '8px', fontSize: '14px'
                }}
                placeholder={field.placeholder}
              />
            </div>
          ))}
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Year', key: 'year', type: 'number', placeholder: '2023' },
              { label: 'Price (₹)', key: 'price', type: 'number', placeholder: '125000' }
            ].map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{field.label}</label>
                <input type={field.type} value={newBike[field.key]}
                  onChange={(e) => setNewBike({...newBike, [field.key]: e.target.value})}
                  style={{
                    width: '100%', padding: '12px', border: '1px solid #d1d5db',
                    borderRadius: '8px', fontSize: '14px'
                  }}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category</label>
            <select value={newBike.category}
              onChange={(e) => setNewBike({...newBike, category: e.target.value})}
              style={{
                width: '100%', padding: '12px', border: '1px solid #d1d5db',
                borderRadius: '8px', fontSize: '14px'
              }}>
              {['Sport Bikes', 'Cruisers', 'Scooters', 'Electric'].map(cat => 
                <option key={cat}>{cat}</option>
              )}
            </select>
          </div>
          
          <button onClick={handleAddBike} style={{
            padding: '12px 24px', backgroundColor: '#f97316', color: 'white',
            border: 'none', borderRadius: '8px', fontWeight: '600',
            cursor: 'pointer', marginTop: '16px'
          }}>
            Add Bike to Inventory
          </button>
        </div>
      </div>
    </div>
  );

  const EditProfileModal = () => (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', borderRadius: '12px', padding: '24px',
        maxWidth: '500px', width: '90%', maxHeight: '90vh', overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Edit Profile</h3>
          <button onClick={() => setShowEditProfile(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.keys(profile).filter(key => !['joinDate', 'rating', 'totalSales', 'experience'].includes(key)).map(key => (
            <div key={key}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input type="text" value={profile[key]}
                onChange={(e) => setProfile({...profile, [key]: e.target.value})}
                style={{
                  width: '100%', padding: '12px', border: '1px solid #d1d5db',
                  borderRadius: '8px', fontSize: '14px'
                }}
              />
            </div>
          ))}
          
          <button onClick={() => handleUpdateProfile(profile)} style={{
            padding: '12px 24px', backgroundColor: '#f97316', color: 'white',
            border: 'none', borderRadius: '8px', fontWeight: '600',
            cursor: 'pointer', marginTop: '16px'
          }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const NotificationDropdown = () => (
    <div style={{
      position: 'absolute', top: '100%', right: 0, marginTop: '8px',
      backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', width: '300px', zIndex: 1000
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
        <h4 style={{ margin: 0, fontWeight: '600' }}>Notifications</h4>
      </div>
      <div style={{ maxHeight: '300px', overflow: 'auto' }}>
        {notifications.map(notif => (
          <div key={notif.id} style={{
            padding: '12px 16px', borderBottom: '1px solid #f3f4f6',
            backgroundColor: notif.unread ? '#fef3f2' : 'white'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>{notif.message}</p>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{notif.time}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#f8fafc',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white', borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 24px', height: '70px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '40px', height: '40px',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              borderRadius: '8px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px'
            }}>R</div>
            <div>
              <h1 style={{
                fontSize: '20px', fontWeight: '700', color: '#111827',
                margin: 0, marginBottom: '2px'
              }}>RideX Pro Dealer</h1>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Welcome back, {profile.name}!
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowNotifications(!showNotifications)} style={{
                padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '8px',
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>
                <Bell size={18} color="#6b7280" />
              </button>
              {showNotifications && <NotificationDropdown />}
            </div>
            
            <button onClick={() => setShowAddBikeModal(true)} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
              backgroundColor: '#f97316', color: 'white', border: 'none',
              borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px'
            }}>
              <Plus size={16} />Add Bike
            </button>
            
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
              backgroundColor: '#dc2626', color: 'white', border: 'none',
              borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px'
            }}>
              <LogOut size={16} />Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Tab Navigation */}
        <div style={{
          display: 'flex', gap: '4px', marginBottom: '32px',
          backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '12px', width: 'fit-content'
        }}>
          {['overview', 'profile'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '12px 24px', border: 'none', borderRadius: '8px',
              fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize',
              backgroundColor: activeTab === tab ? 'white' : 'transparent',
              color: activeTab === tab ? '#111827' : '#6b7280',
              boxShadow: activeTab === tab ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none'
            }}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Quick Actions */}
            <section>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{
                  fontSize: '20px', fontWeight: '700', color: '#111827',
                  margin: 0, marginBottom: '4px'
                }}>Quick Actions</h2>
                <p style={{ color: '#6b7280', margin: 0 }}>Get started with your most common tasks</p>
              </div>
              
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'
              }}>
                <div onClick={() => setShowAddBikeModal(true)} style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: 'white', borderRadius: '12px', padding: '20px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  transition: 'transform 0.2s', transform: 'scale(1)'
                }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                   onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Plus size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, marginBottom: '4px' }}>
                      List New Bike
                    </h3>
                    <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
                      Add a new motorcycle to your inventory
                    </p>
                  </div>
                </div>

                {quickActions.map((action, index) => (
                  <div key={index} onClick={action.onClick} style={{
                    backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px',
                    padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                    gap: '16px', transition: 'transform 0.2s, box-shadow 0.2s'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{
                      width: '48px', height: '48px', backgroundColor: '#f3f4f6',
                      borderRadius: '8px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: '#6b7280'
                    }}>
                      <action.icon size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, marginBottom: '4px' }}>
                        {action.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                        {action.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Performance Overview */}
            <section>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                marginBottom: '20px', flexWrap: 'wrap', gap: '16px'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                  Performance Overview
                </h2>
                <div style={{
                  display: 'flex', gap: '4px', backgroundColor: '#f3f4f6',
                  padding: '4px', borderRadius: '8px'
                }}>
                  {['This Month', 'Last 30 Days', 'This Year'].map(filter => (
                    <button key={filter} onClick={() => setTimeFilter(filter)} style={{
                      padding: '8px 16px', borderRadius: '6px', fontSize: '14px',
                      fontWeight: '500', border: 'none', cursor: 'pointer',
                      backgroundColor: timeFilter === filter ? 'white' : 'transparent',
                      color: timeFilter === filter ? '#111827' : '#6b7280',
                      boxShadow: timeFilter === filter ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none'
                    }}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'
              }}>
                {performanceData.map((stat, index) => (
                  <div key={index} style={{
                    backgroundColor: 'white', border: '1px solid #e5e7eb',
                    borderRadius: '12px', padding: '24px', transition: 'transform 0.2s, box-shadow 0.2s'
                  }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: '16px'
                    }}>
                      <div style={{
                        width: '56px', height: '56px', backgroundColor: '#f9fafb',
                        borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {stat.icon}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#10b981' }}>0%</span>
                    </div>
                    <div style={{
                      fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '4px'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '4px'
                    }}>
                      {stat.title}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>{stat.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inventory Management */}
            <section>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '20px', flexWrap: 'wrap', gap: '16px'
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                  Inventory Management
                </h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => alert('Filter options would appear here')} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                    backgroundColor: '#f3f4f6', color: '#374151', border: 'none',
                    borderRadius: '8px', fontWeight: '500', cursor: 'pointer'
                  }}>
                    <Filter size={16} />Filters
                  </button>
                  <button onClick={() => setShowAddBikeModal(true)} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                    backgroundColor: '#f97316', color: 'white', border: 'none',
                    borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                  }}>
                    <Plus size={16} />Add Bike
                  </button>
                </div>
              </div>
              
              {recentListings.length === 0 ? (
                <div style={{
                  backgroundColor: 'white', border: '1px solid #e5e7eb',
                  borderRadius: '12px', padding: '48px 24px', textAlign: 'center'
                }}>
                  <div style={{
                    width: '100px', height: '100px', backgroundColor: '#f3f4f6',
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 24px'
                  }}>
                    <Bike size={40} color="#6b7280" />
                  </div>
                  <h3 style={{
                    fontSize: '20px', fontWeight: '700', color: '#111827',
                    margin: 0, marginBottom: '8px'
                  }}>Your showroom is ready!</h3>
                  <p style={{ color: '#6b7280', margin: '0 auto 32px', maxWidth: '500px' }}>
                    Start building your motorcycle inventory. List your first bike and reach thousands of potential buyers on RideX Pro.
                  </p>
                  <div style={{
                    display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'
                  }}>
                    <button onClick={() => setShowAddBikeModal(true)} style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px',
                      backgroundColor: '#f97316', color: 'white', border: 'none',
                      borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '16px'
                    }}>
                      <Plus size={18} />List Your First Bike
                    </button>
                    <button onClick={() => setShowPhotoStudio(true)} style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px',
                      backgroundColor: 'transparent', color: '#374151', border: '1px solid #d1d5db',
                      borderRadius: '8px', fontWeight: '500', cursor: 'pointer'
                    }}>
                      <Camera size={18} />Upload Photos
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{
                  backgroundColor: 'white', border: '1px solid #e5e7eb',
                  borderRadius: '12px', overflow: 'hidden'
                }}>
                  <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
                    <h3 style={{ margin: 0, fontWeight: '600', color: '#111827' }}>Recent Listings</h3>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {recentListings.map(bike => (
                        <div key={bike.id} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px'
                        }}>
                          <div>
                            <h4 style={{ margin: 0, fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                              {bike.brand} {bike.model} ({bike.year})
                            </h4>
                            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                              {bike.category} • Added {bike.dateAdded}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
                              ₹{parseInt(bike.price).toLocaleString()}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                              <button style={{
                                padding: '4px 8px', backgroundColor: '#f97316', color: 'white',
                                border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer'
                              }}>Edit</button>
                              <button style={{
                                padding: '4px 8px', backgroundColor: '#dc2626', color: 'white',
                                border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer'
                              }}>Remove</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Business Insights */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'
            }}>
              <div style={{
                backgroundColor: 'white', border: '1px solid #e5e7eb',
                borderRadius: '12px', padding: '24px'
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: '20px'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    Bike Categories
                  </h3>
                  <Award size={20} color="#6b7280" />
                </div>
                <div>
                  {['Sport Bikes', 'Cruisers', 'Scooters', 'Electric'].map((category, i) => {
                    const count = recentListings.filter(bike => bike.category === category).length;
                    return (
                      <div key={category} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 0', borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none'
                      }}>
                        <span style={{ color: '#374151', fontWeight: '500' }}>{category}</span>
                        <span style={{ color: '#6b7280', fontWeight: '600' }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{
                backgroundColor: 'white', border: '1px solid #e5e7eb',
                borderRadius: '12px', padding: '24px'
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: '20px'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    Recent Activity
                  </h3>
                  <Clock size={20} color="#6b7280" />
                </div>
                <div>
                  {recentListings.length > 0 ? (
                    recentListings.slice(0, 3).map(bike => (
                      <div key={bike.id} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '8px 0', borderBottom: '1px solid #f3f4f6'
                      }}>
                        <div style={{
                          width: '32px', height: '32px', backgroundColor: '#ecfdf5',
                          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <Plus size={16} color="#10b981" />
                        </div>
                        <div>
                          <p style={{
                            color: '#374151', fontWeight: '500', margin: 0, marginBottom: '2px'
                          }}>
                            Added {bike.brand} {bike.model}
                          </p>
                          <span style={{ color: '#6b7280', fontSize: '12px' }}>{bike.dateAdded}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                      <div style={{
                        width: '32px', height: '32px', backgroundColor: '#ecfdf5',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <Users size={16} color="#10b981" />
                      </div>
                      <div>
                        <p style={{
                          color: '#374151', fontWeight: '500', margin: 0, marginBottom: '2px'
                        }}>Welcome to RideX Pro!</p>
                        <span style={{ color: '#6b7280', fontSize: '12px' }}>Just now</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Profile Tab
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile Header */}
            <div style={{
              backgroundColor: 'white', border: '1px solid #e5e7eb',
              borderRadius: '12px', padding: '24px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '64px', height: '64px',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  borderRadius: '12px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'white'
                }}>
                  <Building size={24} />
                </div>
                <div>
                  <h2 style={{
                    fontSize: '20px', fontWeight: '700', color: '#111827',
                    margin: 0, marginBottom: '4px'
                  }}>
                    {profile.businessName}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={16} color="#fcd34d" fill="#fcd34d" />
                    <span style={{ fontWeight: '600', color: '#111827' }}>{profile.rating}</span>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Dealer Rating</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setShowEditProfile(true)} style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                  backgroundColor: 'transparent', color: '#374151', border: '1px solid #d1d5db',
                  borderRadius: '8px', fontWeight: '500', cursor: 'pointer'
                }}>
                  <Edit3 size={16} />Edit Profile
                </button>
                <button onClick={handlePreviewStore} style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                  backgroundColor: '#f97316', color: 'white', border: 'none',
                  borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                }}>
                  <Eye size={16} />Preview Store
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px'
            }}>
              {/* Dealer Information */}
              <div style={{
                backgroundColor: 'white', border: '1px solid #e5e7eb',
                borderRadius: '12px', padding: '24px'
              }}>
                <h3 style={{
                  fontSize: '18px', fontWeight: '600', color: '#111827',
                  margin: 0, marginBottom: '24px'
                }}>Dealer Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {profileInfo.map(item => (
                    <div key={item.label} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px'
                    }}>
                      <div style={{
                        width: '40px', height: '40px', backgroundColor: 'white',
                        borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '12px', color: '#6b7280', fontWeight: '500',
                          textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Statistics */}
              <div style={{
                backgroundColor: 'white', border: '1px solid #e5e7eb',
                borderRadius: '12px', padding: '24px'
              }}>
                <h3 style={{
                  fontSize: '18px', fontWeight: '600', color: '#111827',
                  margin: 0, marginBottom: '24px'
                }}>Business Statistics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {businessMetrics.map(stat => (
                    <div key={stat.text} style={{
                      textAlign: 'center', padding: '16px',
                      backgroundColor: '#f9fafb', borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '20px', fontWeight: '800', color: '#111827', marginBottom: '4px'
                      }}>
                        {stat.number}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                        {stat.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showAddBikeModal && <AddBikeModal />}
      {showEditProfile && <EditProfileModal />}
      
      {/* Simple Modal Overlays for other features */}
      {showPhotoStudio && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', padding: '24px',
            maxWidth: '400px', width: '90%', textAlign: 'center'
          }}>
            <Camera size={48} color="#f97316" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, marginBottom: '8px' }}>
              Photo Studio
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Upload and manage photos for your bike listings. This feature would include drag-and-drop upload, image editing, and gallery management.
            </p>
            <button onClick={() => setShowPhotoStudio(false)} style={{
              padding: '12px 24px', backgroundColor: '#f97316', color: 'white',
              border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
            }}>
              Close
            </button>
          </div>
        </div>
      )}

      {showInquiries && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', padding: '24px',
            maxWidth: '600px', width: '90%', maxHeight: '80vh', overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Customer Inquiries</h3>
              <button onClick={() => setShowInquiries(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {inquiries.map(inquiry => (
                <div key={inquiry.id} style={{
                  padding: '16px', backgroundColor: '#f9fafb',
                  borderRadius: '8px', border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ color: '#111827' }}>{inquiry.customer}</strong>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{inquiry.time}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                    Interested in: <strong>{inquiry.bike}</strong>
                  </div>
                  <p style={{ margin: 0, color: '#374151' }}>{inquiry.message}</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button style={{
                      padding: '8px 16px', backgroundColor: '#f97316', color: 'white',
                      border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer'
                    }}>Reply</button>
                    <button style={{
                      padding: '8px 16px', backgroundColor: '#10b981', color: 'white',
                      border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer'
                    }}>Call</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAnalytics && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', padding: '24px',
            maxWidth: '500px', width: '90%', textAlign: 'center'
          }}>
            <BarChart3 size={48} color="#3b82f6" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, marginBottom: '8px' }}>
              Sales Analytics
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Comprehensive analytics dashboard showing sales trends, popular models, customer demographics, and performance insights.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>0%</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Growth</div>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>0</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Avg Views</div>
              </div>
            </div>
            <button onClick={() => setShowAnalytics(false)} style={{
              padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white',
              border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealerDashboard;