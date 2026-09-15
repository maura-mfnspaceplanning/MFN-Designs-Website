import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="font-serif text-8xl md:text-9xl mb-4 tracking-wider">404</h1>
      <div className="h-px w-24 bg-border mb-8" />
      <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase mb-8 text-foreground/80">Page Not Found</h2>
      <p className="text-foreground/50 font-light mb-12 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button 
          variant="outline" 
          size="lg"
          className="rounded-none border-border text-foreground hover:bg-foreground hover:text-background tracking-[0.2em] uppercase font-light px-8 py-6 text-xs transition-all duration-500"
        >
          Return Home
        </Button>
      </Link>
    </div>
  );
}
