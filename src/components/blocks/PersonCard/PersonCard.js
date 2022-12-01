import './PersonCard.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function PersonCard(props) {
    const rating = Math.round(props.rating * 10) / 10;

    return <div className={'person-card'}>
        <div className={'person-info'}>
            <img src={`https://m9-frontend.upskill.appx.pt/upbnb/${props.photo}`} alt="foto"/>
            <div className={'person-name-rating-date'}>
                <h5>{props.name}</h5>
                {props.rating && <div className={'person-rating'}>
                    <FontAwesomeIcon icon={faStar}/>
                    <p>{rating}</p>
                </div>}
                {props.date && <div className={"person-date"}>
                    <p>{props.date}</p>
                </div>}
            </div>
        </div>
        <div className={'person-comment'}>
            {props.comment ? <p>{props.comment}</p> :
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>}
        </div>
    </div>;
}

export default PersonCard;