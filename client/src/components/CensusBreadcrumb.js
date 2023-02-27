import { Breadcrumb } from "react-bootstrap";

const CensusBreadcrumb = (props) => {
    const { year, city, state, person } = props

    return (
        year && 
        <Breadcrumb className="bg-opacity-25 bg-secondary">
            <Breadcrumb.Item href="/census">Census</Breadcrumb.Item>
            <Breadcrumb.Item href={`/census/${year}`}>{year}</Breadcrumb.Item>
            {state && <Breadcrumb.Item href={`/census/${year}/${state}`}>{state}</Breadcrumb.Item>}
            {city && <Breadcrumb.Item href={`/census/${year}/${state}/${city}`}>{city}</Breadcrumb.Item>}
            {person && <Breadcrumb.Item active>{person}</Breadcrumb.Item>}
        </Breadcrumb>
    )
}

export default CensusBreadcrumb;