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
        <el-table-column min-width="200" label="收货地址" prop="Address" />
        <el-table-column label="税率%" align="right">
          <template slot-scope="{ row }">{{ row.Tax }}%</template>
        </el-table-column>
        <el-table-column label="货币" prop="CurrencyCode" />
        <el-table-column label="收货人信息">
          <template slot-scope="{ row }">
            {{ row.Contact }}
            <el-link :underline="false">{{ row.Tel }}</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑">
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
            |
            <el-button type="text" size="mini" @click="editCustomer(row)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteCustomer(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="30%">
      <el-form ref="form" label-width="80px" :model="form" :rules="rules" size="mini">
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
        <el-form-item label="税率" prop="Tax">
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
      dialogTitle: '新增客户', // 弹窗的标题
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
        Tax: '13',
        CurrencyCode: 'RMB'
      },
      rules: {
        // 表单验证规则
        CustomerId: [{ required: true, message: '请输入客户编号', trigger: 'blur' }],
        ShortName: [{ required: true, message: '请输入客户简称', trigger: 'blur' }],
        FullName: [{ required: true, message: '请输入客户全称', trigger: 'blur' }],
        Address: [{ required: true, message: '请输入客户地址', trigger: 'blur' }],
        Contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        Tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        // Email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
        Tax: [{ required: true, message: '请输入税率', trigger: 'blur' }],
        CurrencyCode: [{ required: true, message: '请输入货币代码', trigger: 'blur' }]
      }
    }
  },
  // 初始函数 页面切换到这时
  mounted() {
    this.getCustomerList() // 获取客户列表
  },

  methods: {
    // 获取客户列表
    getCustomerList() {
      Customer.getlist().then((res) => {
        this.List = res.data
      })
    },
    openDialog() {
      this.dialogVisible = true // 打开弹窗
    },
    submitForm() {
      // eslint-disable-next-line space-before-function-paren
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.form._id) {
            // 如果客户的 ID 存在，则说明用户是在修改客户信息
            await Customer.update(this.form._id, this.form)
            this.$message.success('客户信息修改成功')
          } else {
            // 如果客户的 ID 不存在，则说明用户是在新增客户
            await Customer.add(this.form)
            this.$message.success('客户创建成功')
          }
          this.getCustomerList()
          this.dialogVisible = false // 关闭弹窗
          this.form = ''
        } else {
          return false
        }
      })
    },
    editCustomer(row) {
      if (row._id) {
        // 如果客户的 ID 存在，则将客户的信息填充到表单中，并将弹窗的标题设置为“编辑客户”
        this.form = row
        this.dialogTitle = '编辑客户'
      } else {
        // 如果客户的 ID 不存在，则将弹窗的标题设置为“新增客户”
        this.form = {}
        this.dialogTitle = '新增客户'
      }
      this.dialogVisible = true // 打开弹窗
    },
    async deleteCustomer(row) {
      this.$confirm('确定要删除该客户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          await Customer.deletes(row._id)
          this.$message.success('客户删除成功')
          this.getCustomerList()
        })
        .catch(() => {})
    }
  }
}
</script>
