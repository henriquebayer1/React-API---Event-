import { jwtDecode } from "jwt-decode";
import { createContext } from "react";


export const UserContext = createContext(null)

export const userDecodeToken = (token) => {
const decoded = jwtDecode(token)

return {role: decoded.role, nome: decoded.name, userId: decoded.jti, token: token}


}