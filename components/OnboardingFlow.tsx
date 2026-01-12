
import React, { useState, useRef } from 'react';
import BeeLogo from './BeeLogo';
import { HearingHistory } from '../types';

interface OnboardingData {
  dob: string;
  childName: string;
  homeLanguage: string;
  additionalLanguages: string;
  goals: string[];
  interests: string[];
  hearingHistory: HearingHistory;
  educationLevel?: string;
  referralSource?: string;
  // researchConsent removed from here as it is handled later
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const GOAL_OPTIONS = [
    "Improve my child's vocabulary",
    "Help them form longer sentences",
    "Make daily routines into learning moments",
    "Understand their hearing needs better",
    "Build confidence in communication",
];

const INTEREST_OPTIONS = [
    "Playing outside",
    "Building with blocks",
    "Reading books",
    "Arts and crafts",
    "Singing and music",
    "Playing with toys (cars, dolls, etc.)",
    "Screen time (tablets/TV)",
    "Puzzles and games",
    "Helping with chores",
    "Other",
];

const HEARING_DEGREES = ['Mild', 'Moderate', 'Severe', 'Profound'];

const EDUCATION_LEVELS_OPTIONS = [
  'Some high school',
  'High school',
  'Some college',
  'Associate degree',
  'College degree (BA/BS)',
  'Master\'s degree',
  'Professional degree',
  'Doctorate',
  'Prefer not to say',
];

const REFERRAL_OPTIONS = [
  'Doctor or Healthcare Provider',
  'Friend or family',
  'App Store',
  'Play Store',
  'Social media (e.g. Facebook)',
  'Search (e.g. Google)',
  'Other',
];

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number;}> = ({ currentStep, totalSteps }) => {
  const progressPercentage = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;
  return (
    <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
        <div 
            className="h-2 bg-amber-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
        ></div>
    </div>
  );
};

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [dob, setDob] = useState('');
  const [personalDetails, setPersonalDetails] = useState({ childName: '', homeLanguage: '', additionalLanguages: '' });
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [otherInterest, setOtherInterest] = useState('');
  
  // Hearing History State
  const [hasHearingLoss, setHasHearingLoss] = useState<boolean | null>(null);
  const [hearingDegree, setHearingDegree] = useState<string>('');
  const [hasDevices, setHasDevices] = useState<boolean | null>(null);
  const [deviceTypes, setDeviceTypes] = useState<string[]>([]);
  const [hearingAidConfig, setHearingAidConfig] = useState<'One Ear' | 'Both Ears' | ''>('');
  const [cochlearConfig, setCochlearConfig] = useState<'One Ear' | 'Both Ears' | ''>('');

  // New States
  const [educationLevel, setEducationLevel] = useState('');
  const [referralSource, setReferralSource] = useState('');

  const [error, setError] = useState('');
  const [inputType, setInputType] = useState('text');
  const inputRef = useRef<HTMLInputElement>(null);
  const deviceOptionsRef = useRef<HTMLDivElement>(null);
  
  // Total steps updated to 9 (Consent step removed)
  const totalSteps = 9;

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const parts = value.split('-');
    if (parts[0] && parts[0].length > 4) {
      parts[0] = parts[0].slice(0, 4);
      value = parts.join('-');
    }
    setDob(value);
    if (error) setError('');
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleDobContinue = () => {
    if (!dob) {
      setError("Please select your child's birthdate.");
      return;
    }
    const selectedDate = new Date(dob + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      setError("Please enter a valid date format.");
      return;
    }

    if (selectedDate > today) {
      setError("Date of birth cannot be in the future.");
      return;
    }
    
    setError('');
    setStep(2);
  };
  
  const handleStep2Continue = () => {
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    
    // Child Name Validation
    if (!personalDetails.childName.trim()) {
        setError("Please enter the child's name.");
        return;
    }
    if (!nameRegex.test(personalDetails.childName)) {
        setError("Child's name can only contain letters and spaces.");
        return;
    }

    // Home Language Validation
    if (!personalDetails.homeLanguage.trim()) {
        setError("Please enter the spoken language at home.");
        return;
    }

    setError('');
    setStep(3);
  };

  const handleCalibrationContinue = () => {
    setStep(4);
  };

  const handleGoalSelect = (goal: string) => {
    setSelectedGoals(prev => {
        if (prev.includes(goal)) {
            return prev.filter(g => g !== goal);
        }
        if (prev.length < 3) {
            return [...prev, goal];
        }
        return prev;
    });
  };

  const handleGoalsContinue = () => {
    setStep(5);
  };

  const handleMethodologyContinue = () => {
    setStep(6);
  };

  const handleInterestSelect = (interest: string) => {
    setSelectedInterests(prev => {
        const isSelected = prev.includes(interest);
        if (isSelected) {
            if (interest === 'Other') {
                setOtherInterest('');
            }
            return prev.filter(i => i !== interest);
        }
        if (prev.length < 3) {
            return [...prev, interest];
        }
        return prev;
    });
  };

  const handleInterestsContinue = () => {
     setStep(7);
  };

  // Hearing History Handlers
  const handleDeviceTypeSelect = (type: string) => {
      setDeviceTypes(prev => {
          if (prev.includes(type)) {
              // Reset config if deselecting
              if (type === 'Hearing Aid') setHearingAidConfig('');
              if (type === 'Cochlear Implant') setCochlearConfig('');
              return prev.filter(t => t !== type);
          }
          return [...prev, type];
      });
  };

  const handleHasDevicesChange = (hasDevices: boolean) => {
      setHasDevices(hasDevices);
      if (hasDevices) {
          setTimeout(() => {
              deviceOptionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
      }
  };

  const handleHearingHistoryContinue = () => {
      setStep(8);
  };

  const handleEducationSelect = (level: string) => {
      setEducationLevel(level);
  };
  
  const handleEducationContinue = () => {
      setStep(9);
  };

  const handleReferralSelect = (source: string) => {
      setReferralSource(source);
  };

  const handleReferralComplete = () => {
      // Consolidate data and finish onboarding
      const finalInterests = selectedInterests
      .filter(interest => interest !== 'Other')
      .concat(selectedInterests.includes('Other') && otherInterest.trim() ? [otherInterest.trim()] : []);

    const hearingHistory: HearingHistory = {
        hasHearingLoss: hasHearingLoss || false,
    };

    if (hasHearingLoss) {
        hearingHistory.degree = hearingDegree as any;
        hearingHistory.hasDevices = hasDevices || false;
        
        if (hasDevices) {
            hearingHistory.deviceTypes = deviceTypes;
            if (deviceTypes.includes('Hearing Aid')) hearingHistory.hearingAidConfig = hearingAidConfig as any;
            if (deviceTypes.includes('Cochlear Implant')) hearingHistory.cochlearImplantConfig = cochlearConfig as any;
        }
    }

    onComplete({ 
        dob, 
        ...personalDetails, 
        goals: selectedGoals, 
        interests: finalInterests,
        hearingHistory,
        educationLevel,
        referralSource,
    });
  };

  const handleIconClick = () => {
    setInputType('date');
    setTimeout(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, 10);
  };

  const isContinueDisabled = !dob;
  const isStep2ContinueDisabled = !personalDetails.childName || !personalDetails.homeLanguage;
  const isGoalsContinueDisabled = selectedGoals.length === 0;
  const isInterestsContinueDisabled = selectedInterests.length === 0 || (selectedInterests.includes('Other') && !otherInterest.trim());
  const isEducationContinueDisabled = !educationLevel;
  const isReferralContinueDisabled = !referralSource;
  
  // Validation for Step 7 (Hearing History)
  let isHearingHistoryFinishDisabled = hasHearingLoss === null;
  if (hasHearingLoss) {
      if (!hearingDegree) isHearingHistoryFinishDisabled = true;
      if (hasDevices === null) isHearingHistoryFinishDisabled = true;
      if (hasDevices) {
          if (deviceTypes.length === 0) isHearingHistoryFinishDisabled = true;
          if (deviceTypes.includes('Hearing Aid') && !hearingAidConfig) isHearingHistoryFinishDisabled = true;
          if (deviceTypes.includes('Cochlear Implant') && !cochlearConfig) isHearingHistoryFinishDisabled = true;
      }
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-white flex flex-col justify-start items-center" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
      <div className="max-w-sm w-full animate-fadeIn flex flex-col flex-grow p-6 h-full">
        {step === 1 && (
            <>
                <div className="flex items-center space-x-4 mb-6 opacity-0">
                    <i className="fas fa-arrow-left text-2xl"></i>
                    <ProgressBar currentStep={1} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            You're almost done
                        </h2>
                        <p className="text-xl text-gray-500 mt-2">
                            Your child's birthdate is required to create your account.
                        </p>
                    </div>
                    <div className="mt-10 relative">
                    <input
                        ref={inputRef} type={inputType} value={dob}
                        placeholder="Select Date of Birth"
                        onFocus={() => setInputType('date')}
                        onBlur={() => { if (!dob) setInputType('text'); }}
                        onChange={handleDobChange}
                        className={`w-full px-5 py-4 pr-12 text-lg text-gray-800 bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors placeholder-gray-400 ${error ? 'border-rose-500' : 'border-gray-300'}`}
                    />
                    <div onClick={handleIconClick} className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer" aria-label="Open date picker">
                        <i className="fas fa-calendar-alt text-xl text-orange-500"></i>
                    </div>
                    {error && <p className="text-rose-600 text-sm mt-2 text-center">{error}</p>}
                    </div>
                    <div className="mt-auto pt-8">
                        <button
                        onClick={handleDobContinue}
                        disabled={isContinueDisabled}
                        className={`w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ${isContinueDisabled ? 'text-gray-500 bg-gray-200 cursor-not-allowed' : 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl'}`}
                        >
                        Continue
                        </button>
                    </div>
                </div>
            </>
        )}

        {step === 2 && (
            <>
                <div className="flex items-center space-x-4 mb-10">
                    <button onClick={() => { setStep(1); setError(''); }} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                    <ProgressBar currentStep={2} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            One last step
                        </h2>
                        <p className="text-xl text-gray-500 mt-2">
                            This helps personalize your journey.
                        </p>
                    </div>

                    <div className="mt-10 space-y-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                id="childName" 
                                name="childName" 
                                value={personalDetails.childName} 
                                onChange={handleDetailsChange} 
                                required 
                                className="w-full px-5 py-4 pl-12 text-lg text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                                placeholder="Child's Name" 
                            />
                             <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="homeLanguage" className="block text-xs font-semibold text-gray-500 mb-1 ml-1">Spoken Language at Home</label>
                            <input 
                                type="text" 
                                id="homeLanguage" 
                                name="homeLanguage" 
                                value={personalDetails.homeLanguage} 
                                onChange={handleDetailsChange} 
                                required 
                                className="w-full px-5 py-4 pl-12 text-lg text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                                placeholder="e.g., English" 
                            />
                            <i className="fas fa-home absolute left-4 top-1/2 transform -translate-y-1/2 mt-3 text-gray-400 text-lg"></i>
                        </div>

                        <div className="relative">
                             <label htmlFor="additionalLanguages" className="block text-xs font-semibold text-gray-500 mb-1 ml-1">Additional Languages</label>
                            <input 
                                type="text" 
                                id="additionalLanguages" 
                                name="additionalLanguages" 
                                value={personalDetails.additionalLanguages} 
                                onChange={handleDetailsChange} 
                                className="w-full px-5 py-4 pl-12 text-lg text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                                placeholder="e.g., Māori" 
                            />
                             <i className="fas fa-language absolute left-4 top-1/2 transform -translate-y-1/2 mt-3 text-gray-400 text-lg"></i>
                        </div>
                        {error && <p className="text-rose-600 text-sm text-center pt-2">{error}</p>}
                    </div>

                    <div className="mt-auto pt-8">
                        <button
                            onClick={handleStep2Continue}
                            disabled={isStep2ContinueDisabled}
                            className={`w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ${isStep2ContinueDisabled ? 'text-gray-500 bg-gray-200 cursor-not-allowed' : 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl'}`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </>
        )}

        {step === 3 && (
             <>
                <div className="flex items-center space-x-4 mb-10">
                    <button onClick={() => setStep(2)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                    <ProgressBar currentStep={3} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow items-center justify-center animate-fadeIn">
                     <div className="mb-8 relative flex justify-center w-full">
                         <div className="absolute inset-0 bg-amber-200 rounded-full opacity-20 blur-2xl scale-75 animate-pulse"></div>
                         <BeeLogo className="w-48 h-48 animate-float" />
                     </div>
                     
                     <div className="text-center px-4">
                         <h2 className="text-3xl font-bold text-gray-700 mb-4" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            Kia ora, Whānau! Great to meet you!
                         </h2>
                         <p className="text-xl text-gray-500 leading-relaxed">
                            Next, we'll calibrate your Family Support Program to your current level.
                         </p>
                     </div>

                    <div className="mt-auto pt-8 w-full">
                        <button
                            onClick={handleCalibrationContinue}
                            className="w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </>
        )}

        {step === 4 && (
            <>
                <div className="flex items-center space-x-4 mb-10 flex-shrink-0">
                    <button onClick={() => { setStep(3); setError(''); }} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                    <ProgressBar currentStep={4} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="text-center flex-shrink-0">
                        <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            What are your main goals?
                        </h2>
                        <p className="text-xl text-gray-500 mt-2">
                            Select up to 3. This will help us tailor the experience for you.
                        </p>
                    </div>

                    <div className="mt-8 space-y-3 flex-grow overflow-y-auto overscroll-y-none no-scrollbar">
                        {GOAL_OPTIONS.map(goal => {
                            const isSelected = selectedGoals.includes(goal);
                            return (
                                <button
                                    key={goal}
                                    onClick={() => handleGoalSelect(goal)}
                                    className={`w-full p-4 text-left flex items-center space-x-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'bg-amber-50 border-amber-400' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className={`w-6 h-6 flex-shrink-0 rounded-md flex items-center justify-center border-2 ${isSelected ? 'bg-amber-400 border-amber-400' : 'border-gray-300'}`}>
                                        {isSelected && <i className="fas fa-check text-white text-sm"></i>}
                                    </div>
                                    <span className={`font-semibold ${isSelected ? 'text-amber-800' : 'text-gray-700'}`}>{goal}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-auto pt-8 flex-shrink-0">
                        <button
                            onClick={handleGoalsContinue}
                            disabled={isGoalsContinueDisabled}
                            className={`w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ${isGoalsContinueDisabled ? 'text-gray-500 bg-gray-200 cursor-not-allowed' : 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl'}`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </>
        )}

        {step === 5 && (
             <>
                <div className="flex items-center space-x-4 mb-10 flex-shrink-0">
                    <button onClick={() => setStep(4)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                    <ProgressBar currentStep={5} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow items-center justify-center animate-fadeIn text-center">
                     <div className="mb-10 relative flex justify-center items-center w-full">
                         <div className="absolute inset-0 bg-sky-100 rounded-full opacity-40 blur-3xl scale-125 animate-pulse"></div>
                         <div className="relative z-10 bg-white p-6 rounded-full shadow-lg">
                            <i className="fas fa-puzzle-piece text-6xl text-sky-500 animate-float"></i>
                         </div>
                         <div className="absolute -top-6 right-1/4 bg-white p-3 rounded-full shadow-md animate-float-delayed">
                             <i className="fas fa-star text-3xl text-amber-400"></i>
                         </div>
                         <div className="absolute -bottom-4 left-1/4 bg-white p-3 rounded-full shadow-md animate-float-slow">
                             <i className="fas fa-cube text-3xl text-indigo-400"></i>
                         </div>
                     </div>
                     
                     <div className="px-4 max-w-sm">
                         <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            Learning happens naturally.
                         </h2>
                         <p className="text-xl text-gray-500 leading-relaxed">
                            Speechive helps you turn everyday moments—like mealtime or playtime—into powerful language-building opportunities.
                         </p>
                     </div>

                    <div className="mt-auto pt-12 w-full flex-shrink-0">
                        <button
                            onClick={handleMethodologyContinue}
                            className="w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </>
        )}

        {step === 6 && (
             <>
                <div className="flex items-center space-x-4 mb-10 flex-shrink-0">
                    <button onClick={() => { setStep(5); setError(''); }} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                    <ProgressBar currentStep={6} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="text-center flex-shrink-0">
                        <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            Let's start with your child's interests
                        </h2>
                        <p className="text-xl text-gray-500 mt-2">
                            Select up to 3.
                        </p>
                    </div>

                    <div className="mt-8 space-y-3 flex-grow overflow-y-auto overscroll-y-none no-scrollbar">
                        {INTEREST_OPTIONS.map(interest => {
                            const isSelected = selectedInterests.includes(interest);
                            return (
                                <div key={interest}>
                                    <button
                                        onClick={() => handleInterestSelect(interest)}
                                        className={`w-full p-4 text-left flex items-center space-x-4 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'bg-amber-50 border-amber-400' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className={`w-6 h-6 flex-shrink-0 rounded-md flex items-center justify-center border-2 ${isSelected ? 'bg-amber-400 border-amber-400' : 'border-gray-300'}`}>
                                            {isSelected && <i className="fas fa-check text-white text-sm"></i>}
                                        </div>
                                        <span className={`font-semibold ${isSelected ? 'text-amber-800' : 'text-gray-700'}`}>{interest}</span>
                                    </button>
                                    {interest === 'Other' && isSelected && (
                                        <div className="mt-2 ml-4 animate-fadeIn">
                                            <input
                                                type="text"
                                                value={otherInterest}
                                                onChange={(e) => setOtherInterest(e.target.value)}
                                                placeholder="Please specify..."
                                                className="w-full px-4 py-2 text-base text-gray-800 bg-white border border-amber-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                     <div className="mt-auto pt-8 flex-shrink-0">
                        <button
                            onClick={handleInterestsContinue}
                            disabled={isInterestsContinueDisabled}
                            className={`w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ${isInterestsContinueDisabled ? 'text-gray-500 bg-gray-200 cursor-not-allowed' : 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl'}`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </>
        )}

        {step === 7 && (
             <>
                <div className="flex items-center space-x-4 mb-10 flex-shrink-0">
                    <button onClick={() => { setStep(6); setError(''); }} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                    <ProgressBar currentStep={7} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="text-center flex-shrink-0 mb-6">
                        <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            Hearing History
                        </h2>
                        <p className="text-xl text-gray-500 mt-2">
                            Help us understand your child's hearing journey.
                        </p>
                    </div>

                    <div className="flex-grow overflow-y-auto overscroll-y-none no-scrollbar space-y-6 pb-4">
                        {/* Question 1: Hearing Loss */}
                        <div className="space-y-3">
                            <label className="block text-lg font-semibold text-gray-700">Does your child have hearing loss?</label>
                            <div className="flex space-x-4">
                                <button 
                                    onClick={() => setHasHearingLoss(true)} 
                                    className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${hasHearingLoss === true ? 'bg-amber-50 border-amber-400 text-amber-800' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    Yes
                                </button>
                                <button 
                                    onClick={() => setHasHearingLoss(false)} 
                                    className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${hasHearingLoss === false ? 'bg-amber-50 border-amber-400 text-amber-800' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    No
                                </button>
                            </div>
                        </div>

                        {/* Conditional Section: Degree */}
                        {hasHearingLoss && (
                            <div className="space-y-3 animate-fadeIn">
                                <label className="block text-lg font-semibold text-gray-700">Degree of Hearing Loss</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {HEARING_DEGREES.map(degree => (
                                        <button
                                            key={degree}
                                            onClick={() => setHearingDegree(degree)}
                                            className={`py-2 px-3 rounded-xl border-2 font-medium transition-all ${hearingDegree === degree ? 'bg-amber-50 border-amber-400 text-amber-800' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                        >
                                            {degree}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Conditional Section: Hearing Devices */}
                        {hasHearingLoss && hearingDegree && (
                             <div className="space-y-3 animate-fadeIn">
                                <label className="block text-lg font-semibold text-gray-700">Does your child use hearing devices?</label>
                                <div className="flex space-x-4">
                                    <button 
                                        onClick={() => handleHasDevicesChange(true)} 
                                        className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${hasDevices === true ? 'bg-amber-50 border-amber-400 text-amber-800' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                    >
                                        Yes
                                    </button>
                                    <button 
                                        onClick={() => handleHasDevicesChange(false)} 
                                        className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all ${hasDevices === false ? 'bg-amber-50 border-amber-400 text-amber-800' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Conditional Section: Device Types */}
                        {hasHearingLoss && hasDevices && (
                            <div ref={deviceOptionsRef} className="space-y-4 animate-fadeIn bg-gray-50 p-4 rounded-xl">
                                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Select Devices (Multiple Allowed)</label>
                                
                                {/* Hearing Aid Option */}
                                <div>
                                    <button 
                                        onClick={() => handleDeviceTypeSelect('Hearing Aid')}
                                        className={`w-full flex items-center p-3 rounded-lg border-2 transition-all ${deviceTypes.includes('Hearing Aid') ? 'bg-white border-amber-400 text-amber-900 shadow-sm' : 'bg-white border-gray-200 text-gray-600'}`}
                                    >
                                        <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${deviceTypes.includes('Hearing Aid') ? 'bg-amber-400 border-amber-400' : 'border-gray-300'}`}>
                                            {deviceTypes.includes('Hearing Aid') && <i className="fas fa-check text-white text-xs"></i>}
                                        </div>
                                        <span className="font-semibold">Hearing Aid</span>
                                    </button>
                                    
                                    {/* Sub-option for Hearing Aid */}
                                    {deviceTypes.includes('Hearing Aid') && (
                                        <div className="mt-2 ml-8 flex space-x-2 animate-fadeIn">
                                             <button onClick={() => setHearingAidConfig('One Ear')} className={`flex-1 text-sm py-1.5 px-3 rounded-md border transition-all ${hearingAidConfig === 'One Ear' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-gray-300 text-gray-600'}`}>One Ear</button>
                                             <button onClick={() => setHearingAidConfig('Both Ears')} className={`flex-1 text-sm py-1.5 px-3 rounded-md border transition-all ${hearingAidConfig === 'Both Ears' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-gray-300 text-gray-600'}`}>Both Ears</button>
                                        </div>
                                    )}
                                </div>

                                {/* Cochlear Implant Option */}
                                <div>
                                    <button 
                                        onClick={() => handleDeviceTypeSelect('Cochlear Implant')}
                                        className={`w-full flex items-center p-3 rounded-lg border-2 transition-all ${deviceTypes.includes('Cochlear Implant') ? 'bg-white border-amber-400 text-amber-900 shadow-sm' : 'bg-white border-gray-200 text-gray-600'}`}
                                    >
                                        <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${deviceTypes.includes('Cochlear Implant') ? 'bg-amber-400 border-amber-400' : 'border-gray-300'}`}>
                                            {deviceTypes.includes('Cochlear Implant') && <i className="fas fa-check text-white text-xs"></i>}
                                        </div>
                                        <span className="font-semibold">Cochlear Implant</span>
                                    </button>

                                    {/* Sub-option for Cochlear Implant */}
                                    {deviceTypes.includes('Cochlear Implant') && (
                                        <div className="mt-2 ml-8 flex space-x-2 animate-fadeIn">
                                             <button onClick={() => setCochlearConfig('One Ear')} className={`flex-1 text-sm py-1.5 px-3 rounded-md border transition-all ${cochlearConfig === 'One Ear' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-gray-300 text-gray-600'}`}>One Ear</button>
                                             <button onClick={() => setCochlearConfig('Both Ears')} className={`flex-1 text-sm py-1.5 px-3 rounded-md border transition-all ${cochlearConfig === 'Both Ears' ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-white border-gray-300 text-gray-600'}`}>Both Ears</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                     <div className="mt-auto pt-8 flex-shrink-0">
                        <button
                            onClick={handleHearingHistoryContinue}
                            disabled={isHearingHistoryFinishDisabled}
                            className={`w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ${isHearingHistoryFinishDisabled ? 'text-gray-500 bg-gray-200 cursor-not-allowed' : 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl'}`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </>
        )}

        {/* Step 8: Education Level */}
        {step === 8 && (
             <>
                <div className="flex items-center space-x-4 mb-10 flex-shrink-0">
                    <button onClick={() => setStep(7)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                    <ProgressBar currentStep={8} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="text-center flex-shrink-0">
                        <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            What's the highest level of education you've completed?
                        </h2>
                    </div>

                    <div className="mt-8 space-y-3 flex-grow overflow-y-auto overscroll-y-none no-scrollbar">
                        {EDUCATION_LEVELS_OPTIONS.map(level => {
                            const isSelected = educationLevel === level;
                            return (
                                <button
                                    key={level}
                                    onClick={() => handleEducationSelect(level)}
                                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${isSelected ? 'bg-amber-50 border-amber-400 text-amber-800 font-semibold' : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700 font-medium'}`}
                                >
                                    {level}
                                </button>
                            );
                        })}
                    </div>
                     <div className="mt-auto pt-8 flex-shrink-0">
                        <button
                            onClick={handleEducationContinue}
                            disabled={isEducationContinueDisabled}
                            className={`w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ${isEducationContinueDisabled ? 'text-gray-500 bg-gray-200 cursor-not-allowed' : 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl'}`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </>
        )}

        {/* Step 9: Referral Source - Final Step of Initial Onboarding */}
        {step === 9 && (
             <>
                <div className="flex items-center space-x-4 mb-10 flex-shrink-0">
                    <button onClick={() => setStep(8)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 -ml-2" aria-label="Go back">
                        <i className="fas fa-arrow-left text-2xl"></i>
                    </button>
                    <ProgressBar currentStep={9} totalSteps={totalSteps} />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <div className="text-center flex-shrink-0">
                        <h2 className="text-3xl font-bold text-gray-700" style={{ fontFamily: "'Source Serif Pro', serif" }}>
                            How did you hear about Speechive?
                        </h2>
                    </div>

                    <div className="mt-8 space-y-3 flex-grow overflow-y-auto overscroll-y-none no-scrollbar">
                        {REFERRAL_OPTIONS.map(source => {
                            const isSelected = referralSource === source;
                            return (
                                <button
                                    key={source}
                                    onClick={() => handleReferralSelect(source)}
                                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${isSelected ? 'bg-amber-50 border-amber-400 text-amber-800 font-semibold' : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700 font-medium'}`}
                                >
                                    {source}
                                </button>
                            );
                        })}
                    </div>
                     <div className="mt-auto pt-8 flex-shrink-0">
                        <button
                            onClick={handleReferralComplete}
                            disabled={isReferralContinueDisabled}
                            className={`w-full py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 ${isReferralContinueDisabled ? 'text-gray-500 bg-gray-200 cursor-not-allowed' : 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl'}`}
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </>
        )}
      </div>
    </div>
  );
};


export default OnboardingFlow;