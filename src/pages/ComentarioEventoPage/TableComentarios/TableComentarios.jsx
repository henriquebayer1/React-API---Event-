import React, { useContext } from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";
import {dateFormatDbToView } from "../../../Utils/stringFunction";
import Toggle from "../../../components/Toggle/Toggle";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableComentarios.css";
import { UserContext } from "../../../Context/AuthContext";

const TableComentarios = ({ opcaoAPI, dados, dados2, fnConnect = null, fnShowModal = null, idEventoC = null}) => {

  const {userData} = useContext(UserContext)
  
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Comentario
          </th>
          {/* <th className="tbal-data__head-title tbal-data__head-title--big">
            Descrição
          </th> */}
          {/* <th className="tbal-data__head-title tbal-data__head-title--big">
            Tipo
          </th> */}
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Nome
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>

{/* dados de tipo eventos */}

        {/* dados de eventos */}
{userData.role === "ADM" ? (<>{dados.map((e) => {
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.descricao}
              </td>
              {/* <td
                className="tbal-data__data tbal-data__data--big tbal-data__data--handover"
                data-tooltip-id="description-tooltip"
                data-tooltip-content={e.descricao}
                data-tooltip-place="top"
              >
                {e.descricao.substr(0, 15)} ...
                <Tooltip
                  id="description-tooltip"
                  className="custom-tootip"
                />
              </td> */}
              {/* <td className="tbal-data__data tbal-data__data--big">
                {e.tiposEvento.titulo}
              </td> */}
              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* {e.dataEvento} */}
                {e.usuario.nome}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                <img
                  className="tbal-data__icon"
                  idevento={e.evento.idEvento}
                  src={comentaryIcon}
                  alt=""
                  onClick={() => {fnShowModal(); idEventoC(e.evento.idEvento)}}
                />

                <Toggle toggleActive={e.situacao} manipulationFunction={() => {fnConnect(e.idEvento, e.situacao ? "unconnect" : "connect", e.situacao ? e.idPresencaEvento : null)}} />
              </td>
            </tr>
          );
        })}</>) : 
        
        (<>
        {userData.role === "Comum" ? (<>{dados2.map((mc) => {
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
              {mc.descricao}
              </td>
              {/* <td
                className="tbal-data__data tbal-data__data--big tbal-data__data--handover"
                data-tooltip-id="description-tooltip"
                data-tooltip-content={e.descricao}
                data-tooltip-place="top"
              >
                {e.descricao.substr(0, 15)} ...
                <Tooltip
                  id="description-tooltip"
                  className="custom-tootip"
                />
              </td> */}
              {/* <td className="tbal-data__data tbal-data__data--big">
                {e.tiposEvento.titulo}
              </td> */}
              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                {/* {e.dataEvento} */}
                {mc.usuario.nome}
              </td>
              
              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                <img
                  className="tbal-data__icon"
                  idevento={mc.evento.idEvento}
                  src={comentaryIcon}
                  alt=""
                  onClick={() => {fnShowModal(); idEventoC(mc.evento.idEvento)}}
                />

           
              </td>
            </tr>
          );
        })}</>) : 
        (<><p>VOCE NAO ESTA LOGADO</p></>)}
        
        </>)}

        
      </tbody>
    </table>
  );
};

export default TableComentarios;
