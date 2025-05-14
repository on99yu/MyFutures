
import LotCalculator from '../ui/LotCalculator';
import ATRCalculator from '@/app/ui/ATRCalculator';

export default function Page() {
  return (
    <div className="flex flex-row items-start min-h-screen
                    gap-10 p-10">
      <ATRCalculator />
      <LotCalculator/>
    </div>
  );
}
