import React from 'react'
import  {Router} from '@reach/router'
import Axios from 'axios'

import Layout from '../../components/layout';

 class Shop extends React.Component {
    constructor(){
        super();
        console.log('constructor');
        this.state={
            is_loading:true,
            data:[],
        };

    }
    componentDidMount(){
        console.log('componentDidMount');
        // เรียก API จังหวะนี้
        const url= 'http://localhost:1337/shops';
        const config ={
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTYzYzE0MDViNWViMzQzYzhlNGI5ZCIsImlhdCI6MTYxMjA3NjM2OCwiZXhwIjoxNjE0NjY4MzY4fQ.u6kNn09dAe4M4ysJ2yUraIHWDCvjkdf_a6dnWa5Yokc'
        };

        Axios.get(url,config)
        .then(response => {
            console.log('shop data', response.data);
            if(response.data){
                this.setState({
                    is_loading:false,
                    data: response.data,
                });
            }
        })
        .catch(err=>{
           // console.log('shop error',err);
        });
    }
    UNSAFE_componentWillMount(){
       // console.log('componentWillMount');
        // ใส่ spin แสดงการโหลดข้อมูล
    }

    render() {
        console.log('render');
        if(this.state.is_loading){
           return  <Layout>Loading...</Layout>
        }
       // console.log(this.state.data);
        return (
            <Layout>
            Shop List
                {this.state.data.map(item =>
                     <div key={item._id}>
                     id : {item._id}
                        <div> name : {item.name}</div>
                     </div>
                )}
            </Layout>
        )
    }
}
export default Shop;
