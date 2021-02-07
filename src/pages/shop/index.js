import React, { Component } from 'react'
import  {Router} from '@reach/router'
import Axios from 'axios'

import Layout from '../../components/layout';

 class Shop extends Component {
    constructor(){
        super();
        console.log('constructor');
        this.state={
            is_loading:false,
        };

    }
    componentDidMount(){
        console.log('componentDidMount');
        // เรียก API จังหวะนี้
    }
    componentWillMount(){
        console.log('componentWillMount');
        // ใส่ spin แสดงการโหลดข้อมูล
    }

    render() {
        console.log('render');
        if(!this.state.is_loading){
           return  <Layout>Loading...</Layout>
        }
        return (
            <Layout>
                Shop/Index
            </Layout>
        )
    }
}
export default Shop;
