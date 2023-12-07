import React from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";
import {dateFormatDbToView } from "../../../Utils/stringFunction";
import Toggle from "../../../components/Toggle/Toggle";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableEvA.css";

const TableEvA = ({ opcaoAPI, dados, dados2, fnConnect = null, fnShowModal = null, idEventoC = null}) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          {/* <th className="tbal-data__head-title tbal-data__head-title--big">
            Descrição
          </th> */}
          {/* <th className="tbal-data__head-title tbal-data__head-title--big">
            Tipo
          </th> */}
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>

{/* dados de tipo eventos */}

        {/* dados de eventos */}
{opcaoAPI === "1" ? (<>{dados.map((e) => {
          return (
            <tr className="tbal-data__head-row" key={Math.random()}>
              <td className="tbal-data__data tbal-data__data--big">
                {e.nomeEvento}
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
                {e.dataEvento}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                <img
                  className="tbal-data__icon"
                  idevento={e.idEvento}
                  src={comentaryIcon}
                  alt=""
                  onClick={() => {fnShowModal()}}
                />

                <Toggle toggleActive={e.situacao} manipulationFunction={() => {fnConnect(e.idEvento, e.situacao ? "unconnect" : "connect", e.situacao ? e.idPresencaEvento : null)}} />
              </td>
            </tr>
          );
        })}</>) : 
        
        (<>{dados2.map((me) => {
          return (
            <tr className="tbal-data__head-row" key={me.evento.idEvento}>
              <td className="tbal-data__data tbal-data__data--big">
                {me.evento.nomeEvento}
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
                {me.dataEvento}
              </td>

              <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                <img
                  className="tbal-data__icon"
                  idevento={me.idEvento}
                  src={comentaryIcon}
                  alt=""
                  onClick={fnShowModal}
                />

                <Toggle toggleActive={me.situacao} manipulationFunction={() => {fnConnect(me.idEvento, me.situacao ? "unconnect" : "connect", me.situacao ? me.idPresencaEvento : null)}} />
              </td>
            </tr>
          );
        })}</>
           )}

        
      </tbody>
    </table>
  );
};

export default TableEvA;
