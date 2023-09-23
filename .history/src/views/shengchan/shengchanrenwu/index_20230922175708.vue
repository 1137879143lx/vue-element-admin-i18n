<template>
  <div>
    <el-card class="card1">
      <div slot="header" class="clearfix">
        <span>生产任务</span>
        <el-button
          style="margin-left: 10px"
          size="mini"
          icon="el-icon-search"
          circle
        ></el-button>
        <el-button
          style="margin-left: 5px"
          size="mini"
          icon="el-icon-refresh"
          circle
        ></el-button>
        <span style="float: right; padding: 3px 20px">
          <el-button type="text">刷新</el-button>
          <el-button type="text">新增</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">打印</el-button>
          <el-button type="text">标签打印</el-button>
          <el-button type="text">补料申请</el-button>
          <el-button type="text">查看工装工单</el-button>
          <el-button type="text">导出数据</el-button>
          <el-button type="text">已删除数据</el-button>
        </span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style>
.el-card__header {
  padding: 8px;
  padding-left: 20px;
}
</style>
