import { useEffect, useState } from 'react';
import api from '../../services/api';
import './clima.css'

//https://api.hgbrasil.com/weather?format=json-cors&key=267850d6&city_name=Campinas,SP

function Home(){

    const [clima, setClima] = useState();
    const [climaWeek, setClimaWeek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscar, setBuscar] = useState();
    const [cidade, setCidade] = useState('');

    useEffect(()=>{
        async function loadClima(){
            if(!buscar){
                    const response = await api.get("weather", {
                        params:{
                            format: "json-cors",
                            key: "267850d6",
                            user_ip: "remote",
                        }
                })
                setClima(response.data.results);
                setClimaWeek(response.data.results.forecast);
                setLoading(false);
            }else{
                const response = await api.get("weather", {
                    params:{
                        format: "json-cors",
                        key: "267850d6 ",
                        city_name: buscar,
                    }
                })
                    setClima(response.data.results);
                    setClimaWeek(response.data.results.forecast);
                    setLoading(false);
                }
                
        }

        loadClima();

    },[buscar])

    function buscarCidade(e){
        e.preventDefault();

        setBuscar(cidade);
        setCidade('');
    }

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando...</h2>
            </div>
        );
    }

    return(
        <div className='container'>
            <div className='lista-clima'>
                <form className='form' onSubmit={buscarCidade}>
                    <input
                    className='input'
                    type="text"
                    placeholder='Digite sua cidade'
                    onChange={(e) => setCidade(e.target.value)}
                    value={cidade}
                    />
                    <input className='button' type="submit" value="Buscar"/>
                </form>

                <article className='principal' key={clima.city}><br/><br/>
                    <strong>{clima.city}</strong>
                    <div>
                        <p>Tempratura: {clima.temp} °C</p>
                        <p>Data: {clima.date}</p>
                        <p>Hora: {clima.time}</p>
                        <p>Descrição: {clima.description}</p>
                        <p>Periodo: {clima.currently}</p>
                        <p>Umidade: {clima.humidity}%</p>
                        <p>chuva: {clima.rain}mm</p>
                    </div>
                </article>
                <div className='box'>
                    {climaWeek.map((climaWeek)=>{
                        return(
                            
                                <div className='segundo' key={climaWeek.date}><br/><br/>
                                    <h2>{climaWeek.date}</h2><br/>
                                    <p>Dia: {climaWeek.weekday}</p>
                                    <p>Max: {climaWeek.max}°C</p>
                                    <p>Min: {climaWeek.min}°C</p>
                                    <p>Nuvens: {climaWeek.cloudiness}</p>
                                    <p>Chance de chuva: {climaWeek.rain_probability}</p>
                                    <p>Chuva: {climaWeek.rain}mm</p>
                                    <p>Descricao: {climaWeek.description}</p>
                                </div>
                            
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;