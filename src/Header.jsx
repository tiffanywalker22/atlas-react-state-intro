import logo from "./assets/logo.png";
import { useEnrollment } from './EnrollmentContext';

export default function Header() {
  const { selectedCourses } = useEnrollment();

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {selectedCourses.length}</div>
    </div>
  );
}
