import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Login from '../src/components/Login';
import Register from '../src/components/Register';
// import ManageMovies from '../src/components/ManageMovies';
import MovieManagement from '../src/components/MovieManagement';
import WorkShedule from '../src/components/WorkShedule';
import UpdateWorkSchedule from '../src/components/UpdateWorkSchedule';
import EmployeeList from '../src/components/Employee';
import WorkScheduleEmployee from '../src/components/WorkSheduleEmployee';
import UpdateWorkScheduleEmployee from '../src/components/UpdateWorkSheduleEmployee';
import WorkScheduleStats from '../src/components/WorkScheduleStats';
import AddMovie from '../src/components/AddMovie';
import TicketCollector from './components/TicketCollector';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage.jsx';
import TicketPage from './pages/TicketPage.jsx';
import EmployeeProfile from './pages/EmployeeProfile.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* <Route path='/register' element={<Register />} /> */}
        {/* <Route path="/manageMovies" element={<ManageMovies />} /> */}
        <Route path='/movies' element={<MovieManagement />} />
        <Route path='/movies/addmovie/:id?' element={<AddMovie />} />
        {/* <Route path="/movies/addmovie" element={<AddMovie />} /> */}
        <Route path='/workShedule' element={<WorkShedule />} />
        <Route path='/update/:id' element={<UpdateWorkSchedule />} />
        <Route path='/workSheduleEmployee' element={<WorkScheduleEmployee />} />
        <Route
          path='/update-work-schedule/:id'
          element={<UpdateWorkScheduleEmployee />}
        />
        <Route path='/employee' element={<EmployeeList />} />
        <Route path='/workScheduleStats' element={<WorkScheduleStats />} />
        <Route path='/thu-ve' element={<TicketCollector />} />{' '}
        <Route path='/logins' element={<LoginPage />} />
        <Route path='/registers' element={<RegisterPage />} />
        <Route path='/tickets' element={<TicketPage />} />
        <Route path='/profile' element={<EmployeeProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
