import React, { useState } from "react";
import "./navbar.css";
import Logo from "../../assets/img/navbar_logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFile } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from "../../config";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
  function searchChangeHandler(e) {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader())
    if (e.target.value !== '') {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFile(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir))
    }
  }
  return (
    <div className="navbar">
      <div className="container">
      <NavLink to="/"><img src={Logo} alt="" className="navbar__logo" /></NavLink>
        <div className="navbar__header">CLOUD</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={(e) => searchChangeHandler(e)}
            className="navbar__search"
            type="text"
            placeholder="Search..."
          />
        )}
        
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login"> Log in</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Sign up</NavLink>
          </div>
        )}
        {isAuth && (<div style={{margin:'auto'}}>{currentUser.email}</div>)}
        {isAuth && (
          <div className="navbar__login" onClick={() => dispatch(logout())}>
            Log out
          </div>
        )}
        {isAuth && <NavLink to='/profile'>
          <img className="navbar__avatar" src={avatar} alt="" />
        </NavLink> }
      </div>
    </div>
  );
};

export default Navbar;
