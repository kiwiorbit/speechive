
import React, { useState } from 'react';
import { Page, StrategyChallenge } from '../types';

interface ExpansionPageProps {
  challenge: StrategyChallenge;
  setActivePage: (page: Page) => void;
  onDaySelect: (dayIndex: number) => void;
}

const RotatedSquare: React.FC<{
  day: number;
  isUnlocked: boolean;
  completedActivities: number;
  onClick: () => void;
}> = ({ day, isUnlocked, completedActivities, onClick }) => {
  // Compact sizes: w-10 (40px) for mobile to fit all 30 days.
  // md:w-14 (56px) for larger screens.
  let baseClasses = "relative w-14 h-14 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 transform rotate-45 rounded-lg md:rounded-xl border-2 shadow-sm";
  let colorClasses = "";
  
  if (isUnlocked) {
    if (completedActivities >= 2) {
        // 2+ Completed: Bright/Solid Gold
        colorClasses = "bg-amber-500 border-amber-600 text-white shadow-md";
    } else if (completedActivities === 1) {
        // 1 Completed: Light Gold
        colorClasses = "bg-amber-200 border-amber-400 text-amber-900";
    } else {
        // 0 Completed (but active today): 
        colorClasses = "bg-white border-amber-400 text-amber-500 animate-pulse-border"; 
    }
  } else {
    // Locked (Past or Future)
    // If it has activities but is locked (Past completed day), show gold but dimmed? 
    // The requirement says "previous day will not be available".
    // We will visually show completed past days but they won't be clickable/editable (effectively read-only/locked from changes).
    if (completedActivities > 0) {
         colorClasses = "bg-amber-100 border-amber-200 text-amber-800 opacity-70";
    } else {
         colorClasses = "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed opacity-60";
    }
  }

  return (
    <button
      onClick={isUnlocked ? onClick : undefined}
      className={`${baseClasses} ${colorClasses} ${isUnlocked ? 'cursor-pointer hover:scale-110 hover:brightness-105' : ''}`}
      aria-label={`Day ${day}`}
    >
        {/* Content wrapper must counter-rotate so numbers stay upright */}
        <div className="flex flex-col items-center justify-center z-10 pointer-events-none transform -rotate-45">
            <span className="font-bold text-xs md:text-lg">{day}</span>
            {completedActivities >= 2 && (
                <i className="fas fa-check text-[8px] md:text-xs mt-0.5"></i>
            )}
             {!isUnlocked && completedActivities === 0 && (
             <i className="fas fa-lock text-[8px] md:text-xs mt-0.5 text-gray-500"></i>
            )}
        </div>
    </button>
  );
};

const ExpansionPage: React.FC<ExpansionPageProps> = ({ challenge, setActivePage, onDaySelect }) => {
  const [showInfo, setShowInfo] = useState(false);

  let daysPassed = 0;
  if (challenge.startDate) {
      const start = new Date(challenge.startDate);
      start.setHours(0, 0, 0, 0);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffTime = now.getTime() - start.getTime();
      daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  } else {
      // If no startDate (hasn't started first activity yet), we are on Day 1 (index 0)
      daysPassed = 0;
  }

  const totalDays = 30;

  return (
    <div className="flex flex-col h-full animate-fadeIn relative overflow-hidden">
      <div className="flex-shrink-0 mb-4 mt-2 px-1">
         <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl shadow-sm flex items-center justify-between">
             <div className="flex items-center">
                 <i className="fas fa-expand-arrows-alt text-amber-500 text-2xl mr-3"></i>
                 <div>
                     <p className="text-amber-800 font-bold text-base md:text-xl leading-tight">
                        Add to your child's words to make sentences more complete.
                     </p>
                 </div>
             </div>
             <button 
                onClick={() => setShowInfo(true)}
                className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 text-amber-600 hover:bg-white transition-colors focus:outline-none flex-shrink-0"
                aria-label="More info about Expansion"
             >
                <i className="fas fa-info-circle text-xl"></i>
             </button>
         </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-2">
         {/* 
            Grid Layout: 5 columns x 6 rows = 30 items.
            gap-x-5 (20px) and gap-y-5 ensure rotated corners don't overlap.
         */}
         <div className="grid grid-cols-5 gap-x-5 gap-y-5 md:gap-x-10 md:gap-y-8">
            {Array.from({ length: totalDays }, (_, i) => {
                const dayNum = i + 1;
                
                // --- STRICT DAY LOCKING LOGIC ---
                // Only the *exact* current day is unlocked/playable.
                // Past days (i < daysPassed) are locked (missed or done).
                // Future days (i > daysPassed) are locked.
                const isUnlocked = i === daysPassed;
                
                const dayData = challenge.challenge.find(d => d.day === dayNum);
                const completedCount = dayData ? dayData.activities.filter(a => a.completed).length : 0;

                return (
                    <div key={i} className="flex items-center justify-center"> 
                        <RotatedSquare 
                            day={dayNum}
                            isUnlocked={isUnlocked}
                            completedActivities={completedCount}
                            onClick={() => onDaySelect(i)}
                        />
                    </div>
                );
            })}
         </div>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            {/* Backdrop */}
           <div 
             className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" 
             onClick={() => setShowInfo(false)}
           ></div>
           
           {/* Bottom Sheet Panel */}
           <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 pb-20 text-left animate-slide-up-bottom relative z-10 shadow-2xl max-h-[85vh] overflow-y-auto">
              {/* Close Button */}
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="flex items-center space-x-3 mb-6">
                 <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-expand-arrows-alt text-amber-500 text-2xl"></i>
                 </div>
                 <h2 className="text-2xl font-bold text-gray-800">What is Expansion?</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    Repeating and modelling the child’s utterance in a more complete and grammatical form, while adding one or more meaningful words.
                  </p>
                  
                  <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 mt-4">
                    <h4 className="font-bold text-amber-800 mb-3 uppercase text-xs tracking-wider">For Example</h4>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                           <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</div>
                           <p className="text-sm">When a child says, <span className="font-bold text-gray-800">"Doggie!"</span>, the adult says <span className="font-bold text-gray-800">"The dog is going"</span> or <span className="font-bold text-gray-800">"The dog goes to the road"</span>.</p>
                        </li>
                        <li className="flex gap-3">
                           <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</div>
                           <p className="text-sm">Or the child says, <span className="font-bold text-gray-800">"Baby cry"</span> and the adult says, <span className="font-bold text-gray-800">"The baby is crying"</span>.</p>
                        </li>
                    </ul>
                  </div>
              </div>

              <button 
                onClick={() => setShowInfo(false)}
                className="w-full mt-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Got it
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ExpansionPage;
