import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BookOpen, FileText, TrendingUp, Clock, Award, CheckCircle, LogIn, Play } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router";

const navItems = [
  { label: "Dashboard", path: "/student", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "My Exams", path: "/student/exams", icon: <FileText className="w-5 h-5" /> },
  { label: "Results", path: "/student/results", icon: <Award className="w-5 h-5" /> },
];

const stats = [
  { title: "Enrolled Courses", value: "6", icon: BookOpen, color: "text-primary" },
  { title: "Completed Exams", value: "12", icon: CheckCircle, color: "text-[#10B981]" },
  { title: "Pending Exams", value: "3", icon: Clock, color: "text-primary" },
  { title: "Average Score", value: "85%", icon: TrendingUp, color: "text-[#10B981]" },
];

const upcomingExams = [
  {
    id: 1,
    title: "Mathematics Final Exam",
    course: "Calculus I",
    date: "2026-03-12",
    time: "10:00 AM",
    duration: 120,
    questions: 40
  },
  {
    id: 2,
    title: "Data Structures Final",
    course: "Data Structures",
    date: "2026-03-15",
    time: "2:00 PM",
    duration: 150,
    questions: 50
  },
  {
    id: 3,
    title: "Physics Midterm",
    course: "Physics 101",
    date: "2026-03-18",
    time: "9:00 AM",
    duration: 90,
    questions: 30
  },
];

const recentScores = [
  { exam: "Chemistry Quiz", course: "Chemistry Basics", score: 92, date: "2026-03-07" },
  { exam: "Linear Algebra Test", course: "Linear Algebra", score: 78, date: "2026-03-05" },
  { exam: "Programming Assignment", course: "Data Structures", score: 88, date: "2026-03-03" },
];

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout navItems={navItems} role="student">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Welcome Back!</h2>
          <p className="text-muted-foreground mt-1">Here's your learning progress</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-primary shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/student/join-exam")}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <LogIn className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Join Exam Room</h3>
                  <p className="text-sm text-muted-foreground">Enter exam code to start</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#10B981] shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/student/practice")}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#10B981] rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Practice Mode</h3>
                  <p className="text-sm text-muted-foreground">Try practice exams</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm border-border hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Exams */}
          <Card className="shadow-sm border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Upcoming Exams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{exam.title}</h4>
                      <p className="text-sm text-muted-foreground">{exam.course}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      {exam.questions} Qs
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exam.duration} min
                    </span>
                    <span>{exam.date} at {exam.time}</span>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-primary hover:bg-primary/90">
                    Start Exam
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Scores */}
          <Card className="shadow-sm border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Recent Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentScores.map((score, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{score.exam}</h4>
                      <p className="text-sm text-muted-foreground">{score.course}</p>
                      <p className="text-xs text-muted-foreground mt-1">{score.date}</p>
                    </div>
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: score.score >= 80 ? "#10B981" : score.score >= 60 ? "#1E3A8A" : "#EF4444" }}
                      >
                        {score.score}%
                      </div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}