import React, { useState, useEffect } from 'react'
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import {
    useParams
} from "react-router-dom"

export default function Testid(props) {
    let { id } = useParams()
    const [loading, setloading] = useState(true)
    const [answer, setanswer] = useState(null)

    const getAnswer = () => {
        Axios({
            url: 'surveyanswer/public/read/' + id,
            method: 'get'
        })
            .then(function (response) {
                // handle success
                setanswer(response.data)
                setloading(false)
            })
    }

    useEffect(() => {
        getAnswer()
    }, [])

    if (loading) {
        return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
            style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
    }

    return (
        <>
            <h1 className="title is-2" style={{ marginTop: "20px", textAlign: "center", marginLeft: "100px", fontFamily: "Inter" }}>Summary Answer</h1>
            <div className="columns" style={{ marginLeft: "25px", marginTop: "10px", marginRight: "25px" }}>
                <div className="column">
                    <div className="card" style={{ height: "350px" }}>
                        <header className="card-header" style={{ backgroundColor: "#F0F7F4" }}>
                            <p className="card-header-title">
                                Survey Answer
                            </p>
                        </header>

                        <div className="card-content">
                            <table className="table is-fullwidth" style={{ textAlign: "left" }}>
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer</th>
                                    </tr>
                                </thead>
                                <tbody className="tablemodel">
                                    {answer.map((x) => (
                                        <tr key={x._id}>
                                            <td>{x.question}</td>
                                            <td>{x.respond.map((y) => (
                                                <p>{y}</p>))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
