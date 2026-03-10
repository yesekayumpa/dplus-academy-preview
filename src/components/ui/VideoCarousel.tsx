'use client';

import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Award, User, Star } from 'lucide-react';
import { Button } from './button';
import { Link } from 'react-router-dom';

export type TrainingFormat = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  details?: string[];
  duration?: string;
  level?: string;
  price?: string;
  isSelected?: boolean;
};

type TrainingCarouselProps = {
  items: TrainingFormat[];
  autoPlay?: boolean;
  interval?: number;
  buttonText?: string;
  onItemClick?: (item: TrainingFormat) => void;
};

export function TrainingCarousel({ 
  items, 
  autoPlay = true, 
  interval = 5000,
  buttonText = 'En savoir plus',
  onItemClick
}: TrainingCarouselProps) {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleItemClick = (item: TrainingFormat) => {
    setSelectedItemId(item.id);
    if (onItemClick) {
      onItemClick(item);
    }
  };
  // Les états et gestionnaires de modale ont été supprimés car non nécessaires
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    if (!autoPlay || !emblaApi) return;

    let autoplayTimer: NodeJS.Timeout;

    const playNext = () => {
      if (!emblaApi) return;
      emblaApi.scrollNext();
      autoplayTimer = setTimeout(playNext, interval);
    };

    autoplayTimer = setTimeout(playNext, interval);

    return () => {
      if (autoplayTimer) clearTimeout(autoplayTimer);
    };
  }, [emblaApi, autoPlay, interval]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="relative px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4 pb-8 group">
              <motion.div 
                className={`bg-white rounded-2xl shadow-lg transition-all h-full flex flex-col overflow-hidden border ${
                  selectedItemId === item.id 
                    ? 'border-academy/50 shadow-xl' 
                    : 'border-gray-100 group-hover:border-academy/20 hover:shadow-xl'
                }`}
                whileHover={selectedItemId === item.id ? {} : { y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: selectedItemId === item.id ? -8 : 0,
                  borderColor: selectedItemId === item.id ? 'rgba(99, 102, 241, 0.5)' : 'rgba(229, 231, 235, 1)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img 
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{item.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    {item.duration && (
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-academy" />
                        {item.duration}
                      </span>
                    )}
                    {item.level && (
                      <span className="flex items-center ml-3">
                        <User className="h-4 w-4 mr-1 text-academy" />
                        {item.level}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">{item.description}</p>
                  <div className="mt-auto">
                    {(item.title?.trim()?.toLowerCase() === "masterclass") ? (
                      <Link 
                        to="/masterclasses"
                        className={`w-full font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform flex items-center justify-center group/button ${
                          selectedItemId === item.id 
                            ? 'bg-gradient-to-r from-academy/90 to-academy-light/90 text-white scale-[1.02] shadow-lg'
                            : 'bg-gradient-to-r from-academy to-academy-light hover:from-academy/90 hover:to-academy-light/90 text-white group-hover:scale-[1.02] hover:shadow-lg'
                        }`}
                      >
                        {buttonText}
                      </Link>
                    ) : (item.title?.trim()?.toLowerCase() === "e-learning") ? (
                      <Link 
                        to="/e-learning"
                        className={`w-full font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform flex items-center justify-center group/button ${
                          selectedItemId === item.id 
                            ? 'bg-gradient-to-r from-academy/90 to-academy-light/90 text-white scale-[1.02] shadow-lg'
                            : 'bg-gradient-to-r from-academy to-academy-light hover:from-academy/90 hover:to-academy-light/90 text-white group-hover:scale-[1.02] hover:shadow-lg'
                        }`}
                      >
                        {buttonText}
                      </Link>
                    ) : (item.title?.trim()?.toLowerCase() === "sur mesure") ? (
                      <Link 
                        to="/sur-mesure"
                        className={`w-full font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform flex items-center justify-center group/button ${
                          selectedItemId === item.id 
                            ? 'bg-gradient-to-r from-academy/90 to-academy-light/90 text-white scale-[1.02] shadow-lg'
                            : 'bg-gradient-to-r from-academy to-academy-light hover:from-academy/90 hover:to-academy-light/90 text-white group-hover:scale-[1.02] hover:shadow-lg'
                        }`}
                      >
                        {buttonText}
                      </Link>
                    ) : (
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                        className={`w-full font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform ${
                          selectedItemId === item.id 
                            ? 'bg-gradient-to-r from-academy/90 to-academy-light/90 text-white scale-[1.02] shadow-lg'
                            : 'bg-gradient-to-r from-academy to-academy-light hover:from-academy/90 hover:to-academy-light/90 text-white group-hover:scale-[1.02] hover:shadow-lg'
                        } flex items-center justify-center group/button`}
                      >
                        {buttonText}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -left-1 sm:-left-3 md:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-10 rounded-full w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 shadow-md bg-white/90 hover:bg-white/90 text-academy hover:text-academy transition-all transform hover:scale-110 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-academy/50 focus:ring-offset-1"
        onClick={scrollPrev}
        aria-label="Précédent"
      >
        <ArrowLeft className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-1 sm:-right-3 md:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-10 rounded-full w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 shadow-md bg-white/90 hover:bg-white/90 text-academy hover:text-academy transition-all transform hover:scale-110 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-academy/50 focus:ring-offset-1"
        onClick={scrollNext}
        aria-label="Suivant"
      >
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </Button>
    </div>
  );
}
