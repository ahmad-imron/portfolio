import React, { useState, useEffect } from 'react';
import { Mail, Phone, Instagram, Linkedin, BookOpen, Award, GraduationCap, Menu, X, Sparkles, Settings } from 'lucide-react';
import profilePhoto from './assets/foto.jpeg';
import cvFile from './assets/cv.ahmad.docx';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // State untuk konten yang dapat diedit
  const [editableContent, setEditableContent] = useState({
    name: "Ahmad Imron",
    lpdpInfo: "Penerima Beasiswa LPDP Angkatan 2 2024 PK-256",
    universityInfo: "Mahasiswa Magister Linguistik di Universitas Airlangga Surabaya",
    jobInfo: "Guru SMA Islam | STAI DUBA",
    aboutCards: [
      {
        title: 'Guru Bahasa Indonesia',
        desc: 'Saya adalah seorang guru Bahasa Indonesia yang berpengalaman di bidang kepenulisan, dengan dedikasi tinggi dalam mendidik generasi muda.'
      },
      {
        title: 'Penerima Beasiswa LPDP',
        desc: 'Penerima beasiswa LPDP angkatan 2 2024 untuk melanjutkan pendidikan Magister Linguistik di Universitas Airlangga Surabaya.'
      },
      {
        title: 'Perjalanan Akademik',
        desc: 'Sedang menempuh pendidikan Magister Linguistik di Universitas Airlangga Surabaya dengan fokus pada linguistik terapan.'
      },
      {
        title: 'Pengalaman Mengajar',
        desc: 'Mengajar di SMA Islam STAI DUBA dengan pengalaman yang luas di bidang pendidikan Islam.'
      }
    ],
    contactCards: [
      {
        title: 'WhatsApp',
        detail: '087713111415'
      },
      {
        title: 'Instagram',
        detail: '@imron_ahmed'
      },
      {
        title: 'LinkedIn',
        detail: 'Ahmad Imron'
      }
    ]
  });

  const handleLoginSuccess = () => {
    setShowAdminLogin(false);
    setShowAdminPanel(true);
    setIsAdmin(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setEditingMode(false);
    setShowAdminPanel(false);
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
  };

  const toggleEditingMode = () => {
    setEditingMode(!editingMode);
  };

  const updateContent = (section, index, field, value) => {
    setEditableContent(prev => {
      const updated = { ...prev };
      if (section === 'aboutCards' || section === 'contactCards') {
        updated[section][index][field] = value;
      } else if (section === 'main') {
        updated[field] = value;
      }
      return updated;
    });
  };

  const handleSettingsClick = () => {
    if (isAdmin) {
      setShowAdminPanel(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer untuk scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Particle component
  const Particles = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-emerald-400/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white overflow-hidden">
      {/* Admin Login atau Admin Panel */}
      {showAdminLogin ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : showAdminPanel ? (
        <>
          <AdminPanel 
            editableContent={editableContent}
            updateContent={updateContent}
            toggleEditingMode={toggleEditingMode}
            handleLogout={handleLogout}
            editingMode={editingMode}
            onClose={handleCloseAdminPanel}
          />
        </>
      ) : (
        <>
          {/* Tombol Pengaturan di Pojok Kanan Atas (hanya untuk desktop) */}
          <button
            onClick={handleSettingsClick}
            className="fixed top-4 right-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 backdrop-blur-sm border border-emerald-500/30 rounded-full p-3 shadow-lg shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 z-40 hidden md:block"
          >
            <Settings size={24} />
          </button>
          
          {/* Tombol Pengaturan di Pojok Kanan Atas (hanya untuk mobile) */}
          <button
            onClick={handleSettingsClick}
            className="fixed top-4 right-16 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 backdrop-blur-sm border border-emerald-500/30 rounded-full p-2 shadow-lg shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 z-30 md:hidden"
          >
            <Settings size={20} />
          </button>
          
          {/* Custom Cursor Effect */}
          <div
            className="fixed w-6 h-6 border-2 border-emerald-400/50 rounded-full pointer-events-none z-30 transition-transform duration-100 ease-out hidden lg:block"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Navigation */}
          <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-30 border-b border-emerald-500/20 shadow-lg shadow-emerald-500/5 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
                  {editableContent.name}
                </div>
                
                <div className="hidden md:flex space-x-8">
                  <button onClick={() => scrollToSection('home')} className="text-slate-300 hover:text-emerald-400 transition-all duration-300 relative group">
                    Beranda
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-emerald-400 transition-all duration-300 relative group">
                    Tentang
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-emerald-400 transition-all duration-300 relative group">
                    Kontak
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </div>

                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-emerald-400 hover:text-emerald-300 transition-colors relative z-50"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-emerald-500/20 animate-slideDown">
                <div className="px-4 py-4 space-y-3">
                  <button onClick={() => scrollToSection('home')} className="block w-full text-left text-slate-300 hover:text-emerald-400 transition-colors py-2 hover:translate-x-2 transition-transform duration-300">Beranda</button>
                  <button onClick={() => scrollToSection('about')} className="block w-full text-left text-slate-300 hover:text-emerald-400 transition-colors py-2 hover:translate-x-2 transition-transform duration-300">Tentang</button>
                  <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-slate-300 hover:text-emerald-400 transition-colors py-2 hover:translate-x-2 transition-transform duration-300">Kontak</button>
                  {/* Menu Pengaturan di dalam hamburger menu untuk mobile */}
                  <button 
                    onClick={() => {
                      handleSettingsClick();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-emerald-400 hover:text-emerald-300 transition-colors py-2 hover:translate-x-2 transition-transform duration-300 flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Pengaturan
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
            <Particles />
            
            <div 
              className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900 to-teal-900/30"
              style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            ></div>
            
            <div className="absolute inset-0 opacity-20">
              <div 
                className="absolute w-72 h-72 bg-emerald-500 rounded-full blur-3xl animate-float"
                style={{ 
                  top: '20%',
                  left: '10%',
                  animationDelay: '0s'
                }}
              ></div>
              <div 
                className="absolute w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-float"
                style={{ 
                  bottom: '20%',
                  right: '10%',
                  animationDelay: '2s'
                }}
              ></div>
              <div 
                className="absolute w-64 h-64 bg-green-500 rounded-full blur-3xl animate-float"
                style={{ 
                  top: '50%',
                  right: '30%',
                  animationDelay: '4s'
                }}
              ></div>
            </div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto animate-fadeIn">
              <div className="mb-6 inline-block animate-scaleIn">
                <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 flex items-center justify-center text-3xl sm:text-5xl font-bold shadow-2xl shadow-emerald-500/50 ring-4 ring-emerald-500/20 animate-pulse-slow relative group">
                  <img 
                    src={profilePhoto} 
                    alt="Ahmad Imron" 
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent animate-slideUp">
                Ahmad Imron
              </h1>
              
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 mb-6 sm:mb-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 flex-wrap px-1 sm:px-2 md:px-4 hover:text-emerald-300 transition-colors transform hover:scale-105 transition-transform duration-300">
                  <Award className="text-emerald-400 flex-shrink-0 animate-bounce-slow" size={14} />
                  <span className="leading-tight">Penerima Beasiswa LPDP Angkatan 2 2024 PK-256</span>
                </div>
                <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 flex-wrap px-1 sm:px-2 md:px-4 hover:text-emerald-300 transition-colors transform hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="text-emerald-400 flex-shrink-0 animate-bounce-slow" size={14} style={{ animationDelay: '0.1s' }} />
                  <span className="leading-tight">Mahasiswa Magister Linguistik di Universitas Airlangga Surabaya</span>
                </div>
                <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 flex-wrap px-1 sm:px-2 md:px-4 hover:text-emerald-300 transition-colors transform hover:scale-105 transition-transform duration-300">
                  <BookOpen className="text-emerald-400 flex-shrink-0 animate-bounce-slow" size={14} style={{ animationDelay: '0.2s' }} />
                  <span className="leading-tight">Guru SMA Islam | STAI DUBA</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:gap-6 justify-center items-center animate-slideUp" style={{ animationDelay: '0.4s' }}>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-slate-900 font-semibold px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 relative overflow-hidden group w-full sm:w-auto flex justify-center text-sm sm:text-base md:text-lg"
                >
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                    Hubungi Saya
                    <Sparkles size={14} className="animate-spin-slow" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <a 
                  href={cvFile} 
                  download="CV_Ahmad_Imron.docx"
                  className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 hover:from-slate-600 hover:via-slate-700 hover:to-slate-800 text-white font-semibold px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-slate-500/30 hover:shadow-2xl hover:shadow-slate-500/50 relative overflow-hidden group border border-slate-600 w-full sm:w-auto flex justify-center text-sm sm:text-base md:text-lg"
                >
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                    Download CV
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10 px-4">
              <h2 
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent animate-slideUp pt-8 sm:pt-10 md:pt-12"
                data-animate
                id="about-title"
              >
                Tentang Saya
              </h2>
              
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                {[
                  {
                    icon: BookOpen,
                    title: 'Guru Bahasa Indonesia',
                    desc: 'Saya adalah seorang guru Bahasa Indonesia yang berpengalaman di bidang kepenulisan, dengan dedikasi tinggi dalam mendidik generasi muda.',
                    color: 'emerald',
                    delay: '0s'
                  },
                  {
                    icon: Award,
                    title: 'Penerima Beasiswa LPDP',
                    desc: 'Penerima beasiswa LPDP angkatan 2 2024 untuk melanjutkan pendidikan Magister Linguistik di Universitas Airlangga Surabaya.',
                    color: 'teal',
                    delay: '0.1s'
                  },
                  {
                    icon: GraduationCap,
                    title: 'Perjalanan Akademik',
                    desc: 'Sedang menempuh pendidikan Magister Linguistik di Universitas Airlangga Surabaya dengan fokus pada linguistik terapan.',
                    color: 'green',
                    delay: '0.2s'
                  },
                  {
                    icon: BookOpen,
                    title: 'Pengalaman Mengajar',
                    desc: 'Mengajar di SMA Islam STAI DUBA dengan pengalaman yang luas di bidang pendidikan Islam.',
                    color: 'emerald',
                    delay: '0.3s'
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      data-animate
                      id={`about-card-${index}`}
                      className={`bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-${item.color}-950/30 border border-${item.color}-500/20 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 hover:border-${item.color}-400/50 hover:shadow-xl hover:shadow-${item.color}-500/20 transition-all duration-500 backdrop-blur-sm transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.02] sm:hover:scale-105 animate-slideUp group`}
                      style={{ animationDelay: item.delay }}
                    >
                      <Icon className={`text-${item.color}-400 mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} size={24} />
                      <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4 text-${item.color}-300 group-hover:text-${item.color}-200 transition-colors`}>{item.title}</h3>
                      <p className="text-slate-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed group-hover:text-white transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-slate-900 via-emerald-950/20 to-slate-950 relative overflow-visible">
            <Particles />
            
            <div className="max-w-4xl mx-auto w-full relative z-10 px-4">
              <h2 
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 text-center bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent animate-slideUp pt-8 sm:pt-10 md:pt-12 relative z-20 will-change-transform"
                data-animate
                id="contact-title"
              >
                Hubungi Saya
              </h2>
              
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-8 relative z-10">
                {[
                  {
                    icon: Phone,
                    title: 'WhatsApp',
                    detail: '087713111415',
                    link: 'https://wa.me/6287713111415',
                    color: 'emerald',
                    delay: '0s'
                  },
                  {
                    icon: Instagram,
                    title: 'Instagram',
                    detail: '@imron_ahmed',
                    link: 'https://www.instagram.com/imron_ahmed',
                    color: 'teal',
                    delay: '0.1s'
                  },
                  {
                    icon: Linkedin,
                    title: 'LinkedIn',
                    detail: 'Ahmad Imron',
                    link: 'http://www.linkedin.com/in/ahmadimron',
                    color: 'green',
                    delay: '0.2s'
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-animate
                      id={`contact-card-${index}`}
                      className={`bg-gradient-to-br from-slate-800/50 via-slate-900/50 to-${item.color}-950/30 border border-${item.color}-500/20 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 hover:border-${item.color}-400 hover:shadow-2xl hover:shadow-${item.color}-500/30 transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-3 hover:rotate-1 sm:hover:rotate-2 text-center group backdrop-blur-sm animate-slideUp relative overflow-hidden`}
                      style={{ animationDelay: item.delay }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/0 to-${item.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <Icon className={`text-${item.color}-400 mx-auto mb-2 sm:mb-3 group-hover:scale-125 group-hover:text-${item.color}-300 transition-all duration-300 relative z-10 animate-bounce-slow`} size={24} />
                      <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2 text-${item.color}-300 group-hover:text-${item.color}-200 transition-colors relative z-10`}>{item.title}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg group-hover:text-slate-300 transition-colors relative z-10">{item.detail}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-950 border-t border-emerald-500/20 py-8 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5 animate-shimmer"></div>
            <div className="max-w-6xl mx-auto text-center text-slate-400 relative z-10">
              <p className="text-sm hover:text-emerald-400 transition-colors">© 2025 Ahmad Imron. Hak cipta dilindungi undang-undang.</p>
              <p className="text-xs mt-2 text-emerald-400/80 hover:text-emerald-400 transition-colors">Dibangun dengan React & Tailwind CSS ✨</p>
            </div>
          </footer>

          <style jsx>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.5);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            
            @keyframes float {
              0%, 100% {
                transform: translateY(0) translateX(0);
              }
              25% {
                transform: translateY(-20px) translateX(10px);
              }
              50% {
                transform: translateY(-10px) translateX(-10px);
              }
              75% {
                transform: translateY(-30px) translateX(5px);
              }
            }
            
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            
            @keyframes gradient {
              0%, 100% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
            }
            
            .animate-slideDown {
              animation: slideDown 0.3s ease-out;
            }
            
            .animate-slideUp {
              animation: slideUp 0.6s ease-out forwards;
              opacity: 0;
              animation-fill-mode: both;
            }
            
            .animate-fadeIn {
              animation: fadeIn 1s ease-out;
            }
            
            .animate-scaleIn {
              animation: scaleIn 0.8s ease-out;
            }
            
            .animate-float {
              animation: float 15s ease-in-out infinite;
            }
            
            .animate-shimmer {
              animation: shimmer 3s infinite;
            }
            
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 3s ease infinite;
            }
            
            .animate-pulse-slow {
              animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            
            .animate-bounce-slow {
              animation: bounce 3s infinite;
            }
            
            .animate-spin-slow {
              animation: spin 3s linear infinite;
            }
            
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: .8;
              }
            }
            
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            
            /* Ensure proper rendering on mobile */
            @media (max-width: 640px) {
              .animate-slideUp {
                animation-duration: 0.8s;
                animation-timing-function: ease-out;
              }
              
              #contact-title {
                transform: translateZ(0);
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
