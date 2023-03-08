import styled from "styled-components";

const StyledFooter = styled.footer`
    padding: 10px; 
    text-align: right; 
    margin-top: 10px; 
    border-top: 1px solid #ccc;
    font-size: var(--fz-xs);
    color: #666;
    a {
        color: #666;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            Made with love using Node.js & React.
            <br />&copy;{new Date().getFullYear()} <a href="http://www.brianzalewski.com/">Brian Zalewski</a>. For comments 
            or issues please <a href="http://www.zalewskifamily.net/contact">contact me</a>.
        </StyledFooter>
    )
}

export default Footer;