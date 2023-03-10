import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ShowStates from "../components/ShowStates";
import CensusBreadcrumb from "../components/CensusBreadcrumb";
import styled from "styled-components";
import { useDocumentTitle } from "../lib/common";

const StyledButtons = styled.div`
    ${({ theme }) => theme.mixins.mainButtons};
    font-size: var(--fz-xxl);
`;

const CensusListPage = (props) => {
    const { year, state } = useParams();
    const [curYear, setCurYear] = useState(year);
    const [curStateName, setCurStateName] = useState(state);
    if(year !== curYear) { setCurYear(year) }
    if(state !== curStateName) { setCurStateName(state) }

    let navigate = useNavigate();

    let pgtitle = "Census Records"
    pgtitle = curYear ? curYear + " " + pgtitle : pgtitle
    pgtitle = curStateName ? pgtitle.replace(curYear, curYear + ' ' + curStateName) : pgtitle
    useDocumentTitle(pgtitle)

    const changeState = (event) => {
        event.preventDefault();
        const st = event.target.dataset.state;
        setCurStateName(st);
        navigate(`/census/${year}/${st}`)
    }

    return (
        <>
        <h2>Census Records</h2>
        <CensusBreadcrumb year={curYear} state={curStateName} />
        {curYear ? 
            <>
            <h4>Census for {curYear}</h4>
            <ShowStates year={curYear} state={curStateName} onChangeState={changeState} />
            </>
            : 
            <>
            <p>Currently, we only have data for the census years of 1880 and 1900, but we hope to get more added in the future.</p>
            <StyledButtons>
                <div className="button"><Link to="/census/1880">1880</Link></div>
                <div className="button"><Link to="/census/1900">1900</Link></div>
            </StyledButtons>
            </>
        }
        </>
    )
}

export default CensusListPage;