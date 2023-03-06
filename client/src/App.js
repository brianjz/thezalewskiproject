import GlobalStyle from './styles/GlobalStyles';
import theme from './styles/theme';
import './bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './lib/constants';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import RecordPage from './pages/RecordPage';
import SignIn from './components/SignIn';
import NotFoundPage from './pages/NotFoundPage';
import CreateRecordPage from './pages/CreateRecordPage';
import DeathIndex from './pages/DeathIndex';
import CensusListPage from './pages/CensusListPage';
import CensusItems from './pages/CensusItems';
import Person from './pages/PersonPage';
import CemeteryPage from './pages/CemeteryPage';
import Footer from './components/Footer';
import Connection from './pages/Connections';
import { ThemeProvider } from 'styled-components';

function App() {
  const siteTitle = "The Zalewski Project - "
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <NavBar />
          <Container>
            {/* <h1 className='text-success'>The Zalewski Project</h1> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/deaths/record/add" element={<CreateRecordPage />} />
              <Route path="/deaths/record/edit/:recId" element={<CreateRecordPage />} />
              <Route path="/deaths/record/:recId" element={<RecordPage />} />
              <Route path="/deaths/search/:term" element={<DeathIndex />} />
              <Route path="/deaths/:year" element={<DeathIndex />} />
              <Route path="/deaths" element={<DeathIndex />} />
              <Route path="/census" element={<CensusListPage title={`${siteTitle}Census Records`} />} />
              <Route path="/census/:year" element={<CensusListPage title={`${siteTitle}Census Records`}/>} />
              <Route path="/census/:year/:state" element={<CensusListPage title={`${siteTitle}Census`} />} />
              <Route path="/census/:year/:state/:city" element={<CensusItems title={`${siteTitle}Census`} />} />
              <Route path="/census/person/:personId" element={<Person title={siteTitle} />} />
              <Route path="/connections/:personId" element={<Connection />} />
              <Route path="/cemetery" element={<CemeteryPage />} />
              <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
          <Footer />
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
