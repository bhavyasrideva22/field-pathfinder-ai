import { useAssessment } from "@/hooks/useAssessment";
import { AssessmentIntro } from "./AssessmentIntro";
import { QuestionCard } from "./QuestionCard";
import { ResultsPage } from "./ResultsPage";
import { useToast } from "@/hooks/use-toast";

export const Assessment = () => {
  const {
    state,
    startAssessment,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    calculateScores,
    getTotalProgress,
    getCurrentQuestion,
    getCurrentSectionQuestions,
    isLastQuestion
  } = useAssessment();

  const { toast } = useToast();

  const handleNext = () => {
    if (isLastQuestion) {
      calculateScores();
      toast({
        title: "Assessment Complete!",
        description: "Your personalized results are ready.",
      });
    } else {
      nextQuestion();
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const canGoBack = () => {
    return state.currentSection !== 'intro' && 
           !(state.currentSection === 'psychometric' && state.currentQuestionIndex === 0);
  };

  const getExistingAnswer = () => {
    const question = getCurrentQuestion();
    if (!question) return undefined;
    
    const existingAnswer = state.answers.find(a => a.questionId === question.id);
    return existingAnswer?.value;
  };

  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStart={startAssessment} />;
  }

  if (state.currentSection === 'results') {
    return <ResultsPage results={state} onRestart={handleRestart} />;
  }

  const currentQuestion = getCurrentQuestion();
  const sectionQuestions = getCurrentSectionQuestions;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-muted-foreground">Preparing your assessment</p>
        </div>
      </div>
    );
  }

  return (
    <QuestionCard
      question={currentQuestion}
      currentIndex={state.currentQuestionIndex}
      totalQuestions={sectionQuestions.length}
      onAnswer={submitAnswer}
      onNext={handleNext}
      onPrevious={previousQuestion}
      canGoBack={canGoBack()}
      isLastQuestion={isLastQuestion}
      existingAnswer={getExistingAnswer()}
      section={state.currentSection}
    />
  );
};