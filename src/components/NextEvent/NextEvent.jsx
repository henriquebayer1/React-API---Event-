import React, { useContext } from "react";
import "./NextEvent.css";
import {dateFormatDbToView} from '../../Utils/stringFunction'
import { Tooltip } from "react-tooltip";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AuthContext";
import api, 
{
    eventsResource,
    typeEventResource,
    nextEventsResource,
    typeEventResourceDelete,
    instituicaoResource,
    myEventsResource,
    commentaryResource, 
    commentaryResourceGetById,
    presencesEventResource
} from '../../Services/Service'

const NextEvent = ({ title, description, eventDate, idEvent }) => {
    const {userData} = useContext(UserContext)
    const navigate = useNavigate();

    const ToComentariosPage = () => {
      navigate('/comentarios-eventos', {state:{id: idEvent}});
        }

    async function conectar(idEvent) {
      try {     //ROTA DO PROPRIO SWAGGER POR CAUSA DO DUPLO ID REQUISITADO NA FUNCAO DA INTERFACE
        const promise = await api.get(`${commentaryResourceGetById}?idUsuario=${userData.userId}&idEvento=${idEvent}`)
        

        } catch (error) {
          alert("erro na api listar minhas")}
    }
  return (

    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>
      
      <p className="event-card__description"
       data-tooltip-id={idEvent}
       data-tooltip-content={description}
       data-tooltip-place="top">

        <Tooltip id={idEvent} className="tooltip"/>
        {description.substr(0, 15)}...

        </p>
      
      <p className="event-card__description">{ dateFormatDbToView(eventDate) }</p>

      <a onClick={ToComentariosPage}  className="event-card__connect-link">Conectar</a>
    </article>

  );
};

export default NextEvent;
