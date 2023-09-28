<template>
  <div>
    <el-card class="full-screen-card">
      <div slot="header" class="clearfix">
        <span>生产任务</span>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-search" circle @click="drawer = true" />
        <el-button style="margin-left: 5px" size="mini" icon="el-icon-refresh" circle />
        <span style="float: right; padding: 3px 20px">
          <el-button type="text">新增</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">打印</el-button>
          <el-button type="text">标签打印</el-button>
          <el-button type="text">补料申请</el-button>
          <el-button type="text">查看工装工单</el-button>
          <el-button type="text">导出数据</el-button>
          <el-button type="text">已删除数据</el-button>
        </span>
      </div>
      <!-- 表格 -->
      <div>
        <!-- Note that row-key is necessary to get a correct row order. -->
        <el-table ref="dragTable" v-loading="listLoading" highlight-current-row size="mini" :data="list" row-key="id" border fit style="width: 100%">
          <el-table-column type="selection" width="40" />
          <el-table-column align="center" label="订单号" min-width="90">
            <template slot-scope="{ row }">
              <i class="el-icon-warning-outline" />
              <el-button size="mini" type="text" @click="xiangqing">{{ row.Batch_number }}</el-button>
              <!-- <span>{{ row.Batch_number }}</span> -->
            </template>
          </el-table-column>
          <el-table-column min-width="100px" align="center" label="客户">
            <template slot-scope="{ row }">
              <i class="el-icon-s-custom" />

              <span>{{ row.client }}</span>
              <!-- <span>{{ row.porject | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
            </template>
          </el-table-column>
          <el-table-column min-width="70px" align="center" label="项目">
            <template slot-scope="{ row }">
              <i class="el-icon-s-data" />
              <span>{{ row.porject }}</span>
              <!-- <span>{{ row.porject | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
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
          <el-table-column width="50px" align="center" label="数量">
            <template slot-scope="{ row }">
              <span>{{ row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column width="60px" align="center" label="类型">
            <template slot-scope="{ row }">
              <i class="el-icon-receiving" />
              <span>{{ row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="100px" align="center" label="客户交期">
            <template slot-scope="{ row }">
              <i class="el-icon-time" />
              <el-tag type="warning" size="mini" effect="plain ">{{ row.Delivery_time }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="70px" align="center" label="状态">
            <template slot-scope="{ row }">
              <el-tag type="success" size="mini" effect="plain  ">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
          <!-- g工序 -->
          <el-table-column min-width="350px" align="center" label="工序">
            <template slot-scope="{ row }">
              <span v-for="(item, id) in row.process" :key="id" style="margin-left: 3px">
                <el-tooltip placement="top">
                  <div slot="content">
                    {{ item.submitter }}
                    <br>
                    <span style="color: rgb(177, 172, 165)">{{ item.Submission_time }}</span>
                  </div>
                  <!-- 0是未加工 1是正在加工 2是加工完成 -->
                  <el-tag v-if="item.status == 2" type="success" size="mini" effect="dark ">{{ item.process }}|{{ item.man_hour }}H</el-tag>
                  <el-tag v-else-if="item.status == 1" type="warning" size="mini" effect="light  ">{{ item.process }}|{{ item.man_hour }}H</el-tag>
                  <el-tag v-else type="info" size="mini" effect="plain">{{ item.process }}|{{ item.man_hour }}H</el-tag>
                </el-tooltip>
              </span>

              <!-- <el-tag v-for="(item, i) in row.process" :key="i" type="info" size="mini" effect="plain">{{ item.process }}</el-tag> -->
            </template>
          </el-table-column>

          <el-table-column min-width="90px" align="center" label="难度等级">
            <template slot-scope="{ row }">
              <svg-icon v-for="n in row.Difficulty" :key="n" icon-class="star" />
              <!-- <div :key="id" :v-for="(item, index) in row.process">{{ item.process }}</div> -->
            </template>
          </el-table-column>
          <el-table-column width="50px" align="center" label="工时" prop="man_hour" />
          <el-table-column width="60" align="center" label="编辑">
            <template slot-scope="{ row }">
              <span>{{ row.author }}</span>
              <el-button type="text">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
      </div>
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <el-drawer size="mini" title="物料搜索" :visible.sync="drawer" :direction="direction">
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
  </div>
</template>

<script>
// import '../shengchanxiangqing/index.vue'
export default {
  data() {
    return {
      drawer: false,
      listLoading: '',
      currentPage4: 4,
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
    xiangqing() {
      this.$router.push('/shengchan/renwuxiangqing')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style>
.el-card__header {
  padding: 8px;
  padding-left: 20px;
}
.full-screen-card {
  height: 91vh;
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  flex: 1; /* 使 el-card 组件占据剩下的空间 */
}
.el-card__body {
  padding: 5px;
}
</style>
