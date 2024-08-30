import React, { useEffect, useState } from 'react';

export default function SchoolCatalog() {
  const [courses, updateCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [sortCatalog, setSortCatalog] = useState({ key: null, direction: 'ascending'});

  useEffect(()=> {
    fetch('/api/courses.json')
    .then(response => response.json())
    .then(data => updateCourses(data))
  }, []);

  const sortableCourses = React.useMemo(() => {
    let sortableItems = [...courses];
    if (sortCatalog.key) {
      sortableItems.sort((a, b) => {
        if (a[sortCatalog.key] < b[sortCatalog.key]) {
          return sortCatalog.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortCatalog.key] > b[sortCatalog.key]) {
          return sortCatalog.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [courses, sortCatalog]);
  
  const searchableCourses = courses.filter(course =>
    course.courseNumber.toLowerCase().includes(query.toLowerCase()) ||
    course.courseName.toLowerCase().includes(query.toLowerCase())
  );

  const updateSort = (key) => {
    let direction = 'ascending';
    if (sortCatalog.key === key && sortCatalog.direction === 'ascending') {
      direction = 'descending';
    }
    setSortCatalog({ key, direction });
  };
  
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th onClick={() => updateSort('trimester')}>Trimester</th>
            <th onClick={() => updateSort('courseNumber')}>Course Number</th>
            <th onClick={() => updateSort('courseName')}>Course Name</th>
            <th onClick={() => updateSort('semesterCredits')}>Semester Credits</th>
            <th onClick={() => updateSort('totalClockHours')}>Total Clock Hours</th>
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
