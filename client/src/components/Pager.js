import styled from 'styled-components'
import { Link } from 'react-router-dom';

const StyledPager = styled.ul`
    display: flex;
    list-style: none;

    li {
        width: 40px;
        height: 40px;
        text-align: center;
        padding-top: 3px;
        font-size: var(--fz-xxl);
        border: 1px solid #000;
        background-color: white;
        margin: 10px 10px;

        @media (max-width: 768px) {
            padding: 1px 5px 5px 3px;
            margin: 3px;
            width: 35px;
        }
        
        &.current {
            background-color: var(--light-slate);
        }

        &:hover,
        &:focus {
            background-color: var(--light-slate)
        }

        a { 
            display: block;
            text-decoration: none;
            color: var(--dark-blue)
        }
    }
`;

const Pager = (props) => {
    const { currentPage, totalPages } = props
    const pages = [...Array(parseInt(totalPages)).keys()]
    return (
        <StyledPager>
            {pages.map((page) => {
                page++
                const cls = page === parseInt(currentPage) ? "current" : "page"
                return (
                    <li key={page} className={cls}>
                        {cls === "current"
                            ? <div>{page}</div>
                            : <Link to={`/wikitree/${page}`} onClick={props.onClicked} data-page={page}>{page}</Link>
                        }
                    </li>
                )
            })}
        </StyledPager>
    )

}

export default Pager;