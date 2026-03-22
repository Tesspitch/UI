import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { BookOpen, FileText, HelpCircle, ClipboardList, TrendingUp, Plus, Download, Eye, Clock, Copy, Monitor, FileSpreadsheet } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import ExportConfigDialog, { ExportConfig } from "../../components/ExportConfigDialog";

const navItems = [
  { label: "Dashboard", path: "/teacher", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Subjects", path: "/teacher/subjects", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Courses", path: "/teacher/courses", icon: <ClipboardList className="w-5 h-5" /> },
  { label: "Question Bank", path: "/teacher/questions", icon: <HelpCircle className="w-5 h-5" /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileText className="w-5 h-5" /> },
];

interface Exam {
  id: number;
  title: string;
  course: string;
  totalQuestions: number;
  duration: number;
  status: string;
  examCode: string;
  type: "online" | "paper";
  description: string;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

const initialExams: Exam[] = [
  { 
    id: 1, 
    title: "Midterm Exam - Calculus I", 
    course: "Calculus I", 
    totalQuestions: 25, 
    duration: 60, 
    status: "Active",
    examCode: "EXAM-A1B2C3",
    type: "online",
    description: "Midterm examination covering chapters 1-5",
    easyCount: 10,
    mediumCount: 10,
    hardCount: 5
  },
  { 
    id: 2, 
    title: "Final Exam - Physics 101", 
    course: "Physics 101", 
    totalQuestions: 30, 
    duration: 90, 
    status: "Scheduled",
    examCode: "EXAM-D4E5F6",
    type: "online",
    description: "Comprehensive final exam",
    easyCount: 12,
    mediumCount: 12,
    hardCount: 6
  },
  { 
    id: 3, 
    title: "Quiz - Data Structures", 
    course: "Data Structures", 
    totalQuestions: 15, 
    duration: 30, 
    status: "Draft",
    examCode: "N/A",
    type: "paper",
    description: "Weekly quiz on trees and graphs",
    easyCount: 5,
    mediumCount: 7,
    hardCount: 3
  }
];

export default function TeacherExams() {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportingExam, setExportingExam] = useState<Exam | null>(null);
  const [newExam, setNewExam] = useState({
    title: "",
    course: "",
    type: "online" as "online" | "paper",
    easyQuestions: 10,
    mediumQuestions: 10,
    hardQuestions: 5,
    duration: 60,
    description: ""
  });

