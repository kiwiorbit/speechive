
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { NaturalisticStrategyType, StrategyChallenge } from '../types';
import { NATURALISTIC_STRATEGIES } from '../constants';

// --- DEV TOGGLES ---
// Master switch to unlock everything
const DEV_UNLOCK_ALL = false;

// Individual switches for development (set to true to unlock specific cards without completing previous ones)
const DEV_UNLOCK_RECAST = false;
const DEV_UNLOCK_OPEN_EQ = false;
const DEV_UNLOCK_COMMENT = false;

interface NaturalisticStrategiesProps {
  onSelectCategory: (category: NaturalisticStrategyType) => void;
  strategyChallengesData: StrategyChallenge[];
}

const NaturalisticStrategies: React.FC<NaturalisticStrategiesProps> = ({ onSelectCategory, strategyChallengesData }) => {
  const [showIntroModal, setShowIntroModal] = useState(false);

  useEffect(() => {
    // Check if the user has seen the intro modal before
    const hasSeenIntro = localStorage.getItem('speechive_hasSeenStrategyIntro');
    if (!hasSeenIntro) {
      // Delay to ensure the page is fully loaded and user is settled before showing the modal
      const timer = setTimeout(() => {
        setShowIntroModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseIntroModal = () => {
    localStorage.setItem('speechive_hasSeenStrategyIntro', 'true');
    setShowIntroModal(false);
  };
  
  // Helper to determine the theme color for the strategy
  const getStrategyTheme = (colorClass: string) => {
    // Extracts 'sky', 'rose', etc. from 'bg-sky-500'
    const colorName = colorClass.replace('bg-', '').split('-')[0];
    return {
        bgLight: `bg-${colorName}-50`,
        bgIcon: `bg-${colorName}-100`,
        text: `text-${colorName}-600`,
        textIcon: `text-${colorName}-500`,
        border: `border-${colorName}-100`,
        barFill: `bg-${colorName}-500`,
        // Use specific left-border color class to ensure it overrides generic border colors
        borderColor: `border-l-${colorName}-500`,
        // Thin border color matching the theme for unlocked cards
        thinBorder: `border-${colorName}-200`
    };
  };

  // Helper to check if a specific strategy is sufficiently complete to unlock the next one
  const isStrategyComplete = (type: NaturalisticStrategyType) => {
      const challenge = strategyChallengesData.find(c => c.type === type);
      if (!challenge) return false;
      
      // Calculate total activities completed
      const totalCompleted = challenge.challenge.reduce((acc, day) => {
          return acc + (day.activities ? day.activities.filter(a => a.completed).length : 0);
      }, 0);

      // Calculate days passed since start
      let daysPassed = 0;
      if (challenge.startDate) {
          const start = new Date(challenge.startDate);
          start.setHours(0, 0, 0, 0);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          const diffTime = now.getTime() - start.getTime();
          daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      }

      // Rule: Must complete 40+ activities AND 30 days must have passed
      return totalCompleted >= 40 && daysPassed >= 30;
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn relative">
      {/* 
        On Desktop, we want to show the Title because the Header is hidden. 
        On Mobile, the Header handles the title.
      */}
      <div className="hidden md:block mb-6">
         <h1 className="text-4xl font-bold text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Naturalistic Strategies
         </h1>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-1">
        {/* Top Banner: Your strategy for this month */}
        <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center shadow-sm">
             <i className="fas fa-calendar-check text-green-500 mr-2 text-lg"></i>
             <p className="text-green-800 font-semibold text-sm md:text-base">
                Your strategy for this month: <span className="font-bold">Expansion</span>
             </p>
        </div>

        {NATURALISTIC_STRATEGIES.map((strategy, index) => {
          // Find the challenge data to calculate progress
          const challengeData = strategyChallengesData.find(c => c.type === strategy.type);
          
          let totalCompleted = 0;
          const totalRequired = 60; // 30 days * 2 activities

          if (challengeData) {
             // Calculate total completed activities across all days for this strategy
             totalCompleted = challengeData.challenge.reduce((acc, day) => {
                 return acc + (day.activities ? day.activities.filter(a => a.completed).length : 0);
             }, 0);
          }

          const theme = getStrategyTheme(strategy.color);
          
          // --- LOCKING LOGIC ---
          let isLocked = true;

          // 1. Expansion is always unlocked
          if (strategy.type === NaturalisticStrategyType.Expansion) {
              isLocked = false;
          }
          // 2. Check Master Developer Override
          else if (DEV_UNLOCK_ALL) {
              isLocked = false;
          }
          // 3. Check Individual Developer Overrides
          else if (strategy.type === NaturalisticStrategyType.Recast && DEV_UNLOCK_RECAST) {
              isLocked = false;
          }
          else if (strategy.type === NaturalisticStrategyType.OpenEQ && DEV_UNLOCK_OPEN_EQ) {
              isLocked = false;
          }
          else if (strategy.type === NaturalisticStrategyType.Comment && DEV_UNLOCK_COMMENT) {
              isLocked = false;
          }
          // 4. Check Progression (Unlock if previous strategy is complete)
          else {
              const previousStrategy = NATURALISTIC_STRATEGIES[index - 1];
              if (previousStrategy && isStrategyComplete(previousStrategy.type)) {
                  isLocked = false;
              }
          }

          return (
            <Card 
              key={strategy.type} 
              onClick={!isLocked ? () => onSelectCategory(strategy.type) : undefined} 
              className={`!p-0 relative overflow-hidden flex-1 min-h-[100px] flex flex-row items-center border-l-[6px] ${theme.borderColor} ${isLocked ? 'bg-gray-50 opacity-90' : `bg-white shadow-sm hover:!shadow-sm cursor-pointer border-t border-b border-r ${theme.thinBorder}`}`}
              disableHoverScale={true}
            >
              {/* Left: Icon Section */}
              <div className="p-4 flex-shrink-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${isLocked ? 'bg-gray-200 text-gray-400' : `${theme.bgIcon} ${theme.textIcon}`}`}>
                      <i className={strategy.icon}></i>
                  </div>
              </div>

              {/* Center: Info & Progress */}
              <div className="flex-1 py-2 pr-2 flex flex-col justify-center h-full">
                  <h3 className={`font-bold text-lg leading-tight mb-1 ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
                      {strategy.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                      {strategy.description}
                  </p>
                  
                  {/* Progress Bar Area - Only show if unlocked */}
                  {!isLocked && (
                      <div className="w-full max-w-[90%]">
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                  className={`h-full rounded-full transition-all duration-500 ${theme.barFill}`} 
                                  style={{ width: `${Math.min((totalCompleted / totalRequired) * 100, 100)}%` }}
                              ></div>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium">
                              {totalCompleted}/{totalRequired} completed
                          </p>
                      </div>
                  )}
                  {isLocked && (
                      <p className="text-[10px] text-gray-400 mt-1 italic">
                          Complete previous strategy (30 days) to unlock
                      </p>
                  )}
              </div>

              {/* Right: Status Icon */}
              <div className="pr-4 flex-shrink-0 flex items-center justify-center">
                  {isLocked ? (
                      <i className="fas fa-lock text-gray-300 text-lg"></i>
                  ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                          <i className="fas fa-chevron-right text-gray-400 text-sm"></i>
                      </div>
                  )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* First Time Intro Bottom Sheet */}
      {showIntroModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            {/* Backdrop */}
           <div 
             className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" 
             onClick={handleCloseIntroModal}
           ></div>
           
           {/* Bottom Sheet Panel */}
           <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 pb-20 text-center animate-slide-up-bottom relative z-10 shadow-2xl">
              {/* Close Button */}
              <button 
                onClick={handleCloseIntroModal}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="mx-auto mb-4 mt-2">
                 <i className="fas fa-calendar-alt text-5xl text-amber-500"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
                One Strategy a month 
              </h2>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                Helps build consistent habits and see real progress.
              </p>
              
              <div className="space-y-4 text-left mb-8">
                <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-0.5 mr-3 flex-shrink-0 text-lg"></i>
                    <span className="text-gray-600 text-md font-medium" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>Practice the same strategy all month</span>
                </div>
                <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-0.5 mr-3 flex-shrink-0 text-lg"></i>
                    <span className="text-gray-600 text-md font-medium" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>Select 2 activities daily from 10</span>
                </div>
                <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-0.5 mr-3 flex-shrink-0 text-lg"></i>
                    <span className="text-gray-600 text-md font-medium" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>Next strategy will unlock next month</span>
                </div>
              </div>

              <button 
                onClick={handleCloseIntroModal}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Got it! Let's do this!</span>
                <i className="fas fa-arrow-right"></i>
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default NaturalisticStrategies;
