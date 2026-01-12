
import React from 'react';
import BeeLogo from './BeeLogo';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const IconPill: React.FC<{ icon: string; color: string; animation?: string }> = ({ icon, color, animation = 'animate-float' }) => (
    <div className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-md bg-white ${animation}`}>
        <i className={`fas ${icon} text-2xl ${color}`}></i>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-sky-50 to-white overflow-hidden flex flex-col">
        {/* Decorative Background Shapes */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full opacity-60 blur-3xl"></div>
            <div className="absolute top-20 -right-20 w-72 h-72 bg-sky-100 rounded-full opacity-50 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-6 text-center max-w-md mx-auto w-full">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center">
                <BeeLogo className="w-16 h-16 md:w-20 md:h-20 mb-2" />
                <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>Speec<span className="text-amber-500">hive</span></h1>
            </div>
            
            {/* Icons Row */}
            <div className="flex justify-around items-center w-full max-w-xs md:max-w-sm mb-12">
                <IconPill icon="fa-comment-dots" color="text-sky-500" animation="animate-float-slow" />
                <IconPill icon="fa-book" color="text-rose-400" animation="animate-float-delayed" />
                <IconPill icon="fa-puzzle-piece" color="text-indigo-400" />
                <IconPill icon="fa-seedling" color="text-green-500" animation="animate-float-slow" />
                <IconPill icon="fa-utensils" color="text-yellow-400" animation="animate-float-delayed" />
                <IconPill icon="fa-feather-alt" color="text-amber-500" />
            </div>

            {/* Headline */}
            <h2 
                className="text-4xl md:text-5xl font-bold text-gray-700 leading-tight mb-4"
            >
                Enjoy Interactions with Child
            </h2>
            <p className="text-xl text-gray-600 max-w-lg mx-auto" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                Sign up to unlock tailored strategies through natural interactions to support their Speech journey for free.
            </p>
            
            <div className="w-full mt-auto pt-8">
                <div className="space-y-4">
                    <button 
                        onClick={onGetStarted}
                        className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg border-b-4 border-orange-600 active:border-b-0 active:translate-y-1 transition-transform duration-300 bg-[length:200%_auto] animate-gradient-flow"
                        style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                    >
                        Get Started
                    </button>
                </div>
                 <p className="mt-6 text-sm text-gray-500" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
                    By signing up, you agree to our Terms of Service & Privacy Policy.
                </p>
            </div>
        </div>
    </div>
  );
};

export default LandingPage;