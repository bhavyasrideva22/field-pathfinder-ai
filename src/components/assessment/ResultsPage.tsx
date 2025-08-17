import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { AssessmentState, CareerPath, SkillGap } from "@/types/assessment";
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Award,
  Download,
  RotateCcw
} from "lucide-react";

interface ResultsPageProps {
  results: AssessmentState;
  onRestart: () => void;
}

export const ResultsPage = ({ results, onRestart }: ResultsPageProps) => {
  const { scores, recommendation } = results;

  const getRecommendationColor = () => {
    switch (recommendation) {
      case 'Yes':
        return 'success-gradient';
      case 'Maybe':
        return 'bg-warning';
      case 'No':
        return 'bg-destructive';
      default:
        return 'hero-gradient';
    }
  };

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case 'Yes':
        return <CheckCircle className="w-6 h-6" />;
      case 'Maybe':
        return <AlertCircle className="w-6 h-6" />;
      case 'No':
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  const careerPaths: CareerPath[] = [
    { title: "Field Service Engineer", description: "On-site equipment installation, repair, and maintenance", fitScore: scores.confidenceScore },
    { title: "Maintenance Technician", description: "Preventive and corrective maintenance of machinery", fitScore: Math.max(60, scores.technicalReadiness) },
    { title: "Technical Support Engineer", description: "Remote and on-site technical troubleshooting support", fitScore: Math.max(55, scores.psychologicalFit) },
    { title: "Installation Specialist", description: "Setup and configuration of hardware systems", fitScore: Math.max(50, scores.technicalReadiness - 10) },
    { title: "Service Coordinator", description: "Scheduling and managing service calls and technicians", fitScore: Math.max(45, scores.psychologicalFit - 15) }
  ];

  const skillGaps: SkillGap[] = [
    { skill: "Technical Troubleshooting", required: 85, current: scores.technicalReadiness, gap: scores.technicalReadiness >= 75 ? 'Low' : scores.technicalReadiness >= 60 ? 'Moderate' : 'High' },
    { skill: "Customer Interaction", required: 80, current: scores.psychologicalFit, gap: scores.psychologicalFit >= 70 ? 'Low' : scores.psychologicalFit >= 55 ? 'Moderate' : 'High' },
    { skill: "Equipment Diagnostics", required: 90, current: scores.wiscar.cognitive, gap: scores.wiscar.cognitive >= 75 ? 'Low' : scores.wiscar.cognitive >= 60 ? 'Moderate' : 'High' },
    { skill: "Safety & Compliance", required: 85, current: scores.technicalReadiness, gap: scores.technicalReadiness >= 70 ? 'Low' : 'Moderate' },
    { skill: "Time Management", required: 75, current: scores.wiscar.realWorldAlignment, gap: scores.wiscar.realWorldAlignment >= 65 ? 'Low' : 'Moderate' }
  ];

  const getNextSteps = () => {
    if (recommendation === 'Yes') {
      return [
        "Apply for Field Service Engineer positions",
        "Seek mentorship from experienced engineers",
        "Consider specialized certifications in your field",
        "Join professional engineering associations"
      ];
    } else if (recommendation === 'Maybe') {
      return [
        "Complete basic electrical/mechanical engineering courses",
        "Gain hands-on experience through internships",
        "Develop customer communication skills",
        "Practice technical troubleshooting scenarios"
      ];
    } else {
      return [
        "Consider alternative technical roles",
        "Explore Equipment Operator positions",
        "Look into Manufacturing Technician roles",
        "Develop foundational technical skills"
      ];
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Assessment Results</h1>
          <p className="text-xl text-muted-foreground">
            Your comprehensive Field Service Engineer career assessment
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="soft-shadow mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Overall Recommendation</CardTitle>
              <Badge className={`${getRecommendationColor()} text-white px-4 py-2`}>
                {recommendation}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${getRecommendationColor()} text-white`}>
                {getRecommendationIcon()}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {recommendation === 'Yes' && "Excellent Fit for Field Service Engineering"}
                  {recommendation === 'Maybe' && "Good Potential with Additional Training"}
                  {recommendation === 'No' && "Consider Alternative Career Paths"}
                </h3>
                <p className="text-muted-foreground">
                  {recommendation === 'Yes' && "You demonstrate strong alignment with Field Service Engineering requirements across technical, psychological, and practical dimensions."}
                  {recommendation === 'Maybe' && "You show promise for Field Service Engineering but would benefit from targeted skill development in key areas."}
                  {recommendation === 'No' && "Based on your assessment, other technical roles might be a better fit for your current skills and interests."}
                </p>
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Confidence Score:</span>
                    <Badge variant="outline">{scores.confidenceScore}%</Badge>
                  </div>
                  <ProgressBar 
                    value={scores.confidenceScore} 
                    variant={scores.confidenceScore >= 75 ? 'success' : scores.confidenceScore >= 60 ? 'warning' : 'default'}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="soft-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Core Assessment Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychological Fit</span>
                  <Badge variant="outline">{scores.psychologicalFit}%</Badge>
                </div>
                <ProgressBar value={scores.psychologicalFit} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <Badge variant="outline">{scores.technicalReadiness}%</Badge>
                </div>
                <ProgressBar value={scores.technicalReadiness} />
              </div>
            </CardContent>
          </Card>

          <Card className="soft-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                WISCAR Dimensions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(scores.wiscar).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Badge variant="outline" className="text-xs">{value}%</Badge>
                  </div>
                  <ProgressBar value={value} className="h-2" showPercentage={false} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Career Paths */}
        <Card className="soft-shadow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careerPaths.map((path, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm">{path.title}</h3>
                    <Badge 
                      variant={path.fitScore >= 75 ? 'default' : 'outline'}
                      className="text-xs"
                    >
                      {path.fitScore}% fit
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                  <ProgressBar value={path.fitScore} className="h-2" showPercentage={false} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Gap Analysis */}
        <Card className="soft-shadow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Skill Gap Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Skill</th>
                    <th className="text-center py-3 font-medium">Required</th>
                    <th className="text-center py-3 font-medium">Current</th>
                    <th className="text-center py-3 font-medium">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {skillGaps.map((gap, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 font-medium">{gap.skill}</td>
                      <td className="text-center py-3">{gap.required}%</td>
                      <td className="text-center py-3">{gap.current}%</td>
                      <td className="text-center py-3">
                        <Badge 
                          variant={gap.gap === 'Low' ? 'default' : gap.gap === 'Moderate' ? 'outline' : 'destructive'}
                          className="text-xs"
                        >
                          {gap.gap}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="soft-shadow mb-8">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Immediate Actions</h3>
                <ul className="space-y-2">
                  {getNextSteps().map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Learning Path</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm">Beginner (0-3 months)</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Basic electrical/mechanical concepts, safety training
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm">Intermediate (3-6 months)</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Diagnostics, customer handling, software tools
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm">Job-ready (6-9 months)</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Field internships, complex troubleshooting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button onClick={onRestart} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Take Assessment Again
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Assessment completed in {Math.round((Date.now() - results.timeStarted.getTime()) / 60000)} minutes
          </p>
        </div>
      </div>
    </div>
  );
};