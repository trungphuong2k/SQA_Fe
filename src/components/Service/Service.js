import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/all";
import { notification, Popconfirm, Button, Pagination, Input } from "antd";
import ModalService from "./ModalService";
import {
  getservice,
  deleteservice,
  searchservice,
} from "../../apis/serviceApi";
import "./Service.scss";

const Service = () => {
  const [services, setservices] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
  const [name, setName] = useState();

  useEffect(() => {
    getservice()
      .then((response) => {
        setservices(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onConfirmDelete = () => {
    deleteservice(isDelete)
      .then(() => displayservice())
      .catch(() => {
        notification["error"]({
          message: "Delete service failed",
          placement: "topRight",
        });
      });
  };

  const displayservice = () => {
    getservice()
      .then((response) => {
        setservices(response.data);
        notification["success"]({
          message: "Delete service successful",
          placement: "topRight",
        });
      })
      .catch((error) => console.log(error));
  };
  const onSearch = () => {
    searchservice(name).then((response) => setservices(response.data));
  };

  return (
    <div className="main-container">
      <div className="header-content">
        <div className="name">
          <b>Manage services</b>
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
        <div className="title">SERVICE LIST</div>
        <div>
          <ModalService
            editModal={editModal}
            setEditModal={setEditModal}
            services={services}
            setservices={setservices}
          ></ModalService>
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
                    <span className="th-name">Type</span>
                  </th>
                  <th>
                    <span className="th-name">Unit price</span>
                  </th>
                  <th>
                    <span className="th-name"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{service.service_code}</td>
                    <td>{service.name}</td>
                    <td>{service.type}</td>
                    <td>{service.unit_price}</td>
                    <td className="group-btn">
                      <Button
                        className="btn-edit"
                        onClick={() => {
                          setEditModal(service);
                        }}
                      >
                        <FaEdit className="icon-edit" />
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this service? "
                        onConfirm={onConfirmDelete}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          className="btn-delete"
                          onClick={() => setIsDelete(service.id)}
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
              Showing 1 to {services.length} of {services.length} entries
            </div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
