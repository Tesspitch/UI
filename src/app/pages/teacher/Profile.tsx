import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { BookOpen, FileText, HelpCircle, ClipboardList, TrendingUp, Mail, User as UserIcon, Phone, MapPin } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/teacher", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Subjects", path: "/teacher/subjects", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Courses", path: "/teacher/courses", icon: <ClipboardList className="w-5 h-5" /> },
  { label: "Question Bank", path: "/teacher/questions", icon: <HelpCircle className="w-5 h-5" /> },
  { label: "Exams", path: "/teacher/exams", icon: <FileText className="w-5 h-5" /> },
];

export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.teacher@zenseexam.com",
    phone: "+1 (555) 123-4567",
    department: "Mathematics & Computer Science",
    institution: "Tech University",
    bio: "Passionate educator with 10+ years of experience in mathematics and computer science education."
  });

  const handleSave = () => {
    setIsEditing(false);
    // In real app, this would save to backend
  };

  return (
    <DashboardLayout navItems={navItems} role="teacher">
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
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={profile.institution}
                  onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                  disabled={!isEditing}
                  className="bg-input-background"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </div>
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <div className="text-2xl font-bold text-primary">342</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="p-4 rounded-lg bg-accent/50 text-center">
                <div className="text-2xl font-bold text-primary">124</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
