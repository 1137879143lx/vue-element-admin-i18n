<template>
  <el-card header="任务详情">
    <div slot="header" class="clearfix">
      <span>任务详情</span>
      <el-button-group style="float: right">
        <el-button type="primary" icon="el-icon-edit" />
        <el-button type="primary" icon="el-icon-printer" />
        <el-button type="primary" icon="el-icon-delete" />
      </el-button-group>
    </div>
    <el-descriptions column="3" title="M20230923">
      <el-descriptions-item label="项目">天穹</el-descriptions-item>
      <el-descriptions-item label="物料编码">02-62-00-0369-00</el-descriptions-item>
      <el-descriptions-item label="物料名称">盖天腔体支撑架</el-descriptions-item>
      <el-descriptions-item label="版本">02</el-descriptions-item>
      <el-descriptions-item label="数量">15</el-descriptions-item>
      <el-descriptions-item label="材质">AL6061</el-descriptions-item>
      <el-descriptions-item label="毛坯尺寸">100*100*25</el-descriptions-item>
      <el-descriptions-item label="客户交期">2023-09-29</el-descriptions-item>
      <el-descriptions-item label="难度等级">
        <i v-for="o in 3" :key="o" class="el-icon-star-on" />
      </el-descriptions-item>
      <el-descriptions-item label="加工类型">打样</el-descriptions-item>
      <el-descriptions-item label="制单人">刘旭</el-descriptions-item>
      <el-descriptions-item label="制单日期">2023-09-23 15:56</el-descriptions-item>
      <el-descriptions-item label="描述">--</el-descriptions-item>
      <el-descriptions-item label="级别">
        <el-tag>正常</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="工序" name="1" class="block">
        <el-timeline>
          <el-timeline-item timestamp="下料" placement="top" type="success ">
            <el-descriptions column="10">
              <el-descriptions-item label="进站">2023/4/3 20:08</el-descriptions-item>
              <el-descriptions-item label="出站">2023/4/4 08:08</el-descriptions-item>
              <el-descriptions-item label="用时">
                <i class="iconfont icon-shijian" />
                15H
              </el-descriptions-item>
              <el-descriptions-item label="人员">
                <i class="iconfont icon-fl-renyuan" />
                刘旭
              </el-descriptions-item>
              <el-descriptions-item label="数量">
                <i class="iconfont icon-shuliang" />
                15
              </el-descriptions-item>
              <el-descriptions-item label="机台">
                <i class="iconfont icon-shukongjichuang" />
                锯床1号
              </el-descriptions-item>
            </el-descriptions>
          </el-timeline-item>
          <!-- <el-divider /> -->
          <el-timeline-item timestamp="CNC" placement="top" type="success ">
            <el-descriptions column="10">
              <el-descriptions-item label="进站">2023/4/3 20:08</el-descriptions-item>
              <el-descriptions-item label="出站">--</el-descriptions-item>
              <el-descriptions-item label="用时">--</el-descriptions-item>
              <el-descriptions-item label="人员">刘旭</el-descriptions-item>
              <el-descriptions-item label="数量">15</el-descriptions-item>
              <el-descriptions-item label="机台">瑞星37</el-descriptions-item>
            </el-descriptions>
          </el-timeline-item>
          <!-- <el-divider /> -->
          <el-timeline-item timestamp="慢走丝" placement="top" type=" ">
            <el-descriptions column="10">
              <!-- <el-descriptions-item label="进站">--</el-descriptions-item>
              <el-descriptions-item label="出站">--</el-descriptions-item>
              <el-descriptions-item label="用时">--</el-descriptions-item>
              <el-descriptions-item label="人员">--</el-descriptions-item>
              <el-descriptions-item label="数量">--</el-descriptions-item>
              <el-descriptions-item label="机台">--</el-descriptions-item> -->
            </el-descriptions>
          </el-timeline-item>
          <!-- <el-divider /> -->
          <el-timeline-item timestamp="后处理" placement="top" type=" ">
            <el-descriptions column="10">
              <!-- <el-descriptions-item label="进站">--</el-descriptions-item>
              <el-descriptions-item label="出站">--</el-descriptions-item>
              <el-descriptions-item label="用时">--</el-descriptions-item>
              <el-descriptions-item label="人员">--</el-descriptions-item>
              <el-descriptions-item label="数量">--</el-descriptions-item>
              <el-descriptions-item label="机台">
                <i class="iconfont icon-shukongjichuang" />

                --
              </el-descriptions-item> -->
            </el-descriptions>
          </el-timeline-item>
          <!-- <el-divider /> -->
          <el-timeline-item timestamp="入库" placement="top" type=" ">
            <el-descriptions column="10">
              <!-- <el-descriptions-item label="人员">--</el-descriptions-item>
              <el-descriptions-item label="数量">--</el-descriptions-item>
              <el-descriptions-item label="时间">--</el-descriptions-item>
              <el-descriptions-item label="快递单号">--</el-descriptions-item> -->
            </el-descriptions>
          </el-timeline-item>
          <!-- <el-divider /> -->
        </el-timeline>
      </el-tab-pane>
      <el-tab-pane label="记录" name="2">记录</el-tab-pane>
      <el-tab-pane label="零件明细" name="3">零件明细</el-tab-pane>
      <el-tab-pane label="工时记录" name="4">工时记录</el-tab-pane>
      <el-tab-pane label="物料需求" name="5">工时记录</el-tab-pane>
      <el-tab-pane label="程序单" name="6">工时记录</el-tab-pane>
      <el-tab-pane label="过程检验" name="7">工时记录</el-tab-pane>
      <el-tab-pane label="成品检验" name="8">工时记录</el-tab-pane>
      <el-tab-pane label="历史问题点" name="9">工时记录</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      size: '',
      activeName: '1'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.name)
    }
  }
}
</script>

<style></style>
