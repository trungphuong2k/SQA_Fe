import axios from "axios";

http: axios.defaults.baseURL = "http://192.168.100.110:8080/api/v1";

export function getsalary(data) {
  return axios.get("/staffs/salary");
}
