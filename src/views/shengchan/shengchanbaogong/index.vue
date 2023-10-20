<template>
  <div class="shengchanbaogong">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>生产报工</span>
      </div>
      <!-- card body -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="进站" name="1">进站</el-tab-pane>
        <el-tab-pane label="上机" name="2">上机</el-tab-pane>
        <el-tab-pane label="下机" name="3">下机</el-tab-pane>
        <el-tab-pane label="自检" name="4">自检</el-tab-pane>
        <el-tab-pane label="日常报工" name="5">日常报工</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="sass">
@import './index.scss'
</style>

<script>
export default {
  name: 'Shengchanbaogong',
  data() {
    return {
      activeName: '1'
    }
  },
  mounted() {},

  methods: {}
}
</script>
