import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, CheckCircle2, MessageSquare, Clock, Bus, UserX, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface IssueReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: 'delay', label: 'Atraso', icon: Clock, color: 'text-accent-yellow' },
  { id: 'full', label: 'Autocarro Cheio', icon: Bus, color: 'text-accent-red' },
  { id: 'driver', label: 'Conduta', icon: UserX, color: 'text-primary' },
  { id: 'technical', label: 'Erro Técnico', icon: MessageSquare, color: 'text-primary' },
  { id: 'other', label: 'Outro', icon: HelpCircle, color: 'text-text-muted' },
];

export default function IssueReportModal({ isOpen, onClose }: IssueReportModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedCategory(null);
      setDescription('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[480px] bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-text-dark tracking-tighter">Reportar Problema</h2>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">Sua voz ajuda a melhorar o Wawa</p>
              </div>
              <button 
                onClick={resetAndClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-light text-text-muted hover:text-text-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 pt-4">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-10 space-y-4"
                >
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-black text-text-dark">Obrigado!</h3>
                  <p className="text-sm text-text-muted max-w-[240px]">A sua denúncia foi recebida e será analisada pela nossa equipa operacional.</p>
                  <button 
                    onClick={resetAndClose}
                    className="chunky-btn-primary px-8 py-3 rounded-xl font-black text-sm mt-4"
                  >
                    Fechar
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Categories */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Categoria</label>
                    <div className="grid grid-cols-2 gap-3">
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left",
                              isSelected 
                                ? "bg-primary/5 border-primary" 
                                : "bg-bg-light border-transparent hover:border-black/5"
                            )}
                          >
                            <Icon className={cn("w-5 h-5", isSelected ? "text-primary" : cat.color)} />
                            <span className={cn(
                              "text-xs font-bold",
                              isSelected ? "text-primary" : "text-text-dark"
                            )}>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">Descrição (Opcional)</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Diga-nos o que aconteceu..."
                      className="w-full h-32 bg-bg-light rounded-2xl p-4 text-sm font-medium border-2 border-transparent focus:border-primary/20 transition-all resize-none focus:ring-0 placeholder:text-text-muted/30"
                    />
                  </div>

                  {/* Action */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={!selectedCategory}
                      className={cn(
                        "w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all",
                        selectedCategory 
                          ? "chunky-btn-primary" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <AlertTriangle className={cn("w-5 h-5", selectedCategory ? "text-white" : "text-gray-400")} />
                      ENVIAR DENÚNCIA
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
