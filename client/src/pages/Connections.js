import axios from "axios";
import { useEffect, useState } from "react";
import ConnectionPerson from "../components/ConnectionPerson";
import styled from 'styled-components'
import { useParams, useNavigate } from "react-router";
import wikitree from '../images/wikitree-text.png'
import ScrollToTop from "../lib/ScrollToTop";

// Testing
// eslint-disable-next-line
import { Frank, AnnaTest, William } from "../testdata/TestProfiles";

const StyledPrimary = styled.div`
    display: grid;
    grid-template-columns: 50% 20px 20px;
    justify-content: center;
    @media (max-width: 1080px) {
        display: block;
        margin-top: calc(var(--below-navbar) + 100px)
    }

`;

const StyledParents = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    justify-content: center;
    @media (max-width: 1080px) {
        display: block;
    }
`;

const StyledSeparator = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;

    div:nth-child(-n+2) {
        text-align: center;
        border-right: 2px solid #000;
        height: 20px;
    }
`;

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

const Connection = (props) => {
    let { personId } = useParams()
    let navigate = useNavigate()
    let [personIdent, setPersonIdent] = useState(personId)
    let [personData, setPerson] = useState('')
    let [isLoading, setIsLoading] = useState(true);
    if(personId !== personIdent) { setPersonIdent(personId) }
    useEffect(() => {
        const fetchData = async () => {
            // if(process.env.NODE_ENV !== "production") {
                await axios.get(`/api/connections/getPerson/${personIdent}`)
                .then((response)=>{
                    setPerson(response.data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                })
            // } else {
            //     setIsLoading(false);
            //     setPerson(Frank);
                // setPerson(AnnaTest);
                // setPerson(William);
            // }
        }

        fetchData();
    }, [personIdent]);

    const changePerson = (event) => {
        event.preventDefault();
        const id = event.target.attributes.href.value.replace('/connections/', '');
        setPersonIdent(id);
        navigate(`/connections/${id}`)
    }

    if(isLoading) {
        return 'Loading...'
    } else if(personData.status !== 0) {
        return "Invalid WikiTree ID"
    }

    const person = personData.person
    const hasParents = Object.keys(person.Parents).length > 0 ? true : false // being set this way since no parents arrives as empty array, but with parents arrives as object

    return (
        <>
        <ScrollToTop />
        <StyledData>Data provided by<br /><img src={wikitree} alt="WikiTree" /></StyledData>
        <StyledPrimary>
            <ConnectionPerson person={person} relation="self" onChange={changePerson} />
        </StyledPrimary>
        { hasParents && 
            <>
            <StyledSeparator>
                <div></div>
                <div></div>
                <div></div>
            </StyledSeparator>
            <StyledParents>
                { person.Father !== 0 &&
                    <ConnectionPerson person={person.Parents[person.Father]} relation="Father" onChange={changePerson} />
                }
                { person.Mother !== 0 &&
                    <ConnectionPerson person={person.Parents[person.Mother]} relation="Mother" onChange={changePerson} />
                }
            </StyledParents>
            </>
        }
        </>
    )

}

export default Connection;