  const generateExamCode = () => {
    const prefix = "EXAM";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${random}`;
  };

  const handleCreateExam = () => {
    if (newExam.title && newExam.course) {
      const totalQuestions = newExam.easyQuestions + newExam.mediumQuestions + newExam.hardQuestions;
      
      if (editingExam) {
        setExams(exams.map(e => e.id === editingExam.id ? {
          ...e,
          title: newExam.title,
          course: newExam.course,
          type: newExam.type,
          description: newExam.description,
          totalQuestions,
          duration: newExam.duration,
          easyCount: newExam.easyQuestions,
          mediumCount: newExam.mediumQuestions,
          hardCount: newExam.hardQuestions,
          examCode: newExam.type === "online" ? (e.examCode || generateExamCode()) : "N/A"
        } : e));
      } else {
        const examCode = newExam.type === "online" ? generateExamCode() : "N/A";
        setExams([...exams, {
          id: Date.now(),
          title: newExam.title,
          course: newExam.course,
          type: newExam.type,
          description: newExam.description,
          totalQuestions,
          duration: newExam.duration,
          status: "Draft",
          examCode,
          easyCount: newExam.easyQuestions,
          mediumCount: newExam.mediumQuestions,
          hardCount: newExam.hardQuestions
        }]);
      }
      resetForm();
    }
  };

  const handleEditExam = (exam: Exam) => {
    setEditingExam(exam);
    setNewExam({
      title: exam.title,
      course: exam.course,
      type: exam.type,
      easyQuestions: exam.easyCount,
      mediumQuestions: exam.mediumCount,
      hardQuestions: exam.hardCount,
      duration: exam.duration,
      description: exam.description || ""
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setNewExam({ title: "", course: "", type: "online" as "online" | "paper", easyQuestions: 10, mediumQuestions: 10, hardQuestions: 5, duration: 60, description: "" });
    setEditingExam(null);
    setIsDialogOpen(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Exam code ${code} copied to clipboard!`);
  };

  const handleDeleteExam = (id: number) => {
    if (confirm("Are you sure you want to delete this exam?")) {
      setExams(exams.filter(e => e.id !== id));
    }
  };

  const handleExport = (config: ExportConfig) => {
    if (!exportingExam) return;
    
    // In real app, this would generate the file with selected format and layout
    alert(`Exporting "${exportingExam.title}" as ${config.format.toUpperCase()} with ${config.columns} column layout`);
    console.log('Export config:', config);
  };

  const getStatusColor = (status: string) => {
    if (status === "Active") return "bg-[#10B981]/10 text-[#10B981]";
    if (status === "Draft") return "bg-muted text-muted-foreground";
    return "bg-primary/10 text-primary";
  };

  const getTotalQuestions = (exam: Exam) => {
    return exam.totalQuestions;
  };

  return (
    <DashboardLayout navItems={navItems} role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Exams</h2>
            <p className="text-muted-foreground mt-1">Create and manage your exams</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingExam ? "Edit Exam" : "Generate New Exam"}</DialogTitle>
                <DialogDescription>Configure exam settings and question distribution</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="examTitle">Exam Title</Label>
                  <Input
                    id="examTitle"
                    placeholder="e.g., Mathematics Final Exam"
                    value={newExam.title}
                    onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examCourse">Course</Label>
                  <Select value={newExam.course} onValueChange={(value) => setNewExam({ ...newExam, course: value })}>
                    <SelectTrigger className="bg-input-background">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Calculus I">Calculus I</SelectItem>
                      <SelectItem value="Physics 101">Physics 101</SelectItem>
                      <SelectItem value="Data Structures">Data Structures</SelectItem>
                      <SelectItem value="Linear Algebra">Linear Algebra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the exam"
                    value={newExam.description}
                    onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                    className="bg-input-background"
                  />
                </div>

                {/* Exam Type Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Exam Type</Label>
                  <RadioGroup value={newExam.type} onValueChange={(value: "online" | "paper") => setNewExam({ ...newExam, type: value })}>
                    <div className="grid grid-cols-2 gap-4">
                      <div onClick={() => setNewExam({ ...newExam, type: "online" })}>
                        <Card className={`cursor-pointer transition-all ${newExam.type === "online" ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/50"}`}>
                          <CardContent className="pt-6 pb-6">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="online" id="type-online" className="border-primary" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Monitor className="w-5 h-5 text-primary" />
                                  <span className="font-semibold text-foreground">Online Exam</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Students take exam online with code
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div onClick={() => setNewExam({ ...newExam, type: "paper" })}>
                        <Card className={`cursor-pointer transition-all ${newExam.type === "paper" ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/50"}`}>
                          <CardContent className="pt-6 pb-6">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="paper" id="type-paper" className="border-primary" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <FileSpreadsheet className="w-5 h-5 text-primary" />
                                  <span className="font-semibold text-foreground">Paper Exam</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Export to file for printing
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </RadioGroup>
                  {newExam.type === "paper" && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm text-amber-700">
                      <p>Paper exams will not generate an exam code. You can export the exam to PDF or DOCX.</p>
                    </div>
                  )}
                </div>
                
                <div className="border border-border rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold text-foreground">Question Distribution by Difficulty</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="easyQuestions" className="text-[#10B981]">Easy Questions</Label>
                      <Input
                        id="easyQuestions"
                        type="number"
                        min="0"
                        value={newExam.easyQuestions}
                        onChange={(e) => setNewExam({ ...newExam, easyQuestions: parseInt(e.target.value) || 0 })}
                        className="bg-input-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mediumQuestions" className="text-primary">Medium Questions</Label>
                      <Input
                        id="mediumQuestions"
                        type="number"
                        min="0"
                        value={newExam.mediumQuestions}
                        onChange={(e) => setNewExam({ ...newExam, mediumQuestions: parseInt(e.target.value) || 0 })}
                        className="bg-input-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hardQuestions" className="text-[#EF4444]">Hard Questions</Label>
                      <Input
                        id="hardQuestions"
                        type="number"
                        min="0"
                        value={newExam.hardQuestions}
                        onChange={(e) => setNewExam({ ...newExam, hardQuestions: parseInt(e.target.value) || 0 })}
                        className="bg-input-background"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground bg-accent/50 p-3 rounded">
                    Total Questions: <span className="font-semibold text-foreground">
                      {newExam.easyQuestions + newExam.mediumQuestions + newExam.hardQuestions}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={newExam.duration}
                    onChange={(e) => setNewExam({ ...newExam, duration: parseInt(e.target.value) || 60 })}
                    className="bg-input-background"
                  />
                </div>
                <Button onClick={handleCreateExam} className="w-full bg-primary hover:bg-primary/90">
                  {editingExam ? "Update Exam" : "Generate Exam"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {exams.map((exam) => (
            <Card key={exam.id} className="shadow-sm border-border hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl text-foreground">{exam.title}</CardTitle>
                      <Badge variant="outline" className={exam.type === "online" ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground"}>
                        {exam.type === "online" ? <Monitor className="w-3 h-3 mr-1" /> : <FileSpreadsheet className="w-3 h-3 mr-1" />}
                        {exam.type === "online" ? "Online" : "Paper"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{exam.course}</p>
                    {exam.description && (
                      <p className="text-sm text-muted-foreground mt-1">{exam.description}</p>
                    )}
                  </div>
                  <Badge variant="secondary" className={`${getStatusColor(exam.status)} border-0`}>
                    {exam.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Exam Code - Only for Online Exams */}
                  {exam.type === "online" && (
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Exam Code</p>
                          <p className="text-lg font-mono font-bold text-primary">{exam.examCode}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCopyCode(exam.examCode)}
                          className="text-primary"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Question Distribution */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20">
                      <div className="text-xs text-[#10B981] font-medium">Easy</div>
                      <div className="text-2xl font-bold text-[#10B981]">{exam.easyCount}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-xs text-primary font-medium">Medium</div>
                      <div className="text-2xl font-bold text-primary">{exam.mediumCount}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20">
                      <div className="text-xs text-[#EF4444] font-medium">Hard</div>
                      <div className="text-2xl font-bold text-[#EF4444]">{exam.hardCount}</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg bg-accent/50">
                      <HelpCircle className="w-5 h-5 text-primary mb-1" />
                      <div className="text-lg font-semibold text-foreground">{getTotalQuestions(exam)}</div>
                      <div className="text-xs text-muted-foreground">Total Questions</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <Clock className="w-5 h-5 text-primary mb-1" />
                      <div className="text-lg font-semibold text-foreground">{exam.duration} min</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <ClipboardList className="w-5 h-5 text-primary mb-1" />
                      <div className="text-lg font-semibold text-foreground">0</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/50">
                      <TrendingUp className="w-5 h-5 text-primary mb-1" />
                      <div className="text-lg font-semibold text-foreground">
                        N/A
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Score</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditExam(exam)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setExportingExam(exam);
                        setExportDialogOpen(true);
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteExam(exam.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Export Configuration Dialog */}
        {exportingExam && (
          <ExportConfigDialog
            open={exportDialogOpen}
            onOpenChange={setExportDialogOpen}
            examTitle={exportingExam.title}
            onExport={handleExport}
          />
        )}
      </div>
    </DashboardLayout>
  );
}