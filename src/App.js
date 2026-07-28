import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink, Award, BookOpen, Briefcase, Code, GraduationCap, Server, Database, Shield, Network } from 'lucide-react';
import { usePortfolioData } from './hooks/usePortfolioData';
import AdminPanel from './components/AdminPanel';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [particles, setParticles] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // ── Data from localStorage (editable via Admin Panel) ──────────
  const portfolioHook = usePortfolioData();
  const { data: portfolioData } = portfolioHook;
// EmailJS Configuration - REPLACE WITH YOUR ACTUAL KEYS
const EMAILJS_SERVICE_ID = 'service_41yehbj';  // Your service ID
const EMAILJS_TEMPLATE_ID = 'template_nyt6zy4';  // Your template ID
const EMAILJS_PUBLIC_KEY = 'H----iv3kU60tNv3p';  // Your public key from EmailJS
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
      
      const sections = ['home', 'about', 'experience', 'education', 'skills', 'projects', 'testimonials', 'blog', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

 const handleFormSubmit = (e) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email || !formData.message) {
    setFormStatus('error');
    setTimeout(() => setFormStatus(''), 3000);
    return;
  }
  
  setFormStatus('sending');
  
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message_html: formData.message,
    to_email: 'taseercs66@gmail.com'  // Where you want to receive emails
  };
  
  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  )
  .then((response) => {
    console.log('Email sent!', response.status, response.text);
    setFormStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 3000);
  })
  .catch((error) => {
    console.error('Email failed:', error);
    setFormStatus('error');
    setTimeout(() => setFormStatus(''), 3000);
  });
};

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Taseer_Ullah_CV.pdf';
    link.download = 'Taseer_Ullah_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // ── Destructure live data from hook ─────────────────────────
  const experiences = portfolioData.experiences;
  const education = portfolioData.education;
  const certifications = portfolioData.certifications;
  const skills = portfolioData.skills;
  const testimonials = portfolioData.testimonials;
  const blogPosts = portfolioData.blogPosts;
  const projects = portfolioData.projects;



  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A2647 0%, #144272 50%, #205295 100%)' }}>
          <div className="text-center">
            <div className="w-24 h-24 border-8 border-gray-300 border-t-yellow-500 rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-3xl font-bold text-white mb-2">Taseer Ullah</h2>
            <p className="text-yellow-400 font-semibold">Loading Portfolio...</p>
          </div>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gray-200">
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #E67E22 , #FFA500)'
          }}
        ></div>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
        style={{ background: isDarkMode ? '#E67E22 ' : '#0A2647' }}
      >
        {isDarkMode ? (
          <svg className="w-6 h-6" style={{ color: '#0A2647' }} fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
          </svg>
        ) : (
          <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
        )}
      </button>
      
      {/* Global Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}

        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={`code-${i}`}
              className="absolute text-green-500 font-mono text-xs"
              style={{
                left: `${i * 5}%`,
                animation: `codeRain ${10 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              {['01010101', '11001100', '10101010', 'SECURE', 'ENCRYPT', '0xFFFF', 'NULL', 'HASH'][i % 8]}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 opacity-10">
          <Shield className="absolute top-20 left-10 w-16 h-16 text-blue-500 animate-pulse" style={{ animationDuration: '3s' }} />
          <Shield className="absolute top-60 right-20 w-12 h-12 text-cyan-500 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          <Network className="absolute bottom-40 left-1/4 w-14 h-14 text-purple-500 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
          <Database className="absolute bottom-20 right-1/3 w-12 h-12 text-indigo-500 animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
        </div>

        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#0A2647" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div 
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"
          style={{
            animation: 'scan 8s ease-in-out infinite',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-2xl' : 'bg-gradient-to-r from-slate-900/80 to-blue-900/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-900 to-blue-900 rounded-lg">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl" style={{ background: 'linear-gradient(135deg, #E67E22  0%, #FFA500 100%)', color: '#0A2647' }}>
                  T
                </div>
                <div>
                  <div className="text-xl font-bold" style={{ color: scrollY > 50 ? '#ffffff' : 'white' }}>
                    Taseer Ullah
                  </div>
                  <div className="text-xs" style={{ color: scrollY > 50 ? '#E67E22 ' : '#E67E22 ' }}>
                    Gold Medalist
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {['Home', 'About', 'Experience', 'Education', 'Skills', 'Projects', 'Testimonials', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative group ${
                    activeSection === item.toLowerCase() ? 'shadow-lg' : ''
                  }`}
                  style={{ 
                    color: scrollY > 50 
                      ? (activeSection === item.toLowerCase() ? '#0A2647' : '#0A2647')
                      : (activeSection === item.toLowerCase() ? '#E67E22 ' : 'white'),
                    backgroundColor: activeSection === item.toLowerCase() 
                      ? (scrollY > 50 ? '#E67E22 ' : 'rgba(255, 215, 0, 0.2)')
                      : 'transparent'
                  }}
                >
                  {item}
                  {activeSection !== item.toLowerCase() && (
                    <span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: scrollY > 50 ? '#E67E22 ' : '#E67E22 ' }}
                    ></span>
                  )}
                </a>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: scrollY > 50 ? '#0A2647' : 'white' }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-2xl">
            {['Home', 'About', 'Experience', 'Education', 'Skills', 'Projects', 'Testimonials', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block px-6 py-4 font-semibold transition-all duration-300 border-l-4 ${
                  activeSection === item.toLowerCase() ? 'border-yellow-500 bg-yellow-50' : 'border-transparent hover:bg-gray-50 hover:border-yellow-300'
                }`}
                style={{ color: activeSection === item.toLowerCase() ? '#0A2647' : '#0A2647' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20" style={{ background: 'linear-gradient(135deg, #0A2647 0%, #144272 50%, #205295 100%)' }}>
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse" style={{ background: '#E67E22 ', filter: 'blur(100px)' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full animate-pulse" style={{ background: '#E67E22 ', filter: 'blur(100px)', animationDelay: '1s' }}></div>
        </div>

        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <Code className="absolute top-20 left-10 w-12 h-12 text-yellow-400 animate-bounce" style={{ animationDuration: '3s' }} />
          <Database className="absolute top-40 right-20 w-10 h-10 text-yellow-400 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
          <Shield className="absolute bottom-40 left-20 w-14 h-14 text-yellow-400 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
          <Server className="absolute bottom-20 right-10 w-12 h-12 text-yellow-400 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left text-white">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6 animate-pulse" style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)', border: '2px solid #E67E22 ', boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
                <Award style={{ color: '#E67E22 ' }} className="w-6 h-6" />
                <span style={{ color: '#E67E22 ' }} className="font-bold text-lg">Gold Medalist | CGPA 3.73/4.00</span>
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Taseer Ullah
              </h1>
              <div className="text-2xl sm:text-3xl mb-4 font-semibold" style={{ color: '#E67E22 ' }}>
                Junior Lecturer
              </div>
              <div className="text-xl sm:text-2xl mb-6 text-gray-300">
                & Full Stack Developer
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-lg mb-8 text-gray-200">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Shabqadar, KP, Pakistan</span>
              </div>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                🏆 Gold Medalist CS graduate from UET Mardan<br/>
                👨‍🏫 Teaching at UET Mardan<br/>
                🔐 Google Certified in Cybersecurity & Project Management
              </p>
              <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                <a
                  href="#projects"
                  className="px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                  style={{ backgroundColor: '#E67E22 ', color: '#0A2647', boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)' }}
                >
                  <Code className="w-5 h-5" />
                  View My Projects
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 border-2 rounded-xl font-bold transition-all duration-300 hover:bg-white/10 backdrop-blur-sm flex items-center gap-2"
                  style={{ borderColor: '#E67E22 ', color: '#E67E22 ' }}
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto">
                <div className="absolute inset-0 rounded-full animate-spin" style={{ background: 'conic-gradient(from 0deg, #E67E22 , #FFA500, #E67E22 )', animationDuration: '3s' }}></div>
                <div className="absolute inset-2 rounded-full" style={{ background: 'linear-gradient(135deg, #0A2647 0%, #144272 100%)' }}></div>
                
                <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl">
                  <img 
                    src="/Taseer.jpg" 
                    alt="Taseer Ullah"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-9xl font-bold text-white" style={{ display: 'none' }}>
                    T
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-2xl transform hover:scale-110 transition-all">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-8 h-8" style={{ color: '#E67E22 ' }} />
                    <div>
                      <div className="text-2xl font-bold" style={{ color: '#0A2647' }}>3.73</div>
                      <div className="text-xs text-gray-600">CGPA</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-2xl transform hover:scale-110 transition-all">
                  <div className="flex items-center gap-2">
                    <Award className="w-8 h-8" style={{ color: '#E67E22 ' }} />
                    <div>
                      <div className="text-xl font-bold" style={{ color: '#0A2647' }}>Gold</div>
                      <div className="text-xs text-gray-600">Medalist</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-8 bg-white rounded-xl p-4 shadow-2xl transform hover:scale-110 transition-all">
                  <div className="flex items-center gap-2">
                    <Shield className="w-8 h-8" style={{ color: '#E67E22 ' }} />
                    <div>
                      <div className="text-lg font-bold" style={{ color: '#0A2647' }}>Google</div>
                      <div className="text-xs text-gray-600">Certified</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={downloadCV}
                  className="px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105 hover:shadow-2xl"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white', border: '2px solid white', backdropFilter: 'blur(10px)' }}
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#0A2647' }}>
            About Me
          </h2>
          <div className="w-24 h-1 mx-auto mb-12 rounded-full" style={{ background: 'linear-gradient(90deg, #E67E22 , #FFA500)' }}></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E67E22 , #FFA500)' }}>
                    <GraduationCap style={{ color: '#0A2647' }} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#0A2647' }}>Academic Excellence</h3>
                    <p style={{ color: '#E67E22 ' }} className="font-semibold">UET Mardan Graduate</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#0A2647' }}>
                  I am a <strong style={{ color: '#E67E22 ' }}>Gold Medalist</strong> Computer Science graduate from UET Mardan with a CGPA of 3.73/4.00. 
                  My academic excellence reflects my dedication to mastering both theoretical concepts and practical applications in computer science.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A2647, #144272)' }}>
                    <Briefcase style={{ color: '#E67E22 ' }} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#0A2647' }}>Professional Role</h3>
                    <p style={{ color: '#E67E22 ' }} className="font-semibold">Educator & Developer</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#0A2647' }}>
                  Currently, I serve as a <strong>Junior Lecturer at UET Mardan</strong>, 
                  where I teach Operating System, Parallel and Distributed Computing, and Web Design & Development to the next generation of tech professionals.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: '#0A2647' }}>
                  My expertise spans full-stack development, network security, and educational technology. I hold Google certifications in <strong>Cybersecurity</strong> and <strong>Project Management</strong>. 
                  My goal is to bridge the gap between academic theory and real-world industry applications.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4" style={{ borderColor: '#E67E22 ' }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #E67E22 , #FFA500)' }}>
                    <Award style={{ color: '#0A2647' }} className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: '#0A2647' }}>Achievements</h3>
                </div>
                <ul className="space-y-3" style={{ color: '#0A2647' }}>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E67E22 ' }}></div>
                    <span>🏆 <strong>Gold Medal</strong> - UET Mardan</span>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E67E22 ' }}></div>
                    <span>⭐ <strong>Dean's List</strong> Recognition</span>
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E67E22 ' }}></div>
                    <span>📊 <strong>CGPA: 3.73/4.00</strong></span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4" style={{ borderColor: '#0A2647' }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #0A2647, #144272)' }}>
                    <Shield style={{ color: '#E67E22 ' }} className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: '#0A2647' }}>Certifications</h3>
                </div>
                <ul className="space-y-3" style={{ color: '#0A2647' }}>
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-3 text-lg">
                      <div className="mt-1">
                        <Shield className="w-5 h-5" style={{ color: '#E67E22' }} />
                      </div>
                      <div>
                        <div className="font-semibold">{cert.name}</div>
                        <div className="text-sm" style={{ color: '#E67E22 ' }}>{cert.issuer}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white text-center shadow-xl transform hover:scale-105 transition-all">
                  <div className="text-4xl font-bold mb-2">2+</div>
                  <div className="text-sm">Teaching Roles</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center shadow-xl transform hover:scale-105 transition-all">
                  <div className="text-4xl font-bold mb-2">5+</div>
                  <div className="text-sm">Major Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#0A2647' }}>
            Professional Experience
          </h2>
          <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: '#E67E22 ' }}></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#0A2647' }}>{exp.title}</h3>
                    <div className="text-xl mb-2" style={{ color: '#E67E22 ' }}>{exp.organization}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold" style={{ color: '#0A2647' }}>{exp.period}</div>
                    <div className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((highlight, i) => (
                    <span key={i} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#E67E22 ', color: '#0A2647' }}>
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#0A2647' }}>
            Education Journey
          </h2>
          <div className="w-24 h-1 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(90deg, #E67E22 , #FFA500)' }}></div>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            A comprehensive academic background from matriculation to university, marked by consistent excellence and distinction
          </p>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 border border-gray-100">
                <div className={`h-2 bg-gradient-to-r ${edu.color}`}></div>
                
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4 flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-2xl bg-white shadow-xl flex items-center justify-center p-4 mb-4 border-4 border-gray-100">
                        <img 
                          src={edu.logo} 
                          alt={`${edu.institution} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150/0A2647/E67E22 ?text=Logo';
                          }}
                        />
                      </div>
                      
                      <div className={`px-6 py-3 rounded-full text-white font-bold shadow-lg bg-gradient-to-r ${edu.color}`}>
                        {edu.period}
                      </div>
                    </div>

                    <div className="lg:w-3/4">
                      <h3 className="text-3xl font-bold mb-2" style={{ color: '#0A2647' }}>
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 text-xl mb-4" style={{ color: '#E67E22 ' }}>
                        <GraduationCap className="w-6 h-6" />
                        <span className="font-semibold">{edu.institution}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {edu.cgpa && (
                          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-l-4" style={{ borderColor: '#E67E22 ' }}>
                            <div className="text-sm text-gray-600 mb-1">CGPA</div>
                            <div className="text-2xl font-bold" style={{ color: '#0A2647' }}>{edu.cgpa}</div>
                            <div className="text-xs font-semibold" style={{ color: '#E67E22 ' }}>{edu.division}</div>
                          </div>
                        )}
                        {edu.marks && (
                          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4" style={{ borderColor: '#0A2647' }}>
                            <div className="text-sm text-gray-600 mb-1">Marks</div>
                            <div className="text-2xl font-bold" style={{ color: '#0A2647' }}>{edu.marks}</div>
                            <div className="text-xs font-semibold" style={{ color: '#E67E22 ' }}>{edu.division}</div>
                          </div>
                        )}
                        {edu.board && (
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-500">
                            <div className="text-sm text-gray-600 mb-1">Board</div>
                            <div className="text-lg font-bold" style={{ color: '#0A2647' }}>{edu.board}</div>
                            {edu.location && <div className="text-xs text-gray-600">{edu.location}</div>}
                          </div>
                        )}
                        {edu.status && (
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-l-4 border-green-500 md:col-span-2">
                            <div className="text-sm text-gray-600 mb-1">Status</div>
                            <div className="text-lg font-semibold" style={{ color: '#0A2647' }}>{edu.status}</div>
                          </div>
                        )}
                      </div>

                      {edu.achievements && (
                        <div className="mb-6">
                          <h4 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: '#0A2647' }}>
                            <Award className="w-5 h-5" style={{ color: '#E67E22 ' }} />
                            Achievements
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {edu.achievements.map((achievement, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 rounded-xl font-semibold shadow-md"
                                style={{ backgroundColor: '#E67E22 ', color: '#0A2647' }}
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {(edu.courses || edu.subjects) && (
                        <div>
                          <h4 className="font-bold text-lg mb-3 flex items-center gap-2" style={{ color: '#0A2647' }}>
                            <BookOpen className="w-5 h-5" style={{ color: '#E67E22 ' }} />
                            {edu.courses ? 'Key Courses' : 'Subjects'}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(edu.courses || edu.subjects).map((item, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-lg text-sm font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
                                style={{ color: '#0A2647' }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={`pen-${i}`}
              className="absolute w-1 h-40 bg-gradient-to-b from-red-500 via-yellow-500 to-transparent"
              style={{
                top: `${20 * i}%`,
                animation: `penetrate ${8 + i * 2}s linear infinite`,
                animationDelay: `${i * 2}s`,
                transformOrigin: 'center'
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#0A2647' }}>
            Technical Skills
          </h2>
          <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: '#E67E22 ' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend Skills */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: '#0A2647' }}>
                    Frontend Development
                  </h3>
                </div>
                <div className="space-y-5">
                  {skills.frontend.map((skill, index) => (
                    <div key={index} className="group/skill">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-lg" style={{ color: '#0A2647' }}>{skill.name}</span>
                        <span style={{ color: '#E67E22 ' }} className="font-bold text-lg">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{ 
                            width: `${skill.level}%`, 
                            background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                            boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                          }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Backend Skills */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: '#0A2647' }}>
                    Backend & Database
                  </h3>
                </div>
                <div className="space-y-5">
                  {skills.backend.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-lg" style={{ color: '#0A2647' }}>{skill.name}</span>
                        <span style={{ color: '#E67E22 ' }} className="font-bold text-lg">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{ 
                            width: `${skill.level}%`, 
                            background: 'linear-gradient(90deg, #10b981, #059669)',
                            boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
                          }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security & Other Skills */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: '#0A2647' }}>
                    Security & Tools
                  </h3>
                </div>
                <div className="space-y-5">
                  {skills.other.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-lg" style={{ color: '#0A2647' }}>{skill.name}</span>
                        <span style={{ color: '#E67E22 ' }} className="font-bold text-lg">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{ 
                            width: `${skill.level}%`, 
                            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                            boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
                          }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#0A2647' }}>
            Featured Projects
          </h2>
          <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: '#E67E22 ' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  
                  <div className="absolute top-4 left-4">
                    <div className="p-3 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                      <div style={{ color: '#0A2647' }}><Code className="w-6 h-6" /></div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-white/90 backdrop-blur-sm" style={{ color: '#0A2647' }}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-600 transition-colors" style={{ color: '#0A2647' }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-110"
                        style={{ backgroundColor: '#0A2647', color: '#E67E22 ' }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#0A2647', color: '#E67E22 ' }}>
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <button className="flex items-center gap-2 font-bold transition-all duration-300 group-hover:gap-4" style={{ color: '#0A2647' }}>
                    View Details 
                    <ExternalLink className="w-4 h-4" style={{ color: '#E67E22 ' }} />
                  </button>
                </div>

                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${project.gradient} pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={closeModal}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl transform animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={`relative h-48 bg-gradient-to-br ${selectedProject.gradient}`}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                    {selectedProject.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                </div>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-700 text-lg mb-6">{selectedProject.description}</p>
              
              {selectedProject.liveLink && (
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3" style={{ color: '#0A2647' }}>🌐 Live Demo</h4>
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#E67E22 ', color: '#0A2647' }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit Live Site
                  </a>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3" style={{ color: '#0A2647' }}>🛠️ Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{ backgroundColor: '#0A2647', color: '#E67E22 ' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3" style={{ color: '#0A2647' }}>✨ Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E67E22 ' }}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#E67E22 ', color: '#0A2647' }}
                  >
                    <ExternalLink className="w-5 h-5 inline mr-2" />
                    Live Demo
                  </a>
                )}
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 border-2"
                    style={{ borderColor: '#0A2647', color: '#0A2647' }}
                  >
                    <Github className="w-5 h-5 inline mr-2" />
                    GitHub
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:bg-gray-100"
                  style={{ color: '#0A2647' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#0A2647' }}>
            What People Say
          </h2>
          <div className="w-24 h-1 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(90deg, #E67E22 , #FFA500)' }}></div>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Feedback from colleagues, professors, and students I've worked with
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative"
              >
                <div className="absolute top-4 right-4 text-6xl opacity-10" style={{ color: '#E67E22 ' }}>
                  "
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" style={{ color: '#E67E22 ' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4"
                    style={{ borderColor: '#E67E22 ' }}
                  />
                  <div>
                    <h4 className="font-bold text-lg" style={{ color: '#0A2647' }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm" style={{ color: '#E67E22 ' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#0A2647' }}>
            Latest Articles
          </h2>
          <div className="w-24 h-1 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(90deg, #E67E22 , #FFA500)' }}></div>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            Sharing knowledge about cybersecurity, web development, and technology
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-white shadow-lg" style={{ color: '#0A2647' }}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 hover:text-yellow-600 transition-colors" style={{ color: '#0A2647' }}>
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <button className="flex items-center gap-2 font-bold transition-all duration-300 hover:gap-4" style={{ color: '#0A2647' }}>
                    Read More
                    <ExternalLink className="w-4 h-4" style={{ color: '#E67E22 ' }} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" style={{ color: '#0A2647' }}>
            Get In Touch
          </h2>
          <div className="w-24 h-1 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(90deg, #E67E22 , #FFA500)' }}></div>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, academic collaborations, or tech projects
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#0A2647' }}>
                Send Me a Message
              </h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2647' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2647' }}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0A2647' }}>
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-all resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

              <button
  type="submit"
  disabled={formStatus === 'sending'}
  className="w-full px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
  style={{ backgroundColor: '#E67E22 ', color: '#0A2647' }}
>
  {formStatus === 'sending' ? (
    <>
      <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
      Sending...
    </>
  ) : formStatus === 'success' ? (
    <>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
      Message Sent!
    </>
  ) : formStatus === 'error' ? (
    <>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
      </svg>
      Failed! Try Again
    </>
  ) : (
    <>
      <Mail className="w-5 h-5" />
      Send Message
    </>
  )}
</button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#0A2647' }}>
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <a href="mailto:taseercs66@gmail.com" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group">
                    <div className="p-3 rounded-full" style={{ background: 'linear-gradient(135deg, #E67E22 , #FFA500)' }}>
                      <Mail style={{ color: '#0A2647' }} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-600">Email</div>
                      <div className="text-lg font-bold group-hover:text-yellow-600 transition-colors" style={{ color: '#0A2647' }}>
                        taseercs66@gmail.com
                      </div>
                    </div>
                  </a>

                  <a href="https://wa.me/923101911236" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group">
                    <div className="p-3 rounded-full" style={{ background: 'linear-gradient(135deg, #0A2647, #144272)' }}>
                      <Phone style={{ color: '#E67E22 ' }} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-600">WhatsApp</div>
                      <div className="text-lg font-bold group-hover:text-yellow-600 transition-colors" style={{ color: '#0A2647' }}>
                        +92 310 1911236
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all">
                    <div className="p-3 rounded-full" style={{ background: 'linear-gradient(135deg, #E67E22 , #FFA500)' }}>
                      <MapPin style={{ color: '#0A2647' }} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-600">Location</div>
                      <div className="text-lg font-bold" style={{ color: '#0A2647' }}>
                        Shabqadar, KP, Pakistan
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#0A2647' }}>
                  Connect on Social Media
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://github.com/taseeer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                    style={{ backgroundColor: '#0A2647', color: 'white' }}
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                  
                  <a
                    href="https://linkedin.com/in/taseer-ullah-666t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                    style={{ backgroundColor: '#0A66C2', color: 'white' }}
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                  
                  <a
                    href="mailto:taseercs66@gmail.com"
                    className="flex items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                    style={{ backgroundColor: '#EA4335', color: 'white' }}
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                  
                  <a
                    href="https://wa.me/923101911236"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                    style={{ backgroundColor: '#25D366', color: 'white' }}
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: '#0A2647' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center" style={{ color: '#E67E22 ' }}>
            © 2026 Taseer Ullah. Gold Medalist | CS Instructor | Full Stack Developer
          </p>
          <p className="text-center text-gray-400 mt-2">
            Built with React & Tailwind CSS
          </p>
          {/* Admin Panel trigger - subtle gear icon */}
          <div className="flex justify-center mt-4">
            <button
              id="admin-panel-trigger"
              onClick={() => setAdminOpen(true)}
              title="Admin Panel"
              className="p-2 rounded-full transition-all duration-300 opacity-30 hover:opacity-100"
              style={{ color: '#E67E22' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Panel */}
      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        portfolioHook={portfolioHook}
      />

      <style jsx>{`
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
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes codeRain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes scan {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }

        @keyframes penetrate {
          0% {
            transform: translateX(-100%) rotate(-45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw) rotate(-45deg);
            opacity: 0;
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
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;