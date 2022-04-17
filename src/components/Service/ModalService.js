import { useState, useEffect } from "react";
import {} from "../../apis/companyApi";
import { Form, Input, Button, Modal, notification } from "antd";
import "antd/dist/antd.css";
import { postservice, putservice, getservice } from "../../apis/serviceApi";

const ModalService = (props) => {
  const [addModal, setAddModal] = useState(false);

  const onFinishModal = (service) => {
    // console.log(service.service_code);
    if (addModal) {
      setAddModal(false);
      postservice(service)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Add service failed",
            placement: "topRight",
          });
        });
    }
    if (props.editModal) {
      props.setEditModal(null);
      putservice(service, props.editModal.id)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Edit service failed",
            placement: "topRight",
          });
        });
    }
    // getservice();
  };

  const displayData = (async) => {
    console.log("hi");

    getservice()
      .then((response) => {
        console.log("hello");
        props.setservices(response.data);

        notification["success"]({
          message: addModal
            ? "Add service successful"
            : "Edit service successful",
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
        Add service
      </Button>
      <Modal
        title={addModal ? "Add service" : "Edit service"}
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
            name="service_code"
            rules={[
              {
                required: true,
                message: "Please input your service code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input service name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please input service type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Unit price"
            name="unit_price"
            rules={[
              {
                required: true,
                message: "Please input unit price!",
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

export default ModalService;
