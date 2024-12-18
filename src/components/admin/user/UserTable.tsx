import { getUsersAPI } from "@/services/api";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Dropdown } from "antd";
import { useRef, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const columns: ProColumns<IUserTable>[] = [
  {
    dataIndex: "index",
    valueType: "indexBorder",
    width: 48,
    key: "index",
  },
  {
    title: "Id",
    dataIndex: "_id",
    render: (item) => [<a key='1'>{item}</a>],
    search: false,
    key: "id",
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    copyable: true,
    key: "email",
  },
  {
    title: "Created Time",
    dataIndex: "createdAt",
    key: "createdTime",
  },
  {
    title: "Action",
    valueType: "option",
    key: "action",
    render: () => [
      <Button key='edit'>
        <FaEdit color='#de9d07' />
      </Button>,
      <Button key='delete'>
        <FaTrashAlt color='#ee0707' />
      </Button>,
    ],
  },
];

export const UserTable = () => {
  const actionRef = useRef<ActionType>();
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 0,
  });

  return (
    <ProTable<IUserTable>
      request={async () => {
        const res = await getUsersAPI();
        if (res.data) {
          setMeta(res.data.meta);
        }
        return {
          data: res.data?.result,
          page: 1,
          success: true,
          total: res.data?.meta.total,
        };
      }}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      rowKey='_id'
      pagination={{
        current: meta.current,
        pageSize: meta.pageSize,
        total: meta.total,
        onChange: (page) => console.log(page),
        showSizeChanger: true,
      }}
      headerTitle='User management'
      toolBarRender={() => [
        <Button
          key='button'
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type='primary'
        >
          Add User
        </Button>,
        <Dropdown
          key='menu'
          menu={{
            items: [
              {
                label: "1st item",
                key: "1",
              },
              {
                label: "2nd item",
                key: "2",
              },
              {
                label: "3rd item",
                key: "3",
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
