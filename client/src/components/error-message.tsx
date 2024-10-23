import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return;
  return (
    <div className="mt-2 flex gap-1">
      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
      <p className="text-sm text-red-500">{message}</p>
    </div>
  );
}

export default ErrorMessage;
