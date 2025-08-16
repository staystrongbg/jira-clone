import { AlertCircle } from 'lucide-react';

export const IsError = ({ error }: { error: Error | null }) => {
  return (
    <>
      {error && (
        <div
          className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md mb-4"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>
            {error instanceof Error
              ? error.message
              : 'An unexpected error occurred. Please try again.'}
          </span>
        </div>
      )}
    </>
  );
};
