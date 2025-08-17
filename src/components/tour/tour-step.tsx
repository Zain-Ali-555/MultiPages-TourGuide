"use client";

import { useTour } from './tour-provider';
import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, CircleDot, X } from 'lucide-react';

const getPosition = (targetRect: DOMRect, placement: string = 'bottom') => {
  const popoverHeight = 350; // Approximate height of the popover
  const popoverWidth = 384; // width is w-96
  const offset = 16;
  const positions: { [key: string]: { top: number, left: number } } = {
    top: {
      top: targetRect.top - popoverHeight - offset,
      left: targetRect.left + targetRect.width / 2 - popoverWidth / 2,
    },
    bottom: {
      top: targetRect.bottom + offset,
      left: targetRect.left + targetRect.width / 2 - popoverWidth / 2,
    },
    left: {
      top: targetRect.top + targetRect.height / 2 - popoverHeight / 2,
      left: targetRect.left - popoverWidth - offset,
    },
    right: {
      top: targetRect.top + targetRect.height / 2 - popoverHeight / 2,
      left: targetRect.right + offset,
    },
    center: {
      top: window.innerHeight / 2 - popoverHeight / 2,
      left: window.innerWidth / 2 - popoverWidth / 2,
    }
  };

  let { top, left } = positions[placement];

  // Adjust if out of viewport
  if (left < offset) left = offset;
  if (left + popoverWidth > window.innerWidth - offset) left = window.innerWidth - popoverWidth - offset;
  if (top < offset) top = offset;
  if (top + popoverHeight > window.innerHeight - offset) top = window.innerHeight - popoverHeight - offset;
  
  return { top, left };
}

export default function TourStepComponent() {
  const { currentStep, currentStepIndex, steps, next, prev, stop, goTo } = useTour();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!currentStep) return;

    if (currentStep.placement === 'center') {
      setTargetRect(null);
      setPopoverPosition(getPosition({} as DOMRect, 'center'));
      return;
    }

    const element = document.querySelector(currentStep.target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      
      const updatePosition = () => {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        setPopoverPosition(getPosition(rect, currentStep.placement));
      };

      // Initial position update
      updatePosition();

      const timeoutId = setTimeout(updatePosition, 500); // Re-check after scroll
      
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
        clearTimeout(timeoutId);
      };
    }
  }, [currentStep]);

  if (!currentStep) return null;

  const overlayPath = targetRect
    ? `M0,0H${window.innerWidth}V${window.innerHeight}H0V0ZM${targetRect.left - 4},${targetRect.top - 4}V${targetRect.bottom + 4}H${targetRect.right + 4}V${targetRect.top - 4}H${targetRect.left - 4}Z`
    : `M0,0H${window.innerWidth}V${window.innerHeight}H0V0Z`;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 animate-in fade-in"
        style={{ clipPath: `path('${overlayPath}')` }}
      />
      
      {targetRect && <div
        className="fixed z-[101] rounded-lg bg-transparent transition-all duration-300"
        style={{
          top: `${targetRect.top - 4}px`,
          left: `${targetRect.left - 4}px`,
          width: `${targetRect.width + 8}px`,
          height: `${targetRect.height + 8}px`,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.6), 0 0 0 3px hsl(var(--primary))',
        }}
      />}
      
      <Card
        ref={popoverRef}
        className="fixed z-[102] w-96 shadow-2xl animate-in fade-in zoom-in-95"
        style={{ top: `${popoverPosition.top}px`, left: `${popoverPosition.left}px` }}
      >
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>Step {currentStepIndex + 1} of {steps.length}</CardDescription>
          <Button variant="ghost" size="icon" className="absolute top-3 right-3" onClick={stop}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{currentStep.content}</p>
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>Tour Progress</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pr-4 max-h-32 overflow-y-auto">
                  {steps.map((step, index) => (
                    <button key={step.id} onClick={() => goTo(index)} className={`flex items-center gap-3 text-left w-full p-1 rounded-md transition-colors hover:bg-muted ${index > currentStepIndex ? 'opacity-60' : ''}`}>
                      {index < currentStepIndex ? <CheckCircle2 size={16} className="text-primary flex-shrink-0" /> : (index === currentStepIndex ? <CircleDot size={16} className="text-primary flex-shrink-0" /> : <Circle size={16} className="text-muted-foreground flex-shrink-0" />)}
                      <span className={`text-sm ${index === currentStepIndex ? 'font-semibold text-primary' : ''}`}>{step.title}</span>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={stop}>Skip tour</Button>
          <div className="flex gap-2">
            {currentStepIndex > 0 && <Button variant="outline" onClick={prev}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>}
            <Button onClick={next}>
              {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
