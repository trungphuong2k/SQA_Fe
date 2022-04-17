import { useState, useEffect } from "react";
import { Form, Input, Button, Modal, notification, Select } from "antd";
import "antd/dist/antd.css";
import { postcompanyservice } from "../../apis/companyServiceApi";
import { getservice, getservicebyid } from "../../apis/serviceApi";
const { Option } = Select;
const Modalcompanyservice = (props) => {
  const [services, setservices] = useState([]);
  const { company } = props;

  useEffect(() => {
    getservice()
      .then((response) => {
        setservices(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onFinishModal = async (companyservice) => {
    console.log(companyservice);
    console.log("company", company);
    const servicechoice = await getservicebyid(companyservice.service);
    console.log("service", servicechoice.data);
    postcompanyservice(companyservice, company, servicechoice.data)
      .then(() => {
        notification["success"]({
          message: "Add servive sucess",
          placement: "topRight",
        });
        props.setServiceModal(null);
      })
      .catch(() => {
        notification["error"]({
          message: "Add  servive failed",
          placement: "topRight",
        });
      });
  };

  const onCancelModal = () => {
    // setAddModal(false);
    props.setServiceModal(null);
  };

  return (
    <>
      <Modal
        title="Add companyservice"
        visible={props.seviceModal}
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
            label="month"
            name="month"
            rules={[
              {
                required: true,
                message: "Please input your companyservice code!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="service"
            name="service"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select style={{ width: 120 }}>
              {services.map((service) => (
                <Option key={service.id}>{service.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="form-btn">
            <Button style={{ marginRight: 10 }} onClick={onCancelModal}>
              Close
            </Button>
            <Button type="primary" htmlType="submit" className="btn-submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Modalcompanyservice;
