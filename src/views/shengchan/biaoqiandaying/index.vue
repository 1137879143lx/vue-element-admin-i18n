<template class="back">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>标签打印</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="print">标签打印</el-button>
    </div>
    <div class="center">
      <div id="print-content">
        <table>
          <tbody>
            <tr>
              <!-- <th scope="row">编号</th> -->
              <td>202309241749</td>
              <td>南天门研发</td>
            </tr>
            <tr>
              <!-- <th scope="row">项目</th> -->
              <td>天穹</td>
              <td>打样</td>
            </tr>
            <tr>
              <!-- <th scope="row">编码</th> -->
              <td>02-62-00-0369-00</td>
              <td>02</td>
            </tr>
            <tr>
              <!-- <th scope="row">名称</th> -->
              <td>天穹篮球</td>
              <td>15PCS</td>
            </tr>

            <tr>
              <!-- <th scope="row">材料</th> -->
              <td>AL6061</td>
              <td rowspan="3">
                <div id="qrCode" ref="qrCodeDiv" />
              </td>
            </tr>
            <tr>
              <!-- <th scope="row">交期</th> -->
              <td>2023-09-30</td>
            </tr>
            <tr>
              <!-- <th scope="row">工序</th> -->
              <td>下料,CNC,慢走丝,后处理,黑色阳极</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-card>
</template>

<script>
import QRCode from 'qrcodejs2'
import printJS from 'print-js'
export default {
  name: 'QrCode',
  data() {
    return {
      Batch_number: '202309241838'
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
        correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
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
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(0, 0, 0);
  letter-spacing: 1px;
  font-family: sans-serif;
  font-size: 0.2rem;
  width: 70mm;
  height: 40mm;
  color: black;
  padding: 0;
  margin: 0;
}

td,
th {
  border: 1px solid rgb(0, 0, 0);
  /* padding: 5px 10px; */
  font-size: 0.2rem;
  padding: 0;
  margin: 0;
}

td {
  text-align: center;
  align-items: center;
  font-size: 0.2rem;
  padding: 0;
  margin: 0;
}
</style>
