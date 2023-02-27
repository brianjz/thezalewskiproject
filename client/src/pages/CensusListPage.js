import { useParams } from "react-router";
import { useEffect } from "react";
import ShowStates from "../components/ShowStates";
import CensusBreadcrumb from "../components/CensusBreadcrumb";

const CensusListPage = (props) => {
    const { year, state } = useParams();
    useEffect(() => {
        let title = props.title ?? "The Zalewski Project"
        title = year ? title.replace('- ', '- '+year+' ') : title
        title = state ? title.replace(year, year + ' ' + state) : title
        document.title = title
    }, [props.title, year, state])

    return (
        <>
        <CensusBreadcrumb year={year} state={state} />
        {year ? 
            <>
            <h4>Census for {year}</h4>
            <ShowStates year={year} state={state} />
            </>
            : 
            <>
            <p>Currently, we only have data for the census years of 1880 and 1900, but we hope to get more added in the future.</p>
            <div id="censusInfo" className="row col-md-6 col-12">
                <div class="row category-boxes">
                    <a class="col-4 btn btn-primary btn-block btn-lrg me-2" href="/census/1880">1880</a>
                    <a class="col-4 btn btn-primary btn-block btn-lrg" href="/census/1900">1900</a>
                </div>
            </div>
            </>
        }
        </>
    )
}

export default CensusListPage;