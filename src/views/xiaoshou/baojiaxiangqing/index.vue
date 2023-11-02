<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '5px' }">
      <el-button style="float: right; margin-left: 5px" size="mini" type="link">保存并提交</el-button>
      <el-button style="float: right; margin-left: 5px" size="mini" type="link">保存</el-button>
      <el-descriptions title="报价详情">
        <el-descriptions-item label="订单号">{{ orderNumber }}</el-descriptions-item>
        <el-descriptions-item label="客户">
          <el-select v-model="Customer" placeholder="请选择" size="mini" style="width: 250px" @change="change">
            <el-option v-for="item in CustomerOptions" :key="item.CustomerId" :label="item.CustomerId" :value="item.CustomerId">
              <span style="float: left">{{ item.CustomerId }}</span>
              <span style="float: right; color: #8492a6; font-size: 12px">{{ item.FullName }}</span>
            </el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="收货地址">{{ Address }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag size="small">待报价</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-input v-model="note" size="mini" style="width: 250px" />
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>物料信息</span>
        <el-button style="float: right" size="mini" type="link">删除</el-button>
        <el-button style="float: right" size="mini" type="link">导入</el-button>
        <el-button style="float: right" size="mini" type="link">导出下料清单</el-button>
        <el-button style="float: right" size="mini" type="link">导出报价清单</el-button>
        <el-button style="float: right" size="mini" type="link">导出报价模板</el-button>
        <el-button style="float: right" size="mini" type="link" @click="addMaterial">新增</el-button>
      </div>

      <el-table size="mini" :data="FormData" :scroll="{ x: 1200 }" :loading="loading" height="500" row-key="id">
        <el-table-column fixed type="index" width="60" align="center" />
        <el-table-column fixed type="selection" width="60" align="center" />
        <el-table-column fixed min-width="200" label="零件编码">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.materialCode"
              size="mini"
              filterable
              reserve-keyword
              remote
              clearable
              default-first-option
              :remote-method="searchParentComponentNo"
              :loading="loading"
              :popper-append-to-body="true"
              placeholder="请输入零件编码"
              @change="changeParentComponentNo(scope.row)"
            >
              <el-option v-for="item in parentComponentNoOptions" :key="item.value" :label="item.label" :value="item.value" style="width: 250px">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 10px">{{ item.names }}</span>
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed min-width="200" label="零件名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialName" size="mini" />
          </template>
        </el-table-column>
        <el-table-column min-width="100" label="版本">
          <template slot-scope="scope">
            <el-input v-model="scope.row.version" size="mini" />
          </template>
        </el-table-column>
        <el-table-column min-width="100" label="数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.quantity" size="mini" />
          </template>
        </el-table-column>
        <el-table-column min-width="240" label="材料名称">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.material"
              size="mini"
              clearable
              filterable
              remote
              :remote-method="querySearch"
              placeholder="请输入材料名称"
              style="width: 200px"
            >
              <el-option v-for="material in materials" :key="material._id" :label="material.name" :value="material.name">
                <span style="float: left">{{ material.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 10px">{{ material.code }}</span>
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <!-- // v-model="scope.row.Surface_treatment" -->
        <el-table-column min-width="180" label="表面处理">
          <template slot-scope="scope">
            <el-select v-model="scope.row.Surface_treatment" filterable remote clearable placeholder="请输入表面处理" size="small">
              <el-option v-for="item in SurfaceResults" :key="item._id" :label="item.name" :value="item.name" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column min-width="180" label="下料尺寸">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cuttingSize" size="mini" clearable />
          </template>
        </el-table-column>
        <el-table-column min-width="100" label="下料数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cuttingQuantity" size="mini" />
          </template>
        </el-table-column>
        <el-table-column width="260" label="加工工序">
          <template slot-scope="">
            <el-button size="mini" type="text">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column width="120" label="编程工艺费(￥)">
          <template slot-scope="scope">
            <el-input v-model="scope.row.programmingFee" size="mini" />
          </template>
        </el-table-column>
        <el-table-column width="120" label="紧急程度">
          <template slot-scope="scope">
            <el-select v-model="scope.row.urgency" size="mini" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="120" label="额外刀具费(￥)">
          <template slot-scope="scope">
            <el-input v-model="scope.row.additionalToolingFee" size="mini" />
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="材料费(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.materialFee }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="表面积mm²">
          <template slot-scope="scope">
            <span>{{ scope.row.surfaceArea }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="体积mm³">
          <template slot-scope="scope">
            <span>{{ scope.row.volume }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="毛坯重量(Kg)">
          <template slot-scope="scope">
            <span>{{ scope.row.roughWeight }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="净重量(Kg)">
          <template slot-scope="scope">
            <span>{{ scope.row.netWeight }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="表面处理费(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.surfaceTreatmentFee }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120" label="加工工时h">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="包装检验费5%(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.packagingInspectionFee }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="快递费(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.expressFee }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="管理费5%(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.managementFee }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="利润10%(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.profit }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="单价含税13%(￥)">
          <template slot-scope="scope">
            <el-tag size="mini" effect="dark" type="success">{{ scope.row.unitPriceTaxIncluded }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="120" label="总价含税13%(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.totalPriceTaxIncluded }}</span>
          </template>
        </el-table-column>
        <el-table-column width="250" label="回复交期">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.replyDeliveryDate"
              size="mini"
              align="left"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </template>
        </el-table-column>
        <el-table-column width="100" label="图片3D">
          <img width="40" src="../../../../public/shape_image.png" alt="未上传">
        </el-table-column>
        <el-table-column width="100" label="图片2D">
          <img width="40" src="../../../../public/shape_image.png" alt="未上传">
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button :loading="scope.row.isloding" icon="el-icon-upload2" size="mini" @click="toDo(scope.row)" />
            <el-button icon="el-icon-delete" size="mini" @click="toDo(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--  -->
    <el-dialog :visible="true" title="编辑加工工序" width="50%">
      <div class="container">
        <el-table size="mini" :data="tableData" style="width: 60%" height="535px">
          <el-table-column type="index" label="#" />
          <el-table-column type="selection" />
          <el-table-column prop="name" label="工序">
            <template slot-scope="scope">
              <el-select v-model="scope.row.name" size="mini" placeholder="请选择">
                <el-option label="待入站" value="待入站" />
                <el-option label="已入站" value="已入站" />
                <el-option label="加工中" value="加工中" />
                <el-option label="已加工" value="已加工" />
                <el-option label="暂停中" value="暂停中" />
                <el-option label="外协中" value="外协中" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="预计工时">
            <template slot-scope="scope">
              <!--  eslint-disable-next-line vue/html-self-closing -->
              <el-input-number
                v-model="scope.row.description"
                size="mini"
                controls-position="right"
                :min="0.01"
                :max="100"
                :step="0.05"
                @change="handleChange"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="状态">
            <template slot-scope="scope">
              <el-select v-model="scope.row.price" size="mini" placeholder="请选择">
                <el-option label="待入站" value="待入站" />
                <el-option label="已入站" value="已入站" />
                <el-option label="加工中" value="加工中" />
                <el-option label="已加工" value="已加工" />
                <el-option label="暂停中" value="暂停中" />
                <el-option label="外协中" value="外协中" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <!--  eslint-disable-next-line vue/no-unused-vars -->
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-delete" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="button-list">
          <el-button v-for="processes in List_of_processes" :key="processes._id" size="mini" type="text">+ {{ processes.name }}</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as Customer from '@/api/Customer'
import * as materials from '@/api/materials'
import * as surfaceTreatment from '@/api/surfaceTreatment'
import * as processStep from '@/api/processStep'
export default {
  data() {
    return {
      loading: false,
      parentComponentNoOptions: [],
      Return_delivery_time: '',
      note: '',
      Customer: '',
      CustomerOptions: [],
      Address: '',
      orderNumber: '20231030001',
      category: '零件', // 待搜索的零件类别
      Type_of_material: '原材料', // 待搜索的原材料类别
      options: [
        {
          value: '1',
          label: '一般',
          multiplication: 1
        },
        {
          value: '1.25',
          label: '紧急1.25',
          multiplication: 1.25
        },
        {
          value: '1.5',
          label: '特急1.5',
          multiplication: 1.5
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [
          {
            text: '3天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          },
          {
            text: '半个月',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 15)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      value1: '',
      value2: '',
      total: 100,
      pageSize: 10,
      page: 1,
      Remarks: '',
      select: '',
      FormData: [],
      SurfaceResults: [],
      materials: [],
      showTag: true,
      List_of_processes: [],
      tableData: [
        { id: 1, name: '商品1', description: '这是商品1的描述', price: '待入站' },
        { id: 2, name: '商品2', description: '这是商品2的描述', price: '待入站' },
        { id: 3, name: '商品3', description: '这是商品3的描述', price: '待入站' },
        { id: 4, name: '商品4', description: '这是商品4的描述', price: '待入站' },
        { id: 5, name: '商品5', description: '这是商品5的描述', price: '待入站' }
      ]
    }
  },
  mounted() {
    this.getCustomerList()
    this.loadSurface()
    this.loadProcess()
  },
  methods: {
    changePage() {},
    getCustomerList() {
      Customer.getlist().then((res) => {
        this.CustomerOptions = res.data
      })
    },
    change() {
      const customer = this.CustomerOptions.find((item) => item.CustomerId === this.Customer) // 根据客户 ID 获取客户的详细信息
      this.Address = customer ? customer.Address : '' // 将客户的收货地址赋值给 Address 变量
    },
    addMaterial() {
      this.FormData.push({})
    },
    async searchParentComponentNo(query) {
      this.loading = true
      try {
        const { data } = await materials.getMaterialsSearch({ code: query, category: this.category, status: '启用' })
        this.parentComponentNoOptions = data.map((item) => ({
          value: item.code,
          label: item.code,
          names: item.name
        }))
        // console.log(this.parentComponentNoOptions)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    changeParentComponentNo(row) {
      const selectedItem = this.parentComponentNoOptions.find((item) => item.value === row.materialCode)
      if (selectedItem) {
        row.materialName = selectedItem.names
      }
    },
    async querySearch(queryString, cb) {
      try {
        // eslint-disable-next-line object-curly-spacing
        // const response = await this.$http.get('/api/materials/search', { params: { name: queryString } })
        const { data } = await materials.getMaterialsSearch({ name: queryString, category: this.Type_of_material, status: '启用' })
        this.materials = data
      } catch (err) {
        console.error(err)
      }
    },
    loadSurface() {
      surfaceTreatment.getlist().then((res) => {
        this.SurfaceResults = res.data
      })
    },
    async loadProcess() {
      const res = await processStep.get({
        page: 1,
        limit: 1000
      })
      this.List_of_processes = res.data
      this.List_of_processes = this.List_of_processes.concat(this.SurfaceResults)
      console.log(this.List_of_processes)
    }
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  // 按钮宽度 等宽
  .el-button {
    width: 70%;
  }
  .el-button {
    margin-bottom: 3px;
  }
}
.button-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 500px;
  overflow-y: auto;
  width: 150px;
  border-radius: 5px;
  // padding: 2px;
  border: 1px solid #f1f1f1;
  margin-top: 35px;
  //鼠标移动到按钮上 背景颜色改变
  .el-button:hover {
    background-color: #f1f1f1;
  }

  //左对齐
  .el-button {
    text-align: left;
    margin: 1px 1px;
    padding-left: 5px;
    width: 100%;
  }
}
</style>
