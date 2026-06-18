import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import '../App.css'

export const StudentFomrs = () => {
    const [success, setSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentName: '', address: '', birthdate: '', emailAddress: '', phoneNo: '', age: '', city: '', education: '',
        motherName: '', motherPhone: '', motherWorkPhone: '', motherEmail: '', motherContactMethod: '',
        fatherName: '', fatherPhone: '', fatherWorkPhone: '', fatherEmail: '', fatherContactMethod: '',
        emergencyName: '', emergencyRelationship: '', emergencyPhone: '', emergencyWorkPhone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitSuccess = (e) => {
        e.preventDefault();

        const existingStudents = JSON.parse(Cookies.get("students") || "[]");

        const newStudent = {
            id: Date.now(),
            ...formData
        };

        existingStudents.push(newStudent);

        Cookies.set("students", JSON.stringify(existingStudents), { expires: 7 });


        Cookies.set("studentSubmitted", "true", { expires: 7 });

        if (isSubmitted) return;


        setIsSubmitted(true);

        setFormData({
            studentName: '', address: '', birthdate: '', emailAddress: '', phoneNo: '', age: '', city: '', education: '',
            motherName: '', motherPhone: '', motherWorkPhone: '', motherEmail: '', motherContactMethod: '',
            fatherName: '', fatherPhone: '', fatherWorkPhone: '', fatherEmail: '', fatherContactMethod: '',
            emergencyName: '', emergencyRelationship: '', emergencyPhone: '', emergencyWorkPhone: ''
        });

        setSuccess(true);
        navigate("/success");


        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    useEffect(() => {
        const submitted = Cookies.get("studentSubmitted");
        const data = Cookies.get("students");
        if (submitted) {
            setIsSubmitted(true);
        }

        if (data) {
            setStudents(JSON.parse(data));
        }

        const studentsData = JSON.parse(
            Cookies.get("students") || "[]"
        );

        setStudents(studentsData);

        if (!Cookies.get("isAuthenticated")) {
            navigate("/", { replace: true });
        }

        window.history.pushState(null, "", window.location.href);

        const handleBackButton = () => {
            window.history.pushState(null, "", window.location.href);

            if (!Cookies.get("isAuthenticated")) {
                navigate("/", { replace: true });
            }
        };

        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };

    }, [navigate]);

  const handleDelete = (id) => {
      const updatedStudents = students.filter(
          (student) => student.id !== id
      );

      setStudents(updatedStudents);

      Cookies.set("students", JSON.stringify(updatedStudents), {
          expires: 7,
      });

      if (updatedStudents.length === 0) {
          Cookies.remove("students");
          Cookies.remove("studentSubmitted");
      }
}

    const handleLogout = () => {
        Cookies.remove("role");
        Cookies.remove("isAuthenticated");
        navigate("/", { replace: true });
    };

    const role = Cookies.get("role");

    if (role === "admin") {
        const students = Cookies.get("students")
            ? JSON.parse(Cookies.get("students"))
            : [];
        return (
            <div className="container my-5 fade-in">
                <div className="card admin-card shadow p-4">
                    <div className="text-end">
                        <button
                            className="btn btn-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    <h2 className="text-center  admin-title mb-4">
                        👑 Admin Dashboard - Students Data
                    </h2>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle custom-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Age</th>
                                    <th>City</th>
                                    <th>Education</th>
                                    <th>Birthdate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {students.length > 0 ? (
                                    students.map((stu, index) => (
                                        <tr key={stu.id}>
                                            <td>{index + 1}</td>
                                            <td>{stu.studentName}</td>
                                            <td>{stu.emailAddress}</td>
                                            <td>{stu.phoneNo}</td>
                                            <td>{stu.age}</td>
                                            <td>{stu.city}</td>
                                            <td>{stu.education}</td>
                                            <td>{stu.birthdate}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-delete"
                                                    onClick={() => handleDelete(stu.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center empty-text">
                                            No student data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        );
    }

    return (

        <>


            <div className="container my-5 fade-in">
                <div className="card custom-card shadow-sm p-4">
                    <div className="text-end">
                        <button
                            className="btn btn-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                    <h1 className="text-center title-main mb-4" style={{ color: '#1a433a', fontFamily: 'serif', fontWeight: 'bold' }}>
                        Student Information
                    </h1>



                    <form onSubmit={handleSubmitSuccess} style={{ pointerEvents: isSubmitted ? "none" : "auto", opacity: isSubmitted ? 0.6 : 1 }}>

                        <div className="border rounded p-3 mb-4 bg-white">
                            <div className='section-box'>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Student name:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="studentName" value={formData.studentName} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Email Address:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Phone No:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Age:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="age" value={formData.age} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Address:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="address" value={formData.address} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">City:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="city" value={formData.city} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Education:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="education" value={formData.education} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Birthdate:</label>
                                        <input type="date" className="form-control form-control-sm border-0 border-bottom" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border rounded p-3 mb-4 bg-white">
                            <div className="section-box">
                                <h3 className="section-title h5 mb-3 italic-title">Parent Info</h3>

                                <div className="row g-3 mb-4">
                                    <div className="col-12">
                                        <label className="form-label text-muted">Mother's name:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="motherName" value={formData.motherName} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Home or cell phone:</label>
                                        <input type="tel" className="form-control form-control-sm border-0 border-bottom" name="motherPhone" value={formData.motherPhone} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Work phone:</label>
                                        <input type="tel" className="form-control form-control-sm border-0 border-bottom" name="motherWorkPhone" value={formData.motherWorkPhone} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label text-muted">Email address:</label>
                                        <input type="email" className="form-control form-control-sm border-0 border-bottom" name="motherEmail" value={formData.motherEmail} onChange={handleChange} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label text-muted">Best method of contact during the day? (email, cell, etc.)</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="motherContactMethod" value={formData.motherContactMethod} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <hr className="text-muted my-3" />

                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label text-muted">Father's name:</label>
                                    <input type="text" className="form-control form-control-sm border-0 border-bottom" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted">Home or cell phone:</label>
                                    <input type="tel" className="form-control form-control-sm border-0 border-bottom" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted">Work phone:</label>
                                    <input type="tel" className="form-control form-control-sm border-0 border-bottom" name="fatherWorkPhone" value={formData.fatherWorkPhone} onChange={handleChange} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted">Email address:</label>
                                    <input type="email" className="form-control form-control-sm border-0 border-bottom" name="fatherEmail" value={formData.fatherEmail} onChange={handleChange} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted">Best method of contact during the day? (email, cell, etc.)</label>
                                    <input type="text" className="form-control form-control-sm border-0 border-bottom" name="fatherContactMethod" value={formData.fatherContactMethod} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="border rounded p-3 mb-4 bg-white">
                            <div className="section-box">
                                <h3 className="section-title h5 mb-3">Emergency contact (other than parents)</h3>
                                <div className="row g-3">
                                    <div className="col-md-7">
                                        <label className="form-label text-muted">Name:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="emergencyName" value={formData.emergencyName} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-5">
                                        <label className="form-label text-muted">Relationship:</label>
                                        <input type="text" className="form-control form-control-sm border-0 border-bottom" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Home or cell phone:</label>
                                        <input type="tel" className="form-control form-control-sm border-0 border-bottom" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-muted">Work phone:</label>
                                        <input type="tel" className="form-control form-control-sm border-0 border-bottom" name="emergencyWorkPhone" value={formData.emergencyWorkPhone} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button disabled={isSubmitted} type="submit" className="btn btn-custom text-white fw-bold px-5 shadow-sm">
                                {isSubmitted ? "Already Submitted" : "Save Student Information"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>


        </>

    )
}
