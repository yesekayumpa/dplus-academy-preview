import { useState, useEffect } from 'react';

// Composant pour afficher chaque unité de temps
const TimeUnit = ({ value, label, isLast = false }: { value: string; label: string; isLast?: boolean }) => (
  <div className="flex flex-col items-center mx-0.5 md:mx-1 group">
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-lg opacity-0 group-hover:opacity-10 transition-all duration-300 -z-10"></div>
      <div className="p-0.5 md:p-1">
        <span className="text-sm md:text-xl font-bold text-red-600">
          {value}
        </span>
      </div>
    </div>
    <span className="mt-1 text-[8px] md:text-[10px] font-medium text-gray-500 group-hover:text-red-600 transition-colors">
      {label}
    </span>
  </div>
);

// Séparateur stylisé
const Separator = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm md:text-xl font-bold text-red-500/80 mx-0.5 self-center">
    {children}
  </span>
);

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface TimerProps {
    endTime?: string; // Optionnel : Permet de personnaliser la date de fin
    className?: string; // Optionnel : Pour styliser le conteneur
}

const Timer = ({
                   // Date de fin par défaut : 7 jours à partir de maintenant
                   endTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                   className = "text-xs font-medium text-gray-800"
               }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Calcule le temps restant
    const calculateTimeLeft = (): TimeLeft => {
        try {
            const endDate = new Date(endTime);
            const now = new Date();
            
            console.log('Date de fin:', endDate);
            console.log('Date actuelle:', now);
            
            // Vérification que la date est valide
            if (isNaN(endDate.getTime())) {
                console.error('Date de fin invalide');
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            const difference = endDate.getTime() - now.getTime();
            console.log('Différence en millisecondes:', difference);

            if (difference <= 0) {
                console.log('Temps écoulé!');
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
                hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
                minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
                seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
            };
        } catch (error) {
            console.error('Erreur dans le calcul du temps restant:', error);
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    };

    // Met à jour le timer toutes les secondes
    useEffect(() => {
        // Vérification initiale de la date de fin
        const endDate = new Date(endTime);
        if (isNaN(endDate.getTime())) {
            console.error('Date de fin invalide :', endTime);
            return;
        }

        // Première mise à jour immédiate
        setTimeLeft(calculateTimeLeft());

        // Mise à jour toutes les secondes
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = calculateTimeLeft();
                // Si le temps est écoulé, on nettoie l'intervalle
                if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
                    clearInterval(timer);
                }
                return newTime;
            });
        }, 1000);

        // Nettoyage
        return () => clearInterval(timer);
    }, [endTime]);

    // Formatage à 2 chiffres (ex: "05")
    const formatNumber = (num: number): string =>
        num.toString().padStart(2, '0');

    // Vérification si le temps est écoulé
    const isTimeUp = timeLeft.days === 0 && timeLeft.hours === 0 && 
                     timeLeft.minutes === 0 && timeLeft.seconds === 0;

    return (
        <div className={`inline-flex items-center justify-center ${className} ${isTimeUp ? 'text-red-500' : ''}`}>
            {isTimeUp ? (
                <div className="flex items-center space-x-1.5 bg-gradient-to-r from-red-50 to-red-100 px-2 py-1 rounded-md border border-red-100 text-sm">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-red-700">Temps écoulé !</span>
                </div>
            ) : (
                <>
                    <TimeUnit value={formatNumber(timeLeft.days)} label="Jours" />
                    <Separator>:</Separator>
                    <TimeUnit value={formatNumber(timeLeft.hours)} label="Heures" />
                    <Separator>:</Separator>
                    <TimeUnit value={formatNumber(timeLeft.minutes)} label="Minutes" />
                    <Separator>:</Separator>
                    <TimeUnit value={formatNumber(timeLeft.seconds)} label="Secondes" isLast />
                </>
            )}
        </div>
    );
};

export default Timer;
