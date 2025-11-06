
import LotCalculator from '@/components/Calculators/LotCalculator';
import ATRCalculator from '@/components/Calculators/ATRCalculator';
import LotCommissionCalculator from '../../components/Calculators/CommisionCalculator';
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
