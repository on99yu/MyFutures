
import LotCalculator from '@/app/ui/Calculators/LotCalculator';
import ATRCalculator from '@/app/ui/Calculators/ATRCalculator';
import LotCommissionCalculator from '../ui/Calculators/CommisionCalculator';
export default function Page() {
  return (
    <div className="flex flex-row items-start min-h-screen
                    gap-10 p-10">
      <ATRCalculator />
      <LotCalculator/>
      <LotCommissionCalculator/>
    </div>
  );
}
