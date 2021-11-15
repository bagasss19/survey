import React, { useState, useEffect, Fragment } from 'react'
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import {
    useParams,
    Link
} from "react-router-dom"
import { AiFillCloseCircle } from "react-icons/ai"
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pie } from 'react-chartjs-2'

Modal.setAppElement('#root');

const customStyles = {
    content: {
        position: "absolute",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: "50%",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "white"
    },
}

export default function Testid() {
    let { id } = useParams()
    const [loading, setloading] = useState(true)
    const [survey, setsurvey] = useState(null)
    const [title, settitle] = useState(null)
    const [type, settype] = useState(1)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [answer, setanswer] = useState([
        { answer: '' }
    ])
    const [respond, setrespond] = useState(null)
    const [user, setuser] = useState(null)
    const [pie, setpie] = useState(null)
    const [question, setquestion] = useState(null)

    const handleInputChange = (index, event) => {
        const values = [...answer]
        values[index].answer = event.target.value
        setanswer(values)
    }

    const handleAddFields = () => {
        const values = [...answer];
        values.push({ answer: '' });
        setanswer(values);
    }

    const handleRemoveFields = index => {
        const values = [...answer];
        values.splice(index, 1);
        setanswer(values);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#000000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    function filterUser(data) {
        let result = data.filter((x, index, self) =>
            index === self.findIndex((t) => (
                t.respond_id === x.respond_id
            ))
        )
        setuser(result)
    }

    function filterQuestion(data) {
        let result = data.filter((x, index, self) =>
            index === self.findIndex((t) => (
                t.question === x.question
            ))
        );
        console.log(result, ">>>result");
        setquestion(result)
    }

    const notify = () => toast.success('Link Copied!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const deleteQuestion = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setloading(true)
                Axios({
                    url: 'surveyquestion/' + id,
                    method: 'delete',
                    headers: {
                        "token": localStorage.token
                    }
                })
                    .then(function (response) {
                        // handle success
                        Swal.fire({
                            title: 'Success!',
                            text: 'Delete Survey Success',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                        getQuestion()
                    })
            }
        })
    }

    const getQuestion = () => {
        Axios({
            url: 'surveyquestion/' + id,
            method: 'get',
            headers: {
                "token": localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                setsurvey(response.data)
                getAnswer()
            })
    }

    const getAnswer = () => {
        Axios({
            url: 'surveyanswer/public/read/admin/' + id,
            method: 'get',
            headers: {
                "token": localStorage.token
            }

        })
            .then(function (response) {
                // handle success
                console.log(response.data, "answer");
                setrespond(response.data)
                filterUser(response.data)
                filterQuestion(response.data)
                getRecap()
            })
    }

    const getRecap = () => {
        Axios({
            url: 'surveyanswer/read/recap/' + id,
            method: 'get',
            headers: {
                "token": localStorage.token
            }

        })
            .then(function (response) {
                // handle success
                console.log(response.data, "PIEEE")
                setpie(response.data)
                setloading(false)
            })
    }

    function add(surveyId) {
        setloading(true)
        Axios({
            url: 'surveyquestion/' + surveyId,
            method: 'post',
            data: { title, answer, type },
            headers: {
                "token": localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                closeModal()
                getQuestion()
                Swal.fire({
                    title: 'Success!',
                    text: "Survey has been added",
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
            })
    }

    useEffect(() => {
        getQuestion()
    }, [id])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }

    return (
        <>
            <Link to="/">
                <p style={{ color: "black", textAlign: "left", marginLeft: "50px", marginTop: "30px", fontFamily: "Inter", fontWeight: "bold" }} >
                    &lt; Back
                </p>
            </Link>

            <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Inter" }}>{survey.title}</h1>
            {/* <h1 className="title is-6" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Inter" }}>{survey.title}</h1> */}
            <div className="columns" style={{ marginLeft: "25px", marginTop: "10px", marginRight: "25px" }}>
                <div className="column">
                    <div className="card" style={{ height: "350px" }}>
                        <header className="card-header" style={{ backgroundColor: "#F0F7F4" }}>
                            <p className="card-header-title">
                                Survey Question
                            </p>
                        </header>

                        <div className="card-content" style={{ overflow: "scroll", height: "300px" }}>
                            <button className="button Mainkolor" onClick={openModal}
                                style={{ color: "white", margin: "auto", justifyContent: "center", marginTop: "20px" }}>
                                Add Question
                            </button>
                            <button className="button Mainkolor" style={{ color: "white", margin: "auto", justifyContent: "center", marginTop: "20px" }} onClick={() => { navigator.clipboard.writeText("http://localhost:3000/respond/" + id); notify() }}>Copy Survey Link</button>
                            <table className="table is-fullwidth" style={{ textAlign: "left" }}>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Question</th>
                                        <th>Answer List</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="tablemodel">
                                    {survey.map((x) => (
                                        <tr key={x._id}>
                                            <td>{(() => {
                                                switch (x.type) {
                                                    case 1: return <span className="tag is-success is-medium">Radiobox</span>
                                                    default: return <span className="tag is-success is-medium">Checkbox</span>
                                                }
                                            })()}</td>
                                            <td>{x.title}</td>
                                            <td>{x.answer.map((y) => (
                                                <p>{y.answer}</p>
                                            ))}
                                            </td>
                                            <td>
                                                <button className="button" style={{ marginLeft: "5px", backgroundColor: "#CB3A31", color: "white" }} onClick={(e) => {
                                                    e.preventDefault()
                                                    deleteQuestion(x._id)
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns" style={{ marginLeft: "25px", marginTop: "10px", marginRight: "25px" }}>
                <div className="column">
                    <div className="card" style={{ height: "350px" }}>
                        <header className="card-header" style={{ backgroundColor: "#F0F7F4" }}>
                            <p className="card-header-title">
                                Survey Responden
                            </p>
                        </header>

                        <div className="card-content" style={{ overflow: "scroll", height: "300px" }}>
                            <table className="table is-fullwidth" style={{ textAlign: "left" }}>
                                <thead style={{ backgroundColor: "white", zIndex: 100 }}>
                                    <tr>
                                        <th>User Id</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="tablemodel">
                                    {user.map((x) => (
                                        <tr key={x._id}>
                                            <td>{x.respond_id}</td>
                                            <td><Link to={`/summary/${x.respond_id}`}> <button className="button is-success">See Response</button></Link></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns" style={{ marginLeft: "25px", marginTop: "10px", marginRight: "25px" }}>
                <div className="column">
                    <div className="card" style={{ height: "350px" }}>
                        <header className="card-header" style={{ backgroundColor: "#F0F7F4" }}>
                            <p className="card-header-title">
                                Survey Response
                            </p>
                        </header>

                        <div className="card-content" style={{ overflow: "scroll", height: "300px" }}>
                            <table className="table is-fullwidth" style={{ textAlign: "left" }}>
                                <thead style={{ backgroundColor: "white", zIndex: 100 }}>
                                    <tr>
                                        <th>Question</th>
                                        <th>Response</th>
                                    </tr>
                                </thead>
                                <tbody className="tablemodel">
                                    {question.map((x, index) => (
                                        <tr key={x._id}>
                                            <td>{x.question}</td>
                                            <td><Pie data={pie[index]} options={{
          responsive: true,
          maintainAspectRatio: false,
        }}/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <AiFillCloseCircle onClick={closeModal} style={{ cursor: "pointer", position: "relative", marginLeft: "600px", marginTop: "1px" }} />
                <p style={{ margin: "auto", textAlign: "center" }}>Add Question</p>
                <form className="form"
                    style={{ width: "100%", margin: "auto", marginTop: "10px" }}
                    onSubmit={(e) => {
                        e.preventDefault()
                        add(id)
                    }
                    }>
                    <div className="field">
                        <center>
                            <div class="select is-success">
                                <select defaultValue={type}
                                    onChange={(e) => { settype(Number(e.target.value)) }}>
                                    <option value="1">Radiobox</option>
                                    <option value="2">Checkbox</option>
                                </select>
                            </div>
                        </center>
                    </div>

                    <div className="field">
                        <input className="input" type="text" name="title" defaultValue={title} placeholder="Question" onChange={e => settitle(e.target.value)} />
                    </div>

                    <div className="field">
                        {answer.map((inputField, index) => (
                            <Fragment key={`${inputField}~${index}`}>
                                <div className="field col-sm-6">
                                    <label htmlFor="answer">Answer</label>
                                    <input
                                        type="text"
                                        className="input"
                                        id="answer"
                                        name="answer"
                                        value={inputField.answer}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-group col-sm-2">
                                    <button
                                        className="button"
                                        type='button'
                                        onClick={() => handleRemoveFields(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="button"
                                        type='button'
                                        onClick={() => handleAddFields()}
                                    >
                                        +
                                    </button>
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <br />

                    <center><button className="button Mainkolor" type="submit" style={{ marginTop: "10px", color: "white" }}>Submit</button></center>
                </form>
            </Modal>

            {/* <Pie data={sample} /> */}
            {/* <Bar data={sample} options={options} /> */}
        </>
    )
}
