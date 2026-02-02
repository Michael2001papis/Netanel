/**
 * Maintenance Mode Utility
 * 
 * Simple way to enable/disable maintenance mode:
 * 
 * Enable: localStorage.setItem('maintenance_mode', 'true')
 * Disable: localStorage.removeItem('maintenance_mode')
 * 
 * Or use the functions:
 * - enableMaintenanceMode()
 * - disableMaintenanceMode()
 * - isMaintenanceModeEnabled()
 */

const MAINTENANCE_KEY = 'maintenance_mode';

export const enableMaintenanceMode = () => {
  localStorage.setItem(MAINTENANCE_KEY, 'true');
};

export const disableMaintenanceMode = () => {
  localStorage.removeItem(MAINTENANCE_KEY);
};

export const isMaintenanceModeEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const maintenance = localStorage.getItem(MAINTENANCE_KEY);
  return maintenance === 'true';
};
