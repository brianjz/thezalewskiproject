import './App.css';
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

function App() {
  // useEffect(() => {
  //   readCookie();
  // }, []);

  
  return (
    <BrowserRouter>
        <NavBar />
        <Container>
          <h1 className='text-success'>The Zalewski Project</h1>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/record/add" element={<CreateRecordPage />} />
            <Route path="/record/edit/:recId" element={<CreateRecordPage />} />
            <Route path="/record/:recId" element={<RecordPage />} />
            <Route path="/:year" element={<HomePage />} />
            <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
    </BrowserRouter>
  );
}

export default App;
