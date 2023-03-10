import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/common";

const StyledButtons = styled.div`
    ${({ theme }) => theme.mixins.mainButtons};
`;

const CemeteryPage = () => {
    useDocumentTitle('Cemetery Records')
    return (
        <div id="row col-md-12">
            <h2>Cemetery Records</h2>
            <p className="alertbox info">With sites out there like Find-A-Grave and Billion Graves, it's not especially efficient to try to collect and save all cemetery/burial records on this site. For now, I will just be linking to a "Zalewski"
            search page on those sites so you can browse them on your own and the data will be completely up to date.</p>
            <StyledButtons>
                <div className="button"><a href="https://www.findagrave.com/cgi-bin/fg.cgi?page=gsr&GSfn=&GSmn=&GSln=Zalewski&GSbyrel=all&GSby=&GSdyrel=all&GSdy=&GScntry=0&GSst=0&GSgrid=&df=all&GSob=n" title="Find-A-Grave">Find-A-Grave</a></div>
                <div className="button"><Link to="/deaths/search/Zalewski" title="Death Index">Milwaukee Death Index</Link></div>
                <div className="button"><a href="https://billiongraves.com/search/results?family_names=zalewski&size=15" title="Billion Graves">Billion Graves</a></div>
            </StyledButtons>
        </div>
    )
}

export default CemeteryPage;