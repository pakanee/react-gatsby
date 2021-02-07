import React, { useState } from 'react'
import {Button, Modal, Form, Input, Radio} from 'antd'
import Axios from 'axios'
import { formatCountdown } from 'antd/lib/statistic/utils';

const FormModal =({visible,cancel,create})=>{
    const [form] =Form.useForm();
    return(
        <Modal
            visible={visible}
            /*  onCancel={()=>setVisible(false)} */
            onCancel={()=>cancel(false)}
            onOk={() =>{
                form.validateFields()
                .then(values =>{
                    form.resetFields();
                   // console.log(values);
                    create(values);
                    cancel(false);
                })
                .catch(info =>{
                    console.log('Validate failed: ',info);
                });

            }}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    name: '',
                  }}
            >
                  <Form.Item 
                    name="name"
                    label="Shop Name"
                    rules={[
                        {
                            required:true,
                            message: 'กรุณากรอกชื่อร้านค้าค่ะ'
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

            </Form>
        </Modal>
    );
};

const ShopCreate =({setLoading,fetchData}) =>{
    const[getVisible,setVisible] = useState(false);
    
    const onCreate = values=>{
        setLoading(true);
        const url= `http://localhost:1337/shops`;
        const config ={
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTYzYzE0MDViNWViMzQzYzhlNGI5ZCIsImlhdCI6MTYxMjA3NjM2OCwiZXhwIjoxNjE0NjY4MzY4fQ.u6kNn09dAe4M4ysJ2yUraIHWDCvjkdf_a6dnWa5Yokc'
        };
        Axios.post(url,values,config)
                .then(response => {
                    setLoading(false);
                    fetchData() 
                })
                .catch(err=>{
                    console.log('create shop error',err);   
                });
    };

    return(
        <div>
            <Button
                onClick={()=>{setVisible(true)}}
            >New</Button>
            <FormModal
                visible={getVisible}
                /* setVisible ={setVisible} */
               /*  cancel={()=> setVisible(false)} */
               cancel={(value)=> setVisible(value)}
               create={(values)=> onCreate(values)}
            />
        </div>
    )
};

export default  ShopCreate ;