import React, { useState } from "react";
import { Button, Checkbox, Form, Input, List, message } from "antd";
import IntlMessages from "util/IntlMessages";

const SamplePage = () => {
  const [form] = Form.useForm();
  const [task, setTask] = useState([
    { id:1, name: "belajar javaScript", status:false},
    { id: 2, name:"rapat tim", status: false},
  ]);

  const addTask = (values) => {
    const newTask ={
      id: task.length + 1,
      name: values.task,
      status: false,
    };
    setTask([...task, newTask]);
    form.resetFields();
    message.success("plan berhasil ditambah!");
  };

  const toggleStatus =(id)=>{
    setTask(
      task.map((task)=>
        task.id === id ? {...task, status: !task.status} :task
      )
    );
    message.success("plan selesai")
  };

  const deleteTask = (id)=>{
    setTask(task.filter((task)=> task.id !== id));
    message.success("plan berhasil dihapus");
  };

  return (
    <div>
      <h2 className="title gx-mb-4"><IntlMessages id="sidebar.samplePage"/></h2>

      <div className="gx-d-flex justify-content-center">
        <h4>Start building your app. Happy Coding!</h4>
      </div>

      {/**submit Task Form */}
      <div style={{mamrginTop:"20px"}}>
        <Form form={form} onFinish={addTask} layout="inline">
          <Form.Item
            name="task"
            rules={[{ required: true, message: "tolong masukan plan!"}]}
          >
            <Input placeholder="masukan plan" style={{ width:300}}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">submit</Button>
          </Form.Item>
        </Form>
      </div>

      {/** task list */}
      <div style={{marginTop:"20px"}}>
        <List
          dataSource={task}
          renderItem={(Item) => (
            <List.Item 
              style={{
                display: "flex",
                alignItems:"center",
                padding: "10px 20px",
                marginBottom:"10px",
                border:"1px solid #000000",
                borderRadius:"5px",
              }}
            >
              <Checkbox
                checked={Item.status}
                onChange={() => toggleStatus(Item.id)}
                style={{marginRight:"10px"}}
              />
              <span 
                style={{
                  flex:1,
                  textDecoration: Item.status ? "line-through" : "none",
                  color:Item.status ? "black" : "black",
                }}
              >
                {Item.name}
              </span>
              <Button
                type="link"
                danger
                onClick={() => deleteTask(Item.id)}
              >
                Hapus
              </Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SamplePage;
