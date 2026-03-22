import { useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { FileText, TrendingUp, Award, LogIn, AlertCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/student", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "My Exams", path: "/student/exams", icon: <FileText className="w-5 h-5" /> },
  { label: "Results", path: "/student/results", icon: <Award className="w-5 h-5" /> },
];

// Mock exam codes for demo
const validExamCodes = ["EXAM-MTH-001", "EXAM-PHY-002", "EXAM-CS-003"];

export default function JoinExam() {
  const navigate = useNavigate();
  const [examCode, setExamCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoinExam = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (validExamCodes.includes(examCode.toUpperCase())) {
        // Navigate to exam taking page with the code
        navigate(`/student/take-exam/${examCode.toUpperCase()}`);
      } else {
        setError("Invalid exam code. Please check and try again.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <DashboardLayout navItems={navItems} role="student">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground">Join Exam Room</h2>
          <p className="text-muted-foreground mt-2">Enter the exam code provided by your teacher</p>
        </div>

        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <LogIn className="w-6 h-6 text-primary" />
              Enter Exam Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinExam} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="examCode">Exam Code</Label>
                <Input
                  id="examCode"
                  placeholder="e.g., EXAM-MTH-001"
                  value={examCode}
                  onChange={(e) => {
                    setExamCode(e.target.value.toUpperCase());
                    setError("");
                  }}
                  className="bg-input-background text-center text-2xl font-mono tracking-wider"
                  required
                />
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Error</p>
                    <p className="text-sm text-destructive/80">{error}</p>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading || !examCode}
              >
                {loading ? "Validating..." : "Join Exam Room"}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-accent/50 border border-border">
              <h4 className="font-semibold text-foreground mb-2">Demo Exam Codes:</h4>
              <div className="space-y-1 text-sm">
                {validExamCodes.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setExamCode(code)}
                    className="block font-mono text-primary hover:underline"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="font-semibold text-foreground mb-3">Instructions:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Get the exam code from your teacher</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Enter the code in the field above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Once validated, you'll enter the exam room</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>Make sure you're ready before starting - the timer cannot be paused</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
