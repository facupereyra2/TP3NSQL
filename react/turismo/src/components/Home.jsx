import React from 'react'
import {Link} from 'react-router-dom'

import './styles/Home.css'

const Home = ()=>{
    return(
        <>
            <div className="text">
                <h1>Turismo</h1>
                <h3>¿Qué desea hacer?</h3>
            </div>
            <div className="options">
                <Link to='/buscar'>Buscar lugares</Link>
                <Link to='/cargar'>Cargar lugares</Link>
            </div>
        </>
    )
}

export default Home;