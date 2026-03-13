'use client';

import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Award, User, Star } from 'lucide-react';
import { Button } from './button';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  // Fonction pour naviguer avec scroll vers le haut
  const handleNavigateWithScroll = (link: string) => {
    window.scrollTo(0, 0);
    navigate(link);
  };

  const handleItemClick = (item: TrainingFormat) => {
    setSelectedItemId(item.id);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    setSelectedIndex(emblaApi.selectedScrollSnap());

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

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
    <div className="relative px-4 sm:px-8 md:px-12">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 sm:px-3 md:px-4 pb-8 group">
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
                      <button 
                        onClick={() => handleNavigateWithScroll("/masterclasses")}
                        className={`w-full font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform flex items-center justify-center group/button ${
                          selectedItemId === item.id 
                            ? 'bg-gradient-to-r from-academy/90 to-academy-light/90 text-white scale-[1.02] shadow-lg'
                            : 'bg-gradient-to-r from-academy to-academy-light hover:from-academy/90 hover:to-academy-light/90 text-white group-hover:scale-[1.02] hover:shadow-lg'
                        }`}
                      >
                        {buttonText}
                      </button>
                    ) : (item.title?.trim()?.toLowerCase() === "e-learning") ? (
                      <button 
                        onClick={() => handleNavigateWithScroll("/e-learning")}
                        className={`w-full font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform flex items-center justify-center group/button ${
                          selectedItemId === item.id 
                            ? 'bg-gradient-to-r from-academy/90 to-academy-light/90 text-white scale-[1.02] shadow-lg'
                            : 'bg-gradient-to-r from-academy to-academy-light hover:from-academy/90 hover:to-academy-light/90 text-white group-hover:scale-[1.02] hover:shadow-lg'
                        }`}
                      >
                        {buttonText}
                      </button>
                    ) : (item.title?.trim()?.toLowerCase() === "sur mesure") ? (
                      <button 
                        onClick={() => handleNavigateWithScroll("/sur-mesure")}
                        className={`w-full font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform flex items-center justify-center group/button ${
                          selectedItemId === item.id 
                            ? 'bg-gradient-to-r from-academy/90 to-academy-light/90 text-white scale-[1.02] shadow-lg'
                            : 'bg-gradient-to-r from-academy to-academy-light hover:from-academy/90 hover:to-academy-light/90 text-white group-hover:scale-[1.02] hover:shadow-lg'
                        }`}
                      >
                        {buttonText}
                      </button>
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
        className="absolute left-0 sm:-left-1 md:-left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-10 rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 shadow-lg bg-white/95 hover:bg-white text-academy hover:text-academy transition-all transform hover:scale-110 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-academy/50 focus:ring-offset-1"
        onClick={scrollPrev}
        aria-label="Précédent"
      >
        <ArrowLeft className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-0 sm:-right-1 md:-right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-10 rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 shadow-lg bg-white/95 hover:bg-white text-academy hover:text-academy transition-all transform hover:scale-110 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-academy/50 focus:ring-offset-1"
        onClick={scrollNext}
        aria-label="Suivant"
      >
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </Button>
      
      {/* Dot indicators for mobile */}
      <div className="flex justify-center mt-4 gap-2 md:hidden">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              selectedIndex === index 
                ? "bg-academy w-8" 
                : "bg-gray-300 hover:bg-gray-400"
            )}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
