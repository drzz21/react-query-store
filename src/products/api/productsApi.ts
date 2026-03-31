import axios from "axios";

//configuracion general de axios con la url a usar
const productsApi = axios.create({
  baseURL: "http://localhost:3100",
});

export { productsApi };