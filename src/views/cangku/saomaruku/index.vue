<template>
  <div>
    <el-card class="cardbox">
      <div slot="header" class="clearfix">
        <span>扫码入库</span>
        <el-button style="float: right; padding: 0px 3px" type="text">保存并打印</el-button>
        <el-button style="float: right; padding: 0px 3px" type="text">添加到送货表</el-button>
      </div>
      <el-descriptions border column="2">
        <el-descriptions-item label="工单号">
          <el-input placeholder="请输入工单号" />
        </el-descriptions-item>
        <el-descriptions-item label="实际入库数量">
          <el-input placeholder="请输入当前入库数量" />
        </el-descriptions-item>
      </el-descriptions>
      <br>
      <br>
      <el-descriptions column="2" title="物料信息">
        <el-descriptions-item label="客户">南天门研发所</el-descriptions-item>
        <el-descriptions-item label="工单号">M202310182222</el-descriptions-item>

        <el-descriptions-item label="物料编码">02-62-00-0369-00</el-descriptions-item>
        <el-descriptions-item label="物料名称">天天快乐水</el-descriptions-item>
        <el-descriptions-item label="版本">02</el-descriptions-item>
        <el-descriptions-item label="生产类型">打样</el-descriptions-item>
        <el-descriptions-item label="表面处理方式">黑色阳极</el-descriptions-item>
        <el-descriptions-item label="工单数量">15</el-descriptions-item>

        <el-descriptions-item label="数量">15</el-descriptions-item>
        <el-descriptions-item label="此单号已入库数量">0</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  max-width: 650px;
}
</style>
