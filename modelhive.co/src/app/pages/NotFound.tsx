import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-br from-violet-500 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Home className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
