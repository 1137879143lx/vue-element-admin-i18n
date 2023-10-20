<template>
  <div class="jianyanjinzhan">
    <el-card shadow="always" :body-style="{ padding: '5px' }">
      <!-- <div slot="header">
        <span>检验进站</span>
      </div> -->
      <!-- card body -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="进站" name="1">
          <el-input v-model="Production_task_number" autofocus style="width: 400px; margin-bottom: 5px" type="text">
            <template slot="prepend">员工信息</template>
          </el-input>
          <br>
          <el-input v-model="Production_task_number" style="width: 400px; margin-bottom: 5px" type="text">
            <template slot="prepend">生产单号</template>
          </el-input>
          <br>
          <el-input v-model="Production_task_number" style="width: 400px; margin-bottom: 5px" type="text">
            <template slot="prepend">物料编码</template>
          </el-input>
          <br>
          <el-input v-model="Production_task_number" style="width: 400px; margin-bottom: 5px" type="text">
            <template slot="prepend">物料名称</template>
          </el-input>
          <br>
          <el-input v-model="Production_task_number" style="width: 400px; margin-bottom: 5px" type="text">
            <template slot="prepend">物料版本</template>
          </el-input>
          <br>
          <el-input v-model="Production_task_number" style="width: 400px; margin-bottom: 5px" type="text">
            <template slot="prepend">送检数量</template>
          </el-input>
          <div>
            <el-radio-group v-model="radio1">
              <el-radio-button label="首检" />
              <el-radio-button label="过程检" />
              <el-radio-button label="成品检" />
            </el-radio-group>
          </div>
          <el-button style="float: left; margin-left: 330px" type="primary">进站</el-button>
        </el-tab-pane>
      </el-tabs>
      <br>
      <br>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已进站列表" name="1">
          <img src="shape_image.png" width="100" alt="未上传">
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="sass">
@import './index.scss'
</style>

<script>
export default {
  name: 'Jianyanjinzhan',
  data() {
    return {
      activeName: '1',
      Production_task_number: '',
      radio1: ''
    }
  },
  mounted() {},

  methods: {}
}
</script>
