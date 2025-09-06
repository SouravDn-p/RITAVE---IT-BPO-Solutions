import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-accent/10">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. It might have
              been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="cursor-pointer">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
