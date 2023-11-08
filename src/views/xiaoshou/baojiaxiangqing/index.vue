<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '5px' }">
      <el-button style="float: right; margin-left: 5px" size="mini" type="link">保存并提交</el-button>
      <el-button style="float: right; margin-left: 5px" size="mini" type="link" @click="save">保存</el-button>
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
        <el-descriptions-item label="收货地址">{{ deliveryAddress }}</el-descriptions-item>
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
        <el-table-column width="350" label="加工工序">
          <template slot-scope="scope">
            <el-button v-if="scope.row.processingSteps.length" size="mini" type="text" @click="Editing_process(scope.row, scope.$index)">
              <span v-for="item in scope.row.processingSteps" :key="item.name" style="font-size: 1em">
                {{ item.name }}({{ item.estimatedHours }})→
              </span>
            </el-button>
            <el-button v-else size="mini" type="text" @click="Editing_process(scope.row, scope.$index)">编辑</el-button>
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
          <template slot-scope="scope">
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <img width="40" :src="scope.image3D" alt="未上传" />
          </template>
        </el-table-column>
        <el-table-column width="100" label="图片2D">
          <template slot-scope="scope">
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <img width="40" :src="scope.image2D" alt="未上传" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button :loading="scope.row.isloding" icon="el-icon-upload2" size="mini" @click="toDo(scope.row)" />
            <el-button icon="el-icon-delete" size="mini" @click="toDo(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑工序  -->
    <el-dialog :visible="processdialogVisible" title="编辑加工工序" width="50%">
      <div>
        <el-button size="mini" type="">上移</el-button>
        <el-button size="mini" type="">下移</el-button>
        工序模板
        <el-select v-model="Process_template" style="width: 250px" clearable size="mini" placeholder="请选择" />
        <el-input v-model="template" size="mini" style="width: 250px" placeholder="输入模板名称" />
        <el-button size="mini" type="">添加到模板</el-button>
      </div>
      <!-- 上移 下移 保存为模板 模板中选择 -->
      <div class="container">
        <el-table size="mini" :data="processingSteps" style="width: 60%" height="535px">
          <el-table-column type="index" label="#" />
          <el-table-column type="selection" />
          <el-table-column prop="name" label="工序">
            <template slot-scope="scope">
              <el-select v-model="scope.row.name" size="mini" placeholder="请选择">
                <el-option
                  v-for="processes in List_of_processes"
                  :key="processes._id"
                  style="width: 200px"
                  size="mini"
                  :label="processes.name"
                  :value="processes.name"
                />
                <el-option label="----------------" value="----------------" />
                <el-option v-for="Surface in SurfaceResults" :key="Surface._id" size="mini" :label="Surface.name" :value="Surface.name" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="estimatedHours" label="预计工时">
            <template slot-scope="scope">
              <!--  eslint-disable-next-line vue/html-self-closing -->
              <el-input-number v-model="scope.row.estimatedHours" size="mini" controls-position="right" :min="0.01" :max="100" :step="0.05" />
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-select v-model="scope.row.state" size="mini" placeholder="请选择">
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
              <el-button size="mini" icon="el-icon-delete" type="text" @click="removeProcessList(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="button-list">
          <el-button v-for="processes in List_of_processes" :key="processes._id" size="mini" type="text" @click="AddprocessesList(processes.name)">
            + {{ processes.name }}
          </el-button>
          <el-button style="color: #b828c5" size="mini" type="text">----------------------</el-button>
          <el-button
            v-for="Surface in SurfaceResults"
            :key="Surface._id"
            style="color: #6f7494"
            size="mini"
            type="text"
            @click="AddprocessesList(Surface.name)"
          >
            + {{ Surface.name }}
          </el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="processdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determineProcess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as Customer from '@/api/Customer'
