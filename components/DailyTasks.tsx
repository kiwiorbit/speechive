
import React from 'react';
import { Activity, Page } from '../types';
import Card from './Card';

interface DailyTasksProps {
  activities: Activity[];
  dayNumber: number;
  onTaskClick: (activity: Activity) => void;
  setActivePage: (page: Page) => void;
}

const DailyTasks: React.FC<DailyTasksProps> = ({ activities, dayNumber, onTaskClick, setActivePage }) => {
  return (
    <div className="flex flex-col h-full animate-fadeIn">
       {/* Desktop Back Button */}
       <div className="hidden md:flex items-center mb-2 pt-2">
        <button onClick={() => setActivePage(Page.ExpansionPage)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
       </div>

       {/* Prominent Instruction Banner */}
       <div className="flex-shrink-0 mb-4 mt-2">
         <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl shadow-sm flex items-center">
             <i className="fas fa-list-check text-amber-500 text-2xl mr-3"></i>
             <div>
                 <p className="text-amber-800 font-bold text-lg md:text-xl leading-tight">
                    Day {dayNumber} - Your goals for today.
                 </p>
                 <p className="text-amber-700/80 text-xs mt-0.5">Complete activities to unlock your daily badge!</p>
             </div>
         </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div 
                 key={activity.id} 
                 onClick={() => onTaskClick(activity)}
                 className="flex-1 relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group min-h-[160px]"
              >
                 {/* Removed scale-105 and hover effects */}
                 <img src={activity.image} alt={activity.title} className="absolute inset-0 w-full h-full object-cover blur-md" />
                 
                 {/* Dark Overlay - Uniform dark overlay + gradient for text readability */}
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
                 
                 {/* Checkmark Overlay if Completed */}
                 {activity.completed && (
                     <div className="absolute top-4 right-4 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10">
                         <i className="fas fa-check text-xl"></i>
                     </div>
                 )}
    
                 <div className="absolute bottom-0 left-0 p-6 w-full">
                     <div className="flex items-center space-x-2 mb-2">
                         <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30">
                            Task {index + 1}
                         </span>
                         <span className="text-white/80 text-xs font-medium">~{activity.recommendedTime} min</span>
                     </div>
                     <h3 className="text-3xl font-bold text-white leading-tight mb-1">{activity.title}</h3>
                     <p className="text-white/80 text-sm line-clamp-2">{activity.description}</p>
                     
                     <div className="mt-4 flex items-center text-sky-300 font-bold group-hover:text-sky-200 transition-colors">
                         <span>{activity.completed ? 'View Details' : 'Start Activity'}</span>
                         <i className="fas fa-arrow-right ml-2"></i>
                     </div>
                 </div>
              </div>
            ))
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-clipboard-list text-gray-400 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No tasks yet!</h3>
                <p className="text-gray-500 mb-6">You haven't selected any activities for Day {dayNumber}. Pick two to get started!</p>
                <button 
                    onClick={() => setActivePage(Page.ExpansionList)}
                    className="px-8 py-3 bg-amber-500 text-white font-bold rounded-xl shadow-md hover:bg-amber-600 transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i>
                    <span>Pick Activities</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default DailyTasks;
