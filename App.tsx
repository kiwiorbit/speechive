
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SidebarNav from './components/SidebarNav';
import Dashboard from './components/Dashboard';
import NaturalisticStrategies from './components/NaturalisticStrategies';
import ProgressTracker from './components/ProgressTracker';
import SettingsPage from './components/SettingsPage';
import ChecklistPage from './components/ChecklistPage';
import RewardBadgesPage from './components/RewardBadgesPage';
import FloatingTimer from './components/FloatingTimer';
import ContactPage from './components/ContactPage';
import OnboardingFlow from './components/OnboardingFlow';
import ResourcesPage from './components/ResourcesPage';
import ArticleListPage from './components/ArticleListPage';
import ArticleDetailPage from './components/ArticleDetailPage';
import TutorialsPage from './components/TutorialsPage';
import LinksPage from './components/LinksPage';
import VideoPlayerModal from './components/VideoPlayerModal';
import HoneyStorePage from './components/HoneyStorePage';
import HoneyDropAnimation from './components/HoneyDropAnimation';
import StrategyAnalysis from './components/StrategyAnalysis';
import DayCompletionCelebration from './components/DayCompletionCelebration';
import VoucherPage from './components/VoucherPage';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import ExpansionPage from './components/ExpansionPage';
import ExpansionList from './components/ExpansionList';
import RecastPage from './components/RecastPage';
import RecastList from './components/RecastList';
import OpenEQPage from './components/OpeneqPage';
import OpenEQList from './components/OpeneqList';
import CommentPage from './components/CommentPage';
import CommentList from './components/CommentList';
import DailyTasks from './components/DailyTasks';
import ActivityDetail from './components/ActivityDetail';
import HoneyStoreUnlockModal from './components/HoneyStoreUnlockModal';

import { Page, DailyChallenge, TimerState, UserInfo, Article, NaturalisticStrategyType, StrategyChallenge, VoucherInfo, HearingHistory, Activity } from './types';
import { NAV_ITEMS, THIRTY_DAY_CHALLENGE, NATURALISTIC_STRATEGIES, EDUCATION_LEVELS, HOME_LANGUAGES, IS_DEV_MODE } from './constants';

