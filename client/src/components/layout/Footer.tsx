import { Link } from 'wouter';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const WhoopLogo = () => (
  <svg className="h-8 w-auto mb-6" viewBox="0 0 120 36" fill="currentColor">
    <path d="M20.51 7.34h-7.78v21.32h7.78c5.9 0 10.7-4.8 10.7-10.7s-4.8-10.62-10.7-10.62zm0 17.45h-3.9V11.2h3.9c4.5 0 8.12 3.62 8.12 6.76 0 4.5-3.63 6.84-8.13 6.84zM42.9 7.34h-3.9v21.32h3.9V7.34zm11.76 21.74c5.9 0 10.7-4.8 10.7-10.7s-4.8-10.7-10.7-10.7-10.7 4.8-10.7 10.7 4.8 10.7 10.7 10.7zm0-17.45c3.72 0 6.76 3.03 6.76 6.76 0 3.72-3.04 6.76-6.76 6.76-3.73 0-6.77-3.04-6.77-6.76 0-3.73 3.04-6.76 6.77-6.76zm26.62 17.03h3.9V7.34h-3.9l-9.32 14.93V7.34h-3.9v21.32h3.9l9.32-14.93v14.93zm19.84.42c5.9 0 10.7-4.8 10.7-10.7s-4.8-10.7-10.7-10.7-10.7 4.8-10.7 10.7 4.8 10.7 10.7 10.7zm0-17.45c3.72 0 6.76 3.03 6.76 6.76 0 3.72-3.04 6.76-6.76 6.76-3.73 0-6.77-3.04-6.77-6.76 0-3.73 3.04-6.76 6.77-6.76z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#121212] border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div>
            <WhoopLogo />
            <p className="text-[#a0a0a0] text-sm mb-4">
              WHOOP delivers personalized fitness, sleep, and recovery data to help you optimize your performance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#a0a0a0] hover:text-[#009ffd] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#a0a0a0] hover:text-[#009ffd] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#a0a0a0] hover:text-[#009ffd] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Press</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Sustainability</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">WHOOP 4.0</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">WHOOP Body</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Accessories</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Teams</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Science</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Podcast</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Community</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Partnerships</a></li>
              <li><a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#a0a0a0] text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} WHOOP, Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-[#a0a0a0] hover:text-white text-sm transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
