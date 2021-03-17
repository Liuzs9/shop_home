<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="defaultProps" ref="tree"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="角色状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm"  v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update"  v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {addRole,oneRole,updateRole} from '../../../utils/request'
import { successAlert } from '../../../utils/alert';
export default {
  props:['info'],
  data(){
    return {
       formLabelWidth: '120px',
      form:{
        rolename:'',
        menus:'',
        status:1,
      },
      defaultProps: {
          children: 'children',
          label: 'title'
        },
        defaultKey:[],//默认选中的key值
    }
  },
  computed:{
    ...mapGetters({
      "data":"menu/menuList"
    })
  },
  methods:{
    ...mapActions({
      "requestMenuList":"menu/menuListActions",
      "requestRoleList":"role/roleListActions",
    }),
    // 取消
    cancel(){
      this.info.show = false;
      this.form = {
         rolename:'',
          menus:'',
          status:1,
      };
      this.defaultKey = this.$refs.tree.setCheckedKeys([]);
    },
    // 添加角色
    confirm(){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // 发起添加角色请求
      addRole(this.form).then(res=>{
        successAlert(res.data.msg)
        this.cancel()
        this.requestRoleList()
      })
    },
    // 获取角色详情
    getDetail(id){
      // 发起获取角色详情请求
      oneRole({id}).then(res=>{
        this.form = res.data.list;
        this.form.id = id;
        this.defaultKey = JSON.parse(this.form.menus);
      })
    },
    //修改并提交数据
    update(){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      updateRole(this.form).then(res=>{
        successAlert(res.data.msg);
        this.cancel()
        this.requestRoleList()
      })
    }

  },
  mounted(){
    this.requestMenuList();
  }
};
</script>

<style scoped>

</style>
