import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Map as MapIcon, Settings, User, Navigation, Users, Heart, Compass, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import IssueReportModal from '../components/IssueReportModal';

export default function PassengerHome() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full bg-bg-light flex flex-col"
    >
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden border-2 border-white">
            <img src="https://picsum.photos/seed/avatar5/100/100" alt="Avatar" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-xl font-black text-primary tracking-tighter">Wawa</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsReportOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-red/10 hover:bg-accent-red/20 transition-all group"
            title="Reportar Problema"
          >
            <AlertCircle className="w-5 h-5 text-accent-red group-hover:scale-110 transition-transform" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-all">
            <Settings className="w-5 h-5 text-primary" />
          </button>
        </div>
      </header>

      {/* Map Content */}
      <div className="absolute inset-0 z-0 bg-[#e0e0e0] overflow-hidden">
        {/* Simple Simulated Map Pattern */}
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1A5FB4" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
          {/* Main roads */}
          <path d="M 0 300 Q 400 350 800 300" stroke="#1A5FB4" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 200 0 V 800" stroke="#1A5FB4" strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>

        {/* Bus Pins */}
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute top-1/2 left-1/3 p-2 bg-primary rounded-[6px] shadow-lg border-2 border-white cursor-pointer"
          onClick={() => navigate('/bus-details')}
        >
          <span className="text-[10px] font-bold text-white leading-none">W</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-white" />
        </motion.div>

        <motion.div 
          animate={{ x: [0, -60, 0], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute top-1/3 right-1/4 p-2 bg-secondary rounded-[6px] shadow-lg border-2 border-white"
        >
          <span className="text-[10px] font-bold text-white leading-none">W</span>
        </motion.div>
      </div>

      {/* UI Overlays */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none p-6 pt-24 pb-32">
        {/* Search Bar */}
        <div className="pointer-events-auto w-full max-w-lg mx-auto mb-auto">
          <div className="bg-white rounded-xl shadow-xl flex items-center p-2 gap-3 h-10 border border-black/5">
            <div className="p-2">
              <Search className="w-4 h-4 text-primary" />
            </div>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Para onde vamos hoje?"
              className="bg-transparent border-none focus:ring-0 w-full text-xs font-medium text-text-dark placeholder:text-text-muted"
            />
          </div>
        </div>

        {/* Info Cards (Bento Style) */}
        <div className="pointer-events-auto grid grid-cols-2 gap-4 mb-4">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-4 shadow-sm space-y-2 cursor-pointer"
            onClick={() => navigate('/bus-details')}
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Próxima Parada</span>
            </div>
            <div className="text-sm font-black text-text-dark leading-tight">Largo da Independência</div>
            <p className="text-[11px] text-text-muted font-medium">Chegada em 4 min</p>
          </motion.div>

          <div className="glass rounded-2xl p-4 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Ocupação</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xl font-black text-accent-yellow">80%</div>
              <div className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse" />
            </div>
            <p className="text-[11px] text-text-muted font-medium">Quase Cheio</p>
          </div>
        </div>

        {/* Selected Bus Mini Card */}
        <div className="pointer-events-auto bg-white rounded-2xl p-6 shadow-2xl space-y-4 border border-black/5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-black text-primary tracking-tight">Viana Express</h2>
              <p className="text-xs font-bold text-text-muted">Linha 402 • Mateus Francisco</p>
            </div>
            <div className="bg-accent-yellow/10 px-3 py-1.5 rounded-lg border border-accent-yellow/20">
              <span className="text-[10px] font-extrabold text-accent-yellow uppercase tracking-widest">Popular</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-grow bg-primary text-white py-4 rounded-xl font-black text-sm tracking-wide shadow-lg shadow-primary/20 active:scale-95 transition-all">
              SEGUIR ESTE WAWA
            </button>
            <button className="w-14 h-14 bg-bg-light rounded-xl flex items-center justify-center text-text-muted hover:text-accent-red transition-colors border border-black/5">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full glass rounded-t-[40px] px-6 pb-8 pt-4 flex justify-around">
        <NavItem icon={<Compass />} label="Explore" active />
        <NavItem icon={<MapIcon />} label="Routes" onClick={() => navigate('/route-selection')} />
        <NavItem icon={<MapIcon />} label="Tickets" />
        <NavItem icon={<User />} label="Profile" />
      </nav>

      <IssueReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />
    </motion.div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-2xl transition-all",
        active ? "text-primary scale-110" : "text-black/20"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
