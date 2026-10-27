import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, Sparkles, Home } from 'lucide-react';

interface AdminLoginProps {
  onSuccess?: () => void;
  onGoHome?: () => void;
}

export default function AdminLogin({ onSuccess, onGoHome }: AdminLoginProps) {
  const { signIn, registerInitialAdmin } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegistering) {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        await registerInitialAdmin(email, password);
      } else {
        await signIn(email, password);
      }
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      if (msg.includes('user-not-found') || msg.includes('invalid-credential')) {
        setError('Invalid email or password. If this is your first time, click "Create Initial Admin".');
      } else if (msg.includes('email-already-in-use')) {
        setError('This email is already registered. Please sign in with your password.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to site button */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={onGoHome || (() => { window.location.href = '/'; })}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 py-2 px-4 rounded-full bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-red-600" />
          <span>Back to Portfolio</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-950/40 border border-red-600/30 mb-4 shadow-lg shadow-red-950/20">
            <Lock className="w-6 h-6 text-red-500" />
          </div>
          <span className="text-red-600 uppercase tracking-[0.35em] text-[11px] font-bold block mb-1">
            Vick Photography
          </span>
          <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-white">
            Client Admin Portal
          </h1>
          <p className="text-zinc-400 text-sm mt-2 font-light">
            Manage your gallery folders, replace website images, and curate your portfolio in real time.
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Mode switch */}
          <div className="flex bg-black/40 p-1 rounded-xl mb-6 border border-white/5">
            <button
              type="button"
              onClick={() => { setIsRegistering(false); setError(null); }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                !isRegistering
                  ? 'bg-red-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegistering(true); setError(null); }}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                isRegistering
                  ? 'bg-red-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              First Time Setup
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/30 text-red-200 text-xs leading-relaxed flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vickphotography.com"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {isRegistering && (
                <p className="text-[11px] text-zinc-500 mt-1.5">
                  Must be at least 6 characters. This will be your permanent admin password.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRegistering ? 'Create Admin Account' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-zinc-500 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>End-to-end Firebase security & encryption</span>
          </div>
        </div>

        {/* Helpful hint */}
        <div className="text-center mt-6 text-xs text-zinc-500 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>Changes made here take effect immediately on your live website.</span>
        </div>
      </div>
    </div>
  );
}
