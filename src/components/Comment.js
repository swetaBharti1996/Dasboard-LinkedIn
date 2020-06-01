import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { loadComments, deletePosts } from "../actions/commentActions";

const CommentData = (props) => {
  const {
    loadComments,
    loadCSV,
    comments,
    commentsarray,
    deletePosts,
    PostData,
    post,
    posts,
  } = props;
  // console.log(props.loadComments())
  const mounted = useRef();

  useEffect(() => {
    console.log("useref", comments);
    if (!mounted.current) {
      mounted.current = true;
      loadComments();
    }
  }, [loadComments, loadCSV, post, commentsarray]);

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
  const [data, setData] = useState(comments);
  const [editingKey, setEditingKey] = useState("");
  const [dataSource, setDataSource] = useState([]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      url: "",
      index: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const convertTime = (time) => {
    var newTime = new Date(time * 1000).toString();
    var newTime1 = newTime.slice(3, 15);
    var newTime2 = new Date(time * 1000)
      .toLocaleTimeString()
      .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

    return newTime1 + "," + newTime2;
  };

  const handleDelete = (posturl) => {
    deletePosts(posturl);
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

  const columns = [
    {
      title: "Post Url",
      dataIndex: "url",
      width: "25%",
      editable: true,
      render: (_, rec) => {
        // console.log("rec", rec);
        return (
          <Link
            to={{
              pathname: "/comment",
              state: {
                postURL: rec.url,
              },
            }}
          >
            {rec.url}
          </Link>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Scraped Time",
      dataIndex: "time",
      render: (time) => <span>{convertTime(time)}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, rec) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(rec.url)}
        >
          <a>
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{ marginLeft: "30px", fontSize: "20px" }}
            />
          </a>
        </Popconfirm>
      ),
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

  console.log("component comments", comments);

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
  );
};

const mapStateToProps = ({ comment, error, post }) => {
  // console.log("state on page", state);
  return {
    comments: comment.comments,
    PostData: post.posts,
    error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadComments: () => {
      dispatch(loadComments());
    },
    deletePosts: (posturl) => {
      dispatch(deletePosts(posturl));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentData);
