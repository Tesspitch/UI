import { useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { BookOpen, FileText, HelpCircle, ClipboardList, TrendingUp, Plus, Pencil, Trash2, Search, Image as ImageIcon, X, Check } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";

const navItems = [
  { label: "Dashboard", path: "/teacher", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Subjects", path: "/teacher/subjects", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Courses", path: "/teacher/courses", icon: <ClipboardList className="w-5 h-5" /> },
  { label: "Question Bank", path: "/teacher/questions", icon: <HelpCircle className="w-5 h-5" /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileText className="w-5 h-5" /> },
];

interface Choice {
  id: string;
  text: string;
  image?: string;
}

interface Question {
  id: number;
  question: string;
  questionImage?: string;
  course: string;
  difficulty: string;
  choices: Choice[];
  correctChoiceId: string;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "What is the derivative of x²?",
    course: "Calculus I",
    difficulty: "Easy",
    choices: [
      { id: "1a", text: "2x" },
      { id: "1b", text: "x" },
      { id: "1c", text: "x²" },
      { id: "1d", text: "2" }
    ],
    correctChoiceId: "1a"
  },
  {
    id: 2,
    question: "Which sorting algorithm has O(n log n) average time complexity?",
    course: "Data Structures",
    difficulty: "Medium",
    choices: [
      { id: "2a", text: "Bubble Sort" },
      { id: "2b", text: "Quick Sort" },
      { id: "2c", text: "Selection Sort" },
      { id: "2d", text: "Insertion Sort" }
    ],
    correctChoiceId: "2b"
  },
  {
    id: 3,
    question: "What is Newton's second law of motion?",
    course: "Physics 101",
    difficulty: "Easy",
    choices: [
      { id: "3a", text: "F = ma" },
      { id: "3b", text: "E = mc²" },
      { id: "3c", text: "V = IR" },
      { id: "3d", text: "PV = nRT" }
    ],
    correctChoiceId: "3a"
  },
];

