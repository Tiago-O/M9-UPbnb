import React, {useState} from "react";

const FavoritesContext = React.createContext();

function ProviderFavorites(props) {
    let retrievedData = localStorage.getItem('fav');
    let fav = JSON.parse(retrievedData) || [];

    const [favorites, setFavorites] = useState(fav);

    const isFavorite = (house_id) => {
        return favorites.includes(house_id);
    }

    function toggleFavorite(house_id) {
        let cloneFav = [...favorites];

        if (isFavorite(house_id)) {
            // remover
            cloneFav.splice(cloneFav.indexOf(house_id), 1);
        } else {
            // adicionar
            cloneFav.push(house_id);
        }
        setFavorites(cloneFav);
        localStorage.setItem('fav', JSON.stringify(cloneFav));
    }

    return <FavoritesContext.Provider value={{favorites, setFavorites, isFavorite, toggleFavorite}}>
        {props.children}
    </FavoritesContext.Provider>;
}

function useFavorites() {
    return React.useContext(FavoritesContext);
}

export {ProviderFavorites, useFavorites};