import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Mail, X } from "lucide-react";

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const Notification = ({ type, message, onClose }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`
            fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg
            flex items-start gap-3 backdrop-blur-sm
            ${type === 'success' 
              ? 'bg-green-50/90 border border-green-200' 
              : 'bg-red-50/90 border border-red-200'
            }
          `}
        >
          <div className={`
            flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
            ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
          `}>
            {type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <XCircle className="w-4 h-4 text-white" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className={`
              text-sm font-medium mb-1
              ${type === 'success' ? 'text-green-800' : 'text-red-800'}
            `}>
              {type === 'success' ? 'Inscription réussie !' : 'Erreur'}
            </div>
            <div className={`
              text-xs
              ${type === 'success' ? 'text-green-600' : 'text-red-600'}
            `}>
              {message}
            </div>
          </div>
          
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className={`
              flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors
              ${type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'}
            `}
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook pour gérer les notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'error';
    message: string;
  }>>([]);

  const addNotification = (type: 'success' | 'error', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );

  return {
    addNotification,
    NotificationContainer
  };
};
