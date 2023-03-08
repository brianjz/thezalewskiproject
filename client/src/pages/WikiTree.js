import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components'
import wikitree from '../images/wikitree-text.png'
import { processDateString } from "../lib/common";
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
        margin-top: 100px
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
    }
`;

const WikiTree = (props) => {
    const { page = 1 } = useParams()
    let navigate = useNavigate()

    let [curPage, setCurPage] = useState(page)
    let [personList, setPersonList] = useState('')
    let [isLoading, setIsLoading] = useState(true);
    if(page !== curPage) { setCurPage(page) }
    useEffect(() => {
        const fetchData = async () => {
            // if(process.env.NODE_ENV === "production") {
                await axios.get(`/api/connections/getZalewskiPeople/${curPage}`)
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

    const updateList = (event) => {
        event.preventDefault();
        const newPage = event.target.dataset.page;
        setCurPage(newPage);
        navigate(`/wikitree/${newPage}`)
    }

    if(isLoading) {
        return 'Loading Data...';
    }

    const totalPages = Math.ceil(personList.total / personList.limit)

    return (
        <>
        <StyledData>Data provided by<br /><img src={wikitree} alt="WikiTree"/></StyledData>
        <StyledInfo>
            <p>A list of Zalewski profiles from WikiTree. Currently there are a total of <span className="total">{personList.total}</span> non-living 
            profiles on WikiTree of people born with the Zalewski (or variant) surname.</p>
            <p>They are listed here sorted by date of birth.</p>
        </StyledInfo>
        <Pager currentPage={page} totalPages={totalPages} onClicked={updateList} />
        <StyledList>
            {personList.matches.map((person) => {
                console.log(person.Privacy)
                return (
                    person.FirstName && //if cannot see FirstName data, then profile is probably an active/living user
                    <li key={person.Name}>
                        <Link to={`/connections/${person.Name}`}>{person.LongName}</Link> - 
                            ({processDateString(person.BirthDate, true)}{person.BirthLocation && ` at ${person.BirthLocation}`} -&nbsp;
                            {processDateString(person.DeathDate, true)}{person.DeathLocation && ` at ${person.DeathLocation}`})
                    </li>
                )
            })}
        </StyledList>
        <Pager currentPage={page} totalPages={totalPages} onClicked={updateList} />
        </>
    )
}

export default WikiTree;