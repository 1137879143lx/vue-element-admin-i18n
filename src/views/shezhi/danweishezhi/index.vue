<template>
  <div class="card-container">
    <el-card size="mini" shadow="hover">
      <el-form :inline="true" class="search-form" size="mini">
        <el-form-item label="单位名称">
          <el-input v-model="searchName" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" size="mini" height="530">
        <el-table-column label="序号" type="index" />

        <el-table-column prop="name" label="单位" />
        <el-table-column prop="createdBy" label="创建人" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalPages"
        small
        @current-change="handlePageChange"
      />
    </el-card>
    <!--  -->
    <el-card size="mini" shadow="hover">
      <el-form :inline="true" class="search-form" size="mini">
        <el-form-item label="物料类型">
          <el-input v-model="searchName" placeholder="请输入物料类型" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" size="mini" height="530">
        <el-table-column label="序号" type="index" />

        <el-table-column prop="materialType" label="物料类型" />
        <el-table-column prop="createdBy" label="创建人" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalPages"
        small
        @current-change="handlePageChange"
      />
    </el-card>
    <!-- 标签设置 -->
    <el-card size="mini" shadow="hover">
      <el-form :inline="true" class="search-form" size="mini">
        <el-form-item label="标签名称">
          <el-input v-model="searchName" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" size="mini" height="530">
        <el-table-column label="序号" type="index" />

        <el-table-column prop="label" label="标签" />
        <el-table-column prop="createdBy" label="创建人" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalPages"
        small
        @current-change="handlePageChange"
      />
    </el-card>

    <el-dialog :visible.sync="dialogVisible" title="单位设置" width="30%">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getlist, addUnit, updateUnit, deleteUnit } from '@/api/units'

export default {
  name: 'Danweishezhi',
  data() {
    return {
      tableData: [],
      searchName: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
      dialogVisible: false,
      form: {
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入单位名称', trigger: 'blur' }]
      }
    }
  },

  methods: {
    async search() {
      console.log(`currentPage: ${this.currentPage}, pageSize: ${this.pageSize}, searchName: ${this.searchName}`)
      const { data, count } = await getlist({
        page: this.currentPage,
        limit: this.pageSize,
        name: this.searchName
      })

      this.tableData = data
      this.totalPages = count
    },
    add() {
      this.form = { name: '' }
      this.dialogVisible = true
    },

    async edit(row) {
      this.form = { ...row }
      this.dialogVisible = true
    },

    async remove(row) {
      const confirmed = await this.$confirm(`确认删除 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)
      if (confirmed) {
        await deleteUnit(row._id)
        this.search()
      }
    },

    async submitForm() {
      const valid = await this.$refs.form.validate().catch(() => false)

      if (valid) {
        if (this.form._id) {
          await updateUnit(this.form._id, this.form)
        } else {
          await addUnit(this.form)
        }

        this.dialogVisible = false
        this.search()
      }
    },

    handlePageChange(page) {
      this.currentPage = page
      this.search()
    },
    getPaginationParams() {
      const page = this.currentPage
      const limit = this.pageSize
      const skip = (page - 1) * limit
      return { page, limit, skip }
    }
  },

  // eslint-disable-next-line vue/order-in-components
  async mounted() {
    this.search()
  }
}
</script>

<style>
.card-container {
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
}
.card-container > * {
  margin: 10px 10px;
}
</style>
