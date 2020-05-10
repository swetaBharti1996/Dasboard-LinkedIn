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
import { loadProfilesDetailss } from "../actions/profilesDetailsActions";
import { clearErrors } from "../actions/errorActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink, CSVDownload } from "react-csv";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProfilesDetails = props => {
  const { loadProfilesDetailss, profilesDetails } = props;

  useEffect(() => {
    let postUrl =
      props.location.state && props.location.state.postUrl
        ? props.location.state.postUrl
        : null;
    if (postUrl) {
      loadProfilesDetailss(postUrl);
    }
  }, [loadProfilesDetailss]);

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
  const [data, setData] = useState(ProfilesDetails.ProfilesDetailss);
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
      title: "Username",
      dataIndex: "username",
      width: "25%",
      editable: true,
      render: (_, rec) => {
        return <a>{rec.username}</a>;
      }
    },
    {
      title: "Profile URL",
      dataIndex: "profileUrl",
      width: "25%",
      render: (_, rec) => {
        return <p>{rec.profileUrl.slice(0, rec.profileUrl.indexOf("?"))}</p>;
      }
    },
    {
      title: "College",
      dataIndex: "collegeText",
      width: "25%"
    },
    {
      title: "Company",
      dataIndex: "companyText",
      width: "25%"
    },

    {
      title: "email",
      dataIndex: "emailText",
      width: "25%"
    },
    {
      title: "Facebook",
      dataIndex: "facebookText",
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

  return (
    <div>
      <div className="flex-between">
        {/* <div className="table-operations">
          <Button >Sort age</Button>
          <Button >Clear filters</Button>
          <Button>Clear filters and sorters</Button>
        </div> */}
        <div>
          <CSVLink
            className="csv-download"
            data={ProfilesDetails.ProfilesDetailss}
          >
            <Button type="primary" icon={<DownloadOutlined />} size="medium">
              Download CSV
            </Button>
          </CSVLink>
        </div>
      </div>

      <Form form={form} component={false}>
        <Spin spinning={ProfilesDetails.isLoading}>
          <Table
            components={{
              body: {
                cell: EditableCell
              }
            }}
            bordered
            dataSource={ProfilesDetails.ProfilesDetailss}
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
  console.log("state", state);
  return {
    ProfilesDetails: state.ProfilesDetails
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadProfilesDetailss: () => {
      dispatch(loadProfilesDetailss());
    }
  };
};

export default connect(mapStateToProps, { loadProfilesDetailss })(
  ProfilesDetails
);
