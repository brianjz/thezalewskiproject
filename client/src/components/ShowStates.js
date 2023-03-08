import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledButtons = styled.div`
    ${({ theme }) => theme.mixins.mainButtons};
`;

const StyledCounties = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    text-align: center;

    @media (max-width:768px) {
        grid-template-columns: 1fr;
    }

    h4 {
        margin: 0 0 10px 0;
        font-size: 1.2em;
    }
    .county {
        ${({ theme }) => theme.mixins.boxShadow};
        border: 2px solid #666;
        border-radius: var(--border-radius-button);
        padding: 10px;
    }
    .citylist {
        ${({ theme }) => theme.mixins.mainButtons};
        grid-template-columns: 1fr !important;
        .button a {
            border: 2px solid #666;
            box-shadow: none;
            &:hover,&:focus { 
                box-shadow: none; 
                border-color: var(--blue);
                color: var(--slate);
            }
        }
    }
`;

const ShowStates = (props) => {
    const { state, year, onChangeState } = props

    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    // fetches data
    useEffect(() => {
        const fetchData = async () => {
            if(props.state) {
                await axios.get(`/api/census/${props.year}/${props.state}`)
                .then((response)=>{
                    setCityList(response.data.stateinfo)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                await axios.get(`/api/census/${props.year}/getStates`)
                .then((response)=>{
                    setStateList(response.data.states)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }

        fetchData();
    }, [props.state, props.year]);

    if(isLoading) {
        return 'Loading...';
    }

    return (
            state ?
            <StyledCounties>
            {cityList.map((county) => {
                const countyName = Object.keys(county)[0]
                return (
                <div className="county" key={countyName}>
                    <h4>{countyName} County</h4>
                    <div className="citylist">
                    {county[countyName].map(city => {
                        return (
                            <div key={city} className="button"><Link to={`/census/${year}/${state}/${city.replace(' ', '-')}`}>{city}</Link></div>
                        )
                    })}
                    </div>
                </div>
                )
            })}
            </StyledCounties>
            :
            <StyledButtons>
                {stateList.map(state => {
                   return (
                      <div key={state} className="button"><Link data-state={state} onClick={onChangeState} to={`/census/${year}/${state.replace(' ', '-')}`}>{state}</Link></div>
                    )
                 })}
            </StyledButtons>
    )

}

export default ShowStates;