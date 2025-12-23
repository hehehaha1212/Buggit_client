import { Link } from "react-router-dom";
import { Bug, Shield, Terminal, Trophy, ChevronRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-50" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bug className="h-8 w-8 text-primary neon-text" />
            <span className="font-display text-2xl font-bold text-primary neon-text">BUGGIT</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <button className="px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-colors rounded-md font-medium">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-md font-medium shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                Sign Up
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-mono uppercase tracking-wider">Bug Bounty Training Platform</span>
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Find the </span>
              <span className="text-primary neon-text glitch">BUGS</span>
              <br />
              <span className="text-foreground">Break the </span>
              <span className="text-secondary neon-text-purple">CODE</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Master vulnerability discovery through hands-on challenges. 
              Exploit real-world scenarios and level up your security skills.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <button className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-lg px-8 py-4 rounded-md font-bold shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                  Start Hunting
                  <ChevronRight className="h-5 w-5" />
                </button>
              </Link>
              <Link to="/login">
                <button className="px-8 py-4 border border-primary/50 text-primary hover:bg-primary/10 transition-all text-lg rounded-md font-bold">
                  Continue Mission
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10" />}
              title="Real Vulnerabilities"
              description="Practice on actual security flaws in controlled environments"
              color="primary"
            />
            <FeatureCard
              icon={<Terminal className="h-10 w-10" />}
              title="Progressive Levels"
              description="Advance through increasingly challenging security puzzles"
              color="secondary"
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10" />}
              title="Track Progress"
              description="Monitor your growth and compete with fellow hunters"
              color="accent"
            />
          </div>
        </section>

        {/* Terminal Preview */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-lg overflow-hidden relative group">
              {/* Outer neon border effect */}
              <div className="absolute inset-0 border border-primary/20 group-hover:border-primary/50 transition-colors pointer-events-none rounded-lg" />
              
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="ml-4 text-sm text-muted-foreground font-mono">terminal@buggit</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <p className="text-muted-foreground">$ ./start_hunt.sh</p>
                <p className="text-primary mt-2">[+] Initializing vulnerability scanner...</p>
                <p className="text-primary">[+] Loading challenge environment...</p>
                <p className="text-accent mt-2">[!] Target acquired: Level 1 - XSS Basics</p>
                <p className="text-foreground mt-2">{'>'} Ready to hunt. Find the bug. Report. Level up.</p>
                <span className="inline-block w-2 h-4 bg-primary animate-flicker ml-1" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-mono text-sm">© 2025 BUGGIT // All systems monitored</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color = "primary"
}) => {
  const colorClasses = {
    primary: "text-primary border-primary/30 bg-primary/5 hover:shadow-[0_0_15px_rgba(var(--primary),0.1)]",
    secondary: "text-secondary border-secondary/30 bg-secondary/5 hover:shadow-[0_0_15px_rgba(var(--secondary),0.1)]",
    accent: "text-accent border-accent/30 bg-accent/5 hover:shadow-[0_0_15px_rgba(var(--accent),0.1)]",
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]} backdrop-blur-sm transition-all duration-300 hover:scale-105 group`}>
      <div className={`mb-4 transition-transform group-hover:scale-110 duration-300 ${color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-accent"}`}>
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold mb-2 text-foreground uppercase tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default Landing;