"use client";

import { X, Clock, User, DollarSign, Star, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { useState } from "react";
import { RegistrationForm } from "./RegistrationForm";

interface TrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  duration?: string;
  level?: string;
  price?: string;
  children?: React.ReactNode;
}

export function TrainingModal({ 
  isOpen, 
  onClose, 
  title, 
  description,
  duration,
  level,
  price,
  children 
}: TrainingModalProps) {
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleRegistrationSuccess = () => {
    setRegistrationComplete(true);
    // Fermer automatiquement le modal après 3 secondes
    setTimeout(() => {
      setShowRegistration(false);
      setRegistrationComplete(false);
      onClose();
    }, 3000);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
              style={{ maxHeight: '90vh' }}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* En-tête avec dégradé */}
              <div className="bg-gradient-to-r from-academy to-academy/90 text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white/90 mb-3">
                        <Star className="h-4 w-4 mr-1" />
                        Formation Premium
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
                      <p className="mt-2 text-white/90 max-w-2xl">{description}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-white/80 hover:text-white transition-colors p-2 -mr-2 hover:bg-white/10 rounded-full"
                      aria-label="Fermer"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto flex-1" onClick={(e) => e.stopPropagation()}>
                {showRegistration ? (
                  <RegistrationForm 
                    trainingTitle={title}
                    onClose={() => setShowRegistration(false)}
                    onSuccess={handleRegistrationSuccess}
                  />
                ) : (
                <div className="space-y-8">
                  {registrationComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-6"
                    >
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">
                            Votre inscription a bien été enregistrée ! Un conseiller vous contactera bientôt.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {duration && (
                      <div className="flex items-center p-4 bg-gradient-to-br from-academy/5 to-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-academy/10 p-3 rounded-lg mr-4">
                          <Clock className="h-6 w-6 text-academy" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Durée</p>
                          <p className="font-semibold text-gray-800">{duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {level && (
                      <div className="flex items-center p-4 bg-gradient-to-br from-academy/5 to-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-academy/10 p-3 rounded-lg mr-4">
                          <User className="h-6 w-6 text-academy" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Niveau</p>
                          <p className="font-semibold text-gray-800">{level}</p>
                        </div>
                      </div>
                    )}
                    
                    {price && (
                      <div className="flex items-center p-4 bg-gradient-to-br from-academy/5 to-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-academy/10 p-3 rounded-lg mr-4">
                          <DollarSign className="h-6 w-6 text-academy" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Prix</p>
                          <p className="font-semibold text-gray-800">{price}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {children && (
                    <div className="bg-white/50 border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-white text-sm font-medium text-gray-600">Points clés du programme</span>
                        </div>
                      </div>
                      {children}
                    </div>
                  )}
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRegistration(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-academy to-academy/90 hover:from-academy/90 hover:to-academy/80 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center group/button"
                    >
                      <span>Je m'inscris maintenant</span>
                    </Button>
                  </div>
                </div>
              )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
