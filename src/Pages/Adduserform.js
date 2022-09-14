import React, { useState } from 'react'

import { Button, Checkbox, Col, Form, Input, message, Radio, Row } from "antd";
import "../assets/css/User.css";
import { useNavigate } from 'react-router-dom';

const Adduserform = () => {

  const [formData, setFormData] = useState({
    id: Math.random(),
    Name: "",
    Age: "",
    Phone: "",
    Gender: "",
    Hobby: ""
  });

  console.log("formDataformData", formData);

  const [form] = Form.useForm();

  const navigate = useNavigate()

  const onchangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  const onchangeCheckbox = (value) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, Hobby: value })
  }

  const handleuserSubmit = () => {

    const getData = JSON.parse(localStorage.getItem("formdata"));
    if (getData !== null) {
      let storeData = [...getData, formData];
      localStorage.setItem("formdata", JSON.stringify(storeData))

    } else {
      localStorage.setItem("formdata", JSON.stringify([formData]))
    }

    message.success("User add sucessfully !")

    setTimeout(() => {
      navigate("/")
    }, 1000);

  }

  return (
    <>
      <div className="mainLoginDiv">
        <div className="formmaindiv">
          <div className="">
            <div className="headFormDiv">
              <div>
                <h5 style={{ color: "black" }}>
                  Add User
                </h5>
              </div>
            </div>
            <Form form={form} name="register" onFinish={handleuserSubmit}>
              <div style={{ padding: "1%" }}>
                <Form.Item
                  name="Name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Your name"
                    name="Name"
                    onChange={(e) => onchangeForm(e)}
                  />
                </Form.Item>
              </div>
              <div style={{ padding: "1%" }}>
                <Form.Item
                  name="Age"
                  label="Age"
                  rules={[
                    {
                      pattern: new RegExp('^[0-9]{0,3}$'),
                      message: 'Please enter only number and min one and max 3 !'
                    },
                    {
                      required: true,
                      message: "Please input your age!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Enter Your age"
                    name="Age"
                    onChange={(e) => onchangeForm(e)}
                  />
                </Form.Item>
              </div>

              <div style={{ padding: "1%" }}>
                <Form.Item
                  name="Phone"
                  label="Phone"
                  rules={[
                    {
                      pattern: new RegExp('^[0-9]{10}$'),
                      message: 'Please enter valid number !'
                    },
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Your phone"
                    name="Phone"
                    onChange={(e) => onchangeForm(e)}
                  />
                </Form.Item>
              </div>
              <div style={{ padding: "1%" }}>
                <Radio.Group name='Gender' onChange={(e) => onchangeForm(e)} >
                  <Radio value={"male"}>Male</Radio>
                  <Radio value={"female"}>Female</Radio>
                </Radio.Group>
              </div>
              <div style={{ marginTop: "5%" }}>
                <Checkbox.Group
                  style={{
                    width: '100%',
                  }}
                  name="Hobby"
                  onChange={(e) => onchangeCheckbox(e)}
                >
                  <Row>
                    <Col span={8}>
                      <Checkbox value="Cricket">Cricket</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Movie">Movie</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Song">Song</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
              <Form.Item className="btnClass">
                <Button
                  style={{ marginTop: "10%" }}
                  htmlType="submit"
                >
                  SUBMIT
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adduserform