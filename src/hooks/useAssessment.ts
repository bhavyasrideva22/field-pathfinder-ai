import { useState, useCallback } from 'react';
import { AssessmentState, AssessmentAnswer, Question } from '@/types/assessment';
import { psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/questions';

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  answers: [],
  scores: {
    psychologicalFit: 0,
    technicalReadiness: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      abilityToLearn: 0,
      realWorldAlignment: 0
    },
    confidenceScore: 0
  },
  recommendation: 'Maybe',
  timeStarted: new Date()
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>(initialState);

  const startAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSection: 'psychometric',
      timeStarted: new Date()
    }));
  }, []);

  const submitAnswer = useCallback((answer: AssessmentAnswer) => {
    setState(prev => {
      const newAnswers = [...prev.answers.filter(a => a.questionId !== answer.questionId), answer];
      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const allQuestions = getAllQuestions();
      const sectionQuestions = getCurrentSectionQuestions(prev.currentSection);
      
      if (prev.currentQuestionIndex < sectionQuestions.length - 1) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        };
      } else {
        // Move to next section
        const nextSection = getNextSection(prev.currentSection);
        return {
          ...prev,
          currentSection: nextSection,
          currentQuestionIndex: 0
        };
      }
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1
        };
      } else {
        // Move to previous section
        const prevSection = getPreviousSection(prev.currentSection);
        const prevSectionQuestions = getCurrentSectionQuestions(prevSection);
        return {
          ...prev,
          currentSection: prevSection,
          currentQuestionIndex: Math.max(0, prevSectionQuestions.length - 1)
        };
      }
    });
  }, []);

  const calculateScores = useCallback(() => {
    const { answers } = state;
    
    // Calculate psychometric fit
    const psychAnswers = answers.filter(a => a.category === 'psychometric');
    const psychScore = psychAnswers.reduce((sum, answer) => sum + Number(answer.value), 0) / psychAnswers.length * 20;
    
    // Calculate technical readiness
    const techAnswers = answers.filter(a => a.category === 'technical');
    const techScore = techAnswers.filter(answer => {
      const question = technicalQuestions.find(q => q.id === answer.questionId);
      return question?.correctAnswer === answer.value;
    }).length / techAnswers.length * 100;
    
    // Calculate WISCAR scores
    const wiscarAnswers = answers.filter(a => a.category === 'wiscar');
    const wiscarScores = {
      will: calculateWiscarSubscore(wiscarAnswers, 'will'),
      interest: calculateWiscarSubscore(wiscarAnswers, 'interest'),
      skill: calculateWiscarSubscore(wiscarAnswers, 'skill'),
      cognitive: calculateWiscarSubscore(wiscarAnswers, 'cognitive'),
      abilityToLearn: calculateWiscarSubscore(wiscarAnswers, 'abilityToLearn'),
      realWorldAlignment: calculateWiscarSubscore(wiscarAnswers, 'realWorldAlignment')
    };
    
    const confidenceScore = (psychScore + techScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3;
    
    const recommendation = confidenceScore >= 75 ? 'Yes' : confidenceScore >= 60 ? 'Maybe' : 'No';
    
    setState(prev => ({
      ...prev,
      scores: {
        psychologicalFit: Math.round(psychScore),
        technicalReadiness: Math.round(techScore),
        wiscar: {
          will: Math.round(wiscarScores.will),
          interest: Math.round(wiscarScores.interest),
          skill: Math.round(wiscarScores.skill),
          cognitive: Math.round(wiscarScores.cognitive),
          abilityToLearn: Math.round(wiscarScores.abilityToLearn),
          realWorldAlignment: Math.round(wiscarScores.realWorldAlignment)
        },
        confidenceScore: Math.round(confidenceScore)
      },
      recommendation,
      currentSection: 'results'
    }));
  }, [state]);

  const calculateWiscarSubscore = (answers: AssessmentAnswer[], subcategory: string): number => {
    const subcatAnswers = answers.filter(a => {
      const question = wiscarQuestions.find(q => q.id === a.questionId);
      return question?.subcategory === subcategory;
    });
    
    if (subcatAnswers.length === 0) return 0;
    
    const sum = subcatAnswers.reduce((total, answer) => total + Number(answer.value), 0);
    return (sum / subcatAnswers.length) * 20;
  };

  const getAllQuestions = (): Question[] => {
    return [...psychometricQuestions, ...technicalQuestions, ...wiscarQuestions];
  };

  const getCurrentSectionQuestions = (section: string): Question[] => {
    switch (section) {
      case 'psychometric':
        return psychometricQuestions;
      case 'technical':
        return technicalQuestions;
      case 'wiscar':
        return wiscarQuestions;
      default:
        return [];
    }
  };

  const getNextSection = (currentSection: string): AssessmentState['currentSection'] => {
    switch (currentSection) {
      case 'intro':
        return 'psychometric';
      case 'psychometric':
        return 'technical';
      case 'technical':
        return 'wiscar';
      case 'wiscar':
        return 'results';
      default:
        return 'results';
    }
  };

  const getPreviousSection = (currentSection: string): AssessmentState['currentSection'] => {
    switch (currentSection) {
      case 'psychometric':
        return 'intro';
      case 'technical':
        return 'psychometric';
      case 'wiscar':
        return 'technical';
      case 'results':
        return 'wiscar';
      default:
        return 'intro';
    }
  };

  const getTotalProgress = (): number => {
    const allQuestions = getAllQuestions();
    const answeredQuestions = state.answers.length;
    return (answeredQuestions / allQuestions.length) * 100;
  };

  const getCurrentQuestion = (): Question | null => {
    const sectionQuestions = getCurrentSectionQuestions(state.currentSection);
    return sectionQuestions[state.currentQuestionIndex] || null;
  };

  return {
    state,
    startAssessment,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    calculateScores,
    getTotalProgress,
    getCurrentQuestion,
    getAllQuestions: getAllQuestions(),
    getCurrentSectionQuestions: getCurrentSectionQuestions(state.currentSection),
    isLastQuestion: state.currentQuestionIndex >= getCurrentSectionQuestions(state.currentSection).length - 1 && state.currentSection === 'wiscar'
  };
};