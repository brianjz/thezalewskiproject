import { createGlobalStyle } from "styled-components";
import variables from "./variables";

const GlobalStyle = createGlobalStyle`
    ${variables}

    html {
        box-sizing: border-box;
        width: 100%;
        scroll-behavior: smooth;
        scrollbar-width: thin;
        scrollbar-color: var(--lower-blue) var(--white);
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body { 
        margin: 0;
        width: 100%;
        min-height: 100%;
        overflow-x: hidden;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-family: var(--font-sans);
        font-size: var(--fz-xl);
        line-height: 1.3;

        .main {
            margin: 0 auto;
            margin-top: var(--below-navbar);
            width: 100%;
            max-width: 1600px;
            min-height: 100vh;
            padding: 0 100px;

            @media (max-width:768px) {
                padding: 0 10px;
            }
        }
    }

    .button {
        ${({ theme }) => theme.mixins.button};
    }

    a.inline-link {
        ${({ theme }) => theme.mixins.inlineLink};
    }
    #navBar a.inline-link {
        &:hover,
        &:focus,
        &:active {
            color: var(--white);
            & > * {
                color: var(--white) !important;
            }
        }
        &:after {
            background-color: var(--white);
        }
    }
    .search-death { cursor: pointer; }
    .death-total { font-size: 1.4em;}
    .alertbox { 
        ${({ theme }) => theme.mixins.alertBox };
    }
`;

export default GlobalStyle;