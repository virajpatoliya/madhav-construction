
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { checkSession, logoutUser } from '@/service/auth';
import { useAuth } from '@/Auth/AuthContext';
import { IconBuilding, IconDashboardFilled, IconLayout2Filled, IconLogin2, IconLogout, IconMenu, IconMenuDeep, IconPower, IconUserFilled, IconX } from '@tabler/icons-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();



  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const verifySession = async () => {
      const valid = await checkSession();
      setIsLoggedIn(valid);
    };
    verifySession();
  }, []);



  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };
  const handleLogin = (item) => {
    setIsMobileMenuOpen(false);
    navigate(item);
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="fixed top-0 flex w-full justify-center items-center z-30 ">
      <header
        className="fixed top-0 flex w-full justify-center items-center z-30 transition-all duration-300 bg-white p-2 "
      >
        <div className="container-custom p-2 flex items-center justify-between">
          <NavLink
            to="/"
            className="flex flex-row font-display items-center transition-all"
          >
            <img width={64} height={32} draggable="false" onContextMenu={(e) => e.preventDefault()} className="w-16 md:w-20 " src='/images/logo.webp' />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex pl-5 items-center justify-center gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link hover:scale-[1.01] active:scale-95 transition-all ${isActive ? 'active-nav-link font-extrabold text-lg text-gray-800' : 'text-sm text-gray-700 font-medium'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className='flex flex-row items-center justify-center gap-3'>
              {isLoggedIn
                ? <div className='flex flex-row gap-3'>
                  <button className=' hover:scale-[1.2] active:scale-95 transition-all' onClick={() => navigate('/dashboard')}><IconLayout2Filled className='text-blue-900' /></button>
                  <button className='text-sm font-bold  rounded-md text-pink-600 hover:scale-[1.2] active:scale-95 transition-all' onClick={handleLogout}><IconPower stroke={3} /></button>

                </div>
                : <button className='text-sm text-gray-700 font-medium hover:scale-[1.2] active:scale-95 transition-all' onClick={() => navigate('/login')}><IconBuilding scale={8} stroke={2} /></button>}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-construction-700"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <IconMenu stroke={4} size={24} />
            )}
          </button>

          {/* Mobile Navigation */}
          <div
            className={`fixed top-0 w-screen h-screen bg-white z-50 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-1 ' : ' translate-x-full'
              }`}
          >
            <div className="flex flex-col  h-full p-8">
              <div className="flex justify-between items-center mb-8">
                <NavLink to="/" className="text-2xl font-display font-bold text-construction-800">
                  <span className="text-accent">Madhav</span> Construction
                </NavLink>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-construction-700"
                  aria-label="Close menu"
                >
                  <IconX stroke={3} size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => (setIsMobileMenuOpen(false))}
                    className={({ isActive }) =>
                      `text-xl font-medium ${isActive ? 'text-accent' : 'text-construction-700'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className='flex text-construction-700 '>
                  {isLoggedIn ?
                    <div className='flex flex-col justify-start items-start text-xl font-medium gap-6'>
                      <button className='' onClick={() => handleLogin('/dashboard')}>Dashboard</button>
                      <button className='text-pink-600 font-bold ' onClick={handleLogout}>Logout</button>
                    </div>
                    : <button className='text-xl text-gray-700 font-medium' onClick={() => handleLogin('/login')}>Login</button>}
                </div>
              </nav>

              <div className="mt-auto flex flex-col items-center space-y-4">
                <NavLink
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  Get a Quote
                </NavLink>
              </div>

            </div>
          </div>
        </div>
      </header >
    </div >
  );
};

export default Navbar;
