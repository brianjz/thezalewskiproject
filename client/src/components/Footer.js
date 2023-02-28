const Footer = () => {
    return (
        <div className="container-fluid" id="footer">
            <div className="col-12 footer">
                <div className="text-black text-opacity-50">
                    &copy;{new Date().getFullYear()} <a href="http://www.brianzalewski.com/">Brian Zalewski</a>
                    <br />Made with love using Node.js & React.<br />For comments or issues please <a href="http://www.zalewskifamily.net/contact">contact me</a>.
                </div>
            </div>
        </div>
    )
}

export default Footer;