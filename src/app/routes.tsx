import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherSubjects from "./pages/teacher/Subjects";
import TeacherCourses from "./pages/teacher/Courses";
import TeacherQuestions from "./pages/teacher/Questions";
import BulkQuestions from "./pages/teacher/BulkQuestions";
import TeacherExams from "./pages/teacher/Exams";
import TeacherProfile from "./pages/teacher/Profile";
import StudentDashboard from "./pages/student/Dashboard";
import StudentExams from "./pages/student/Exams";
import StudentResults from "./pages/student/Results";
import StudentProfile from "./pages/student/Profile";
import JoinExam from "./pages/student/JoinExam";
import TakeExam from "./pages/student/TakeExam";
import PracticeExam from "./pages/student/PracticeExam";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/teacher",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/subjects",
    Component: TeacherSubjects,
  },
  {
    path: "/teacher/courses",
    Component: TeacherCourses,
  },
  {
    path: "/teacher/questions",
    Component: TeacherQuestions,
  },
  {
    path: "/teacher/bulk-questions",
    Component: BulkQuestions,
  },
  {
    path: "/teacher/exams",
    Component: TeacherExams,
  },
  {
    path: "/teacher/profile",
    Component: TeacherProfile,
  },
  {
    path: "/student",
    Component: StudentDashboard,
  },
  {
    path: "/student/exams",
    Component: StudentExams,
  },
  {
    path: "/student/results",
    Component: StudentResults,
  },
  {
    path: "/student/profile",
    Component: StudentProfile,
  },
  {
    path: "/student/join-exam",
    Component: JoinExam,
  },
  {
    path: "/student/take-exam/:examCode",
    Component: TakeExam,
  },
  {
    path: "/student/practice",
    Component: PracticeExam,
  },
  {
    path: "/student/take-practice/:courseId",
    Component: TakeExam,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);