import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
    Table,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    Spin,
} from "antd";
import { connect } from "react-redux";
import { loadPosts } from '../actions/postActions'
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PostData = (props) => {
    const { loadPosts, PostData, isLoading } = props;
    // console.log(PostData, 'post data')


    useEffect(() => {
        let profileurl = props.location.state && props.location.state.postURL
            ? props.location.state.postURL
            : null;
        if (PostData) {
            // console.log('hii', profileurl)
            loadPosts(profileurl);
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
    const [data, setData] = useState();
    const [editingKey, setEditingKey] = useState('');
    const [dataSource, setDataSource] = React.useState([])

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({

            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const handleDelete = key => {
        setDataSource(
            dataSource.filter(item => item.key !== key)
        );
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
        } catch (errDatas) {
            // console.log("Validate Failed:", errDatas);
        }
    };

    const columns = [
        {
            title: "Profile Url",
            dataIndex: 'profileurl',
            render: (_, record) => {
                return <a>{record.profileurl}</a>
            }
        },
        {
            title: "name",
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
            title: "Comment",
            dataIndex: 'comment',
            width: "25%"
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, rec) =>
                // dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(rec.key)}>
                    <a>Delete</a>
                </Popconfirm>
            // ) : null,
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
    // console.log("thisprops", props);
    return (
        <div>
            <div className="flex-between">
                {/* <div className="table-operations">
          <Button >Sort age</Button>
          <Button >Clear filters</Button>
          <Button>Clear filters and sorters</Button>
        </div> */}
                {/* <div>
          <CSVLink
            className="csv-download"
            data={comment.comments}
          >
            <Button type="primary" icon={<DownloadOutlined />} size='medium'>
              Download CSV
      </Button>
          </CSVLink>
        </div> */}
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
        </div>
    );
};

const mapStateToProps = ({ post }) => {
    return {
        isLoading: post.isLoading,
        PostData: post.posts.length ? post.posts[0].commentsarray : []
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadPosts: (data) => {
            dispatch(loadPosts(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostData);
