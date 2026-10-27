import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPortal({ onGoHome }: { onGoHome?: () => void }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070707] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-full border-2 border-red-600/20 border-t-red-600 animate-spin mb-4" />
        <p className="text-zinc-500 font-serif text-sm tracking-widest uppercase">
          Authenticating Vick Photography Admin...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onGoHome={onGoHome} />;
  }

  return <AdminDashboard onGoHome={onGoHome} />;
}
