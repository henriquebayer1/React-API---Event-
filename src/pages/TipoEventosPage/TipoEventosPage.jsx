import React, { useState } from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import {
  eventsResource,
  typeEventResource,
  nextEventsResource,
  typeEventResourceDelete
} from "../../Services/Service";
import {
  ButtonForm,
  InputForm,
  LabelForm,
  SelectForm,
} from "../../components/FormComponents/FormComponents";
import api from "../../Services/Service";
import TableTp from "../../components/TableTp/TableTp";
import { useEffect } from "react";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";


const TipoEventosPage = () => {
  //FUNCAO DE MUDAR DE TELA DE CADASTRO E EDIT
  const [frmEdit, setFrmEdit] = useState(false); //Esta em modo de edicao ou nao

  //VALOR DO INPUT TELA DE CADASTRO E EDIT
  const [titulo, setTitulo] = useState("");

  //Notification component state
  const [notifyUser, setNotifyUser] = useState({});

  //state para array de objetos de tipoEventos da API 
  const [tipoEventos, setTipoEventos] = useState([]);

  //Pegar o ID do evento para a tela de Edicao
  const [idEvento, setIdEvento] = useState(null);

  //Pegar o ID do evento para a tela de Edicao
  const [showSpinner, setShowSpinner] = useState(false);

useEffect(() => {
async function loadDataEvent() {
  setShowSpinner(true)

  try {
    const retorno = await api.get(typeEventResource)
    setTipoEventos(retorno.data)
   
  } catch (error) {
    alert("erro na api")
  }
  
  setShowSpinner(false)
}
loadDataEvent();}, [])



  async function handleSubmit(event) {
    event.preventDefault();

    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `Titulo do evento deve ter no minimo 3 caracteres`,
        imgIcon: "warning",
        imgAlt: "imagem de aviso",
        showMessage: true,
        
          })
    }

    try {
      const retorno = await api.post(typeEventResource, { titulo: titulo });
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Evento cadastrado com sucesso`,
        imgIcon: "success",
        imgAlt: "imagem de sucesso",
        showMessage: true,
        
          })
      setTitulo("");

      //seta o array novamente e atualiza a lista de tipo evento em sua vizualizacao
      const buscaEventos = await api.get(typeEventResource)
      setTipoEventos(buscaEventos.data)
    } catch (error) {
      setNotifyUser({
        titleNote: "Submit Error",
        textNote: `Nao foi possivel cadastrar o evento`,
        imgIcon: "error",
        imgAlt: "imagem de erro",
        showMessage: true,
        
          })
    }
  }

  async function handleUpdate(e) {
    e.preventDefault()
   
try {

  const retorno = await api.put(`${typeEventResource}/${idEvento}`,{
    titulo: titulo
});
//Id Esta no State definido especificamente para a edicao


  if (retorno.status === 204) {

    setNotifyUser({
      titleNote: "Atualizado",
      textNote: `Evento atualizado com sucesso`,
      imgIcon: "success",
      imgAlt: "imagem de sucesso",
      showMessage: true,})

  }

  const inforeturn = await api.get(`${typeEventResource}`)
  setTipoEventos(inforeturn.data)


 editActionAbort();
  
} catch (error) {
  setNotifyUser({
    titleNote: "Error",
    textNote: `Erro em atualizar`,
    imgIcon: "error",
    imgAlt: "imagem de erro",
    showMessage: true,
    
      })
  
}
    
  }

 async function showEditForm(idEvento) {
    setFrmEdit(true)
    setIdEvento(idEvento)

  try {
   const retorno = await api.get(`${typeEventResource}/${idEvento}`)
   setTitulo(retorno.data.titulo)

    
  } catch (error) {
    setNotifyUser({
      titleNote: "Error",
      textNote: `Deu erro em puxar as informacoes`,
      imgIcon: "error",
      imgAlt: "imagem de erro",
      showMessage: true,
      
        })
  }


    
  }



function editActionAbort() {
  setFrmEdit(false)
  setTitulo("")
  setIdEvento(null)
}

// function magic() {

//   setNotifyUser({
// titleNote: "Sucesso",
// textNote: `Evento excluido com sucesso`,
// imgIcon: "success",
// imgAlt: "imagem de sucesso",
// showMessage: true,})
  
// }

async function handleDelete(idEvento) {

  if (!window.confirm("confirma a exclusao?")) {
    return;
    
  }

try {
const deletarData = await api.delete(`${typeEventResource}/${idEvento}`)

if (deletarData.status == 204) {

  setNotifyUser({
    titleNote: "Sucesso",
    textNote: `Evento excluido com sucesso`,
    imgIcon: "success",
    imgAlt: "imagem de sucesso",
    showMessage: true,
    
      })
  
}

const retornoEventos = await api.get(typeEventResource)
setTipoEventos(retornoEventos.data)


} catch (error) {
  setNotifyUser({
    titleNote: "Error",
    textNote: `Evento excluido com sucesso`,
    imgIcon: "error",
    imgAlt: "imagem de erro",
    showMessage: true,
    
      })

}

  
}



  return (
    <>
    {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
    {showSpinner ? <Spinner/> : null}

      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro Tipo de Eventos"} />

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
                      id={"Titulo"}
                      required={"required"}
                      name={"Titulo"}
                      placeholder={"Digite aqui"}
                      onChange={(e) => {
                        setTitulo(e.target.value);
                      }}
                      value={titulo}
                    />

                    <ButtonForm
                      textButton={"Cadastrar"}
                      id={"cadastrar"}
                      name={"cadastrar"}
                      type={"submit"}
                    />
                    {/* <ButtonForm
                      textButton={"Magica"}
                      id={"cadastrar"}
                      name={"cadastrar"}
                      type={"submit"}
                      // manipulationFunction={magic}
                    /> */}

                  </>

                ) : (
                  //Editar
                  <>Tela de Edicao

                    <InputForm
                      type={"text"}
                      id={"Titulo"}
                      required={"required"}
                      name={"Titulo"}
                      placeholder={"Digite aqui"}
                      onChange={(e) => {
                        setTitulo(e.target.value);
                      }}
                      value={titulo}
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
                  titleText={"Lista Tipo de Eventos"}
                  color="white"
                  />

                    <TableTp
                    dados={tipoEventos}
                    fnDelete={handleDelete}
                    fnUpdate={showEditForm}
                    />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
