import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bus } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full flex flex-col items-center justify-center bg-primary overflow-hidden"
    >
      {/* Dynamic Map Texture Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Stylized Routes */}
          <path d="M 0 100 Q 200 150 400 100 T 800 100" stroke="white" strokeWidth="2" fill="none" />
          <path d="M 50 0 V 800" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <div className="w-24 h-24 bg-white flex items-center justify-center rounded-2xl shadow-2xl relative overflow-hidden">
          <Bus className="w-12 h-12 text-primary" strokeWidth={2.5} />
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-1 uppercase">
            Wawa Luanda
          </h1>
          <p className="text-white/60 font-bold text-[10px] tracking-[0.4em] uppercase">
            Transporte Inteligente
          </p>
        </div>
      </motion.div>

      {/* Loading bar */}
      <div className="absolute bottom-24 w-36 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-accent-yellow"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute bottom-12 text-white/40 text-[10px] uppercase tracking-widest font-bold">
        Luanda • 2026
      </div>
    </motion.div>
  );
}
