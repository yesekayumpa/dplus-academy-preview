"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Calendar, Check, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from './button';

interface RegistrationFormProps {
  trainingTitle: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function RegistrationForm({ trainingTitle, onClose, onSuccess }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    
    // Simuler un appel API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Informations personnelles' },
    { number: 2, title: 'Détails de la formation' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-academy to-academy/90 text-white p-6 relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <h2 className="text-2xl font-bold">Inscription à la formation</h2>
        <p className="text-white/90 mt-1">{trainingTitle}</p>
        
        {/* Étapes */}
        <div className="mt-6 flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 -z-10"></div>
          {steps.map((item) => (
            <div key={item.number} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${step >= item.number ? 'bg-white text-academy' : 'bg-white/20 text-white'}`}>
                {step > item.number ? <Check className="h-5 w-5" /> : item.number}
              </div>
              <span className={`text-xs font-medium ${step >= item.number ? 'text-white' : 'text-white/60'}`}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        {!isSuccess ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: step === 1 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step === 1 ? -20 : 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-academy focus:ring-2 focus:ring-academy/20 py-3"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-academy focus:ring-2 focus:ring-academy/20 py-3"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email professionnel <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-academy focus:ring-2 focus:ring-academy/20 py-3"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-academy focus:ring-2 focus:ring-academy/20 py-3"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Entreprise <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-academy focus:ring-2 focus:ring-academy/20 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                          Poste occupé <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="appearance-none w-full rounded-lg border-gray-300 shadow-sm focus:border-academy focus:ring-2 focus:ring-academy/20 py-3 pr-10"
                            required
                          >
                            <option value="">Sélectionnez un poste</option>
                            <option value="Directeur">Directeur</option>
                            <option value="Manager">Manager</option>
                            <option value="Chef de projet">Chef de projet</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Autre">Autre</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Votre objectif avec cette formation
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-academy focus:ring-2 focus:ring-academy/20 py-3"
                        placeholder="Décrivez brièvement ce que vous attendez de cette formation..."
                      />
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            Un conseiller vous contactera dans les 24h pour finaliser votre inscription et répondre à vos questions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Précédent
                </button>
              ) : (
                <div></div>
              )}
              
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-academy to-academy/90 hover:from-academy/90 hover:to-academy/80 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Traitement...
                  </>
                ) : step === 2 ? (
                  'Finaliser mon inscription'
                ) : (
                  'Continuer'
                )}
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
            <p className="text-gray-600 mb-6">
              Votre demande d'inscription a bien été enregistrée. Notre équipe vous contactera dans les plus brefs délais.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-academy text-white font-medium rounded-lg hover:bg-academy/90 transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        )}
      </form>
    </div>
  );
}
