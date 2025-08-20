import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CourseContext from '../context/CourseContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { getCourse, enrollInCourse, loading: courseLoading } = useContext(CourseContext);
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [enrollmentStatus, setEnrollmentStatus] = useState('not-enrolled'); // 'not-enrolled', 'pending', 'enrolled'

  // Mock data for demonstration
  const mockCourse = {
    _id: id,
    title: 'Advanced Data Structures and Algorithms',
    description: 'This course covers advanced topics in data structures and algorithms, including complex tree structures, graph algorithms, dynamic programming, and algorithm design techniques.',
    courseCode: 'CS301',
    credits: 4,
    semester: 'Fall 2023',
    domain: 'Computer Science',
    level: 'Advanced',
    modality: 'Blended',
    duration: '14 weeks',
    skills: ['Algorithm Design', 'Problem Solving', 'Computational Complexity', 'Dynamic Programming', 'Graph Theory'],
    prerequisites: ['CS201: Data Structures', 'MATH201: Discrete Mathematics'],
    corequisites: [],
    syllabus: [
      {
        week: 1,
        topic: 'Review of Basic Data Structures and Algorithm Analysis',
        content: 'Review of arrays, linked lists, stacks, queues, and basic algorithm analysis techniques.'
      },
      {
        week: 2,
        topic: 'Advanced Tree Structures',
        content: 'AVL trees, Red-Black trees, B-trees, and their applications.'
      },
      {
        week: 3,
        topic: 'Graph Representations and Traversals',
        content: 'Adjacency matrices, adjacency lists, BFS, DFS, and their applications.'
      },
      {
        week: 4,
        topic: 'Shortest Path Algorithms',
        content: 'Dijkstra\'s algorithm, Bellman-Ford algorithm, Floyd-Warshall algorithm.'
      },
      {
        week: 5,
        topic: 'Minimum Spanning Trees',
        content: 'Prim\'s algorithm, Kruskal\'s algorithm, and applications.'
      },
      {
        week: 6,
        topic: 'Dynamic Programming I',
        content: 'Introduction to dynamic programming, memoization, and tabulation.'
      },
      {
        week: 7,
        topic: 'Dynamic Programming II',
        content: 'Advanced dynamic programming problems and techniques.'
      },
      {
        week: 8,
        topic: 'Midterm Exam',
        content: 'Comprehensive exam covering weeks 1-7.'
      },
      {
        week: 9,
        topic: 'Greedy Algorithms',
        content: 'Greedy algorithm design paradigm and classic problems.'
      },
      {
        week: 10,
        topic: 'Divide and Conquer',
        content: 'Divide and conquer algorithm design paradigm and applications.'
      },
      {
        week: 11,
        topic: 'String Algorithms',
        content: 'Pattern matching, string hashing, and suffix trees.'
      },
      {
        week: 12,
        topic: 'NP-Completeness',
        content: 'Introduction to computational complexity theory and NP-complete problems.'
      },
      {
        week: 13,
        topic: 'Approximation Algorithms',
        content: 'Techniques for designing approximation algorithms for NP-hard problems.'
      },
      {
        week: 14,
        topic: 'Final Exam',
        content: 'Comprehensive exam covering the entire course.'
      }
    ],
    instructors: [
      {
        name: 'Dr. Jane Smith',
        title: 'Associate Professor',
        email: 'jane.smith@university.edu',
        office: 'Science Building, Room 305',
        officeHours: 'Monday and Wednesday, 2:00 PM - 4:00 PM'
      },
      {
        name: 'Dr. Robert Johnson',
        title: 'Assistant Professor',
        email: 'robert.johnson@university.edu',
        office: 'Science Building, Room 310',
        officeHours: 'Tuesday and Thursday, 1:00 PM - 3:00 PM'
      }
    ],
    assessments: [
      { type: 'Assignments', weight: 30, description: '5 programming assignments throughout the semester' },
      { type: 'Midterm Exam', weight: 25, description: 'In-class exam covering weeks 1-7' },
      { type: 'Final Exam', weight: 35, description: 'Comprehensive exam covering the entire course' },
      { type: 'Participation', weight: 10, description: 'In-class participation and discussion' }
    ],
    resources: [
      { type: 'Textbook', title: 'Algorithm Design', authors: 'Kleinberg and Tardos', link: '#' },
      { type: 'Textbook', title: 'Introduction to Algorithms', authors: 'Cormen, Leiserson, Rivest, and Stein', link: '#' },
      { type: 'Online Resource', title: 'Algorithm Visualizations', link: 'https://visualgo.net/' },
      { type: 'Online Resource', title: 'LeetCode', description: 'Practice platform for algorithms', link: 'https://leetcode.com/' }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCourse = await getCourse(id);
        if (fetchedCourse) {
          setCourse(fetchedCourse);
        } else {
          // If API call fails or returns no data, use mock data
          setCourse(mockCourse);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setCourse(mockCourse);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, getCourse]);

  const handleEnroll = async () => {
    if (user && user.id && course) {
      setEnrollmentStatus('pending');
      try {
        await enrollInCourse(user.id, course._id);
        setEnrollmentStatus('enrolled');
        // Show success message or redirect
      } catch (error) {
        console.error('Error enrolling in course:', error);
        setEnrollmentStatus('not-enrolled');
        // Show error message
      }
    }
  };

  if (loading || courseLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
        <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/available-subjects')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Browse Available Courses
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                {course.courseCode}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                {course.credits} Credits
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {course.level}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                {course.modality}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800">
                {course.domain}
              </span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button 
              onClick={handleEnroll}
              disabled={enrollmentStatus === 'enrolled' || enrollmentStatus === 'pending'}
              className={`px-6 py-2 rounded-md transition ${
                enrollmentStatus === 'enrolled' ? 'bg-green-600 text-white cursor-default' :
                enrollmentStatus === 'pending' ? 'bg-gray-400 text-white cursor-wait' :
                'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {enrollmentStatus === 'enrolled' ? 'Enrolled' :
               enrollmentStatus === 'pending' ? 'Processing...' :
               'Enroll Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Course Navigation */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'syllabus' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('syllabus')}
            >
              Syllabus
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'instructors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('instructors')}
            >
              Instructors
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'assessments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('assessments')}
            >
              Assessments
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Description</h2>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Course Details</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="w-32 text-gray-600">Course Code:</span>
                      <span className="font-medium">{course.courseCode}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Credits:</span>
                      <span className="font-medium">{course.credits}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Level:</span>
                      <span className="font-medium">{course.level}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Domain:</span>
                      <span className="font-medium">{course.domain}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Modality:</span>
                      <span className="font-medium">{course.modality}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32 text-gray-600">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </li>
                    {course.semester && (
                      <li className="flex">
                        <span className="w-32 text-gray-600">Semester:</span>
                        <span className="font-medium">{course.semester}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Prerequisites & Corequisites</h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Prerequisites:</h4>
                    {course.prerequisites && course.prerequisites.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {course.prerequisites.map((prereq, index) => (
                          <li key={index}>{prereq}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">None</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Corequisites:</h4>
                    {course.corequisites && course.corequisites.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {course.corequisites.map((coreq, index) => (
                          <li key={index}>{coreq}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">None</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Skills You'll Gain</h3>
                <div className="flex flex-wrap gap-2">
                  {course.skills && course.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Syllabus Tab */}
          {activeTab === 'syllabus' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Syllabus</h2>
              <div className="space-y-6">
                {course.syllabus && course.syllabus.map((week) => (
                  <div key={week.week} className="border-l-4 border-blue-500 pl-4 py-1">
                    <h3 className="font-medium text-gray-800">Week {week.week}: {week.topic}</h3>
                    <p className="text-gray-700 mt-1">{week.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructors Tab */}
          {activeTab === 'instructors' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Instructors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.instructors && course.instructors.map((instructor, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-medium text-gray-800">{instructor.name}</h3>
                    <p className="text-gray-600 mb-2">{instructor.title}</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex">
                        <span className="w-24 text-gray-600">Email:</span>
                        <a href={`mailto:${instructor.email}`} className="text-blue-600 hover:underline">
                          {instructor.email}
                        </a>
                      </li>
                      <li className="flex">
                        <span className="w-24 text-gray-600">Office:</span>
                        <span>{instructor.office}</span>
                      </li>
                      <li className="flex">
                        <span className="w-24 text-gray-600">Office Hours:</span>
                        <span>{instructor.officeHours}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Assessments</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assessment Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight (%)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course.assessments && course.assessments.map((assessment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {assessment.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {assessment.weight}%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {assessment.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Resources</h2>
              <div className="space-y-4">
                {course.resources && course.resources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{resource.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {resource.type}
                          {resource.authors && ` • ${resource.authors}`}
                        </p>
                        {resource.description && (
                          <p className="text-gray-700 text-sm mt-1">{resource.description}</p>
                        )}
                      </div>
                      {resource.link && (
                        <a 
                          href={resource.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition"
                        >
                          Access
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;