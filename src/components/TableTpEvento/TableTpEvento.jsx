import React from "react";
import "./TableTpEvento.css";
import editPen from '../../assets/images/edit-pen.svg'
import trashDelete from '../../assets/images/trash-delete.svg'
import {dateFormatDbToView} from '../../Utils/stringFunction'

const TableTpEvento = ({dados, fnDelete = null, fnUpdate = null}) => {





  return (
    <table className="table-data">
        {/* Head */}
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Nome Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descricao
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Tipo Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Data
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>
      {/* Body */}
      <tbody>

       

        {dados.map((tp) => { return (



 <tr className="table-data__head-row" key={tp.idEvento}>
<td className="table-data__data table-data__data--big">
  {tp.nomeEvento}
</td>
<td className="table-data__data table-data__data--big">
  {tp.descricao}
</td>
<td className="table-data__data table-data__data--big">
  {tp.tiposEvento.titulo}
</td>
<td className="table-data__data table-data__data--big">
  {dateFormatDbToView(tp.dataEvento)}
</td>

<td className="table-data__data table-data__data--little">
  <img 
  className="table-data__icon" 
  src={editPen} 
  alt="" 
  onClick={(e) => {fnUpdate(tp.idEvento)}}
  />
</td>

<td className="table-data__data table-data__data--little">
  <img 
  className="table-data__icon" 
  src={trashDelete} 
  alt="" 
  idevento={tp.idEvento}
  // onClick={(e) => {fnDelete(e.target.getAttribute(idevento))}}
   onClick={(e) => {fnDelete(tp.idEvento)}}
  />
</td>
</tr> 
        )})}
        
      </tbody>
    </table>
  );
};

export default TableTpEvento;
