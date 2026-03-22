import { useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { BookOpen, FileText, HelpCircle, ClipboardList, TrendingUp, Plus, X, Check, Save, Trash2 } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { Badge } from "../../components/ui/badge";

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

interface QuestionBlock {
  id: string;
  question: string;
  questionImage?: string;
  course: string;
  difficulty: string;
  choices: Choice[];
  correctChoiceId: string;
}

export default function BulkQuestions() {
  const navigate = useNavigate();
  const [questionBlocks, setQuestionBlocks] = useState<QuestionBlock[]>([
    {
      id: crypto.randomUUID(),
      question: "",
      questionImage: "",
      course: "",
      difficulty: "Medium",
      choices: [
        { id: crypto.randomUUID(), text: "" },
        { id: crypto.randomUUID(), text: "" }
      ],
      correctChoiceId: ""
    }
  ]);

  const handleAddQuestionBlock = () => {
    setQuestionBlocks([
      ...questionBlocks,
      {
        id: crypto.randomUUID(),
        question: "",
        questionImage: "",
        course: "",
        difficulty: "Medium",
        choices: [
          { id: crypto.randomUUID(), text: "" },
          { id: crypto.randomUUID(), text: "" }
        ],
        correctChoiceId: ""
      }
    ]);
  };

  const handleRemoveQuestionBlock = (blockId: string) => {
    if (questionBlocks.length > 1) {
      setQuestionBlocks(questionBlocks.filter(block => block.id !== blockId));
    }
  };

  const handleUpdateQuestionBlock = (blockId: string, updates: Partial<QuestionBlock>) => {
    setQuestionBlocks(questionBlocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const handleAddChoice = (blockId: string) => {
    setQuestionBlocks(questionBlocks.map(block =>
      block.id === blockId
        ? { ...block, choices: [...block.choices, { id: crypto.randomUUID(), text: "" }] }
        : block
    ));
  };

  const handleRemoveChoice = (blockId: string, choiceId: string) => {
    setQuestionBlocks(questionBlocks.map(block => {
      if (block.id === blockId && block.choices.length > 2) {
        return {
          ...block,
          choices: block.choices.filter(c => c.id !== choiceId),
          correctChoiceId: block.correctChoiceId === choiceId ? "" : block.correctChoiceId
        };
      }
      return block;
    }));
  };

  const handleUpdateChoice = (blockId: string, choiceId: string, field: 'text' | 'image', value: string) => {
    setQuestionBlocks(questionBlocks.map(block =>
      block.id === blockId
        ? {
            ...block,
            choices: block.choices.map(c =>
              c.id === choiceId ? { ...c, [field]: value } : c
            )
          }
        : block
    ));
  };

  const handleSaveAllQuestions = () => {
    // Validate all questions
    const invalidBlocks = questionBlocks.filter(block =>
      !block.question || !block.course || !block.correctChoiceId ||
      !block.choices.every(c => c.text.trim())
    );

    if (invalidBlocks.length > 0) {
      alert(`Please complete all fields in ${invalidBlocks.length} question(s)`);
      return;
    }

    // In real app, this would save to backend
    alert(`Successfully saved ${questionBlocks.length} question(s)!`);
    navigate("/teacher/questions");
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-[#10B981]/10 text-[#10B981]";
    if (difficulty === "Hard") return "bg-[#EF4444]/10 text-[#EF4444]";
    return "bg-primary/10 text-primary";
  };

  const getCompletionStatus = (block: QuestionBlock) => {
    const hasQuestion = !!block.question;
    const hasCourse = !!block.course;
    const hasCorrectAnswer = !!block.correctChoiceId;
    const allChoicesFilled = block.choices.every(c => c.text.trim());
    
    return hasQuestion && hasCourse && hasCorrectAnswer && allChoicesFilled;
  };

  return (
    <DashboardLayout navItems={navItems} role="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Bulk Question Input</h2>
            <p className="text-muted-foreground mt-1">Add multiple questions in a single session</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/teacher/questions")}>
              Cancel
            </Button>
            <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white" onClick={handleSaveAllQuestions}>
              <Save className="w-4 h-4 mr-2" />
              Save All ({questionBlocks.length})
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-primary">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">{questionBlocks.length}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </CardContent>
          </Card>
          <Card className="border-[#10B981]">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#10B981]">
                {questionBlocks.filter(b => getCompletionStatus(b)).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-[#EF4444]">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#EF4444]">
                {questionBlocks.filter(b => !getCompletionStatus(b)).length}
              </div>
              <div className="text-sm text-muted-foreground">Incomplete</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-foreground">
                {questionBlocks.reduce((sum, b) => sum + b.choices.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Choices</div>
            </CardContent>
          </Card>
        </div>

        {/* Question Blocks */}
        <div className="space-y-6">
          {questionBlocks.map((block, blockIndex) => (
            <Card key={block.id} className={`shadow-lg ${getCompletionStatus(block) ? 'border-[#10B981]' : 'border-border'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {blockIndex + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground">Question {blockIndex + 1}</CardTitle>
                      {getCompletionStatus(block) ? (
                        <Badge className="bg-[#10B981]/10 text-[#10B981] mt-1">
                          <Check className="w-3 h-3 mr-1" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-muted text-muted-foreground mt-1">
                          Incomplete
                        </Badge>
                      )}
                    </div>
                  </div>
                  {questionBlocks.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveQuestionBlock(block.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Course</Label>
                    <Select
                      value={block.course}
                      onValueChange={(value) => handleUpdateQuestionBlock(block.id, { course: value })}
                    >
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
                    <Label>Difficulty Level</Label>
                    <Select
                      value={block.difficulty}
                      onValueChange={(value) => handleUpdateQuestionBlock(block.id, { difficulty: value })}
                    >
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
                </div>

                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Textarea
                    placeholder="Enter your question"
                    value={block.question}
                    onChange={(e) => handleUpdateQuestionBlock(block.id, { question: e.target.value })}
                    className="bg-input-background min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question Image URL (optional)</Label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={block.questionImage || ""}
                    onChange={(e) => handleUpdateQuestionBlock(block.id, { questionImage: e.target.value })}
                    className="bg-input-background"
                  />
                  {block.questionImage && (
                    <img
                      src={block.questionImage}
                      alt="Question"
                      className="w-full max-h-48 object-contain rounded-lg border border-border"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Answer Choices (Minimum 2)</Label>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleAddChoice(block.id)}
                      variant="outline"
                      className="text-primary"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Choice
                    </Button>
                  </div>
                  {block.choices.map((choice, choiceIndex) => (
                    <Card key={choice.id} className="p-4 border-border">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="flex items-center h-10">
                            <Checkbox
                              checked={block.correctChoiceId === choice.id}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleUpdateQuestionBlock(block.id, { correctChoiceId: choice.id });
                                }
                              }}
                              className="border-primary data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981]"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <Input
                              placeholder={`Choice ${String.fromCharCode(65 + choiceIndex)}`}
                              value={choice.text}
                              onChange={(e) => handleUpdateChoice(block.id, choice.id, 'text', e.target.value)}
                              className="bg-input-background"
                            />
                            <Input
                              placeholder="Image URL (optional)"
                              value={choice.image || ""}
                              onChange={(e) => handleUpdateChoice(block.id, choice.id, 'image', e.target.value)}
                              className="bg-input-background"
                            />
                            {choice.image && (
                              <img
                                src={choice.image}
                                alt={`Choice ${choiceIndex}`}
                                className="w-full max-h-32 object-contain rounded border border-border"
                              />
                            )}
                          </div>
                          {block.choices.length > 2 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveChoice(block.id, choice.id)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        {block.correctChoiceId === choice.id && (
                          <div className="flex items-center gap-2 text-sm text-[#10B981] pl-8">
                            <Check className="w-4 h-4" />
                            <span>Correct Answer</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Another Question Button */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer" onClick={handleAddQuestionBlock}>
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-foreground">Add Another Question</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Click to add a new question block
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 -mx-6 -mb-6 flex items-center justify-between shadow-lg">
          <div className="text-sm text-muted-foreground">
            {questionBlocks.filter(b => getCompletionStatus(b)).length} of {questionBlocks.length} questions completed
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/teacher/questions")}>
              Cancel
            </Button>
            <Button className="bg-[#10B981] hover:bg-[#10B981]/90 text-white" onClick={handleSaveAllQuestions}>
              <Save className="w-4 h-4 mr-2" />
              Save All Questions
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
