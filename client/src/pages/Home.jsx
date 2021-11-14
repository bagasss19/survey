import React, { useEffect, useState } from 'react'
// import { Line } from 'react-chartjs-2';
import Axios from '../config/axios'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'
import {
  Link,
} from "react-router-dom";
import Modal from 'react-modal'
import { AiFillCloseCircle } from "react-icons/ai"

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

export default function Home() {
  const [loading, setloading] = useState(true)
  const [model, setmodel] = useState(null)
  const [title, settitle] = useState(null)
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
      url: 'survey',
      method: 'get',
      headers: {
        "token": localStorage.token
      }
    })
      .then(function (response) {
        // handle success
        setmodel(response.data)
        setloading(false)
      })
  }

  const deleteModel = (id) => {
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
          url: 'survey/' + id,
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
            getSurvey()
          })
      }
    })
  }

  function add() {
    setloading(true)
    Axios({
      url: 'survey',
      method: 'post',
      data: {title},
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
  }, [])

  if (loading) {
    return (<ReactLoading type={'bars'} color={"black"} height={10} width={20}
      style={{ margin: "auto", width: "10%", marginTop: "200px" }} />)
  }

  return (
    <>
      <h1 className="title is-2" style={{ marginTop: "30px", textAlign: "center", margin: "auto", fontFamily: "Inter" }}>Welcome !</h1>
      <button className="button Mainkolor" onClick={openModal}
        style={{ color: "white", margin: "auto", justifyContent: "center", marginTop: "20px" }}>
        Add Survey
      </button>

      <div className="columns" style={{ marginTop: "30px" }} >
        <div className="column">
          <div className="card" style={{ marginLeft: "10px", height: "400px" }}>
            <header className="card-header" style={{ backgroundColor: "#F0F7F4" }}>
              <p className="card-header-title">
                Survey List
              </p>

            </header>
            <div className="card-content">
              <div className="content" style={{ height: "150px", textAlign: "left" }}>
                <table className="table is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th>Survey ID</th>
                      <th>Survey Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {model.map((x) => (
                      <tr key={x._id}>
                        <td><Link to={`/survey/${x._id}`}>{x._id}</Link></td>
                        <td>{x.title}</td>
                        <td>
                          <button className="button" style={{ marginLeft: "5px", backgroundColor: "#CB3A31", color: "white" }} onClick={(e) => {
                            e.preventDefault()
                            deleteModel(x._id)
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

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <AiFillCloseCircle onClick={closeModal}
            style={{ cursor: "pointer", position: "relative", marginLeft: "600px", marginTop: "1px" }} />

          <form className="form"
            // style={{ width: "100%", margin: "auto", marginTop: "10px" }}
            onSubmit={(e) => {
              e.preventDefault()
              add()
            }
            }>

            <div className="field">
              <input className="input" type="text" name="title" defaultValue={title}
                // style={{ marginBottom: "3px" }}
                placeholder="Survey Title" onChange={e => settitle(e.target.value)} />
            </div>

            <center><button className="button Mainkolor" type="submit" style={{ marginTop: "10px", color: "white" }}>Submit</button></center>
          </form>
        </Modal>
      </div>
    </>
  )
}

