
import { BrowserRouter, Route,  Routes } from 'react-router-dom';

import Home from './Pages/Home';
import Predictor from './Pages/Patient/Predictor';
import EmailForm from './components/EmailForm';
import Dashboard from './Pages/Patient/Dashboard';
import Prescription from './Pages/Patient/Prescription';
import Notification from './Pages/Patient/Notification';
import Diet from './Pages/Patient/Diet';
import DasboardDoc from './Pages/Doctor/DashboardDoc';
import PatientDetails from './Pages/Doctor/PatientDetails';
import Appointment from './Pages/Doctor/Appointment';
import AppointmentRequest from './Pages/Doctor/AppointmentRequest';
import PrescriptionManagement from './Pages/Doctor/PrescriptionManagement';
import Registration from './Pages/RegistrationPage';
import Login from './Pages/LoginPage';
import NotFound from './Pages/NotFound';
import ResetPassword from './Pages/ResetPasswordPage';
import GetPasscode from './Pages/GetPasscodePage';
import VerifyPasscodePage from './Pages/VerifyPasscodePage';
import Appointments from './Pages/Doctor/appointments';
import PrescriptionList from './Pages/Doctor/PrescriptionList';
import DietPlan from './Pages/Doctor/DietPlan';



const App = () => {
  return (
    <BrowserRouter>
      <div>

        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/register" element={<Registration />} />
          <Route path="/predict" element={<Predictor />} />
          <Route path="/email" element={<EmailForm />} />
          <Route path="/Patient" element={<Dashboard />} />
          <Route path="/Patient/Prescription" element={<Prescription />} />
          <Route path="/Patient/Notification" element={<Notification />} />
          <Route path="/Patient/diet" element={<Diet />} />
          <Route path="/Doctor" element={<DasboardDoc />} />
          <Route path="/Doctor/setdiet" element={<DietPlan/>} />
          <Route path="/Doctor/patient" element={<PatientDetails />} />
          <Route path="/Doctor/appointment" element={<Appointment />} />
          <Route path="/Doctor/listappointment" element={<Appointments />} />
          <Route path="/Doctor/request" element={<AppointmentRequest />} />
          <Route path="/Doctor/prescription" element={<PrescriptionManagement />} />
          <Route path="/Doctor/listPrescriptions" element={<PrescriptionList />} />
          <Route path="/getpasscode" element={<GetPasscode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-passcode" element={<VerifyPasscodePage />} />
          <Route  path="/notfound" element={<NotFound/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

