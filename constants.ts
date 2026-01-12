
import { DailyChallenge, ChecklistItemData, Page, Notification, Badge, StrategyChallenge, NaturalisticStrategyType } from './types';
import { EXPANSION_ACTIVITY_POOL } from './data/expansion';
import { RECAST_ACTIVITY_POOL } from './data/recast';
import { OPENEQ_ACTIVITY_POOL } from './data/openeq';
import { COMMENT_ACTIVITY_POOL } from './data/comment';
import { ARTICLES } from './data/resources';

// --- MASTER DEV TOGGLE ---
// Set to true to enable ALL development features:
// 1. Skip Onboarding (App.tsx)
// 2. Bypass Redeem Requirements (App.tsx)
// 3. Unlock All Strategies (NaturalisticStrategies.tsx)
// 4. Unlock Certificate Buttons (HoneyStorePage.tsx)
// 5. Show Dummy Certificate Data (VoucherPage.tsx)
// 6. Show Reset Button (SettingsPage.tsx)
export const IS_DEV_MODE = true; 

// Re-export specific pools so they can be imported from here if needed, 
// though direct import from data/ is preferred for new components.
export { EXPANSION_ACTIVITY_POOL, RECAST_ACTIVITY_POOL, OPENEQ_ACTIVITY_POOL, COMMENT_ACTIVITY_POOL, ARTICLES };

export const NAV_ITEMS = [
  { id: Page.Dashboard, icon: 'fas fa-home', label: 'Home' },
  { id: Page.Strategies, icon: 'fas fa-lightbulb', label: 'Strategies' },
  { id: Page.DailyTasks, icon: 'fas fa-tasks', label: 'Tasks' },
  { id: Page.Progress, icon: 'fas fa-chart-line', label: 'Progress' },
  { id: Page.Settings, icon: 'fas fa-cog', label: 'Settings' },
];

export const EDUCATION_LEVELS = [
  'Prefer not to say',
  'High School / NCEA Level 1-3',
  'Certificate / Diploma (Level 4-6)',
  'Bachelor\'s Degree / Graduate Diploma (Level 7)',
  'Postgraduate Degree (Level 8-10)',
  'Ph.D',
  'Other',
];

export const HOME_LANGUAGES = [
  'English',
  'Te Reo Māori',
  'NZ Sign Language',
  'Samoan',
  'Mandarin (Northern Chinese)',
  'Cantonese (Yue)',
  'Hindi',
  'French',
  'Tagalog',
  'German',
  'Other',
];

export const NOTIFICATIONS: Notification[] = [
  { id: 1, text: 'Welcome to Speechive! We\'re glad you\'re here.', timestamp: 'Just now', read: false, icon: 'fas fa-hand-sparkles', iconBgColor: 'bg-indigo-500' },
  { id: 2, text: 'Tap on "Strategies" from the home screen to begin your first 30-day challenge.', timestamp: 'Just now', read: false, icon: 'fas fa-lightbulb', iconBgColor: 'bg-amber-500' },
  { id: 3, text: 'Complete activities to earn Honey Drops and unlock badges!', timestamp: 'Just now', read: false, icon: 'fas fa-coins', iconBgColor: 'bg-green-500' },
];

export const NATURALISTIC_STRATEGIES: StrategyChallenge[] = [
  {
    type: NaturalisticStrategyType.Expansion,
    title: 'Expansion',
    description: 'Add to your child\'s words to make sentences more complete.',
    icon: 'fas fa-expand-arrows-alt',
    color: 'bg-amber-500',
    challenge: Array.from({length: 30}, (_, i) => ({ day: i + 1, activities: [] })), 
  },
  {
    type: NaturalisticStrategyType.Recast,
    title: 'Recast',
    description: 'Correct grammatical errors in a positive, conversational way.',
    icon: 'fas fa-retweet',
    color: 'bg-rose-500',
    challenge: Array.from({length: 30}, (_, i) => ({ day: i + 1, activities: [] })),
  },
  {
    type: NaturalisticStrategyType.OpenEQ,
    title: 'Open EQ',
    description: 'Ask open-ended questions to encourage longer responses.',
    icon: 'fas fa-question-circle',
    color: 'bg-indigo-500',
    challenge: Array.from({length: 30}, (_, i) => ({ day: i + 1, activities: [] })),
  },
  {
    type: NaturalisticStrategyType.Comment,
    title: 'Comment',
    description: 'Narrate and comment on what you and your child are doing.',
    icon: 'fas fa-comment-dots',
    color: 'bg-green-500',
    challenge: Array.from({length: 30}, (_, i) => ({ day: i + 1, activities: [] })),
  },
];

export const THIRTY_DAY_CHALLENGE: DailyChallenge[] = []; 

export const CHECKLIST_ITEMS: ChecklistItemData[] = [
  { id: 1, text: 'Morning hearing aid check', completed: false },
  { id: 2, text: 'Practice vowel sounds for 5 minutes', completed: false },
  { id: 3, text: 'Read one picture book together', completed: false },
  { id: 4, text: 'Narrate the bath time routine', completed: false },
  { id: 5, text: 'Sing one action song', completed: false },
  { id: 6, text: 'Practice turn-taking in a game', completed: false },
  { id: 7, text: 'Talk about feelings using pictures', completed: false },
];

const BADGE_ICONS = [
  'fas fa-seedling', 'fas fa-lightbulb', 'fas fa-music', 'fas fa-smile', 'fas fa-book-open',
  'fas fa-rocket', 'fas fa-puzzle-piece', 'fas fa-comments', 'fas fa-microphone-alt', 'fas fa-heart',
  'fas fa-cloud-sun', 'fas fa-hand-sparkles', 'fas fa-shapes', 'fas fa-palette', 'fas fa-gamepad',
  'fas fa-feather-alt', 'fas fa-leaf', 'fas fa-moon', 'fas fa-sun', 'fas fa-key',
  'fas fa-shield-alt', 'fas fa-flag', 'fas fa-award', 'fas fa-medal', 'fas fa-trophy',
  'fas fa-gem', 'fas fa-crown', 'fas fa-bolt', 'fas fa-fire', 'fas fa-star'
];

export const BADGES: Badge[] = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Day ${i + 1}`,
    icon: BADGE_ICONS[i],
}));
