<!-- eslint-disable vue/html-self-closing -->
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
      <el-table :data="tableData" size="mini" highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="baseUrl + scope.row.image" alt="未上传" width="40" height="40" style="cursor: pointer" @click="showImage(scope.row.image)" />
          </template>
        </el-table-column>

        <el-table-column prop="code" label="物料编码" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.code ? scope.row.code : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="物料名称" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.name ? scope.row.name : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.description ? scope.row.description : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签"></el-table-column>
        <el-table-column prop="unit" label="单位">
          <template slot-scope="scope">
            {{ scope.row.unit ? scope.row.unit : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="density" label="密度Kg/m3">
          <template slot-scope="scope">
            {{ scope.row.density ? scope.row.density : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="maxInventory" label="最大库存">
          <template slot-scope="scope">
            {{ scope.row.maxInventory ? scope.row.maxInventory : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="安全库存">
          <template slot-scope="scope">
            {{ scope.row.inventory ? scope.row.inventory : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价">
          <template slot-scope="scope">
            {{ scope.row.price ? scope.row.price : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="category" label="物料类别">
          <template slot-scope="scope">
            {{ scope.row.category ? scope.row.category : '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === '启用'" size="mini" effect="light" type="">启用</el-tag>
            <el-tag v-if="scope.row.status === '禁用'" size="mini" effect="light" type="danger">禁用</el-tag>
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
        <el-descriptions-item label="*物料类别">
          <el-select v-model="materials_form.category" placeholder="请选择" clearable @visible-change="Material_Category_search">
            <el-option v-for="(item, index) in Class_of_material_list" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="*单位">
          <el-select v-model="materials_form.unit" placeholder="请选择" clearable @visible-change="unit_search">
            <el-option v-for="(item, index) in unitlis" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </el-descriptions-item>
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

        <el-descriptions-item label="状态">
          <template>
            <el-radio v-model="materials_form.status" label="启用">启用</el-radio>
            <el-radio v-model="materials_form.status" label="禁用">禁用</el-radio>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="图片">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1:3333/api/upload"
            :headers="{ Authorization: token }"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :file-list="fileList"
            :limit="1"
            :auto-upload="true"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </el-descriptions-item>
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="imageDialogVisible" width="600px">
      <div class="container">
        <img :src="dialogImageUrl" width="600" height="600" alt="大图" />
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-upload__tip {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
.container {
  display: flex;
  justify-content: center;
}
</style>

<script>
import * as materialCategory from '@/api/materialCategory'
import * as units from '@/api/units'
import * as materials from '@/api/materials'
import { getToken } from '@/utils/auth' // get token from cookie
import config from '../../../../config'
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
      },
      fileList: [],
      token: '',
      baseUrl: '',
      imageDialogVisible: false,
      dialogImageUrl: ''
    }
  },

  async mounted() {
    await this.getTableData()
    this.getToken()
    this.baseUrl = config.baseUrl
    console.log(config.baseUrl)
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
        materialCategory.getlist().then((res) => {
          this.Class_of_material_list = res.data
          console.log(res)
        })
      } else {
        // 下拉框收起时的处理逻辑
      }
    },
    unit_search(visible) {
      if (visible) {
        units.getlist().then((res) => {
          this.unitlis = res.data
          console.log(res)
        })
      } else {
        // 下拉框收起时的处理逻辑
      }
    },
    async edit(row) {
      // TODO: 实现编辑操作的逻辑
      console.log('编辑', row)
      this.materials_form = row
      this.dialogVisible = true
    },
    async remove(row) {
      const confirmResult = await this.$confirm('确认删除该物料吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)

      if (confirmResult) {
        await materials.deleteMaterial(row._id)
        await this.getTableData()
        // this.$message.success('删除成功')
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
        this.dialogVisible = false
        this.materials_form = ''
        await this.getTableData()
      } catch (error) {
        console.error(error)
      }
    },
    handleSelectionChange(selection) {
      this.selectedItems = selection
    },
    handleSuccess(response, file, fileList) {
      this.fileList = fileList
      this.materials_form.image = response.fileUrl
      this.$message.success('上传成功')
    },
    // eslint-disable-next-line handle-callback-err
    handleError(error, file, fileList) {
      this.fileList = fileList
      this.$message.error('上传失败')
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('只能上传jpg/png文件')
      }

      if (!isLt2M) {
        this.$message.error('文件大小不能超过2MB')
      }

      return isJPG && isLt2M
    },
    // 获取浏览器中的token
    getToken() {
      this.token = getToken()
      console.log(this.token)
    },
    showImage(imageUrl) {
      this.dialogImageUrl = this.baseUrl + imageUrl
      this.imageDialogVisible = true
    }
  }
}
</script>
