import React, { useContext, useEffect, useState } from "react";

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
    myEventsResource,
    commentaryResource, 
    commentaryResourceGetById,
    presencesEventResource

  } from "../../Services/Service";
import "./EventosAlunoPage.css";
import { UserContext } from "../../Context/AuthContext";
import TableEvA from "./TableEvA/TableEvA";



const EventosAlunoPage = () => {

   // recupera os dados globais do usuário
   const { userData, setUserData } = useContext(UserContext);

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

  //ID DO EVENTO DA TABLE VINDO PARA USO NAS FUNCOES DE COMENTARIO NO CLICK IMG COMMENTARY
  const [idEventoConnect, setIdEventoConnect] = useState("");

  //State para view de comentario
  const [commentary, setCommentary] = useState("");
  //State para view de comentario
  const [idComentario, setIdComentario] = useState("");

 

  const verificaPresenca = (arrAllEvents, eventsUser) => {

    for(let x = 0; x < arrAllEvents.length; x++){
for(let i = 0; i < eventsUser.length; i++) {
if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {
    arrAllEvents[x].situacao = true;
    arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento

    break;
}}}

return arrAllEvents;
};
  
 
  useEffect(() => { LoadEvent() }, [op, userData.userId]);
  
   
  async function LoadEvent() {
    
    
    if (op === "1") {
      try {
        const todosOsEventos = await api.get(eventsResource)
        const meusEventos = await api.get(`${myEventsResource}/${userData.userId}`)
        
        
        const eventosMarcados = verificaPresenca(todosOsEventos.data, meusEventos.data)
        setEventos(eventosMarcados)
      
        // console.log("vrebv2geu");
        // console.log(eventosMarcados);
        
      } catch (error) {
  
     alert("erro na api eventos")
      }
      
    }
  
     else if (op === "2") {
      try { const retorno2 = await api.get(`${myEventsResource}/${userData.userId}`)
              setMyEvents(retorno2.data)
             
              console.log("vrebv2geu");
              console.log(retorno2.data);
           

        } catch (error) {
          alert("erro na api listar minhas")}}
        
  else {
    setOp("1")
  }
    
    }



//   toggle meus eventos ou todos os eventos
  // function myEvents(tpEvent) {
  //   setOp(tpEvent);
  // }

  const GetCommentary = async () => {


    //ROTA DO PROPRIO SWAGGER POR CAUSA DO DUPLO ID REQUISITADO NA FUNCAO DA INTERFACE
const promise = await api.get(`${commentaryResourceGetById}?idUsuario=${userData.userId}&idEvento=${idEventoConnect}`)
setCommentary(promise.data.descricao)

setIdComentario(promise.data.idComentarioEvento)
   
  }


  async function PostCommentary(comentario) {

    try {
   
      
    
      const postCommentary = await api.post(commentaryResource,{ 
        descricao: comentario,
        exibe: true,
        idUsuario: userData.userId,
        idEvento: idEventoConnect
      })
      
    } catch (error) {

   alert("erro na api eventos")
    }



    
  }
  async function DeleteCommentary() {
const getCommentary = await api.get(commentaryResource)


    const deleteCommentary = await api.delete(`${commentaryResource}${idComentario}`)
    console.log(deleteCommentary.status);
  }

  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  

  async function handleConnect(eventId, whatfunction, presencaId = null) {

   
      if (whatfunction === "connect") {
        
        try {const promise = await api.post(presencesEventResource, {situacao: true,
          idUsuario: userData.userId,
          idEvento:  eventId})

          if (promise.status === 201) {
            alert("presenca confirmada")
          }

          
          
        } catch (error) {
          
        }
        return;
      }
     
  //unconnect
  try {
    const unconnect = await api.delete(`${presencesEventResource}${presencaId}`)
    


  } catch (error) {
    alert("erro no unconnect")
    
  }
    
   
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
            selectValue={"Selecione uma das opcoes"}
          />

          <Table
           dados={eventos} 
           dados2={myEvents}
           opcaoAPI={op}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
            idEventoC={setIdEventoConnect}
          />
          
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          comentaryText={commentary}
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={GetCommentary}
          fnPost={PostCommentary}
          fnDelete={DeleteCommentary}
          
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;