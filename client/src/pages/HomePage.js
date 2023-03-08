import styled from 'styled-components'
import { Link } from 'react-router-dom';

const StyledButtons = styled.div`
    ${({ theme }) => theme.mixins.mainButtons};

    svg {
        color: white;
    }
`;

const HomePage = () => {
    return (
        <>
        <h2>Welcome to the beginnings of The Zalewski Project.</h2>
        <p className="lead">We hope to collect as much data on people and families with the surname ZALEWSKI (and its variations) and put it all in one easy place.</p>
        <div className="alertbox info">The new Interactive Family Tree is now live. Consisiting of mainly Milwaukee Zalewski lines, it connects everyone together as much as possible. Sign up and add your own information and memories!</div>
        <StyledButtons>
            <div className="button"><Link to="/wikitree">WikiTree Profiles</Link></div>
            <div className="button"><Link to="/census">Census Records (1880 & 1900)</Link></div>
            <div className="button"><Link to="/cemetery">Cemetery Records</Link></div>
            <div className="button"><Link to="/deaths">Milwaukee Death Index</Link></div>
            <div className="button">
                <a href="https://www.zalewskifamily.net/tzp">
                    Interactive Family Tree <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#ffffff" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
                </a>
            </div>
        </StyledButtons>        
        </>
    );
}

export default HomePage;