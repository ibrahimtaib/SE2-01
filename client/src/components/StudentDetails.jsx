/* eslint-disable react/prop-types */
import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const Item = ({ label, value }) => ( 
  <div
  style={{
    display: "flex",
    flexDirection: "row",
  }}>
    <h5 className="text-gray-400 text-xs">{label}:</h5>
    <span style={{marginLeft: "15px"}}
    >{value}</span>
  </div>
);

const ProposalDetails = () => {
  const location = useLocation();
  const { student } = location.state || {};

  if (!student) {
    return <div>Data is missing Or not valid!</div>;
  }

  return (
    <Container>
    <div className="max-w-4xl mx-auto mt-8">

      <div className="card border-indigo-500 shadow-md rounded p-6 mb-6">
        <div className="card-body text-center">
          <h1>{student.student.name} {student.student.surname}</h1>
          <ul className="list-none">
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Email:</span> {student.student.email}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Gender:</span> {student.student.gender}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Nationality:</span> {student.student.nationality}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Degree:</span> {student.student.degree.TITLE_DEGREE}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Degree Code:</span> {student.student.COD_DEGREE}</li>
              <li className="list-item" style={{ listStyleType: 'none' }}><span className="font-semibold">Enrollment Year:</span> {student.student.ENROLLMENT_YEAR}</li>
            </ul>
            <div className="overflow-y-auto" style={{ maxHeight: '270px' }}>
              <table className="table w-full">
                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 2 }}>
                  <tr className="table-row">
                    <th className="table-cell border-b px-4 py-2">Course Code</th>
                    <th className="table-cell border-b px-4 py-2">Course Title</th>
                    <th className="table-cell border-b px-4 py-2">CFU</th>
                    <th className="table-cell border-b px-4 py-2">Grade</th>
                    <th className="table-cell border-b px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody style={{ overflowY: 'auto', maxHeight: '250px' }}>
                  {student.student.Career.map(course => (
                    <tr className="table-row" key={`${course.COD_COURSE}_${course.date}`}>
                      <td className="table-cell px-4 py-2">{course.COD_COURSE}</td>
                      <td className="table-cell px-4 py-2">{course.TITLE_COURSE}</td>
                      <td className="table-cell px-4 py-2">{course.CFU}</td>
                      <td className="table-cell px-4 py-2">{course.grade}</td>
                      <td className="table-cell px-4 py-2">{course.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
        <Link 
        style={{padding: "20px"}}
        to="/applications">
        <Button
        variant="dark"
        >Go Back</Button>
      </Link>
      </div>
    </div>
    </Container>
  );
};

export default ProposalDetails;
