import React, { useEffect, useState } from 'react';

export default function SchoolCatalog() {
  const [courses, updateCourses] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(()=> {
    fetch('/api/courses.json')
    .then(response => response.json())
    .then(data => updateCourses(data))
  }, []);

  const searchableCourses = courses.filter(course =>
    course.courseNumber.toLowerCase().includes(query.toLowerCase()) ||
    course.courseName.toLowerCase().includes(query.toLowerCase())
  );
  
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {searchableCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
              <button>Enroll</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
