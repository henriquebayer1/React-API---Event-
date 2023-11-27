import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api from "../../Services/Service";
import {eventsResource, typeEventResource, nextEventsResource} from '../../Services/Service'
import Notification from "../../components/Notification/Notification";

const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);

  //Notification component state
  const [notifyUser, setNotifyUser] = useState({});
  

  // roda somente na inicialização do componente
  useEffect(()=> {
      async function getNextEvents() {
          try {
              const promise = await api.get(`${nextEventsResource}`);
              const dados = await promise.data;
              // console.log(dados);
              setNextEvents(dados);//atualiza o state
          } catch (error) {
            setNotifyUser({
              titleNote: "Error",
              textNote: `API com erro ao puxar as informacoes`,
              imgIcon: "error",
              imgAlt: "imagem de erro",
              showMessage: true,
              
                })
          }
      }
     
      getNextEvents();//chama a função

  },[]);

  return (

   

    <MainContent>

 {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">

            {//Para adicionar o java script do .map e necessario as chaves
              nextEvents.map((e) => {
                return (
                  <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                />
                );
              })
            }

          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
