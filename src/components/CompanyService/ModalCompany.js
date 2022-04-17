import { useState, useEffect } from "react";
import {} from "../../apis/employeeApi";
import { Form, Input, Button, Modal, notification } from "antd";
import "antd/dist/antd.css";
import { postemployee, putemployee, getemployee } from "../../apis/employeeApi";

const ModalEmployee = (props) => {
  const { idCompany } = props;
  const [addModal, setAddModal] = useState(false);

  const onFinishModal = (employee) => {
    console.log(employee);
    if (addModal) {
      setAddModal(false);
      postemployee(employee, idCompany)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Add employee failed",
            placement: "topRight",
          });
        });
    }
    if (props.editModal) {
      props.setEditModal(null);
      putemployee(employee, props.editModal.id)
        .then(() => displayData())
        .catch((err) => {
          console.log(err);
          notification["error"]({
            message: "Edit employee failed",
            placement: "topRight",
          });
        });
    }
    // getemployee();
  };

  const displayData = (async) => {
    console.log("hi");

    getemployee(idCompany)
      .then((response) => {
        console.log("hello");
        props.setEmployees(response.data);

        notification["success"]({
          message: addModal
            ? "Add employee successful"
            : "Edit employee successful",
          placement: "topRight",
        });
        props.editModal ? props.setEditModal(null) : setAddModal(false);
      })
      .catch((error) => console.log(error));
  };

  const onCancelModal = () => {
    setAddModal(false);
    props.setEditModal(null);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 20, fontSize: 14 }}
        className="btn-add"
        onClick={() => setAddModal(true)}
      >
        Add employee
      </Button>
      <Modal
        title={addModal ? "Add employee" : "Edit employee"}
        visible={addModal || props.editModal}
        onCancel={onCancelModal}
        footer={""}
        destroyOnClose={true}
      >
        <Form
          name="nest-messages"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishModal}
          initialValues={props.editModal}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your employee name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="employee_code"
            name="employee_code"
            rules={[
              {
                required: true,
                message: "Please input your employee tax number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="date_of_birth"
            name="date_of_birth"
            rules={[{ required: true, message: "Please input date_of_birth!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="company_id" name="company_id">
            <Input defaultValue={idCompany} disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="form-btn">
            <Button style={{ marginRight: 10 }} onClick={onCancelModal}>
              Close
            </Button>
            <Button type="primary" htmlType="submit" className="btn-submit">
              {addModal ? "Add" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEmployee;
