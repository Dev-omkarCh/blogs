export default function LoadingSpinner({ size = "w-6 h-6" }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-gray-300 border-t-transparent ${size}`}
      />
    </div>
  );
}