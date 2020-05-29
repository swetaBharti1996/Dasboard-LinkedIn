import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Table,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    Button,
    Spin,
    Modal,
    Select,
    Divider,
} from "antd";
import { useHistory } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";
import { connect } from "react-redux";
import { loadPosts } from "../actions/postActions";
import { CSVLink, CSVDownload } from "react-csv";
import queryString from "query-string";
import { Pagination } from "antd";
import Email from "./Email";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PostData = (props) => {
    let tempeditorState = BraftEditor.createEditorState(
        "<p>Hello <b>World!</b></p>"
    );

    const { loadPosts, PostData, isLoading } = props;
    const [modal1Visible, setVisible] = useState(false);
    const [editorState, setEditorState] = useState(tempeditorState)
    const [outputHTML, setOutputHTML] = useState("<p></p>");
    const [emails, setEmails] = useState([]);
    const [data, setData] = useState(PostData)
    const [didMount, setDidMount] = useState(false);
    const [postUrlS, setPostUrl] = useState();

    useEffect(() => {
        let posturl =
            props.location.state && props.location.state.postURL
                ? props.location.state.postURL
                : null;
        if (PostData) {
            // console.log("hii", profileurl);
            setPostUrl(posturl)
            loadPosts(posturl);
        }
    }, [loadPosts]);

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [dataSource, setDataSource] = React.useState([]);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            age: "",
            address: "",
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };


    const extractEmails = (text) => {
        text = text.toLowerCase()
        let temp = { value: null }
        let formattedEmail = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
        temp['value'] = formattedEmail;
        return formattedEmail
    }
    const handleEditorChange = (editorState) => {
        setEditorState(editorState);
        setOutputHTML(editorState.toHTML());
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const setModal1Visible = (modalVisible) => {
        setVisible(modalVisible);
    };

    const columns = [
        {
            title: "Profile Url",
            dataIndex: "profileurl",
            render: (_, record) => {
                return <a>{record.profileurl}</a>;
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "25%",
            editable: true,
        },
        {
            title: "Designation",
            dataIndex: "designation",
            width: "25%",
        },
        {
            title: 'Email(s)',
            dataIndex: 'comment',
            width: '25%',
            render: (_, rec) => {
                return (<p>{extractEmails(rec.comment)}</p>)
            },
        },
        {
            title: "Comment",
            dataIndex: "comment",
            width: "25%",
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div>
            <div className="flex-between">
                <div className="table-operations">
                    {/* <Button >Sort age</Button>
            <Button >Clear filters</Button>
            <Button>Clear filters and sorters</Button> */}
                    <Button type="primary" ghost onClick={() => setModal1Visible(true)}>
                        Send email
                    </Button>
                </div>
                <div>
                    <CSVLink className="csv-download" data={PostData}>
                        <Button type="primary" icon={<DownloadOutlined />} size="medium">
                            Download CSV
            </Button>
                    </CSVLink>
                </div>
            </div>

            <Form form={form} component={false}>
                <Spin spinning={isLoading}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={PostData}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Spin>
            </Form>
            <Link to="/post">Back</Link>
            <Email
                setModal1Visible={setModal1Visible}
                modal1Visible={modal1Visible}
                posturl={postUrlS}
            />
        </div>
    );
};

const mapStateToProps = ({ post }) => {
    return {
        isLoading: post.isLoading,
        PostData: post.posts.length ? post.posts : [],
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadPosts: (data) => {
            dispatch(loadPosts(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostData);
















