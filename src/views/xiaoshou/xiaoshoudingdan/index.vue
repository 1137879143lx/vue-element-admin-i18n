<template>
  <div>
    <el-card header="采购申请">
      <div slot="header" class="clearfix">
        <span>采购申请</span>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-search" circle @click="drawer = true" />
        <el-button style="margin-left: 5px" size="mini" icon="el-icon-refresh" circle />
        <span style="float: right; padding: 3px 20px">
          <el-button type="text" @click="$router.push('../caigou/caigoushenqing_xinzeng')">新增</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">导出数据</el-button>
          <el-button type="text">已删除数据</el-button>
        </span>
      </div>

      <el-table stripe :data="List" size="mini">
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column property="id" label="申请订单" />
        <el-table-column property="proposer" label="申请人" />
        <el-table-column property="section" label="部门" />
        <el-table-column property="Application_date" label="申请日期" />

        <el-table-column property="items" label="物料列表">
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
            <el-button type="text">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column property="totalEstimatedPrice" label="预估价格" />
        <el-table-column property="deliveryDate" label="期望交货日期" />
        <el-table-column property="remarks" label="申请备注" />
        <el-table-column label="申请状态">
          <template slot-scope="{ row }">
            <el-tag type="info" size="mini" effect="plain  ">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="approval" label="批准" />

        <el-table-column align="center" label="编辑">
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
            <el-button type="text">编辑</el-button>
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
          proposer: '刘旭',
          section: '编程组',
          status: '待审批',
          Application_date: '2023-10-6',
          items: '物料列表',
          totalEstimatedPrice: 100,
          approval: '刘旭',
          deliveryDate: '2023-10-06',
          remarks: '用于焊接PCB板子'
        },
        {
          id: 20230002,
          proposer: '刘旭',
          section: '编程组',
          status: '待审批',
          items: '物料列表',
          Application_date: '2023-10-6',

          totalEstimatedPrice: 100,
          approval: '刘旭',
          deliveryDate: '2023-10-06',
          remarks: '用于焊接PCB板子'
        }
      ]
    }
  }
}
</script>
