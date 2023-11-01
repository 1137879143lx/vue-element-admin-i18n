<template>
  <div class="card-container">
    <!-- 物料类型 -->
    <el-card size="mini" shadow="hover">
      <el-form :inline="true" class="search-form" size="mini">
        <el-form-item label="物料类型">
          <el-input v-model="MaterialType_Form.name" style="width: 100px" placeholder="物料类型" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="MaterialType_Form.unit" style="width: 100px" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="编码规则">
          <el-input v-model="MaterialType_Form.codeRule" style="width: 100px" placeholder="编码规则" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="MaterialType_add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="MaterialType_tableData" style="width: 100%" size="mini" height="700">
        <el-table-column label="#" type="index" />
        <el-table-column prop="name" label="物料类型" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column prop="codeRule" label="编码规则" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="MaterialType_remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="MaterialType_totalPages > 1"
        :current-page="MaterialType_currentPage"
        :page-size="MaterialType_pageSize"
        :total="MaterialType_totalPages"
        small
        @current-change="MaterialType_handlePageChange"
      />
    </el-card>

    <!-- 表面处理 -->
    <el-card size="mini" shadow="hover">
      <el-form :inline="true" class="search-form" size="mini">
        <el-form-item label="表面处理">
          <el-input v-model="Surface_Form.name" style="width: 200px" placeholder="请输入表面处理方式" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="Surface_Form.price" style="width: 150px" placeholder="单价 mm²/元" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Surface_Form_add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="SurfaceData" style="width: 100%" size="mini" height="700">
        <el-table-column label="#" type="index" />
        <el-table-column prop="name" label="表面处理" />
        <el-table-column prop="price" label="单价 mm²/元" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="Surface_Form_remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="SurfaceTotal > 1"
        :current-page="Surface_Form.page"
        :page-size="Surface_Form.limit"
        :total="SurfaceTotal"
        small
        @current-change="SurfaceTotal_handlePageChange"
      />
    </el-card>
  </div>
</template>

<script>
import * as materialCategory from '@/api/materialCategory'
import * as surfaceTreatment from '@/api/surfaceTreatment'

// MaterialType 物料类型
export default {
  name: 'Danweishezhi',
  data() {
    return {
      // //////////////////////////
      MaterialType_tableData: [],
      MaterialType_Form: {
        name: '',
        unit: '',
        codeRule: ''
      },
      // 表面处理表单
      SurfaceData: [],
      SurfaceTotal: '',
      Surface_Form: {
        name: '',
        price: '',
        page: 1,
        limit: 15
      },

      MaterialType_searchName: '',
      MaterialType_currentPage: 1,
      MaterialType_pageSize: 15,
      MaterialType_total: 0,
      MaterialType_totalPages: 0
    }
  },

  methods: {
    // /////////////////////  单位 /////////////////////// /
    async Surface_Form_get() {
      const res = await surfaceTreatment.getlist(this.Surface_Form)
      this.SurfaceData = res.data
      this.SurfaceTotal = res.count
    },
    async Surface_Form_add() {
      // ...
      await surfaceTreatment.add(this.Surface_Form)
      this.Surface_Form.name = ''
      this.Surface_Form.price = ''
      this.Surface_Form_get()
    },
    // /////////////////////  物料类型 /////////////////////// /
    async MaterialType_search() {
      const res = await materialCategory.getlist({
        name: this.MaterialType_searchName,
        page: this.MaterialType_currentPage,
        limit: this.MaterialType_pageSize
      })
      this.MaterialType_tableData = res.data
      this.MaterialType_totalPages = res.count
    },
    async MaterialType_add() {
      // ...
      await materialCategory.add(this.MaterialType_Form)
      this.MaterialType_Form.name = ''
      this.MaterialType_Form.unit = ''
      this.MaterialType_Form.codeRule = ''
      this.MaterialType_search()
    },

    async MaterialType_edit(row) {
      // ...
      await materialCategory.put(row._id, {
        name: this.MaterialType_searchName
      })
    },
    async MaterialType_remove(row) {
      // ...
      const confirmed = await this.$confirm(`确认删除 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)
      if (confirmed) {
        await materialCategory.deletes(row._id)
        this.MaterialType_search()
      }
    },
    MaterialType_handlePageChange(page) {
      this.MaterialType_currentPage = page
      console.log(this.MaterialType_currentPage)
      this.MaterialType_search()
    },
    SurfaceTotal_handlePageChange(page) {
      this.Surface_Form.page = page
      this.Surface_Form_get()
    },
    async Surface_Form_remove(row) {
      const confirmed = await this.$confirm(`确认删除 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)
      if (confirmed) {
        await surfaceTreatment.deletes(row._id)
        this.Surface_Form_get()
      }
    }
  },

  // eslint-disable-next-line vue/order-in-components
  async mounted() {
    this.Surface_Form_get()
    this.MaterialType_search()
  }
}

/**
 *编码规则
  01-62-01-0001-00
  01-62-01-0001-01
  公司序列号-类型-部门-流水号-版本号
  类型
  62=零件
  63=产品
  64=原材料
  65=量具
  66=刀具
  67=设备
  68=工装
  69=模具
  70=耗材
  71=电极
  72=夹具
  73=标准件
  74=辅料
  75=半成品
 *
 */
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
