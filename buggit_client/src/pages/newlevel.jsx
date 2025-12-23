import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Bug, ArrowLeft, Save, Eye, Code } from "lucide-react";
import { toast } from "react-toastify";

export const LevelEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [title, setTitle] = useState(isNew ? "" : "XSS Basics");
  const [description, setDescription] = useState(
    isNew ? "" : "Find and exploit a basic XSS vulnerability"
  );
  const [order, setOrder] = useState(isNew ? "" : "1");

  const [challengeHtml, setChallengeHtml] = useState(isNew ? "" : `
<div style="padding:20px;font-family:monospace;">
  <h2 style="color:#00ff88;">Welcome to XSS Challenge</h2>
  <p style="color:#888;">Search for vulnerabilities below:</p>
  <br/>
  <form id="search-form">
    <input id="search-input" placeholder="Search..."
      style="padding:10px;width:300px;background:#1a1a2e;border:1px solid #00ff88;color:#00ff88;" />
    <button style="padding:10px 20px;background:#00ff88;border:none;margin-left:10px;">
      Search
    </button>
  </form>

  <div id="results" style="margin-top:20px;color:#ccc;"></div>

  <script>
    document.getElementById('search-form').addEventListener('submit', e => {
      e.preventDefault();
      const q = document.getElementById('search-input').value;
      document.getElementById('results').innerHTML = 'Results for: ' + q;

      if (q.includes('<script>') || q.includes('onerror')) {
        window.parent.postMessage({ type: 'BUG_FOUND' }, '*');
      }
    });
  </script>
</div>
`);

  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);

    setTimeout(() => {
      toast.success(isNew ? "Level created successfully" : "Level updated successfully");
      setIsSaving(false);
      navigate("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background sticky top-0">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <button className="p-2 hover:bg-muted rounded">
                <ArrowLeft />
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <Bug className="text-primary" />
              <span className="font-bold">
                {isNew ? "Create Level" : "Edit Level"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="border px-4 py-2 rounded flex items-center gap-2"
            >
              {showPreview ? <Code size={16} /> : <Eye size={16} />}
              {showPreview ? "Edit" : "Preview"}
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-6">
          <div className="border rounded p-4 space-y-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              className="w-24 p-2 border rounded"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </div>

          <textarea
            rows={20}
            className="w-full p-2 border rounded font-mono text-sm"
            value={challengeHtml}
            onChange={(e) => setChallengeHtml(e.target.value)}
          />
        </div>

        {/* Preview */}
        <div className="border rounded overflow-hidden">
          {challengeHtml ? (
            <iframe
              srcDoc={challengeHtml}
              title="Preview"
              className="w-full h-[500px]"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="h-[500px] flex items-center justify-center text-muted-foreground">
              No preview
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
