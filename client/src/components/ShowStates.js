import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const ShowStates = (props) => {
    const {state, year}  = props;

    let [stateList, setStateList] = useState('')
    let [cityList, setCityList] = useState('')
    let [isLoading, setIsLoading] = useState(true);
    // fetches data
    useEffect(() => {
        const fetchData = async () => {
            if(state) {
                await axios.get(`/api/census/${year}/${state}`)
                .then((response)=>{
                    setCityList(response.data.stateinfo)
                    setIsLoading(false)
                    // console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
            } else {
                await axios.get(`/api/census/${year}/getStates`)
                .then((response)=>{
                    setStateList(response.data.states)
                    setIsLoading(false)
                    // console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }

        fetchData();
    }, [year, state]);

    if(isLoading) {
        return 'Loading...';
    } else {
        // console.log(cityList)
    }


    return (
        <div className="row row-cols-3 g-3">
            {state ?
                cityList.map((county) => {
                    const countyName = Object.keys(county)[0]
                    return (
                    <div>
                    <Card as="div" key={countyName} id={`cities-${countyName.replace(' ', '-').toLowerCase()}`} className="text-center col p-0 border-dark">
                        <Card.Header className="bg-info text-light fw-bold">{countyName} County</Card.Header>
                        <Card.Body>
                        {county[countyName].map(city => {
                            return (
                                <Card.Text key={city}>
                                    <a className="btn btn-primary btn-lg w-100 py-4" href={`/census/${year}/${state}/${city.replace(' ', '-')}`}>{city}</a>
                                </Card.Text>
                            )
                        })}
                        </Card.Body>
                    </Card>
                    </div>
                    )
                })
            :
                    stateList.map(state => {
                        return (
                            <div class="col-md-4 mb-2">
                            <a key={state} className="btn btn-primary btn-lg w-100 py-4" href={`/census/${year}/${state.replace(' ', '-')}`}>{state}</a>
                            </div>
                        )
                    })
            }
        </div>
    )

}

export default ShowStates;