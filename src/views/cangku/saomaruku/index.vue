<template>
  <div>
    <el-card class="cardbox">
      <div slot="header" class="clearfix">
        <span>扫码入库</span>
        <el-button icon="el-icon-printer" style="float: right; padding: 0px 3px" type="text" @click="print()">保存并打印</el-button>
        <el-button style="float: right; padding: 0px 3px" type="text">添加到送货表</el-button>
      </div>
      <el-descriptions border column="2">
        <el-descriptions-item label="工单号">
          <el-input autofocus placeholder="请输入工单号" />
        </el-descriptions-item>
        <el-descriptions-item label="实际入库数量">
          <el-input placeholder="请输入当前入库数量" />
        </el-descriptions-item>
      </el-descriptions>
      <br>
      <br>
      <el-descriptions id="print-content" extra="十三层地狱科技有限责任公司" colon="true" border column="2" title="物料信息">
        <el-descriptions-item label="客户">南天门研发所</el-descriptions-item>
        <el-descriptions-item label="工单号">{{ Batch_number }}</el-descriptions-item>
        <el-descriptions-item label="物料编码">02-62-00-0369-00</el-descriptions-item>
        <el-descriptions-item label="物料名称">天天快乐水</el-descriptions-item>
        <el-descriptions-item label="版本">02</el-descriptions-item>
        <el-descriptions-item label="生产类型">打样</el-descriptions-item>
        <el-descriptions-item label="表面处理方式">黑色阳极</el-descriptions-item>
        <el-descriptions-item label="工单数量">15</el-descriptions-item>

        <el-descriptions-item label="数量">15</el-descriptions-item>
        <el-descriptions-item label="此单号已入库数量">0</el-descriptions-item>
        <el-descriptions-item label="入库日期">2023-10-19</el-descriptions-item>
        <el-descriptions-item label="二维码"><div id="qrCode" ref="qrCodeDiv" /></el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import printJS from 'print-js'
export default {
  name: 'QrCode',
  data() {
    return {
      Batch_number: 'M202310182222'
    }
  },
  // eslint-disable-next-line space-before-function-paren
  mounted: function () {
    // eslint-disable-next-line space-before-function-paren
    this.$nextTick(function () {
      this.bindQRCode()
    })
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    bindQRCode: function () {
      new QRCode(this.$refs.qrCodeDiv, {
        text: this.Batch_number,
        width: 70,
        height: 70,
        colorDark: '#000000', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.M // 容错率，L/M/H
      })
    },
    print() {
      printJS({
        printable: 'print-content', // 需要打印的元素的ID
        type: 'html',
        documentTitle: '打印内容',
        // 继承样式
        targetStyle: '*',
        targetStyles: '*',
        scanStyles: true,
        maxWidth: 1000,
        font_size: 0.5,
        honorMarginPadding: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  max-width: 650px;
}
</style>
