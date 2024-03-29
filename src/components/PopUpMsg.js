import React from "react";

function PopUpMsg ({ text, closePopup }){
    return(
        <div className="popup-container">
            <div className="popup-body">
            <p>{text}</p>
            <button onClick={closePopup}>Close </button>
            </div>
        </div>

    )
}

export default PopUpMsg;