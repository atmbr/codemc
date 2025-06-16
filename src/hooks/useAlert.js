import React, { useState, useCallback } from 'react';

const useAlert = (storageKey) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const checkAndShowAlert = useCallback(() => {
  const hasBeenSeen = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);
  if (!hasBeenSeen) {
    setIsAlertOpen(true);
  }
}, [storageKey]);

  const closeAlertAndRemember = useCallback(() => {
  setIsAlertOpen(false);
  localStorage.setItem(storageKey, 'true');
  sessionStorage.setItem(storageKey, 'true');
}, [storageKey]);
  
  const showAlert = useCallback(() => {
    setIsAlertOpen(true);
  }, []);

  return {
    isAlertOpen,
    checkAndShowAlert,
    closeAlertAndRemember,
    showAlert,
    setIsAlertOpen
  };
};

export default useAlert;