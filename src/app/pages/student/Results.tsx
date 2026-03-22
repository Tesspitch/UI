import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { FileText, TrendingUp, Award, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "../../components/ui/badge";

const navItems = [
  { label: "Dashboard", path: "/student", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "My Exams", path: "/student/exams", icon: <FileText className="w-5 h-5" /> },
  { label: "Results", path: "/student/results", icon: <Award className="w-5 h-5" /> },
];

const examResults = [
  {
    id: 1,
    title: "Chemistry Quiz",
    course: "Chemistry Basics",
    date: "2026-03-07",
    score: 92,
    totalQuestions: 20,
    correctAnswers: 18,
    timeSpent: 40,
    duration: 45
  },
  {
    id: 2,
    title: "Linear Algebra Test",
    course: "Linear Algebra",
    date: "2026-03-05",
    score: 78,
    totalQuestions: 25,
    correctAnswers: 19,
    timeSpent: 58,
    duration: 60
  },
  {
    id: 3,
    title: "Programming Assignment",
    course: "Data Structures",
    date: "2026-03-03",
    score: 88,
    totalQuestions: 30,
    correctAnswers: 26,
    timeSpent: 85,
    duration: 90
  },
  {
    id: 4,
    title: "Calculus Midterm",
    course: "Calculus I",
    date: "2026-02-28",
    score: 85,
    totalQuestions: 35,
    correctAnswers: 29,
    timeSpent: 115,
    duration: 120
  },
  {
    id: 5,
    title: "Physics Quiz",
    course: "Physics 101",
    date: "2026-02-25",
    score: 72,
    totalQuestions: 15,
    correctAnswers: 11,
    timeSpent: 28,
    duration: 30
  },
];

const overallStats = [
  { label: "Total Exams", value: examResults.length, icon: FileText, color: "text-primary" },
  { label: "Average Score", value: `${Math.round(examResults.reduce((acc, r) => acc + r.score, 0) / examResults.length)}%`, icon: TrendingUp, color: "text-[#10B981]" },
  { label: "Passed", value: examResults.filter(r => r.score >= 60).length, icon: CheckCircle, color: "text-[#10B981]" },
  { label: "Failed", value: examResults.filter(r => r.score < 60).length, icon: XCircle, color: "text-[#EF4444]" },
];

const getScoreStatus = (score: number) => {
  if (score >= 80) return { label: "Excellent", color: "bg-[#10B981]/10 text-[#10B981]", icon: CheckCircle };
  if (score >= 60) return { label: "Passed", color: "bg-primary/10 text-primary", icon: AlertCircle };
  return { label: "Failed", color: "bg-[#EF4444]/10 text-[#EF4444]", icon: XCircle };
};

export default function StudentResults() {
  return (
    <DashboardLayout navItems={navItems} role="student">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Exam Results</h2>
          <p className="text-muted-foreground mt-1">Track your performance and progress</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overallStats.map((stat, index) => (
            <Card key={index} className="shadow-sm border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Results */}
        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Detailed Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {examResults.map((result) => {
              const status = getScoreStatus(result.score);
              const StatusIcon = status.icon;
              
              return (
                <div
                  key={result.id}
                  className="p-5 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-foreground">{result.title}</h4>
                      <p className="text-sm text-muted-foreground">{result.course}</p>
                      <p className="text-xs text-muted-foreground mt-1">Completed on {result.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className={`${status.color} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                      <div className="text-center">
                        <div
                          className="text-3xl font-bold"
                          style={{
                            color: result.score >= 80 ? "#10B981" : result.score >= 60 ? "#1E3A8A" : "#EF4444"
                          }}
                        >
                          {result.score}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-accent/50">
                      <div className="text-xs text-muted-foreground">Questions</div>
                      <div className="text-lg font-semibold text-foreground">{result.totalQuestions}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <div className="text-xs text-muted-foreground">Correct</div>
                      <div className="text-lg font-semibold text-[#10B981]">
                        {result.correctAnswers}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <div className="text-xs text-muted-foreground">Incorrect</div>
                      <div className="text-lg font-semibold text-[#EF4444]">
                        {result.totalQuestions - result.correctAnswers}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <div className="text-xs text-muted-foreground">Time Used</div>
                      <div className="text-lg font-semibold text-foreground">
                        {result.timeSpent}/{result.duration} min
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Score Progress</span>
                      <span className="font-medium text-foreground">{result.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${result.score}%`,
                          backgroundColor: result.score >= 80 ? "#10B981" : result.score >= 60 ? "#1E3A8A" : "#EF4444"
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
