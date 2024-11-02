import React from 'react'
import { Routes, Route, Navigate, HashRouter } from "react-router-dom"
import { Home } from "../Components/Home"
import { HeaderNav } from "../Components/layout/HeaderNav"
import { Footer } from "../Components/layout/Footer"
import { RegistroDiario } from '../Components/RegistroDiario'
import { HistorialRegistros } from '../Components/HistorialRegistros'
import { Estadisticas } from '../Components/Estadisticas'



export const MyRoutes = () => {
  return (
    <HashRouter>
        <HeaderNav />

        <section className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/registro-diario" element={<RegistroDiario />}></Route>
            <Route path="/historial-registros" element={<HistorialRegistros />}></Route>
            <Route path="/estadisticas" element={<Estadisticas />}></Route>
            <Route path="*" element={
              <div className='page'>
                <h1 className='heading'>Error 404</h1>
                <p className='paragraph'>La página que estás buscando no existe</p>
              </div>
            }></Route>
          </Routes>
        </section>
        <Footer />
    </HashRouter>
  )
}
