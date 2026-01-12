
import React from 'react';

interface HoneyStoreUnlockModalProps {
  onClose: () => void;
}

const HoneyStoreUnlockModal: React.FC<HoneyStoreUnlockModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
        {/* Backdrop */}
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" 
            onClick={onClose}
        ></div>
        
        {/* Bottom Sheet Panel */}
        <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 pb-20 text-center animate-slide-up-bottom relative z-10 shadow-2xl overflow-hidden">
            
            {/* Sparkles / Confetti Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 text-yellow-300 animate-bounce" style={{ animationDuration: '2s' }}><i className="fas fa-star text-xl"></i></div>
                <div className="absolute top-20 right-16 text-amber-300 animate-pulse" style={{ animationDuration: '1.5s' }}><i className="fas fa-star text-lg"></i></div>
                <div className="absolute bottom-32 left-1/4 text-orange-200 animate-ping" style={{ animationDuration: '3s' }}><i className="fas fa-star text-xs"></i></div>
                <div className="absolute top-1/4 right-5 text-yellow-400 animate-spin-slow"><i className="fas fa-certificate text-2xl opacity-20"></i></div>
            </div>

            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors focus:outline-none z-20"
            >
                <i className="fas fa-times"></i>
            </button>

            {/* Decorative Elements */}
            <div className="relative mx-auto mb-4 mt-2 w-24 h-24 flex items-center justify-center">
                {/* Pulsing ring */}
                <div className="absolute inset-0 bg-amber-400 rounded-full opacity-20 animate-ping"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
                    <i className="fas fa-store text-4xl text-white animate-bounce-slight"></i>
                </div>
                {/* Floating bees */}
                <div className="absolute -top-2 -right-4 animate-buzz-around" style={{ animationDuration: '4s' }}>
                    <i className="fas fa-bee text-amber-500 text-xl drop-shadow-sm transform rotate-12"></i>
                </div>
            </div>
            
            <div className="relative z-10 mt-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif">Welcome Aboard!</h2>
                <div className="flex justify-center items-center space-x-2 mb-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-green-200">
                        <i className="fas fa-check-circle mr-1"></i> Program Access Granted
                    </span>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed px-4">
                    You have successfully joined the <span className="font-bold text-amber-600">Family Support Program</span>. 
                </p>

                <div className="bg-amber-50 rounded-xl p-5 mb-8 text-left border border-amber-100 space-y-4 shadow-inner">
                    <div className="flex items-start">
                        <div className="bg-amber-200 p-1.5 rounded-full mr-3 mt-0.5 flex-shrink-0 text-amber-700">
                            <i className="fas fa-unlock text-xs"></i>
                        </div>
                        <p className="text-sm text-gray-700"><span className="font-bold text-gray-900">Honey Store</span> is now unlocked.</p>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-amber-200 p-1.5 rounded-full mr-3 mt-0.5 flex-shrink-0 text-amber-700">
                            <i className="fas fa-coins text-xs"></i>
                        </div>
                        <p className="text-sm text-gray-700">Earn <span className="font-bold text-gray-900">Honey Drops</span> for every completed activity.</p>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2"
                >
                    <span>Let's Go!</span>
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>
  );
};

export default HoneyStoreUnlockModal;
