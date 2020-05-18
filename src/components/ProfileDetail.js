import React, { useState, useEffect } from "react";//useRef
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Spin,
  Card
} from "antd";
// import { clearErrors } from "../actions/errorActions";
import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { DownloadOutlined } from "@ant-design/icons";
// import { CSVLink, CSVDownload } from "react-csv";
import { loadProfileDetail } from "../actions/profileDetailActions";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProfileData = (props) => {
  const { loadProfileDetail, ProfileData, isLoading } = props;

  useEffect(() => {
    let profileurl =
      props.location.state && props.location.state.profileURL
        ? props.location.state.profileURL
        : null;
    if (ProfileData) {
      // console.log( profileurl);
      loadProfileDetail(profileurl);
    }
  }, [loadProfileDetail]);

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
  const [editingKey, setEditingKey] = useState("");

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
      // console.log("Validate Failed:", errDatas);
    }
  };

  const columns = [
    {
      title: "Profile Url",
      dataIndex: "profileurl",
      render: (_, rec) => {
        return (
          <a>{rec.profileurl}</a>
        )

      }
    },
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "current place ",
      dataIndex: "currentplace",
      width: "25%",
    },
    {
      title: "facebook",
      dataIndex: "facebook",
      width: "25%",
    },
    {
      title: "twitter",
      dataIndex: "twitter",
      width: "25%",
    },
    {
      title: "college name",
      dataIndex: "collegename",
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
  // console.log("profile wala", ProfileData);
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
          <Card title="Profile Details" bordered={false} style={{ width: 200 }}>
            <li data={ProfileData._id ? [ProfileData] : []} >This is COW</li>
          </Card>
          {/* <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource=
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          /> */}
        </Spin>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ profileDetail }) => {
  return {
    isLoading: profileDetail.isLoading,
    ProfileData: profileDetail.linkdata || null
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadProfileDetail: (data) => {
      dispatch(loadProfileDetail(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileData);
