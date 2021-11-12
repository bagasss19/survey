import React, { useState } from 'react'
import '../App.css'
import Axios from '../config/axios'
import "bulma/css/bulma.css"
// import {
//     Link,
// } from "react-router-dom"

export default function Login(props) {
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

    function login() {
        // axios.defaults.withCredentials = true
        Axios.post('user/login', {
            email,
            password
        })
            .then(function (response) {
                console.log(response.data, "<<<<<<<<??")
                localStorage.token = response.data.token
                localStorage.username = response.data.username
                props.history.push('/')
                window.location.reload();
            })
    }

    if (localStorage.token) {
        return (
            <h1>You Already Logged In</h1>
        )
    }
    return (
        <div className="login">
            <div className="card" style={{ margin: "auto", justifyContent: "center", position: "absolute", top: "31%", left: "34%", height: "350px", width: "500px" }}>

                <p style={{ justifyContent: "center", fontFamily: "inter", fontWeight: "bolder", fontSize: "22px", marginTop: "10px" }}>
                    Welcome to Survey App
                </p>
                <div className="card-content">
                    <div className="content">
                        <form className="form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                login()
                            }}>
                            <div className="field">
                                <label className="label is-family-code" style={{ textAlign: "left" }}>Email:</label>
                                <input className="input" type="email" placeholder="Enter your email" onChange={e => setemail(e.target.value)} />
                            </div>

                            <div className="field">
                                <label className="label is-family-code" style={{ textAlign: "left" }}>Password:</label>
                                <input className="input" type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />

                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                                <p style={{marginTop : "15px"}}>Don't Have Account? <a href="mailto:registration@tand.ai">Contact Us</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
