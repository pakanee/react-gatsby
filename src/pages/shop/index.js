import React from 'react'
import  {Router} from '@reach/router'
import Axios from 'axios'
import {Table,Button,Modal,notification} from "antd"

import Layout from '../../components/layout';
import { Content } from 'antd/lib/layout/layout';
import Create from './create';

 class Shop extends React.Component {
    constructor(){
        super();
        console.log('constructor');
        this.state={
            is_loading:true,
            data:[],
            message:null,
            titleModal:null,
            filteredInfo: null,
            sortedInfo: null,
        };
      //  this.onDelete = this.onDelete.bind(this);
      

    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };
    
      clearFilters = () => {
        this.setState({ filteredInfo: null });
      };
    
      clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
        });
      };

    componentDidMount(){
        console.log('componentDidMount');
        // เรียก API จังหวะนี้
        this.fetchData();
      
    }
    fetchData=()=>{
        const url= 'http://localhost:1337/shops';
        const config ={
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTYzYzE0MDViNWViMzQzYzhlNGI5ZCIsImlhdCI6MTYxMjA3NjM2OCwiZXhwIjoxNjE0NjY4MzY4fQ.u6kNn09dAe4M4ysJ2yUraIHWDCvjkdf_a6dnWa5Yokc'
        };

        Axios.get(url,config)
        .then(response => {
            console.log('shop data', response.data);
            
                this.setState({
                    is_loading:false,
                    data: response.data,
                   
                }); 
        })
        .catch(err=>{
            console.log('shop error',err);
           
        });

    }
    UNSAFE_componentWillMount(){
       // console.log('componentWillMount');
        // ใส่ spin แสดงการโหลดข้อมูล
    }
    openNotificationWithIcon = type => {
        notification[type]({
          message: this.state.titleModal,
          description: this.state.message,
        });
      };

    onDelete = id =>{
        Modal.confirm({
            title: 'Do you Want to delete these items?',
            Content: 'Some descripttions',
            onOk:()=>{
                console.log('OK dekete id =', id);
                this.setState({is_loading: true});

                // api
                const url= `http://localhost:1337/shops/${id}`;
                const config ={
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTYzYzE0MDViNWViMzQzYzhlNGI5ZCIsImlhdCI6MTYxMjA3NjM2OCwiZXhwIjoxNjE0NjY4MzY4fQ.u6kNn09dAe4M4ysJ2yUraIHWDCvjkdf_a6dnWa5Yokc'
                };
        
                Axios.delete(url,config)
                .then(response => {
                    
                        this.setState({
                            is_loading:false,
                            message:'ทำการลบร้านค้าสำเร็จ',
                            titleModal:'Delete Shop'
                        });
                        this.openNotificationWithIcon( 'success')
                        this.fetchData();
                })
                .catch(err=>{
                    console.log('shop error',err);
                    this.setState({
                        is_loading:false,
                            message:'ทำการลบร้านค้าไม่สำเร็จ',
                            titleModal:'Delete Shop',
                    });
                    this.openNotificationWithIcon( 'error')
                });

               /*  setTimeout(() => {
                    this.setState({is_loading: false})
                }, 5000); */

            },
            onCancel:()=>{
                console.log('Cancel delete')
            }
        });
    }
    render() {
        console.log('render');
        if(this.state.is_loading){
           return  <Layout>Loading...</Layout>
        }
       // console.log(this.state.data);
            let { sortedInfo, filteredInfo } = this.state;
            sortedInfo = sortedInfo || {};
            filteredInfo = filteredInfo || {};
        const columns =[
           {
            title: "Name",
            dataIndex: "name",
            key: "name",
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
           },
           {
            title: "Published",
            dataIndex: "published_at",
            key: "published_at",

           },
           {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render :record => record? 'Acive':'Not Active'

           },
           {
            title: "Manage",
            dataIndex: "_id",
            key: "manage",
            render:rowItems =>
                    <div key={rowItems}>
                        <Button type="primary" href={`shops/edit/${rowItems}`}>Edit</Button>
                        <Button href={`shops/view/${rowItems}`}>View</Button>
                        <Button type="danger" 
                        onClick={() => {
                           this.onDelete(rowItems);
                          }}
                        >Delete</Button>
                    </div>
           }
       ];
        return (
            <Layout>
            <Button type="primary">Create Shop</Button>
            <Create  
                setLoading={value => this.setState({
                    is_loading: value
                })}
                fetchData={()=> this.fetchData()}
            />
            {this.state.message}
                {this.state.data.map(item =>
                     <div key={item._id}>
                     id : {item._id}
                        <div> name : {item.name}</div>
                     </div>
                )}
                <Table 
                    dataSource={this.state.data} columns={columns} 
                    rowKey={rowId=> rowId._id}
                    
                />
                
            </Layout>
        )
    }
}
export default Shop;
