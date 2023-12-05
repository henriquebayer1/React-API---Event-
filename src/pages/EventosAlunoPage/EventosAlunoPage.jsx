import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { SelectForm } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api from "../../Services/Service";
import setNotifyUser from "../../components/Notification/Notification"
import {
    eventsResource,
    typeEventResource,
    nextEventsResource,
    typeEventResourceDelete,
    instituicaoResource,
    myEventsResource
  } from "../../Services/Service";
import "./EventosAlunoPage.css";
import { UserContext } from "../../Context/AuthContext";
import TableEvA from "./TableEvA/TableEvA";



const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: "1", text: "Todos os eventos" },
    { value: "2", text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState([]); 
  const [myEvents, setMyEvents] = useState([]); 
  const [op, setOp] = useState(""); 
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

 
  useEffect(() => {async function LoadEvent() {
    
    if (op === "1") {
      try {
        const retorno = await api.get(eventsResource)
        setEventos(retorno.data)
        
        
      } catch (error) {
  
     alert("erro na api eventos")
      }
      
    }
  
   else if (op === "2") {
      try { const retorno2 = await api.get(`${myEventsResource}/${userData.userId}`)
              setMyEvents(retorno2.data)
              console.log(retorno2.data);
              
           

        } catch (error) {
          alert("erro na api listar minhas")}}
        
  
    
    } LoadEvent() }, [op]);
  
   



//   toggle meus eventos ou todos os eventos
  // function myEvents(tpEvent) {
  //   setOp(tpEvent);
  // }

  async function loadMyComentary(idComentary) {
    return "????";
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  function handleConnect() {
    
  }
  return (
    <>
  
      

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <SelectForm
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => setOp(e.target.value)} // aqui só a variável state
            defaultValue={op}
            addClass="select-tp-evento"
          />

          <Table
           dados={eventos} 
           dados2={myEvents}
           opcaoAPI={op}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
          
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;