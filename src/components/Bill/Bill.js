import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/all";
import { Link } from "react-router-dom";
import { notification, Popconfirm, Button, Pagination, Input } from "antd";
import ModalBill from "./ModalBill";
import { getbill } from "../../apis/billApi";
import "./Bill.scss";

const Bill = () => {
  const [bills, setbills] = useState([]);
  const [editModal, setEditModal] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
  const [name, setName] = useState();

  useEffect(() => {
    getbill()
      .then((response) => {
        setbills(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function change(companies) {
    var obj = companies.monthPayment;
    var res = Object.entries(obj).map(([k, v]) => [Number(k), v]);
    console.log(res);
    return {
      id: companies.company.id,
      name: companies.company.name,
      monthPayment: res[0],
      monthPayment2: res[1],
    };
  }
  const billsbiendoi = bills.map(change);
  console.log(billsbiendoi.id);

  return (
    <div className="main-container">
      <div className="header-content ">
        <div className="name">
          <b>View bill</b>
        </div>
        {/* <div className="form-search">
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
        </div> */}
      </div>
      <div className="main-content">
        <div className="title">BILL LIST</div>
        <div>
          {/* <Modalbillgetbill
            editModal={editModal}
            setEditModal={setEditModal}
            bills={bills}
            setbills={setbills}
          ></Modalbillgetbill> */}
          <div className="container">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>
                    <span className="th-name">ID</span>
                  </th>

                  <th>
                    <span className="th-name">Company name</span>
                  </th>

                  <th>
                    <span className="th-name">Total money</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {billsbiendoi.monthPayment.map((d, index) => {
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{d}</td>

                    <td></td>
                  </tr>;
                })} */}
                {billsbiendoi.map((bill, index) => (
                  <tr key={index}>
                    <td>{bill.id}</td>
                    <td>{bill.name}</td>
                    <td>{bill.monthPayment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <div className="desc">
              Showing 1 to {bills.length} of {bills.length} entries
            </div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
