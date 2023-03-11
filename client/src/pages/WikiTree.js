import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components'
import wikitree from '../images/wikitree-text.png'
import { useDocumentTitle, processDateString } from "../lib/common";
import { Link, useParams, useNavigate } from "react-router-dom";
import Pager from "../components/Pager";
// testing
// import { ZalewskiList } from "../testdata/TestProfiles";

const StyledData = styled.div`
    position: absolute;
    right: 10px;
    top: 60px;
    text-align: center;
    color: var(--slate);

    img {
        height: 50px;
    }
`;

const StyledInfo = styled.div`
    border: 1px solid var(--navy);
    border-radius: var(--border-radius);
    background-color: var(--blue);
    padding: 10px;
    margin: 20px 0;

    @media (max-width: 1080px) {
        margin-top: calc(var(--below-navbar) + 100px);
    }

    .total {
        font-weight: bold;
    }
`;

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
    li {
        padding: 5px 2px;
        border-bottom: 1px solid var(--light-slate);
        a {
            color: var(--black);

            &:hover,
            &:focus {
                color: var(--dark-blue)
            }
        }

        &:hover {
            background-color: #ccc;
        }

        &.private {
            color: #999;
        }
        a.external {
            &:after {
                content:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'%3E%3Cpath fill='%23999999' d='M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z'/%3E%3C/svg%3E");
                padding-left: 5px;
            }
    }
    }
`;

const WikiTree = (props) => {
    const { page = 1 } = useParams()
    const PageSize = 50;
    let navigate = useNavigate()

    let [curPage, setCurPage] = useState(page)
    let [personList, setPersonList] = useState('')
    let [isLoading, setIsLoading] = useState(true);
    if(page !== curPage) { setCurPage(page) }
    useEffect(() => {
        const fetchData = async () => {
            // if(process.env.NODE_ENV === "production") {
                await axios.get(`/api/connections/getZalewskiPeople/${curPage}?pagesize=${PageSize}`)
                .then((response)=>{
                    setPersonList(response.data[0])
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                })
            // } else {
            //     setIsLoading(false);
            //     setPersonList(ZalewskiList[0])
            // }
        }

        fetchData();
    }, [curPage]);

    const [mobile, setMobile] = useState(window.innerWidth <= 500);

    const handleWindowSizeChange = () => {
        setMobile(window.innerWidth <= 500);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
    }
    }, []);

    const updateList = (newPage) => {
        // event.preventDefault();
        // const newPage = event.target.dataset.page;
        setCurPage(parseInt(newPage));
        navigate(`/wikitree/${newPage}`)
    }

    useDocumentTitle('WikiTree Profiles');

    if(isLoading) {
        return 'Loading Data...';
    }

    return (
        <>
        <StyledData>Data provided by<br /><img src={wikitree} alt="WikiTree"/></StyledData>
        <StyledInfo>
            <p>A list of Zalewski profiles from WikiTree. Currently there are a total of <span className="total">{personList.total}</span> non-living 
            profiles on WikiTree of people born with the Zalewski (or variant) surname.</p>
            <p>They are listed here sorted by date of birth.</p>
        </StyledInfo>
        <Pager
            className="pagination-bar"
            currentPage={parseInt(curPage)}
            totalCount={personList.total}
            pageSize={PageSize}
            onPageChange={page => updateList(page)}
            siblingCount="1"
            isMobile={mobile}
        />
        <StyledList>
            {personList.matches.map((person, i) => {
                return (
                    person.FirstName // if cannot see FirstName data, then profile is probably an active/living user
                    ? <li key={person.Name}>
                        <Link to={`/connections/${person.Name}`}>{person.LongName}</Link> - 
                                {processDateString(person.BirthDate, true)}{person.BirthLocation && ` at ${person.BirthLocation}`} -&nbsp;
                                {processDateString(person.DeathDate, true)}{person.DeathLocation && ` at ${person.DeathLocation}`})
                      </li>
                    : <li key={`Living-${i}`} className="private">
                        Living or Private Profile
                        {person.Name ?
                            person.LongNamePrivate
                            ? <> - <a href={`https://www.wikitree.com/wiki/${person.Name}`} className="external">{person.LongNamePrivate}</a></>
                            : <> - <a href={`https://www.wikitree.com/wiki/${person.Name}`} className="external">{person.Name}</a></>
                        : <></>
                        }
                    </li>
                )
            })}
        </StyledList>
        <Pager
            className="pagination-bar"
            currentPage={parseInt(curPage)}
            totalCount={personList.total}
            pageSize={PageSize}
            onPageChange={page => updateList(page)}
            siblingCount="1"
            isMobile={mobile}
        />
        </>
    )
}

export default WikiTree;