import styled from 'styled-components'

const StyledButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    .button {
        margin: 5px;

        a {
            display: block;
            background-color: var(--secondary);
            padding: 20px;
            width: 100%;
            border-radius: var(--border-radius-button);
            border: 1px solid black;
            text-decoration: none;
            color: white;
            text-align: center;

            ${({ theme }) => theme.mixins.boxShadow};
        }
    }
`;

const HomePage = () => {
    return (
        <>
        <h2>Welcome to the beginnings of The Zalewski Project.</h2>
        <p className="lead">We hope to collect as much data on people and families with the surname ZALEWSKI (and its variations) and put it all in one easy place.</p>
        <div className="alert alert-info" role="alert">The new Interactive Family Tree is now live. Consisiting of mainly Milwaukee Zalewski lines, it connects everyone together as much as possible. Sign up and add your own information and memories!</div>
        <StyledButtons>
            <div className="button"><a href="/wikitree">WikiTree Profiles</a></div>
            <div className="button"><a href="/census">Census Records (1880 & 1900)</a></div>
            <div className="button"><a href="https://www.zalewskifamily.net/tzp">Interactive Family Tree</a></div>
            <div className="button"><a href="/cemetery">Cemetery Records</a></div>
            <div className="button"><a href="/deaths">Milwaukee Death Index</a></div>
        </StyledButtons>        
        </>
    );
}

export default HomePage;