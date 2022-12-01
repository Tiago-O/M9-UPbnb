import "./Navbar.scss";
import upbnbLogo from '../../../assets/logo_menu.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {NavLink} from "react-router-dom";

function Navbar() {
    return <nav className={'navbar-box'}>
        <div className={'lower-nav'}>
            <NavLink exact to={"/casas"}><FontAwesomeIcon icon={faMagnifyingGlass} /></NavLink>
            <div className={'empty-space'}></div>
            <NavLink to={"/favoritos"}><FontAwesomeIcon icon={faHeart} /></NavLink>
        </div>
        <div className={'upper-nav'}>
            <NavLink to={"/reservas"}><img src={upbnbLogo} alt="logo UPbnb"/></NavLink>
        </div>
    </nav>;
}

export default Navbar;