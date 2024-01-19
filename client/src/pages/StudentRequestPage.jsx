/* eslint-disable react/prop-types */
import InsertStudentRequestForm from "../components/InsertStudentRequestForm"

function StudentRequestPage({user}){
    return(
        <InsertStudentRequestForm user={user}></InsertStudentRequestForm>
    )
}

export default StudentRequestPage