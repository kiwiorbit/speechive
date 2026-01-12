
import React from 'react';
import BeeLogo from './BeeLogo';
import { Page, UserRole } from '../types';

interface HeaderProps {
  honeyDrops: number;
  setActivePage: (page: Page) => void;
  title?: string;
  onBack?: () => void;
  showSkipButton?: boolean;
  onSkip?: () => void;
  role?: UserRole;
}

const Header: React.FC<HeaderProps> = ({ honeyDrops, setActivePage, title, onBack, showSkipButton, onSkip, role }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setActivePage(Page.Dashboard);
    }
  };

  return (
    <header className="md:hidden flex-shrink-0 flex items-center justify-between p-3 bg-white border-b border-gray-200 z-30 min-h-[60px]">
      <div className="flex items-center space-x-3 overflow-hidden">
        {title ? (
            <button 
                onClick={handleBack}
                className="text-gray-500 hover:text-amber-500 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Go back"
            >
                <i className="fas fa-arrow-left text-xl"></i>
            </button>
        ) : (
            <BeeLogo className="w-8 h-8 text-amber-500 flex-shrink-0" />
        )}
        
        <h1 
          className="text-lg font-bold text-gray-800 truncate max-w-[200px]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {title ? (
            <span>{title}</span>
          ) : (
            <>Speec<span className="text-amber-500">hive</span></>
          )}
        </h1>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        {showSkipButton && (
            <button 
                onClick={onSkip}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors focus:outline-none"
                aria-label="Stop animation and show all"
            >
                <i className="fas fa-stop-circle text-lg"></i>
            </button>
        )}
        
        {/* Only show coins if user is a participant */}
        {role === 'participant' && (
            <button 
                onClick={() => setActivePage(Page.HoneyStore)} 
                className="flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors focus:outline-none"
                aria-label={`You have ${honeyDrops} Honey Drops. Go to store.`}
            >
                <i className="fas fa-coins text-amber-500 text-lg"></i>
                <span className="font-bold text-amber-700 text-sm">{honeyDrops}</span>
            </button>
        )}
      </div>
    </header>
  );
};

export default Header;