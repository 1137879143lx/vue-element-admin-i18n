<template>
  <div class="cailiaoshezhi">
    <el-card shadow="always" :body-style="{ padding: '5px' }">
      <div slot="header">
        <span>物料设置</span>
        <el-button size="mini" style="float: right; margin: 0" type="link">已删除物料</el-button>
        <el-button size="mini" style="float: right; margin: 0" type="link">导入</el-button>
        <el-button size="mini" style="float: right; margin: 0" type="link">下载导入模板</el-button>
        <el-button size="mini" style="float: right; margin: 0" type="link" @click="dialogVisible = true">新增</el-button>
      </div>
      <!-- card body -->
      <el-table>
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column label="图片" />
        <el-table-column label="物料编码" />
        <el-table-column label="物料名称" />
        <el-table-column label="描述" />
        <el-table-column label="标签" />
        <el-table-column label="单位" />
        <el-table-column label="状态" />
        <el-table-column label="操作">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="新增物料" :visible.sync="dialogVisible" width="60%">
      <el-descriptions direction="horizontal" border column="2">
        <el-descriptions-item span="1" label="*物料编码">
          <el-input v-model="Material_code" clearable placeholder="物料编码">
            <el-button slot="append" icon="el-icon-eleme" @click="New_additions()" />
          </el-input>
        </el-descriptions-item>
        <el-descriptions-item label="*物料名称">
          <el-input v-model="Material_name" clearable placeholder="物料名称" />
        </el-descriptions-item>
        <el-descriptions-item label="物料描述">
          <el-input v-model="Material_description" clearable placeholder="物料描述" />
        </el-descriptions-item>
        <el-descriptions-item label="标签" />

        <el-descriptions-item label="*单位">
          <el-select v-model="unit" placeholder="请选择" clearable>
            <el-option label="KG" value="KG" />
            <el-option label="PCS" value="PCS" />
            <el-option label="套" value="套" />
            <el-option label="米" value="米" />
            <el-option label="台" value="台" />
            <el-option label="支" value="支" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="密度Kg/m3">
          <el-input v-model="density" placeholder="如果是原材料，则必填" clearable />
        </el-descriptions-item>
        <el-descriptions-item label="最大库存">
          <el-input v-model="Maximum_inventory" placeholder="最大库存数量" clearable />
        </el-descriptions-item>
        <el-descriptions-item label="安全库存">
          <el-input v-model="Safety_stock" placeholder="安全库存数量" clearable />
        </el-descriptions-item>

        <el-descriptions-item label="单价(元)">
          <el-input v-model="Unit_price" placeholder="如果是原材料，则必填" clearable />
        </el-descriptions-item>
        <el-descriptions-item label="*物料类别">
          <el-select v-model="Class_of_material" placeholder="请选择" clearable>
            <el-option label="原材料" value="原材料" />
            <el-option label="产品" value="产品" />
            <el-option label="零件" value="零件" />
            <el-option label="电极" value="电极" />
            <el-option label="标准" value="标准" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <template>
            <el-radio v-model="radio" label="启用">启用</el-radio>
            <el-radio v-model="radio" label="禁用">禁用</el-radio>
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="sass" scoped>
@import './index.scss'
</style>

<script>
export default {
  name: 'Cailiaoshezhi',
  data() {
    return {
      dialogVisible: false,
      radio: '启用',
      Safety_stock: null,
      Maximum_inventory: null,
      Class_of_material: '',
      unit: '',
      Material_code: '',
      Material_name: '',
      density: '',
      Unit_price: '',
      Material_description: '',
      fileList: ''
    }
  },
  mounted() {},

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
    }
  }
}
</script>