export default function TeacherQuestions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [newQuestion, setNewQuestion] = useState<Omit<Question, 'id'>>({
    question: "",
    questionImage: "",
    course: "",
    difficulty: "Medium",
    choices: [
      { id: crypto.randomUUID(), text: "" },
      { id: crypto.randomUUID(), text: "" }
    ],
    correctChoiceId: ""
  });

  const handleAddChoice = () => {
    setNewQuestion({
      ...newQuestion,
      choices: [...newQuestion.choices, { id: crypto.randomUUID(), text: "" }]
    });
  };

  const handleRemoveChoice = (choiceId: string) => {
    if (newQuestion.choices.length <= 2) return; // Minimum 2 choices
    setNewQuestion({
      ...newQuestion,
      choices: newQuestion.choices.filter(c => c.id !== choiceId),
      correctChoiceId: newQuestion.correctChoiceId === choiceId ? "" : newQuestion.correctChoiceId
    });
  };

  const handleUpdateChoice = (choiceId: string, field: 'text' | 'image', value: string) => {
    setNewQuestion({
      ...newQuestion,
      choices: newQuestion.choices.map(c => 
        c.id === choiceId ? { ...c, [field]: value } : c
      )
    });
  };

  const handleAddQuestion = () => {
    if (newQuestion.question && newQuestion.course && newQuestion.correctChoiceId && 
        newQuestion.choices.every(c => c.text.trim())) {
      if (editingQuestion) {
        setQuestions(questions.map(q => q.id === editingQuestion.id ? { ...newQuestion, id: editingQuestion.id } : q));
      } else {
        setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
      }
      resetForm();
    }
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setNewQuestion({
      question: question.question,
      questionImage: question.questionImage,
      course: question.course,
      difficulty: question.difficulty,
      choices: question.choices,
      correctChoiceId: question.correctChoiceId
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setNewQuestion({
      question: "",
      questionImage: "",
      course: "",
      difficulty: "Medium",
      choices: [
        { id: crypto.randomUUID(), text: "" },
        { id: crypto.randomUUID(), text: "" }
      ],
      correctChoiceId: ""
    });
    setEditingQuestion(null);
    setIsDialogOpen(false);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" || q.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-[#10B981]/10 text-[#10B981]";
    if (difficulty === "Hard") return "bg-[#EF4444]/10 text-[#EF4444]";
    return "bg-primary/10 text-primary";
  };

  return (
    <DashboardLayout navItems={navItems} role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Question Bank</h2>
            <p className="text-muted-foreground mt-1">Manage your exam questions</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/teacher/bulk-questions")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Bulk Input
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</DialogTitle>
                  <DialogDescription>Create a new multiple-choice question with unlimited choices</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select value={newQuestion.course} onValueChange={(value) => setNewQuestion({ ...newQuestion, course: value })}>
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
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={newQuestion.difficulty} onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value })}>
                      <SelectTrigger className="bg-input-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question">Question Text</Label>
                    <Textarea
                      id="question"
                      placeholder="Enter your question"
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      className="bg-input-background min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questionImage">Question Image URL (optional)</Label>
                    <Input
                      id="questionImage"
                      placeholder="https://example.com/image.jpg"
                      value={newQuestion.questionImage || ""}
                      onChange={(e) => setNewQuestion({ ...newQuestion, questionImage: e.target.value })}
                      className="bg-input-background"
                    />
                    {newQuestion.questionImage && (
                      <img src={newQuestion.questionImage} alt="Question" className="w-full max-h-48 object-contain rounded-lg border border-border" />
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Answer Choices (Minimum 2)</Label>
                      <Button type="button" size="sm" onClick={handleAddChoice} variant="outline" className="text-primary">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Choice
                      </Button>
                    </div>
                    {newQuestion.choices.map((choice, index) => (
                      <Card key={choice.id} className="p-4 border-border">
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="flex items-center h-10">
                              <Checkbox
                                checked={newQuestion.correctChoiceId === choice.id}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNewQuestion({ ...newQuestion, correctChoiceId: choice.id });
                                  }
                                }}
                                className="border-primary data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981]"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <Input
                                placeholder={`Choice ${String.fromCharCode(65 + index)}`}
                                value={choice.text}
                                onChange={(e) => handleUpdateChoice(choice.id, 'text', e.target.value)}
                                className="bg-input-background"
                              />
                              <Input
                                placeholder="Image URL (optional)"
                                value={choice.image || ""}
                                onChange={(e) => handleUpdateChoice(choice.id, 'image', e.target.value)}
                                className="bg-input-background"
                              />
                              {choice.image && (
                                <img src={choice.image} alt={`Choice ${index}`} className="w-full max-h-32 object-contain rounded border border-border" />
                              )}
                            </div>
                            {newQuestion.choices.length > 2 && (
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveChoice(choice.id)}
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          {newQuestion.correctChoiceId === choice.id && (
                            <div className="flex items-center gap-2 text-sm text-[#10B981] pl-8">
                              <Check className="w-4 h-4" />
                              <span>Correct Answer</span>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleAddQuestion} 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={!newQuestion.question || !newQuestion.course || !newQuestion.correctChoiceId || !newQuestion.choices.every(c => c.text.trim())}
                  >
                    {editingQuestion ? "Update Question" : "Create Question"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <Select value={filterCourse} onValueChange={setFilterCourse}>
            <SelectTrigger className="w-48 bg-card">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="Calculus I">Calculus I</SelectItem>
              <SelectItem value="Physics 101">Physics 101</SelectItem>
              <SelectItem value="Data Structures">Data Structures</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <Card key={q.id} className="shadow-sm border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">{q.question}</h4>
                      {q.questionImage && (
                        <img src={q.questionImage} alt="Question" className="w-full max-h-48 object-contain rounded-lg border border-border mb-3" />
                      )}
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                          {q.course}
                        </Badge>
                        <Badge variant="secondary" className={`${getDifficultyColor(q.difficulty)} border-0`}>
                          {q.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">
                          {q.choices.length} choices
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10" onClick={() => handleEditQuestion(q)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setQuestions(questions.filter(question => question.id !== q.id))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                    {q.choices.map((choice, index) => (
                      <div
                        key={choice.id}
                        className={`p-3 rounded-md text-sm ${
                          choice.id === q.correctChoiceId
                            ? "bg-[#10B981]/10 text-[#10B981] font-medium border-2 border-[#10B981]"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {choice.id === q.correctChoiceId && <Check className="w-4 h-4" />}
                          <span>{String.fromCharCode(65 + index)}. {choice.text}</span>
                        </div>
                        {choice.image && (
                          <img src={choice.image} alt={`Choice ${index}`} className="w-full max-h-24 object-contain rounded mt-2" />
                        )}
                      </div>
                    ))}
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