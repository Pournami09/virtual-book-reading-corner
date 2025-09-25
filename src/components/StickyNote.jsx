const StickyNote = () => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="relative">
        {/* Sticky note */}
        <div className="bg-yellow-200 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer">
          <div className="p-4 w-48">
            <div className="text-slate-800 font-medium leading-tight">
              📚 Pick a book from the shelf to start reading
            </div>
          </div>
          
          {/* Folded corner */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-8 border-t-8 border-l-transparent border-t-yellow-300"></div>
        </div>
        
        {/* Pin */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full shadow-sm"></div>
      </div>
    </div>
  );
};

export default StickyNote;
