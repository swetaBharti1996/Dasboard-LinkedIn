import React, { useState, useEffect, useRef } from "react";
import {
    Table,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    Button,
    Spin,
} from "antd";
import { loadPosts } from "../actions/PostActions";
import { clearErrors } from "../actions/errorActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink, CSVDownload } from "react-csv";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PostData = (props) => {
    console.log("props ", props);
    const { loadPosts, commentsarray, posts } = props;

    console.log(props.loadPosts(), 'loading profile')

    // useEffect(() => {
    //   let profileurl = props.location.state && props.location.state.profileurl
    //     ? props.location.state.profileurl
    //     : null;
    //   if (ProfileDetail) {
    //     loadComment(profileurl);
    //   }
    // }, [loadComment]);

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
            console.log("Validate Failed:", errDatas);
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
            title: "Operation",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
            </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <div>
                            <a disabled={editingKey !== ""} onClick={() => edit(record)}>
                                Edit
            </a>
                        </div>
                    );
            },
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
    console.log("thisprops", props);
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
                <Spin spinning={PostData.isLoading}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={PostData.commentsarray}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Spin>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        PostData: state.PostData.commentsarray,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadPosts: () => {
            dispatch(loadPosts());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostData);
