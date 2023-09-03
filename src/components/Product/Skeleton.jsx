export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="animate-pulse md:w-64 md:h-[450px]">
          <div className="h-56 md:h-64 bg-gray-300 rounded"></div>
          <div className="md:h-60 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 w-1/3 bg-gray-400 rounded"></div>
              <div className="h-4 w-1/6 bg-gray-400 rounded"></div>
            </div>
            <div className="h-6 w-full bg-gray-400 rounded mb-2"></div>
            <div className="h-6 w-3/4 bg-gray-400 rounded"></div>
          </div>
          <div className="pt-0 p-4">
            <div className="h-8 w-24 bg-gray-400 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
