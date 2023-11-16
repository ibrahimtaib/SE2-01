import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProposalDetails = () => {
  const location = useLocation();
  const { student } = location.state || {};

  if (!student) {
    return <div>Dati mancanti o non validi.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Link to="/applications" className="text-indigo-500 hover:text-indigo-700 flex items-center mb-4 text-center">
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" style={{ marginTop: '40px', marginLeft: '50px'}} />
        Back
      </Link>

      <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Student Details</h1>

      <div className="card border-indigo-500 shadow-md rounded p-6 mb-6">
        <div className="card-body text-center">
          <ul className="list-none">
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Name:</span> {student.student.name} {student.student.surname}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Email:</span> {student.student.email}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Gender:</span> {student.student.gender}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Nationality:</span> {student.student.nationality}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Degree:</span> {student.student.degree.TITLE_DEGREE}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Degree Code:</span> {student.student.COD_DEGREE}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Enrollment Year:</span> {student.student.ENROLLMENT_YEAR}</li>
            </ul>
          <div className="overflow-y-auto max-h-32">
            <table className="table w-full">
              <thead>
                <tr className="table-row">
                  <th className="table-cell border-b px-4 py-2">Course Code</th>
                  <th className="table-cell border-b px-4 py-2">Course Title</th>
                  <th className="table-cell border-b px-4 py-2">CFU</th>
                  <th className="table-cell border-b px-4 py-2">Grade</th>
                  <th className="table-cell border-b px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {student.student.Career.map(course => (
                  <tr className="table-row" key={`${course.COD_COURSE}_${course.date}`}>
                    <td className="table-cell border-b px-4 py-2">{course.COD_COURSE}</td>
                    <td className="table-cell border-b px-4 py-2">{course.TITLE_COURSE}</td>
                    <td className="table-cell border-b px-4 py-2">{course.CFU}</td>
                    <td className="table-cell border-b px-4 py-2">{course.grade}</td>
                    <td className="table-cell border-b px-4 py-2">{course.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;
