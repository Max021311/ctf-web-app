import Axios from 'axios'

export default Axios.create({
  baseURL: import.meta.env.VITE_CRUD_SERVER_HOST
})
