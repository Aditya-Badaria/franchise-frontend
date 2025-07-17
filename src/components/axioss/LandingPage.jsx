import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'About Us', id: 'about' },
    { name: 'Process', id: 'process' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <div className="font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white shadow-md py-5'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo/LOGO.png" 
                alt="Franchise Axis Logo" 
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain drop-shadow-lg"
              />
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex gap-8 text-gray-700 font-medium">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-[#E9522C] transition-colors duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E9522C] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
              <li>
                <Link to="/login" className="text-white bg-[#E9522C] px-4 py-2 rounded-full hover:bg-[#cc431b] transition-all duration-300 hover:scale-105">
                    Login
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-[#E9522C] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-current h-0.5 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`bg-current h-0.5 w-6 mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`bg-current h-0.5 w-6 mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-[#E9522C] hover:bg-gray-50 rounded-lg transition-all duration-300"
                >
                  {item.name}
                </button>
              ))}
              <Link to="/login" className="block text-center text-white bg-[#E9522C] px-4 py-2 rounded-full hover:bg-[#cc431b] transition-all duration-300 mx-4">
                  Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="home"
        className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#E9522C] via-[#FF7F50] to-[#FF6B35] text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-wide animate-fade-in-up">
            Manage Your Franchise <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Smoothly
            </span> with Franchise Axis
          </h1>
          
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up delay-300">
            An easy-to-use platform designed to manage sales, track expenses, handle inventory, and empower your business decisions – all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
            <button 
              onClick={() => navigate('/Curd')}
              className="bg-white text-[#E9522C] font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-50"
            >
              Apply Now
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#E9522C] transition-all duration-300 hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#E9522C] animate-fade-in-up">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg animate-fade-in-up delay-200">
              Comprehensive solutions to streamline your franchise operations
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Sales Management",
                description: "Track and analyse your franchise sales with ease using advanced analytics and reporting tools.",
                icon: "📊"
              },
              {
                title: "Expense Tracking",
                description: "Monitor expenses to optimise profitability efficiently with automated categorization.",
                icon: "💰"
              },
              {
                title: "Inventory Control",
                description: "Manage stock levels seamlessly in real-time with automated alerts and reorder points.",
                icon: "📦"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className={`bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-[#E9522C] animate-fade-in-up">
            About Franchise Axis
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 animate-fade-in-up delay-200">
              Franchise Axis is crafted for modern businesses to simplify daily operations, empower decisions, and grow profitability. Our mission is to make franchise management efficient and stress-free.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
              {[
                { number: "500+", label: "Happy Clients" },
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className={`animate-fade-in-up delay-${300 + index * 100}`}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E9522C] mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#E9522C] animate-fade-in-up">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg animate-fade-in-up delay-200">
              Simple steps to get your franchise management system up and running
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "Step 1",
                title: "Sign Up",
                description: "Sign up and create your franchise profile easily with our guided setup wizard."
              },
              {
                step: "Step 2",
                title: "Setup",
                description: "Add your products, services, and inventory details to customize your dashboard."
              },
              {
                step: "Step 3",
                title: "Track",
                description: "Track sales, expenses, and analytics in real-time with automated reports."
              },
              {
                step: "Step 4",
                title: "Grow",
                description: "Grow your business with actionable insights and data-driven decisions."
              }
            ].map((process, index) => (
              <div 
                key={index}
                className={`bg-white p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up relative`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute -top-3 left-6 bg-[#E9522C] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {process.step}
                </div>
                <h3 className="font-semibold mb-3 text-xl text-gray-800 mt-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#E9522C] to-[#FF7F50] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto opacity-90 animate-fade-in-up delay-200">
            Have questions or want a demo? Reach out today and let's discuss how we can help your franchise succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
            <a 
              href="mailto:support@franchiseaxis.com" 
              className="bg-white text-[#E9522C] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Email Us
            </a>
            <a 
              href="tel:+1234567890" 
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#E9522C] transition-all duration-300 hover:scale-105"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo/LOGO.png" 
                  alt="Franchise Axis Logo" 
                  className="h-12 w-12 object-contain"
                />
                <h3 className="text-xl font-bold">Franchise Axis</h3>
              </div>
              <p className="text-gray-400">
                Empowering franchises with smart management solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@franchiseaxis.com</li>
                <li>+1 (234) 567-8900</li>
                <li>123 Business Ave, City, State</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Franchise Axis. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style >{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;