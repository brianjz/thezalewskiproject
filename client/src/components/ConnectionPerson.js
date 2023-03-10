import styled from 'styled-components'
import { Link } from 'react-router-dom';
import wikitree from '../images/wikitree.png'
import { processDateString } from '../lib/common';

const StyledPerson = styled.div`
    border: 1px solid #000;
    border-radius: var(--border-radius);
    margin: 20px;
    padding: 20px;
    min-width: 500px;
    position: relative;

    @media (max-width: 768px) {
        width: 100%;
        min-width: initial;
        margin: 10px 0;
        &:not(.self) {
            padding-top: 30px;
        }
    }

    &.father {
        border-color: blue;
        img.profile-photo {
            padding: 15px 10px 10px 10px;
        }
    }
    &.mother {
        border-color: red;
        .relation { 
            background-color: red;
        }
        img.profile-photo {
            padding: 15px 10px 10px 10px;
        }
    }

    ${({ theme }) => theme.mixins.boxShadow};

    img.profile-photo {
        float: right;
        padding: 10px;
    }
    
    h3 {
        font-size: 1.3em;

        a {
            padding: 0 5px;
            color: var(--dark-blue);
            img {
                width: 24px;
                height: 24px;
                &:hover,
                &:focus {
                    transform: translateY(-2px);
                    transition: var(--transition);
                }
            }   
        }
    }
    .date {
        span {
            font-weight: bold;
        }
    }

    h5 {
        margin: 0 0 10px 0;
    }

    .children {
        border-top: 5px solid var(--dark-slate);
        margin-top: 10px;
        background-color: var(--blue);
        padding: 10px;
        border-radius: var(--border-radius);

        a {
            color: var(--dark-slate);
            &:hover,
            &:focus {
                color: var(--slate);
            }
        }
    }

    .spouses {
        border-top: 5px solid var(--dark-slate);
        margin-top: 10px;
        background-color: #3caee1;
        padding: 10px;
        border-radius: var(--border-radius);

        a {
            color: var(--dark-slate);
            &:hover,
            &:focus {
                color: var(--navy);
            }
        }
    }
    
    .relation {
        color: white;
        padding: 3px 5px;
        background-color: blue;
        position: absolute;
        top: 0;
        right: 0;
        border-bottom-left-radius: var(--border-radius);
    }
    
`;

const ConnectionPerson = (props) => {
    const { person, relation } = props

    const birthDate = processDateString(person.BirthDate);
    const deathDate = processDateString(person.DeathDate);
    const relClass = relation ? relation.toLowerCase() : "self"
    const hasSpouse = (person.Spouses && Object.keys(person.Spouses).length > 0) ? true : false // being set this way since no spouse arrives as empty array, but with spouse(s) arrives as object
    const spouses = []
    if(hasSpouse && relation === "self") { // only show public spouses
        Object.keys(person.Spouses).forEach((sp) => {
            // https://github.com/wikitree/wikitree-api/blob/main/getProfile.md
            if(person.Spouses[sp].Privacy >= 50) {
                spouses.push(sp)
            }
        })
    }
    const children = [];
    if(person.HasChildren && relation === "self") { // only show public children
        Object.keys(person.Children).forEach((child) => {
            // https://github.com/wikitree/wikitree-api/blob/main/getProfile.md
            if(person.Children[child].Privacy >= 50) {
                children.push(child)
            }
        })
    }

    const fullName = (person.RealName && person.RealName !== person.FirstName) ? person.LongName + " (" + person.RealName + ")" : person.LongName

    return (
        <StyledPerson className={relClass}>
            {person.Photo &&
                <img className="profile-photo" src={`https://www.wikitree.com${person.PhotoData.url}`} alt={person.LongName} />
            }
            {(relation && relation !== "self") && <div className="relation">{relation}</div>}
            <h3>
                { relation === "self" 
                ? fullName
                : <Link to={`/connections/${person.Name}`} className="inline-link" onClick={props.onChange}>{fullName}</Link>
                }
                <a href={`https://www.wikitree.com/wiki/${person.Name}`} rel="nofollow"><img className="iconLink" src={wikitree} alt="WikiTree" title="WikiTree Profile" /></a>
            </h3>
            { birthDate && 
                <div className="date">
                    <span>Born:</span> {birthDate} {person.BirthLocation && `in ${person.BirthLocation.replace(', United States', '')}`}
                </div>
            }
            { deathDate && 
                <div className="date">
                    <span>Died:</span> {deathDate} {person.DeathLocation && `in ${person.DeathLocation.replace(', United States', '')}`}
                </div>
            }
            { hasSpouse &&
                <div className="spouses">
                    <h5>{ spouses.length === 1 ? "Spouse:" : "Spouses:" }</h5>
                    {spouses.map((sp) => {
                        return (
                            <div key={sp}>
                                <Link to={`/connections/${person.Spouses[sp].Name}`} onClick={props.onChange}>{person.Spouses[sp].LongName}</Link>
                                {/* &nbsp;({processDateString(person.Spouses[sp].BirthDate, true)} - {processDateString(person.Spouses[sp].DeathDate, true)}) */}
                                &nbsp; (Married: {processDateString(person.Spouses[sp].marriage_date, true)})
                            </div>
                        )
                    })}
                </div>
            }
            { children.length > 0 && 
                <div className="children">
                    <h5>Children:</h5>
                    {children.map((child) => {
                        return (
                            <div key={child}>
                                <Link to={`/connections/${person.Children[child].Name}`} onClick={props.onChange}>{person.Children[child].LongName}</Link>
                                &nbsp;({processDateString(person.Children[child].BirthDate, true)} - {processDateString(person.Children[child].DeathDate, true)})
                            </div>
                        )
                    })}
                </div>
            }
        </StyledPerson>
    )
}

export default ConnectionPerson;