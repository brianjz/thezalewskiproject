import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Alert } from "react-bootstrap";
import CensusBreadcrumb from "../components/CensusBreadcrumb";

const CensusItems = (props) => {
    const { year, state, city } = useParams();

    let [personList, setPersonList] = useState('')
    let [isLoading, setIsLoading] = useState(true);
    // fetches data
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`/api/census/${year}/${state}/${city}`)
            .then((response)=>{
                setPersonList(response.data.records)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        fetchData();

        let title = props.title ?? "The Zalewski Project"
        title = year ? title.replace('- ', '- '+year+' ') : title
        title = city ? title.replace(year, year + ' ' + city) : title
        document.title = title
    }, [year, state, city, props.title]);


    if(isLoading) {
        return 'Loading...';
    }

    return (
        <>
        <CensusBreadcrumb year={year} city={city} state={state} />
        <Alert variant="primary">Click on a person to view their detailed entry.</Alert>
        {personList.map(edfam => {
            const [ed, family] = edfam._id.split('-');
            return ( 
                <ListGroup as="div" key={edfam._id}>
                    <ListGroup.Item as="div" id={`family-${edfam._id}`} className="text-light bg-info rounded-0 border-top-0 mt-2">
                        <h4>Enumeration District: {ed} - Family #{family}</h4>
                    </ListGroup.Item>
                    {edfam.people.map(person => {
                        return (
                            <ListGroup.Item key={person._id} as="a" className="border-dark" href={`/census/person/${person._id}`}>
                                <strong>{person.firstname} {person.surname}</strong> - {person.relation}
                            </ListGroup.Item>
                        )    
                    })}
                </ListGroup>
            )
        })}
        </>
    )
}

export default CensusItems;