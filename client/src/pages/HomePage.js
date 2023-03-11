import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../lib/common';

const StyledButtons = styled.div`
    ${({ theme }) => theme.mixins.mainButtons};
    @media (max-width:1080px) {
        gap: 10px;
    }
`;

const StyledAnnoucement = styled.p`
    font-weight: 600;
    border: 2px solid #999;
    border-width: 2px 0;
    padding: 5px 0;
`;

const HomePage = () => {
    useDocumentTitle('')
    return (
        <>
        <h4>Welcome to the beginnings of The Zalewski Project.</h4>
        <p className="lead">We hope to aggregate as much data on historical people and families with the surname ZALEWSKI (and its variations) and put it all in one easy place.</p>
        <StyledAnnoucement>Now includes live WikiTree listings and profiles (with connections)</StyledAnnoucement>
        <StyledButtons>
            <div className="button"><Link to="/wikitree">Zalewski WikiTree Profiles</Link></div>
            <div className="button"><Link to="/census">Census Records (1880 & 1900)</Link></div>
            <div className="button"><Link to="/cemetery">Cemetery Records</Link></div>
            <div className="button"><Link to="/deaths">Milwaukee Death Index</Link></div>
            <div className="button"><a className="external" href="https://www.wikitree.com/wiki/Project:Zalewski">Zalewski Name Study on WikiTree</a></div>
            <div className="button">
                <a className="external" href="https://www.zalewskifamily.net/tzp">
                    Interactive Family Tree
                </a>
            </div>
        </StyledButtons>        
        </>
    );
}

export default HomePage;