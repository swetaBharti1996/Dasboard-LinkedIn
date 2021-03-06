import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import {
     MenuUnfoldOutlined,
     MenuFoldOutlined,
     AreaChartOutlined,
     CommentOutlined,
     UserAddOutlined,
} from "@ant-design/icons";
import _ from "lodash";
const { Header, Sider, Content } = Layout;

const MENU = [
     {
          name: "Insights",
          url: "/insight",
          icon: AreaChartOutlined,
          position: "fixed",
     },
     {
          name: "Comments",
          url: "/post",
          icon: CommentOutlined,
     },
     {
          name: "Profile",
          url: "/profile",
          icon: UserAddOutlined,
     },
];
const LayoutCover = (props) => {
     const { children, logout } = props;
     const [collapsed, setCollapsed] = useState(false);

     const toggle = () => {
          collapsed ? setCollapsed(false) : setCollapsed(true);
     };

     const createIcon = (string) => {
          let component = React.createElement(string);
          return component;
     };
     return (
          <Layout>
               <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu
                         theme="dark"
                         mode="inline"
                         defaultSelectedKeys={["0"]}
                         className="sidebar"
                    >
                         <div className="logo" />
                         {_.map(MENU, (data, index) => {
                              return (
                                   <Menu.Item key={index}>
                                        <Link to={data.url}>
                                             {createIcon(data.icon)}
                                             <span>{data.name}</span>
                                        </Link>
                                   </Menu.Item>
                              );
                         })}
                    </Menu>
               </Sider>
               <Layout className="site-layout">
                    <Header
                         className="site-layout-background fl-right"
                         style={{ padding: 0 }}
                    >
                         {React.createElement(
                              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                              {
                                   className: "trigger",
                                   onClick: toggle,
                              }
                         )}
                         <Button danger type="primary" className="cus-btn" onClick={logout}>
                              Logout
          </Button>
                    </Header>
                    <Content
                         className="site-layout-background"
                         style={{
                              margin: "24px 6px",
                              padding: 24,
                              height: "100%",
                              minHeight: "580px",
                              overflow: "hidden",
                         }}
                    >
                         {children}
                    </Content>
               </Layout>
          </Layout>
     );
};

export default connect(null, { logout })(LayoutCover);













