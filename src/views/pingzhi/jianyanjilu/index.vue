<template>
  <div class="jianyanjilu">
    <el-card shadow="always" :body-style="{ padding: '5px' }">
      <div slot="header">
        <span>检验记录</span>
      </div>
      <!-- card body -->
      <el-table>
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column label="物料编码" />
        <el-table-column label="物料版本" />
        <el-table-column label="物料名称" />
        <el-table-column label="数量" />
        <el-table-column label="工序" />
        <el-table-column label="物料类型" />
        <el-table-column label="生产类型" />
        <el-table-column label="部门" />
        <el-table-column label="送检人" />
        <el-table-column label="处理结果" />
        <el-table-column label="加工单号" />
        <el-table-column label="检验类型" />
        <el-table-column label="检验时间" />
        <el-table-column label="状态" />
        <el-table-column label="操作">
          <el-button type="text">免检</el-button>
          <el-button type="text">检验结果</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="sass" scoped>
@import './index.scss'
</style>

<script>
export default {
  name: 'Jianyanjilu',
  data() {
    return {}
  },
  mounted() {},

  methods: {}
}
</script>
