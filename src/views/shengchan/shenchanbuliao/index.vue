<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>生产补料</span>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-search" circle />
        <el-button style="margin-left: 5px" size="mini" icon="el-icon-refresh" circle />
      </div>
      <el-table ref="dragTable" v-loading="listLoading" size="mini" row-key="id" border fit style="width: 100%" highlight-current-row>
        <el-table-column type="selection" width="40" />
        <el-table-column align="center" label="生产任务号" min-width="85">
          <i class="el-icon-warning-outline" />
          <el-button size="mini" type="text">20230928</el-button>
        </el-table-column>
        <el-table-column align="center" label="状态">123</el-table-column>
        <el-table-column align="center" label="物料编号">123</el-table-column>
        <el-table-column align="center" label="物料名称">123</el-table-column>
        <el-table-column align="center" label="报废完成百分比">123</el-table-column>
        <el-table-column align="center" label="数量">123</el-table-column>
        <el-table-column align="center" label="申请人">123</el-table-column>
        <el-table-column align="center" label="申请日期">123</el-table-column>
        <el-table-column align="center" label="原因备注">123</el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ''
    }
  },
  // eslint-disable-next-line space-before-function-paren
  mounted: function () {
    // eslint-disable-next-line space-before-function-paren
  },
  methods: {}
}
</script>
