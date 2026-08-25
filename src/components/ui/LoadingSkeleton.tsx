export const LoadingSkeleton = () => {
  return (
    <div
      role="status"
      aria-label="Sözlük verileri yükleniyor"
      className="mx-auto w-full max-w-3xl space-y-4 animate-pulse"
    >
      <div className="space-y-4 rounded-2xl bg-[#F5EDE4] p-6 dark:bg-[#26201D]">
        <div className="h-8 w-48 rounded-lg bg-[#EADDC9] dark:bg-[#3D322C]" />
        <div className="h-12 w-full rounded-xl bg-[#EADDC9] dark:bg-[#3D322C]" />
      </div>

      <span className="sr-only">Yükleniyor...</span>
    </div>
  );
};

export default LoadingSkeleton;
