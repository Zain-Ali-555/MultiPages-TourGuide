import { Dashboard } from '@/components/dashboard/dashboard';
import { generateTourContent } from '@/ai/flows/generate-tour-content';
import { tourSteps as staticTourSteps } from '@/lib/tour-steps';
import type { TourStep } from '@/components/tour/tour-provider';

export default async function Home() {
  const tourSteps = await Promise.all(
    staticTourSteps.map(async (step) => {
      try {
        const result = await generateTourContent({
          moduleName: step.moduleName,
          featureDescription: step.featureDescription,
        });
        return { ...step, content: result.tourContent };
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Failed to generate content for ${step.moduleName}:`, error.message);
        } else {
          console.error(`Failed to generate content for ${step.moduleName}:`, String(error));
        }
        // Fallback content in case of AI error
        return { ...step, content: step.featureDescription };
      }
    })
  );
  
  return <Dashboard tourSteps={tourSteps as TourStep[]} />;
}
