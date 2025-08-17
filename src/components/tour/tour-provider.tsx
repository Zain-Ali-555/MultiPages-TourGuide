"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import TourStepComponent from './tour-step';

export type TourStep = {
  id: string;
  target: string;
  title: string;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
};

interface TourContextType {
  steps: TourStep[];
  currentStepIndex: number;
  currentStep: TourStep | null;
  isOpen: boolean;
  start: () => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

interface TourProviderProps {
  children: ReactNode;
  steps: TourStep[];
}

export const TourProvider: React.FC<TourProviderProps> = ({ children, steps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const start = useCallback(() => {
    setCurrentStepIndex(0);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const stop = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  }, [steps.length]);

  const next = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      goTo(nextIndex);
    } else {
      stop();
    }
  }, [currentStepIndex, steps.length, stop, goTo]);

  const prev = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      goTo(prevIndex);
    }
  }, [currentStepIndex, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'Escape') {
        stop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, next, prev, stop]);
  
  const value = {
    steps,
    currentStepIndex,
    currentStep: isOpen ? steps[currentStepIndex] : null,
    isOpen,
    start,
    stop,
    next,
    prev,
    goTo,
  };

  return (
    <TourContext.Provider value={value}>
      {children}
      {isOpen && <TourStepComponent />}
    </TourContext.Provider>
  );
};

export const useTour = (): TourContextType => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
