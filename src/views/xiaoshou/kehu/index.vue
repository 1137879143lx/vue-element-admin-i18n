<template>
  <div>
    <el-card :body-style="{ padding: '5px' }">
      <div slot="header" class="clearfix">
        <span>客户</span>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-search" circle @click="drawer = true" />
        <el-button style="margin-left: 5px" size="mini" icon="el-icon-refresh" circle />
        <span style="float: right; padding: 3px 20px">
          <el-button size="mini" type="text" @click="openDialog">新增客户</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">导出数据</el-button>
          <el-button type="text">已删除数据</el-button>
        </span>
      </div>

      <el-table border :data="List" size="mini">
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column label="客户编号">
          <template slot-scope="{ row }">
            <i class="el-icon-office-building" />
            <el-button type="text" size="mini">{{ row.CustomerId }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="简称" prop="ShortName" />
        <el-table-column label="全称" prop="FullName" />
        <el-table-column label="收货地址" prop="Address" />
        <el-table-column label="税率%" align="right">
          <template slot-scope="{ row }">{{ row.Tax }}%</template>
        </el-table-column>
        <el-table-column property="Currency" label="货币" prop="Tel" />
        <el-table-column property="Contact_Person" label="客户代表">
          <template slot-scope="{ row }">
            {{ row.Contact }}
            <el-link :underline="false">{{ row.Tel }}</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑">
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
            <el-button type="text" size="mini">编辑</el-button>
            |
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" title="新增客户" width="50%">
      <el-form ref="form" :model="form" :rules="rules" size="mini">
        <el-form-item label="客户编号" prop="CustomerId">
          <el-input v-model="form.CustomerId" placeholder="请输入客户编号" />
        </el-form-item>
        <el-form-item label="客户简称" prop="ShortName">
          <el-input v-model="form.ShortName" placeholder="请输入客户简称" />
        </el-form-item>
        <el-form-item label="客户全称" prop="FullName">
          <el-input v-model="form.FullName" placeholder="请输入客户全称" />
        </el-form-item>
        <el-form-item label="客户地址" prop="Address">
          <el-input v-model="form.Address" placeholder="请输入客户地址" />
        </el-form-item>
        <el-form-item label="联系人" prop="Contact">
          <el-input v-model="form.Contact" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="Tel">
          <el-input v-model="form.Tel" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="Email">
          <el-input v-model="form.Email" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="手机号码" prop="Phone">
          <el-input v-model="form.Phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="税号" prop="Tax">
          <el-input v-model="form.Tax" placeholder="请输入税号" />
        </el-form-item>
        <el-form-item label="货币代码" prop="CurrencyCode">
          <el-input v-model="form.CurrencyCode" placeholder="请输入货币代码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入客户api
import * as Customer from '@/api/Customer'
export default {
  data() {
    return {
      List: [],
      dialogVisible: false, // 控制弹窗的显示和隐藏
      form: {
        // 表单数据
        CustomerId: '',
        ShortName: '',
        FullName: '',
        Address: '',
        Contact: '',
        Tel: '',
        Email: '',
        Phone: '',
        Tax: '',
        CurrencyCode: ''
      },
      rules: {
        // 表单验证规则
        CustomerId: [{ required: true, message: '请输入客户编号', trigger: 'blur' }],
        ShortName: [{ required: true, message: '请输入客户简称', trigger: 'blur' }],
        FullName: [{ required: true, message: '请输入客户全称', trigger: 'blur' }],
        Address: [{ required: true, message: '请输入客户地址', trigger: 'blur' }],
        Contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        Tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        Email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
        Phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        Tax: [{ required: true, message: '请输入税号', trigger: 'blur' }],
        CurrencyCode: [{ required: true, message: '请输入货币代码', trigger: 'blur' }]
      }
    }
  },
  // 初始函数 页面切换到这时
  mounted() {
    // 获取客户列表
    this.getCustomerList()
  },

  methods: {
    // 获取客户列表
    getCustomerList() {
      Customer.getlist().then((res) => {
        console.log(res)
        this.List = res.data
      })
    },
    openDialog() {
      this.dialogVisible = true // 打开弹窗
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 在这里提交表单数据到后端进行处理
          console.log(this.form)
          Customer.add(this.form)
          this.dialogVisible = false // 关闭弹窗
        } else {
          return false
        }
      })
    }
  }
}
</script>
