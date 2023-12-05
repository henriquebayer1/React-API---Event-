import {React, useState} from "react";
import "./EventosPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";

import {
  eventsResource,
  typeEventResource,
  nextEventsResource,
  typeEventResourceDelete,
  instituicaoResource
} from "../../Services/Service";
import {
  ButtonForm,
  InputForm,
  LabelForm,
  SelectForm,
} from "../../components/FormComponents/FormComponents";
import api from "../../Services/Service";
import TableTpEvento from "../../components/TableTpEvento/TableTpEvento";
import { useEffect } from "react";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";


const EventosPage = () => {
//FUNCAO DE MUDAR DE TELA DE CADASTRO E EDIT
const [frmEdit, setFrmEdit] = useState(false); //Esta em modo de edicao ou nao

//VALOR DO INPUT TELA DE CADASTRO E EDIT INPUT: Nome do evento
const [nomeEvento, setNomeEvento] = useState("");

//VALOR DO INPUT TELA DE CADASTRO E EDIT INPUT: Descricao do evento
const [desc, setDesc] = useState("");

//VALOR DO INPUT TELA DE CADASTRO E EDIT INPUT: Data Evento
const [dat, setDat] = useState("");

//VALOR DO INPUT TELA DE CADASTRO E EDIT INPUT: SELECT Tipo Evento
const [selectTipoEvent, setSelectTipoEvent] = useState("");

//VALOR DO INPUT TELA DE CADASTRO E EDIT INPUT: SELECT Instituicao
const [selectInst, setSelectInst] = useState("");

//Notification component state
const [notifyUser, setNotifyUser] = useState({});

//state para array de objetos de Eventos da API 
const [eventos, setEventos] = useState([]);

//state para array de objetos de Eventos da API 
const [tipoEventos, setTipoEventos] = useState([]);

//state para array de objetos de Eventos da API 
const [instituicao, setInstituicao] = useState([]);

//Pegar o ID do evento para a tela de Edicao
//OBS: VEM DA FUNCAO DE ONCLICK DA TABLETPEVENTO, PODE PEGAR TABEM TODOS OS OBJETOS
//PELO MAP E COLOCAR O USE STATE COMO UM OBJETO E COLOCAR PLEO CLIQUE TODOS OS DADOS DE UMA VEZ
const [idEventoedit, setIdEvento] = useState(null);


//FUNCAO DE CHAMADA DA API 

useEffect(() => {
async function LoadAPIData() {

try {

  const retornoApi = await api.get(eventsResource)
  setEventos(retornoApi.data)
 
  
} catch (error) {
  setNotifyUser({
    titleNote: "Erro",
    textNote: `API nao conseguiu puxar as informacoes da rota de eventos`,
    imgIcon: "error",
    imgAlt: "imagem de sucesso",
    showMessage: true,
    
      })

  
}}

LoadAPIData();}, [])

useEffect(() => {async function LoadApiTipoEvento() {

  try {
    const retorno = await api.get(typeEventResource)
    setTipoEventos(retorno.data)
    
    
  } catch (error) {

    setNotifyUser({
      titleNote: "Erro",
      textNote: `API nao conseguiu puxar as informacoes da rota de Tipo de Eventos`,
      imgIcon: "error",
      imgAlt: "imagem de sucesso",
      showMessage: true,
      
        })
  
  }
    
    
  } LoadApiTipoEvento() }, [])


  useEffect(() => {async function LoadApiInstiuicao() {

    try {
      const retorno = await api.get(instituicaoResource)
      setInstituicao(retorno.data)
      
      
    } catch (error) {

      setNotifyUser({
      titleNote: "Erro",
      textNote: `API nao conseguiu puxar as informacoes da rota de Instituicao`,
      imgIcon: "error",
      imgAlt: "imagem de sucesso",
      showMessage: true,
      
        })
    }
      
      
    } LoadApiInstiuicao() }, [])
  

    //Funcao de criar um array para o select de tipoEventos
  function arrMapTipoEvent() {
    var tipoEventoArr = tipoEventos;
    var objetoarr = []
  
    tipoEventoArr.forEach((e) => {
   objetoarr.push({value: e.idTipoEvento,
    text: e.titulo
    })     
    });
    
 return objetoarr
  
  }
 
   //Funcao de criar um array para o select de Instituicao
  function arrMapInst() {
    var instituicoes = instituicao;
    var objetoarr = []
  
    instituicoes.forEach((e) => {
   objetoarr.push({value: e.idInstituicao,
    text: e.nomeFantasia
    })     
    });
    
 return objetoarr
  
  }
 


async function handleSubmit(e) {
e.preventDefault()

try {
  const retorno = await api.post(eventsResource, {
    dataEvento: dat,
    nomeEvento: nomeEvento,
    descricao: desc,
    idTipoEvento: selectTipoEvent,
    idInstituicao: selectInst
  })

  setNotifyUser({
    titleNote: "Sucesso",
    textNote: `Evento cadastrado com sucesso`,
    imgIcon: "success",
    imgAlt: "imagem de sucesso",
    showMessage: true,
    
      })

 setDat("")
 setDesc("")
 setNomeEvento("")
 setSelectInst("")
 setSelectTipoEvent("")

 const retornoApi = await api.get(eventsResource)
 setEventos(retornoApi.data)
 

} catch (error) {
  setNotifyUser({
    titleNote: "Erro",
    textNote: `Evento cadastrado com sucesso`,
    imgIcon: "error",
    imgAlt: "imagem de sucesso",
    showMessage: true,
    
      })
}

  
}

async function handleUpdate(e) {
e.preventDefault()

  try {
    const retorno = await api.put(`${eventsResource}/${idEventoedit}`, {dataEvento: dat,
      nomeEvento: nomeEvento,
      descricao: desc,
      idTipoEvento: selectTipoEvent,
      idInstituicao: selectInst})

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Evento atualizado com sucesso`,
        imgIcon: "success",
        imgAlt: "imagem de sucesso",
        showMessage: true,
        
          })

      const retornoApi = await api.get(eventsResource)
 setEventos(retornoApi.data)
 
    
  } catch (error) {
    setNotifyUser({
      titleNote: "Erro",
      textNote: `Erro ao atualizar`,
      imgIcon: "error",
      imgAlt: "imagem de sucesso",
      showMessage: true,
      
        })
  }
  
}

async function handleDelete(idEvent) {
try {
  if (!window.confirm ("Confirma a exclusao?")) {
    return;
  }

  const retornoDelete = await api.delete(`${eventsResource}/${idEvent}`) 

  setNotifyUser({
    titleNote: "Sucesso",
    textNote: `Evento deletado com sucesso`,
    imgIcon: "success",
    imgAlt: "imagem de sucesso",
    showMessage: true,
    
      })

  const retornoApi = await api.get(eventsResource)
  setEventos(retornoApi.data)
  
} 
catch (error) {
  setNotifyUser({
    titleNote: "Erro",
    textNote: `Erro ao Deletar`,
    imgIcon: "error",
    imgAlt: "imagem de sucesso",
    showMessage: true,
    
      })
}

  
  
}

async function showEditForm(idEvent) {
setFrmEdit(true)
setIdEvento(idEvent)

try {
  const retorno = await api.get(`${eventsResource}/${idEvent}`)
  setNomeEvento(retorno.data.nomeEvento)
  setDesc(retorno.data.descricao)
  setDat(new Date (retorno.data.dataEvento).toLocaleDateString("sv-SE"))
  // setSelectInst(retorno.data.nomeFantasia)
  // setSelectTipoEvent(retorno.data.titulo)

  


} catch (error) {
  setNotifyUser({
    titleNote: "Erro",
    textNote: `Erro na API`,
    imgIcon: "error",
    imgAlt: "imagem de sucesso",
    showMessage: true,
    
      })
}
  
}

function editActionAbort() {
  setFrmEdit(false)
  setDat("")
  setDesc("")
  setNomeEvento("")
  setSelectInst("")
  setSelectTipoEvent("")
}



  return (
    <>
   
    {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

      <MainContent>
      {console.log(eventos)}
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro de Eventos"} />

              <ImageIllustrator
                imageName={"tipo-evento"}
                alteText={"imagem de tipo evento"}
              />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {!frmEdit ? (
                  //Cadastrar
                  <>
                    <InputForm
                      type={"text"}
                      id={"nomeEvento"}
                      required={"required"}
                      name={"nomeEvento"}
                      placeholder={"Digite o nome do evento"}
                      onChange={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                      value={nomeEvento}
                    />
                    
                    <InputForm
                      type={"text"}
                      id={"Descricao"}
                      required={"required"}
                      name={"Descricao"}
                      placeholder={"Digite a descricao do evento"}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      value={desc}
                    />
                    <SelectForm
                     name={"Select-Event"} 
                     id={"Select-Event"}
                     required={"required"}
                    manipulationFunction={(e) => {setSelectTipoEvent(e.target.value)}}
                     options={arrMapTipoEvent()}
                     defaultValue={selectTipoEvent}
                     selectValue={"Selecione o Tipo de Evento"}
                    />
            
                
                    <SelectForm
                     name={"Select-Instituicao"} 
                     id={"Select-Instituicao"}
                     required={"required"}
                     manipulationFunction={(e) => {setSelectInst(e.target.value)}}
                     options={arrMapInst()}
                     defaultValue={selectInst}
                     selectValue={"Selecione a Instituicao"}
                    />
            
                    <InputForm
                      type={"date"}
                      id={"Data"}
                      required={"required"}
                      name={"Data"}
                      placeholder={"dd/mm/aaaa"}
                      onChange={(e) => {
                        setDat(e.target.value);
                      }}
                      value={new Date (dat).toLocaleDateString("sv-SE")}
                    />

                    <ButtonForm
                      textButton={"Cadastrar"}
                      id={"cadastrar"}
                      name={"cadastrar"}
                      type={"submit"}
                    />
                   
                  </>

                ) : (
                  //Editar
                  <>Tela de Edicao

                    <InputForm
                      type={"text"}
                      id={"nomeEvento"}
                      required={"required"}
                      name={"nomeEvento"}
                      placeholder={"Digite o nome do evento"}
                      onChange={(e) => {
                        setNomeEvento(e.target.value);
                      }}
                      value={nomeEvento}
                    />
                    
                    <InputForm
                      type={"text"}
                      id={"Descricao"}
                      required={"required"}
                      name={"Descricao"}
                      placeholder={"Digite a descricao do evento"}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      value={desc}
                    />
                    <SelectForm
                     name={"Select-Event"} 
                     id={"Select-Event"}
                     required={"required"}
                    manipulationFunction={(e) => {setSelectTipoEvent(e.target.value)}}
                     options={arrMapTipoEvent()}
                     defaultValue={selectTipoEvent}
                     selectValue={"Selecione o Tipo de Evento"}
                    />
            
                
                    <SelectForm
                     name={"Select-Instituicao"} 
                     id={"Select-Instituicao"}
                     required={"required"}
                     manipulationFunction={(e) => {setSelectInst(e.target.value)}}
                     options={arrMapInst()}
                     defaultValue={selectInst}
                     selectValue={"Selecione a Instituicao"}
                    />
            
                    <InputForm
                      type={"date"}
                      id={"Data"}
                      required={"required"}
                      name={"Data"}
                      placeholder={"dd/mm/aaaa"}
                      onChange={(e) => {
                        setDat(e.target.value);
                      }}
                      value={dat}
                    />


                  <div className="buttons-editbox">

                   <ButtonForm
                      textButton={"Atualizar"}
                      id={"atualizar"}
                      name={"atualizar"}
                      type={"submit"}
                   addClass="button-component-middle"
                   manipulationFunction={handleUpdate}
                    />

                    <ButtonForm
                      textButton={"Cancelar"}
                      id={"cancelar"}
                      name={"cancelar"}
                      manipulationFunction={editActionAbort}
                      addClass="button-component-middle"
                    />

                  </div>
                  
                  
                  </>
                  
                )}
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>

                  <Title
                  titleText={"Lista de Eventos"}
                  color="white"
                  />

                    <TableTpEvento
                    dados={eventos}
                    fnDelete={handleDelete}
                    fnUpdate={showEditForm}
                    />
                    
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default EventosPage;
