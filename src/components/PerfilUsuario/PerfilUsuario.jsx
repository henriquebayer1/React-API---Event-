import React, { useContext } from "react";
import iconeLogout from "../../assets/images/icone-logout.svg";
import "./PerfilUsuario.css";
import { UserContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const PerfilUsuario = () => {

const {userData, setUserData} = useContext(UserContext);
const navigate = useNavigate();


const logOut = () => {

    localStorage.clear()
    setUserData({})
    navigate("/")
}

  return (
    <div className="perfil-usuario">
        {userData.nome ? 
        
        (
        <>
        <span className="perfil-usuario__menuitem">{userData.nome}</span>
        
        <img
        title="Deslogar"
        className="perfil-usuario__icon"
        src={iconeLogout}
        alt="imagem ilustrativa de uma porta de saída do usuário "
        onClick={logOut}
      />
      </>)

       : 
        
        (<Link to={'/login'} className="perfil-usuario__menuitem">login</Link>)}
      

      <span className="perfil-usuario__menuitem"></span>

    
    </div>
  );
};

export default PerfilUsuario;
