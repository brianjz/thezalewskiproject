import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledBreadcrumb = styled.ol`
    background-color: #ddd;
    border-radius: var(--border-radius);
    display: flex;
    flex-wrap: wrap;
    font-size: var(--fz-md);
    list-style: none;
    margin-bottom: 1rem;
    padding: 0.75rem;

    li + li {
        padding-left: 0.5rem;
        
        &::before {
            color: #95a5a6;
            content: "/";
            float: left;
            padding-right: 0.5rem;
        }
    }

    li:last-child {
        font-weight: 600;
    }

    li a {
        text-decoration: none;
        color: black;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const CensusBreadcrumb = (props) => {
    const { year, city, state, person } = props

    return (
        year && 
        <StyledBreadcrumb>
            <li><Link to="/census">Census</Link></li>
            <li><Link to={`/census/${year}`}>{year}</Link></li>
            {state && <li><Link to={`/census/${year}/${state}`}>{state}</Link></li>}
            {city && <li><Link to={`/census/${year}/${state}/${city}`}>{city}</Link></li>}
            {person && <li><Link to={`/census/${year}/${state}/${city}/${person}`}>{person}</Link></li>}
        </StyledBreadcrumb>
    )
}

export default CensusBreadcrumb;