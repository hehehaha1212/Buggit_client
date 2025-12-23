import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Bug, ArrowLeft, AlertTriangle, Send } from "lucide-react";
// 1. Import toast from toastify
import { toast } from "react-toastify";

// Mock level data
const mockLevelContent = `
<div style="padding: 20px; font-family: monospace; background: #0a0a0f; min-height: 100vh; color: #fff;">
  <h2 style="color: #00ff88; text-transform: uppercase; letter-spacing: 2px;">Vulnerability Lab</h2>
  <p style="color: #888;">Target System: Search Module v1.0.4</p>
  <br/>
  <form id="search-form" style="display: flex; gap: 10px;">
    <input type="text" id="search-input" placeholder="Search system database..."
      style="padding:12px; flex-grow:1; background: #16161e; border: 1px solid #333; color: #00ff88; outline: none; font-family: monospace;" />
    <button type="submit"
      style="padding:10px 20px; background: #00ff88; color: #0a0a0f; border: none; cursor: pointer; font-weight: bold; font-family: monospace;">
      EXECUTE
    </button>
  </form>

  <div id="results" style="margin-top:30px; padding: 15px; border-left: 2px solid #333; color: #aaa;">
    Enter a query to begin.
  </div>

  <script>
    document.getElementById('search-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var query = document.getElementById('search-input').value;
      
      // VULNERABLE LINE: Directly inserting user input into the DOM
      document.getElementById('results').innerHTML = 'Query returned 0 results for: ' + query;

      // Detection logic for the training platform
      if (query.includes('<script>') || query.includes('onerror') || query.includes('alert(')) {
        window.parent.postMessage({ type: 'BUG_FOUND' }, '*');
      }
    });
  </script>
</div>
`;

const Level = () => {
  const { id } = useParams();
  const [bugFound, setBugFound] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "BUG_FOUND" && !bugFound) {
        setBugFound(true);
        // 2. Updated Toast usage
        toast.success("Vulnerability Detected! Security shield bypassed.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [bugFound]);

  const handleSubmitReport = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.info("Report Uploaded. Awaiting Admin verification.");
      setIsSubmitting(false);
      setReportTitle("");
      setReportDescription("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="fixed inset-0 scanline pointer-events-none z-50" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 sticky top-0 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <Bug className="h-6 w-6 text-primary neon-text" />
              <span className="font-bold font-mono tracking-tighter">MISSION_LOG: LEVEL_{id}</span>
            </div>
          </div>

          {bugFound && (
            <div className="flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/40 rounded-full animate-pulse">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <span className="text-accent text-xs font-bold font-mono uppercase">Vulnerability Exposed</span>
            </div>
          )}
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Challenge Area (The "Target") */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-mono uppercase">Live Environment</span>
          </div>
          <div className="relative p-1 bg-gradient-to-b from-border to-transparent rounded-lg">
            <iframe
              srcDoc={mockLevelContent}
              title={`Level ${id}`}
              className="w-full h-[550px] bg-[#0a0a0f] rounded shadow-2xl"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* Report Submission Area */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24 shadow-xl">
            <h2 className="font-display text-xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Exploit Report
            </h2>

            {!bugFound ? (
              <div className="py-12 px-4 text-center border border-dashed border-border rounded-lg bg-muted/20">
                <p className="text-muted-foreground text-sm font-mono leading-relaxed">
                  [SYSTEM_LOCKED] <br />
                  Identify a vulnerability in the target environment to enable reporting capabilities.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-muted-foreground uppercase">{">"} Bug Title</label>
                  <input
                    type="text"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="e.g. Reflected XSS in Search Bar"
                    required
                    className="w-full px-3 py-2 bg-input border border-border rounded text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono text-muted-foreground uppercase">{">"} Technical Details</label>
                  <textarea
                    rows={8}
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Describe the payload used and the impact..."
                    required
                    className="w-full px-3 py-2 bg-input border border-border rounded text-foreground focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-primary-foreground font-bold font-mono rounded hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(var(--primary),0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">TRANSMITTING...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      SUBMIT_REPORT
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Level;