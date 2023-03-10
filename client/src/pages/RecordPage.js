import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from "../lib/customHooks";
import axios from 'axios';
import { parseIndividual } from '../lib/processRecord';
import SearchBox from '../components/SearchBox';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const StyledRecord = styled.div`
    width: 50%;

    @media (max-width: 1080px) {
        width: 100%;
    }
`;

const StyledSearch = styled.div`
    background-color: var(--primary);
    color: white;
    padding: 5px;
    margin-top: 15px;

    h5 {
        margin: 0;
        padding: 10px 5px;
    }
`;

const StyledTable = styled.table`
    font-size: 1.5em; 
    border-spacing: 3px; 
    border-collapse: initial;
    width: 100%;

    td {
        padding: 5px 10px; 

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

const RecordPage = () => {
    const { authenticated } = useUser(true);
    const { recId } = useParams();
    let rec = {};

    // Create state variables
    let [recordData, setRecordData] = useState('')
    let [isLoading, setIsLoading] = useState(true);
    // fetches data
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${API_ENDPOINT}/api/record/${recId}`)
            .then((response)=>{
                setRecordData(response.data)
                setIsLoading(false)
                // console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        fetchData();
    }, [recId]);

    if(isLoading) {
        return 'Loading...';
    } else {
        rec = recordData.record
    }

    const { cleanFirstName, cleanLastName, containsUnknown } = parseIndividual(rec);

    let docTitle = cleanFirstName ? rec.givennames+' ' : ''
    docTitle += cleanLastName ? rec.surname : ''
    document.title = docTitle + ' - Milwaukee Death Index - The Zalewski Project';

    let entryFound = false;
    Object.keys(rec.sites).forEach((site) => {
        if(rec.sites[site]) entryFound = true;
    });
    let showSearch = false;
    if(!containsUnknown) {
        showSearch = true;
    } else if(entryFound) {
        showSearch = true;
    }

    return (
        <StyledRecord>
        <h3>{rec.givennames} {rec.surname}</h3>
		<StyledTable className="death-item">
			<tbody>
				<tr className="odd">
					<td className="rowName">Date:</td>

					<td className="rowEntry">{new Date(rec.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Title/Prefix:</td>

					<td className="rowEntry">{rec.title}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Given Names:</td>

					<td className="rowEntry">{rec.givennames}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Surname:</td>

					<td className="rowEntry">{rec.surname}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Maiden Name:</td>

					<td className="rowEntry">{rec.maidenname}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Paper:</td>

					<td className="rowEntry">{rec.paper}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Type:</td>

					<td className="rowEntry">{rec.type}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Age:</td>

					<td className="rowEntry">{rec.age}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Address:</td>

					<td className="rowEntry">{rec.address}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Notes:</td>

					<td className="rowEntry">{rec.notes}</td>
				</tr>
			</tbody>
		</StyledTable>
        <StyledSearch className="alertbox">
            <h5>Find {rec.givennames} {rec.surname} on these sites:</h5>
            {showSearch && <SearchBox record={rec} />}
        </StyledSearch>
        <div className='alertbox info'>
		    Direct link to this entry: <Link to={`/deaths/record/${rec._id}`}>http://www.thezalewskiproject.com/deaths/record/{rec._id}</Link>
        </div>
        {authenticated && 
            <div className="button"><Link to={`/deaths/record/edit/${rec._id}`}>Edit Record</Link></div>
        }
        </StyledRecord>
    )
}

export default RecordPage;