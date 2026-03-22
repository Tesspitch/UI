import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { FileText, TrendingUp, Award, Clock, HelpCircle, Calendar } from "lucide-react";
import { Badge } from "../../components/ui/badge";

const navItems = [
  { label: "Dashboard", path: "/student", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "My Exams", path: "/student/exams", icon: <FileText className="w-5 h-5" /> },
  { label: "Results", path: "/student/results", icon: <Award className="w-5 h-5" /> },
];

const upcomingExams = [
  {
    id: 1,
    title: "Mathematics Final Exam",
    course: "Calculus I",
    date: "2026-03-12",
    time: "10:00 AM",
    duration: 120,
    questions: 40,
    instructor: "Dr. Sarah Johnson"
  },
  {
    id: 2,
    title: "Data Structures Final",
    course: "Data Structures",
    date: "2026-03-15",
    time: "2:00 PM",
    duration: 150,
    questions: 50,
    instructor: "Prof. Michael Chen"
  },
  {
    id: 3,
    title: "Physics Midterm",
    course: "Physics 101",
    date: "2026-03-18",
    time: "9:00 AM",
    duration: 90,
    questions: 30,
    instructor: "Dr. Emily Rodriguez"
  },
];

const completedExams = [
  {
    id: 4,
    title: "Chemistry Quiz",
    course: "Chemistry Basics",
    date: "2026-03-07",
    duration: 45,
    questions: 20,
    score: 92
  },
  {
    id: 5,
    title: "Linear Algebra Test",
    course: "Linear Algebra",
    date: "2026-03-05",
    duration: 60,
    questions: 25,
    score: 78
  },
  {
    id: 6,
    title: "Programming Assignment",
    course: "Data Structures",
    date: "2026-03-03",
    duration: 90,
    questions: 30,
    score: 88
  },
];

export default function StudentExams() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <DashboardLayout navItems={navItems} role="student">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">My Exams</h2>
          <p className="text-muted-foreground mt-1">View and take your scheduled exams</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {upcomingExams.map((exam) => (
              <Card key={exam.id} className="shadow-sm border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground">{exam.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{exam.course}</p>
                      <p className="text-sm text-muted-foreground">Instructor: {exam.instructor}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      Upcoming
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-accent/50">
                      <Calendar className="w-5 h-5 text-primary mb-1" />
                      <div className="text-sm font-semibold text-foreground">{exam.date}</div>
                      <div className="text-xs text-muted-foreground">{exam.time}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <Clock className="w-5 h-5 text-primary mb-1" />
                      <div className="text-sm font-semibold text-foreground">{exam.duration} min</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <HelpCircle className="w-5 h-5 text-primary mb-1" />
                      <div className="text-sm font-semibold text-foreground">{exam.questions}</div>
                      <div className="text-xs text-muted-foreground">Questions</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50 flex items-center justify-center">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">
                        Start Exam
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20">
                    <p className="text-sm text-[#10B981] font-medium">
                      Make sure you're ready before starting. Once you begin, the timer cannot be paused.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-4">
            {completedExams.map((exam) => (
              <Card key={exam.id} className="shadow-sm border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground">{exam.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{exam.course}</p>
                    </div>
                    <div className="text-center">
                      <div
                        className="text-3xl font-bold"
                        style={{ color: exam.score >= 80 ? "#10B981" : exam.score >= 60 ? "#1E3A8A" : "#EF4444" }}
                      >
                        {exam.score}%
                      </div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-accent/50 text-center">
                      <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="text-sm font-medium text-foreground">{exam.date}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50 text-center">
                      <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="text-sm font-medium text-foreground">{exam.duration} min</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50 text-center">
                      <HelpCircle className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="text-sm font-medium text-foreground">{exam.questions}</div>
                      <div className="text-xs text-muted-foreground">Questions</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    View Detailed Results
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
