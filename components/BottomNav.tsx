
import React from 'react';
import { Page } from '../types';
import { NAV_ITEMS } from '../constants';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-top-lg md:hidden z-50">
      <div className="flex h-16 items-center justify-between px-6">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className="flex flex-col items-center justify-center py-2 transition-all duration-200 ease-in-out focus:outline-none"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <i
                className={`${item.icon} text-2xl mb-1 transition-colors duration-200 ${
                  isActive ? 'text-amber-500' : 'text-gray-600'
                }`}
              ></i>
              <span
                className={`text-[10px] font-bold transition-colors duration-200 ${
                  isActive ? 'text-amber-500' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
