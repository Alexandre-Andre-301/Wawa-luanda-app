import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Waves, ArrowRight } from 'lucide-react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (phone.length > 5) {
      navigate('/passenger-home');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative min-h-screen w-full bg-bg-light flex flex-col items-center p-8"
    >
      <div className="mt-16 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary shadow-xl mb-4">
          <Waves className="text-white w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-primary tracking-tighter">Wawa</h1>
        <p className="text-text-muted font-medium">Your gateway to Luanda's rhythm</p>
      </div>

      <div className="w-full mt-16 glass rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-2">Welcome</h2>
            <p className="text-text-muted text-sm font-medium">Enter your phone number to get started</p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary ml-4">
              Phone Number
            </label>
            <div className="relative flex items-center bg-white rounded-xl border-2 border-transparent transition-all focus-within:border-primary/20">
              <div className="px-4 py-4 border-r border-gray-100">
                <span className="font-bold text-text-dark">+244</span>
              </div>
              <input 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9XX XXX XXX"
                className="w-full bg-transparent border-none focus:ring-0 px-4 py-4 text-lg font-semibold tracking-wider placeholder:text-text-muted/30"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="chunky-btn-primary w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-grow bg-gray-200" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">or connect with</span>
            <div className="h-[1px] flex-grow bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-100 py-4 rounded-xl font-bold text-sm text-text-muted hover:bg-gray-50 transition-colors">
              <img src="https://picsum.photos/seed/google/24/24" alt="Google" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-100 py-4 rounded-xl font-bold text-sm text-text-muted hover:bg-gray-50 transition-colors">
              <img src="https://picsum.photos/seed/facebook/24/24" alt="Facebook" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
              Facebook
            </button>
          </div>
        </div>
      </div>

      <p className="mt-12 text-center text-[10px] text-text-muted leading-relaxed max-w-[240px]">
        By continuing, you agree to Wawa's <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">Terms of Service</span> and <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">Privacy Policy</span>
      </p>

      {/* Driver switch */}
      <button 
        onClick={() => navigate('/route-selection')}
        className="mt-8 text-xs font-extrabold text-primary hover:underline transition-all"
      >
        I AM A DRIVER
      </button>
    </motion.div>
  );
}
