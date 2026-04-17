import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Square, Plus, Minus, Settings, MapPin, Gauge } from 'lucide-react';

export default function DriverDashboard() {
  const [passengers, setPassengers] = useState(14);
  const [status, setStatus] = useState<'idle' | 'driving'>('idle');
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-text-dark p-6 pt-24 pb-32 text-white"
    >
      {/* Driver Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-text-dark/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20">
            <img src="https://picsum.photos/seed/driver-dash/100/100" alt="Avatar" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter">Wawa Driver</h1>
        </div>
        <button onClick={() => navigate('/route-selection')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5">
          <Settings className="w-5 h-5 text-white/40" />
        </button>
      </header>

      {/* Current Status Header - Minimal Labels per Theme HTML */}
      <div className="text-center my-10">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-text-muted">Modo Motorista</span>
        <div className="text-6xl font-black mt-2 tabular-nums">{passengers}</div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-text-muted">Passageiros a bordo</span>
      </div>

      {/* Counter Grid per Theme HTML */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setPassengers(Math.max(0, passengers - 1))}
          className="h-28 rounded-2xl bg-[#333] border-2 border-[#444] flex items-center justify-center shadow-lg active:bg-[#444] transition-colors"
        >
          <Minus className="w-10 h-10 stroke-[3]" />
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setPassengers(passengers + 1)}
          className="h-28 rounded-2xl bg-secondary border-2 border-secondary-dark flex items-center justify-center shadow-[0_4px_0_#27ae60] active:translate-y-1 active:shadow-none transition-all"
        >
          <Plus className="w-10 h-10 stroke-[3]" />
        </motion.button>
      </div>

      {/* Spacer for Theme Layout */}
      <div className="grow flex flex-col justify-end gap-6 mt-20">
        {status === 'idle' ? (
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setStatus('driving')}
            className="chunky-btn-secondary w-full py-8 rounded-2xl flex flex-col items-center gap-2"
          >
            <span className="text-2xl font-black uppercase tracking-tighter">INICIAR ROTA</span>
          </motion.button>
        ) : (
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setStatus('idle')}
            className="chunky-btn-danger w-full py-8 rounded-2xl flex flex-col items-center gap-2"
          >
            <span className="text-2xl font-black uppercase tracking-tighter">TERMINAR ROTA</span>
          </motion.button>
        )}
      </div>

      {/* Stats Summary - Stylized for Dark Mode */}
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Ganhos de Hoje</p>
          <p className="text-lg font-black text-secondary">Kz 14.200</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Tempo de Viagem</p>
          <p className="text-lg font-black text-primary">04h 12m</p>
        </div>
      </div>
    </motion.div>
  );
}
