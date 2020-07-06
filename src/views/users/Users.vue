<template>
  <div class="users-wrapper">
    <!-- 栅格布局 -->
    <a-row :gutter="20">
      <a-col :span="6">
        <a-input-search
          placeholder="input search text"
          enter-button
       
        />
      </a-col>
      <a-col :span="6">
        <a-button type="Default">
          添加用户
        </a-button>
      </a-col>
      <!-- <a-col :span="6">
        col-6
      </a-col>
      <a-col :span="6">
        col-6
      </a-col> -->
    </a-row>
    <!-- 表格 -->
     <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
    <a slot="name" slot-scope="text">{{ text }}</a>
  </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
];
export default {
  name: "Users",
};
</script>

<style lang="scss" scoped>
.users-wrapper {
  padding: 10px;
  .ant-row{
   .ant-col{
    
   }
  }
}
</style>
