import CreateRecord from "../components/CreateRecord";
import { useParams } from "react-router";
import { useUser } from "../lib/customHooks";
import { useNavigate } from 'react-router-dom';

const CreateRecordPage = () => {
    const { user, authenticated } = useUser();
    const { recId } = useParams();
    const navigate = useNavigate();
    
    return (
        <>
        {(user && authenticated) ? <CreateRecord recId={recId} />
        : navigate('/signin')
        }
        </>
    )
}

export default CreateRecordPage;