import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import CourseContext from '../context/CourseContext';

const AvailableSubjects = () => {
  const { user } = useContext(AuthContext);
  const { getCourses, courses, enrollInCourse, loading: courseLoading } = useContext(CourseContext);
  
  const [filters, setFilters] = useState({
    domain: '',
    level: '',
    credits: '',
    modality: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockCourses = [
    {
      _id: '101',
      title: 'Introduction to Computer Science',
      description: 'A foundational course covering the basics of computer science and programming.',
      courseCode: 'CS101',
      credits: 3,
      domain: 'Computer Science',
      level: 'Beginner',
      modality: 'Blended',
      skills: ['Programming Basics', 'Problem Solving', 'Computational Thinking'],
      prerequisites: [],
      duration: '12 weeks'
    },
    {
      _id: '102',
      title: 'Data Structures and Algorithms',
      description: 'Learn about fundamental data structures and algorithms used in computer science.',
      courseCode: 'CS201',
      credits: 4,
      domain: 'Computer Science',
      level: 'Intermediate',
      modality: 'Online',
      skills: ['Algorithm Design', 'Data Structures', 'Time Complexity Analysis'],
      prerequisites: ['CS101'],
      duration: '14 weeks'
    },
    {
      _id: '103',
      title: 'Database Management Systems',
      description: 'Introduction to database concepts, design, and implementation.',
      courseCode: 'CS301',
      credits: 3,
      domain: 'Computer Science',
      level: 'Intermediate',
      modality: 'In-person',
      skills: ['SQL', 'Database Design', 'Data Modeling'],
      prerequisites: ['CS201'],
      duration: '12 weeks'
    },
    {
      _id: '104',
      title: 'Web Development Fundamentals',
      description: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
      courseCode: 'CS210',
      credits: 3,
      domain: 'Web Development',
      level: 'Beginner',
      modality: 'Blended',
      skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      prerequisites: ['CS101'],
      duration: '10 weeks'
    },
    {
      _id: '105',
      title: 'Artificial Intelligence',
      description: 'Introduction to AI concepts, algorithms, and applications.',
      courseCode: 'CS401',
      credits: 4,
      domain: 'Artificial Intelligence',
      level: 'Advanced',
      modality: 'Online',
      skills: ['Machine Learning', 'Neural Networks', 'Problem Solving'],
      prerequisites: ['CS201', 'MATH301'],
      duration: '15 weeks'
    },
    {
      _id: '106',
      title: 'Software Engineering',
      description: 'Learn software development methodologies, project management, and best practices.',
      courseCode: 'CS302',
      credits: 3,
      domain: 'Software Engineering',
      level: 'Intermediate',
      modality: 'In-person',
      skills: ['Project Management', 'Software Design', 'Testing'],
      prerequisites: ['CS201'],
      duration: '12 weeks'
    }
  ];

  // Filter options
  const domainOptions = ['Computer Science', 'Web Development', 'Artificial Intelligence', 'Software Engineering'];
  const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];
  const creditOptions = [2, 3, 4, 5];
  const modalityOptions = ['Online', 'In-person', 'Blended'];

  useEffect(() => {
    const fetchData = async () => {
      await getCourses();
      setLoading(false);
    };

    fetchData();
  }, [getCourses]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleEnroll = async (courseId) => {
    if (user && user.id) {
      await enrollInCourse(user.id, courseId);
      // Show success message or update UI
    }
  };

  const resetFilters = () => {
    setFilters({
      domain: '',
      level: '',
      credits: '',
      modality: ''
    });
    setSearchTerm('');
    setSortBy('title');
  };

  // Use real data if available, otherwise use mock data
  const displayCourses = courses && courses.length > 0 ? courses : mockCourses;

  // Apply filters and search
  const filteredCourses = displayCourses.filter(course => {
    const matchesDomain = filters.domain ? course.domain === filters.domain : true;
    const matchesLevel = filters.level ? course.level === filters.level : true;
    const matchesCredits = filters.credits ? course.credits === parseInt(filters.credits) : true;
    const matchesModality = filters.modality ? course.modality === filters.modality : true;
    const matchesSearch = searchTerm 
      ? course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return matchesDomain && matchesLevel && matchesCredits && matchesModality && matchesSearch;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'credits') {
      return a.credits - b.credits;
    } else if (sortBy === 'level') {
      const levelOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      return levelOrder[a.level] - levelOrder[b.level];
    }
    return 0;
  });

  if (loading || courseLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Subjects</h1>
        
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title, description, or course code"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="title">Sort by Title</option>
                <option value="credits">Sort by Credits</option>
                <option value="level">Sort by Level</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <select
                name="domain"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.domain}
                onChange={handleFilterChange}
              >
                <option value="">All Domains</option>
                {domainOptions.map((domain, index) => (
                  <option key={index} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="level"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.level}
                onChange={handleFilterChange}
              >
                <option value="">All Levels</option>
                {levelOptions.map((level, index) => (
                  <option key={index} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="credits"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.credits}
                onChange={handleFilterChange}
              >
                <option value="">All Credits</option>
                {creditOptions.map((credit, index) => (
                  <option key={index} value={credit}>{credit} Credits</option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="modality"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.modality}
                onChange={handleFilterChange}
              >
                <option value="">All Modalities</option>
                {modalityOptions.map((modality, index) => (
                  <option key={index} value={modality}>{modality}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Course List */}
        {sortedCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No courses match your filters. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map(course => (
              <div key={course._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                      <p className="text-sm text-gray-600">{course.courseCode} • {course.credits} credits</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{course.description}</p>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">Skills You'll Gain</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, index) => (
                        <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Domain</p>
                      <p className="font-medium">{course.domain}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Modality</p>
                      <p className="font-medium">{course.modality}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Prerequisites</p>
                      <p className="font-medium">
                        {course.prerequisites.length > 0 ? course.prerequisites.join(', ') : 'None'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <button 
                    onClick={() => handleEnroll(course._id)}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Enroll Now
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

export default AvailableSubjects;