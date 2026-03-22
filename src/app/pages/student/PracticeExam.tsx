import { useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { FileText, TrendingUp, Award, Play, BookOpen } from "lucide-react";
import { Badge } from "../../components/ui/badge";

const navItems = [
  { label: "Dashboard", path: "/student", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "My Exams", path: "/student/exams", icon: <FileText className="w-5 h-5" /> },
  { label: "Results", path: "/student/results", icon: <Award className="w-5 h-5" /> },
];

const availableCourses = [
  { 
    id: "calc1", 
    name: "Calculus I", 
    totalQuestions: 85,
    easy: 30,
    medium: 35,
    hard: 20
  },
  { 
    id: "phys101", 
    name: "Physics 101",
    totalQuestions: 64,
    easy: 25,
    medium: 25,
    hard: 14
  },
  { 
    id: "ds", 
    name: "Data Structures",
    totalQuestions: 120,
    easy: 40,
    medium: 50,
    hard: 30
  },
];

export default function PracticeExam() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);

  const selectedCourseData = availableCourses.find(c => c.id === selectedCourse);

  const handleStartPractice = () => {
    if (!selectedCourse) {
      alert("Please select a course");
      return;
    }
    // In real app, this would fetch practice questions and navigate to practice exam page
    navigate(`/student/take-practice/${selectedCourse}?questions=${numQuestions}`);
  };

  return (
    <DashboardLayout navItems={navItems} role="student">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground">Practice Exam Mode</h2>
          <p className="text-muted-foreground mt-2">Practice with random questions to prepare for your exams</p>
        </div>

        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <Play className="w-6 h-6 text-primary" />
              Configure Practice Session
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="course">Select Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Choose a course to practice" />
                </SelectTrigger>
                <SelectContent>
                  {availableCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{course.name}</span>
                        <span className="text-xs text-muted-foreground ml-4">
                          ({course.totalQuestions} questions)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCourseData && (
              <div className="p-4 rounded-lg bg-accent/50 border border-border">
                <h4 className="font-semibold text-foreground mb-3">Available Questions</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-[#10B981]/10">
                    <div className="text-lg font-bold text-[#10B981]">{selectedCourseData.easy}</div>
                    <div className="text-xs text-[#10B981]">Easy</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <div className="text-lg font-bold text-primary">{selectedCourseData.medium}</div>
                    <div className="text-xs text-primary">Medium</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#EF4444]/10">
                    <div className="text-lg font-bold text-[#EF4444]">{selectedCourseData.hard}</div>
                    <div className="text-xs text-[#EF4444]">Hard</div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="numQuestions">Number of Questions</Label>
              <Input
                id="numQuestions"
                type="number"
                min="5"
                max={selectedCourseData?.totalQuestions || 100}
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value) || 10)}
                className="bg-input-background"
              />
              <p className="text-xs text-muted-foreground">
                Questions will be randomly selected from the question bank
              </p>
            </div>

            <Button 
              onClick={handleStartPractice}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
              disabled={!selectedCourse}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Practice Session
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Random Questions</h4>
              <p className="text-sm text-muted-foreground">
                Practice with randomly selected questions from the course
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-[#10B981]" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Instant Feedback</h4>
              <p className="text-sm text-muted-foreground">
                See correct answers immediately after completion
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">No Score Recording</h4>
              <p className="text-sm text-muted-foreground">
                Practice mode scores are not saved to your official results
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-foreground mb-3">Practice Mode Features:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Practice as many times as you want</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>No time limit - take your time to learn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>See which questions you got right or wrong</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Perfect for exam preparation</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
