import type { NextPage } from "next";
import Github from "../assets/github.webp";
import Linkedin from "../assets/linkedin.webp";
import Instagram from "../assets/instagram.webp";
import Gmail from "../assets/gmail.webp";

export const Footer: NextPage = () => {
  return (
    <footer className="footer">
      <div className="footer_copyright">
        <p className="footer_copyright_textOne">copyright - Tegar Ari.</p>
        <p className="footer_copyright_textTwo">2020 - 2025</p>
      </div>
      <div className="footer_socialMedia">
        <p>Connect with me !</p>
        <div className="footer_socialMedia_links">
          <img src={Github.src} alt="" onClick={() => window.open("https://github.com/ragetegar", "_blank")} />
          <img
            src={Linkedin.src}
            alt=""
            onClick={() => window.open("https://www.linkedin.com/in/tegar-ari-pranata-35b25725/", "_blank")}
          />
          <img
            src={Instagram.src}
            alt=""
            onClick={() => window.open("https://www.instagram.com/ragetegar/", "_blank")}
          />
          <img src={Gmail.src} alt="" onClick={() => window.open("mailto:ragetegar@gmail.com", "_blank")} />
        </div>
      </div>
    </footer>
  );
};
