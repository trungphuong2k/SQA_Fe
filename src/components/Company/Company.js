import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/all";
import { notification, Popconfirm, Button, Pagination, Input } from "antd";
import ModalCompany from "./ModalCompany";
import {
  getcompany,
  deletecompany,
  searchcompany,
} from "../../apis/companyApi";
import "./Company.scss";
import { Link } from "react-router-dom";
import { PATH } from "../../constants/path";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
  const [name, setName] = useState();

  useEffect(() => {
    getcompany()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onConfirmDelete = () => {
    deletecompany(isDelete)
      .then(() => displaycompany())
      .catch(() => {
        notification["error"]({
          message: "Delete company failed",
          placement: "topRight",
        });
      });
  };

  const displaycompany = () => {
    getcompany()
      .then((response) => {
        setCompanies(response.data);
        notification["success"]({
          message: "Delete company successful",
          placement: "topRight",
        });
      })
      .catch((error) => console.log(error));
  };

  const onSearch = () => {
    searchcompany(name).then((response) => setCompanies(response.data));
  };

  return (
    <div className="main-container">
      <div className="header-content ">
        <div className="name">
          <b>Manage companies</b>
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
        <div className="title">COMPANIES LIST</div>
        <div>
          <ModalCompany
            editModal={editModal}
            setEditModal={setEditModal}
            companies={companies}
            setCompanies={setCompanies}
          ></ModalCompany>
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
                    <span className="th-name">Tax Number</span>
                  </th>
                  <th>
                    <span className="th-name">Authorized capital</span>
                  </th>
                  <th>
                    <span className="th-name">Field of operation</span>
                  </th>
                  <th>
                    <span className="th-name">Address building</span>
                  </th>
                  <th>
                    <span className="th-name">Phone number</span>
                  </th>
                  <th>
                    <span className="th-name">Ground area</span>
                  </th>
                  <th>
                    <span className="th-name"></span>
                  </th>
                  <th>
                    <span className="th-name"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{company.name}</td>
                    <td>{company.tax_number}</td>
                    <td>{company.authorized_capital}</td>
                    <td>{company.field_of_operation}</td>
                    <td>{company.address_in_building}</td>
                    <td>{company.phone_number}</td>
                    <td>{company.ground_area}</td>
                    <td className="group-btn">
                      <Button
                        className="btn-edit"
                        onClick={() => {
                          setEditModal(company);
                        }}
                      >
                        <FaEdit className="icon-edit" />
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this company? "
                        onConfirm={onConfirmDelete}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          className="btn-delete"
                          onClick={() => setIsDelete(company.id)}
                        >
                          <FaTrash className="icon-delete" />
                        </Button>
                      </Popconfirm>
                    </td>
                    <td>
                      <Link to={`/company/${company.id}/employee`}>
                        View Employee
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <div className="desc">
              Showing 1 to {companies.length} of {companies.length} entries
            </div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