import * as materials from '@/api/materials'
import * as surfaceTreatment from '@/api/surfaceTreatment'
import * as processStep from '@/api/processStep'
import * as salesQuote from '@/api/salesQuote'
export default {
  data() {
    return {
      loading: false, // 加载状态
      parentComponentNoOptions: [], // 父组件编号选项
      note: '', // 备注
      Customer: '', // 客户
      CustomerOptions: [], // 客户选项
      deliveryAddress: '', // 地址
      orderNumber: '20231030001', // 订单号
      category: '零件', // 待搜索的零件类别
      Type_of_material: '原材料', // 待搜索的原材料类别
      options: [
        // 选项
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
        // 日期选择器选项
        disabledDate(time) {
          // 禁用的日期
          return time.getTime() < Date.now() // 返回时间小于现在的时间
        },
        shortcuts: [
          // 快捷方式
          {
            text: '3天', // 文本
            onClick(picker) {
              // 点击事件
              const date = new Date() // 创建新的日期对象
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 3) // 设置时间为3天后
              picker.$emit('pick', date) // 发出选择事件
            }
          },
          {
            text: '一周', // 文本
            onClick(picker) {
              // 点击事件
              const date = new Date() // 创建新的日期对象
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7) // 设置时间为一周后
              picker.$emit('pick', date) // 发出选择事件
            }
          },
          {
            text: '半个月', // 文本
            onClick(picker) {
              // 点击事件
              const date = new Date() // 创建新的日期对象
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 15) // 设置时间为半个月后
              picker.$emit('pick', date) // 发出选择事件
            }
          }
        ]
      },
      total: 100, // 总数
      pageSize: 10, // 页面大小
      page: 1, // 当前页
      Remarks: '', // 备注
      select: '', // 选择
      FormData: [], // 表单数据
      SurfaceResults: [], // 表面结果
      materials: [], // 材料
      showTag: true, // 显示标签
      List_of_processes: [], // 过程列表
      processingSteps: [], // 表格数据
      template: '', // 模板
      processdialogVisible: false, // 过程对话框可见性
      Process_template: '', // 过程模板
      editindex: 0 // 编辑索引
    }
  },
  mounted() {
    this.getCustomerList()
    this.loadSurface()
    this.loadProcess()
  },
  methods: {
    // 更改页面的方法
    async changePage() {},
    // 获取客户列表的方法
    async getCustomerList() {
      // 使用await等待获取客户列表的结果
      this.CustomerOptions = await this.fetchCustomerList()
    },
    // 更改的方法
    change() {
      // 找到匹配的客户
      const customer = this.CustomerOptions.find((item) => item.CustomerId === this.Customer)
      // 如果找到了匹配的客户，就设置地址，否则设置为空
      this.deliveryAddress = customer ? customer.Address : ''
    },
    // 添加材料的方法
    addMaterial() {
      // 在FormData中添加一个新的对象，对象中包含一个空的tableData数组
      this.FormData.push({
        processingSteps: []
      })
    },
    // 搜索父组件编号的方法
    async searchParentComponentNo(query) {
      // 设置加载状态为true
      this.loading = true
      try {
        // 使用await等待获取材料搜索的结果
        const data = await this.fetchMaterialsSearch(query)
        // 将结果映射为一个新的数组，数组中的每个元素都是一个对象，包含value、label和names属性
        this.parentComponentNoOptions = data.map((item) => ({
          value: item.code,
          label: item.code,
          names: item.name
        }))
      } catch (error) {
        // 如果出现错误，就在控制台中打印错误
        console.error(error)
      } finally {
        // 最后，无论是否出现错误，都将加载状态设置为false
        this.loading = false
      }
    },
    // 更改父组件编号的方法
    changeParentComponentNo(row) {
      // 找到匹配的项
      const selectedItem = this.parentComponentNoOptions.find((item) => item.value === row.materialCode)
      // 如果找到了匹配的项，就设置材料名称
      if (selectedItem) {
        row.materialName = selectedItem.names
      }
    },
    // 查询搜索的方法
    async querySearch(queryString) {
      try {
        // 使用await等待获取材料搜索的结果
        this.materials = await this.Type_of_materialSearch(queryString)
      } catch (err) {
        // 如果出现错误，就在控制台中打印错误
        console.error(err)
      }
    },
    // 加载表面的方法
    async loadSurface() {
      // 使用await等待获取表面列表的结果
      this.SurfaceResults = await this.fetchSurfaceList()
    },
    // 加载过程的方法
    async loadProcess() {
      // 使用await等待获取过程步骤的结果
      const res = await this.fetchProcessStep()
      // 设置过程列表
      this.List_of_processes = res
    },
    // 添加过程列表的方法
    AddprocessesList(name) {
      // 在processingSteps中添加一个新的对象，对象中包含name、description和price属性
      this.processingSteps.push({
        name: name,
        estimatedHours: 0.1,
        state: '待入站'
      })
    },
    // 删除过程列表的方法
    removeProcessList(index) {
      // 在processingSteps中删除指定索引的元素
      this.processingSteps.splice(index, 1)
    },
    // 编辑过程的方法
    Editing_process(row, index) {
      // 显示过程对话框
      this.processdialogVisible = true
      // 设置processingSteps
      this.processingSteps = row.processingSteps
      // 设置编辑索引
      this.editindex = index
    },
    // 确定过程的方法
    determineProcess() {
      // 隐藏过程对话框
      this.processdialogVisible = false
      // 更新FormData中的processingSteps
      this.FormData[this.editindex].processingSteps = this.processingSteps
    },
    // 保存的方法
    async save() {
      // 使用await等待添加销售报价的结果
      await this.addSalesQuote()
    },
    // 新的获取客户列表的方法
    async fetchCustomerList() {
      // 使用await等待获取客户列表的结果
      const res = await Customer.getlist()
      return res.data
    },
    // 新的零件搜索的方法
    async fetchMaterialsSearch(query) {
      // 使用await等待获取材料搜索的结果
      const res = await materials.getMaterialsSearch({ code: query, category: this.category, status: '启用' })
      return res.data
    },
    // 新的原材料搜索的方法
    async Type_of_materialSearch(query) {
      // 使用await等待获取材料搜索的结果
      const res = await materials.getMaterialsSearch({ name: query, category: this.Type_of_material, status: '启用' })
      return res.data
    },
    // 新的获取表面列表的方法
    async fetchSurfaceList() {
      // 使用await等待获取表面列表的结果
      const res = await surfaceTreatment.getlist()
      return res.data
    },
    // 新的获取过程步骤的方法
    async fetchProcessStep() {
      // 使用await等待获取过程步骤的结果
      const res = await processStep.get({
        page: 1,
        limit: 1000
      })
      return res.data
    },
    // 新的添加销售报价的方法
    async addSalesQuote() {
      // 使用await等待添加销售报价的结果
      console.log(this.FormData)
      await salesQuote.addSalesQuote({
        orderNumber: new Date().getTime(),
        customer: this.Customer,
        orderDate: new Date(),
        note: this.note,
        status: '待报价',
        deliveryAddress: this.deliveryAddress,
        materialInfo: this.FormData
      })
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
  overflow-x: hidden; // 隐藏X方向的滚动条
  width: 150px;
  border-radius: 5px;
  // padding: 2px;
  border: 1px solid #f1f1f1;
  margin-top: 35px;
  //鼠标移动到按钮上 背景颜色改变
  .el-button:hover {
    background-color: #f5f7fa;
  }

  //左对齐
  .el-button {
    text-align: left;
    margin: 1px 1px;
    padding-left: 15px;
    width: 100%;
  }
}
</style>
