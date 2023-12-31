import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";//v6

// imports dos componentes de página
import HomePage from "../pages/HomePage/HomePage";
import TipoEventos from "../pages/TipoEventosPage/TipoEventosPage";
import EventosPage from "../pages/EventosPage/EventosPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TestePage from "../pages/TestePage/TestePage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";
import ComentarioEventoPage from "../pages/ComentarioEventoPage/ComentarioEventoPage";

// Componente Rota
const Rotas = () => {
  return (
      <BrowserRouter>
       <Header />
        
        <Routes>
          <Route element={<HomePage />} path="/" exact />
          <Route element={
            <PrivateRoute>
             <TipoEventos />
            </PrivateRoute>} 
            path="/tipo-eventos" 
          />
          <Route element={
            <PrivateRoute>
             <EventosAlunoPage />
            </PrivateRoute>} 
            path="/eventos-aluno" 
          />
          <Route element={<EventosPage />} path="/eventos" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<TestePage />} path="/testes/:idEvento" />
          <Route element={<ComentarioEventoPage />} path="/comentarios-eventos" />
        </Routes>
        
        <Footer />
      </BrowserRouter>
  );
};

export default Rotas;
