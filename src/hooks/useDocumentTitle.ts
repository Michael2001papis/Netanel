import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useDocumentTitle = (title?: string) => {
  const { isCEO, isAdmin, isAuthenticated, user } = useAuth();

  useEffect(() => {
    const baseTitle = 'Premium Motors';
    
    if (title) {
      document.title = `${title} | ${baseTitle}`;
      return;
    }

    if (isCEO) {
      document.title = `CEO Dashboard | ${baseTitle} - נתנאל חנוף`;
    } else if (isAdmin) {
      document.title = `Admin Panel | ${baseTitle}`;
    } else if (isAuthenticated && user) {
      document.title = `${user.name || user.username} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [title, isCEO, isAdmin, isAuthenticated, user]);
};
