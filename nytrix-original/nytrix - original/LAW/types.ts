
export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface LegalAnalysis {
  summary: string;
  riskLevel: RiskLevel;
  relevantLaws: string[];
  legalRights: string[];
  donts: string[];
  lawfulSteps: string[];
  lawyerGuidance: string;
  mentalHealthReminder: string;
  empathyNote?: string; // Warm opening from AI analyzer
}

export interface LawConceptInfo {
  concept: string;
  detail: any;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  analysis?: LegalAnalysis;
  lawConcepts?: LawConceptInfo[];
  timestamp: number;
}

