export type ThemeMode = 'dark' | 'light';

export interface CurriculumUnit {
  unitNumber: number;
  title: string;
  topics: string[];
  practicalLab: string;
  durationWeeks: number;
}

export interface BloomMapping {
  remembering: string;
  understanding: string;
  applying: string;
  analyzing: string;
  evaluating: string;
  creating: string;
}

export interface AssessmentItem {
  component: string;
  weight: string;
  format: string;
}

export interface CurriculumData {
  title: string;
  code: string;
  level: string;
  credits: number;
  bloomMapping: BloomMapping;
  learningOutcomes: string[];
  units: CurriculumUnit[];
  assessmentMatrix: AssessmentItem[];
  industryToolsCoverage: string[];
}

export interface AuditResult {
  healthScore: number;
  industryAlignmentScore: number;
  missingSkills: string[];
  outdatedTopics: string[];
  bloomTaxonomyDistribution: {
    lowerOrderPct: number;
    higherOrderPct: number;
  };
  recommendations: Array<{
    priority: 'High' | 'Medium' | 'Low';
    title: string;
    rationale: string;
    evidence: string;
  }>;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  badge: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  badge?: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
  avatarUrl?: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type AcademicRole = 
  | 'Dean'
  | 'HOD'
  | 'Professor'
  | 'Curriculum Committee'
  | 'Administrator';

export interface InstitutionWorkspace {
  id: string;
  name: string;
  shortName: string;
  location: string;
  department: string;
  activeSyllabi: number;
  accreditationStatus: string;
  logoBadge: string;
  logoColor: string;
  role: AcademicRole;
  isPrimary?: boolean;
  lastActive?: string;
  type?: string;
  country?: string;
}

export type AuthStep = 
  | 'signIn' 
  | 'signUp' 
  | 'roleSelection' 
  | 'institutionSelection' 
  | 'forgotPassword' 
  | 'resetPassword' 
  | 'verification'
  | 'sessionSecurity';

export interface UserSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

