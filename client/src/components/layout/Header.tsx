import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, User } from 'lucide-react';
import { COLORS } from '@/lib/constants';
import { useAuth, ReplitUser } from '@/hooks/useAuth';

const WhoopLogo = () => (
  <svg className="h-8 w-auto" viewBox="0 0 120 36" fill="currentColor">
    <path d="M20.51 7.34h-7.78v21.32h7.78c5.9 0 10.7-4.8 10.7-10.7s-4.8-10.62-10.7-10.62zm0 17.45h-3.9V11.2h3.9c4.5 0 8.12 3.62 8.12 6.76 0 4.5-3.63 6.84-8.13 6.84zM42.9 7.34h-3.9v21.32h3.9V7.34zm11.76 21.74c5.9 0 10.7-4.8 10.7-10.7s-4.8-10.7-10.7-10.7-10.7 4.8-10.7 10.7 4.8 10.7 10.7 10.7zm0-17.45c3.72 0 6.76 3.03 6.76 6.76 0 3.72-3.04 6.76-6.76 6.76-3.73 0-6.77-3.04-6.77-6.76 0-3.73 3.04-6.76 6.77-6.76zm26.62 17.03h3.9V7.34h-3.9l-9.32 14.93V7.34h-3.9v21.32h3.9l9.32-14.93v14.93zm19.84.42c5.9 0 10.7-4.8 10.7-10.7s-4.8-10.7-10.7-10.7-10.7 4.8-10.7 10.7 4.8 10.7 10.7 10.7zm0-17.45c3.72 0 6.76 3.03 6.76 6.76 0 3.72-3.04 6.76-6.76 6.76-3.73 0-6.77-3.04-6.77-6.76 0-3.73 3.04-6.76 6.77-6.76z" />
  </svg>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#121212] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <WhoopLogo />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-[#009ffd] transition-colors">THE BRAND</a>
            <a href="#" className="text-sm font-medium hover:text-[#009ffd] transition-colors">MEMBERSHIP</a>
            <a href="#" className="text-sm font-medium hover:text-[#009ffd] transition-colors">TECHNOLOGY</a>
            <a href="#" className="text-sm font-medium hover:text-[#009ffd] transition-colors">SCIENCE</a>
            <Link href="/competitors" className="text-sm font-medium hover:text-[#009ffd] transition-colors">COMPETITORS</Link>
            <a href="#" className="text-sm font-medium hover:text-[#009ffd] transition-colors">TEAMS</a>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="text-sm font-medium px-4 py-2">Loading...</div>
            ) : isAuthenticated ? (
              <div className="flex items-center">
                <div className="hidden md:flex items-center mr-4">
                  <div className="h-8 w-8 rounded-full bg-[#009ffd] flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{user?.username || 'User'}</span>
                </div>
                <a 
                  href="/api/logout" 
                  className="text-sm font-medium text-white hover:text-[#009ffd] transition-colors px-4 py-2 rounded-full bg-[#1c1c1c]"
                >
                  LOGOUT
                </a>
              </div>
            ) : (
              <a 
                href="/api/login" 
                className="text-sm font-medium text-[#009ffd] hover:text-white transition-colors px-4 py-2 rounded-full border border-[#009ffd]"
              >
                LOG IN WITH REPLIT
              </a>
            )}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#121212] z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-8">
            <WhoopLogo />
            <button 
              className="text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-6">
              <li><a href="#" className="text-xl font-medium block">THE BRAND</a></li>
              <li><a href="#" className="text-xl font-medium block">MEMBERSHIP</a></li>
              <li><a href="#" className="text-xl font-medium block">TECHNOLOGY</a></li>
              <li><a href="#" className="text-xl font-medium block">SCIENCE</a></li>
              <li><Link href="/competitors"><span className="text-xl font-medium block">COMPETITORS</span></Link></li>
              <li><a href="#" className="text-xl font-medium block">TEAMS</a></li>
            </ul>
          </nav>
          
          <div className="mt-8">
            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#009ffd] flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-md">{user?.username || 'User'}</span>
                </div>
                <a 
                  href="/api/logout" 
                  className="block w-full bg-[#1c1c1c] text-white font-semibold px-6 py-3 rounded-full text-center border border-gray-700"
                >
                  LOGOUT
                </a>
              </div>
            ) : (
              <a 
                href="/api/login" 
                className="block w-full bg-[#009ffd] text-white font-semibold px-6 py-3 rounded-full text-center"
              >
                LOG IN WITH REPLIT
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
