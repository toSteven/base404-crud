function Students({
  firstname,
  lastname,
  grade,
  deleteStudent,
  studentID,
  updateStudent,
}) {
  return (
    <>
      <div className="alert alert-light">
        {lastname}, {firstname}
        <span class="badge bg-secondary ms-1">{grade}</span>
        {/* delete btn */}
        <button
          onClick={() => {
            deleteStudent(studentID, firstname, lastname);
          }}
          className="btn btn-danger float-end"
        >
          Delete
        </button>
        {/* update btn */}
        <button
          onClick={() => {
            updateStudent(studentID, firstname, lastname, grade);
          }}
          className="btn btn-success float-end me-2"
        >
          Edit
        </button>
      </div>
    </>
  );
}

export default Students;
