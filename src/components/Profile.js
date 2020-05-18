import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Table, Input, InputNumber, Popconfirm, Form, Button } from "antd";
import { loadProfile } from "../actions/profileActions";
import { clearErrors } from "../actions/errorActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card } from "reactstrap"

const Profile = (props) => {
  const { loadProfile, loadCSV, profile, profileDetail } = props;
  const [csvDat] = useState([]);
  const [pid] = useState("some");
  // const [csvDat2, setCSV2] = useState([])
  const mounted = useRef();
  let inputRef = React.createRef("csv");

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      loadProfile();
    } else {
    }
  }, [loadProfile, loadCSV, profileDetail, csvDat]);

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
  const [data, setData] = useState(profile.info);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      profileurl: "",
      scrapedtime: "",
      name: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };


  // const csvButton = () => {
  // }

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
      // console.log("Validate Failed:", errInfo);
    }
  };


  const columns = [

    {
      title: "Profile Url",
      dataIndex: "profileurl",
      width: "25%",
      editable: true,
      render: (_, rec) => {
        // console.log("rec", rec);
        return (
          <Link
            to={{
              pathname: "/profileDetail",
              state: {
                profileURL: rec.profileurl,
              },
            }}
          >
            {rec.profileurl}
          </Link>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
      width: "10%",
    },
    {
      title: "Company",
      dataIndex: "company",
      width: "25%",
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
            <div className="flex">
              <a disabled={editingKey !== ""} onClick={() => edit(record)}>
                Edit
            </a>
            </div>
          );
      },
    }
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
  // console.log( profile)
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={profile.info && profile.info.length ? profile.info : []}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

const mapStateToProps = (state) => {
  // console.log("state on page", state);
  return {
    profile: state.profile,
    profileDetail: state.profileDetail,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadProfile: () => {
      dispatch(loadProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
