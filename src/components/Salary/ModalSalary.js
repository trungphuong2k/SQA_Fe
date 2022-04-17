import { useState, useEffect } from "react";
import {} from "../../apis/companyApi";
import { Form, Input, Button, Modal, notification } from "antd";
import "antd/dist/antd.css";
import { postcompany, putcompany, getcompany } from "../../apis/companyApi";

const ModalCompany = (props) => {
  const [addModal, setAddModal] = useState(false);

  const onFinishModal = (company) => {
    console.log(company.tax_number);
    if (addModal) {
      setAddModal(false);
      postcompany(company)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Add company failed",
            placement: "topRight",
          });
        });
    }
    if (props.editModal) {
      props.setEditModal(null);
      putcompany(company, props.editModal.id)
        .then(() => displayData())
        .catch(() => {
          notification["error"]({
            message: "Edit company failed",
            placement: "topRight",
          });
        });
    }
    // getcompany();
  };

  const displayData = (async) => {
    console.log("hi");

    getcompany()
      .then((response) => {
        console.log("hello");
        props.setCompanies(response.data);

        notification["success"]({
          message: addModal
            ? "Add company successful"
            : "Edit company successful",
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
        Add company
      </Button>
      <Modal
        title={addModal ? "Add company" : "Edit company"}
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
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tax number"
            name="tax_number"
            rules={[
              {
                required: true,
                message: "Please input your company tax number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Capital"
            name="authorized_capital"
            rules={[
              { required: true, message: "Please input authorized capital!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Operation"
            name="field_of_operation"
            rules={[
              {
                required: true,
                message: "Please input your field of operation!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address_in_building"
            rules={[
              {
                required: true,
                message: "Please input your address in building!",
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
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ground area"
            name="ground_area"
            rules={[
              {
                required: true,
                message: "Please input your ground area!",
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

export default ModalCompany;
