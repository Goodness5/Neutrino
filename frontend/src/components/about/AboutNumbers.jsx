import React from "react";
import styling from "../../../styles/Home.module.css";

function AboutNumbers() {
  return (
    <div>
      <div className={`${styling.containerabout} ${styling.resp}`}>
        <div className="">
          <h1 className={styling.numbers}>01.</h1>

          <h3 className={styling.stuff}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>

          <p>adipisicing elit</p>
        </div>

        <div>
          <h1 className={styling.numbers}>02.</h1>

          <h3 className={styling.stuff}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>

          <p>adipisicing elit</p>
        </div>

        <div>
          <h1 className={styling.numbers}>03.</h1>

          <h3 className={styling.stuff}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>

          <p>adipisicing elit</p>
        </div>
      </div>
    </div>
  );
}

export default AboutNumbers;
