import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bug, Terminal, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify'; 


const Login = () => {
  // Changed state names to match Team Name / Team Code logic
  const [name, setName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Updated API payload to send { name, teamCode }
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, { 
        name, 
        teamCode 
      });
      
      const data = response.data;
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('Access Granted. Welcome back, hunter.');

      // Check for admin or standard dashboard
      if (data.user && data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed: Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background cyber-grid flex items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 scanline pointer-events-none z-50" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden neon-border shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
            <Link to="/">
              <div className="w-3 h-3 rounded-full bg-destructive hover:bg-red-400 transition-colors" />
            </Link>
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="ml-4 text-sm text-muted-foreground font-mono">auth@buggit ~ login</span>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Link to="/" className="flex items-center gap-2">
                <Bug className="h-8 w-8 text-primary neon-text" />
                <span className="font-display text-2xl font-bold text-primary neon-text tracking-tighter">BUGGIT</span>
              </Link>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full mb-4">
                <Terminal className="h-3 w-3 text-primary" />
                <span className="text-[10px] text-primary font-mono uppercase tracking-widest">Team Authentication</span>
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">Access Terminal</h1>
              <p className="text-muted-foreground mt-2 text-sm font-mono tracking-tight">Sync team credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-foreground font-mono text-xs uppercase tracking-widest">
                  {'>'} Team Identity
                </label>
                <input 
                  id="name" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="TEAM_SHADOW_HUNTER" 
                  required 
                  className="w-full h-11 px-4 bg-input border border-border rounded text-foreground font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Team Code Field (Replaces Password) */}
              <div className="space-y-2">
                <label htmlFor="teamCode" className="block text-foreground font-mono text-xs uppercase tracking-widest">
                  {'>'} Access Code
                </label>
                <div className="relative">
                  <input 
                    id="teamCode" 
                    type={showPassword ? 'text' : 'password'} 
                    value={teamCode} 
                    onChange={(e) => setTeamCode(e.target.value)} 
                    placeholder="••••••••" 
                    required 
                    className="w-full h-11 px-4 bg-input border border-border rounded text-foreground font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all pr-12"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded font-mono font-bold tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)] hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] uppercase"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-pulse">Authenticating</span>
                    <span className="animate-bounce">...</span>
                  </span>
                ) : (
                  'Sync Team Session'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-xs font-mono">
                No team registered? <Link to="/signup" className="text-primary hover:underline font-bold">Initialize New Squad</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;