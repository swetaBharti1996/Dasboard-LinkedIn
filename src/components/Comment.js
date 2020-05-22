import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { connect } from 'react-redux'
import { loadComments } from '../actions/commentActions'



const CommentData = (props) => {

    const { loadComments, loadCSV, comments, commentsarray } = props;
    // console.log(props.loadComments())
    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            loadComments();
        } else {
        }
    }, [loadComments, loadCSV, commentsarray]);
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
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
    const [data, setData] = useState(comments);
    const [editingKey, setEditingKey] = useState('');
    const [dataSource, setDataSource] = useState([])

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            url: '',
            index: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };


    const handleDelete = key => {
        setDataSource(
            dataSource.filter(item => item.key !== key)
        );
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            // console.log('Validate Failed:', errInfo);
        }
    };



    const columns = [
        {
            title: "Profile Url",
            dataIndex: "url",
            width: "25%",
            editable: true,
            render: (_, rec) => {
                // console.log("rec", rec);
                return (
                    <Link to={{
                        pathname: '/comment',
                        state: {
                            postURL: rec.url
                        }
                    }}>{rec.url}</Link>
                );
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "25%"
        },
        {
            title: 'Scraped Time',
            dataIndex: 'time'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, rec) =>
                // dataSource.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(rec.key)}>
                    <a>Delete</a>
                </Popconfirm>
            // ) : null,
        }
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={comments}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>

    )

}

const mapStateToProps = state => {
    // console.log("state on page", state);
    return {
        comments: state.comment.comments,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadComments: () => {
            dispatch(loadComments());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentData);
