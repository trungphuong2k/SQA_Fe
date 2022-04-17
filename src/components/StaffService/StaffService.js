import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/all";
import { notification, Popconfirm, Button, Pagination } from "antd";
import ModalEmployee from "./ModalEmployee";
import { getemployee, deleteemployee } from "../../apis/employeeApi";
import "./Employee.scss";

const Employee = ({ match }) => {
  const [employees, setEmployees] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
  const [idCompany, setIdCompany] = useState(null);
  const [value, setValue] = useState([]);

  useEffect(() => {
    console.log(match);
    setIdCompany(match.params.id);
    getemployee(match.params.id)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onConfirmDelete = () => {
    deleteemployee(isDelete)
      .then(() => displayemployee())
      .catch(() => {
        notification["error"]({
          message: "Delete employee failed",
          placement: "topRight",
        });
      });
  };

  const displayemployee = () => {
    getemployee(idCompany)
      .then((response) => {
        setEmployees(response.data);
        notification["success"]({
          message: "Delete employee successful",
          placement: "topRight",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="main-container">
      <div className="header-content">
        <div className="name">
          <b>Manage employees</b>
        </div>
      </div>
      <div className="main-content">
        <div className="title">STAFF Service LIST</div>

        <div>
          <ModalEmployee
            editModal={editModal}
            setEditModal={setEditModal}
            employees={employees}
            setEmployees={setEmployees}
            idCompany={idCompany}
          ></ModalEmployee>
          <div className="container">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>
                    <span className="th-name">Index</span>
                  </th>
                  <th>
                    <span className="th-name">Name</span>
                  </th>
                  <th>
                    <span className="th-name">Employee Code </span>
                  </th>
                  <th>
                    <span className="th-name">Date of Birth</span>
                  </th>

                  <th>
                    <span className="th-name">Phone number</span>
                  </th>

                  <th>
                    <span className="th-name"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{employee.name}</td>
                    <td>{employee.employee_code}</td>
                    <td>{employee.date_of_birth}</td>
                    <td>{employee.phone_number}</td>

                    <td className="group-btn">
                      <Button
                        className="btn-edit"
                        onClick={() => {
                          setEditModal(employee);
                        }}
                      >
                        <FaEdit className="icon-edit" />
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this employee? "
                        onConfirm={onConfirmDelete}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          className="btn-delete"
                          onClick={() => setIsDelete(employee.id)}
                        >
                          <FaTrash className="icon-delete" />
                        </Button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <div className="desc">
              Showing 1 to {employees.length} of {employees.length} entries
            </div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
