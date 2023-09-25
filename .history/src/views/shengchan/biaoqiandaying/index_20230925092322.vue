<template class="back">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>标签打印</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="print">标签打印</el-button>
    </div>
    <div id="printable-content">
      <div class="center">
        <table>
          <!-- <caption>202309241749</caption> -->
          <thead>
            <tr>
              <!-- <th>Items</th> -->
              <!-- <th scope="col">Expenditure</th> -->
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- <th scope="row">编号</th> -->
              <td>202309241749</td>
              <td>南天门研发所</td>
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
              <td>下料,CNC,慢走丝,后处理,黑色阳极黑色阳极黑色阳极黑色阳极黑色阳极黑色阳极</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-card>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'QrCode',
  data() {
    return {
      Batch_number: 202309241838
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
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.M // 容错率，L/M/H
      })
    },
    print() {
      // 获取待打印的内容
      const printableContent = document.getElementById('printable-content').innerHTML

      // 创建一个新的窗口并加载打印内容
      const printWindow = window.open('', '_blank')
      printWindow.document.write(printableContent)

      // 执行打印操作
      printWindow.document.close()

      // 如果内容中有图片或其他需要一定时间加载的，请使用注释中的延时打印
      setTimeout(() => {
        printWindow.print()
      }, 200)
      printWindow.print()
    }
  }
}
</script>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

caption {
  padding: 2px;
  caption-side: bottom;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  letter-spacing: 1px;
  font-family: sans-serif;
  font-size: 0.5rem;
  width: 300px;
  height: 150px;
}

td,
th {
  border: 1px solid rgb(190, 190, 190);
  /* padding: 5px 10px; */
}

td {
  text-align: center;
  align-items: center;
}
.el-card {
  height: 95%;
}
</style>
