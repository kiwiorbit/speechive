
export enum Page {
  Dashboard = 'Dashboard',
  Strategies = 'Strategies',
  Progress = 'Progress',
  Settings = 'Settings',
  Checklist = 'Checklist',
  Badges = 'Badges',
  Contact = 'Contact',
  Resources = 'Resources',
  ArticleList = 'ArticleList',
  ArticleDetail = 'ArticleDetail',
  Tutorials = 'Tutorials',
  Links = 'Links',
  HoneyStore = 'HoneyStore',
  StrategyAnalysis = 'StrategyAnalysis', // Renamed from StrategyDetail
  Voucher = 'Voucher',
  // Expansion Flow
  ExpansionPage = 'ExpansionPage',
  ExpansionList = 'ExpansionList',
  // Recast Flow
  RecastPage = 'RecastPage',
  RecastList = 'RecastList',
  // OpenEQ Flow
  OpenEQPage = 'OpenEQPage',
  OpenEQList = 'OpenEQList',
  // Comment Flow
  CommentPage = 'CommentPage',
  CommentList = 'CommentList',
  // Shared Execution Pages
  DailyTasks = 'DailyTasks',
  ActivityDetail = 'ActivityDetail',
}

export interface Strategy {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  details: string[];
  duration: number; // in seconds
}

export interface DailyChallenge {
  day: number;
  strategies: Strategy[];
}

export interface ChecklistItemData {
  id: number;
  text: string;
  completed: boolean;
  honeyDropsEarned?: number;
}

export interface Notification {
  id: number;
  text: string;
  timestamp: string;
  read: boolean;
  icon: string;
  iconBgColor: string;
}

export interface Badge {
  day: number;
  title: string;
  icon: string;
}

export interface TimerState {
  isActive: boolean;
  startTime: number | null;
  strategyType: NaturalisticStrategyType | null;
  dayIndex: number | null;
  activityId: string | null;
}

export interface HearingHistory {
  hasHearingLoss: boolean;
  degree?: 'Mild' | 'Moderate' | 'Severe' | 'Profound';
  hasDevices?: boolean;
  deviceTypes?: string[]; // 'Hearing Aid', 'Cochlear Implant'
  hearingAidConfig?: 'One Ear' | 'Both Ears';
  cochlearImplantConfig?: 'One Ear' | 'Both Ears';
}

export type UserRole = 'common_user' | 'participant';

export interface UserInfo {
  caregiverName: string; // Used as display name or parent name
  username?: string; // Generated from email (e.g. shahfamily78692)
  email?: string; // The user's email address
  childName: string;
  childDob: string;
  honeyDrops: number;
  parentalEducation: string;
  homeLanguage: string;
  additionalLanguages?: string;
  parentGoals: string[];
  childInterests: string[];
  hearingHistory?: HearingHistory;
  referralSource?: string;
  researchConsent?: boolean;
  role: UserRole;
  programCode?: string;
  researchDiscussion?: boolean; // New field: Did they talk to the researcher?
  redeemedStrategies?: Record<string, number>; // Map of StrategyType -> Timestamp of claim
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  image: string;
  content: { type: 'heading' | 'paragraph'; text: string }[];
}

// New types for Naturalistic Strategies
export enum NaturalisticStrategyType {
  Expansion = 'Expansion',
  Recast = 'Recast',
  OpenEQ = 'Open EQ',
  Comment = 'Comment',
}

export interface Activity {
  id: string;
  title: string;
  image: string;
  description: string;
  script: {
    title: string;
    dialogue: { speaker: 'Child' | 'Parent'; line: string }[];
  }[];
  completed: boolean;
  duration: number; // in seconds
  recommendedTime: number; // in minutes
  completionDate?: number;
  honeyDropsEarned?: number;
}

export interface ChallengeDay {
  day: number;
  activities: Activity[];
}

export interface StrategyChallenge {
  type: NaturalisticStrategyType;
  title: string;
  description: string;
  icon: string;
  color: string;
  challenge: ChallengeDay[];
  startDate?: number; // Timestamp when the challenge was started
}

export interface VoucherInfo {
  code: string;
  amount: number;
  date: string;
  redeemedTo: string;
  strategyTitle: string;
  childName: string;
  totalTimeMinutes: number;
  activitiesCompleted: number;
  strategyType?: NaturalisticStrategyType; // Added to help track which strategy this voucher belongs to
}
