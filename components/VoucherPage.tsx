
import React, { useMemo, useState, useEffect } from 'react';
import { Page, VoucherInfo, UserInfo, StrategyChallenge, Activity, NaturalisticStrategyType } from '../types';
import BeeLogo from './BeeLogo';
import Card from './Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// --- DEV TOGGLE ---
const DEV_SHOW_DUMMY_CERTIFICATE_DATA = false; // Set to true to populate charts with 30-day dummy data

interface VoucherPageProps {
  voucher: VoucherInfo;
  setActivePage: (page: Page) => void;
  userInfo: UserInfo | null;
  strategyChallengesData: StrategyChallenge[];
  onDownloadComplete?: (strategyType: NaturalisticStrategyType) => void;
}

// Reuse helper
const formatSeconds = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) return `${minutes}m`;
    return `${minutes}m ${remainingSeconds}s`;
};

const VoucherPage: React.FC<VoucherPageProps> = ({ voucher, setActivePage, userInfo, strategyChallengesData, onDownloadComplete }) => {
  const [hasOpenedReport, setHasOpenedReport] = useState(false);
  const [chartsReady, setChartsReady] = useState(false);

  // Force re-render of charts after mount to correct width calculations
  useEffect(() => {
      // Immediate trigger
      setChartsReady(true);
      
      // Secondary trigger for layout shifts
      const timer = setTimeout(() => {
         window.dispatchEvent(new Event('resize'));
      }, 500); 
      return () => clearTimeout(timer);
  }, []);

  const handleOpenNewTab = () => {
    setHasOpenedReport(true);
    
    // Trigger callback to mark strategy as redeemed/downloaded in App.tsx
    if (onDownloadComplete && voucher.strategyType) {
        onDownloadComplete(voucher.strategyType);
    }

    const printContent = document.getElementById('voucher-to-print');
    if (!printContent) return;

    const newWindow = window.open('', '_blank');
    if (!newWindow) {
        alert('Please allow pop-ups to view the printable report.');
        return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Speechive Report - ${voucher.strategyTitle}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Nunito+Sans:wght@400;600&family=Poppins:wght@400;600;700&family=Source+Serif+Pro:wght@700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
        <base href="${window.location.origin}/">
        <style>
          body { font-family: 'Poppins', sans-serif; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-container { width: 100%; max-width: 210mm; margin: 0 auto; }
          
          /* Screen only styles for the new tab */
          @media screen {
             body { background: #f3f4f6; padding: 20px 0; }
             .print-container { background: white; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
             .print-btn-float {
                 position: fixed; bottom: 30px; right: 30px; z-index: 50;
                 background-color: #f59e0b; color: white; font-weight: bold;
                 padding: 16px 32px; border-radius: 50px; 
                 box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                 cursor: pointer; border: none; font-size: 18px;
                 display: flex; align-items: center; gap: 10px;
                 transition: transform 0.2s;
             }
             .print-btn-float:hover { transform: scale(1.05); background-color: #d97706; }
          }

          /* Print styles */
          @media print {
            @page { margin: 0; size: A4; }
            body { padding: 0; background: white; }
            .print-container { box-shadow: none; max-width: none; width: 100%; }
            .print-btn-float { display: none !important; }
            
            /* Page Breaks */
            .page-break-after { page-break-after: always; }
            .page-break-before { page-break-before: always; }
            .avoid-break { page-break-inside: avoid; }
            
            /* Enforce Height for A4 Print consistency */
            .print-page-height { min-height: 297mm !important; height: auto !important; }
            
            /* Ensure background colors print */
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
        </style>
      </head>
      <body>
        <button onclick="window.print()" class="print-btn-float">
            <i class="fas fa-print"></i> Print Report
        </button>
        <div class="print-container">
            ${printContent.innerHTML}
        </div>
      </body>
      </html>
    `;

    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  const handleEmailResearcher = () => {
      const email = "support@whanautalk.co.nz";
      const subject = `Completion of 30-Day Strategy: ${userInfo?.username || 'Participant'}`;
      const body = `Kia ora,\n\nI have completed the ${voucher.strategyTitle} program.\n\nMy registered email is: ${userInfo?.email || 'N/A'}\nAccess Code used: ${userInfo?.programCode || 'N/A'}\nTalked to Researcher: ${userInfo?.researchDiscussion ? 'Yes' : 'No'}\nResearch Consent: ${userInfo?.researchConsent ? 'Given' : 'Not Given'}\n\nPlease find my details attached (Note: You must attach the downloaded PDF certificate to this email manually).`;
      
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Find strategy data for analytics
  const strategyData = useMemo(() => {
      const realData = strategyChallengesData.find(s => s.title === voucher.strategyTitle);

      if (DEV_SHOW_DUMMY_CERTIFICATE_DATA && realData) {
          const activityNames = ["Reading Time", "Bath Time", "Meal Time", "Outdoor Play", "Building Blocks", "Getting Dressed", "Singing Songs", "Puzzle Time"];
          
          // Generate dummy 30-day data
          const dummyDays = Array.from({ length: 30 }, (_, i) => {
              const dayNum = i + 1;
              // Mostly 2 activities (completed), sometimes 1 for variety
              const numActivities = Math.random() > 0.15 ? 2 : 1;
              
              const activities: Activity[] = Array.from({ length: numActivities }, (_, j) => ({
                  id: `dummy-${dayNum}-${j}`,
                  title: activityNames[Math.floor(Math.random() * activityNames.length)],
                  image: '',
                  description: 'Dummy activity description for certificate preview.',
                  script: [],
                  completed: true,
                  duration: 600 + Math.floor(Math.random() * 900), // Random duration between 10-25 mins (600-1500s)
                  recommendedTime: 15,
                  completionDate: Date.now() - ((30 - dayNum) * 24 * 60 * 60 * 1000) // Backdated
              }));

              return {
                  day: dayNum,
                  activities: activities
              };
          });

          return {
              ...realData,
              challenge: dummyDays
          } as StrategyChallenge;
      }

      return realData;
  }, [strategyChallengesData, voucher.strategyTitle]);

  // Compute stats
  const stats = useMemo(() => {
      if (!strategyData) return null;

      const allActivities = strategyData.challenge.flatMap(d => d.activities);
      const completedActivities = allActivities.filter(a => a.completed && a.duration > 0);
      
      const totalTimeSeconds = completedActivities.reduce((acc, a) => acc + (a.duration || 0), 0);
      const avgTimeSeconds = completedActivities.length > 0 ? Math.round(totalTimeSeconds / completedActivities.length) : 0;

      // Longest and Shortest Calculation
      const longestSession = completedActivities.reduce((max, curr) => Math.max(max, curr.duration || 0), 0);
      const shortestSession = completedActivities.length > 0 
        ? completedActivities.reduce((min, curr) => Math.min(min, curr.duration || 0), Infinity) 
        : 0;

      // Activity Log: All completed activities
      const activityLog = completedActivities.map((a, i) => ({
          name: a.title,
          time: formatSeconds(a.duration || 0),
          day: strategyData.challenge.find(d => d.activities.includes(a))?.day || '?',
          date: a.completionDate
      })).sort((a, b) => (b.date || 0) - (a.date || 0));

      // Daily Data for Charts (Cell 2 & Cell 4)
      const dailyChartData = strategyData.challenge.map(d => ({
          day: d.day,
          minutes: parseFloat((d.activities.filter(a => a.completed).reduce((acc, a) => acc + (a.duration || 0), 0) / 60).toFixed(1))
      }));
      
      // Cell 5: Top 5 Activities
      const activityTimeMap = new Map<string, number>();
      completedActivities.forEach(a => {
          activityTimeMap.set(a.title, (activityTimeMap.get(a.title) || 0) + (a.duration || 0));
      });
      const topActivities = Array.from(activityTimeMap.entries())
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([name, time]) => ({
              name: name.length > 15 ? name.substring(0, 15) + '...' : name, // Truncate for chart
              minutes: parseFloat((time / 60).toFixed(1))
          }));

      return { totalTimeSeconds, avgTimeSeconds, longestSession, shortestSession, activityLog, dailyChartData, topActivities };
  }, [strategyData]);

  // Mini Grid Map Component for Cell 3 - 3 Tier Colors
  const CompletionGridMap = () => {
      if (!strategyData) return null;
      return (
          // Responsive Grid: 5 cols on mobile (fits 30 neatly in 6 rows), 6 cols on desktop (fits 30 in 5 rows)
          <div className="grid grid-cols-5 md:grid-cols-6 gap-2 w-full max-w-sm mx-auto">
              {strategyData.challenge.map((day) => {
                  const completedCount = day.activities.filter(a => a.completed).length;
                  let bgClass = 'bg-gray-100 text-gray-400'; // 0 activities
                  if (completedCount === 1) bgClass = 'bg-amber-200 text-amber-800'; // 1 activity (Light)
                  if (completedCount >= 2) bgClass = 'bg-amber-500 text-white'; // 2+ activities (Bright)

                  return (
                      <div key={day.day} className={`aspect-square rounded-md flex items-center justify-center text-xs font-bold ${bgClass}`}>
                          {day.day}
                      </div>
                  );
              })}
          </div>
      );
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col bg-gray-50">
      {/* Navbar (Hidden on Print) */}
      <div className="flex items-center space-x-4 flex-shrink-0 p-4">
        <button onClick={() => setActivePage(Page.HoneyStore)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to store">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Certificate</h2>
          <p className="text-gray-500">Ready to print!</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto custom-scrollbar p-1">
          {/* This ID is what gets grabbed for the new tab */}
          <div id="voucher-to-print" className="bg-white max-w-4xl mx-auto shadow-2xl">
            
            {/* --- PAGE 1: CERTIFICATE ONLY --- */}
            {/* Using responsive padding, fonts, and borders. 'print-page-height' class enforces A4 height when printing. */}
            <div className="page-break-after print-page-height min-h-[600px] md:min-h-[1100px] flex flex-col justify-between p-4 md:p-8 border-[6px] md:border-[12px] border-double border-amber-100 bg-white relative">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <BeeLogo className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] grayscale" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-center text-center">
                    <div className="mb-6 md:mb-10">
                        <div className="flex justify-center mb-4 md:mb-6">
                            <BeeLogo className="w-16 h-16 md:w-24 md:h-24" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 tracking-wide uppercase mb-2">Certificate</h1>
                        <h2 className="text-xl md:text-3xl font-serif text-amber-500 tracking-widest uppercase">Of Completion</h2>
                    </div>

                    <div className="space-y-4 md:space-y-8 mb-8">
                        <p className="text-gray-500 italic font-serif text-lg md:text-xl">This certifies that</p>
                        
                        <div className="border-b-2 border-gray-300 pb-2 md:pb-4 max-w-2xl mx-auto">
                            <p className="text-3xl md:text-5xl font-bold text-gray-800 font-serif">{voucher.redeemedTo}</p>
                        </div>
                        
                        <div className="mt-4 md:mt-8 px-4 md:px-8">
                            <p className="text-gray-600 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto font-serif">
                                Parent of <span className="font-bold">{voucher.childName}</span> has Completed the 30 day <span className="font-bold text-amber-600">{voucher.strategyTitle} Program</span> from Speechive App as user was enrolled in a University of Auckland Speech Science Research Program.
                            </p>
                        </div>
                    </div>

                    {/* Stats & Value Footer */}
                    <div className="mt-auto pt-8 max-w-3xl mx-auto w-full">
                        <div className="grid grid-cols-2 gap-4 md:gap-20 mb-6 md:mb-10">
                            <div className="text-center border-t border-gray-400 pt-4">
                                <p className="font-bold text-gray-800 text-base md:text-lg">Speechive Team</p>
                                <p className="text-gray-500 text-xs md:text-sm">Program Director</p>
                            </div>
                            <div className="text-center border-t border-gray-400 pt-4">
                                <p className="font-bold text-gray-800 text-base md:text-lg">{voucher.date}</p>
                                <p className="text-gray-500 text-xs md:text-sm">Date Issued</p>
                            </div>
                        </div>

                        {/* Value Badge */}
                        <div className="flex justify-center">
                            <div className="inline-block border-2 md:border-4 border-amber-400 rounded-xl px-4 py-2 md:px-8 md:py-3 bg-white shadow-sm">
                                <p className="text-xs md:text-sm text-amber-500 uppercase font-bold tracking-widest text-center">Certificate Value</p>
                                <p className="text-2xl md:text-4xl font-bold text-gray-800">${voucher.amount.toFixed(2)} <span className="text-sm md:text-lg text-gray-500 font-normal">NZD</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PAGE 2: PROFILE & OVERVIEW --- */}
            <div className="page-break-after print-page-height p-2 md:p-6 bg-gray-50 min-h-[800px] md:min-h-[1100px] flex flex-col gap-6 md:gap-8">
                {/* SECTION 1: PARTICIPANT PROFILE */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 border-b-4 border-amber-400 inline-block pb-1">Participant Profile</h2>
                    
                    {userInfo && (
                        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-sm md:text-base">
                                {/* Left Column: Child Details + Research Consent */}
                                <div className="space-y-3 md:space-y-4">
                                    <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-2">Child Details</h3>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Name</span>
                                        <span className="font-bold text-gray-800">{userInfo.childName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Date of Birth</span>
                                        <span className="font-bold text-gray-800">{userInfo.childDob}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Home Language</span>
                                        <span className="font-bold text-gray-800">{userInfo.homeLanguage}</span>
                                    </div>
                                    {userInfo.role === 'participant' && (
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-600">Research Consent</span>
                                            <span className="font-bold text-gray-800">{userInfo.researchConsent ? 'Given' : 'Not Given'}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Program Details */}
                                <div className="space-y-3 md:space-y-4">
                                    <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs mb-2">Program Details</h3>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Username</span>
                                        <span className="font-bold text-gray-800">{userInfo.username || 'Guest'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Email</span>
                                        <span className="font-bold text-gray-800 text-xs break-all">{userInfo.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-600">Access Code</span>
                                        <span className="font-bold text-gray-800">{userInfo.programCode || 'N/A'}</span>
                                    </div>
                                    {userInfo.role === 'participant' && (
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-600">Talked to Researcher</span>
                                            <span className="font-bold text-gray-800">{userInfo.researchDiscussion ? 'Yes' : 'No'}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* SECTION 2: ANALYTICS PART 1 */}
                {stats && (
                    <div className="flex-grow flex flex-col gap-6 md:gap-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-4 border-amber-400 inline-block pb-1">Program Analytics (1/2)</h2>
                        
                        {/* OVERVIEW STATS (4-Grid) */}
                        <Card className="!p-4 md:!p-6 shadow-md border border-gray-200 avoid-break w-full">
                            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                                <i className="fas fa-chart-pie text-amber-500 mr-2"></i> Overview
                            </h3>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="bg-amber-50 p-3 md:p-4 rounded-lg text-center">
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Total Time</p>
                                    <p className="text-lg md:text-xl font-bold text-amber-600">{formatSeconds(stats.totalTimeSeconds)}</p>
                                </div>
                                <div className="bg-sky-50 p-3 md:p-4 rounded-lg text-center">
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Avg Session</p>
                                    <p className="text-lg md:text-xl font-bold text-sky-600">{formatSeconds(stats.avgTimeSeconds)}</p>
                                </div>
                                <div className="bg-green-50 p-3 md:p-4 rounded-lg text-center">
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Longest</p>
                                    <p className="text-lg md:text-xl font-bold text-green-600">{formatSeconds(stats.longestSession)}</p>
                                </div>
                                <div className="bg-rose-50 p-3 md:p-4 rounded-lg text-center">
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold">Shortest</p>
                                    <p className="text-lg md:text-xl font-bold text-rose-600">{formatSeconds(stats.shortestSession)}</p>
                                </div>
                            </div>
                        </Card>

                        {/* DAILY PERFORMANCE CHART */}
                        <Card className="!p-4 md:!p-6 shadow-md border border-gray-200 avoid-break flex-grow w-full">
                            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                                <i className="fas fa-chart-bar text-amber-500 mr-2"></i> Daily Performance
                            </h3>
                            {/* Force width 100% via style and minWidth 0 to prevent flex collapse */}
                            <div className="h-48 md:h-64 relative" style={{ width: '100%', minWidth: 0 }}>
                                <ResponsiveContainer key={chartsReady ? 'ready' : 'loading'} width="100%" height="100%" minWidth={0}>
                                    <BarChart data={stats.dailyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="day" tick={{fontSize: 12}} />
                                        <YAxis tick={{fontSize: 12}} width={40} label={{ value: 'Mins', angle: -90, position: 'insideLeft' }}/>
                                        <Tooltip />
                                        <Bar dataKey="minutes" radius={[2, 2, 0, 0]} isAnimationActive={false}>
                                            {stats.dailyChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#fcd34d' : '#d97706'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-2">Minutes spent per day (Day 1-30)</p>
                        </Card>
                    </div>
                )}
            </div>

            {/* --- PAGE 3: DETAILED ANALYTICS & LOG --- */}
            <div className="p-2 md:p-6 bg-gray-50 min-h-[800px] md:min-h-[1100px] print-page-height flex flex-col gap-6 md:gap-8">
                {stats && (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-4 border-amber-400 inline-block pb-1">Program Analytics (2/2)</h2>
                        
                        {/* COMPLETION MAP - Full Width */}
                        <Card className="!p-4 md:!p-6 shadow-md border border-gray-200 w-full">
                            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                                <i className="fas fa-th text-amber-500 mr-2"></i> 30-Day Completion Map
                            </h3>
                            <div className="flex justify-center w-full">
                                <CompletionGridMap />
                            </div>
                            <div className="mt-4 flex justify-center space-x-4 text-xs">
                                <div className="flex items-center"><div className="w-3 h-3 bg-amber-500 rounded mr-1"></div> 2 Done</div>
                                <div className="flex items-center"><div className="w-3 h-3 bg-amber-200 rounded mr-1"></div> 1 Done</div>
                                <div className="flex items-center"><div className="w-3 h-3 bg-gray-100 rounded mr-1"></div> 0 Done</div>
                            </div>
                        </Card>

                        {/* MONTHLY PERFORMANCE CHART - Full Width */}
                        <Card className="!p-4 md:!p-6 shadow-md border border-gray-200 w-full">
                            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                                <i className="fas fa-chart-line text-amber-500 mr-2"></i> Monthly Performance
                            </h3>
                            <div className="h-48 md:h-64 relative" style={{ width: '100%', minWidth: 0 }}>
                                <ResponsiveContainer key={chartsReady ? 'ready' : 'loading'} width="100%" height="100%" minWidth={0}>
                                    <BarChart data={stats.dailyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" tick={{fontSize: 12}} />
                                        <YAxis tick={{fontSize: 12}} width={40} />
                                        <Tooltip />
                                        <Bar dataKey="minutes" name="Minutes" radius={[2, 2, 0, 0]} isAnimationActive={false}>
                                            {stats.dailyChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#fcd34d' : '#d97706'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-2">Total duration distribution</p>
                        </Card>

                        {/* TOP 5 ACTIVITIES - Full Width */}
                        <Card className="!p-4 md:!p-6 shadow-md border border-gray-200 avoid-break w-full">
                            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                                <i className="fas fa-trophy text-amber-500 mr-2"></i> Top 5 Activities
                            </h3>
                            <div className="h-48 md:h-60 relative" style={{ width: '100%', minWidth: 0 }}>
                                <ResponsiveContainer key={chartsReady ? 'ready' : 'loading'} width="100%" height="100%" minWidth={0}>
                                    <BarChart layout="vertical" data={stats.topActivities} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" tick={{fontSize: 12}} unit="m" />
                                        <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                                        <Tooltip />
                                        <Bar dataKey="minutes" fill="#fbbf24" radius={[0, 4, 4, 0]} barSize={24} isAnimationActive={false}>
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        {/* 30-DAY ACTIVITY LOG - Full Width */}
                        <Card className="!p-4 md:!p-6 shadow-md border border-gray-200 w-full">
                            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                                <i className="fas fa-list text-amber-500 mr-2"></i> 30-Day Activity Log
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-3 md:px-6 py-3">Day</th>
                                            <th scope="col" className="px-3 md:px-6 py-3">Activity</th>
                                            <th scope="col" className="px-3 md:px-6 py-3 text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.activityLog.map((log, i) => (
                                            <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-3 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Day {log.day}</td>
                                                <td className="px-3 md:px-6 py-4">{log.name}</td>
                                                <td className="px-3 md:px-6 py-4 text-right font-mono">{log.time}</td>
                                            </tr>
                                        ))}
                                        {stats.activityLog.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-4 text-center text-gray-400">No activities recorded.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </>
                )}
            </div>

          </div>
      </div>
      
      {/* Floating Buttons for Screen */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200 space-y-3">
        <button
            onClick={handleOpenNewTab}
            className="w-full flex items-center justify-center py-4 px-4 space-x-2 rounded-xl bg-amber-500 text-white font-bold text-lg shadow-lg hover:bg-amber-600 transition-colors"
        >
            <i className="fas fa-file-pdf"></i>
            <span>Download PDF</span>
        </button>
        
        {userInfo?.role === 'participant' && hasOpenedReport && (
            <button
                onClick={handleEmailResearcher}
                className="w-full flex items-center justify-center py-4 px-4 space-x-2 rounded-xl bg-indigo-500 text-white font-bold text-lg shadow-lg hover:bg-indigo-600 transition-colors animate-fadeIn"
            >
                <i className="fas fa-paper-plane"></i>
                <span>Email Completion to Whānau Talk</span>
            </button>
        )}
      </div>

    </div>
  );
};

export default VoucherPage;
