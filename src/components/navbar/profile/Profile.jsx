import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteAvatar, uploadAvatar } from "../../../actions/user";
import './profile.css'

const Profile = () => {
  const dispatch = useDispatch();
  function changeHandler(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }
  return (
    <div className="profile">
      <NavLink className="profile__back" to="/">Back to disk</NavLink>  
      <button
        onClick={() => dispatch(deleteAvatar())}
        className="profile__delete-avatar"
      >
        Delete avatar
      </button>
      <div className="profile__upload">
        <label htmlFor="profile__upload-input" className="profile__upload-label">
          Download avatar
        </label>
        <input
          onChange={(e) => changeHandler(e)}
          type="file"
          id="profile__upload-input"
          className="profile__upload-input"
        />
      </div>
    </div>
  );
};

export default Profile;
