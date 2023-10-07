<template>
  <div>
    <el-card class="card1">
      <div slot="header" class="clearfix">
        <span>下料列表</span>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-search" circle @click="drawer = true" />
        <el-button style="margin-left: 5px" size="mini" icon="el-icon-refresh" circle />
        <span style="float: right; padding: 3px 20px">
          <el-button type="text">下料统计</el-button>
          <el-button type="text">导出数据</el-button>
          <el-button type="text">已删除数据</el-button>
        </span>
      </div>
      <!-- 表格 -->
      <div>
        <!-- Note that row-key is necessary to get a correct row order. -->
        <el-table ref="dragTable" v-loading="listLoading" size="mini" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
          <el-table-column type="index" width="40" />
          <el-table-column type="selection" width="45" />
          <el-table-column align="center" label="订单号" min-width="90">
            <template slot-scope="{ row }">
              <i class="el-icon-warning-outline" />
              <el-button size="mini" type="text" @click="xiangqing">{{ row.Batch_number }}</el-button>
              <!-- <span>{{ row.Batch_number }}</span> -->
            </template>
          </el-table-column>

          <el-table-column align="center" min-width="130px" label="物料编码">
            <template slot-scope="{ row }">
              <!-- <i class="el-icon-menu" /> -->

              <span>{{ row.Material_code }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="150px" align="center" label="物料名称">
            <template slot-scope="{ row }">
              <!-- <i class="el-icon-s-management" /> -->

              <span>{{ row.Material_name }}</span>
            </template>
          </el-table-column>
          <el-table-column width="60px" align="center" label="版本">
            <template slot-scope="{ row }">
              <span>{{ row.versions }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column align="center" label="零件数量">
            <template slot-scope="{ row }">
              <span>{{ row.count }}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="下料名称">
            <template slot-scope="{ row }">
              <!-- <i class="el-icon-receiving" /> -->
              {{ row.material }}
            </template>
          </el-table-column>
          <el-table-column width="70px" align="center" label="下料数量">
            <template slot-scope="{ row }">
              {{ row.count }}
            </template>
          </el-table-column>
          <el-table-column min-width="120px" align="center" label="下料尺寸">
            <template slot-scope="{ row }">
              <!-- <el-tag v-if="row.Cutting_size" type="success" effect="plain "></el-tag> -->
              {{ row.Cutting_size }}
            </template>
          </el-table-column>
          <el-table-column width="75px" align="center" label="理论用量">
            <template slot-scope="{ row }">
              {{ row.Theoretical_dosage }}
            </template>
          </el-table-column>
          <el-table-column width="75px" align="center" label="实际用量">
            <template slot-scope="{ row }">
              {{ row.Actual_dosage }}
            </template>
          </el-table-column>
          <el-table-column min-width="100px" align="center" label="客户交期">
            <template slot-scope="{ row }">
              <el-tag type="warning" size="mini" effect="plain ">{{ row.Delivery_time }}</el-tag>
            </template>
          </el-table-column>

          <!-- <el-table-column width="50px" align="center" label="工时" prop="man_hour" /> -->

          <el-table-column width="120" align="center" label="编辑">
            <template slot-scope="{ row }">
              <el-tooltip placement="top" open-delay="500">
                <div slot="content">
                  {{ row.process[0].Submission_time }}
                  <br>
                  {{ row.process[0].submitter }}
                </div>
                <el-button v-if="row.process[0].status == 0" type="primary" size="mini" @click="centerDialogVisible = true">下料</el-button>
                <el-button v-else disabled type="info " size="mini">已下料</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
      </div>
    </el-card>

    <el-drawer size="mini" title="物料搜索" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="关键字">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="物料编码">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="客户">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="计划交期">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="包含完成">
          <el-switch v-model="form.delivery" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 下料确认 -->
    <el-dialog title="下料确认" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form :model="formInline" class="demo-form-inline">
        <el-form-item label="机器">
          <el-select v-model="formInline.region" placeholder="一号机">
            <el-option label="一号机" value="shanghai" />
            <el-option label="二号机" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="数量">
          <el-input v-model="formInline.user" placeholder="14" />
        </el-form-item>

        <el-form-item label="单个重量(kg)">
          <el-input v-model="formInline.user" placeholder="重量" />
        </el-form-item>

        <el-form-item label="单个长度(毫米)">
          <el-input v-model="formInline.user" placeholder="长度" />
        </el-form-item>
        <span>重量与长度二选一填写即可</span>
        <br>
        <br>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit2">确 定</el-button>

        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import '../shengchanxiangqing/index.vue'
export default {
  data() {
    return {
      activeName: '1',
      drawer: false,
      centerDialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      list: [
        {
          id: 1,
          Batch_number: 20230923,
          porject: '天穹',
          Material_code: '02-62-00-0369-00',
          Material_name: '盖天腔体支撑架',
          versions: '02',
          type: '打样',
          Delivery_time: '2023-09-29',
          status: '加工中',
          Cutting_size: '100*100*25',
          client: '南天门研发所',
          material: 'AL6061',
          Theoretical_dosage: 0.25,
          Actual_dosage: 0.23,
          process: [
            {
              id: 1,
              process: '下料',
              status: 0,
              man_hour: 0.2,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 2,
              process: 'CNC',
              status: 0,
              man_hour: 0.4,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 3,
              process: '慢走丝',
              status: 0,
              man_hour: 1.6,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 4,
              process: '后处理',
              status: 0,
              man_hour: 0.2,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 5,
              process: '入库',
              status: 0,
              man_hour: 0.0,
              Submission_time: '',
              submitter: ''
            }
          ],
          count: 15,
          Difficulty: 3,
          man_hour: 7.5
        },
        {
          id: 2,
          Batch_number: 20230923,
          porject: '天穹',
          Material_code: '02-62-00-0369-00',
          Material_name: '盖天腔体支撑架',
          versions: '02',
          type: '打样',
          Delivery_time: '2023-09-29',
          status: '加工中',
          Cutting_size: 'D25*102',
          client: '南天门研发所',
          process: [
            {
              id: 1,
              process: '下料',
              status: 0,
              man_hour: 0.2,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 2,
              process: 'CNC',
              status: 1,
              man_hour: 0.4,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 3,
              process: '慢走丝',
              status: 0,
              man_hour: 1.6,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 4,
              process: '后处理',
              status: 0,
              man_hour: 0.2,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 5,
              process: '入库',
              status: 0,
              man_hour: 0.0,
              Submission_time: '',
              submitter: ''
            }
          ],
          count: 15,
          Difficulty: 2,
          man_hour: 7.5
        },
        {
          id: 1,
          Batch_number: 20230923,
          porject: '天穹',
          Material_code: '02-62-00-0369-00',
          Material_name: '盖天腔体支撑架',
          versions: '02',
          type: '打样',
          Delivery_time: '2023-09-29',
          status: '加工中',
          Cutting_size: '100*100*25',
          client: '南天门研发所',
          process: [
            {
              id: 1,
              process: '下料',
              status: 2,
              man_hour: 0.2,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 2,
              process: 'CNC',
              status: 1,
              man_hour: 0.4,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 3,
              process: '慢走丝',
              status: 0,
              man_hour: 1.6,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 4,
              process: '后处理',
              status: 0,
              man_hour: 0.2,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 5,
              process: '入库',
              status: 0,
              man_hour: 0.0,
              Submission_time: '',
              submitter: ''
            }
          ],
          count: 15,
          Difficulty: 3,
          man_hour: 7.5
        },
        {
          id: 1,
          Batch_number: 20230923,
          porject: '天穹',
          Material_code: '02-62-00-0369-00',
          Material_name: '盖天腔体支撑架',
          versions: '02',
          type: '打样',
          Delivery_time: '2023-09-29',
          status: '加工中',
          client: '南天门研发所',
          Cutting_size: '100*100*25',
          process: [
            {
              id: 1,
              process: '下料',
              status: 2,
              man_hour: 0.2,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 2,
              process: 'CNC',
              status: 1,
              man_hour: 0.4,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 3,
              process: '慢走丝',
              status: 0,
              man_hour: 1.6,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 4,
              process: '后处理',
              status: 0,
              man_hour: 0.2,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 5,
              process: '入库',
              status: 0,
              man_hour: 0.0,
              Submission_time: '',
              submitter: ''
            }
          ],
          count: 15,
          Difficulty: 2,
          man_hour: 7.5
        },
        {
          id: 1,
          Batch_number: 20230923,
          porject: '天穹',
          Material_code: '02-62-00-0369-00',
          Material_name: '盖天腔体支撑架',
          versions: '02',
          type: '打样',
          Delivery_time: '2023-09-29',
          status: '加工中',
          client: '南天门研发所',
          process: [
            {
              id: 1,
              process: '下料',
              status: 2,
              man_hour: 0.2,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 2,
              process: 'CNC',
              status: 1,
              man_hour: 0.4,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 3,
              process: '慢走丝',
              status: 0,
              man_hour: 1.6,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 4,
              process: '后处理',
              status: 0,
              man_hour: 0.2,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 5,
              process: '入库',
              status: 0,
              man_hour: 0.0,
              Submission_time: '',
              submitter: ''
            }
          ],
          count: 15,
          Difficulty: 1,
          man_hour: 7.5
        },
        {
          id: 1,
          Batch_number: 20230923,
          porject: '天穹',
          Material_code: '02-62-00-0369-00',
          Material_name: '盖天腔体支撑架',
          versions: '02',
          type: '打样',
          Delivery_time: '2023-09-29',
          status: '加工中',
          client: '南天门研发所',

          process: [
            {
              id: 1,
              process: '下料',
              status: 2,
              man_hour: 0.2,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 2,
              process: 'CNC',
              status: 2,
              man_hour: 0.4,
              Submission_time: '2023-09-23-16:35',
              submitter: '刘旭'
            },
            {
              id: 3,
              process: '慢走丝',
              status: 1,
              man_hour: 1.6,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 4,
              process: '后处理',
              status: 0,
              man_hour: 0.2,
              Submission_time: '',
              submitter: ''
            },
            {
              id: 5,
              process: '入库',
              status: 0,
              man_hour: 0.0,
              Submission_time: '',
              submitter: ''
            }
          ],
          count: 15,
          Difficulty: 2,
          man_hour: 7.5
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      this.drawer = false
    },
    onSubmit2() {
      console.log('submit2!')
      this.centerDialogVisible = false
      this.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    xiangqing() {
      this.$router.push('/shengchan/renwuxiangqing')
    }
  }
}
</script>

<style>
.el-card__header {
  padding: 8px;
  padding-left: 20px;
}
</style>
