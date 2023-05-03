import React, { useState } from "react";

const NavIcon = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => setOpen(false) && `className={}`}
        className="flex flex-col gap-2 p-1 border-2 border-[#2a2a2a] hover:cursor-pointer rounded-md md:hidden"
      >
        <span className="bg-[#2a2a2a] w-[2rem] h-[0.2rem] rounded-2xl"></span>
        <span className="bg-[#2a2a2a] w-[2rem] h-[0.2rem] rounded-2xl"></span>
        <span className="bg-[#2a2a2a] w-[2rem] h-[0.2rem] rounded-2xl"></span>
      </div>

      <div className="hover:cursor-pointer rounded-md md:hidden">
        <span className="bg-[#2a2a2a] w-[2rem] h-[0.2rem] rounded-2xl"></span>
      </div>
    </div>
  );
};

export default NavIcon;
