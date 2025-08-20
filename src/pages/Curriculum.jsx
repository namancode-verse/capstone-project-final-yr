import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import CourseContext from '../context/CourseContext';

const Curriculum = () => {
  const { user } = useContext(AuthContext);
  const { getEnrolledCourses, enrolledCourses } = useContext(CourseContext);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const programData = {
    totalCredits: 120,
    earnedCredits: 45,
    coreCredits: 30,
    electiveCredits: 15,
    currentGPA: 3.7,
    riskCourses: ['Advanced Algorithms', 'Quantum Computing']
  };

  const semesters = [
    {
      id: 1,
      name: 'Semester 1',
      courses: [
        { id: 101, code: 'CS101', name: 'Introduction to Programming', credits: 3, status: 'completed', grade: 'A' },
        { id: 102, code: 'MATH101', name: 'Calculus I', credits: 4, status: 'completed', grade: 'B+' },
        { id: 103, code: 'ENG101', name: 'English Composition', credits: 3, status: 'completed', grade: 'A-' }
      ]
    },
    {
      id: 2,
      name: 'Semester 2',
      courses: [
        { id: 201, code: 'CS201', name: 'Data Structures', credits: 3, status: 'completed', grade: 'A' },
        { id: 202, code: 'MATH201', name: 'Discrete Mathematics', credits: 4, status: 'completed', grade: 'B' },
        { id: 203, code: 'PHYS101', name: 'Physics I', credits: 4, status: 'completed', grade: 'B+' }
      ]
    },
    {
      id: 3,
      name: 'Semester 3',
      courses: [
        { id: 301, code: 'CS301', name: 'Algorithms', credits: 3, status: 'in-progress' },
        { id: 302, code: 'CS302', name: 'Database Systems', credits: 4, status: 'in-progress' },
        { id: 303, code: 'CS303', name: 'Software Engineering', credits: 3, status: 'in-progress' }
      ]
    },
    {
      id: 4,
      name: 'Semester 4',
      courses: [
        { id: 401, code: 'CS401', name: 'Operating Systems', credits: 4, status: 'planned' },
        { id: 402, code: 'CS402', name: 'Computer Networks', credits: 3, status: 'planned' },
        { id: 403, code: 'CS403', name: 'Artificial Intelligence', credits: 4, status: 'planned' }
      ]
    }
  ];

  const skillGaps = [
    { id: 1, name: 'Data Engineering', courses: ['Database Systems', 'Distributed Systems'] },
    { id: 2, name: 'Machine Learning', courses: ['Artificial Intelligence', 'Statistical Methods'] },
    { id: 3, name: 'Web Development', courses: ['Frontend Frameworks', 'Backend Development'] }
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

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Degree Program</h1>
        
        {/* Degree Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Credits</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{ width: `${(programData.earnedCredits / programData.totalCredits) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {programData.earnedCredits} of {programData.totalCredits} credits earned
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Core vs Elective</h3>
            <div className="flex h-4 rounded-full overflow-hidden mb-2">
              <div 
                className="bg-green-600" 
                style={{ width: `${(programData.coreCredits / programData.earnedCredits) * 100}%` }}
              ></div>
              <div 
                className="bg-green-400" 
                style={{ width: `${(programData.electiveCredits / programData.earnedCredits) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {programData.coreCredits} core, {programData.electiveCredits} elective
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">GPA Trend</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-600">{programData.currentGPA}</span>
              <span className="ml-2 text-sm text-green-600">↑ 0.2</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Current GPA (improving)</p>
          </div>
        </div>
        
        {/* Risk Flags */}
        {programData.riskCourses.length > 0 && (
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Risk Flags</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {programData.riskCourses.map((course, index) => (
                <li key={index}>{course} - at risk of backlog</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Program Map */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Program Map</h2>
        <div className="space-y-6">
          {semesters.map(semester => (
            <div key={semester.id} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-gray-800 mb-3">{semester.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {semester.courses.map(course => {
                  let statusColor = 'bg-gray-100';
                  let statusText = 'Planned';
                  
                  if (course.status === 'completed') {
                    statusColor = 'bg-green-100';
                    statusText = `Completed (${course.grade})`;
                  } else if (course.status === 'in-progress') {
                    statusColor = 'bg-yellow-100';
                    statusText = 'In Progress';
                  }
                  
                  return (
                    <div key={course.id} className={`${statusColor} p-3 rounded-lg hover:shadow-md transition`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">{course.name}</p>
                          <p className="text-sm text-gray-600">{course.code} • {course.credits} credits</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {statusText}
                        </span>
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <button className="text-xs text-blue-600 hover:text-blue-800">Prerequisites</button>
                        <button className="text-xs text-blue-600 hover:text-blue-800">Outcomes</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Coverage */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skill Coverage</h2>
        <div className="space-y-4">
          {skillGaps.map(skill => (
            <div key={skill.id} className="border border-gray-200 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">{skill.name} Gap</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                  Recommended
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">To fill this gap, consider taking:</p>
              <div className="flex flex-wrap gap-2">
                {skill.courses.map((course, index) => (
                  <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Curriculum;