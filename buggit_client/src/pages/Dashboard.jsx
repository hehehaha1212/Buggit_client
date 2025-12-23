import { useState } from "react";
import { Link } from "react-router-dom";
import { Bug, LogOut, Lock, Unlock, FileText, Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react";

// Mock data
const mockLevels = [
  { id: 1, title: "XSS Basics", description: "Find and exploit a basic XSS vulnerability", unlocked: true, completed: true },
  { id: 2, title: "SQL Injection 101", description: "Bypass authentication using SQL injection", unlocked: true, completed: false },
  { id: 3, title: "CSRF Attack", description: "Exploit cross-site request forgery", unlocked: false, completed: false },
  { id: 4, title: "Path Traversal", description: "Access restricted files through path manipulation", unlocked: false, completed: false },
  { id: 5, title: "Session Hijacking", description: "Steal and use another user's session", unlocked: false, completed: false },
];

const mockReports = [
  { id: 1, levelId: 1, title: "Reflected XSS in search", status: "approved" , date: "2024-01-15" },
  { id: 2, levelId: 2, title: "SQL injection in login", status: "pending" , date: "2024-01-18" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("levels");

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="fixed inset-0 scanline pointer-events-none z-50" />

      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bug className="h-8 w-8 text-primary neon-text" />
            <span className="font-display text-2xl font-bold text-primary neon-text">BUGGIT</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground font-mono text-sm hidden sm:block">hunter@buggit</span>
            <Link to="/">
              <button className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10">
                <LogOut className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Levels Unlocked" value="2/5" color="primary" />
          <StatCard label="Bugs Found" value="1" color="secondary" />
          <StatCard label="Pending Reports" value="1" color="accent" />
          <StatCard label="Hunter Rank" value="#42" color="primary" />
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("levels")}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "levels" 
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.5)]" 
                : "border border-primary/50 text-primary hover:bg-primary/10"
            }`}
          >
            <Unlock className="h-4 w-4 mr-2" />
            Levels
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "reports" 
                ? "bg-secondary text-secondary-foreground shadow-[0_0_15px_rgba(var(--secondary),0.5)]" 
                : "border border-secondary/50 text-secondary hover:bg-secondary/10"
            }`}
          >
            <FileText className="h-4 w-4 mr-2" />
            Bug Reports
          </button>
        </div>

        {activeTab === "levels" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLevels.map((level) => (
              <LevelCard key={level.id} level={level} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockReports.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No bug reports yet. Start hunting!</p>
              </div>
            ) : (
              mockReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, value, color }) => {
  const colorClasses = {
    primary: "border-primary/30 text-primary",
    secondary: "border-secondary/30 text-secondary",
    accent: "border-accent/30 text-accent",
  };

  return (
    <div className={`bg-card border ${colorClasses[color]} rounded-lg p-4`}>
      <p className="text-muted-foreground text-xs font-mono uppercase mb-1">{label}</p>
      <p className={`font-display text-2xl font-bold ${colorClasses[color]?.split(" ")[1]}`}>{value}</p>
    </div>
  );
};

const LevelCard = ({ level }) => {
  return (
    <div
      className={`bg-card border rounded-lg overflow-hidden transition-all duration-300 ${
        level.unlocked
          ? "border-primary/30 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] cursor-pointer"
          : "border-border opacity-60"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-muted-foreground">#{level.id}</span>
            {level.completed && <CheckCircle className="h-5 w-5 text-primary" />}
          </div>
          {level.unlocked ? (
            <Unlock className="h-5 w-5 text-primary" />
          ) : (
            <Lock className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">{level.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{level.description}</p>
        
        {level.unlocked ? (
          <Link to={`/level`}>
            <button className="w-full flex items-center justify-center px-4 py-2 rounded-md bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors font-medium">
              {level.completed ? "Replay Level" : "Start Challenge"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </Link>
        ) : (
          <button disabled className="w-full flex items-center justify-center px-4 py-2 rounded-md bg-muted text-muted-foreground border border-border cursor-not-allowed opacity-50 font-medium">
            <Lock className="h-4 w-4 mr-2" />
            Locked
          </button>
        )}
      </div>
    </div>
  );
};

const ReportCard = ({ report }) => {
  const statusConfig = {
    pending: { icon: Clock, color: "text-accent", bg: "bg-accent/10", label: "Pending" },
    approved: { icon: CheckCircle, color: "text-primary", bg: "bg-primary/10", label: "Approved" },
    rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Rejected" },
  };

  const status = statusConfig[report.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {/* Custom Badge Div */}
            <div className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-border text-muted-foreground">
              Level {report.levelId}
            </div>
            <span className="text-muted-foreground text-xs">{report.date}</span>
          </div>
          <h3 className="font-semibold text-foreground">{report.title}</h3>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${status.bg} ${status.color}`}>
          <StatusIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{status.label}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;