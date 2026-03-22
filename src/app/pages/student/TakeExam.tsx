import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "../../components/ui/badge";

interface Choice {
  id: string;
  text: string;
  image?: string;
}

interface ExamQuestion {
  id: number;
  question: string;
  questionImage?: string;
  choices: Choice[];
  correctChoiceId: string;
  difficulty: string;
}

// Mock exam data
const mockExamData = {
  "EXAM-MTH-001": {
    title: "Mathematics Final Exam",
    course: "Calculus I",
    duration: 120,
    questions: [
      {
        id: 1,
        question: "What is the derivative of x²?",
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
        question: "What is the integral of 2x?",
        difficulty: "Easy",
        choices: [
          { id: "2a", text: "x² + C" },
          { id: "2b", text: "2x² + C" },
          { id: "2c", text: "x + C" },
          { id: "2d", text: "2 + C" }
        ],
        correctChoiceId: "2a"
      },
      {
        id: 3,
        question: "What is the limit of (x² - 1)/(x - 1) as x approaches 1?",
        difficulty: "Medium",
        choices: [
          { id: "3a", text: "0" },
          { id: "3b", text: "1" },
          { id: "3c", text: "2" },
          { id: "3d", text: "Undefined" }
        ],
        correctChoiceId: "3c"
      }
    ]
  }
};

export default function TakeExam() {
  const { examCode } = useParams<{ examCode: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(7200); // 120 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const exam = examCode ? mockExamData[examCode as keyof typeof mockExamData] : null;

  useEffect(() => {
    if (!exam) {
      navigate("/student/exams");
      return;
    }

    if (examStarted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted, exam, navigate]);

  if (!exam) {
    return null;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;
  const answeredCount = Object.keys(answers).length;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (choiceId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: choiceId });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    // Calculate score
    let correctAnswers = 0;
    exam.questions.forEach((q) => {
      if (answers[q.id] === q.correctChoiceId) {
        correctAnswers++;
      }
    });
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // In real app, this would save to backend
    alert(`Exam submitted! Your score: ${score}%`);
    navigate("/student/results");
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-[#10B981]/10 text-[#10B981]";
    if (difficulty === "Hard") return "bg-[#EF4444]/10 text-[#EF4444]";
    return "bg-primary/10 text-primary";
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-lg">
          <CardContent className="pt-8 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">{exam.title}</h1>
              <p className="text-muted-foreground mt-2">{exam.course}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </div>
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <div className="text-2xl font-bold text-foreground">{exam.duration} min</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20">
              <h4 className="font-semibold text-[#EF4444] mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Important Instructions
              </h4>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• Once you start, the timer will begin and cannot be paused</li>
                <li>• You can navigate between questions freely</li>
                <li>• Make sure to answer all questions before submitting</li>
                <li>• The exam will auto-submit when time runs out</li>
              </ul>
            </div>

            <Button 
              onClick={() => setExamStarted(true)} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
            >
              Start Exam
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{exam.title}</h2>
            <p className="text-sm text-muted-foreground">{exam.course}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Time Remaining</div>
              <div className={`text-xl font-mono font-bold ${timeRemaining < 300 ? 'text-destructive' : 'text-foreground'}`}>
                <Clock className="inline w-5 h-5 mr-1" />
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-4">Question Navigation</h3>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                  {exam.questions.map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`
                        w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors
                        ${currentQuestionIndex === index
                          ? 'bg-primary text-primary-foreground'
                          : answers[q.id]
                          ? 'bg-[#10B981] text-white'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Answered:</span>
                    <span className="font-semibold text-foreground">{answeredCount}/{totalQuestions}</span>
                  </div>
                  <Progress value={(answeredCount / totalQuestions) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-lg">
              <CardContent className="pt-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                      </span>
                      <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                        {currentQuestion.difficulty}
                      </Badge>
                      {answers[currentQuestion.id] && (
                        <Badge className="bg-[#10B981]/10 text-[#10B981]">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Answered
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {currentQuestion.question}
                    </h3>
                    {currentQuestion.questionImage && (
                      <img 
                        src={currentQuestion.questionImage} 
                        alt="Question" 
                        className="w-full max-h-64 object-contain rounded-lg border border-border mb-4" 
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {currentQuestion.choices.map((choice, index) => (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectAnswer(choice.id)}
                      className={`
                        w-full p-4 rounded-lg border-2 text-left transition-all
                        ${answers[currentQuestion.id] === choice.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                          ${answers[currentQuestion.id] === choice.id
                            ? 'border-primary bg-primary'
                            : 'border-border'
                          }
                        `}>
                          {answers[currentQuestion.id] === choice.id && (
                            <CheckCircle className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-muted-foreground">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <span className="text-foreground">{choice.text}</span>
                          </div>
                          {choice.image && (
                            <img 
                              src={choice.image} 
                              alt={`Choice ${index}`} 
                              className="w-full max-h-32 object-contain rounded mt-2 border border-border" 
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentQuestionIndex === totalQuestions - 1 ? (
                    <Button
                      onClick={() => setShowSubmitConfirm(true)}
                      className="bg-[#10B981] hover:bg-[#10B981]/90 text-white"
                    >
                      Submit Exam
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Confirmation Dialog */}
            {showSubmitConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="max-w-md w-full">
                  <CardContent className="pt-6 space-y-4">
                    <div className="text-center">
                      <AlertTriangle className="w-12 h-12 text-[#EF4444] mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Submit Exam?</h3>
                      <p className="text-muted-foreground">
                        You have answered {answeredCount} out of {totalQuestions} questions.
                      </p>
                      {answeredCount < totalQuestions && (
                        <p className="text-[#EF4444] text-sm mt-2">
                          You still have {totalQuestions - answeredCount} unanswered question(s).
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowSubmitConfirm(false)}
                        className="flex-1"
                      >
                        Review Answers
                      </Button>
                      <Button
                        onClick={handleSubmitExam}
                        className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90 text-white"
                      >
                        Yes, Submit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
