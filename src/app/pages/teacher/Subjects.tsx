import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { BookOpen, FileText, HelpCircle, ClipboardList, TrendingUp, Plus, Pencil, Trash2 } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/teacher", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Subjects", path: "/teacher/subjects", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Courses", path: "/teacher/courses", icon: <ClipboardList className="w-5 h-5" /> },
  { label: "Question Bank", path: "/teacher/questions", icon: <HelpCircle className="w-5 h-5" /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileText className="w-5 h-5" /> },
];

const initialSubjects = [
  { id: 1, name: "Mathematics", code: "MATH", description: "Mathematics and related topics", courses: 4 },
  { id: 2, name: "Physics", code: "PHYS", description: "Physics principles and applications", courses: 3 },
  { id: 3, name: "Chemistry", code: "CHEM", description: "Chemical sciences", courses: 2 },
  { id: 4, name: "Computer Science", code: "CS", description: "Programming and algorithms", courses: 5 },
];

export default function TeacherSubjects() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<typeof initialSubjects[0] | null>(null);
  const [newSubject, setNewSubject] = useState({ name: "", code: "", description: "" });

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.code) {
      if (editingSubject) {
        setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...editingSubject, ...newSubject } : s));
      } else {
        setSubjects([...subjects, { ...newSubject, id: Date.now(), courses: 0 }]);
      }
      resetForm();
    }
  };

  const handleEditSubject = (subject: typeof initialSubjects[0]) => {
    setEditingSubject(subject);
    setNewSubject({ name: subject.name, code: subject.code, description: subject.description });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setNewSubject({ name: "", code: "", description: "" });
    setEditingSubject(null);
    setIsDialogOpen(false);
  };

  const handleDeleteSubject = (id: number) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <DashboardLayout navItems={navItems} role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Subjects</h2>
            <p className="text-muted-foreground mt-1">Manage your teaching subjects</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>{editingSubject ? "Edit Subject" : "Add New Subject"}</DialogTitle>
                <DialogDescription>{editingSubject ? "Update subject information" : "Create a new subject to organize your courses"}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Subject Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Mathematics"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Subject Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g., MATH"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the subject"
                    value={newSubject.description}
                    onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <Button onClick={handleAddSubject} className="w-full bg-primary hover:bg-primary/90">
                  {editingSubject ? "Update Subject" : "Create Subject"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id} className="shadow-sm border-border hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">{subject.name}</CardTitle>
                    <p className="text-sm text-primary font-medium mt-1">{subject.code}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{subject.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">{subject.courses} courses</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10" onClick={() => handleEditSubject(subject)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteSubject(subject.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}