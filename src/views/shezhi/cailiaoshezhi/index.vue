<template>
  <div class="cailiaoshezhi">
    <el-card shadow="always" :body-style="{ padding: '5px' }">
      <div slot="header">
        <span>
          物料设置
          <span v-if="selectedItems.length > 0" style="color: rgb(14, 91, 235); font-size: 0.5em">已选择 {{ selectedItems.length }} 项</span>
        </span>

        <el-button size="mini" style="float: right; margin: 0" type="link">已删除物料</el-button>
        <el-button size="mini" style="float: right; margin: 0" type="link">导入</el-button>
        <el-button size="mini" style="float: right; margin: 0" type="link">下载导入模板</el-button>
        <el-button size="mini" style="float: right; margin: 0" type="link" @click="dialogVisible = true">新增</el-button>
      </div>
      <!-- card body -->
      <el-table :data="tableData" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="index" />
        <el-table-column type="selection" />

        <el-table-column prop="code" label="物料编码" min-width="120" />
        <el-table-column prop="name" label="物料名称" min-width="120" />
        <el-table-column prop="description" label="描述" min-width="120" />
        <el-table-column prop="tags" label="标签" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column prop="density" label="密度Kg/m3" />
        <el-table-column prop="maxInventory" label="最大库存" />
        <el-table-column prop="inventory" label="安全库存" />
        <el-table-column prop="price" label="单价" />
        <el-table-column prop="category" label="物料类别" />

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === '启用'" type="success">启用</el-tag>
            <el-tag v-if="scope.row.status === '禁止'" type="danger">禁止</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="未上传" style="width: 40px; height: 40px">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="新增物料" :visible.sync="dialogVisible" width="60%">
      <el-descriptions direction="horizontal" border column="2">
        <el-descriptions-item span="1" label="*物料编码">
          <el-input v-model="materials_form.code" clearable placeholder="物料编码">
            <el-button slot="append" icon="el-icon-eleme" @click="New_additions()" />
          </el-input>
        </el-descriptions-item>
        <el-descriptions-item label="*物料名称">
          <el-input v-model="materials_form.name" clearable placeholder="物料名称" />
        </el-descriptions-item>
        <el-descriptions-item label="物料描述">
          <el-input v-model="materials_form.description" clearable placeholder="物料描述" />
        </el-descriptions-item>
        <el-descriptions-item label="标签" />

        <el-descriptions-item label="*单位">
          <el-select v-model="materials_form.unit" placeholder="请选择" clearable @visible-change="unit_search">
            <el-option v-for="(item, index) in unitlis" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="密度Kg/m3">
          <el-input v-model="materials_form.density" placeholder="如果是原材料，则必填" clearable />
        </el-descriptions-item>
        <el-descriptions-item label="最大库存">
          <el-input v-model="materials_form.maxInventory" placeholder="最大库存数量" clearable />
        </el-descriptions-item>
        <el-descriptions-item label="安全库存">
          <el-input v-model="materials_form.inventory" placeholder="安全库存数量" clearable />
        </el-descriptions-item>

        <el-descriptions-item label="单价(元)">
          <el-input v-model="materials_form.price" placeholder="如果是原材料，则必填" clearable />
        </el-descriptions-item>
        <el-descriptions-item label="*物料类别">
          <el-select v-model="materials_form.category" placeholder="请选择" clearable @visible-change="Material_Category_search">
            <el-option v-for="(item, index) in Class_of_material_list" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <template>
            <el-radio v-model="materials_form.status" label="启用">启用</el-radio>
            <el-radio v-model="materials_form.status" label="禁用">禁用</el-radio>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="图片">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-descriptions-item>
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="sass" scoped>
@import './index.scss'
</style>

<script>
import * as materialCategory from '@/api/materialCategory'
import * as units from '@/api/units'
import * as materials from '@/api/materials'
export default {
  name: 'Cailiaoshezhi',
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      unitlis: [],
      Class_of_material_list: [],
      selectedItems: [],
      materials_form: {
        code: '',
        name: '',
        description: '',
        tags: '',
        unit: '',
        density: '',
        maxInventory: '',
        inventory: '',
        safetyStock: '',
        price: '',
        category: '',
        status: '启用',
        image: '',
        fileList: ''
      }
    }
  },

  async mounted() {
    await this.getTableData()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    New_additions() {
      console.log('新增物料编码')
    },
    Material_Category_search(visible) {
      // visible 参数表示下拉框是否展开
      if (visible) {
        // 下拉框展开时的处理逻辑
        console.log('下拉框展开')
        materialCategory.getlist().then((res) => {
          this.Class_of_material_list = res.data
          console.log(res)
        })
      } else {
        // 下拉框收起时的处理逻辑
        console.log('下拉框收起')
      }
    },
    unit_search(visible) {
      if (visible) {
        console.log('下拉框展开')
        units.getlist().then((res) => {
          this.unitlis = res.data
          console.log(res)
        })
      } else {
        console.log('下拉框收起')
      }
    },
    async edit(row) {
      // TODO: 实现编辑操作的逻辑
      console.log('编辑', row)
    },
    async remove(row) {
      const confirmResult = await this.$confirm('确认删除该物料吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)

      if (confirmResult) {
        await materials.deleteMaterial(row.id)
        await this.getTableData()
        this.$message.success('删除成功')
      }
    },
    async getTableData() {
      const { data } = await materials.getMaterials()
      this.tableData = data
    },
    async submitForm() {
      try {
        await materials.addMaterial(this.materials_form)
        this.$message.success('添加成功')
        // this.dialogVisible = false
        await this.getTableData()
      } catch (error) {
        console.error(error)
      }
    },
    handleSelectionChange(selection) {
      this.selectedItems = selection
    }
  }
}
</script>
