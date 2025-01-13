import type { NextPage } from "next";
import github from "../assets/github.webp";
import linkedin from "../assets/linkedin.webp";
import instagram from "../assets/instagram.webp";
import gmail from "../assets/gmail.webp";

export const About: NextPage = () => {
  return (
    <>
      <div className="about_left">
        <h1 className="about_left_head">Hi, I&apos;m Tegar Ari</h1>
        <p className="about_left_text">
          I am Senior Frontend Developer with a passion for UI/UX design and building seamless, user-friendly digital experiences. 
          Skilled in crafting intuitive interfaces and turning ideas into responsive, engaging web solutions. 
          Let’s connect and create something amazing!
        </p>
        <div className="about_left_socialMedia">
          <img src={github.src} alt="" onClick={() => window.open("https://github.com/ragetegar", "_blank")} />
          <img
            src={linkedin.src}
            alt=""
            onClick={() => window.open("https://www.linkedin.com/in/tegar-ari-pranata-35b25725/", "_blank")}
          />
          <img
            src={instagram.src}
            alt=""
            onClick={() => window.open("https://www.instagram.com/ragetegar/", "_blank")}
          />
          <img src={gmail.src} alt="" onClick={() => window.open("mailto:ragetegar@gmail.com", "_blank")} />
        </div>
        {/* <div
          className="about_left_starme"
          onClick={() => window.open("https://github.com/ragetegar", "_blank")}
        >
          ⭐ Star Me On Github
        </div> */}
      </div>
      <div className="about_right">
        <div className="about_right_profilePic" />
      </div>
    </>
  );
};
