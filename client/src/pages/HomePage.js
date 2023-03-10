import styled from 'styled-components'
import { Link } from 'react-router-dom';

const StyledButtons = styled.div`
    ${({ theme }) => theme.mixins.mainButtons};

    svg {
        color: white;
    }

    a.external {
        &:after {
            content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffffff' d='M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z'/%3E%3C/svg%3E");
            padding-left: 5px;
        }
    }
`;

const StyledAnnoucement = styled.p`
    font-weight: 600;
    border: 2px solid #999;
    border-width: 2px 0;
    padding: 5px 0;
`;

const HomePage = () => {
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