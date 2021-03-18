<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
        <el-form :model="form">
            <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-select v-model="form.pid" >
              <el-option label="--请选择--" disabled value=""></el-option>
              <el-option label="顶级分类" :value="0"></el-option>
              <!-- 遍历分类列表 -->
              <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.catename"></el-input>
          </el-form-item>
           <el-form-item label="图片" :label-width="formLabelWidth">
             <!-- 自定义文件上传 -->
             <div class="img-box">
               <h3>+</h3>
               <img v-if="imageUrl" :src="imageUrl" alt="">
               <input type="file" @change="changeImg1">
             </div>
          </el-form-item>
           <el-form-item label="分类状态" :label-width="formLabelWidth">
              <el-switch
                  v-model="form.status"
                  active-color="blue"
                  inactive-color="grey" :active-value="1" :inactive-value="2">
                </el-switch>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm" v-if="info.isAdd"> 确 定</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import {addCate,oneCate,updateCate} from '../../../utils/request'
import {successAlert,warningAlert} from '../../../utils/alert'
import {mapGetters,mapActions} from 'vuex'
export default {
    props:['info'],
    data(){
        return{
            imageUrl:'',
            formLabelWidth:'120px',
            form:{
                pid:0,
                catename:'',
                img:'',
                status:1,
            }
        }
    },computed:{
        ...mapGetters({
            "cateList":"cate/cateList"
        })
    },
    methods:{
        ...mapActions({
            "requestCateList":"cate/cateListActions"
        }),
        changeImg1(e){
            var file = e.target.files[0];
            if(file.size > 2*1024*1024){
                warningAlert("文件大小不能超过2M");
                return;
            }
            this.imageUrl = URL.createObiectURL(file);
            this.form.img = file;
        },
        changeImg(e){
            if(e.size > 2*1024*1024){
                warningAlert('文件大小不能超过2M')
                return
            }
            var ext = ['.jpg','.png','.jpeg','.gif'];
            var extName = e.name.slice(e.name.lastIndexOf('.'));
            if(!ext.some(item=>item==extName)){
                warningAlert('上传文件格式不正确')
                return
            }

            // 上传显示的文件
            // 将文件生成url地址，并显示在页面中
            this.imageUrl = URL.createObjectURL(e.raw)
            this.form.img = e.raw;
        },
        cancel(){
            this.info.show = false;
            this.form = {
                pid:0,
                catename:'',
                img:'',
                status:1,
            };
            this.imageUrl = '';
        },
        confirm(){
            addCate(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel()
                this.requestCateList()
            })
        },
        getCetail(id){
            oneCate({id}).then(res=>{
                this.form = res.data.list;
                this.form.id = id;
                this.imageUrl = this.$preImg+this.form.img;
            })
        },
        update(){
            updateCate(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel()
                this.requestCateList()
            })
        }
    },
    mounted(){
        this.requestCateList()
    }
}
</script>

<style scoped>
.img-box{
  width:150px;
  height: 150px;
  border:1px dashed green;
  position: relative;
}
.img-box h3{
  width:100%;
  height: 100%;
  text-align: center;
  line-height: 150px;
}
.img-box img{
  width:100%;
  height: 100%;
  position: absolute;
  left:0;
  top:0;
}
.img-box input{
    width:100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    opacity: 0;
}
 .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>