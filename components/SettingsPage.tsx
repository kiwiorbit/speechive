
import React, { useState, ReactNode } from 'react';
import Modal from './Modal';
import { Page, UserInfo } from '../types';
import { IS_DEV_MODE } from '../constants';

interface FaqItem {
    id: number;
    question: string;
    answer: ReactNode;
}

const howToTrackAnswer = (
    <div className="space-y-3">
        <p>You can record the time you spend on each activity to get detailed insights. Here's how:</p>
        <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Navigate to the <span className="font-semibold text-amber-600">Strategies</span> page from the main menu.</li>
            <li>Select a strategy category (e.g., 'Expansion') to open its 30-day challenge.</li>
            <li>Tap on any activity for the day, like 'Reading Book Together', to see its details.</li>
            <li>Press the green <span className="font-semibold text-green-600">"Start Now"</span> button inside the pop-up to begin.</li>
            <li>A <span className="font-semibold">floating timer</span> will appear on your screen. You can navigate anywhere in the app.</li>
            <li>When you've finished, press the red <span className="font-semibold text-rose-600">"Stop"</span> button on the floating timer.</li>
            <li>That's it! Your time is saved, the activity is marked complete, and your Progress Tracker is updated.</li>
        </ol>
        <div className="mt-4 text-sm bg-sky-100 p-3 rounded-lg text-sky-800">
            <p><i className="fas fa-info-circle mr-2"></i>
            <strong>Don't worry about switching apps!</strong> While the visual timer may pause to save battery, your time is still being tracked accurately in the background. The display will catch up as soon as you return.</p>
        </div>
    </div>
);

const FAQ_DATA: FaqItem[] = [
    {
        id: 0,
        question: "How do I track my time for activities?",
        answer: howToTrackAnswer
    },
    {
        id: 1,
        question: "What is Speechive?",
        answer: <p>Speechive is a mobile app designed for parents and caregivers to support children with hearing loss or speech delays through daily strategies, progress tracking, and interactive routines.</p>
    },
    {
        id: 2,
        question: "Who is this app for?",
        answer: <p>This app is for any parent or caregiver looking for creative, structured ways to encourage speech and language development in young children, especially those with hearing loss or speech delays.</p>
    },
    {
        id: 3,
        question: "How do I see my child's progress?",
        answer: <p>Use the 'Progress' tab to see detailed reports for each strategy, track daily performance, and view weekly/monthly summaries. You can find your earned 'Reward Badges' on the Dashboard.</p>
    },
    {
        id: 4,
        question: "Is my data private?",
        answer: <p>Yes, we take your privacy very seriously. All your data is stored securely on your device and is never shared with third parties. The app is designed to be a private and safe tool for your family.</p>
    }
];

