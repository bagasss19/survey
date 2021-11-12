import axios from 'axios'
import Swal from 'sweetalert2'

// export const baseURL = 'https://20.195.24.100:8000/'
export const baseURL = 'http://localhost:5000/'

const instance = axios.create({
    baseURL
  });
instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error, '>>>> ini dari axios interceptors')
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response.data.error
      // text: error.response.data.error.join(', ')
    })
    return Promise.reject(error);
  });
  

export default instance