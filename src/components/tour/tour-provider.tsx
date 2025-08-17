"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import TourStepComponent from './tour-step';
import { useRouter } from 'next/navigation';

export type TourStep = {
  id: string;
  target: string;
  title: string;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  path?: string;
  action?: (next: () => void) => void;
};

interface TourContextType {
  steps: TourStep[];
  currentStepIndex: number;
  currentStep: TourStep | null;
  isOpen: boolean;
  isTourOpen: boolean;
  start: (force?: boolean) => void;
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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const start = useCallback((force = false) => {
    if (force) {
      localStorage.setItem('tourStatus', 'running');
      localStorage.setItem('tourStep', '0');
      setCurrentStepIndex(0);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
      if (steps[0].path && window.location.pathname !== steps[0].path) {
        router.push(steps[0].path);
      }
    } else {
      const tourStatus = localStorage.getItem('tourStatus');
      if (tourStatus === 'running') {
        const step = parseInt(localStorage.getItem('tourStep') || '0', 10);
        setCurrentStepIndex(step);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }
    }
  }, [steps, router]);

  const stop = useCallback(() => {
    localStorage.setItem('tourStatus', 'completed');
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      const step = steps[index];
      if (step.path && window.location.pathname !== step.path) {
        setIsOpen(false); // Close popover during navigation
        router.push(step.path);
      }
      localStorage.setItem('tourStep', index.toString());
      setCurrentStepIndex(index);
    }
  }, [steps, router]);

  const next = useCallback(() => {
    const currentStep = steps[currentStepIndex];
    if (currentStep?.action) {
      currentStep.action(() => goTo(currentStepIndex + 1));
    } else {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        goTo(nextIndex);
      } else {
        stop();
      }
    }
  }, [currentStepIndex, steps, stop, goTo]);

  const prev = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      goTo(prevIndex);
    }
  }, [currentStepIndex, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') stop();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, next, prev, stop]);
  
  // Effect to re-open tour on page navigation if it was running
  useEffect(() => {
    const tourStatus = localStorage.getItem('tourStatus');
    if (tourStatus === 'running') {
      const stepIndex = parseInt(localStorage.getItem('tourStep') || '0', 10);
      const currentPath = window.location.pathname;
      const targetStep = steps[stepIndex];
      
      if (targetStep && targetStep.path === currentPath) {
        setCurrentStepIndex(stepIndex);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      } else if (!targetStep) {
        stop();
      }
    }
  }, [steps, stop]);

  const value = {
    steps,
    currentStepIndex,
    currentStep: isOpen ? steps[currentStepIndex] : null,
    isOpen,
    isTourOpen: isOpen,
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
