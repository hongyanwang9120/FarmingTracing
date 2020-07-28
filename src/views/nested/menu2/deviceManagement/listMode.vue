<template>
  <div class="list-mode">
    <div class="search">
      <el-form ref="form" :model="form" label-width="70px" class="form">
        <el-form-item label="设备名称">
          <el-input v-model="form.name" placeholder="请输入"  />
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="form.type" placeholder="请选择" >
            <el-option label="全部" value="all" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="form.status" placeholder="请选择" >
            <el-option label="全部" value="all" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:140px">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <list-table
      :tableData="tableData"
      :tableHeader="tableHeader"
      :tableoperatetype="1"
      @deleteData="handletabledataDelete"
    ></list-table>

  </div>
</template>

<script>
import listTable from "@/views/common/listTable";
export default {
  components: { listTable },
  data() {
    return {
      form: {
        name: "",
        type: "",
        status: "",
      },
      
      tableHeader: [
      //   {
      //     prop: "no",
      //     label: "编号",
      //   },
      //   {
      //     prop: "name",
      //     label: "设备名称",
      //   },
      //   {
      //     prop: "uuId",
      //     label: "设备识别码",
      //   },
      //   {
      //     prop: "type",
      //     label: "设备类型",
      //   },
      //   {
      //     prop: "status",
      //     label: "设备状态",
      //   },
      //   {
      //     prop: "information",
      //     label: "地块信息",
      //   },
      //   {
      //     prop: "position",
      //     label: "位置坐标",
      //   },
      //   {
      //     prop: "cardNumber",
      //     label: "物联网卡号",
      //   },
      //   {
      //     prop: "operate-show",
      //     label: "数据查看",
      //   },
      //   {
      //     prop: "operate-edit",
      //     label: "信息维护",
      //   },
      //   {
      //     prop: "operate-delete",
      //     label: "删除设备",
      //   },
      ],
      tableData: [
        {
          no: 1,
          name: "1号水EC传感器",
          uuId: "12041B000000030C",
          type: "水EC传感器",
          status: "在线",
          // information: "地块8，地块9，地块10",
          position: "123，123",
          cardNumber: "17734567890",
        },
        {
          no: 2,
          name: "2号水EC传感器",
          uuId: "12041B000000030C",
          type: "水EC传感器",
          status: "在线",
          // information: "地块8，地块9，地块10",
          position: "123，123",
          cardNumber: "17734567890",
        },
        {
          no: 3,
          name: "3号水EC传感器",
          uuId: "12041B000000030C",
          type: "水EC传感器",
          status: "在线",
          // information: "地块8，地块9，地块10",
          position: "123，123",
          cardNumber: "17734567890",
        },
      ],
    };
  },
  created() {
    let objAttributes = Object.keys(this.tableData[0]);
    let objHeader = [
      "编号",
      "设备名称",
      "设备识别码",
      "设备类型",
      "设备状态",
      // "地块信息",
      "位置坐标",
      "物联网卡号",
      "数据查看",
      "信息维护",
      "删除设备",
    ];
    this.tableHeader = objHeader.map(function (currentValue, index, arr) {
      if (currentValue === "数据查看") objAttributes[index] = "operate-show";
      if (currentValue === "信息维护") objAttributes[index] = "operate-edit";
      if (currentValue === "删除设备") objAttributes[index] = "operate-delete";
      return {
        prop: objAttributes[index],
        label: currentValue,
      };
    });
    console.log(this.tableHeader, "tableHeader");
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    handletabledataDelete(data) {
      console.log(data);
    },
  },
};
</script>

<style  lang="scss" scoped>
.list-mode {
  width: 100%;
  height: calc(100% - 60px);
  border-top: 1px solid rgba(221, 221, 221, 1);
  font-size:14px;
  .search {
    height: 97px;
    ::v-deep .el-input__inner {
      width:360px;
    }
  }
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 25px;
  }
}
</style>
