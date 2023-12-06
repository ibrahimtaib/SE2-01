import InsertStudentRequestForm from "../components/InsertStudentRequestForm"

function StudentRequestPage(props){
    return(
        <InsertStudentRequestForm user={props.user}></InsertStudentRequestForm>
    )
}

export default StudentRequestPage