import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { BookOpen, FileText, HelpCircle, ClipboardList, TrendingUp, Plus, Users, FileQuestion } from "lucide-react";
import { Badge } from "../../components/ui/badge";

const navItems = [
  { label: "Dashboard", path: "/teacher", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Subjects", path: "/teacher/subjects", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Courses", path: "/teacher/courses", icon: <ClipboardList className="w-5 h-5" /> },
  { label: "Question Bank", path: "/teacher/questions", icon: <HelpCircle className="w-5 h-5" /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileText className="w-5 h-5" /> },
];

const initialCourses = [
  { id: 1, name: "Calculus I", subject: "Mathematics", code: "MATH101", students: 32, questions: 85, exams: 3 },
  { id: 2, name: "Linear Algebra", subject: "Mathematics", code: "MATH201", students: 28, questions: 72, exams: 2 },
  { id: 3, name: "Physics 101", subject: "Physics", code: "PHYS101", students: 30, questions: 64, exams: 4 },
  { id: 4, name: "Data Structures", subject: "Computer Science", code: "CS201", students: 45, questions: 120, exams: 5 },
];

export default function TeacherCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<typeof initialCourses[0] | null>(null);
  const [newCourse, setNewCourse] = useState({ name: "", subject: "", code: "", description: "" });

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.subject && newCourse.code) {
      if (editingCourse) {
        setCourses(courses.map(c => c.id === editingCourse.id ? { ...editingCourse, ...newCourse } : c));
      } else {
        setCourses([...courses, { ...newCourse, id: Date.now(), students: 0, questions: 0, exams: 0 }]);
      }
      resetForm();
    }
  };

  const handleEditCourse = (course: typeof initialCourses[0]) => {
    setEditingCourse(course);
    setNewCourse({ name: course.name, subject: course.subject, code: course.code, description: "" });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setNewCourse({ name: "", subject: "", code: "", description: "" });
    setEditingCourse(null);
    setIsDialogOpen(false);
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <DashboardLayout navItems={navItems} role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Courses</h2>
            <p className="text-muted-foreground mt-1">Manage your course catalog</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
                <DialogDescription>{editingCourse ? "Update course information" : "Create a new course for your students"}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    placeholder="e.g., Calculus I"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={newCourse.subject} onValueChange={(value) => setNewCourse({ ...newCourse, subject: value })}>
                    <SelectTrigger className="bg-input-background">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code</Label>
                  <Input
                    id="courseCode"
                    placeholder="e.g., MATH101"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseDescription">Description</Label>
                  <Textarea
                    id="courseDescription"
                    placeholder="Brief description of the course"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <Button onClick={handleAddCourse} className="w-full bg-primary hover:bg-primary/90">
                  {editingCourse ? "Update Course" : "Create Course"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="shadow-sm border-border hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">{course.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{course.code}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    {course.subject}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xl font-semibold text-foreground">{course.students}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <FileQuestion className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xl font-semibold text-foreground">{course.questions}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-accent/50">
                    <FileText className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-xl font-semibold text-foreground">{course.exams}</div>
                    <div className="text-xs text-muted-foreground">Exams</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditCourse(course)}>
                    Manage
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => handleDeleteCourse(course.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}