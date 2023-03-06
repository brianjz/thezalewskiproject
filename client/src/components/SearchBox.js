import { getSiteData } from "../lib/processRecord";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

const SearchBox = (props) => {
    const rec = props.record;
    const siteKeys = ["findagrave", "wikitree", "cemeteriesorg", "billiongraves"];
    let sitesBox = [];
    siteKeys.forEach((site) => {
        const siteInfo = getSiteData(site, rec);
        const btnClass = siteInfo.exists ? 'bg-success fw-bold' : 'bg-secondary text-black'
        const siteIcon = findIconDefinition({ prefix: 'fas', iconName: siteInfo.icon});

        if(siteInfo.title !== '') {
            const linkIcon = <FontAwesomeIcon icon={siteIcon} className="text-primary" />
            let htmlData = (
                <a href={siteInfo.link} 
                    target="_blank" 
                    className={"site-link mb-2 me-2 btn " + btnClass} 
                    data-id={rec.sites[site]} 
                    data-site={site}
                    key={rec.sites[site]+site}
                    rel="noreferrer">
                        {linkIcon} {siteInfo.title}
                </a>
            )
            sitesBox.push(htmlData);
            if(site === "wikitree" && siteInfo.exists) {
                htmlData = ( 
                    <a href={`/connections/${rec.sites[site]}`} 
                        className={"site-link mb-2 me-2 btn bg-info"} 
                        data-id={rec.sites[site]} 
                        data-site={site}
                        key={rec.sites[site]+"tzp"}>
                            {linkIcon} The Zalewski Project
                    </a>
                )               
                sitesBox.push(htmlData);
            }
        }
    });

    return (
        sitesBox
    )
}

export default SearchBox;