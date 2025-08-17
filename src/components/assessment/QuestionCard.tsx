import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, AssessmentAnswer } from "@/types/assessment";
import { likertOptions } from "@/data/questions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: AssessmentAnswer) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
  existingAnswer?: string | number;
  section: string;
}

export const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  isLastQuestion,
  existingAnswer,
  section
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(existingAnswer?.toString() || "");

  const handleAnswer = (value: string) => {
    setSelectedValue(value);
    onAnswer({
      questionId: question.id,
      value: question.type === 'likert' ? parseInt(value) : value,
      category: question.category
    });
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'psychometric':
        return 'Psychometric Assessment';
      case 'technical':
        return 'Technical Knowledge';
      case 'wiscar':
        return 'WISCAR Analysis';
      default:
        return 'Assessment';
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case 'psychometric':
        return 'Rate how well each statement describes you';
      case 'technical':
        return 'Select the best answer for each question';
      case 'wiscar':
        return 'Evaluate your readiness across key dimensions';
      default:
        return '';
    }
  };

  const renderQuestionInput = () => {
    if (question.type === 'likert') {
      return (
        <RadioGroup value={selectedValue} onValueChange={handleAnswer} className="space-y-4">
          {likertOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 smooth-transition">
              <RadioGroupItem 
                value={option.value.toString()} 
                id={`option-${option.value}`}
                className="text-primary"
              />
              <Label 
                htmlFor={`option-${option.value}`} 
                className="flex-1 cursor-pointer font-medium"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    if (question.type === 'multiple-choice' || question.type === 'scenario') {
      return (
        <RadioGroup value={selectedValue} onValueChange={handleAnswer} className="space-y-3">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 smooth-transition">
              <RadioGroupItem 
                value={option} 
                id={`option-${index}`}
                className="text-primary mt-1"
              />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              {getSectionTitle()}
            </span>
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          <ProgressBar value={((currentIndex + 1) / totalQuestions) * 100} />
        </div>

        {/* Question Card */}
        <Card className="soft-shadow">
          <CardHeader className="space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-xl leading-relaxed">
                {question.text}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {getSectionDescription()}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderQuestionInput()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!selectedValue}
            className={`flex items-center gap-2 ${isLastQuestion ? 'success-gradient' : 'hero-gradient'} smooth-transition`}
          >
            {isLastQuestion ? 'Complete Assessment' : 'Next'}
            {!isLastQuestion && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};