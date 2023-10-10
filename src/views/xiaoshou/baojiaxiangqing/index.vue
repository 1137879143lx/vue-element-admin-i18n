<template>
  <div>
    <el-card shadow="never">
      <el-button style="float: right; margin-left: 5px" size="mini" type="link ">保存并提交</el-button>
      <el-button style="float: right; margin-left: 5px" size="mini" type="link ">保存</el-button>
      <el-descriptions title="报价详情">
        <el-descriptions-item label="订单号">202310101755</el-descriptions-item>
        <el-descriptions-item label="客户">天庭</el-descriptions-item>
        <el-descriptions-item label="交货日期">2023-10-15</el-descriptions-item>
        <el-descriptions-item label="收货">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>物料信息</span>
        <el-button style="float: right" size="mini" type="link">删除</el-button>

        <el-button style="float: right" size="mini" type="link">导入</el-button>
      </div>
      <el-table size="mini" :data="data" :scroll="{ x: 1200 }" :loading="loading" bordered height="300" row-key="id">
        <el-table-column type="index" width="60" align="center" />
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column label="物料编码">
          <template slot-scope="scope">
            <span>{{ scope.row.ParentComponentNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物料名称">
          <template slot-scope="scope">
            <span>{{ scope.row.PartName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="版本">
          <template slot-scope="scope">
            <span>{{ scope.row.Version }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <span>{{ scope.row.Description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.Remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column label="推荐供应商">
          <template slot-scope="scope">
            <span>{{ scope.row.Recommended_suppliers }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预估单价">
          <template slot-scope="scope">
            <span>{{ scope.row.Estimated_unit_price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
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
          ParentComponentNo: '02-62-55-66-00',
          PartName: '生锈的手术刀',
          Version: '02',
          Description: '--',
          quantity: 2,
          Remarks: '单独包装',
          unit: 'PCS',
          Recommended_suppliers: '北京武器专业供应',
          Estimated_unit_price: 8858
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
          Estimated_unit_price: 8858
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
          Estimated_unit_price: 8858
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
          Estimated_unit_price: 8858
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
          Estimated_unit_price: 8858
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
          Estimated_unit_price: 8858
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
          Estimated_unit_price: 8858
        }
      ]
    }
  },
  methods: {
    changePage() {}
  }
}
</script>
