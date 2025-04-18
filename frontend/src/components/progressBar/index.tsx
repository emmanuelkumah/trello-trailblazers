
type ProgressBarTypes = {
  currentStep: number;
  totalSteps: number;
  description?: boolean;
}

export default function ProgressBar ({ currentStep, totalSteps, description }: ProgressBarTypes) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {description && (
        <p className="text-xl mb-3">
          Step {currentStep} of {totalSteps}
        </p>
      )}
      <div className="relative w-full h-2 bg-gray-300 dark:bg-black/30 rounded-lg overflow-hidden">
        <div
          className="absolute h-full bg-emerald transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <style>{`
        .progress-bar {
          background-color: #e5e7eb;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
};