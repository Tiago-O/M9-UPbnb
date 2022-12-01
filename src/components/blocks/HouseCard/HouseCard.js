import './HouseCard.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import {useFavorites} from "../../../providers/FavoritesContext";

function HouseCard(props) {
    let host = props.host_type;
    host === 'professional' ? host = 'profissional' : host = 'individual';
    const rating = Math.round(props.rating * 10) / 10;

    const {isFavorite, toggleFavorite} = useFavorites();

    return <Link to={"/casas/" + props.id} className={props.type === 'favorites' ? 'house-card house-card-fav' : 'house-card'}>
        <div className={'house-picture'}>
            <FontAwesomeIcon
                onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(props.id);
                }}
                icon={isFavorite(props.id) ? faHeart : faHeartRegular}
            />
            <div>
                <img src={'https://m9-frontend.upskill.appx.pt/upbnb/' + props.featured_photo} alt="foto da casa"/>
            </div>
        </div>

        <div className={'house-info'}>
            <div className={'house-info-content'}>
                <p><strong>{props.city}, {props.country}</strong></p>
                {(props.type === 'search' || props.type === 'favorites') && <>
                    <p className={'host-date'}>Anfitrião {host}</p>
                    <p><strong>{props.price}€</strong> noite</p>
                </>}
                {props.type === 'reservation' && <>
                    <p className={'host-date'}>{props.time}</p>
                    <p><strong>{props.price}€</strong></p>
                </>}
                {props.type === 'favorites' && <>
                    <div className={'house-rating'}>
                        <FontAwesomeIcon icon={faStar} />
                        <p>{rating}</p>
                    </div>
                </>}
            </div>
            {props.type !== 'favorites' && <>
                <div className={'house-rating'}>
                    <FontAwesomeIcon icon={faStar} />
                    <p>{rating}</p>
                </div>
            </>}

        </div>
    </Link>;
}

export default HouseCard;