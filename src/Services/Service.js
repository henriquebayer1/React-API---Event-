import axios from "axios";


export const eventsResource = '/Evento'
export const nextEventsResource = '/Evento/ListarProximos'
export const typeEventResource = '/TiposEvento'
export const typeEventResourceDelete = '/TiposEvento/'
export const instituicaoResource = '/Instituicao/'
export const loginResource = '/Login/'
export const myEventsResource = '/PresencasEvento/ListarMinhas'
export const presencesEventResource = '/PresencasEvento/'
export const commentaryResource = '/ComentariosEvento/'
export const commentaryResourceGetById = '/ComentariosEvento/BuscarPorIdUsuario'



// // const apiPort = '7118';
// const ApiUrl = `https://localhost:${apiPort}/api`;
const externalApiUri = 'https://eventmanhahenriquebayer.azurewebsites.net/api';

const api = axios.create({

baseURL: externalApiUri

});

export default api