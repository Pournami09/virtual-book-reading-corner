const PlantDecoration = () => {
  // SVG assets from Figma design
  const imgVector = "http://localhost:3845/assets/fb954f336b40c19540e29dcbc942651603a713a4.svg";
  const imgVector1 = "http://localhost:3845/assets/58c5071ae83f78091c1411209205c82a33b5778b.svg";
  const imgVector2 = "http://localhost:3845/assets/fde974e207fe240b6ded60b87d6040ee70c0c2c1.svg";
  const imgLeftLeaves = "http://localhost:3845/assets/a04c08d908cf51822983a5344f57fee5609ed3fe.svg";
  const imgMiddleLeaves = "http://localhost:3845/assets/94f672ff4ca68da467e5d08a62e10d985d55e8bb.svg";
  const imgRightLeaves = "http://localhost:3845/assets/7a3d556302d5e5558a29e74954bfc8129ef374b3.svg";

  return (
    <div className="relative w-24 h-32 flex items-end justify-center">
      <div className="relative size-full" data-name="Pot">
        {/* Pot base */}
        <div className="absolute bottom-0 left-[5.08%] right-[5.8%] top-[12.53%]" data-name="Vector">
          <img alt="Plant pot base" className="block max-w-none size-full" src={imgVector} />
        </div>
        
        {/* Pot middle section */}
        <div className="absolute inset-[12.53%_5.8%_58.99%_5.08%]" data-name="Vector">
          <img alt="Plant pot middle" className="block max-w-none size-full" src={imgVector1} />
        </div>
        
        {/* Pot rim - reduced size */}
        <div className="absolute bottom-[70.83%] flex items-center justify-center left-0 right-0 top-0">
          <div className="flex-none h-[46px] rotate-[180deg] w-[245px]">
            <div className="relative size-full" data-name="Vector">
              <img alt="Plant pot rim" className="block max-w-none size-full" src={imgVector2} />
            </div>
          </div>
        </div>
        
        {/* Left Leaves - scaled down */}
        <div className="absolute h-[306px] left-[-27px] top-[-34px] w-[102px]" data-name="Left Leaves">
          <img alt="Left plant leaves" className="block max-w-none size-full" src={imgLeftLeaves} />
        </div>
        
        {/* Middle Leaves - scaled down */}
        <div className="absolute h-[244px] left-[53px] top-[-28px] w-[156px]" data-name="Middle Leaves">
          <img alt="Middle plant leaves" className="block max-w-none size-full" src={imgMiddleLeaves} />
        </div>
        
        {/* Right Leaves - scaled down */}
        <div className="absolute h-[366px] left-[166px] top-[-46px] w-[150px]" data-name="Right Leaves">
          <img alt="Right plant leaves" className="block max-w-none size-full" src={imgRightLeaves} />
        </div>
      </div>
    </div>
  );
};

export default PlantDecoration;
