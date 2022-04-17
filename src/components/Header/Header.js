import { FaBars, FaEnvelope, FaBell, FaFlag, FaCogs } from "react-icons/fa";
import AVATAR from "../../assets/images/avt_admin.png";
import "./Header.scss";

const Header = () => {
  return (
    <nav className="header">
      <div className="nav-brand">
        <b>LANDMARK</b>
      </div>
      <div className="main-header">
        <span className="icon">
          <FaBars />
        </span>
        <div className="menu">
          <div className="menu-info">
            <span className="person-avatar">
              <img src={AVATAR} alt="qa" />
            </span>
            <span className="person-name">Admin</span>
          </div>
          <span className="icon">
            <FaCogs />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
