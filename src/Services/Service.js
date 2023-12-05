import axios from "axios";


export const eventsResource = '/Evento'
export const nextEventsResource = '/Evento/ListarProximos'
export const typeEventResource = '/TiposEvento'
export const typeEventResourceDelete = '/TiposEvento/'
export const instituicaoResource = '/Instituicao/'
export const loginResource = '/Login/'
export const myEventsResource = '/PresencasEvento/ListarMinhas'



const apiPort = '7118';
const ApiUrl = `https://localhost:${apiPort}/api`
const externalApiUri = null;

const api = axios.create({

baseURL: ApiUrl

});

export default api