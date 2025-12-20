export default function LoadingSpinner({ size = "w-8 h-8" }) {
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full ${size} border-b-2 border-white`}></div>
    </div>
  );
}