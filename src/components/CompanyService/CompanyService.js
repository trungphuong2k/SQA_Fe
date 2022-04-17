import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/all";
import { notification, Popconfirm, Button, Pagination } from "antd";
import ModalCompanyService from "../Company/ModalCompanyService";
import {
  getcompanyservice,
  deletecompanyservice,
} from "../../apis/companyServiceApi";
import "./CompanyService.scss";

const CompanyService = ({ match }) => {
  const [CompanyServices, setCompanyServices] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
  const [idCompany, setIdCompany] = useState(null);
  console.log(match);
  useEffect(() => {
    console.log(match);
    setIdCompany(match.params.id);
    getcompanyservice(match.params.id)
      .then((response) => {
        setCompanyServices(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onConfirmDelete = () => {
    deletecompanyservice(isDelete)
      .then(() => displayCompanyService())
      .catch(() => {
        notification["error"]({
          message: "Delete CompanyService failed",
          placement: "topRight",
        });
      });
  };

  const displayCompanyService = () => {
    getcompanyservice(idCompany)
      .then((response) => {
        setCompanyServices(response.data);
        notification["success"]({
          message: "Delete CompanyService successful",
          placement: "topRight",
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="main-container">
      <div className="header-content">
        <div className="name">
          <b>Manage CompanyServices</b>
        </div>
      </div>
      <div className="main-content">
        <div className="title">COMPANY SERVICE LIST</div>
        <div>
          {/* <ModalCompanyService
            seviceModal={serviceModal}
            setServiceModal={setServiceModal}
            company={choiceCompany}
          ></ModalCompanyService> */}
          <div className="container">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>
                    <span className="th-name">Index</span>
                  </th>
                  <th>
                    <span className="th-name">ServiceName</span>
                  </th>
                  <th>
                    <span className="th-name">Type</span>
                  </th>
                  <th>
                    <span className="th-name">Unit Price</span>
                  </th>

                  <th>
                    <span className="th-name">Month</span>
                  </th>

                  <th>
                    <span className="th-name"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {CompanyServices.map((CompanyService, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{CompanyService.service.name}</td>
                    <td>{CompanyService.service.type}</td>
                    <td>{CompanyService.service.unit_price}</td>
                    <td>{CompanyService.month}</td>

                    <td className="group-btn">
                      <Button
                        className="btn-edit"
                        onClick={() => {
                          setEditModal(CompanyService);
                        }}
                      >
                        <FaEdit className="icon-edit" />
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this CompanyService? "
                        onConfirm={onConfirmDelete}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          className="btn-delete"
                          onClick={() => setIsDelete(CompanyService.id)}
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
              Showing 1 to {CompanyServices.length} of {CompanyServices.length}{" "}
              entries
            </div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyService;
