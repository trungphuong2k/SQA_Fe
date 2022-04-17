import { useState, useEffect } from "react";
import { Form, Input, Button, Modal, notification } from "antd";
import "antd/dist/antd.css";
import { poststaff, putstaff, getstaff } from "../../apis/staffApi";

const ModalStaff = (props) => {
  const [addModal, setAddModal] = useState(false);

  const onFinishModal = (staff) => {
    if (addModal) {
      setAddModal(false);
      poststaff(staff)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Add staff failed",
            placement: "topRight",
          });
        });
    }
    if (props.editModal) {
      props.setEditModal(null);
      putstaff(staff, props.editModal.id)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Edit staff failed",
            placement: "topRight",
          });
        });
    }
  };

  const displayData = (async) => {
    console.log("hi");

    getstaff()
      .then((response) => {
        console.log("hello");
        props.setstaffs(response.data);

        notification["success"]({
          message: addModal ? "Add staff successful" : "Edit staff successful",
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
        Add staff
      </Button>
      <Modal
        title={addModal ? "Add staff" : "Edit staff"}
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
            label="Code"
            name="staff_code"
            rules={[
              {
                required: true,
                message: "Please input your staff code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input staff name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of birth"
            name="date_of_birth"
            rules={[
              { required: true, message: "Please input staff date of birth!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Wage"
            name="wage"
            rules={[
              {
                required: true,
                message: "Please input wage!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[
              {
                required: true,
                message: "Please input position!",
              },
            ]}
          >
            <Input />
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

export default ModalStaff;
