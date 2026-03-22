import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { FileText, TrendingUp, Award, User as UserIcon, BookOpen, CheckCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/student", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "My Exams", path: "/student/exams", icon: <FileText className="w-5 h-5" /> },
  { label: "Results", path: "/student/results", icon: <Award className="w-5 h-5" /> },
];

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.student@zenseexam.com",
    phone: "+1 (555) 987-6543",
    studentId: "STU-2024-0123",
    major: "Computer Science",
    yearLevel: "Junior"
  });

  const handleSave = () => {
    setIsEditing(false);
    // In real app, this would save to backend
  };

  return (
    <DashboardLayout navItems={navItems} role="student">
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Profile Settings</h2>
          <p className="text-muted-foreground mt-1">Manage your account information</p>
        </div>

        <Card className="shadow-sm border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-foreground">Personal Information</CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={profile.studentId}
                  disabled
                  className="bg-input-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input
                  id="major"
                  value={profile.major}
                  onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearLevel">Year Level</Label>
                <Input
                  id="yearLevel"
                  value={profile.yearLevel}
                  onChange={(e) => setProfile({ ...profile, yearLevel: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">6</div>
                <div className="text-sm text-muted-foreground">Enrolled Courses</div>
              </div>
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <CheckCircle className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Completed Exams</div>
              </div>
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <TrendingUp className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">85%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
