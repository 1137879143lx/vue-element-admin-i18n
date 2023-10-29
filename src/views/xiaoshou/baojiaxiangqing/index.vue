<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '5px' }">
      <el-button style="float: right; margin-left: 5px" size="mini" type="link">保存并提交</el-button>
      <el-button style="float: right; margin-left: 5px" size="mini" type="link">保存</el-button>
      <el-descriptions title="报价详情">
        <el-descriptions-item label="订单号">202310101755</el-descriptions-item>
        <el-descriptions-item label="客户">
          <el-select v-model="Customer" placeholder="请选择" size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="收货地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag size="small">待报价</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-input v-model="note" size="mini" style="width: 200px" />
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
      </div>

      <el-table size="mini" :data="data" :scroll="{ x: 1200 }" :loading="loading" bordered height="500" row-key="id">
        <el-table-column fixed type="index" width="60" align="center" />
        <el-table-column fixed type="selection" width="60" align="center" />
        <el-table-column fixed min-width="120" label="物料编码">
          <template slot-scope="scope">
            <span>{{ scope.row.ParentComponentNo }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed min-width="120" label="物料名称">
          <template slot-scope="scope">
            <span>
              {{ scope.row.PartName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="版本">
          <template slot-scope="scope">
            <span>{{ scope.row.Version }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="220" label="材料">
          <template slot-scope="scope">
            <el-input v-model="scope.row.Description" size="mini" clearable />
          </template>
        </el-table-column>
        <el-table-column min-width="180" label="表面处理">
          <template slot-scope="scope">
            <el-input v-model="scope.row.Description" size="mini" clearable />
          </template>
        </el-table-column>
        <el-table-column min-width="180" label="下料尺寸">
          <template slot-scope="scope">
            <el-input v-model="scope.row.Description" size="mini" clearable />
          </template>
        </el-table-column>
        <el-table-column min-width="100" label="下料数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.Description" size="mini" />
          </template>
        </el-table-column>
        <el-table-column width="260" label="加工工序">
          <template slot-scope="">
            <el-button size="mini" type="text">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column width="120" label="编程工艺费(￥)">
          <template slot-scope="scope">
            <el-input v-model="scope.row.Description" size="mini" />
          </template>
        </el-table-column>
        <el-table-column width="120" label="紧急程度">
          <template slot-scope="scope">
            <el-select v-model="scope.row.Degree_of_urgency" size="mini" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="120" label="额外刀具费(￥)">
          <template slot-scope="scope">
            <el-input v-model="scope.row.Description" size="mini" />
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="材料费(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="表面积mm²">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="体积mm³">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="毛坯重量(Kg)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="净重量(Kg)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150" label="表面处理费(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120" label="加工工时h">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="包装检验费5%(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="快递费(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="管理费5%(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="利润10%(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="单价含税13%(￥)">
          <template slot-scope="scope">
            <el-tag size="mini" effect="dark" type="success">{{ scope.row.Estimated_unit_price }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="120" label="总价含税13%(￥)">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column width="250" label="回复交期">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.Return_delivery_time"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      Return_delivery_time: '',
      note: '',
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
      loading: false,
      pageSize: 10,
      page: 1,
      Remarks: '',
      select: '',
      data: [
        {
          id: 0,
          ParentComponentNo: '02-62-0097-66-00',
          PartName: '生锈的手术刀',
          Version: '02',
          Description: '--',
          quantity: 2,
          Remarks: '单独包装',
          unit: 'PCS',
          Recommended_suppliers: '北京武器专业供应',
          Estimated_unit_price: 8858,
          Return_delivery_time: '2023-10-15',
          Degree_of_urgency: '一般',
          isloding: false
        },
        {
          id: 1,
          ParentComponentNo: '02-62-55-66-00',
          PartName: '天天快乐水',
          Version: '03',
          Description: '--',
          quantity: 15,
          Remarks: '单独包装',
          unit: 'PCS',
          Recommended_suppliers: '北京武器专业供应',
          Estimated_unit_price: 8858,
          Return_delivery_time: '2023-10-15',
          Degree_of_urgency: '一般',
          isloding: false
        },
        {
          id: 2,
          ParentComponentNo: '02-62-55-66-00',
          PartName: '天天快乐水',
          Version: '03',
          Description: '--',
          quantity: 15,
          Remarks: '单独包装',
          unit: 'PCS',
          Recommended_suppliers: '北京武器专业供应',
          Estimated_unit_price: 8858,
          Return_delivery_time: '2023-10-15',
          isloding: false,

          Degree_of_urgency: '一般'
        },
        {
          id: 3,
          ParentComponentNo: '02-62-55-66-00',
          PartName: '天天快乐水',
          Version: '03',
          Description: '--',
          quantity: 15,
          Remarks: '单独包装',
          unit: 'PCS',
          Recommended_suppliers: '北京武器专业供应',
          Estimated_unit_price: 8858,
          Return_delivery_time: '2023-10-15',

          Degree_of_urgency: '一般',
          isloding: false
        },
        {
          id: 4,
          ParentComponentNo: '02-62-55-66-00',
          PartName: '天天快乐水',
          Version: '03',
          Description: '--',
          quantity: 15,
          Remarks: '单独包装',
          unit: 'PCS',
          Recommended_suppliers: '北京武器专业供应',
          Estimated_unit_price: 8858,
          Return_delivery_time: '2023-10-15',

          Degree_of_urgency: '一般',
          isloding: false
        },
        {
          id: 5,
          ParentComponentNo: '02-62-55-66-00',
          PartName: '天天快乐水',
          Version: '03',
          Description: '--',
          quantity: 15,
          Remarks: '单独包装',
          unit: 'PCS',
          Recommended_suppliers: '北京武器专业供应',
          Estimated_unit_price: 8858,
          Return_delivery_time: '2023-10-15',

          Degree_of_urgency: '一般',
          isloding: false
        },
        {
          id: 6,
          ParentComponentNo: '02-62-55-66-00',
          PartName: '天天快乐水',
          Version: '03',
          Description: '--',
          quantity: 15,
          Remarks: '单独包装',
          unit: 'PCS',
          Recommended_suppliers: '北京武器专业供应',
          Estimated_unit_price: 8858,
          Return_delivery_time: '2023-10-15',

          Degree_of_urgency: '一般',
          isloding: false
        }
      ]
    }
  },
  mounted() {
    // ProductService.getProductsMini().then((data) => (this.products = data))
  },
  methods: {
    changePage() {}
  }
}
</script>
