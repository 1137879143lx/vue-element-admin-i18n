<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>销售报价</span>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-search" circle @click="drawer = true" />
        <el-button style="margin-left: 5px" size="mini" icon="el-icon-refresh" circle />
        <span style="float: right; padding: 3px 20px">
          <el-button type="text" @click="$router.push('../xiaoshou/baojiaxiangqing')">新增</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">导出数据</el-button>
          <el-button type="text">已删除数据</el-button>
        </span>
      </div>

      <el-table stripe :data="List" size="mini">
        <el-table-column type="index" />
        <el-table-column type="selection" />
        <el-table-column property="id" label="订单编号">
          <template slot-scope="{ row }">
            <el-button size="mini" type="text" @click="$router.push('../xiaoshou/baojiaxiangqing')">{{ row.id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column property="proposer" label="客户" />
        <el-table-column property="Application_date" label="订单日期" />

        <el-table-column property="items" label="物料信息">
          <template slot-scope="{}">
            <el-button size="mini" type="text">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column property="deliveryDate" label="期望交期" />
        <el-table-column property="remarks" label="备注" />
        <el-table-column label="状态">
          <template slot-scope="{ row }">
            <el-tag v-if="row.status == '待报价'" type="info" size="mini" effect="plain">{{ row.status }}</el-tag>
            <el-tag v-else-if="row.status == '已报价,待客户确认'" type="warning" size="mini" effect="dark">{{ row.status }}</el-tag>
            <el-tag v-else-if="row.status == '客户驳回,请重新报价'" type="danger" size="mini" effect="dark">{{ row.status }}</el-tag>
            <el-tag v-else type="success" size="mini" effect="dark">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column property="approval" label="审核" /> -->

        <el-table-column align="center" label="编辑">
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
            <el-button v-if="row.status == '客户已确认'" size="mini" type="text">查看合同</el-button>
            <el-button v-else-if="row.status == '已报价,待客户确认'" size="mini" disabled type="text">报价</el-button>
            <el-button v-else size="mini" type="text">报价</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import * as salesQuote from '@/api/salesQuote'

export default {
  data() {
    return {
      List: [],
      page: 1,
      limit: 10
    }
  },
  // 初始函数 页面切换到这时
  mounted() {
    this.getSalesQuotes() // 获取客户列表
  },
  methods: {
    getSalesQuotes() {
      salesQuote
        .getSalesQuotes({ page: this.page, limit: this.limit })
        .then((response) => {
          this.List = response.data
        })
        .catch((error) => {
          console.error('Error getting sales quotes:', error)
        })
    }
  }
}
</script>
