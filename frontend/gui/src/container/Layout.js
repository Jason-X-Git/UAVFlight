import React from "react";

import {Layout, Menu, Breadcrumb, PageHeader} from "antd";

import {Link} from 'react-router-dom';
import moment from "moment";

const {Header, Content, Footer} = Layout;


class CustomLayout extends React.Component {

    render() {
        return <div className="page-header">
            <div className="content-container">
                <div>
                    {this.props.children}
                </div>
            </div>
        </div>
    }


}

export default CustomLayout;
