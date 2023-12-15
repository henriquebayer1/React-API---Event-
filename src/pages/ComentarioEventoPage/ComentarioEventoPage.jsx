import React, { useContext, useEffect, useState } from 'react';
import './ComentarioEventoPage.css'
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
import { UserContext } from '../../Context/AuthContext';
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import TableComentarios from "./TableComentarios/TableComentarios";
import Container from "../../components/Container/Container";
import { SelectForm } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import { useLocation } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NextEvent from '../../components/NextEvent/NextEvent';

const ComentarioEventoPage = () => {

    // recupera os dados globais do usuário
    const { userData, setUserData } = useContext(UserContext);
    const [commentaryAll, setCommentaryAll] = useState([])

    const {state} = useLocation();
 
   // state do menu mobile
   const [exibeNavbar, setExibeNavbar] = useState(false);
   const [eventos, setEventos] = useState([]);
   // select mocado
   const [quaisEventos, setQuaisEventos] = useState([
     { value: "1", text: "Todos os comentarios" },
     { value: "2", text: "Meus comentarios" },
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
 
  
 
 
   
  
   useEffect(() => { LoadEvent() }, [userData.role]);
   
    
   async function LoadEvent() {
     
     
     if (userData.role === "ADM") {
      
       try {

        
        const comentariosData = await api.get(commentaryResource)
            
            
        console.log( comentariosData.data);
        setCommentaryAll(comentariosData.data)
       
       } catch (error) {
   
      alert("erro na api eventos")
       }
       
     }
   
      else if(userData.role === "Comum") {
       try { const retorno = await api.get(`${commentaryResourceGetById}?idUsuario=${userData.userId}&idEvento=${state.id}`)

          //SETAR COMO ARRAY POR TER COMO FATOR O RETORNO DA API COMO UM OBJETO E NAO COMO UMA LISTA
                const arrevent = []
                arrevent.push(retorno.data)
               setMyEvents(arrevent)
              
              console.log(retorno.data)
 
         } 
         catch (error) {
           alert("erro na api listar minhas")}}
         else {
          }
  
     
     }
 
 
 
 
 
   const GetCommentary = async () => {
 
 
     //ROTA DO PROPRIO SWAGGER POR CAUSA DO DUPLO ID REQUISITADO NA FUNCAO DA INTERFACE
 const promise = await api.get(`${commentaryResourceGetById}?idUsuario=${userData.userId}&idEvento=${idEventoConnect}`)
 setCommentary(promise.data.descricao)
 
 setIdComentario(promise.data.idComentarioEvento)
    
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
           <Title titleText={"Comentarios"} className="custom-title" />
 
          
           <TableComentarios
            dados={commentaryAll} 
            dados2={myEvents}
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
          
           
         />
       ) : null}
     </>
   );
 };

export default ComentarioEventoPage;





