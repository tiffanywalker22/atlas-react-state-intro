import React, { useEffect, useState } from 'react';

export default function SchoolCatalog() {
  const [courses, updateCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [sortCatalog, setSortCatalog] = useState({ key: null, direction: 'ascending'});
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

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
  
  const searchableCourses = React.useMemo(() =>
    sortableCourses.filter(course =>
    course.courseNumber.toLowerCase().includes(query.toLowerCase()) ||
    course.courseName.toLowerCase().includes(query.toLowerCase())
  ), [sortableCourses, query]);

  const paginatedCourses = React.useMemo(() => {
    const startIndex = (currentPage -1) * dataPerPage;
    return searchableCourses.slice(startIndex, startIndex + dataPerPage);
  }, [searchableCourses, currentPage]);

  const updateSort = (key) => {
    let direction = 'ascending';
    if (sortCatalog.key === key && sortCatalog.direction === 'ascending') {
      direction = 'descending';
    }
    setSortCatalog({ key, direction });
  };

  const previousPage =() => {
    if (currentPage > 1) setCurrentPage(currentPage -1);
  };

  const nextPage = () => {
    if (currentPage * dataPerPage < searchableCourses.length) setCurrentPage(currentPage + 1);
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
          {paginatedCourses.map((course, index) => (
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
        <button onClick={previousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={currentPage * dataPerPage >= searchableCourses.length}>Next</button>
      </div>
    </div>
  );
}
