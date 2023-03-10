import { getSiteData } from "../lib/processRecord";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import { Link } from "react-router-dom";
library.add(fas);

const StyledSearchBox = styled.div`
    a.search-link {
        display: inline-block;
        border-radius: var(--border-radius-button);
        padding: 0.5rem 0.5rem;
        text-align: center;
        vertical-align: middle;
        background-color: var(--dark-gray);
        color: white !important;
        margin: 5px;
        border: 1px solid var(--slate);
        text-decoration: none;

        &:after {
            margin-left: 22px;
            background-color: var(--white);
        }
        &:hover,
        &:focus,
        &:active {
            border: 1px solid white;
            text-decoration: none;
            &:after {
                width: calc(100% - 22px) !important;
            }
            .site-icon {
                color: var(--white) !important;
            }

        }
        &.exists {
            background-color: var(--success);
        }
        &.tzp {
            background-color: var(--lower-blue);
        }
        .site-icon {
            color: var(--lightest-navy);
        }
    }
`;

const SearchBox = (props) => {
    const rec = props.record;
    const siteKeys = ["findagrave", "wikitree", "cemeteriesorg", "billiongraves"];
    let sitesBox = [];
    siteKeys.forEach((site) => {
        const siteInfo = getSiteData(site, rec);
        const btnClass = siteInfo.exists ? 'exists' : ''
        const siteIcon = findIconDefinition({ prefix: 'fas', iconName: siteInfo.icon});

        if(siteInfo.title !== '') {
            const linkIcon = <FontAwesomeIcon icon={siteIcon} className="site-icon" />
            let htmlData = (<div></div>);
            if(site === "wikitree" && siteInfo.exists) {
                htmlData = ( 
                    <Link to={`/connections/${rec.sites[site]}`} 
                        className={`inline-link search-link tzp`} 
                        data-id={rec.sites[site]} 
                        data-site={site}
                        key={rec.sites[site]+"tzp"}>
                            {linkIcon} The Zalewski Project / WikiTree
                    </Link>
                )               
                sitesBox.push(htmlData);
            } else {
                let htmlData = (
                    <a href={siteInfo.link} 
                        target="_blank" 
                        className={`inline-link search-link ${btnClass}`} 
                        data-id={rec.sites[site]} 
                        data-site={site}
                        key={rec.sites[site]+site}
                        rel="noreferrer">
                            {linkIcon} {siteInfo.title}
                    </a>
                )
                sitesBox.push(htmlData);
            }
        }
    });

    return (
        <StyledSearchBox>
            {sitesBox}
        </StyledSearchBox>
    )
}

export default SearchBox;