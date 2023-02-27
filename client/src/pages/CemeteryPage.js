const CemeteryPage = () => {
    return (
        <div id="row col-md-12">
            <h2>Cemetery Records</h2>
            <p class="lead">With sites out there like Find-A-Grave and Billion Graves, it's not especially efficient to try to collect and save all cemetery/burial records on this site. For now, I will just be linking to a "Zalewski"
            search page on those sites so you can browse them on your own and the data will be completely up to date.</p>
            <div class="row">
                <div class="col-md-4"><a class="btn btn-primary btn-lg w-100 py-4" role="button" href="https://www.findagrave.com/cgi-bin/fg.cgi?page=gsr&GSfn=&GSmn=&GSln=Zalewski&GSbyrel=all&GSby=&GSdyrel=all&GSdy=&GScntry=0&GSst=0&GSgrid=&df=all&GSob=n" title="Find-A-Grave">Find-A-Grave</a></div>
                <div class="col-md-4"><a class="btn btn-primary btn-lg w-100 py-4" role="button" href="/deaths/search/Zalewski" title="Death Index">Milwaukee Death Index</a></div>
                <div class="col-md-4"><a class="btn btn-primary btn-lg w-100 py-4" role="button" href="https://billiongraves.com/search/results?family_names=zalewski&size=15" title="Billion Graves">
                    Billion Graves</a>
                </div>
            </div>
        </div>
    )
}

export default CemeteryPage;