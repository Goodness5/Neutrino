import React from "react";

const HomeTextBox = ({ title, text }) => {
  return (
    <span className="p-[1rem] bg-white w-[50%]">
      <h1 className="text-xl font-bold">{title}</h1>
      <p>{text}</p>
    </span>
  );
};

export default HomeTextBox;
