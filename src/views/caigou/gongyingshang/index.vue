<template>
  <div>
    <el-card :body-style="{ padding: '5px' }">
      <div slot="header" class="clearfix">
        <span>供应商</span>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-search" circle @click="drawer = true" />
        <el-button style="margin-left: 5px" size="mini" icon="el-icon-refresh" circle />
        <span style="float: right; padding: 3px 20px">
          <el-button type="text" @click="$router.push('../caigou/caigoushenqing_xinzeng')">新增</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">导出数据</el-button>
          <el-button type="text">已删除数据</el-button>
        </span>
      </div>

      <el-table border :data="List" size="mini">
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column label="供应商编号">
          <template slot-scope="{ row }">
            <i class="el-icon-office-building" />
            <el-button type="text" size="mini">{{ row.Customer_number }}</el-button>
          </template>
        </el-table-column>

        <el-table-column property="Short_name" label="简称" />
        <el-table-column property="Full_name" label="全称" />
        <el-table-column property="Address" label="地址" />
        <el-table-column property="Tax_rate" label="税率%" align="right">
          <template slot-scope="{ row }">{{ row.Tax_rate }}%</template>
        </el-table-column>
        <el-table-column property="Currency" label="货币" />
        <el-table-column property="Contact_Person" label="联系人">
          <template slot-scope="{ row }">
            {{ row.Contact_Person }}
          </template>
        </el-table-column>
        <el-table-column property="Contact_Person" label="电话">
          <template slot-scope="{ row }">
            {{ row.Telephone }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑">
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
            <el-button type="text" size="mini">编辑</el-button>
            |
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [
        {
          id: 20230001,
          Customer_number: '五百强',
          Short_name: 'WBQ',
          Full_name: '重庆五百强虚拟集团',
          Tax_rate: '13',
          Currency: 'RMB',
          Contact_Person: '刘旭',
          Telephone: 18502351874,
          Address: '重庆市嘉陵江500号重庆五百强虚拟集团'
        },
        {
          id: 20230002,
          Customer_number: '天庭南天门',
          Short_name: 'NTM',
          Full_name: '天庭市南天门科技有限公司',
          Tax_rate: '13',
          Currency: 'RMB',
          Contact_Person: '刘旭',
          Telephone: 18502351874,
          Address: '天安门1号广场113号'
        },
        {
          id: 20230002,
          Customer_number: '天安事务所',
          Short_name: 'NTM',
          Full_name: '天庭市南天门科技有限公司',
          Tax_rate: '13',
          Currency: 'RMB',
          Contact_Person: '刘旭',
          Telephone: 18502351874,
          Address: '天安门1号广场113号'
        }
      ]
    }
  }
}
</script>
