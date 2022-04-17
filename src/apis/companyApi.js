import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export function getcompany(data) {
  return axios.get("/companies");
}

export function postcompany(data) {
  return axios.post("/companies", {
    name: data.name,
    tax_number: data.tax_number,
    authorized_capital: data.authorized_capital,
    field_of_operation: data.field_of_operation,
    address_in_building: data.address_in_building,
    phone_number: data.phone_number,
    ground_area: data.ground_area,
  });
}

export function putcompany(data, id) {
  return axios.put(`/companies/${id}`, {
    name: data.name,
    tax_number: data.tax_number,
    authorized_capital: data.authorized_capital,
    field_of_operation: data.field_of_operation,
    address_in_building: data.address_in_building,
    phone_number: data.phone_number,
    ground_area: data.ground_area,
  });
}

export function deletecompany(id) {
  return axios.delete(`/companies/${id}`);
}

export function searchcompany(name) {
  return axios.get(`/companies/search/${name}`);
}
