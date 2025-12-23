import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bug, LogOut, Users, Layers, FileText, 
  Plus, Edit, Trash2, Eye, CheckCircle, XCircle, Clock,
  ChevronRight
} from "lucide-react";
import { toast } from "react-toastify";

// Mock data
const mockLevels = [
  { id: 1, title: "XSS Basics", order: 1, studentCount: 45 },
  { id: 2, title: "SQL Injection 101", order: 2, studentCount: 32 },
  { id: 3, title: "CSRF Attack", order: 3, studentCount: 18 },
];

const mockStudents = [
  { id: 1, name: "John Doe", email: "john@example.com", unlockedLevels: 2, reportsCount: 3 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", unlockedLevels: 3, reportsCount: 5 },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", unlockedLevels: 1, reportsCount: 1 },
];

const mockReports = [
  { id: 1, student: "John Doe", level: "XSS Basics", title: "Reflected XSS in search", status: "pending", date: "2024-01-18" },
  { id: 2, student: "Jane Smith", level: "SQL Injection", title: "Auth bypass via SQL", status: "pending", date: "2024-01-17" },
  { id: 3, student: "Bob Wilson", level: "XSS Basics", title: "DOM-based XSS", status: "approved", date: "2024-01-15" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("reports");

  const handleApprove = (reportId) => {
    toast.success("Report Approved: Student granted level access.");
  };

  const handleReject = (reportId) => {
    toast.warn("Report Rejected: Student remains on current level.");
  };

  return (
    <div className="min-h-screen bg-background cyber-grid flex">
      <div className="fixed inset-0 scanline pointer-events-none z-50" />

      {/* Sidebar */}
      <aside className="relative z-10 w-64 bg-card border-r border-border flex-shrink-0 flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <Bug className="h-8 w-8 text-primary neon-text" />
            <span className="font-display text-xl font-bold text-primary neon-text">BUGGIT</span>
          </Link>
          <p className="text-xs text-muted-foreground font-mono mt-1">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <SidebarButton
            icon={<FileText className="h-5 w-5" />}
            label="Bug Reports"
            active={activeTab === "reports"}
            onClick={() => setActiveTab("reports")}
            badge={mockReports.filter(r => r.status === "pending").length}
          />
          <SidebarButton
            icon={<Layers className="h-5 w-5" />}
            label="Levels"
            active={activeTab === "levels"}
            onClick={() => setActiveTab("levels")}
          />
          <SidebarButton
            icon={<Users className="h-5 w-5" />}
            label="Students"
            active={activeTab === "students"}
            onClick={() => setActiveTab("students")}
          />
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-mono">admin@buggit</span>
            <Link to="/">
              <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "reports" && (
            <ReportsTab reports={mockReports} onApprove={handleApprove} onReject={handleReject} />
          )}
          {activeTab === "levels" && (
            <LevelsTab levels={mockLevels} />
          )}
          {activeTab === "students" && (
            <StudentsTab students={mockStudents} />
          )}
        </div>
      </main>
    </div>
  );
};

/* Internal Component: SidebarButton */
const SidebarButton = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
      active 
        ? "bg-primary/20 text-primary border border-primary/30" 
        : "text-muted-foreground hover:bg-muted/50"
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </div>
    {badge !== undefined && badge > 0 && (
      <span className="px-2 py-0.5 text-[10px] font-bold bg-accent text-accent-foreground rounded-full">
        {badge}
      </span>
    )}
  </button>
);

/* Internal Component: ReportsTab */
const ReportsTab = ({ reports, onApprove, onReject }) => {
  const statusConfig = {
    pending: { icon: Clock, color: "text-accent", bg: "bg-accent/10" },
    approved: { icon: CheckCircle, color: "text-primary", bg: "bg-primary/10" },
    rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">Bug Reports</h1>
        <div className="px-3 py-1 text-xs font-mono border border-accent/30 text-accent rounded-full">
          {reports.filter(r => r.status === "pending").length} PENDING REVIEW
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-x-auto shadow-2xl">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Student</th>
              <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Level</th>
              <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Report</th>
              <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Status</th>
              <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const status = statusConfig[report.status];
              const StatusIcon = status.icon;
              return (
                <tr key={report.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-foreground font-medium">{report.student}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 text-[10px] border border-primary/30 text-primary rounded font-mono uppercase">
                      {report.level}
                    </span>
                  </td>
                  <td className="p-4 text-foreground/80">{report.title}</td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span className="text-[10px] font-bold uppercase">{report.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {report.status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onApprove(report.id)}
                          className="px-3 py-1 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 rounded text-xs font-bold transition-all"
                        >
                          APPROVE
                        </button>
                        <button
                          onClick={() => onReject(report.id)}
                          className="px-3 py-1 border border-destructive/30 text-destructive hover:bg-destructive/10 rounded text-xs font-bold transition-all"
                        >
                          REJECT
                        </button>
                      </div>
                    ) : (
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs uppercase font-mono tracking-tighter">
                        <Eye className="h-3 w-3" /> View
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//* Internal Component: LevelsTab */
const LevelsTab = ({ levels }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">System Levels</h1>
      <Link to="/new">
        <button className="flex items-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded text-sm font-bold font-mono shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all">
          <Plus className="h-4 w-4 mr-2" />
          CREATE LEVEL
        </button>
      </Link>
    </div>

    <div className="grid gap-4">
      {levels.map((level) => (
        <div key={level.id} className="bg-card border border-border rounded-lg p-5 flex items-center justify-between hover:border-primary/30 transition-all hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-display font-bold text-primary">
              {level.order}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{level.title}</h3>
              <p className="text-xs text-muted-foreground font-mono">{level.studentCount} HUNTERS REACHED</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* UPDATED: Link now points to /new. 
                Tip: You can pass state so the /new page knows it's editing. */}
            <Link to="/new" state={{ editMode: true, levelId: level.id }}>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Edit className="h-4 w-4" />
              </button>
            </Link>
            <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
/* Internal Component: StudentsTab */
const StudentsTab = ({ students }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">Active Hunters</h1>
      <div className="px-3 py-1 text-xs font-mono border border-border text-muted-foreground rounded-full italic">
        {students.length} ENROLLED
      </div>
    </div>

    <div className="bg-card border border-border rounded-lg overflow-x-auto shadow-2xl">
      <table className="w-full text-sm">
        <thead className="bg-muted border-b border-border">
          <tr>
            <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Student</th>
            <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Email</th>
            <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Progress</th>
            <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Reports</th>
            <th className="text-left p-4 font-mono text-muted-foreground uppercase text-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <td className="p-4 text-foreground font-medium">{student.name}</td>
              <td className="p-4 text-muted-foreground font-mono">{student.email}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                      style={{ width: `${(student.unlockedLevels / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold">{student.unlockedLevels}/5</span>
                </div>
              </td>
              <td className="p-4 text-muted-foreground font-mono">{student.reportsCount}</td>
              <td className="p-4">
                <Link to={`/admin/students/${student.id}`}>
                  <button className="flex items-center gap-1 border border-primary/30 text-primary hover:bg-primary/10 px-3 py-1 rounded text-[10px] font-bold uppercase transition-all">
                    Manage <ChevronRight className="h-3 w-3" />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminDashboard;