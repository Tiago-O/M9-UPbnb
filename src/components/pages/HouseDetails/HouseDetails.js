import "./HouseDetails.scss";
import PersonCard from '../../blocks/PersonCard/PersonCard.js'

import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {useFavorites} from "../../../providers/FavoritesContext";

import airConditioner from '../../../assets/icones_upbnb/ac.svg'
import petsAllowed from '../../../assets/icones_upbnb/dog.svg'
import fireplace from '../../../assets/icones_upbnb/fireplace.svg'
import microwave from '../../../assets/icones_upbnb/microwave.svg'
import smokingAllowed from '../../../assets/icones_upbnb/smoking.svg'
import tv from '../../../assets/icones_upbnb/tv.svg'
import washingMachine from '../../../assets/icones_upbnb/washer.svg'
import wifi from '../../../assets/icones_upbnb/wifi.svg'

function HouseDetails(props) {
    const {house_id} = useParams();
    const [house, setHouse] = useState(null);
    const {isFavorite, toggleFavorite} = useFavorites();
    const [activeFeatures, setActiveFeatures] = useState([]);
    const [disabledFeatures, setDisabledFeatures] = useState([]);
    const [host, setHost] = useState(null);
    const [photos, setPhotos] = useState(null);
    const [reviews, setReviews] = useState(null);

    const features = [
        "smokingAllowed", "petsAllowed", "wifi", "washingMachine",
        "microwave", "airConditioner", "tv", "fireplace"
    ]

    const featuresImages = {
        'airConditioner': airConditioner,
        'petsAllowed': petsAllowed,
        'fireplace': fireplace,
        'microwave': microwave,
        'smokingAllowed': smokingAllowed,
        'tv': tv,
        'washingMachine': washingMachine,
        'wifi': wifi
    }

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/' + house_id)
            .then(response => {
                setHouse(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/' + house_id + '/features')
            .then(response => {
                const activeImages = response.data.features.map(af => featuresImages[af])
                setActiveFeatures(activeImages);

                const disabledFeatures= features.filter(f => !response.data.features.includes(f));
                const disabledImages = disabledFeatures.map(af => featuresImages[af])
                setDisabledFeatures(disabledImages);
            })
    }, [])

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/' + house_id + '/host')
            .then(response => {
                setHost(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/' + house_id + '/photos')
            .then(response => {
                // all photos except 1st one
                setPhotos(response.data.photos.slice(1));
            })
    }, [])

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/' + house_id + '/reviews')
            .then(response => {
                setReviews(response.data.reviews);
            })
    }, [])

    if (!house)
        return null;

    const rating = Math.round(house.rating * 10) / 10;

    return <div className={'house-details'}>
        <h1>{house.title}</h1>

        <div className={'house-details-rating-location'}>
            <FontAwesomeIcon icon={faStar} />
            <p>{rating}</p>
            <p className={'bullet'}>&bull;</p>
            <p>{house.city}, {house.country}</p>
        </div>

        <div className={'house-details-pic'}>
            <FontAwesomeIcon
                onClick={() => {
                    toggleFavorite(house.id);
                }}
                icon={isFavorite(house.id) ? faHeart : faHeartRegular}/>
            <img src={'https://m9-frontend.upskill.appx.pt/upbnb/' + house.featured_photo} alt="foto da casa"/>
        </div>

        <h3><strong>{house.price}€</strong> noite</h3>

        {house.description.split("\n").map((d, i) => <p key={i} className={'house-description'} >{d}</p>)}

        <div className={'house-features'}>
            {activeFeatures.map(af => {
                return <div className={'feature-icon active'}>
                    <img src={af} alt="icon"/>
                </div>;
            })}
        </div>
        <div className={'house-features'}>
            {disabledFeatures.map(af => {
                return <div className={'feature-icon disabled'}>
                    <img src={af} alt="icon"/>
                </div>;
            })}
        </div>

        <h4>Sobre o anfitrião</h4>
        {host && <PersonCard {...host}/>}

        <h3>Galeria</h3>
        <div className={'photos-gallery'}>
            {photos && photos.map((p, i) => {
                return <div className={'gallery-photo'}>
                    <img key={i} src={'https://m9-frontend.upskill.appx.pt/upbnb/' + p} alt="foto da casa"/>
                </div>;
            })}
        </div>

        <div className={'comments'}>
            <h3>Comentários</h3>
            {reviews && reviews.length === 0 && <p>Ainda não há comentários</p>}
            {reviews && reviews.map((r, i) => <PersonCard key={i} {...r}/>)}
        </div>

    </div>;
}

export default HouseDetails;