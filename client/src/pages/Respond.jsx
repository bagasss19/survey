import React, { useState, useEffect } from 'react'
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import {
    useParams
} from "react-router-dom"
import Swal from 'sweetalert2'

export default function Testid(props) {
    let { id } = useParams()
    const [loading, setloading] = useState(true)
    const [survey, setsurvey] = useState(null)
    const [answer, setanswer] = useState([])
    const [userId, setuserId] = useState(null)

    const handleInputChangeCheckbox = (index, event, question) => {
        const values = [...answer]
        values[index].survey_id = id
        let output = [...values[index].respond]
        const check = event.target.checked
        if (check) {
            let temp = [...output]
            temp.push(event.target.value)
            values[index].respond = temp
            setanswer(values)
        } else {
            let temp = [...output]
            temp.pop(event.target.value)
            values[index].respond = temp
            setanswer(values)
        }
        values[index].question = question
        setanswer(values)
    }

    const handleInputChangeRadio = (index, event, question) => {
        const values = [...answer]
        if (values[index].respond.length > 0) {
            values[index].respond.pop()
        }
        values[index].respond.push(event.target.value)
        values[index].question = question
        console.log(values)
        setanswer(values)
    }

    const getQuestion = () => {
        Axios({
            url: 'surveyquestion/public/read/' + id,
            method: 'get'
        })
            .then(function (response) {
                // handle success
                setsurvey(response.data)
                let output = []
                let respond_id = generateString(5)
                setuserId(respond_id)
                for (let i = 0; i < response.data.length; i++) {
                    let obj = { respond_id, survey_id: id, question: "", respond: [] }
                    output.push(obj)
                }
                setanswer(output)
                setloading(false)
            })
    }

    function generateString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    function add() {
        setloading(true)
        for (let i = 0; i < answer.length; i++) {
            Axios({
                url: 'surveyanswer',
                method: 'post',
                data: { body: answer[i] }
            })
                .then(function (response) {
                    // handle success
                    console.log(response, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                })
        }
        Swal.fire({
            title: 'Success',
            text: "Answer has been added!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#1D8C59',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Fill the survey Again',
            cancelButtonText: 'See summary of my answer'
        }).then((result) => {
            if (result.isConfirmed) {
                getQuestion()
                setloading(false)
            } else {
                props.history.push(`/summary/${userId}`)
            }
        })
    }

    useEffect(() => {
        getQuestion()
    }, [])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }

    return (
        <>
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

                        <div className="card-content">
                            <table className="table is-fullwidth" style={{ textAlign: "left" }}>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Question</th>
                                        <th>Answer List</th>
                                    </tr>
                                </thead>
                                <tbody className="tablemodel">
                                    {survey.map((x, index) => (
                                        <tr key={x._id}>
                                            <td>{(() => {
                                                switch (x.type) {
                                                    case 1: return <span className="tag is-success is-medium">Checkbox</span>
                                                    default: return <span className="tag is-success is-medium">Radiobox</span>
                                                }
                                            })()}</td>
                                            <td>{x.title}</td>
                                            <td>{x.answer.map((y) => (
                                                (() => {
                                                    switch (x.type) {
                                                        case 1: return (
                                                            <label className="checkbox">
                                                                <input type="checkbox" onChange={event => handleInputChangeCheckbox(index, event, x.title)} value={y.answer} />
                                                                {y.answer}
                                                            </label>)
                                                        default: return (
                                                            <div className="control">
                                                                <label className="radio">
                                                                    <input type="radio" name="answer" onChange={event => handleInputChangeRadio(index, event, x._id)} value={y.answer} />
                                                                    {y.answer}
                                                                </label>
                                                            </div>)
                                                    }
                                                })()
                                            ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="button Mainkolor" onClick={add}
                                style={{ color: "white", margin: "auto" }}>
                                Submit Answer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
