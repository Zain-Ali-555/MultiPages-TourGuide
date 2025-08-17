import { Dashboard } from '@/components/dashboard/dashboard';
import { tourSteps as staticTourSteps } from '@/lib/tour-steps';

export default function Home() {
  return <Dashboard tourSteps={staticTourSteps} />;
}
