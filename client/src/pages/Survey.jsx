import React, { useState, useEffect } from 'react'
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import Modal from 'react-modal'
import {
    useParams,
    Link
} from "react-router-dom"
import { AiFillCloseCircle } from "react-icons/ai"
import Swal from 'sweetalert2'

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

    const getSurvey = () => {
        Axios({
            url: 'surveyquestion',
            method: 'get',
            headers: {
                "token": localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                setsurvey(response.data)
                setloading(false)
            })
    }

    function add() {
        setloading(true)
        Axios({
            url: 'survey',
            method: 'post',
            data: { title },
            headers: {
                "token": localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                closeModal()
                getSurvey()
                Swal.fire({
                    title: 'Success!',
                    text: "Survey has been added",
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
            })
    }

    useEffect(() => {
        getSurvey()
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
                            <table className="table is-fullwidth" style={{ textAlign: "left" }}>
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer List</th>
                                    </tr>
                                </thead>
                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Contoh question</td>
                                        <td>
                                            <ul>
                                                <li>Hahahaha</li>
                                                <li>Hahahaha</li>
                                            </ul>
                                        </td>
                                    </tr>
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
                                <thead className="sticky" style={{ backgroundColor: "white", zIndex: 100 }}>
                                    <tr>
                                        <th>Question</th>
                                        <th>Response</th>
                                    </tr>
                                </thead>
                                <tbody className="tablemodel">
                                    <tr>
                                        <td>Contoh question</td>
                                        <td>
                                            1. list
                                            2. list
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

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
                        add()
                    }
                    }>
                    <div className="field">
                        <center>
                            <div class="select is-success">
                                <select defaultValue={type}
                            onChange={(e) => {settype(Number(e.target.value))}}>
                                    <option value="1">Radiobox</option>
                                    <option value="2">Checkbox</option>
                                </select>
                            </div>
                        </center>
                    </div>

                    <div className="field">
                        <input className="input" type="text" name="title" defaultValue={title} placeholder="Question" onChange={e => settitle(e.target.value)} />
                    </div>

                    <center><button className="button Mainkolor" type="submit" style={{ marginTop: "10px", color: "white" }}>Submit</button></center>
                </form>
            </Modal>
        </>
    )
}
