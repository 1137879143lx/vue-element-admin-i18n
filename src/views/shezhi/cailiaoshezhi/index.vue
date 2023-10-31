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
            <el-button type="text" size="mini" @click="edit(scope.row)">{{ scope.row.code ? scope.row.code : '--' }}</el-button>
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
        <el-table-column prop="density" label="密度g/m3">
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
      <el-descriptions direction="horizontal" border :column="2">
        <el-descriptions-item label="*物料类别">
          <el-select v-model="materials_form.category" placeholder="请选择" clearable @change="onCategoryChange()">
            <el-option v-for="(item, index) in Class_of_material_list" :key="index" :label="item.name" :value="item.name">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.codeRule }}</span>
            </el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="*单位">
          <el-input v-model="materials_form.unit" disabled placeholder="单位" />
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
        <el-descriptions-item label="密度g/m3">
          <el-tooltip
            class="item"
            effect="dark"
            content="铝6061:2.7
            铝7075:2.8
            紫铜:8.96
钢:7.85
不锈钢:7.93
黄铜:8.5-8.73
铅:11.34
锌:7.14
镁:1.74
镍:8.9
钛:4.5
银:10.49
金:19.32
PMMA(有机玻璃):1.17-1.20
PC(聚碳酸酯):1.20-1.22
PE(聚乙烯):0.91-0.96
PET(聚酯):1.38-1.40
PP(聚丙烯):0.90-0.91
PVC(聚氯乙烯):1.38-1.58
PEI(聚醚酰亚胺):1.27-1.32
PPS(聚苯硫醚):1.35-1.40
POM(聚甲醛):1.41-1.43
PEEK(聚醚醚酮):1.30-1.32
电木(环氧玻纤板):1.80-1.90
"
            placement="top"
          >
            <el-input v-model="materials_form.density" placeholder="如果是原材料，则必填" clearable />
          </el-tooltip>
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
            :action="uploadUrl"
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
    <el-dialog :modal="true" :visible.sync="imageDialogVisible" :width="dialogWidth">
      <div class="container">
        <img :src="dialogImageUrl" alt="大图" />
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
      dialogImageUrl: '',
      uploadUrl: this.baseUrl + '/api/upload',
      dialogWidth: 'auto',
      code: ''
    }
  },

  async mounted() {
    // 获取表格数据
    await this.getTableData()
    // 获取 token
    this.getToken()
    // 设置基础 URL 和上传 URL
    this.baseUrl = config.baseUrl
    this.uploadUrl = this.baseUrl + '/api/upload'
    // 获取物料类别列表
    materialCategory.getlist().then((res) => {
      this.Class_of_material_list = res.data
      console.log(res)
    })
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
      materials
        .generateCode({
          code: '02-' + this.code + '-00'
        })
        .then((res) => {
          this.materials_form.code = res.data
        })
    },

    async edit(row) {
      // TODO: 实现编辑操作的逻辑
      // console.log('编辑', row)
      this.materials_form = row
      this.dialogVisible = true
      // this.fileList = [{ url: row.image }]
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
      const temporaryform = this.materials_form
      try {
        if (this.materials_form._id) {
          await materials.editMaterial(this.materials_form.id, this.materials_form)
          this.$message.success('编辑成功')
        } else {
          await materials.addMaterial(this.materials_form)
          this.$message.success('添加成功')
        }
        this.dialogVisible = false
        await this.getTableData()
        this.materials_form = {
          _id: '',
          code: '',
          name: '',
          description: '',
          tags: '',
          unit: '',
          status: '启用',
          image: '',
          category: temporaryform.temporaryform
        }
      } catch (error) {
        this.materials_form = temporaryform
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
      const image = new Image()
      image.src = this.dialogImageUrl
      image.onload = () => {
        this.dialogWidth = `${image.width}px`
      }
    },
    onCategoryChange() {
      const selectedCategory = this.Class_of_material_list.find((category) => category.name === this.materials_form.category)
      this.materials_form.unit = selectedCategory ? selectedCategory.unit : ''

      const selectedCategorycodeRule = this.materials_form.category // 获取当前选中的物料类别
      const selectedCategoryObj = this.Class_of_material_list.find((item) => item.name === selectedCategorycodeRule) // 查找该物料类别对应的对象
      this.code = selectedCategoryObj ? selectedCategoryObj.codeRule : '' // 获取该物料类别对应的 codeRule 值
    }
  }
}
</script>
