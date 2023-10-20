<template>
  <div class="gongzhuangguanli">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>工装管理</span>
      </div>
      <!-- card body -->
      <el-table border size="mini">
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column label="工装编号">123</el-table-column>
        <el-table-column label="工装类型">123</el-table-column>
        <el-table-column label="关联零件号">123</el-table-column>
        <el-table-column label="关联零件版本">123</el-table-column>
        <el-table-column label="生产任务编号">123</el-table-column>
        <el-table-column label="领料单号">123</el-table-column>
        <el-table-column label="材料编号">123</el-table-column>
        <el-table-column label="材料名称">123</el-table-column>
        <el-table-column label="材料规格">123</el-table-column>
        <el-table-column label="数量">123</el-table-column>
        <el-table-column label="领料数量">123</el-table-column>
        <el-table-column label="状态">123</el-table-column>
        <el-table-column label="备注">123</el-table-column>
        <el-table-column label="操作">
          <el-button size="mini" type="text">排工艺</el-button>
          <el-button size="mini" type="text">开加工单</el-button>
          <el-button size="mini" type="text">开领料单</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<!-- <style lang="sass" scoped>
@import './index.scss'
</style> -->

<style lang="sass">
@import './index.scss'
</style>
<script>
export default {
  name: 'Gongzhuangguanli',
  data() {
    return {}
  },
  mounted() {},

  methods: {}
}
</script>
