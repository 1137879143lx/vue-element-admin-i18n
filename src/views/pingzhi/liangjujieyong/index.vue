<template>
  <div class="liangjujieyong">
    <el-card shadow="always" :body-style="{ padding: '5px' }">
      <div slot="header">
        <span>量具借用</span>
      </div>
      <el-table size="mini" border>
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column label="状态" />
        <el-table-column label="量具名称" />
        <el-table-column label="规格" />
        <el-table-column label="量具编码" />
        <el-table-column label="数量" />
        <el-table-column label="借出时间" />
        <el-table-column label="预计归还时间" />
        <el-table-column label="借用人" />
        <el-table-column label="确认人" />
        <el-table-column label="备注" />
        <el-table-column fixed="right" label="操作">
          <el-button type="text">归还</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="sass">
@import './index.scss'
</style>

<script>
export default {
  name: 'Liangjujieyong',
  data() {
    return {}
  },
  mounted() {},

  methods: {}
}
</script>
