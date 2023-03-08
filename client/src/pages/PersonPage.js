import CensusEntry1880 from "../components/1880CensusEntry";
import CensusEntry1900 from "../components/1900CensusEntry"
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import CensusBreadcrumb from "../components/CensusBreadcrumb";
import styled from "styled-components";

export const StyledTable = styled.table`
    font-size: 1.3em; 
    border-spacing: 3px; 
    border-collapse: initial;
    width: 100%;

    @media (max-width:768px) {
        font-size: 1em;
    }

	td {
		padding: 5px;

        &.rowName { 
            width: 35%; 
            background-color: var(--blue); 
            font-weight:bold; 
        }
        &.rowEntry { 
            width: 65%; 
            background-color: var(--light-slate); 
        }
	}
`;

const Person = (props) => {
    const { personId } = useParams()

    let [personData, setPerson] = useState('')
    let [isLoading, setIsLoading] = useState(true);
    // fetches data
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`/api/census/person/${personId}`)
            .then((response)=>{
                setPerson(response.data)
                setIsLoading(false)
                // console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        fetchData();
    }, [personId]);
    useEffect(() => {
        let title = props.title ?? "The Zalewski Project"
        title = personData ? title + personData[0].firstname + ' ' + personData[0].surname : title
        document.title = title
    }, [props.title, personData])

    if(isLoading) {
        return 'Loading...';
    }
    const person = personData[0]


    return (
        <>
        <CensusBreadcrumb year={person.year} city={person.city} state={person.state} person={`${person.firstname} ${person.surname}`} style={StyledTable} />
        {person.year === 1900 ? 
            <CensusEntry1900 person={person} />
        :
            <CensusEntry1880 person={person} />
        }
        </>
    )
}

export default Person;