interface SettingsPageProps {
    onResetProgress: () => void;
    setActivePage: (page: Page) => void;
    areAnimationsEnabled?: boolean;
    toggleAnimations?: () => void;
    userInfo: UserInfo | null;
    onUpgrade?: (code: string, email?: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onResetProgress, setActivePage, areAnimationsEnabled, toggleAnimations, userInfo, onUpgrade }) => {
    const [openFaqId, setOpenFaqId] = useState<number | null>(0);
    const [isResetModalOpen, setResetModalOpen] = useState(false);
    const [programCode, setProgramCode] = useState('');
    const [upgradeEmail, setUpgradeEmail] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);

    const handleFaqToggle = (id: number) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };
    
    const handleResetConfirm = () => {
        onResetProgress();
        setResetModalOpen(false);
    };

    const handleUpgradeSubmit = () => {
        // Validate inputs
        if (!programCode) return;

        // If user doesn't have an email (Guest), require it now
        const isGuest = !userInfo?.email;
        if (isGuest && (!upgradeEmail || !upgradeEmail.includes('@'))) {
            alert("Please enter a valid email address to join the program.");
            return;
        }

        if (onUpgrade) {
            onUpgrade(programCode.toUpperCase(), upgradeEmail);
            setShowCodeInput(false);
            alert("Success! You are now part of the Family Support Program.");
        }
    };

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Settings & Support</h2>
        <p className="text-gray-500">Manage your app experience and get help.</p>
      </div>
      
      {/* Program Status Section */}
      <div className="bg-white border border-amber-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-amber-800">Membership Status</h3>
          {userInfo?.role === 'participant' ? (
              <div className="flex items-center text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <i className="fas fa-heart mr-3 text-xl text-amber-500"></i>
                  <div>
                      <p className="font-bold">Family Support Program</p>
                      <p className="text-xs text-amber-700">Participating with code: {userInfo.programCode || 'ACTIVE'}</p>
                  </div>
              </div>
          ) : (
              <div>
                  <div className="flex items-center text-gray-600 mb-3">
                      <i className="fas fa-user mr-3"></i>
                      <p>Community Member {userInfo?.email ? '' : '(Guest)'}</p>
                  </div>
                  {!showCodeInput ? (
                      <button 
                        onClick={() => setShowCodeInput(true)}
                        className="text-sm text-amber-600 font-semibold hover:underline focus:outline-none"
                      >
                        I have a Program Access Code
                      </button>
                  ) : (
                      <div className="mt-2 space-y-3">
                          {/* If Guest (no email), show email input */}
                          {!userInfo?.email && (
                              <div>
                                  <label className="block text-xs text-gray-500 mb-1 ml-1">Email Address (Required for verification)</label>
                                  <input 
                                    type="email" 
                                    value={upgradeEmail}
                                    onChange={(e) => setUpgradeEmail(e.target.value)}
                                    placeholder="e.g. name@email.com"
                                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-amber-500"
                                  />
                              </div>
                          )}
                          
                          <div>
                              <label className="block text-xs text-gray-500 mb-1 ml-1">Access Code</label>
                              <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={programCode}
                                    onChange={(e) => setProgramCode(e.target.value)}
                                    placeholder="Enter Code"
                                    className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-amber-500"
                                  />
                                  <button 
                                    onClick={handleUpgradeSubmit}
                                    className="bg-amber-500 text-white px-4 py-2 rounded text-sm font-bold shadow-sm hover:bg-amber-600 transition-colors"
                                  >
                                    Join
                                  </button>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          )}
      </div>

      <div>
          <h3 className="font-bold text-lg mb-3 text-gray-800">General Settings</h3>
          
          <div className="space-y-4">
            {toggleAnimations && (
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                        <h4 className="font-semibold text-gray-800">Chat Bubble Animations</h4>
                        <p className="text-sm text-gray-600">Animate conversation examples bubble by bubble.</p>
                    </div>
                    <button 
                        onClick={toggleAnimations}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${areAnimationsEnabled ? 'bg-amber-400' : 'bg-gray-300'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${areAnimationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            )}
          </div>
      </div>

      <div onClick={() => setActivePage(Page.Contact)} className="cursor-pointer p-4 bg-amber-50 rounded-lg flex justify-between items-center transition-transform duration-200 hover:scale-105">
        <div>
            <h3 className="font-bold text-lg text-amber-800">Send Us a Message</h3>
            <p className="text-amber-700 text-sm">Have a question or feedback? We'd love to hear from you.</p>
        </div>
        <i className="fas fa-chevron-right text-amber-500"></i>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3 text-gray-800">Frequently Asked Questions</h3>
        <div className="space-y-3">
            {FAQ_DATA.map(faq => (
                <div key={faq.id} className="bg-gray-50 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md">
                    <button onClick={() => handleFaqToggle(faq.id)} className="w-full flex justify-between items-center text-left p-4 focus:outline-none">
                        <span className="font-medium text-gray-800">{faq.question}</span>
                        <i className={`fas fa-chevron-down text-amber-500 transition-transform duration-300 ${openFaqId === faq.id ? 'rotate-180' : ''}`}></i>
                    </button>
                    <div className={`px-4 text-gray-600 faq-answer ${openFaqId === faq.id ? 'open' : ''}`}>
                       {faq.answer}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Manual Reset Button - Only shown if master toggle is enabled */}
      {IS_DEV_MODE && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-lg mb-3 text-rose-800">Danger Zone</h3>
            <div className="flex justify-between items-center p-4 bg-rose-50 rounded-lg border border-rose-100">
                <div>
                    <h4 className="font-semibold text-rose-800">Reset All Progress</h4>
                    <p className="text-sm text-rose-700">Clear all strategies, badges, and history.</p>
                </div>
                <button 
                    onClick={() => setResetModalOpen(true)}
                    className="px-4 py-2 bg-rose-500 text-white font-semibold rounded-lg shadow-sm hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    Reset
                </button>
            </div>
          </div>
      )}

      <Modal isOpen={isResetModalOpen} onClose={() => setResetModalOpen(false)}>
          <div className="text-center p-4">
              <i className="fas fa-exclamation-triangle text-4xl text-rose-500 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-800">Are you sure?</h3>
              <p className="text-gray-600 my-3">
                  Resetting your progress will permanently delete all your completed tasks and badges. This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                  <button
                      onClick={() => setResetModalOpen(false)}
                      className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-colors focus:outline-none">
                      Cancel
                  </button>
                  <button
                      onClick={handleResetConfirm}
                      className="w-full sm:w-auto px-6 py-2 bg-rose-500 text-white font-semibold rounded-lg shadow-sm hover:bg-rose-600 transition-colors focus:outline-none">
                      Reset Now
                  </button>
              </div>
          </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
