
import React, { useState, useEffect, useRef } from 'react';
import { Activity, Page } from '../types';

interface ActivityDetailProps {
  activity: Activity;
  onStartTimer: () => void;
  isTimerActive: boolean;
  setActivePage: (page: Page) => void;
  areAnimationsEnabled?: boolean;
  skipTrigger?: number;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

// Sub-component for individual script cards to handle independent scrolling triggers
const ScriptCard: React.FC<{ 
    scriptItem: { title: string; dialogue: { speaker: 'Child' | 'Parent'; line: string }[] }; 
    index: number;
    areAnimationsEnabled: boolean;
    forceVisible: boolean;
}> = ({ scriptItem, index, areAnimationsEnabled, forceVisible }) => {
    // If animations are disabled or forced visible, start true. Otherwise start false.
    const [isVisible, setIsVisible] = useState(!areAnimationsEnabled || forceVisible);
    const cardRef = useRef<HTMLDivElement>(null);
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        if (forceVisible) {
            setIsVisible(true);
            return;
        }

        // Only setup observer if we are animating and haven't forced visibility
        if (areAnimationsEnabled) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (cardRef.current) observer.unobserve(cardRef.current);
                    }
                },
                { threshold: 0.1 } 
            );

            if (cardRef.current) {
                observer.observe(cardRef.current);
            }

            return () => {
                if (cardRef.current) observer.unobserve(cardRef.current);
            };
        }
    }, [areAnimationsEnabled, forceVisible]);

    // Auto-scroll effect
    useEffect(() => {
        // Don't auto-scroll if we are skipping/forcing visibility or if not visible yet
        if (isVisible && areAnimationsEnabled && !forceVisible) {
            scriptItem.dialogue.forEach((_, i) => {
                const delay = i * 1800 + 700; 
                
                const timeoutId = setTimeout(() => {
                    const bubbleId = `bubble-${index}-${i}`;
                    const element = document.getElementById(bubbleId);
                    if (element) {
                        element.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                }, delay);
                
                timeoutsRef.current.push(timeoutId);
            });
        }

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };
    }, [isVisible, areAnimationsEnabled, forceVisible, index, scriptItem.dialogue]);

    return (
        <div ref={cardRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center">
                <div className="bg-amber-100 text-amber-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    {index + 1}
                </div>
                <h4 className="font-bold text-gray-700 text-sm md:text-base">{scriptItem.title}</h4>
            </div>
            
            <div className="p-5 space-y-4">
                {scriptItem.dialogue.map((line, lineIndex) => (
                    <div 
                        key={lineIndex} 
                        id={`bubble-${index}-${lineIndex}`}
                        className={`flex gap-3 transition-opacity duration-300 ${isVisible ? 'animate-chat-bubble' : 'opacity-0'} ${line.speaker === 'Parent' ? 'flex-row-reverse' : ''}`}
                        // If forced visible, no delay. Otherwise standard delay.
                        style={{ animationDelay: (isVisible && !forceVisible && areAnimationsEnabled) ? `${lineIndex * 0.8}s` : '0s', animationFillMode: 'forwards' }}
                    >
                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md flex-shrink-0 border-2 border-white ${line.speaker === 'Parent' ? 'bg-amber-500' : 'bg-sky-500'}`}>
                                {line.speaker === 'Parent' ? 'P' : 'C'}
                            </div>
                            
                            {/* Bubble */}
                            <div className={`relative py-3 px-4 rounded-2xl max-w-[85%] text-md md:text-base shadow-sm leading-relaxed ${line.speaker === 'Parent' ? 'bg-amber-100 text-amber-900 rounded-tr-none' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'}`}>
                                {line.line}
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ActivityDetail: React.FC<ActivityDetailProps> = ({ 
    activity, 
    onStartTimer, 
    isTimerActive, 
    setActivePage,
    areAnimationsEnabled = true,
    skipTrigger = 0,
    onAnimationStart,
    onAnimationComplete
}) => {
  const [showScrollGuide, setShowScrollGuide] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);
  const hasScrolledRef = useRef(false);

  // Handle Skip Trigger from Parent
  useEffect(() => {
      if (skipTrigger > 0) {
          setForceVisible(true);
      }
  }, [skipTrigger]);

  // Handle Animation State Notifications
  useEffect(() => {
      if (areAnimationsEnabled) {
          setForceVisible(false); // Reset on mount
          if (onAnimationStart) onAnimationStart();
      } else {
          setForceVisible(true);
      }
      
      // Since we can't easily track exactly when all child CSS animations finish without complexity,
      // we assume if animations are disabled or we force visible, it's "complete".
      // If animating, the parent handles the "Stop" button visibility until clicked.
      return () => {
          if (onAnimationComplete) onAnimationComplete();
      };
  }, [areAnimationsEnabled, activity.id]); // Reset when activity changes

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
        hasScrolledRef.current = true;
        setShowScrollGuide(false);
        clearTimeout(showTimer);
    };

    window.addEventListener('scroll', handleScroll, true);

    showTimer = setTimeout(() => {
        if (!hasScrolledRef.current) {
            setShowScrollGuide(true);
            hideTimer = setTimeout(() => {
                setShowScrollGuide(false);
            }, 3000);
        }
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="-mx-3 -mt-3 md:-mx-6 md:-mt-6 flex flex-col min-h-full bg-white relative">
       
       {showScrollGuide && (
         <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none animate-fadeIn">
             <div className="bg-black/70 backdrop-blur-sm text-white px-8 py-5 rounded-2xl flex flex-col items-center shadow-2xl animate-bounce">
                 <span className="font-bold text-lg mb-2 tracking-wide">Scroll Down</span>
                 <i className="fas fa-chevron-down text-2xl"></i>
                 <i className="fas fa-chevron-down text-xl opacity-50 -mt-2"></i>
             </div>
         </div>
       )}

       <div className="w-full aspect-square relative flex-shrink-0">
           <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/30"></div>
       </div>

       <div className="flex-1 px-5 md:px-8 relative z-10 -mt-10 pb-32">
           <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100 mb-6">
               <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 leading-tight">{activity.title}</h1>
               <div className="flex items-center text-gray-500 text-xs font-medium mb-4">
                   <i className="far fa-clock mr-1"></i>
                   <span>~{activity.recommendedTime} minutes</span>
               </div>
               <div className="text-gray-700 text-base leading-relaxed font-medium">
                   {activity.description}
               </div>
           </div>

           <div className="mb-8">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl shadow-sm flex items-start">
                    <i className="fas fa-comments text-amber-500 text-xl mr-3 mt-0.5 flex-shrink-0"></i>
                    <div>
                        <h4 className="font-bold text-amber-900 text-sm mb-1">Conversation Examples:</h4>
                        <p className="text-amber-800/90 text-sm md:text-base leading-snug italic">
                            Use these example conversations as a guide. Follow your child's lead and adapt the dialogue naturally.
                        </p>
                    </div>
                </div>
           </div>

           <div className="space-y-8">
             {activity.script.map((scriptItem, index) => (
                <ScriptCard 
                    key={index} 
                    scriptItem={scriptItem} 
                    index={index} 
                    areAnimationsEnabled={areAnimationsEnabled}
                    forceVisible={forceVisible}
                />
             ))}
           </div>
       </div>

       <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 z-30 md:relative md:border-none md:bg-transparent">
           <div className="max-w-md mx-auto md:max-w-none"> 
               {activity.completed ? (
                    <div className="w-full py-4 bg-green-100 text-green-800 rounded-xl text-center font-bold flex items-center justify-center gap-2 shadow-sm border border-green-200">
                        <i className="fas fa-check-circle text-xl"></i>
                        <span>Activity Complete!</span>
                    </div>
               ) : (
                    <button 
                        onClick={onStartTimer}
                        disabled={isTimerActive}
                        className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isTimerActive ? (
                            <>
                                <i className="fas fa-hourglass-half animate-spin"></i>
                                Timer Running...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-play"></i>
                                Start Activity
                            </>
                        )}
                    </button>
               )}
           </div>
       </div>
    </div>
  );
};

export default ActivityDetail;
