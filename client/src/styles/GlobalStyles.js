import { createGlobalStyle } from "styled-components";
import variables from "./variables";

const GlobalStyle = createGlobalStyle`
    ${variables}

    table.death-item { font-size: 1.5em; border-spacing: 5; border-collapse: initial; }
    table.death-item td.rowName { margin-bottom: 20px; width: 200px; padding: 5px; background-color: #629ef4; font-weight:bold; }
    table.death-item td.rowEntry { margin-bottom: 20px; width: 400px; padding: 5px; background-color: #c8c8c8; }
    .search-death { cursor: pointer; }
    a.site-link { text-decoration: none !important; }
    a.site-link:hover { text-decoration: underline !important; }
    .death-total { font-size: 1.4em;}
    #footer { padding: 10px; text-align: right; margin-top: 10px; border-top: 1px solid #ccc; }
`;

export default GlobalStyle;