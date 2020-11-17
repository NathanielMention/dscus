import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
//use effect for avi
const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <button onClick={() => setIsModalOpen(true)} className="imgCrop">
        <img className="profilePic"></img>
      </button>

      {isModalOpen && (
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
            <button onClick={() => setIsModalOpen(false)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
