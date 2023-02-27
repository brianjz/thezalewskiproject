import CensusEntry1880 from "../components/1880CensusEntry";
import CensusEntry1900 from "../components/1900CensusEntry"
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import CensusBreadcrumb from "../components/CensusBreadcrumb";

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
        <CensusBreadcrumb year={person.year} city={person.city} state={person.state} person={`${person.firstname} ${person.surname}`} />
        {person.year === 1900 ? 
            <CensusEntry1900 person={person} />
        :
            <CensusEntry1880 person={person} />
        }
        </>
    )
}

export default Person;