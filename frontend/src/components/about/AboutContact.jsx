import React from "react";
import Image from "next/image";
import heroImage from "../../images/photo.png";

function AboutContact() {
  return (
    <div>
      <div className="containerabout">
        <div>
          <div>
            <div>
              <h1>Need Help ?</h1>
            </div>

            <div className="dis">
              <div className="disP">
                <p>Phone</p>
                <h2>+2349079812803</h2>
              </div>

              <div className="disP">
                <p>Email</p>
                <h2>tausart.mpape@tausart.io</h2>
              </div>

              <div className="disP">
                <p>Address</p>
                <h2>NY, Kentrow st 205/14</h2>
              </div>
            </div>
          </div>

          <div>
            <form
              className="form"
              action="https://formspree.io/f/mlekabld"
              method="POST"
            >
              <label className="label">
                Name:
                <br />
                <input className="input" type="text" name="name" />
              </label>
              <label className="label">
                Email:
                <br />
                <input className="input" type="email" name="email" />
              </label>
              <br />
              <br />
              <label className="label">
                Message:
                <br />
                <textarea className="textarea" name="message"></textarea>
              </label>
              <br />
              <br />
              <label className="label">
                <input type="checkbox" name="checkbox" id="" /> <span> </span>I
                agree to privacy policy
              </label>

              <button className="button" type="submit">
                Send message
              </button>
            </form>
          </div>
        </div>

        <div>
          <Image src={heroImage} alt="hero-image" />
        </div>
      </div>
    </div>
  );
}

export default AboutContact;
