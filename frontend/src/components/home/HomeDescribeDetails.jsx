import React from "react";

const HomeDescribeDetails = ({ number, text, info }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <span className="text-xl">{number}</span>
        <h3 className="font-bold">{text}</h3>
        <p>{info}</p>
      </div>
    </div>
  );
};

export default HomeDescribeDetails;