const DUMMY_USER: UserInfo = {
  caregiverName: "Dev Parent",
  childName: "Dev Child",
  childDob: "2020-01-01",
  honeyDrops: 500,
  parentalEducation: "Bachelor's Degree",
  homeLanguage: "English",
  additionalLanguages: "",
  parentGoals: ["Improve vocabulary", "Build confidence"],
  childInterests: ["Playing outside", "Reading books"],
  hearingHistory: {
    hasHearingLoss: true,
    degree: 'Moderate',
    hasDevices: true,
    deviceTypes: ['Hearing Aid'],
    hearingAidConfig: 'Both Ears'
  },
  researchConsent: true,
  role: 'participant', // Default to participant for full feature dev
  programCode: 'DEV2025',
  email: 'dev@example.com',
  username: 'dev_user',
  researchDiscussion: true,
  redeemedStrategies: {}
};
// ---------------------------------------------------------------------

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
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [tempOnboardingData, setTempOnboardingData] = useState<OnboardingData | null>(null);
  
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [animationClass, setAnimationClass] = useState('animate-fadeIn');
  const [strategyChallengesData, setStrategyChallengesData] = useState<StrategyChallenge[]>(NATURALISTIC_STRATEGIES);
  const [claimedBadges, setClaimedBadges] = useState<number[]>([]);
  const [timerState, setTimerState] = useState<TimerState>({ isActive: false, startTime: null, strategyType: null, dayIndex: null, activityId: null });
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isAnimatingDrops, setIsAnimatingDrops] = useState<boolean>(false);
  
  // Selection States for Strategy/Days
  const [selectedStrategyCategory, setSelectedStrategyCategory] = useState<NaturalisticStrategyType | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const [celebrationInfo, setCelebrationInfo] = useState<{ day: number } | null>(null);
  const [voucherInfo, setVoucherInfo] = useState<VoucherInfo | null>(null);
  const [showWelcomeUnlock, setShowWelcomeUnlock] = useState(false);

  // Animation Control States
  const [areAnimationsEnabled, setAreAnimationsEnabled] = useState<boolean>(true);
  const [showSkipAnimationBtn, setShowSkipAnimationBtn] = useState<boolean>(false);
  const [skipAnimationSignal, setSkipAnimationSignal] = useState<number>(0);

  // Load all data from local storage on initial mount
  useEffect(() => {
    const loadData = () => {
      // Check Dev Toggle
      if (IS_DEV_MODE) {
        console.log("⚠️ DEV MODE: Skipping Onboarding with Dummy Data");
        setUserInfo(DUMMY_USER);
        setShowLanding(false);
        setIsLoading(false);
        return; 
      }

      const savedUserInfo = localStorage.getItem('speechiveUserInfo');
      if (savedUserInfo) {
        const parsedInfo = JSON.parse(savedUserInfo);
        // Migration support for older local storage without role
        if (!parsedInfo.role) parsedInfo.role = 'common_user';
        if (!parsedInfo.redeemedStrategies) parsedInfo.redeemedStrategies = {};
        setUserInfo(parsedInfo);
        setShowLanding(false);
      } else {
        setShowLanding(true);
      }

      const savedChallenges = localStorage.getItem('speechiveChallengesData');
      if (savedChallenges) setStrategyChallengesData(JSON.parse(savedChallenges));

      const savedBadges = localStorage.getItem('speechiveClaimedBadges');
      if (savedBadges) setClaimedBadges(JSON.parse(savedBadges));
      
      const savedAnimPref = localStorage.getItem('speechiveAnimationsEnabled');
      if (savedAnimPref !== null) {
          setAreAnimationsEnabled(JSON.parse(savedAnimPref));
      }

      setIsLoading(false);
    };

    const timer = setTimeout(loadData, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    if (userInfo) localStorage.setItem('speechiveUserInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem('speechiveChallengesData', JSON.stringify(strategyChallengesData));
  }, [strategyChallengesData]);

  useEffect(() => {
    localStorage.setItem('speechiveClaimedBadges', JSON.stringify(claimedBadges));
  }, [claimedBadges]);
  
  useEffect(() => {
      localStorage.setItem('speechiveAnimationsEnabled', JSON.stringify(areAnimationsEnabled));
  }, [areAnimationsEnabled]);

  const awardHoneyDrops = (amount: number) => {
    // Only award drops if the user is a participant
    if (userInfo?.role === 'participant') {
        setUserInfo(prev => prev ? { ...prev, honeyDrops: (prev.honeyDrops || 0) + amount } : prev);
        setIsAnimatingDrops(true);
    }
  };

  const todaysCompletedActivitiesCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return strategyChallengesData
        .flatMap(challenge => 
            challenge.challenge.flatMap(day => 
                day.activities
            )
        )
        .filter(activity => 
            activity.completed && activity.completionDate && 
            activity.completionDate >= today.getTime() && activity.completionDate < tomorrow.getTime()
        )
        .length;
  }, [strategyChallengesData]);

  const handleStartTimer = (strategyType: NaturalisticStrategyType, dayIndex: number, activityId: string) => {
    // UPDATED LIMIT: Max 3 activities per day
    if (todaysCompletedActivitiesCount >= 3) {
      alert("You have completed the maximum of 3 activities for today. Come back tomorrow!");
      return;
    }
    setTimerState({ isActive: true, startTime: Date.now(), strategyType, dayIndex, activityId });
  };
  
  const handleStopTimer = () => {
    if (timerState.isActive && timerState.startTime && timerState.strategyType && timerState.dayIndex !== null && timerState.activityId) {
      const duration = Math.round((Date.now() - timerState.startTime) / 1000);
      const { strategyType, dayIndex, activityId } = timerState;
  
      let wasAlreadyCompleted = false;
      const completionTimestamp = Date.now();
      
      const updatedChallenges = strategyChallengesData.map(challenge => {
        if (challenge.type === strategyType) {
          
          // START DATE LOGIC:
          // If this is the FIRST activity ever completed for this strategy, set the startDate.
          // This starts the 30-day countdown clock.
          let newStartDate = challenge.startDate;
          if (!newStartDate) {
              newStartDate = Date.now();
          }

          const updatedChallengeDays = challenge.challenge.map((day, index) => {
            if (index === dayIndex) {
              return {
                ...day,
                activities: day.activities.map(activity => {
                  if (activity.id === activityId) {
                    wasAlreadyCompleted = activity.completed;
                    return { 
                        ...activity, 
                        duration: (activity.duration || 0) + duration, 
                        completed: true,
                        completionDate: completionTimestamp,
                        honeyDropsEarned: wasAlreadyCompleted ? activity.honeyDropsEarned : 15 // 15 Drops per activity ($1.50)
                    };
                  }
                  return activity;
                }),
              };
            }
            return day;
          });
          return { ...challenge, startDate: newStartDate, challenge: updatedChallengeDays };
        }
        return challenge;
      });

      setStrategyChallengesData(updatedChallenges);
      
      // Update the local selectedActivity state if it exists so the UI reflects the change immediately
      if (selectedActivity && selectedActivity.id === activityId) {
          setSelectedActivity(prev => prev ? ({
              ...prev,
              completed: true,
              duration: (prev.duration || 0) + duration
          }) : null);
      }
      
      if (!wasAlreadyCompleted) {
        awardHoneyDrops(15); // 15 Drops = $1.50

        const updatedChallenge = updatedChallenges.find(c => c.type === strategyType);
        if (updatedChallenge) {
          const updatedDay = updatedChallenge.challenge[dayIndex];
          const completedCount = updatedDay ? updatedDay.activities.filter(a => a.completed).length : 0;
          if (updatedDay && completedCount === 3) { 
            setCelebrationInfo({ day: dayIndex + 1 });
          }
        }
      }
    }
    setTimerState({ isActive: false, startTime: null, strategyType: null, dayIndex: null, activityId: null });
  };

  const handleClaimBadge = (day: number) => {
    if (!claimedBadges.includes(day)) {
      setClaimedBadges(prev => [...prev, day].sort((a, b) => a - b));
      awardHoneyDrops(15); // Consistent 15 drops for badge too
    }
  };

  const handleChecklistComplete = () => {
    awardHoneyDrops(15);
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress? This action cannot be undone.")) {
      localStorage.removeItem('speechiveUserInfo');
      localStorage.removeItem('speechiveChallengesData');
      localStorage.removeItem('speechiveClaimedBadges');
      // Reset first time intro modal state
      localStorage.removeItem('speechive_hasSeenStrategyIntro');
      window.location.reload();
    }
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setTempOnboardingData(data);
    setIsOnboarding(false);
    setIsSigningUp(true);
  };
  
  const handleSignUp = (method: string, role: 'common_user' | 'participant' = 'common_user', code?: string, email?: string, researchDiscussion?: boolean, researchConsent?: boolean) => {
    if (!tempOnboardingData) return;
    
    // Generate username from email if present
    let username = 'Guest';
    if (email) {
        // Extract part before @
        username = email.split('@')[0];
    } else {
        // If no email (guest), default
        username = 'Guest_Parent';
    }

    const newUserInfo: UserInfo = {
        caregiverName: "Caregiver", 
        childName: tempOnboardingData.childName,
        childDob: tempOnboardingData.dob,
        honeyDrops: 0,
        parentalEducation: tempOnboardingData.educationLevel || EDUCATION_LEVELS[0],
        homeLanguage: tempOnboardingData.homeLanguage,
        additionalLanguages: tempOnboardingData.additionalLanguages,
        parentGoals: tempOnboardingData.goals,
        childInterests: tempOnboardingData.interests,
        hearingHistory: tempOnboardingData.hearingHistory,
        referralSource: tempOnboardingData.referralSource,
        researchConsent: researchConsent || false,
        role: role,
        programCode: code,
        email: email,
        username: username,
        researchDiscussion: researchDiscussion,
        redeemedStrategies: {}
    };
    
    setUserInfo(newUserInfo);
    setIsSigningUp(false);
    
    if (role === 'participant') {
        setShowWelcomeUnlock(true);
    }
    
    handlePageChange(Page.Dashboard);
  };

  const handleSignUpBack = () => {
      // If user goes back from sign up, return to start
      setIsSigningUp(false);
      setShowLanding(true);
      setTempOnboardingData(null);
  };

  const handleSelectStrategyCategory = (categoryType: NaturalisticStrategyType) => {
    setSelectedStrategyCategory(categoryType);
    switch(categoryType) {
        case NaturalisticStrategyType.Expansion: handlePageChange(Page.ExpansionPage); break;
        case NaturalisticStrategyType.Recast: handlePageChange(Page.RecastPage); break;
        case NaturalisticStrategyType.OpenEQ: handlePageChange(Page.OpenEQPage); break;
        case NaturalisticStrategyType.Comment: handlePageChange(Page.CommentPage); break;
        default: handlePageChange(Page.ExpansionPage);
    }
  };

  const handleDaySelection = (dayIndex: number) => {
      setCurrentDayIndex(dayIndex);
      const challenge = strategyChallengesData.find(c => c.type === selectedStrategyCategory);
      if (challenge && challenge.challenge[dayIndex] && challenge.challenge[dayIndex].activities.length > 0) {
          handlePageChange(Page.DailyTasks);
      } else {
          switch(selectedStrategyCategory) {
              case NaturalisticStrategyType.Expansion: handlePageChange(Page.ExpansionList); break;
              case NaturalisticStrategyType.Recast: handlePageChange(Page.RecastList); break;
              case NaturalisticStrategyType.OpenEQ: handlePageChange(Page.OpenEQList); break;
              case NaturalisticStrategyType.Comment: handlePageChange(Page.CommentList); break;
              default: handlePageChange(Page.ExpansionList);
          }
      }
  };

  const handleActivitiesSelected = (activities: Activity[]) => {
      if (selectedStrategyCategory && currentDayIndex !== null) {
          setStrategyChallengesData(prev => prev.map(c => {
              if (c.type === selectedStrategyCategory) {
                  const newChallenge = [...c.challenge];
                  const existingDay = newChallenge[currentDayIndex] || { day: currentDayIndex + 1, activities: [] };
                  newChallenge[currentDayIndex] = {
                      ...existingDay,
                      activities: activities.map(a => ({...a, completed: false, duration: 0})) 
                  };
                  return { ...c, challenge: newChallenge };
              }
              return c;
          }));
          handlePageChange(Page.DailyTasks);
      }
  };

  const handleTaskClick = (activity: Activity) => {
      setSelectedActivity(activity);
      handlePageChange(Page.ActivityDetail);
  };

  const handleViewStrategyDetails = (categoryType: NaturalisticStrategyType) => {
    setSelectedStrategyCategory(categoryType);
    handlePageChange(Page.StrategyAnalysis);
  };

  // Called when user clicks "Download PDF" on VoucherPage
  const handleCertificateDownload = (strategyType: NaturalisticStrategyType) => {
      setUserInfo(prev => {
          if (!prev) return null;
          
          const existingTimestamp = prev.redeemedStrategies?.[strategyType];
          // CRITICAL: If timestamp exists, do not update it. 
          // This satisfies the requirement that downloading multiple times within 24h preserves the original download time.
          if (existingTimestamp) return prev; 

          const updatedRedeemed = { ...prev.redeemedStrategies, [strategyType]: Date.now() };
          return { ...prev, redeemedStrategies: updatedRedeemed };
      });
  };

  const handleRedeem = (strategyType: NaturalisticStrategyType) => {
    if (userInfo?.role !== 'participant') {
        alert("The Honey Store and rewards are available for Family Support Program participants.");
        return;
    }

    const challenge = strategyChallengesData.find(c => c.type === strategyType);
    if (!challenge || !userInfo) return;

    // Logic: 15 drops = $1.50
    // Check previously redeemed status
    // Even if redeemed, we can view the voucher again if within 24h (logic handled in HoneyStorePage).
    // Here we just prepare the voucher info.

    const allActivities = challenge.challenge.flatMap(d => d.activities);
    const completedCount = allActivities.filter(a => a.completed).length;
    const totalTime = allActivities.reduce((acc, a) => acc + (a.duration || 0), 0);
    const totalTimeMinutes = Math.round(totalTime / 60);

    const MIN_ACTIVITIES = 40;
    
    // Check if user has already redeemed this strategy (has a timestamp)
    const isAlreadyRedeemed = !!userInfo.redeemedStrategies?.[strategyType];

    if (completedCount < MIN_ACTIVITIES && !IS_DEV_MODE) {
        alert(`You need to complete at least ${MIN_ACTIVITIES} activities to claim your certificate. Current: ${completedCount}`);
        return;
    }

    const activityRate = 1.5;
    const redeemedAmount = completedCount * activityRate; 
    const costInDrops = completedCount * 15; 

    // Only deduct drops if NOT already redeemed
    if (!isAlreadyRedeemed && userInfo.honeyDrops < costInDrops && !IS_DEV_MODE) {
        alert("You don't have enough Honey Drops to redeem this certificate.");
        return;
    }

    if (!isAlreadyRedeemed && userInfo.honeyDrops >= costInDrops) {
        setUserInfo(prev => ({ ...prev!, honeyDrops: prev!.honeyDrops - costInDrops }));
    }

    // Determine the date to show on certificate
    // If user has already downloaded it (redeemedStrategies exists), use that ORIGINAL date.
    // If not, use current date.
    const redemptionTimestamp = userInfo.redeemedStrategies?.[strategyType];
    const dateToDisplay = redemptionTimestamp ? new Date(redemptionTimestamp) : new Date();
    
    // Use the timestamp for the code as well for consistency
    const timestampForCode = redemptionTimestamp || Date.now();

    const newVoucher: VoucherInfo = {
        code: `SP-${strategyType.substring(0, 3).toUpperCase()}-${timestampForCode.toString().slice(-6)}`,
        amount: redeemedAmount,
        date: dateToDisplay.toLocaleDateString('en-GB'),
        redeemedTo: userInfo.username || userInfo.caregiverName,
        strategyTitle: challenge.title,
        childName: userInfo.childName,
        totalTimeMinutes: totalTimeMinutes,
        activitiesCompleted: completedCount,
        strategyType: strategyType // Pass type for callback
    };
    
    setVoucherInfo(newVoucher);
    handlePageChange(Page.Voucher);
  };

  const updateRole = (role: 'participant', code: string, email?: string) => {
      setUserInfo(prev => {
          if (!prev) return null;
          
          let newUsername = prev.username;
          
          // If previously a guest (generic username or no email), update with new email
          if (email && (prev.username === 'Guest' || prev.username === 'Guest_Parent' || !prev.email)) {
              newUsername = email.split('@')[0];
          }

          return { 
              ...prev, 
              role, 
              programCode: code,
              email: email || prev.email,
              username: newUsername
          };
      });
      
      if (role === 'participant') {
          setShowWelcomeUnlock(true);
      }
  };

  const handlePageChange = (newPage: Page) => {
    if (newPage === currentPage) return;
    if (currentPage === Page.ActivityDetail) {
        setShowSkipAnimationBtn(false);
    }

    const mainNavPages = NAV_ITEMS.map(item => item.id);
    const currentIndex = mainNavPages.indexOf(currentPage);
    const newIndex = mainNavPages.indexOf(newPage);

    if (currentIndex !== -1 && newIndex !== -1) {
      if (newIndex > currentIndex) {
        setAnimationClass('page-transition-enter-right');
      } else {
        setAnimationClass('page-transition-enter-left');
      }
    } else {
      setAnimationClass('animate-fadeIn');
    }
    
    if (newPage === Page.DailyTasks) {
        if (!selectedStrategyCategory) {
            setSelectedStrategyCategory(NaturalisticStrategyType.Expansion);
        }
        if (currentDayIndex === null) {
            const targetType = selectedStrategyCategory || NaturalisticStrategyType.Expansion;
            const challenge = strategyChallengesData.find(c => c.type === targetType);
            if (challenge) {
                let daysPassed = 0;
                if (challenge.startDate) {
                    const start = new Date(challenge.startDate);
                    start.setHours(0, 0, 0, 0);
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    const diffTime = now.getTime() - start.getTime();
                    daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                }
                setCurrentDayIndex(Math.max(0, Math.min(daysPassed, 29)));
            }
        }
    }

    setCurrentPage(newPage);
  };
  
  const handleSkipAnimation = () => {
      setSkipAnimationSignal(prev => prev + 1);
      setShowSkipAnimationBtn(false);
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    handlePageChange(Page.ArticleDetail);
  };

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideoId(videoId);
  };
  
  const handleGetStarted = () => {
      setShowLanding(false);
      setIsOnboarding(true);
  };

  const handleLogin = () => {
      setShowLanding(false);
      setIsOnboarding(true); 
  };

  const getHeaderTitle = () => {
    if (currentPage === Page.Strategies) return 'Naturalistic Strategies';
    if (currentPage === Page.ExpansionPage) return 'Expansion Strategy';
    if (currentPage === Page.ExpansionList) return 'Expansion Activities';
    if (currentPage === Page.RecastPage) return 'Recast Strategy';
    if (currentPage === Page.RecastList) return 'Recast Activities';
    if (currentPage === Page.OpenEQPage) return 'Open EQ Strategy';
    if (currentPage === Page.OpenEQList) return 'Open EQ Activities';
    if (currentPage === Page.CommentPage) return 'Comment Strategy';
    if (currentPage === Page.CommentList) return 'Comment Activities';
    if (currentPage === Page.DailyTasks) return 'Daily Tasks';
    if (currentPage === Page.ActivityDetail) return 'Activity Detail';
    return undefined; 
  };

  const getHeaderBackAction = () => {
      if ([Page.ExpansionPage, Page.RecastPage, Page.OpenEQPage, Page.CommentPage].includes(currentPage)) {
          return () => handlePageChange(Page.Strategies);
      }
      if (currentPage === Page.ExpansionList) return () => handlePageChange(Page.ExpansionPage);
      if (currentPage === Page.RecastList) return () => handlePageChange(Page.RecastPage);
      if (currentPage === Page.OpenEQList) return () => handlePageChange(Page.OpenEQPage);
      if (currentPage === Page.CommentList) return () => handlePageChange(Page.CommentPage);

      if (currentPage === Page.DailyTasks) {
          switch(selectedStrategyCategory) {
              case NaturalisticStrategyType.Expansion: return () => handlePageChange(Page.ExpansionPage);
              case NaturalisticStrategyType.Recast: return () => handlePageChange(Page.RecastPage);
              case NaturalisticStrategyType.OpenEQ: return () => handlePageChange(Page.OpenEQPage);
              case NaturalisticStrategyType.Comment: return () => handlePageChange(Page.CommentPage);
              default: return () => handlePageChange(Page.ExpansionPage);
          }
      }

      if (currentPage === Page.ActivityDetail) {
          return () => handlePageChange(Page.DailyTasks);
      }
      return undefined; 
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard setActivePage={handlePageChange} role={userInfo?.role} />;
      case Page.Strategies:
        return <NaturalisticStrategies onSelectCategory={handleSelectStrategyCategory} strategyChallengesData={strategyChallengesData} />;
      case Page.ExpansionPage: {
        const challenge = strategyChallengesData.find(c => c.type === NaturalisticStrategyType.Expansion);
        return challenge ? <ExpansionPage challenge={challenge} setActivePage={handlePageChange} onDaySelect={handleDaySelection} /> : <div>Error loading expansion</div>;
      }
      case Page.ExpansionList:
        return <ExpansionList onActivitiesSelected={handleActivitiesSelected} setActivePage={handlePageChange} />;
      case Page.RecastPage: {
        const challenge = strategyChallengesData.find(c => c.type === NaturalisticStrategyType.Recast);
        return challenge ? <RecastPage challenge={challenge} setActivePage={handlePageChange} onDaySelect={handleDaySelection} /> : <div>Error loading recast</div>;
      }
      case Page.RecastList:
        return <RecastList onActivitiesSelected={handleActivitiesSelected} setActivePage={handlePageChange} />;
      case Page.OpenEQPage: {
        const challenge = strategyChallengesData.find(c => c.type === NaturalisticStrategyType.OpenEQ);
        return challenge ? <OpenEQPage challenge={challenge} setActivePage={handlePageChange} onDaySelect={handleDaySelection} /> : <div>Error loading OpenEQ</div>;
      }
      case Page.OpenEQList:
        return <OpenEQList onActivitiesSelected={handleActivitiesSelected} setActivePage={handlePageChange} />;
      case Page.CommentPage: {
        const challenge = strategyChallengesData.find(c => c.type === NaturalisticStrategyType.Comment);
        return challenge ? <CommentPage challenge={challenge} setActivePage={handlePageChange} onDaySelect={handleDaySelection} /> : <div>Error loading Comment</div>;
      }
      case Page.CommentList:
        return <CommentList onActivitiesSelected={handleActivitiesSelected} setActivePage={handlePageChange} />;
      case Page.DailyTasks: {
        const category = selectedStrategyCategory || NaturalisticStrategyType.Expansion;
        const challenge = strategyChallengesData.find(c => c.type === category);
        let dayIdx = currentDayIndex;
        if (dayIdx === null && challenge) {
            let daysPassed = 0;
            if (challenge.startDate) {
                const start = new Date(challenge.startDate);
                start.setHours(0, 0, 0, 0);
                const now = new Date();
                now.setHours(0, 0, 0, 0);
                const diffTime = now.getTime() - start.getTime();
                daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            }
            dayIdx = Math.max(0, Math.min(daysPassed, 29));
        }
        const dayActivities = (challenge && dayIdx !== null) ? challenge.challenge[dayIdx]?.activities : [];
        return <DailyTasks activities={dayActivities} dayNumber={(dayIdx !== null ? dayIdx : 0) + 1} onTaskClick={handleTaskClick} setActivePage={handlePageChange} />;
      }
      case Page.ActivityDetail:
        return selectedActivity ? 
            <ActivityDetail 
                activity={selectedActivity} 
                onStartTimer={() => handleStartTimer(selectedStrategyCategory!, currentDayIndex!, selectedActivity.id)} 
                isTimerActive={timerState.isActive} 
                setActivePage={handlePageChange} 
                areAnimationsEnabled={areAnimationsEnabled}
                skipTrigger={skipAnimationSignal}
                onAnimationStart={() => setShowSkipAnimationBtn(true)}
                onAnimationComplete={() => setShowSkipAnimationBtn(false)}
            /> : <div>Activity not found</div>;
      case Page.Progress:
        return <ProgressTracker userInfo={userInfo} strategyChallengesData={strategyChallengesData} setActivePage={handlePageChange} onViewStrategyDetails={handleViewStrategyDetails} />;
      case Page.StrategyAnalysis: {
        const challenge = strategyChallengesData.find(c => c.type === selectedStrategyCategory);
        return challenge ? <StrategyAnalysis challenge={challenge} setActivePage={handlePageChange} /> : <ProgressTracker userInfo={userInfo} strategyChallengesData={strategyChallengesData} setActivePage={handlePageChange} onViewStrategyDetails={handleViewStrategyDetails} />;
      }
      case Page.Settings:
        return <SettingsPage onResetProgress={handleResetProgress} setActivePage={handlePageChange} areAnimationsEnabled={areAnimationsEnabled} toggleAnimations={() => setAreAnimationsEnabled(p => !p)} userInfo={userInfo} onUpgrade={(code, email) => updateRole('participant', code, email)} />;
      case Page.Checklist:
        return <ChecklistPage onAllCompleted={handleChecklistComplete} />;
      case Page.Badges:
        return <RewardBadgesPage strategyChallengesData={strategyChallengesData} claimedBadges={claimedBadges} onClaimBadge={handleClaimBadge} />;
      case Page.Contact:
        return <ContactPage setActivePage={handlePageChange} />;
      case Page.Resources:
        return <ResourcesPage setActivePage={handlePageChange} />;
      case Page.ArticleList:
        return <ArticleListPage setActivePage={handlePageChange} onSelectArticle={handleSelectArticle} />;
      case Page.ArticleDetail:
        return selectedArticle ? <ArticleDetailPage article={selectedArticle} setActivePage={handlePageChange} /> : <ArticleListPage setActivePage={handlePageChange} onSelectArticle={handleSelectArticle} />;
      case Page.Tutorials:
        return <TutorialsPage setActivePage={handlePageChange} onPlayVideo={handlePlayVideo} />;
      case Page.Links:
        return <LinksPage setActivePage={handlePageChange} />;
      case Page.HoneyStore:
        return <HoneyStorePage setActivePage={handlePageChange} honeyDrops={userInfo?.honeyDrops || 0} onRedeem={handleRedeem} strategyChallengesData={strategyChallengesData} userInfo={userInfo} />;
      case Page.Voucher:
        return voucherInfo ? (
            <VoucherPage 
                voucher={voucherInfo} 
                setActivePage={handlePageChange} 
                userInfo={userInfo}
                strategyChallengesData={strategyChallengesData}
                onDownloadComplete={handleCertificateDownload}
            />
        ) : <HoneyStorePage setActivePage={handlePageChange} honeyDrops={userInfo?.honeyDrops || 0} onRedeem={handleRedeem} strategyChallengesData={strategyChallengesData} userInfo={userInfo} />;
      default:
        return <Dashboard setActivePage={handlePageChange} role={userInfo?.role} />;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (showLanding) {
      return <LandingPage onGetStarted={handleGetStarted} onLogin={handleLogin} />;
  }

  if (isOnboarding) {
      return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }
  
  if (isSigningUp) {
      return <SignUpPage onSignUp={handleSignUp} onBack={handleSignUpBack} />;
  }
  
  const showBottomNav = currentPage !== Page.ActivityDetail;

  return (
    <div className="md:flex md:h-screen font-sans text-gray-800">
      <SidebarNav activePage={currentPage} setActivePage={handlePageChange} />
      <div className="relative max-w-md mx-auto bg-white shadow-2xl flex flex-col h-screen overflow-hidden md:h-full md:max-w-none md:flex-1 md:mx-0">
        <Header 
          honeyDrops={userInfo?.honeyDrops || 0}
          setActivePage={handlePageChange}
          title={getHeaderTitle()}
          onBack={getHeaderBackAction()}
          showSkipButton={showSkipAnimationBtn}
          onSkip={handleSkipAnimation}
          role={userInfo?.role}
        />
        {isAnimatingDrops && <HoneyDropAnimation onAnimationEnd={() => setIsAnimatingDrops(false)} />}
        
        {celebrationInfo && (
          <DayCompletionCelebration 
            day={celebrationInfo.day} 
            onClose={() => setCelebrationInfo(null)}
          />
        )}
        {showWelcomeUnlock && (
            <HoneyStoreUnlockModal onClose={() => setShowWelcomeUnlock(false)} />
        )}

        <main className={`flex-1 p-3 md:p-6 ${showBottomNav ? 'pb-20' : 'pb-0'} md:pb-3 overflow-y-auto ${animationClass} custom-scrollbar`} key={currentPage}>
          {renderPage()}
        </main>
        {timerState.isActive && timerState.startTime && (
          <FloatingTimer startTime={timerState.startTime} onStop={handleStopTimer} />
        )}
        {playingVideoId && (
          <VideoPlayerModal videoId={playingVideoId} onClose={() => setPlayingVideoId(null)} />
        )}
        {showBottomNav && (
            <BottomNav activePage={currentPage} setActivePage={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export default App;
