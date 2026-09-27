
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin, ArrowRight, GanttChartSquareIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-construction-800 z-20 relative text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-6">
              <span className="text-accent">Madhav</span> Construction
            </h3>
            <p className="text-construction-300 mb-6">
              Building the future with precision, innovation, and excellence. Your vision, our expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-construction-300 hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-construction-300 hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-construction-300 hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-16 after:bg-accent pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-construction-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-accent" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-construction-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-accent" /> About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-construction-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-accent" /> Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-construction-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-accent" /> Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-16 after:bg-accent pb-2">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <NavLink to="/services" className="text-construction-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-accent" /> Residential Construction
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-construction-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-accent" /> Commercial Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-construction-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-accent" /> Renovation & Remodeling
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-construction-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2 text-accent" /> Infrastructure Development
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-16 after:bg-accent pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-accent shrink-0 mt-1" />
                <span className="text-construction-300">Satyam Park, Ghodasar, Near MB Patel Farm, Vatva GIDC-382445</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-accent shrink-0" />
                <span className="text-construction-300">+(91) 94279 62678</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-accent shrink-0" />
                <span className="text-construction-300">jaykapadiya6789@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-construction-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-construction-400 text-sm mb-4 md:mb-0">
              © {currentYear} Madhav Construction. All rights reserved.
            </p>
            {/* <div className="flex space-x-6">
              <a href="#" className="text-construction-400 hover:text-accent text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-construction-400 hover:text-accent text-sm transition-colors">Terms of Service</a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
