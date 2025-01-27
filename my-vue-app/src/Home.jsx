import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Home = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        axios.get("http://localhost:3000/students")
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    },[])

    // Previous and next page Functionalities
    const lastStudent = currentPage * rowsPerPage;
    const firstStudent = lastStudent - rowsPerPage;

    const currentStudent = data.slice(firstStudent, lastStudent);
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const nextPage = ()=>{
        if(currentPage < totalPages ) setCurrentPage(currentPage + 1);
    }
    const previosPage=()=>{
        if(currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // delete student
    const handleDelete = async (id) =>{
        const conform = window.confirm("Are you sure you want to delete this student?");
        if(conform){
            try{
                await axios.delete(`http://localhost:3000/students/${id}`)
                setData(data.filter((item) => item.id !== id))
            }
            catch(error){
                console.log(error);
            }
        }else{
            alert("Not deleting student");
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <h1 className='bg-primary w-75 text-center text-light mb-0'>Students Data</h1>
            <div className='w-75 rounded bg-light border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    <Link to='/create' className='btn btn-success'>Add +</Link>
                </div>
                <table className="table table-striped text-center">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        currentStudent.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.gender}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <Link to={`/read/${item.id}`} className='btn btn-sm btn-warning me-2'>Read</Link>
                                    <Link to={`/update/${item.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                                    <button className='btn btn-sm btn-danger' onClick={ () => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <button className='btn btn-sm btn-info me-2' onClick={previosPage}
                            disabled={currentPage === 1}>Previous Page
                    </button>
                    <button className="btn btn-sm btn-info" onClick={nextPage}
                            disabled={currentPage === totalPages}>Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;