
import React, { useState } from 'react';
import { Page, StrategyChallenge, NaturalisticStrategyType, UserInfo } from '../types';
import Card from './Card';
import Modal from './Modal';
import { IS_DEV_MODE } from '../constants';

interface HoneyStorePageProps {
    setActivePage: (page: Page) => void;
    honeyDrops: number;
    onRedeem: (strategyType: NaturalisticStrategyType) => void;
    strategyChallengesData: StrategyChallenge[];
    userInfo: UserInfo | null;
}

const StrategyRedeemCard: React.FC<{
    challenge: StrategyChallenge;
    onRedeem: () => void;
    userInfo: UserInfo | null;
}> = ({ challenge, onRedeem, userInfo }) => {
    const [showEligibleMsg, setShowEligibleMsg] = useState(false);

    // Count total completed activities in this strategy
    const allActivities = challenge.challenge.flatMap(d => d.activities);
    const completedCount = allActivities.filter(a => a.completed).length;
    
    // Calculate Days Passed
    // If startDate is undefined, daysPassed is 0.
    let daysPassed = 0;
    if (challenge.startDate) {
        const start = new Date(challenge.startDate);
        start.setHours(0, 0, 0, 0);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const diffTime = now.getTime() - start.getTime();
        daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    // Thresholds
    const MIN_ACTIVITIES = 40;
    const MIN_DAYS = 30;
    
    // Logic States
    const hasEnoughActivities = completedCount >= MIN_ACTIVITIES;
    const hasFinishedDuration = daysPassed >= MIN_DAYS;
    
    const isEligible = hasEnoughActivities; // Hit the 40 mark
    const canClaim = (hasEnoughActivities && hasFinishedDuration) || IS_DEV_MODE;

    // Check Redemption State
    const redemptionTime = userInfo?.redeemedStrategies?.[challenge.type];
    const isRedeemed = !!redemptionTime;
    
    // Calculate 48h window
    const hoursSinceRedemption = isRedeemed ? (Date.now() - redemptionTime) / (1000 * 60 * 60) : 0;
    // It becomes locked/unclickable 48 hours AFTER the initial download/claim.
    const isExpired = isRedeemed && hoursSinceRedemption >= 48;

    // Calculate potential value ($1.50 per activity)
    const potentialValue = (completedCount * 1.50).toFixed(2);

    const handleButtonClick = () => {
        if (isExpired) {
            return; // Do nothing
        } else if (isRedeemed) {
            // Re-open voucher
            onRedeem();
        } else if (canClaim) {
            // First time claim
            onRedeem();
        } else if (isEligible) {
            setShowEligibleMsg(true);
        }
    };

    return (
        <>
            <Card className={`flex flex-col justify-between h-full !p-4 border border-gray-100 ${isEligible ? 'bg-white' : 'bg-gray-50 opacity-90'}`}>
                <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${challenge.color}`}>
                        <i className={challenge.icon}></i>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm leading-tight">{challenge.title}</h3>
                        <p className="text-xs text-gray-500">30-Day Certificate</p>
                    </div>
                </div>
                
                <div className="mt-auto">
                    <div className="text-center mb-3">
                        <p className="text-lg font-bold text-amber-500">${potentialValue} <span className="text-xs font-normal text-gray-400">NZD</span></p>
                        <p className="text-[10px] text-gray-400">Earned so far ($1.50/activity)</p>
                    </div>
                    
                    {!isEligible && (
                        <div className="mb-3 text-center">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${Math.min((completedCount / MIN_ACTIVITIES) * 100, 100)}%` }}></div>
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold">{completedCount} / {MIN_ACTIVITIES} Activities</p>
                        </div>
                    )}

                    <button
                        onClick={handleButtonClick}
                        disabled={isExpired || (!isEligible && !IS_DEV_MODE)}
                        className={`w-full py-2 px-3 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2
                            ${isExpired
                                ? 'bg-gray-400 text-white cursor-not-allowed border-none' // Claimed & Expired
                                : isRedeemed
                                    ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer border-b-4 border-green-700 active:border-b-0 active:translate-y-1' // Redeemed < 48h
                                    : canClaim 
                                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white hover:from-amber-500 hover:to-yellow-600 cursor-pointer animate-pulse border-b-4 border-amber-600 active:border-b-0 active:translate-y-1' // Ready to claim
                                        : isEligible 
                                            ? 'bg-sky-100 text-sky-700 hover:bg-sky-200 border-b-4 border-sky-300 active:border-b-0 active:translate-y-1' // Eligible but waiting days
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed' // Locked
                            }
                        `}
                    >
                        {isExpired ? (
                            <>
                                <i className="fas fa-lock"></i>
                                <span>Claimed</span>
                            </>
                        ) : isRedeemed ? (
                            <>
                                <i className="fas fa-eye"></i>
                                <span>View Certificate</span>
                            </>
                        ) : canClaim ? (
                            <>
                                <i className="fas fa-trophy"></i>
                                <span>Claim Now</span>
                            </>
                        ) : isEligible ? (
                            <>
                                <i className="fas fa-check-circle"></i>
                                <span>User is Eligible</span>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-lock"></i>
                                <span>Complete 40+</span>
                            </>
                        )}
                    </button>
                </div>
            </Card>

            <Modal isOpen={showEligibleMsg} onClose={() => setShowEligibleMsg(false)}>
                <div className="text-center p-4">
                    <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-certificate text-sky-500 text-3xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Congratulations!</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-left">
                        You have met the minimum requirements for the <span className="font-bold text-amber-600">Completion Certification</span>.
                        <br/><br/>
                        Your certificate value is currently <span className="font-bold text-green-600">${potentialValue} NZD</span> based on your accumulated Honey Drops.
                        <br/><br/>
                        You can continue to complete more activities to increase this value until the 30-day period ends.
                        <br/><br/>
                        <span className="text-sm text-gray-500 block text-center mt-4">Day {Math.min(daysPassed + 1, 30)} of 30</span>
                    </p>
                    <button 
                        onClick={() => setShowEligibleMsg(false)}
                        className="w-full py-3 bg-sky-500 text-white font-bold rounded-xl shadow-md hover:bg-sky-600 transition-colors"
                    >
                        Understood
                    </button>
                </div>
            </Modal>
        </>
    );
};

