import React from "react";

import "./Toggle.css";

const verificaPresenca = (arrAllEvents, eventsUser) => {

    for(let x = 0; x < arrAllEvents.length; x++){
for(let i = 0; i < eventsUser.length; i++) {
if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
    arrAllEvents[x].situacao = true;
    break;
}

}

    }


}


const Toggle = ({manipulationFunction = null, toggleActive = false}) => {
  return (
    <>
      <input type="checkbox" id={"switch-check"} className="toggle__switch-check" />

      <label className={`toggle ${toggleActive ? "toggle--active" : ""}`} htmlFor="switch-check" onClick={manipulationFunction}>
        <div className={`toggle__switch ${toggleActive ? "toggle__switch--active" : ""}`}></div>
      </label>
    </>
  );
};

export default Toggle;