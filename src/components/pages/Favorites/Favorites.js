import "./Favorites.scss";
import HouseCard from '../../blocks/HouseCard/HouseCard.js'
import axios from "axios";
import {useEffect, useState} from "react";
import {useFavorites} from "../../../providers/FavoritesContext";

function Favorites(props) {
    const {favorites} = useFavorites();
    const [favList, setFavList] = useState(null);

    useEffect(() => {
        if (favorites.length === 0) {
            setFavList([]);
        } else {
            axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/', {
                params: { ids: favorites.join(',') }
            })
                .then(response => {
                    let list = response.data.data;
                    let countryHouses = {};

                    list.forEach((f) => {
                        if (!countryHouses[f.country])
                            countryHouses[f.country] = [];
                        countryHouses[f.country].push(f);
                    })
                    setFavList(countryHouses);
            })
        }
    }, []);

    return <div className={"favs-box"}>
        <h1>Favoritos</h1>
        {!favList && <p>A carregar</p>}

        {favList &&  <>
            {favList.length === 0 && <p>Sem favoritos</p>}

            {Object.keys(favList).map((country, i) => {
                return <div key={i} className={"country"}>
                    <h2>{country}</h2>
                    {favList[country].map(house => <HouseCard
                        key={house.id}
                        type={'favorites'}
                        {...house}/>)}
                </div>
                }
            )}
        </>}
    </div>;
}

export default Favorites;