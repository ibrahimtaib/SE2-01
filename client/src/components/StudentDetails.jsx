/* eslint-disable react/prop-types */
import ListGroup from 'react-bootstrap/ListGroup';
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
    <div className="max-w-4xl mx-auto mt-8">

      <div className="card border-indigo-500 shadow-md rounded p-6 mb-6">
        <div className="card-body text-center">
        <ListGroup as="ul">
          <ListGroup.Item as="li" >
          <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Student Details</h1>
          </ListGroup.Item>
          <ListGroup.Item as="li"><Item label={"Name"} value={student.student.name} /></ListGroup.Item>
          <ListGroup.Item as="li"><Item label={"Email"} value={student.student.email} /></ListGroup.Item>
          <ListGroup.Item as="li"><Item label={"Gender"} value={student.student.gender} /></ListGroup.Item>
          <ListGroup.Item as="li"><Item label={"Nationality"} value={student.student.nationality} /></ListGroup.Item>
          <ListGroup.Item as="li"><Item label={"Degree"} value={student.student.TITLE_DEGREE} /></ListGroup.Item>
          <ListGroup.Item as="li"><Item label={"Degree Code"} value={student.student.COD_DEGREE} /></ListGroup.Item>
          <ListGroup.Item as="li"><Item label={"Enrollment Year"} value={student.student.ENROLLMENT_YEAR} /></ListGroup.Item>
        </ListGroup>

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
        <Link 
        style={{padding: "20px"}}
        to="/applications">
        <Button
        variant="dark"
        >Go Back</Button>
      </Link>
      </div>
    </div>
  );
};

export default ProposalDetails;
