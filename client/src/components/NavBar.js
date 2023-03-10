import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const StyledNavBar = styled.div`
    ${({ theme }) => theme.mixins.flexBetween};
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: var(--blue);
    z-index: 100;
`;

const StyledNav = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    overflow: hidden;

    li {
        list-style-type: none;
        padding: 5px 10px;

        &:not(:last-child):after {
            content: "|";
            margin-left: 15px;
            color: var(--slate)
        }
    }

    @media (max-width: 1080px) {
        display: ${props => (props.dropMenuOpen ? 'inline' : 'none ')};
        padding: 20px 10px;
        background-color: var(--blue);
        height: 100vh;
        width: 30vw;
        margin-top: 50px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 26;
        box-shadow: 15px 10px 30px -15px var(--navy-shadow);
        transform: translateX(${props => (props.dropMenuOpen ? 0 : 100)}vw);
        visibility: ${props => (props.dropMenuOpen ? 'visible' : 'hidden')};
        transition: var(--transition);

        li {
            &:before {
                content: "\u00BB";
                margin-right: 5px;
            }
            &:not(:last-child):after {
                content: "";
            }
        }
    }
    @media (max-width: 768px) {
        width: 75vw;
    }
`;

const StyledBurger = styled.div`
    display: none;
    z-index: 6;
    width: 2rem;
    height: 2rem;
    justify-content: space-around;
    flex-flow: column nowrap;
    z-index: 10;
    cursor: pointer;

    @media (max-width: 1080px) {
        display:flex;
        margin-left: 10px;
        z-index: 7;
    }

    .burger {
        width: 2rem;
        height: 0.25rem;
        border-radius: 10px;
        background-color: var(--dark-blue);
        transform-origin: 1px;
        transition: all 0.3s linear;
        &.burger1{
            transform: ${props => (props.dropMenuOpen ? 'translate(3px, -2px) scaleX(0.8)' : 'translate(0) scaleX(1)')};
        }
        &.burger2{
            transform: ${props => (props.dropMenuOpen ? 'translate(4px, 8px) scale(0.8)' : 'translate(0) scale(1)')};
        }
        &.burger3{
            transform: ${props => (props.dropMenuOpen ? 'translateX(6px) translateY(-4px) rotate(-43deg)' : 'translateX(0) translateY(0) rotate(0)')};
        }
    }
`;

const StyledSiteName = styled.div`
    margin-left: 20px;
    font-weight: 600;
    font-size: 1.3em;

    @media (max-width: 1080px) {
        margin-right: 1rem;
        font-size: 1.2rem;
    }
    @media (max-width:768px) {
        margin-right: 5rem;
    }
`;

const NavBar = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        console.log('HOpen? ', !hamburgerOpen)
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <StyledNavBar id="navBar">
            <StyledBurger dropMenuOpen={hamburgerOpen ? true : false } onClick={toggleHamburger}>
                <div className="burger burger1"></div>
                <div className="burger burger2"></div>
                <div className="burger burger3"></div>
            </StyledBurger>
            <StyledSiteName dropMenuOpen={hamburgerOpen ? true : false }>
                <Link className="inline-link" to="/">The Zalewski Project</Link>
            </StyledSiteName>
            <StyledNav dropMenuOpen={hamburgerOpen ? true : false } onClick={toggleHamburger}>
                <li><Link className="inline-link" to="/">Home</Link></li>
                <li><Link className="inline-link" to="/census">Census</Link></li>
                <li><Link className="inline-link" to="/wikitree">WikiTree</Link></li>
                <li><Link className="inline-link" to="/deaths">Milwaukee Deaths</Link></li>
                <li><Link className="inline-link" to="/cemetery">Cemetery Records</Link></li>
                <li><a className="inline-link" href="https://www.zalewskifamily.net/tzp">Interactive Tree <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg></a></li>
            </StyledNav>
        </StyledNavBar>
    );
}

export default NavBar;