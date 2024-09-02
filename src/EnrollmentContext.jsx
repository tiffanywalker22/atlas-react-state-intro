import {createContext, useContext, useState} from 'react';

const EnrollmentContext = createContext();

export const useEnrollment = () => useContext(EnrollmentContext);

export function EnrollmentProvider({ children }) {
    const [selectedCourses, setSelectedCourses] = useState ([]);

    const enrollCourse = (course) => {
        if (!selectedCourses.some((c) => c.courseNumber === course.courseNumber)) {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const dropCourse = (courseNumber) => {
        setSelectedCourses(selectedCourses.filter(c => c.courseNumber !== courseNumber));
    };

    return (
        <EnrollmentContext.Provider value={{ selectedCourses, enrollCourse, dropCourse }}>
            {children}
        </EnrollmentContext.Provider>
    );
}
