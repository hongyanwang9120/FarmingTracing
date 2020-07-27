<template>
  <div class="contac">
    <div class="header">
      <i><img src="@/assets/portal_images/contac.png" alt=""></i>
      <span>联系我们</span>
    </div>
    <div class="content">
      <span>电话：010-56984569</span>
      <span>传真：+86 08354856</span>
      <span>邮箱：plant@hotmall.com</span>

    </div>
  </div>
</template>
 
<script>
export default {
  name: 'Carrousel',

  data() {
    return {};
  },
  computed: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.contac{
  width:290px;
height:214px;
background:rgba(255,255,255,1);
border:1px solid rgba(220,220,220,1);
border-radius:8px;

.header{
  height:57px;
  background:linear-gradient(0deg,rgba(231,231,231,0.3
  ),rgba(255,255,255,0.3));
  border-radius:8px;
  display: flex;;
align-items:center;
  i{
    margin:0 14px 0 18px;
  }
  span{
    font-size:20px;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
}
.content{
  display: flex;
  flex-direction:column;
  padding:10px 71px 26px 21px;
  span{
    font-size:16px;

font-weight:400;
color:rgba(51,51,51,1);
line-height:40px;
  }
}
}
</style>
