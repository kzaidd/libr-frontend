import axios from 'axios';


var url = process.env.BASE_URL;
if (process.env.NODE_ENV === "production") {
    url = "https://library-backend-api.onrender.com/api"
  console.log(url)
} else {
    url = "http://localhost:50000/api"
}

export const getLibraryContents = () => axios.post(url)
export const downloadCSV = (action) => axios.post(`${url}/${action}`)
