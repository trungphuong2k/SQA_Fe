import { Link } from "react-router-dom";
import {
  FaBuilding,
  IoBusinessSharp,
  FaSearch,
  FaConciergeBell,
  IoIosPeople,
  FaPeopleCarry,
  RiBillFill,
} from "react-icons/all";
import { PATH } from "../../constants/path";
import AVATAR from "../../assets/images/avt_admin.png";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top-nav">
        <div className="user">
          <div className="user-avatar">
            <img src={AVATAR} alt="qa"></img>
          </div>
          <div className="user-info">
            <p className="user-name">Admin</p>
            <p className="user-status">
              <span className="user-status-round"></span>
              <span className="user-status-text">Online</span>
            </p>
          </div>
        </div>
      </div>
      <div className="nav">
        <div className="main-nav">
          <div className="title">Main navigation</div>
          <ul className="list">
            <li className="item">
              <Link to={PATH.COMPANY} className="item-left">
                <span className="item-left-icon">
                  <IoBusinessSharp />
                </span>
                <span className="content">Company</span>
              </Link>
            </li>
            <li className="item">
              <Link to={PATH.SERVICE} className="item-left">
                <span className="item-left-icon">
                  <FaConciergeBell />
                </span>
                <span className="content">Service</span>
              </Link>
            </li>
            <li className="item">
              <Link to={PATH.STAFF_BUILDING} className="item-left">
                <span className="item-left-icon">
                  <FaPeopleCarry />
                </span>
                <span className="content">Staff building</span>
              </Link>
            </li>
            <li className="item">
              <Link to={PATH.BILL} className="item-left">
                <span className="item-left-icon">
                  <RiBillFill />
                </span>
                <span className="content">Bill</span>
              </Link>
            </li>
            <li className="item">
              <Link to={PATH.SALARY} className="item-left">
                <span className="item-left-icon">
                  <RiBillFill />
                </span>
                <span className="content">Slary</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
