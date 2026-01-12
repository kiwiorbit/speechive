
import React, { useState } from 'react';
import { Page, StrategyChallenge } from '../types';

interface CommentPageProps {
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
  let baseClasses = "relative w-14 h-14 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 transform rotate-45 rounded-lg md:rounded-xl border-2 shadow-sm";
  let colorClasses = "";
  
  if (isUnlocked) {
    if (completedActivities >= 2) {
        colorClasses = "bg-green-400 border-green-400 text-white shadow-md";
    } else {
        colorClasses = "bg-green-50 border-green-400 text-green-900";
    }
  } else {
    colorClasses = "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed";
  }

  return (
    <button
      onClick={isUnlocked ? onClick : undefined}
      className={`${baseClasses} ${colorClasses} ${isUnlocked ? 'cursor-pointer hover:scale-110 hover:brightness-105' : ''}`}
      aria-label={`Day ${day}`}
    >
        <div className="flex flex-col items-center justify-center z-10 pointer-events-none transform -rotate-45">
            <span className="font-bold text-xs md:text-lg">{day}</span>
            {completedActivities >= 2 && <i className="fas fa-check text-[8px] md:text-xs mt-0.5"></i>}
             {!isUnlocked && <i className="fas fa-lock text-[8px] md:text-xs mt-0.5 text-gray-400"></i>}
        </div>
    </button>
  );
};

const CommentPage: React.FC<CommentPageProps> = ({ challenge, setActivePage, onDaySelect }) => {
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
      daysPassed = 0;
  }
  
  const totalDays = 30;

  return (
    <div className="flex flex-col h-full animate-fadeIn relative overflow-hidden">
      <div className="flex-shrink-0 mb-4 mt-2 px-1">
         <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl shadow-sm flex items-center justify-between">
             <div className="flex items-center">
                 <i className="fas fa-comment-dots text-green-500 text-2xl mr-3"></i>
                 <div>
                     <p className="text-green-800 font-bold text-base md:text-xl leading-tight">
                        Narrate and comment on what you and your child are doing.
                     </p>
                 </div>
             </div>
             <button 
                onClick={() => setShowInfo(true)}
                className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 text-green-600 hover:bg-white transition-colors focus:outline-none flex-shrink-0"
                aria-label="More info about Comment"
             >
                <i className="fas fa-info-circle text-xl"></i>
             </button>
         </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-2">
         <div className="grid grid-cols-5 gap-x-5 gap-y-5 md:gap-x-10 md:gap-y-8">
            {Array.from({ length: totalDays }, (_, i) => {
                const dayNum = i + 1;
                // Strict Day Locking: Only the current day is unlocked
                const isUnlocked = i === daysPassed;
                
                const dayData = challenge.challenge.find(d => d.day === dayNum);
                const completedCount = dayData ? dayData.activities.filter(a => a.completed).length : 0;
                return (
                    <div key={i} className="flex items-center justify-center"> 
                        <RotatedSquare day={dayNum} isUnlocked={isUnlocked} completedActivities={completedCount} onClick={() => onDaySelect(i)} />
                    </div>
                );
            })}
         </div>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
           <div 
             className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" 
             onClick={() => setShowInfo(false)}
           ></div>
           
           <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 pb-20 text-left animate-slide-up-bottom relative z-10 shadow-2xl max-h-[85vh] overflow-y-auto">
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="flex items-center space-x-3 mb-6">
                 <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-comment-dots text-green-500 text-2xl"></i>
                 </div>
                 <h2 className="text-2xl font-bold text-gray-800">What is Commenting?</h2>
              </div>
              
              <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed italic text-center">
                    Information regarding this strategy will be available soon.
                  </p>
              </div>

              <button 
                onClick={() => setShowInfo(false)}
                className="w-full mt-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Got it
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default CommentPage;
