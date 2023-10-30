<template>
  <div class="card-container">
    <el-card size="mini" shadow="hover">
      <el-form :inline="true" class="search-form" size="mini">
        <el-form-item label="单位名称">
          <el-input v-model="UnitsearchName" placeholder="请输入单位名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Unitsearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Unitadd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="UnittableData" style="width: 100%" size="mini" height="530">
        <el-table-column label="#" type="index" />

        <el-table-column prop="name" label="单位" />
        <el-table-column prop="createdBy" label="创建人" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="Unitremove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="UnittotalPages > 1"
        :current-page="UnitcurrentPage"
        :page-size="UnitpageSize"
        :total="UnittotalPages"
        small
        @current-change="UnithandlePageChange"
      />
    </el-card>

    <!-- 物料类型 -->
    <el-card size="mini" shadow="hover">
      <el-form :inline="true" class="search-form" size="mini">
        <el-form-item label="物料类型">
          <el-input v-model="MaterialType_searchName" placeholder="请输入物料类型" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="MaterialType_search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="MaterialType_add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="MaterialType_tableData" style="width: 100%" size="mini" height="530">
        <el-table-column label="#" type="index" />

        <el-table-column prop="name" label="物料类型" />
        <el-table-column prop="createdBy" label="创建人" />
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
          <el-input v-model="MaterialType_searchName" placeholder="请输入表面处理" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="MaterialType_search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="MaterialType_add">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="MaterialType_tableData" style="width: 100%" size="mini" height="530">
        <el-table-column label="#" type="index" />

        <el-table-column prop="name" label="表面处理" />
        <el-table-column prop="createdBy" label="单价 元/mm²" />
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
  </div>
</template>

<script>
import { getlist, addUnit, deleteUnit } from '@/api/units'
import * as materialCategory from '@/api/materialCategory'
// MaterialType 物料类型
export default {
  name: 'Danweishezhi',
  data() {
    return {
      UnittableData: [],
      UnitsearchName: '',
      UnitcurrentPage: 1,
      UnitpageSize: 10,
      Unittotal: 0,
      UnittotalPages: 0,
      UnitdialogVisible: false,
      // //////////////////////////
      MaterialType_tableData: [],
      MaterialType_searchName: '',
      MaterialType_currentPage: 1,
      MaterialType_pageSize: 10,
      MaterialType_total: 0,
      MaterialType_totalPages: 0
    }
  },

  methods: {
    async Unitsearch() {
      const { data, count } = await getlist({
        page: this.UnitcurrentPage,
        limit: this.UnitpageSize,
        name: this.UnitsearchName
      })

      this.UnittableData = data
      this.UnittotalPages = count
    },
    async Unitadd() {
      await addUnit({
        name: this.UnitsearchName
      })
      this.UnitsearchName = ''
      this.Unitsearch()
    },

    async Unitremove(row) {
      const confirmed = await this.$confirm(`确认删除 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)
      if (confirmed) {
        await deleteUnit(row._id)
        this.Unitsearch()
      }
    },

    UnithandlePageChange(page) {
      this.UnitcurrentPage = page
      this.Unitsearch()
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
      await materialCategory.add({
        name: this.MaterialType_searchName
      })
      this.MaterialType_searchName = ''
      this.MaterialType_search()
    },
    async MaterialType_edit(row) {
      // ...
      await materialCategory.update(row._id, {
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
    }
  },

  // eslint-disable-next-line vue/order-in-components
  async mounted() {
    this.Unitsearch()
    this.MaterialType_search()
  }
}

/**
 *编码规则
  02-62-01-0001-00
  02-62-01-0001-01
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
