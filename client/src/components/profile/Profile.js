import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
import "../../../styles/Profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleSubmit() {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        history.push("/login");
      }
    });
  }

  return (
    <div>
      <div className="overlay">
        <div className="modalContent">
          <p>
            <span>
              <button className="btn">Edit Avatar</button>
            </span>
          </p>
          <p>
            <span>
              <button onClick={handleSubmit} className="btn">
                Logout
              </button>
            </span>
          </p>
          <button className="btn" onClick={() => history.push("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
