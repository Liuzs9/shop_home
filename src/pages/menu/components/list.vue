<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号"  >
      </el-table-column>
      <el-table-column prop="title" label="菜单名称"  >
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
          <template v-slot="prop">
              <el-button type="primary" v-if="prop.row.status==1">启用</el-button>
              <el-button type="danger" v-else>禁止</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {delMenu} from '../../../utils/request'
import { successAlert } from '../../../utils/alert';
export default {
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters({
      "tableData":"menu/menuList"
    })
  },
  methods:{
    ...mapActions({
      "requestMenuList":"menu/menuListActions"
    }),
    // 事件传递方法
    edit(id){
      // 传递自定义edit事件过去
      this.$emit('edit',id)
    },
    // 删除菜单
    del(id){
       this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除菜单请求
          delMenu({id}).then(res=>{
              // 已经删除成功
              successAlert(res.data.msg);
              this.requestMenuList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
  mounted(){
    // 发起菜单列表请求
    this.requestMenuList()
  }
};
</script>

<style></style>
