
import React, { useState } from 'react';
import { Activity, Page } from '../types';
import { OPENEQ_ACTIVITY_POOL } from '../data/openeq';

interface OpeneqListProps {
  onActivitiesSelected: (activities: Activity[]) => void;
  setActivePage: (page: Page) => void;
}

const OpeneqList: React.FC<OpeneqListProps> = ({ onActivitiesSelected, setActivePage }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds(prev => [...prev, id]);
      } else {
        alert("You can only select 2 activities for the day.");
      }
    }
  };

  const handleContinue = () => {
    const selectedActivities = OPENEQ_ACTIVITY_POOL.filter(a => selectedIds.includes(a.id));
    onActivitiesSelected(selectedActivities);
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <div className="hidden md:flex items-center mb-2 pt-2">
        <button onClick={() => setActivePage(Page.OpenEQPage)} className="text-gray-500 hover:text-indigo-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
      </div>

      <div className="flex-shrink-0 mb-4 mt-2">
         <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-xl shadow-sm flex items-center">
             <i className="fas fa-check-double text-indigo-500 text-2xl mr-3"></i>
             <div>
                 <p className="text-indigo-800 font-bold text-lg md:text-xl leading-tight">
                    Pick 2 activities to practice today.
                 </p>
                 <p className="text-indigo-700/80 text-xs mt-0.5">Select from the list below to build your day.</p>
             </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 p-1 pb-4">
        {OPENEQ_ACTIVITY_POOL.map(activity => {
          const isSelected = selectedIds.includes(activity.id);
          return (
            <div 
              key={activity.id} 
              onClick={() => handleToggle(activity.id)} 
              className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-white shadow-sm ${isSelected ? 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
            >
               <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 bg-white'}`}>
                 {isSelected && <i className="fas fa-check text-white text-xs"></i>}
               </div>

               <div className="flex items-center space-x-4 w-full">
                   <img src={activity.image} alt={activity.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-sm" />
                   <div className="flex-1 pr-6">
                     <h4 className={`font-bold text-lg mb-1 ${isSelected ? 'text-indigo-900' : 'text-gray-800'}`}>{activity.title}</h4>
                     <p className="text-xs text-gray-500 leading-snug line-clamp-2">{activity.description}</p>
                     <div className="mt-2 flex items-center space-x-2">
                        <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            <i className="far fa-clock mr-1"></i>~{activity.recommendedTime}m
                        </span>
                     </div>
                   </div>
               </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 mt-auto">
         <button 
           onClick={handleContinue}
           disabled={selectedIds.length !== 2}
           className="w-full py-4 text-xl font-bold text-white bg-indigo-500 rounded-xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-600 transition-colors flex justify-center items-center gap-2"
         >
           <span>Start Day</span>
           {selectedIds.length > 0 && <span className="text-sm bg-white/20 px-2 py-0.5 rounded-md">{selectedIds.length}/2</span>}
         </button>
      </div>
    </div>
  );
};

export default OpeneqList;
