export function parseIndividual(record) {
    // Clean up and parse data
    let cleanFirstName = ''
    if(record.givennames) {
        let words = record.givennames.split(" ");
        let firstGivenName = words[0].toLowerCase();
        cleanFirstName = firstGivenName.replace(/\W/g, '');
        if(cleanFirstName === 'unreadable') {
            cleanFirstName = '';
        }
    }
    let cleanLastName = '';
    let lastname = '';
    if(record.surname) {
        lastname = record.surname.toLowerCase().replace("'","%27");
        cleanLastName = lastname.replace(/\W/g, '');
        if(cleanLastName === 'unreadable') {
            cleanLastName = '';
        }
    }

    const dateParts = new Date(record.date);

    let containsUnknown = false;
    let partialLastName = false;
    let lastQuestion = record.surname.indexOf("?");
    let lastQuestionCount = record.surname.split("?").length - 1
    if(lastQuestion > -1) {
        if(record.surname.lastIndexOf("?") === record.surname.length-1 && cleanLastName.length >= 2 && lastQuestionCount <= 2) {
            partialLastName = true;
        } else {
            containsUnknown = true;
        }
    }


    const parsedIndividual = {
        cleanFirstName: cleanFirstName,
        cleanLastName: cleanLastName,
        dateInfo: dateParts,
        partialLastName: partialLastName,
        containsUnknown: containsUnknown
    }

    return parsedIndividual;
}

export function getSiteData(siteName, rec) {
    const { cleanFirstName, cleanLastName, dateInfo, partialLastName } = parseIndividual(rec);
    const siteId = rec.sites[siteName];


    let siteInfo = {
        title: '',
        link: '',
        exists: false,
        icon: 'monument'
    };
    switch(siteName) {
        case "billiongraves":
            siteInfo.title = 'BillionGraves';
            siteInfo.link = `https://billiongraves.com/search/results?cemetery_country=United%20States&cemetery_state=Wisconsin&cemetery_county=Milwaukee&given_names=${cleanFirstName}&family_names=${cleanLastName}&death_year=${dateInfo.getFullYear()}&year_range=5&size=15`;
            if(siteId) {
                let bgId = rec.sites.billiongraves ? rec.sites.billiongraves.substr(rec.sites.billiongraves.indexOf("/")+1) : '';
                siteInfo.exists = true;
                siteInfo.link = `http://billiongraves.com/pages/record/${siteId}`
                siteInfo.title = siteInfo.title + ` (#${bgId})`;
            }
            break;
        case "findagrave":
            let findagravePartial = partialLastName ? '&namefilter=partialLastName' : ''
            siteInfo.title = 'Find-A-Grave';
            siteInfo.link = `https://www.findagrave.com/memorial/search?firstname=${cleanFirstName}&lastname=${cleanLastName}&deathyear=${dateInfo.getFullYear()}&location=Milwaukee+County%2C+Wisconsin%2C+United+States+of+America&locationId=county_3032${findagravePartial}`;
            if(siteId) {
                siteInfo.exists = true;
                siteInfo.link = `https://www.findagrave.com/memorial/${siteId}`
                siteInfo.title = siteInfo.title + ` (#${siteId})`;
            }
            break;
        case "cemeteriesorg":
            siteInfo.title = 'Milwaukee Catholic Cemeteries';
            siteInfo.link = `http://genealogy.cemeteries.org/genealogySearch0002.asp?Query=110&dod=&LastName=${cleanLastName}&FirstName=${cleanFirstName}`;
            if(siteId) {
                siteInfo.exists = true;
                siteInfo.link = `http://genealogy.cemeteries.org/genealogy_03.asp?Query=100&ID=${siteId}`
                siteInfo.title = siteInfo.title + ` (#${siteId})`;
            }
            break;
        case "wikitree":
            siteInfo.title = 'WikiTree';
            siteInfo.icon = 'circle-user'
            // TODO: Need better search option, WikiTree built-in search uses POST
            siteInfo.link = `https://cse.google.com/cse?cx=partner-pub-5983849578006601%3A2801067696&ie=UTF-8&textSearchType=on&q=${cleanFirstName}+${cleanLastName}+${dateInfo.getFullYear()}&sa=Go`;
            if(siteId) {
                siteInfo.exists = true;
                siteInfo.link = `https://www.wikitree.com/wiki/${siteId}`
                siteInfo.title = siteInfo.title + ` (${siteId})`;
            }
            break;
        default:
    }

    return siteInfo;
}