const HoneyStorePage: React.FC<HoneyStorePageProps> = ({ setActivePage, honeyDrops, onRedeem, strategyChallengesData, userInfo }) => {
  const [showNzd, setShowNzd] = useState(false);

  // Guard Clause for Common Users
  if (userInfo?.role !== 'participant') {
      return (
          <div className="flex flex-col h-full animate-fadeIn items-center justify-center text-center p-6 space-y-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-lock text-gray-400 text-4xl"></i>
              </div>
              <div>
                  <h2 className="text-2xl font-bold text-gray-800">Program Exclusive</h2>
                  <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                      The Honey Store is available exclusively for participants of the University of Auckland Family Support Program.
                  </p>
              </div>
              <button 
                  onClick={() => setActivePage(Page.Dashboard)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl"
              >
                  Back to Dashboard
              </button>
          </div>
      );
  }

  // Exchange rate: 15 drops = $1.50 => 1 drop = $0.10
  const nzdValue = (honeyDrops * 0.10).toFixed(2);

  return (
    <div className="flex flex-col min-h-full animate-fadeIn space-y-4 pb-24">
        {/* Header */}
        <div className="flex-shrink-0">
            <div className="flex items-center space-x-4">
                <button onClick={() => setActivePage(Page.Dashboard)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to dashboard">
                    <i className="fas fa-arrow-left text-xl"></i>
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Honey Store</h2>
                    <p className="text-gray-500">Your hard work pays off!</p>
                </div>
            </div>
        </div>

        {/* Balance Card */}
        <Card 
            onClick={() => setShowNzd(!showNzd)}
            className="relative bg-gradient-to-br from-amber-300 to-yellow-400 text-center !p-8 flex-shrink-0 cursor-pointer shadow-lg transform transition-transform hover:scale-[1.01] group"
            aria-label="Tap to toggle between Honey Drops and NZD value"
        >
            {/* Visual Affordance: Switch Icon in Corner */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-amber-900/70 group-hover:bg-white/30 transition-all">
                 <i className="fas fa-exchange-alt text-sm"></i>
            </div>

            <p className="font-semibold text-amber-800 text-xs tracking-widest uppercase opacity-80">Current Balance</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
                <i className={`fas ${showNzd ? 'fa-dollar-sign' : 'fa-coins'} text-4xl text-white opacity-90`}></i>
                <span className="text-5xl font-extrabold text-white drop-shadow-md">
                    {showNzd ? nzdValue : honeyDrops.toLocaleString()}
                </span>
            </div>
            
            <div className="mt-3 inline-flex items-center justify-center bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm transition-colors group-hover:bg-white/30">
                <p className="text-sm font-bold text-amber-900">
                    {showNzd ? 'New Zealand Dollars' : 'Honey Drops'}
                </p>
            </div>
            
            {/* Visual Affordance: Text Instruction */}
            <p className="mt-2 text-[10px] text-amber-900/60 font-medium uppercase tracking-wide">Tap card to switch view</p>
        </Card>

        {/* Information Banner */}
        <div className="bg-sky-50 border-l-4 border-sky-400 p-3 rounded-r-lg shadow-sm">
            <div className="flex">
                <div className="flex-shrink-0">
                    <i className="fas fa-info-circle text-sky-500 text-xl"></i>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-sky-700">
                        Earn <span className="font-bold">$1.50</span> per activity. Complete 40+ activities to unlock your certificate.
                    </p>
                </div>
            </div>
        </div>

        {/* Strategy Certificates Grid */}
        <div className="flex-grow">
            <h3 className="font-bold text-gray-700 mb-3 ml-1">Strategy Certificates</h3>
            <div className="grid grid-cols-2 gap-3">
                {strategyChallengesData.map((challenge) => (
                    <StrategyRedeemCard 
                        key={challenge.type}
                        challenge={challenge}
                        onRedeem={() => onRedeem(challenge.type)}
                        userInfo={userInfo}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export default HoneyStorePage;
