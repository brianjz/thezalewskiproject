import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from "../lib/customHooks";
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { parseIndividual } from '../lib/processRecord';
import SearchBox from '../components/SearchBox';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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
    document.title = docTitle + ' - Milwaukee Death Index';

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
        <>
		<table className="death-item col-md-6 col-12 mb-2">
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
		</table>
        <div className="col-md-6 col-12 alert alert-primary">
            <h5>Find {rec.givennames} {rec.surname} on these sites:</h5>
            {showSearch && <SearchBox record={rec} />}
        </div>
        {authenticated && 
            <a href={`/record/edit/${rec._id}`} className='btn bg-info mb-3'>Edit Record</a>
        }
        <Alert variant='secondary' className='col-md-6 col-12 text-primary'>
		    Direct link to this entry: <a className='text-primary' href={`/record/${rec._id}`}>http://www.thezalewskiproject.com/deaths/record/{rec._id}</a>
        </Alert>
        </>
    )
}

export default RecordPage;