import React from "react";
import Image from "next/image";
import heroImage from "../../images/photo.png";
import line from "../../images/Rectanglehelp.png";
import line2 from "../../images/Rectanglehelp.png";
import styling from "../../../styles/Home.module.css";

function AboutContact() {
  return (
    <div>
      <div className={`${styling.containerabout} ${styling.resp}`}>
        <div className="">
          <div className="">
            <div>
              <Image className="" src={line} alt="line" />
              <h1 className={styling.upperline}>Need Help ?</h1>
            </div>

            <div className={styling.dis}>
              <div className={styling.disP}>
                <p>Phone</p>
                <h2>+2349079812803</h2>
              </div>

              <div className={styling.disP}>
                <p>Email</p>
                <h2>tausart.mpape@tausart.io</h2>
              </div>

              <div className={styling.disP}>
                <p>Address</p>
                <h2>NY, Kentrow st 205/14</h2>
              </div>
            </div>
          </div>

          <div className={styling.bottom}>
            <div>
              <Image src={line2} alt="line" />
              <h1 className={styling.upperline}>Send Email</h1>
            </div>
            <form
              className={styling.form}
              action="https://formspree.io/f/mlekabld"
              method="POST"
            >
              <label className={styling.label}>
                Name:
                <br />
                <input
                  className={styling.input}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
              </label>
              <label className={styling.label}>
                Email:
                <br />
                <input
                  className={styling.input}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </label>
              <br />
              <br />
              <label className={styling.label}>
                Message:
                <br />
                <textarea
                  className={styling.textarea}
                  name="message"
                  placeholder="Type something"
                ></textarea>
              </label>
              <br />
              <br />
              <label className={styling.label}>
                <input type="checkbox" name="checkbox" id="" /> <span> </span>I
                agree to privacy policy
              </label>

              <button className={styling.button} type="submit">
                Send message
              </button>
            </form>
          </div>
        </div>

        <div className={styling.hideonmobile}>
          <Image
            src={heroImage}
            className={styling.hideonmobile}
            alt="hero-image"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutContact;
