import { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaSortAmountDownAlt,
  RiArrowUpDownFill,
} from "react-icons/all";
import { notification, Popconfirm, Button, Pagination, Input } from "antd";
import ModalStaff from "./ModalStaff";
import ModalStaffService from "./ModalStaffService";
import { getstaff, deletestaff, searchstaff } from "../../apis/staffApi";
import "./Staff.scss";

const Staff = () => {
  const [staffs, setstaffs] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
  const [serviceModal, setServiceModal] = useState(null);
  const [choicestaff, setChoiceStaff] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
    getstaff()
      .then((response) => {
        setstaffs(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onConfirmDelete = () => {
    deletestaff(isDelete)
      .then(() => displaystaff())
      .catch(() => {
        notification["error"]({
          message: "Delete staff failed",
          placement: "topRight",
        });
      });
  };

  const displaystaff = () => {
    getstaff()
      .then((response) => {
        setstaffs(response.data);
        notification["success"]({
          message: "Delete staff successful",
          placement: "topRight",
        });
      })
      .catch((error) => console.log(error));
  };
  const onSearch = () => {
    searchstaff(name).then((response) => setstaffs(response.data));
  };

  return (
    <div className="main-container">
      <div className="header-content">
        <div className="name">
          <b>Manage staffs</b>
        </div>
        <div className="form-search">
          <Input.Group compact className="">
            <Input
              style={{ width: "calc(100% - 200px)" }}
              placeholder="Search by name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="primary" onClick={onSearch}>
              Search
            </Button>
          </Input.Group>
        </div>
      </div>
      <div className="main-content">
        <div className="title">STAFFS LIST</div>
        <div>
          <ModalStaff
            editModal={editModal}
            setEditModal={setEditModal}
            staffs={staffs}
            setstaffs={setstaffs}
          ></ModalStaff>
          <ModalStaffService
            seviceModal={serviceModal}
            setServiceModal={setServiceModal}
            staff={choicestaff}
          ></ModalStaffService>
          <div className="container">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>
                    <span className="th-name">Index</span>
                  </th>
                  <th>
                    <span className="th-name">Code</span>
                  </th>
                  <th>
                    <span className="th-name">Name</span>
                  </th>
                  <th>
                    <span className="th-name">Date of birth</span>
                  </th>
                  <th>
                    <span className="th-name">Address</span>
                  </th>
                  <th>
                    <span className="th-name">Phone number</span>
                  </th>
                  <th>
                    <span className="th-name">Wage</span>
                  </th>
                  <th>
                    <span className="th-name">Position</span>
                  </th>
                  <th>
                    <span className="th-name">Option</span>
                  </th>
                  <th>Add Service</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{staff.staff_code}</td>
                    <td>{staff.name}</td>
                    <td>{staff.date_of_birth}</td>
                    <td>{staff.address}</td>
                    <td>{staff.phone_number}</td>
                    <td>{staff.wage}</td>
                    <td>{staff.position}</td>
                    <td className="group-btn">
                      <Button
                        className="btn-edit"
                        onClick={() => {
                          setEditModal(staff);
                        }}
                      >
                        <FaEdit className="icon-edit" />
                      </Button>

                      <Popconfirm
                        title="Are you sure to delete this staff? "
                        onConfirm={onConfirmDelete}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          className="btn-delete"
                          onClick={() => setIsDelete(staff.id)}
                        >
                          <FaTrash className="icon-delete" />
                        </Button>
                      </Popconfirm>
                    </td>
                    <td>
                      <Button
                        type="primary"
                        className="btn-add"
                        onClick={() => {
                          setServiceModal(true);
                          setChoiceStaff(staff);
                        }}
                      >
                        Add service
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <div className="desc">
              Showing 1 to {staffs.length} of {staffs.length} entries
            </div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
