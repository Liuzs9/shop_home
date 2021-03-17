<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="opened">
        <el-form :model="form">
           <el-form-item label="一级分类" :label-width="formLabelWidth">
            <el-select v-model="form.first_cateid" @change="changeCate(false)" >
              <el-option label="--请选择--" disabled value=""></el-option>
              <!-- 遍历一级分类列表 -->
              <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="二级分类" :label-width="formLabelWidth">
            <el-select v-model="form.second_cateid" >
              <el-option label="--请选择--" disabled value=""></el-option>
              <!-- 遍历一级分类列表 -->
              <el-option v-for="item in seconedCate" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.goodsname"></el-input>
          </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格" :label-width="formLabelWidth">
            <el-input v-model="form.market_price"></el-input>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
              <div class="img-box">
                <h3>+</h3>
                <img v-if="imageUrl" :src="imageUrl" alt="">
                <input type="file" @change="changeImg">
              </div>
          </el-form-item>
          <el-form-item label="商品规格" :label-width="formLabelWidth">
            <el-select v-model="form.specsid"  @change="changeSpec(false)">
              <el-option label="--请选择--" disabled value=""></el-option>
              <!-- 遍历商品规格列表 -->
              <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="规格属性" :label-width="formLabelWidth">
            <el-select v-model="form.specsattr" multiple>
              <el-option label="--请选择--" disabled value=""></el-option>
              <!-- 遍历菜单列表 -->
              <el-option v-for="(item,index) in secondSpec" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新品" :label-width="formLabelWidth">
            <template>
                <el-radio v-model="form.isnew" :label="1">是</el-radio>
                <el-radio v-model="form.isnew" :label="2">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="是否热卖" :label-width="formLabelWidth">
            <template>
                <el-radio v-model="form.ishot" :label="1">是</el-radio>
                <el-radio v-model="form.ishot" :label="2">否</el-radio>
            </template>
          </el-form-item>
           <el-form-item label="商品状态" :label-width="formLabelWidth">
              <el-switch
                  v-model="form.status"
                  active-color="blue"
                  inactive-color="grey" :active-value="1" :inactive-value="2">
                </el-switch>
           </el-form-item>
           <el-form-item label="描述" :label-width="formLabelWidth">
             <div id="div1"></div>
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
import E from 'wangeditor'
import {mapGetters,mapActions} from 'vuex';
import {warningAlert,successAlert} from '../../../utils/alert';
import {addGoods,oneGoods,updateGoods} from '../../../utils/request';
export default {
    props:['info'],
    data(){
        return{
            imageUrl:'',
            formLabelWidth:'120px',
            seconedCate:[],
            secondSpec:[],
            editor:'',
            form:{
                first_cateid:'',
                second_cateid:'',
                goodsname:'',
                price:'',
                market_price:'',
                img:'',
                description:'',
                specsid:'',
                specsattr:[],
                isnew:1,
                ishot:1,
                status:1
            }
        }
    },
    computed:{
        ...mapGetters({
            "cateList":"cate/cateList",
            "specList":"spec/specList",
        })
    },
    methods:{
        ...mapActions({
            "requestCateList":"cate/cateListActions",
            "requestSpecList":"spec/specListActions",
            "requestCount":"goods/countActions",
            "requestGoodsList":"goods/goodsListActions",
        }),
        // 对话框打开结束之后的回调
        opened(){
            this.editor = new E('#div1')
            this.editor.create()
            this.editor.txt.html(this.form.description)
        },
        // 改变一级分类时获取二级分类
        changeCate(bool){
            if(!bool){
                this.form.second_cateid = '';
            }
            var index = this.cateList.findIndex(item=>item.id==this.form.first_cateid)
            this.seconedCate = this.cateList[index].children
        },
        // 改变文件时，获取图片的地址和详细信息
        changeImg(e){
            var file = e.target.files[0];
            if(file.size > 2*1024*1024){
                warningAlert('上传图片不能超过2M');
                return;
            }
            var ext = ['.png','.jpg','.jpeg','.gif'];
            var extName = file.name.slice(file.name.lastIndexOf('.'));
            if(!ext.some(item=>item==extName)){
                warningAlert('上传图片格式不正确');
                return
            }
            this.imageUrl = URL.createObjectURL(file);
            this.form.img = file;
        },
        changeSpec(bool){
            if(!bool){
                this.form.specsattr = [];
            }
            var index = this.specList.findIndex(item=>item.id==this.from.specsid)
            this.secondSpec = this.specList[index].attrs
        },
        cancel(){
            this.info.show = false;
            this.form = {
                first_cateid:'',
                second_cateid:'',
                goodsname:'',
                price:'',
                market_price:'',
                img:'',
                description:'',
                specsid:'',
                specsattr:[],
                isnew:1,
                ishot:1,
                status:1
            };
            this.imageUrl = '';
        },
        confirm(){
            this.form.description = this.editor.txt.html();
            addGoods(this.form).then(res=>{
                successAlert(res.data.msg);
                this.cancel()
                this.requestCount()
                this.requestGoodsList(null)
            })
        },
        getDetail(id){
            oneGoods({id}).then(res=>{
                // 详情信息
                this.form = res.data.list;
                this.form.id = id;
                // 二级分类详情
                this.changeCate(true)
                this.imageUrl = this.$preImg+this.from.img;
                // 获取规格属性
                this.cahngeSpec(true);
                this.form.specsattr = this.form.specsattr.split(',');
            })
        },
        update(){
            this.formdescription = this.editor.txt.html()
            updateGoods(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel()
                this.requestGoodsList(null)
            })
        }
    },
    mounted(){
        this.requestCateList()
        this.requestSpecList()
    }
}
</script>

<style scoped>
.img-box{
  width:150px;
  height: 150px;
  border:1px dashed blueviolet;
  position: relative;
}
.img-box h3{
  text-align: center;
  line-height: 150px;
  width:100%;
  height: 100%;
}
.img-box img{
  width:100%;
  height: 100%;
  position: absolute;
  left:0;
  top:0;
}
.img-box input{
  width: 100%;
  height: 100%;
  position: absolute;
  left:0;
  top:0;
  opacity: 0;
}
</style>