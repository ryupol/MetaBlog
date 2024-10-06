import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function ErrorMessage({ text }: { text?: string }) {
  if (!text) return "";
  return (
    <div className="mt-2 flex gap-1">
      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
      <p className="text-sm text-red-500">{text}</p>
    </div>
  );
}

export default ErrorMessage;
