import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import { APP_ROUTES } from './lib/constants';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import SignIn from './components/SignIn';
import NotFoundPage from './pages/NotFoundPage';
import CreateRecordPage from './pages/CreateRecordPage';
import DeathIndex from './pages/DeathIndex';
import CensusListPage from './pages/CensusListPage';
import CensusItems from './pages/CensusItems';
import Person from './pages/PersonPage';
import CemeteryPage from './pages/CemeteryPage';
import Connection from './pages/Connections';
import WikiTree from './pages/WikiTree';
import NavBar from "./components/NavBar";
import GlobalStyle from './styles/GlobalStyles';
import theme from './styles/theme';
import Footer from './components/Footer';
import styled, { ThemeProvider } from 'styled-components'
import { Outlet } from 'react-router';
import { ScrollRestoration } from "react-router-dom";
import ScrollToTop from "./lib/ScrollToTop";

const StyledContainer = styled.div`
`;

const AppLayout = () => (
    <>
    <ScrollRestoration />
    <ScrollToTop />
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <NavBar />
        <StyledContainer className="main">
            <Outlet />
        </StyledContainer>
        <Footer />
    </ThemeProvider>
</>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/deaths/record/add" element={<CreateRecordPage />} />
        <Route path="/deaths/record/edit/:recId" element={<CreateRecordPage />} />
        <Route path="/deaths/record/:recId" element={<RecordPage />} />
        <Route path="/deaths/search/:term" element={<DeathIndex />} />
        <Route path="/deaths/:year" element={<DeathIndex />} />
        <Route path="/deaths" element={<DeathIndex />} />
        <Route path="/census" element={<CensusListPage />} />
        <Route path="/census/:year" element={<CensusListPage />} />
        <Route path="/census/:year/:state" element={<CensusListPage />} />
        <Route path="/census/:year/:state/:city" element={<CensusItems />} />
        <Route path="/census/person/:personId" element={<Person />} />
        <Route path="/connections/:personId" element={<Connection />} />
        <Route path="/wikitree/:page?" element={<WikiTree />} />
        <Route path="/cemetery" element={<CemeteryPage />} />
        <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;