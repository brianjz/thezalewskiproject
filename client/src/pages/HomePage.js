const HomePage = () => {
    return (
        <>
        <div id="row col-md-8 col-12">
            <h2>Welcome to the beginnings of The Zalewski Project.</h2>
            <p className="lead">We hope to collect as much data on people and families with the surname ZALEWSKI (and its variations) and put it all in one easy place.</p>
            <div className="alert alert-info" role="alert">The new Interactive Family Tree is now live. Consisiting of mainly Milwaukee Zalewski lines, it connects everyone together as much as possible. Sign up and add your own information and memories!</div>
            <div className="row mb-4">
                <div className="col-md-6"><a href="/census" className="w-100 btn btn-primary btn-lg py-4" role="button">Census Records (1880 & 1900)</a></div>
                <div className="col-md-6"><a href="https://www.zalewskifamily.net/tzp" className="btn btn-primary btn-lg w-100 py-4" role="button">Interactive Family Tree</a></div>
            </div>
            <div className="row">
                <div className="col-md-6"><a href="/cemetery" className="btn btn-primary btn-lg w-100 py-4" role="button">Cemetery Records</a></div>
                <div className="col-md-6"><a href="/deaths" className="btn btn-primary btn-lg w-100 py-4" role="button">Milwaukee Death Index</a></div>
            </div>
        </div>        
        </>
    );
}

export default HomePage;