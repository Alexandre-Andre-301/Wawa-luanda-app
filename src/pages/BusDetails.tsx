import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, User, Bus, MapPin, CheckCircle2, History, Navigation, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import IssueReportModal from '../components/IssueReportModal';

export default function BusDetails() {
  const navigate = useNavigate();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const stops = [
    { name: 'Largo da Mutamba', time: '08:30', passed: true },
    { name: 'Hospital Josina Machel', time: '08:45', current: true },
    { name: 'Congolenses', time: '08:52' },
    { name: 'Aeroporto 4 de Fevereiro', time: '09:10' },
    { name: 'Talatona Shopping', time: '09:30' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative min-h-screen w-full bg-bg-light pb-32"
    >
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-all outline-none"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-xl font-black text-primary tracking-tighter">Wawa Details</h1>
        <div className="ml-auto">
          <button 
            onClick={() => setIsReportOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-red/10 animate-pulse border border-accent-red/20"
          >
            <AlertCircle className="w-5 h-5 text-accent-red" />
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 space-y-6">
        {/* Header Hero Image (Theme Style) */}
        <div className="h-40 bg-primary rounded-2xl flex items-end p-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-full opacity-10">
            <Bus className="w-full h-full stroke-[1]" />
          </div>
          <h2 className="text-3xl font-black text-white relative z-10 transition-all">Wawa #402</h2>
        </div>

        {/* Driver Info Card */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">Motorista</span>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/10">
                <img src="https://picsum.photos/seed/driver/100/100" alt="Driver" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-xl font-black text-text-dark">Mateus Francisco</h3>
                <p className="text-xs font-bold text-text-muted">4.9 ★ (1.2k viagens)</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-text-muted">Ocupação Atual</span>
              <span className="text-sm font-black text-accent-yellow">80% - Quase Cheio</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-black/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                className="h-full bg-accent-yellow"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-text-muted">Rota</p>
              <p className="font-bold text-text-dark">Mutamba → Talatona</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-text-muted">Tempo</p>
              <p className="font-bold text-primary">4 min Restantes</p>
            </div>
          </div>
        </section>

        {/* Timeline (Theme Stylized) */}
        <section className="bg-white rounded-2xl p-8 space-y-8 shadow-sm border border-black/5">
          <h3 className="text-lg font-black text-text-dark tracking-tight">Timeline de Viagem</h3>
          
          <div className="relative space-y-8">
            <div className="absolute left-[13px] top-2 bottom-2 w-1 bg-gray-100" />
            <div className="absolute left-[13px] top-2 h-1/4 w-1 bg-primary" />

            {stops.map((stop, i) => (
              <div key={i} className="flex gap-6 items-start relative z-10">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center border-4 border-white",
                  stop.passed ? "bg-primary text-white" : 
                  stop.current ? "bg-white border-primary shadow-[0_0_10px_rgba(26,95,180,0.4)]" : "bg-gray-200"
                )}>
                  {stop.passed && <CheckCircle2 className="w-3 h-3" />}
                  {stop.current && <motion.div animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 bg-primary rounded-full" />}
                </div>
                
                <div className={cn(
                  "flex-1 transition-all",
                  stop.current ? "scale-105" : ""
                )}>
                  <div className={cn(
                    "p-2 transition-all",
                  )}>
                    <div className="flex justify-between items-start">
                      <p className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        stop.current ? "text-primary" : "text-text-muted"
                      )}>
                        {stop.passed ? `Passado ${stop.time}` : stop.current ? 'Próxima Parada • 4 min' : `Estimado ${stop.time}`}
                      </p>
                    </div>
                    <h4 className={cn(
                      "font-bold mt-1",
                      stop.current ? "text-primary text-lg" : "text-text-dark"
                    )}>{stop.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-10 left-0 w-full px-6 z-50">
        <button 
          className="chunky-btn-primary w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-2xl"
        >
          SEGUIR ESTE WAWA
        </button>
      </div>

      <IssueReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />
    </motion.div>
  );
}
