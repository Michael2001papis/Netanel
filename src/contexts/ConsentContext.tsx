import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConsentModal } from '../components/ConsentModal';

interface ConsentContextType {
  hasConsent: boolean;
  checkConsent: () => boolean;
  acceptConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'site_consent';
const CONSENT_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const checkConsent = (): boolean => {
    try {
      const consentData = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!consentData) {
        return false;
      }

      const { accepted, timestamp } = JSON.parse(consentData);
      
      if (!accepted) {
        return false;
      }

      // Check if consent has expired (1 hour)
      const now = Date.now();
      const timeElapsed = now - timestamp;
      
      if (timeElapsed >= CONSENT_DURATION) {
        // Consent expired
        localStorage.removeItem(CONSENT_STORAGE_KEY);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking consent:', error);
      return false;
    }
  };

  const acceptConsent = () => {
    setHasConsent(true);
    setShowModal(false);
  };

  useEffect(() => {
    const consent = checkConsent();
    if (consent) {
      setHasConsent(true);
      setShowModal(false);
    } else {
      setHasConsent(false);
      setShowModal(true);
    }
  }, []);

  return (
    <ConsentContext.Provider value={{ hasConsent, checkConsent, acceptConsent }}>
      {children}
      {showModal && (
        <ConsentModal onAccept={acceptConsent} />
      )}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};
