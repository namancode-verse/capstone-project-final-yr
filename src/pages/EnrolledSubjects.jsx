import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CourseContext from '../context/CourseContext';

const EnrolledSubjects = () => {
  const { user } = useContext(AuthContext);
  const { getEnrolledCourses, enrolledCourses } = useContext(CourseContext);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockEnrollments = [
    {
      _id: '1',
      course: {
        _id: '101',
        title: 'Introduction to Computer Science',
        description: 'A foundational course covering the basics of computer science and programming.',
        courseCode: 'CS101',
        credits: 3,
        domain: 'Computer Science',
        level: 'Beginner',
        modality: 'Blended'
      },
      progress: 75,
      grade: 'B+',
      status: 'active',
      assignments: [
        { name: 'Assignment 1', status: 'completed', score: 90 },
        { name: 'Assignment 2', status: 'completed', score: 85 },
        { name: 'Assignment 3', status: 'pending', score: null }
      ],
      quizzes: [
        { name: 'Quiz 1', status: 'completed', score: 92 },
        { name: 'Quiz 2', status: 'completed', score: 78 },
        { name: 'Final Exam', status: 'pending', score: null }
      ],
      attendance: 85
    },
    {
      _id: '2',
      course: {
        _id: '102',
        title: 'Data Structures and Algorithms',
        description: 'Learn about fundamental data structures and algorithms used in computer science.',
        courseCode: 'CS201',
        credits: 4,
        domain: 'Computer Science',
        level: 'Intermediate',
        modality: 'Online'
      },
      progress: 60,
      grade: 'A-',
      status: 'active',
      assignments: [
        { name: 'Assignment 1', status: 'completed', score: 95 },
        { name: 'Assignment 2', status: 'pending', score: null }
      ],
      quizzes: [
        { name: 'Quiz 1', status: 'completed', score: 88 },
        { name: 'Midterm', status: 'pending', score: null },
        { name: 'Final Exam', status: 'pending', score: null }
      ],
      attendance: 90
    },
    {
      _id: '3',
      course: {
        _id: '103',
        title: 'Database Management Systems',
        description: 'Introduction to database concepts, design, and implementation.',
        courseCode: 'CS301',
        credits: 3,
        domain: 'Computer Science',
        level: 'Intermediate',
        modality: 'In-person'
      },
      progress: 40,
      grade: null,
      status: 'active',
      assignments: [
        { name: 'Assignment 1', status: 'completed', score: 82 },
        { name: 'Assignment 2', status: 'pending', score: null },
        { name: 'Assignment 3', status: 'pending', score: null }
      ],
      quizzes: [
        { name: 'Quiz 1', status: 'completed', score: 75 },
        { name: 'Midterm', status: 'pending', score: null },
        { name: 'Final Exam', status: 'pending', score: null }
      ],
      attendance: 78
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        await getEnrolledCourses(user.id);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, getEnrolledCourses]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Use real data if available, otherwise use mock data
  const displayEnrollments = enrolledCourses && enrolledCourses.length > 0 ? enrolledCourses : mockEnrollments;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Enrolled Subjects</h1>
        
        {displayEnrollments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
            <Link 
              to="/available-subjects" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Browse Available Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {displayEnrollments.map(enrollment => (
              <div key={enrollment._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{enrollment.course.title}</h2>
                      <p className="text-sm text-gray-600">{enrollment.course.courseCode} • {enrollment.course.credits} credits</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${enrollment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {enrollment.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                      {enrollment.grade && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          Grade: {enrollment.grade}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-gray-700">{enrollment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Assignments */}
                    <div className="border border-gray-200 rounded-md p-3">
                      <h3 className="font-medium text-gray-800 mb-2">Assignments</h3>
                      <ul className="space-y-2">
                        {enrollment.assignments.map((assignment, index) => (
                          <li key={index} className="text-sm flex justify-between">
                            <span>{assignment.name}</span>
                            <span className={`${assignment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {assignment.status === 'completed' ? `${assignment.score}%` : 'Pending'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Quizzes */}
                    <div className="border border-gray-200 rounded-md p-3">
                      <h3 className="font-medium text-gray-800 mb-2">Quizzes & Exams</h3>
                      <ul className="space-y-2">
                        {enrollment.quizzes.map((quiz, index) => (
                          <li key={index} className="text-sm flex justify-between">
                            <span>{quiz.name}</span>
                            <span className={`${quiz.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {quiz.status === 'completed' ? `${quiz.score}%` : 'Pending'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Attendance */}
                    <div className="border border-gray-200 rounded-md p-3">
                      <h3 className="font-medium text-gray-800 mb-2">Attendance</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${enrollment.attendance >= 75 ? 'bg-green-600' : 'bg-yellow-600'}`}
                            style={{ width: `${enrollment.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{enrollment.attendance}%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {enrollment.attendance >= 75 ? 'Good standing' : 'Attendance below requirement'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between">
                  <Link 
                    to={`/course/${enrollment.course._id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Course Details
                  </Link>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Download Materials
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledSubjects;