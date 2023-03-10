import DeathList from '../components/DeathList';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const url = `${API_ENDPOINT}/api/deaths/count`;

const DeathIndex = () => {
    const location = useLocation();
    const urlYear = location.pathname.replace('/deaths', '').substring(1);

    let totalRecordsCount = "over 2500";
    const [totalRecords, setTotalRecords] = useState(totalRecordsCount);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(url)
            .then((response)=>{
                setTotalRecords(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    
        fetchData();
    }, [totalRecordsCount]);

    return (
        <>
        <h3>Milwaukee Death Index</h3>
        <p className="alert alert-primary">
            These are all deaths from papers in Milwaukee, Wisconsin. They are transcribed from items like Death Notices, Burial Listings,
            Obituaries, and standard Articles. <span className="text-info">At the moment, there are <span className="death-total">{totalRecords} entries.</span></span> These 
            are all transcribed by one person, me, by hand. I am constantly adding new entries. As with any transcription/indexing project, there are bound to be 
            occasional misspellings, missed entries, and other errors. Please <a href="http://www.zalewskifamily.net/contact">let me know</a> if you do find one.
        </p>
        <DeathList modifier={urlYear} />
        </>
    );
}

export default DeathIndex;