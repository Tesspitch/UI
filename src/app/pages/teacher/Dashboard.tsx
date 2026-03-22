import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { BookOpen, FileText, HelpCircle, ClipboardList, TrendingUp, Users } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/teacher", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Subjects", path: "/teacher/subjects", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Courses", path: "/teacher/courses", icon: <ClipboardList className="w-5 h-5" /> },
  { label: "Question Bank", path: "/teacher/questions", icon: <HelpCircle className="w-5 h-5" /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileText className="w-5 h-5" /> },
];

const stats = [
  { title: "Total Subjects", value: "8", icon: BookOpen, color: "text-primary" },
  { title: "Total Courses", value: "12", icon: ClipboardList, color: "text-primary" },
  { title: "Question Bank", value: "342", icon: HelpCircle, color: "text-primary" },
  { title: "Active Exams", value: "5", icon: FileText, color: "text-[#10B981]" },
  { title: "Students Enrolled", value: "124", icon: Users, color: "text-primary" },
  { title: "Avg Score", value: "78%", icon: TrendingUp, color: "text-[#10B981]" },
];

const recentExams = [
  { name: "Mathematics Final Exam", course: "Calculus I", students: 32, avgScore: 82, date: "2026-03-08" },
  { name: "Physics Midterm", course: "Physics 101", students: 28, avgScore: 75, date: "2026-03-05" },
  { name: "Chemistry Quiz", course: "Chemistry Basics", students: 25, avgScore: 88, date: "2026-03-03" },
];

export default function TeacherDashboard() {
  return (
    <DashboardLayout navItems={navItems} role="teacher">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Overview of your teaching activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Recent Exams */}
        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Recent Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExams.map((exam, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">{exam.name}</h4>
                    <p className="text-sm text-muted-foreground">{exam.course}</p>
                  </div>
                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-center">
                      <div className="text-muted-foreground">Students</div>
                      <div className="font-semibold text-foreground">{exam.students}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Avg Score</div>
                      <div className="font-semibold" style={{ color: exam.avgScore >= 80 ? "#10B981" : "#EF4444" }}>
                        {exam.avgScore}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Date</div>
                      <div className="font-medium text-foreground">{exam.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
