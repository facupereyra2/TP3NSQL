import React, {useState} from 'react'
import './styles/Cargar.css'

const Cargar = () =>{

    const [sitio, setSitio] = useState({
        grupoInteres:'',
        latitud:'',
        longitud:'',
        lugar:''
    })

    const handleChange = (e) =>{
        setSitio({ ...sitio, [e.target.name]: e.target.value });
    }
    console.log(sitio)


    const cargarSitio = async(e) =>{
        e.preventDefault()
        const res = await fetch('https://localhost:4040/cargar',
        {
            
            method: 'POST',
            body: JSON.stringify(sitio),
            headers: {"Content-Type": "application/json"},
            
        }
        
        )
        const data = await res.json
    }

    return(
        <>
            <div className="text">
                <h3>Ingrese los datos correspondientes</h3>
            </div>
            <div className="inputs">
                <input type="text" name= 'grupoInteres'placeholder='Categoria del sitio' onChange={handleChange}/>
                <input type="text" name='lugar' placeholder='Nombre del sitio' onChange={handleChange}/>
                <input type="text" name='latitud' placeholder='Latitud' onChange={handleChange}/>
                <input type="text" name='longitud' placeholder='Longitud' onChange={handleChange}/>
            </div>
            <button onClick={cargarSitio}>Cargar sitio</button>
        </>
    )
}

export default Cargar;