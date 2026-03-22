import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>
        <div>
          <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to="/login">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
