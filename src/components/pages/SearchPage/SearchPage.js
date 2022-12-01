import './SearchPage.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import HouseCard from '../../blocks/HouseCard/HouseCard.js'
import {useEffect, useState} from "react";
import axios from "axios";

function SearchPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [houses, setHouses] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [moreResults, setMoreResults] = useState(true);
    const limit = 8;

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas', {params: {page, limit, search}})
            .then(response => {
                if (page === 1) {
                    setHouses(response.data.data);
                    setTotalPages(response.data.pages);
                } else {
                    setHouses([...houses, ...response.data.data]);
                }
                setMoreResults(true);
            });
    }, [page, search]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    return <div className={'search-page'}>
        <div className={'search-bar'}>
            <input className={"search-input"} type="text" placeholder="Procurar"
                   onChange={e => setSearch(e.target.value)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </div>

        <div className={'houses-box'}>
            {!houses && <p>A carregar</p>}
            {houses && <>
            {houses.length === 0 && <p>Sem resultados</p>}
            {houses.map(house => <HouseCard
                    key={house.id}
                    type={'search'}
                    {...house}
                />)}
            </>}
        </div>

        {page < totalPages && <div className={'more'}>
            {<div onClick={() => {
                if (moreResults === true)
                    setPage(page + 1);
                setMoreResults(false)
            }}>
                mais resultados
            </div>}
        </div>}

    </div>;
}

export default SearchPage;