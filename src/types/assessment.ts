export interface AssessmentAnswer {
  questionId: string;
  value: number | string;
  category: string;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  answers: AssessmentAnswer[];
  scores: {
    psychologicalFit: number;
    technicalReadiness: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      abilityToLearn: number;
      realWorldAlignment: number;
    };
    confidenceScore: number;
  };
  recommendation: 'Yes' | 'Maybe' | 'No';
  timeStarted: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  options?: string[];
  correctAnswer?: string;
  weight: number;
}

export interface CareerPath {
  title: string;
  description: string;
  fitScore: number;
}

export interface SkillGap {
  skill: string;
  required: number;
  current: number;
  gap: 'Low' | 'Moderate' | 'High';
}