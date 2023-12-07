import React, { useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import { ButtonForm, InputForm } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  comentaryText = "Não informado. Não informado. Não informado.",
  userId = null,
  showHideModal = false,
  fnDelete = null,
  fnPost = null,
  fnGet = null,




}) => {

  const [comentario, setComentario] = useState("")
  const [idEvento, setIdEvento] = useState("")
  

  return (
    <div className="modal">
      <article className="modal__box">
        
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={()=> showHideModal(true)}>x</span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={() => {fnDelete()}}
          />

          <p className="comentary__text">{comentaryText}</p>

          <hr className="comentary__separator" />
        </div>

        <InputForm
          type={"text"}
          id={"comentario"}
          required={"required"}
          name={"comentario"}
          placeholder={"Digite o que achou do evento..."}
          onChange={(e) => {
            setComentario(e.target.value);
          }}
          value={comentario}
          className="comentary__entry"
        />

        <ButtonForm
          buttonText="Comentar"
          className="comentary__button"
          textButton={"Postar Comentario"}
          onClick={() => {fnPost(comentario, idEvento )}}
        />
      </article>
    </div>
  );
};

export default Modal;