import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Button,
  Spin
} from "antd";
import { loadComments } from "../actions/profilesDetailAction";
import { clearErrors } from "../actions/errorActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink, CSVDownload } from "react-csv";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProfileDetail = props => {
  console.log("props ", props);
  const { loadComments, profileDetail } = props;

  useEffect(() => {
    let profileurl =
      props.location.state && props.location.state.postUrl
        ? props.location.state.profileurl
        : null;
    if (ProfileDetail) {
      loadComments(profileurl);
    }
  }, [loadComments]);

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
              margin: 0
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`
              }
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
  const [data, setData] = useState(profileDetail.datas);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
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
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
      render: (_, rec) => {
        return <a>{rec.name}</a>;
      }
    },
    {
      title: "Profile URL",
      dataIndex: "profileurl",
      width: "25%",
      render: (_, rec) => {
        return <p>{rec.profileUrl.slice(0, rec.profileUrl.indexOf("?"))}</p>;
      }
    },
    {
      title: "college",
      dataIndex: "college",
      width: "25%"
    },
    {
      title: "Email",
      dataIndex: "Email",
      width: "25%"
    },
    {
      title: "facebook",
      dataIndex: "college",
      width: "25%"
    },
    {
      title: "twitter",
      dataIndex: "twitter",
      width: "25%"
    },
    {
      title: "scrapedtime",
      dataIndex: "scrapedtime",
      width: "25%"
    },
    {
      title: "phonenumber",
      dataIndex: "phonenumber",
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
                marginRight: 8
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
      }
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
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
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
        <Spin spinning={profileDetail.isLoading}>
          <Table
            components={{
              body: {
                cell: EditableCell
              }
            }}
            bordered
            dataSource={profileDetail.datas}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel
            }}
          />
        </Spin>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profileDetail: state.profileDetail
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadComments: () => {
      dispatch(loadComments());
    }
  };
};

export default connect(mapStateToProps, { loadComments })(ProfileDetail);
