<template>
  <div class="list-table">
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{ 'text-align':'center',background:'#243D75',color:'rgba(255,255,255,1)',height:'50px'}"
    >
      <el-table-column
        v-for="(item, index) in tableHeader"
        :prop="item.prop"
        :key="index"
        :label="item.label"
      >
        <template slot-scope="scope">
          <template v-if="item.prop && item.prop.startsWith('operate')">
            <div >
              <template v-if="item.prop==='operate-show'">
                <u style="color:#1DA943;cursor:pointer" >数据查看</u>
              </template>
              <template v-else-if="item.prop==='operate-edit'">
                <u style="color:#299CF6;cursor:pointer">信息维护</u>
              </template>
              <template v-else>
                <u style="color:#E52B00;cursor:pointer">删除</u>
              </template>
            </div>
          </template>
          <template v-if="item.prop && item.prop==='name'">
            <div>
              <u style="color:#299CF6;cursor:pointer">{{scope.row[item.prop]}}</u>
            </div>
          </template>
          <template v-else>
            <div>{{scope.row[item.prop]}}</div>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-control">
      <div>显示第1到3条结果，共3条</div>
      <div>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-size="50"
          layout="prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
    },
    tableHeader: {
      type: Array,
    },
  },
  data() {
    return {
      currentPage1: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style  lang="scss" scoped>
.page-control {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
