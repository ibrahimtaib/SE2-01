import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import FilterProposals from './FilterProposals'; 

const TeacherProposals = (props) => {
  const [teacherProposals, setTeacherProposals] = useState([]);

  useEffect(() => {
    const teacherId = props.user ? props.user.teacherId : null; 

    if (teacherId) {
      
      const fetchTeacherProposals = async () => {
        try {
          const proposals = await API.getTeacherProposals(teacherId); 
          setTeacherProposals(proposals);
        } catch (error) {
          console.error('Error fetching teacher proposals:', error);
        }
      };
      fetchTeacherProposals();
    }
  }, [props.user]);

  console.log('TeacherList:', teacherProposals);


  return (
    <div>
      <FilterProposals user={props.user} ProposalsList={teacherProposals} setProposalsList={props.setProposalsList} />
    </div>
  );
};

export default TeacherProposals;
