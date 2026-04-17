import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ChevronRight, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export default function RouteSelection() {
  const navigate = useNavigate();

  const routes = [
    { id: 'L24', name: 'Mutamba — Kilamba', dist: '28 km', time: '45 min', active: true },
    { id: 'L09', name: 'Aeroporto — Ilha', dist: '14 km', time: '22 min' },
    { id: 'L31', name: 'Viana — Talatona', dist: '32 km', time: '55 min' },
    { id: 'L15', name: 'Cacuaco — Samba', dist: '19 km', time: '30 min' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="relative min-h-screen w-full bg-bg-light p-6 pt-24"
    >
      <header className="fixed top-0 left-0 w-full z-50 glass px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-all outline-none">
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-xl font-black text-primary tracking-tighter">Select Route</h1>
      </header>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-text-dark tracking-tighter">Rotas Ativas</h2>
        <p className="text-text-muted font-medium text-sm">Escolha o seu trajeto de trânsito hoje.</p>
      </div>

      {/* Routes List */}
      <div className="grid gap-2 border-t border-black/5">
        {[
          { id: '1', name: 'Viana - Mutamba', buses: '6 Autocarros', tag: 'POPULAR', color: 'bg-accent-yellow' },
          { id: '2', name: 'Benfica - Talatona', buses: '2 Autocarros', tag: 'RÁPIDO', color: 'bg-secondary', textColor: 'text-white' },
          { id: '3', name: 'Cazenga - Porto', buses: '10 Autocarros', tag: 'NORMAL', color: 'bg-gray-100' },
          { id: '4', name: 'Cacuaco - Golf', buses: '3 Autocarros', tag: 'CHEIO', color: 'bg-accent-red', textColor: 'text-white' },
        ].map((route) => (
          <motion.button
            key={route.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/driver-dashboard')}
            className="w-full text-left bg-white p-4 border-b border-black/5 flex items-center justify-between hover:bg-gray-50 transition-all"
          >
            <div>
              <h3 className="text-base font-bold text-text-dark">{route.name}</h3>
              <p className="text-xs font-medium text-text-muted">{route.buses}</p>
            </div>
            
            <div className={cn(
              "px-2 py-1 rounded-md text-[10px] font-black tracking-widest uppercase",
              route.color,
              route.textColor || "text-text-dark"
            )}>
              {route.tag}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
