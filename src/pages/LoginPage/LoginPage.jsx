import React, { useContext, useEffect } from "react";
import ImageIllustrator from '../../components/ImageIllustrator/ImageIllustrator';
import logo from "../../assets/images/logo-pink.svg";
import {
    ButtonForm,
    InputForm,
    LabelForm,
    SelectForm,
  } from "../../components/FormComponents/FormComponents";
import "./LoginPage.css";
import { useState } from "react";
import api from "../../Services/Service";
import {
    eventsResource,
    typeEventResource,
    nextEventsResource,
    typeEventResourceDelete,
    instituicaoResource,
    loginResource
  } from "../../Services/Service";
import { UserContext, userDecodeToken } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    //const para uso do navigate vindo do react-router-dom
    const navigate = useNavigate();

    //const vinda do context para uso global 
    const {userData, setUserData} = useContext(UserContext)

    const [user, setUser] = useState({email: "henrique@gmail.com", senha: "123456"});



useEffect(() => {

if (userData.nome) {
  navigate("/")
}

}, [userData])


   async function handleSubmit(e) 
    {
e.preventDefault()

if (user.email.length >= 3 || user.senha.length >= 3 ) {

    try { const promiseToken = await api.post(loginResource, {
    email: user.email,
    senha: user.senha
    
   
})
    
//Usar a funcao do context criada para acessar todas as props do objeto vindo do token de puro codigo
const userFullToken = userDecodeToken(promiseToken.data.token)


setUserData(userFullToken)


localStorage.setItem("token", JSON.stringify(userFullToken))

//navigate para ir para a home depois de logar
navigate("/")

    } catch (error) {
        alert("error api")
    }
    
}
else {

    alert("Email e Senha devem conter no minimo 3 caracteres")

}


    }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate"></div>
          <ImageIllustrator
            imageName="login"
            altText="Imagem de um homem em frente de uma porta de entrada"
            addClass="login-illustrator "
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <InputForm
              addClass="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              onChange={(e) => {setUser({...user, email: e.target.value.trim()})}}
              placeholder="Username"
            />
            <InputForm
              addClass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              onChange={(e) => {setUser({...user, senha: e.target.value.trim()})}}
              placeholder="****"
            />

            <a href="" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <ButtonForm
            textButton={"Login"}
              buttonText="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              className="frm-login__button"
              onClick={()=>{}}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
