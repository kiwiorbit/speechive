
import React from 'react';
import Card from './Card';
import { Page, UserRole } from '../types';

interface DashboardProps {
    setActivePage: (page: Page) => void;
    role?: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage, role }) => {
  // Base Grid items available to everyone
  const baseItems = [
    { 
      page: Page.DailyTasks, 
      icon: 'fas fa-tasks', 
      title: 'Daily Tasks', 
      subtitle: 'Practice today', 
      colorClass: 'text-cyan-500',
      bgClass: 'bg-white', 
      cardBg: '!bg-cyan-20',
      borderClass: 'border-l-4 border-l-cyan-400',
      thinBorderClass: 'border-cyan-200'
    },
    { 
      page: Page.Badges, 
      icon: 'fas fa-trophy', 
      title: 'Reward Badges', 
      subtitle: 'Achievements', 
      colorClass: 'text-purple-500',
      bgClass: 'bg-white',
      cardBg: '!bg-purple-20',
      borderClass: 'border-l-4 border-l-purple-400',
      thinBorderClass: 'border-purple-200'
    },
    { 
      page: Page.Resources, 
      icon: 'fas fa-book-open', 
      title: 'Resources', 
      subtitle: 'Helpful articles', 
      colorClass: 'text-emerald-500',
      bgClass: 'bg-white',
      cardBg: '!bg-emerald-20',
      borderClass: 'border-l-4 border-l-emerald-400',
      thinBorderClass: 'border-emerald-200'
    },
  ];

  // The Honey Store item - Only for Participants
  const honeyStoreItem = { 
      page: Page.HoneyStore, 
      icon: 'fas fa-store', 
      title: 'Honey Store', 
      subtitle: 'Redeem rewards', 
      colorClass: 'text-amber-500',
      bgClass: 'bg-white',
      cardBg: '!bg-amber-20',
      borderClass: 'border-l-4 border-l-amber-400',
      thinBorderClass: 'border-amber-200'
  };

  // Construct grid based on role
  let gridItems = [...baseItems];
  if (role === 'participant') {
      // Insert Honey Store at index 2 (Top Right if 2 cols, or 3rd item)
      // To maintain the 2x2 grid look from before, we need 4 items if possible.
      // If store is hidden, we have 3 items. The layout grid-cols-2 will leave one empty space or stretch.
      // Let's insert it before Resources to match original layout
      gridItems.splice(2, 0, honeyStoreItem); 
  } else {
      // For common users, we only have 3 items. 
      // We could add a "Community Info" or "About" card to balance the grid?
      // Or just leave it as 3.
      // Let's add a placeholder "Community" card pointing to Contact or Settings
      gridItems.push({
          page: Page.Contact,
          icon: 'fas fa-heart',
          title: 'Support',
          subtitle: 'Get help',
          colorClass: 'text-rose-500',
          bgClass: 'bg-white',
          cardBg: '!bg-rose-20',
          borderClass: 'border-l-4 border-l-rose-400',
          thinBorderClass: 'border-rose-200'
      });
  }

  // The bottom "Hero" card for Progress
  const progressItem = { 
    page: Page.Progress, 
    icon: 'fas fa-chart-line', 
    title: 'View Progress', 
    subtitle: 'Track your milestones & growth', 
    colorClass: 'text-rose-500',
    bgClass: 'bg-rose-50',
    borderClass: 'border-l-4 border-l-rose-400',
    thinBorderClass: 'border-rose-500'
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn space-y-4 md:space-y-6">
      {/* Top Main Card: 30-Day Challenge */}
      <Card 
        className="!p-0 relative overflow-hidden border-none min-h-[160px] md:min-h-[220px] flex-shrink-0 shadow-md hover:!shadow-md transition-none" 
        onClick={() => setActivePage(Page.Strategies)}
        disableHoverScale={true}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 bg-[length:200%_auto] animate-gradient-flow-slow"></div>
        
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
            <i className="fas fa-star text-white text-6xl animate-pulse"></i>
        </div>
        <div className="absolute bottom-0 left-10 p-4 opacity-10">
            <i className="fas fa-sparkles text-white text-4xl"></i>
        </div>

        <div className="relative z-10 flex items-center justify-between p-6 md:p-8 h-full">
            <div className="flex-1 text-white z-10">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider text-white border border-white/30">
                        Start Here
                    </span>
                </div>
                <h3 className="text-3xl font-bold md:text-4xl drop-shadow-md">
                  30-Day Challenge
                </h3>
                <p 
                    className="text-white text-sm md:text-lg mt-2 opacity-95 leading-relaxed drop-shadow-sm"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                >
                    Tap to begin your daily magical journey.
                </p>
            </div>
            <div className="flex-shrink-0 w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 ml-2 shadow-2xl">
                <i className="fas fa-rocket text-white text-4xl md:text-6xl drop-shadow-lg animate-rocket-launch"></i>
            </div>
        </div>
      </Card>

      {/* Middle Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-6 flex-shrink-0">
        {gridItems.map(item => (
            <Card 
                key={item.title} 
                onClick={() => setActivePage(item.page)}
                disableHoverScale={true}
                className={`!p-3 md:!p-6 flex flex-col justify-center items-center text-center shadow-sm hover:!shadow-sm border-[0.5px] ${item.thinBorderClass} ${item.borderClass} ${item.cardBg}`}
            >
                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3 ${item.bgClass}`}>
                    <i className={`${item.icon} text-lg md:text-3xl ${item.colorClass}`}></i>
                </div>
                <h4 className="font-bold text-gray-800 text-sm md:text-lg leading-tight">{item.title}</h4>
                <p className="text-sm md:text-sm text-gray-500 mt-1">{item.subtitle}</p>
            </Card>
        ))}
      </div>

      {/* Bottom Card: View Progress */}
      <Card 
        onClick={() => setActivePage(progressItem.page)} 
        disableHoverScale={true}
        className={`!p-0 bg-white shadow-md hover:!shadow-md transition-none flex-grow flex flex-col justify-center min-h-[120px] relative overflow-hidden border-[0.5px] ${progressItem.thinBorderClass} ${progressItem.borderClass}`}
      >
          <div className="absolute left-0 bottom-0 opacity-5">
              <i className="fas fa-chart-area text-9xl transform -translate-x-4 translate-y-4 text-rose-500"></i>
          </div>
          <div className="absolute right-10 top-5 opacity-5">
             <i className="fas fa-chart-bar text-6xl text-rose-500"></i>
          </div>

          <div className="relative z-10 flex flex-row items-center justify-between px-6 py-4 h-full">
              <div className="flex flex-col justify-center z-10">
                  <div className="flex items-center space-x-2 mb-1">
                     <i className="fas fa-chart-pie text-rose-400 text-sm"></i>
                     <span className="text-rose-500 text-xs font-bold uppercase tracking-wider">Analytics</span>
                  </div>
                  <h3 className="text-2xl font-bold md:text-4xl text-gray-800 drop-shadow-sm">{progressItem.title}</h3>
                  <p className="text-gray-500 text-sm md:text-base mt-1" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                      {progressItem.subtitle}
                  </p>
              </div>
              
              <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center ${progressItem.bgClass} shadow-inner`}>
                  <i className={`${progressItem.icon} text-2xl md:text-4xl ${progressItem.colorClass}`}></i>
              </div>
          </div>
      </Card>
    </div>
  );
};

export default Dashboard;