import { useState, useEffect } from "react";
import {} from "../../apis/employeeApi";
import { Form, Input, Button, Modal, notification } from "antd";
import "antd/dist/antd.css";
import { postemployee, putemployee, getemployee } from "../../apis/employeeApi";

const ModalEmployee = (props) => {
  const { idCompany } = props;
  const [addModal, setAddModal] = useState(false);

  const onFinishModal = (employee) => {
    console.log(employee.id);
    if (addModal) {
      setAddModal(false);
      postemployee(employee)
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

  function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const fetchRef = React.useRef(0);
    const debounceFetcher = React.useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }

          setOptions(newOptions);
          setFetching(false);
        });
      };

      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    );
  } // Us
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
          <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Select users"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            style={{
              width: "100%",
            }}
          />
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
