import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Target } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  const successTraits = [
    "Technical aptitude and mechanical/electrical knowledge",
    "Analytical problem-solving skills", 
    "Strong communication and interpersonal skills",
    "Flexibility and adaptability",
    "Customer service orientation",
    "Ability to work independently and in the field"
  ];

  const careerPaths = [
    "Field Service Engineer",
    "Maintenance Technician", 
    "Technical Support Engineer",
    "Installation Specialist",
    "Service Manager"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="text-sm font-medium">
            AI-Powered Career Assessment
          </Badge>
          <h1 className="text-5xl font-bold hero-gradient bg-clip-text text-transparent">
            Should I Become a Field Service Engineer?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover if Field Service Engineering aligns with your strengths, interests, and career goals through our comprehensive assessment.
          </p>
        </div>

        {/* Assessment Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="soft-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                <CardTitle>Assessment Objective</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our assessment evaluates your psychometric fit, technical readiness, and overall alignment with Field Service Engineering roles.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm">25-30 minutes duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">Personalized recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Skill gap analysis included</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="soft-shadow">
            <CardHeader>
              <CardTitle>Field Service Engineer Role</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Field Service Engineers install, maintain, troubleshoot, and repair equipment on-site, requiring strong technical skills and customer interaction.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Career Paths:</h4>
                <div className="flex flex-wrap gap-2">
                  {careerPaths.map((path, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {path}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Traits */}
        <Card className="soft-shadow">
          <CardHeader>
            <CardTitle>Key Success Traits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {successTraits.map((trait, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Sections */}
        <Card className="soft-shadow">
          <CardHeader>
            <CardTitle>What You'll Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold">Psychometric Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Personality fit, interests, and motivation evaluation
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold">Technical Readiness</h3>
                <p className="text-sm text-muted-foreground">
                  Technical knowledge and problem-solving skills
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold">WISCAR Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive readiness across 6 key dimensions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            onClick={onStart}
            size="lg"
            className="hero-gradient text-lg px-8 py-6 elegant-shadow hover:glow-shadow smooth-transition"
          >
            Start Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Your responses are anonymous and used only for generating your personalized report.
          </p>
        </div>
      </div>
    </div>
  );
};