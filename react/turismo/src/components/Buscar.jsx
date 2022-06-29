import React,{useState} from 'react'
import './styles/Buscar.css'

const Buscar = () =>{

    const [lugar, setLugar] = useState()

    const[grupoInteres, setGrupoInteres] = useState();
    const[latitud, setLatitud] = useState();
    const[longitud, setLongitud] = useState();

    const buscarLugares = async()=>{
        const res = await fetch(`http://localhost:4040/radio/${grupoInteres}/${latitud}/${longitud}`);
        const data = await res.json();
        console.log(data);
        setLugar(data);
    }

    return(
        <>
            <div className="text">
                <h3>Ingrese las coordenadas de su ubicacion actual</h3>
            </div>

            <div className="inputs">
                <input type="text" placeholder='Ingrese la categoria' onChange = {(e)=>setGrupoInteres(e.target.value)}/>
                <input type="text" placeholder='Ingrese su latitud' onChange = {(e)=>setLatitud(e.target.value)} />
                <input type="text" placeholder='Ingrese su longitud' onChange = {(e)=>setLongitud(e.target.value)}/>
            </div>
            <button onClick={buscarLugares}>Buscar lugares</button>
                
                {lugar && lugar.map((lug)=>{
                    return(
                        <ul>
                            <li>{lug}</li>
                        </ul>
                        
                        )
                    }
                    )
                }

                {lugar && lugar.map((lug)=>{
                    return(
                        <button>Ver distancia</button>
                    )
                })}
                
        </>
    )
}

export default Buscar;