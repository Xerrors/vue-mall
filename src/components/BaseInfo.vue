<template>
  <div class="base-info">
    <el-form :model="form" ref="form" label-width="100px" label-position='right'>
      <el-form-item label="头像：" prop="avatar" required>
        <el-avatar v-if="avatar" :src="avatar"></el-avatar>
      </el-form-item>
      <el-form-item label="用户名：" prop="account">
        <el-input v-model="form.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="支付方式：" prop="collection" required>
        <el-input placeholder="请输入收款账户" v-model="form.collection.account" class="input-with-select">
          <el-select style="width: 80px;" v-model="form.collection.way" slot="append" placeholder="请选择">
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="微信" value="微信"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="手机号码">
        <el-input v-model="form.tel" :placeholder="form.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" :loading="loading">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changePayTel, getInfo } from '@/api/user'
export default {
  data () {
    return {
      loading: false,
      form: {
        avatar: this.avatar,
        account: '',
        collection: {
          way: '支付宝',
          account: ''
        },
        tel: ''
      }
    }
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  methods: {
    getInfoFromServer () {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          this.form.account = res.info.account
          this.form.tel = res.info.tel
          this.form.account = res.info.account
          this.form.collection.account = res.info.pay_way
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    submitForm () {
      this.loading = true
      this.form.pay_way = this.form.collection.account
      return new Promise((resolve, reject) => {
        changePayTel(this.form).then(() => {
          this.loading = false
          this.$store.dispatch('GetInfo')
          resolve()
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    }
  },
  mounted () {
    this.getInfoFromServer()
  }
}
</script>

<style lang="stylus">
.el-input-group__append, .el-input-group__prepend
  width 80px
  background white
  border none
.el-input.is-disabled .el-input__inner
  background inherit
  border none
.base-info .el-input
  &__inner
    border none
    border-bottom 2px solid white
    border-radius 0
    padding 0
    &:focus
      border-color mainColor
</style>
