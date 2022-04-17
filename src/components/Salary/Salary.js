import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/all";
import { Link } from "react-router-dom";
import { notification, Popconfirm, Button, Pagination, Input } from "antd";
// import ModalSalary from "./ModalSalary";
import { getsalary } from "../../apis/salaryApi";
import "./Salary.scss";

const Salary = () => {
  const [salarys, setsalarys] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
  const [name, setName] = useState();

  useEffect(() => {
    getsalary()
      .then((response) => {
        setsalarys(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const onConfirmDelete = () => {
  //   deletesalarygetsalary(isDelete)
  //     .then(() => displaysalarygetsalary())
  //     .catch(() => {
  //       notification["error"]({
  //         message: "Delete salarygetsalary failed",
  //         placement: "topRight",
  //       });
  //     });
  // };

  // const displaysalarygetsalary = () => {
  //   getsalary()
  //     .then((response) => {
  //       setsalarys(response.data);
  //       notification["success"]({
  //         message: "Delete salarygetsalary successful",
  //         placement: "topRight",
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const onSearch = () => {
  //   searchsalarygetsalary(name).then((response) => setsalarys(response.data));
  // };

  return (
    <div className="main-container">
      <div className="header-content ">
        <div className="name">
          <b>View salary</b>
        </div>
      </div>
      <div className="main-content">
        <div className="title">SLARY LIST</div>
        <div>
          {/* <Modalsalarygetsalary
            editModal={editModal}
            setEditModal={setEditModal}
            salarys={salarys}
            setsalarys={setsalarys}
          ></Modalsalarygetsalary> */}
          <div className="container">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>
                    <span className="th-name">Index</span>
                  </th>
                  <th>
                    <span className="th-name">Name </span>
                  </th>
                  <th>
                    <span className="th-name">SDT</span>
                  </th>
                  <th>
                    <span className="th-name">Month</span>
                  </th>
                  <th>
                    <span className="th-name">Total money</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {salarys.map((salary, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{salary.staffDTO.name}</td>
                    <td>{salary.staffDTO.phone_number}</td>
                    <td>{salary.month}</td>
                    <td>{salary.totalSalary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <div className="desc">
              Showing 1 to {salarys.length} of {salarys.length} entries
            </div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
