import { Link } from "react-router-dom";
import "./style.scss";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg__footer">
      <footer className="container">
        <div className="menu-list">
          <Link to={"#"} className="Link">
            .Termd and privacy
          </Link>
          <Link to={`#`} className="Link">
            Send us feedback.
          </Link>
          <Link to={`#`} className="Link">
            Help
          </Link>
        </div>
        <div className="desc__footer">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quasi
            architecto sapiente quam! Deserunt molestiae dolore aliquid minima
            eum provident?
          </p>
        </div>
        <div className="media">
          <li>
            <FaFacebook className="icon" />
          </li>
          <li>
            <FaInstagram className="icon" />
          </li>
          <li>
            <FaGithub className="icon" />
          </li>
          <li>
            <FaTwitter className="icon" />
          </li>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
