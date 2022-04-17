import axios from "axios";
//localhost:8080/api/v1/companies/bill

axios.defaults.baseURL = "http://192.168.100.110:8080/api/v1";

export function getbill(data) {
  return axios.get("/companies/bill");
}
