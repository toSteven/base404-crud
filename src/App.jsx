import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import Students from "./Students";
import firebaseApp from "./FirebaseConfig"; //get firebase config

function App() {
  // get student
  const [student, setStudents] = useState({
    firstname: "",
    lastname: "",
    grade: "",
  });

  // set list
  const [studentList, setStudentList] = useState([]);

  const [editToggle, setEditToggle] = useState(false);

  // READ db from firebase
  useEffect(() => {
    // init firestore as db
    const db = getFirestore(firebaseApp);

    try {
      // read data from db
      onSnapshot(collection(db, "students"), (snapshot) => {
        const newStudentList = [];

        snapshot.forEach((studentDoc) => {
          const tempStudent = studentDoc.data();
          tempStudent["student_id"] = studentDoc.id;
          newStudentList.push(tempStudent);
        });
        setStudentList(newStudentList);
      });
    } catch (e) {
      alert("Cant connect to server!"); // show if cant connect to server
    }
  }, []);

  // CREATE students to db
  const addStudent = () => {
    const db = getFirestore(firebaseApp);

    if (
      student.firstname === "" ||
      student.lastname === "" ||
      student.grade === ""
    ) {
      alert("Missing fields");
    } else {
      setStudentList((studentList) => [...studentList, student]);

      addDoc(collection(db, "students"), student);

      // clear input
      setStudents({
        firstname: "",
        lastname: "",
        grade: "",
      });
    }
  };

  // DELETE student
  const deleteStudent = (studentID, firstname, lastname) => {
    const db = getFirestore(firebaseApp);

    // confirmation window
    const userConfirmed = window.confirm(
      `Are you sure you want to delete ${lastname}, ${firstname} data?`
    );

    // confirmation condition
    if (userConfirmed) {
      deleteDoc(doc(db, "students", studentID));
    }
  };

  // UPDATE togler student
  const updateStudent = (studentID, firstname, lastname, grade) => {
    setEditToggle(true);

    setStudents({
      studentID: studentID,
      firstname: firstname,
      lastname: lastname,
      grade: grade,
    });
  };

  // UPDATE edit student
  const editStudent = () => {
    const db = getFirestore(firebaseApp);

    const studentRef = doc(db, "students", student.studentID);

    updateDoc(studentRef, {
      firstname: student.firstname,
      lastname: student.lastname,
      grade: student.grade,
    });
    setEditToggle(false);

    setStudents({
      firstname: "",
      lastname: "",
      grade: "",
    });
  };

  return (
    <>
      <main className="container">
        <h1 className="fw-bold my-5">👤 Students Record</h1>

        {/* fistname input */}
        <section className="row">
          <div className="col-md-5">
            <label htmlFor="firstname">Firstname</label>
            <input
              id="firstname"
              type="text"
              placeholder="John"
              className="form-control"
              value={student.firstname}
              onChange={(e) =>
                setStudents({
                  ...student,
                  firstname: e.target.value,
                })
              }
            />
          </div>

          {/* lastname input */}
          <div className="col-md-5">
            <label htmlFor="lastnam">Lastname</label>
            <input
              id="lastname"
              type="text"
              placeholder="Doe"
              className="form-control"
              value={student.lastname}
              onChange={(e) =>
                setStudents({
                  ...student,
                  lastname: e.target.value,
                })
              }
            />
          </div>

          {/* grade input */}
          <div className="col-md-2">
            <label htmlFor="lastnam">Grade</label>
            <input
              id="grade"
              type="number"
              className="form-control"
              value={student.grade}
              onChange={(e) =>
                setStudents({
                  ...student,
                  grade: e.target.value,
                })
              }
            />
          </div>

          {editToggle ? (
            <div className="col-md-2">
              <button
                onClick={() => {
                  editStudent();
                }}
                className="btn btn-success mt-3"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="col-md-2">
              <button
                onClick={() => {
                  addStudent();
                }}
                className="btn btn-dark mt-3"
              >
                Add +
              </button>
            </div>
          )}
        </section>

        {/* display data */}
        <h1>
          {student.firstname} {student.lastname} {student.grade}
        </h1>

        <hr />

        {/* display data */}
        {studentList.map((studentRecord) => (
          <Students
            // use props
            key={studentRecord.id}
            firstname={studentRecord.firstname}
            lastname={studentRecord.lastname}
            grade={studentRecord.grade}
            studentID={studentRecord.student_id}
            deleteStudent={deleteStudent} // pass function as props
            updateStudent={updateStudent} // pass function as props
          />
        ))}
      </main>
    </>
  );
}

export default App;
