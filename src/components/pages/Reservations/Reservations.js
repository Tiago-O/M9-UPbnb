import './Reservations.scss'
import axios from "axios";
import {useEffect, useState} from "react";
import HouseCard from "../../blocks/HouseCard/HouseCard";

function Reservations(props) {
    const [currentReservations, setCurrentReservations] = useState(null);
    const [pastReservations, setPastReservations] = useState(null);

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/current')
            .then(response => {
                setCurrentReservations(response.data.data)
            });
    }, []);

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/past')
            .then(response => {
                setPastReservations(response.data.data)
            });
    }, []);

    return <div className={'reservations-box'}>
        <h1>Bem-vindo(a)</h1>
        <h2>Ao seu perfil</h2>
        <h4>As minhas reservas</h4>

        <div className={'houses-box'}>
            {!currentReservations && <p>A carregar</p>}
            {currentReservations && <>
                {currentReservations.length === 0 && <p>Sem resultados</p>}
                {currentReservations.map(house => <HouseCard
                    key={house.id}
                    type={'reservation'}
                    {...house}
                />)}
            </>}
        </div>

        <h4>Reservas passadas</h4>

        <div className={'houses-box'}>
            {!pastReservations && <p>A carregar</p>}
            {pastReservations && <>
                {pastReservations.length === 0 && <p>Sem resultados</p>}
                {pastReservations.map(house => <HouseCard
                    key={house.id}
                    type={'reservation'}
                    {...house}
                />)}
            </>}
        </div>
    </div>;
}

export default Reservations;