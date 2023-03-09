import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CensusBreadcrumb from "../components/CensusBreadcrumb";
import { Link } from "react-router-dom";

const StyledFamilyGroup = styled.div`
    border: 1px solid black;
    margin-bottom: 25px;
    display: grid;
    grid-template-columns: 1fr;

    h4 {
        margin: 0 0 15px 0;
        padding: 5px;
        background-color: var(--dark-blue);
        color: white;
    }

    div {
        display: inline-block;
        padding: 7px 10px;
        border: 1px solid #666;
        border-width: 0 0 1px 0;
        &:last-child {
            border-bottom-width: 0;
        }
        &:hover {
            background-color: var(--lightest-slate)
        }

        a {
            text-decoration: none;
            font-weight: 600;

            &:hover,
            &:focus {
                color: black;
                text-decoration: underline;
            }
        }
    }
`;

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
        <div className="alertbox info">Click on a person to view their detailed entry.</div>
        {personList.map(edfam => {
            const [ed, family] = edfam._id.split('-');
            return ( 
                <StyledFamilyGroup as="div" key={edfam._id}>
                    <h4>Enumeration District: {ed} - Family #{family}</h4>
                    {edfam.people.map(person => {
                        return (
                            <div key={person._id} className="persoin">
                                <Link to={`/census/person/${person._id}`}>
                                    {person.firstname} {person.surname}</Link> - {person.age}y - {person.relation}
                            </div>
                        )    
                    })}
                </StyledFamilyGroup>
            )
        })}
        </>
    )
}

export default CensusItems;