import { createContext, useState } from 'react';
import axios from 'axios';

const CourseContext = createContext();

export { CourseContext };

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all courses
  const getCourses = async (query = '') => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/courses${query}`);
      setCourses(res.data.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
      setLoading(false);
      return { success: false, message: err.response?.data?.message || 'Failed to fetch courses' };
    }
  };

  // Get single course
  const getCourse = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch course');
      setLoading(false);
      return { success: false, message: err.response?.data?.message || 'Failed to fetch course' };
    }
  };

  // Get enrolled courses
  const getEnrolledCourses = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/users/${userId}/courses`);
      setEnrolledCourses(res.data.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch enrolled courses');
      setLoading(false);
      return { success: false, message: err.response?.data?.message || 'Failed to fetch enrolled courses' };
    }
  };

  // Get recommended courses
  const getRecommendedCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/courses/recommended');
      setRecommendedCourses(res.data.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recommended courses');
      setLoading(false);
      return { success: false, message: err.response?.data?.message || 'Failed to fetch recommended courses' };
    }
  };

  // Enroll in a course
  const enrollCourse = async (courseId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/courses/${courseId}/enroll`);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll in course');
      return { success: false, message: err.response?.data?.message || 'Failed to enroll in course' };
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrolledCourses,
        recommendedCourses,
        loading,
        error,
        getCourses,
        getCourse,
        getEnrolledCourses,
        getRecommendedCourses,
        enrollCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;