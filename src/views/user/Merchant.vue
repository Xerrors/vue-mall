<template>
  <div class="main">
    <div class="head">
      <img :src="merchant_info.logo" alt="LOGO" />
      <div class="head__info" style="display: inline-block">
        <div>{{ merchant_info.name }}</div>
        <i class="el-icon-star-on" v-for="_ in merchant_info.credit" :key="_"></i>
      </div>
      <!--       <span class="follow">关注</span> -->
      <p style="margin-bottom: 0; color: #909399">地址：{{ merchant_info.address }}</p>
    </div>
    <div class="body">
      <div class="block b1">
        <p>营业时间</p>
        <div>{{ merchant_info.opening_time }}</div>
      </div>
      <div class="block b2">
        <p>联系电话</p>
        <div>{{ merchant_info.tel }}</div>
      </div>
      <div class="block b3">
        <p>入驻时长</p>
        <div>{{ merchant_info.settle_age }} 年</div>
      </div>
      <div class="block b4">
        <p>30天交易量</p>
        <div>{{ merchant_info.deal_count }} 笔</div>
      </div>
      <div class="block b5">
        <p>好评率</p>
        <div>{{ merchant_info.good_rate }}</div>
      </div>
      <div class="block b6">
        <p>平均回收周期</p>
        <div>{{ merchant_info.cycle }} 天</div>
      </div>
    </div>
    <el-divider style="margin: 30px 0">历史订单</el-divider>
    <div class="hist-order" v-for="order in merchant_info.hist_orders" :key="order.id">
      <div class="price">{{ order.deal_price }} ¥</div>
      <div class="right">
        <div style="padding: 1rem">
          <span>{{ order.model }}</span>
          <span style="float: right;">
            <i class="el-icon-star-on" v-for="_ in order.evaluation" :key="_"></i>
          </span>
        </div>
        <div class="tags">
          <span v-for="(tag, ind) in order.tags" :key="ind">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      merchant_info: {}
    }
  },
  mounted () {
    this.getPlatformInfo()
  },
  methods: {
    getPlatformInfo (id) {
      // 这里就是通过ID向服务器获取信息了，后记可以加入一个全局的加载动画
      this.merchant_info = {
        id: '10001',
        logo:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSXn7pjhFRXpjBp55BxxRTnNPrtvTF_y3PbLCHGWsCVb6LRiMHH',
        name: '爱回收',
        pics: [],
        opening_time: '10:00 - 18:00',
        tel: '17629739090',
        address: '江苏省无锡市滨湖区蠡湖大道1800号江北大学',
        credit: 5,
        settle_age: 4,
        deal_count: 1290,
        good_rate: '90%',
        cycle_ways: ['上门取货', '自行邮递', '线下门店'],
        cycle: 3.89,
        hist_orders: this.getHistOrders(id)
      }
    },
    getHistOrders (id) {
      return [
        {
          id: '2183173188920',
          model: '华为 P30 Pro',
          tags: [
            '轻微使用无刮痕',
            '128G',
            '屏幕显示正常',
            '有维修',
            '账户可正常退出'
          ],
          deal_price: 1800,
          evaluation: 5
        },
        {
          id: '2183173188920',
          model: '华为 P30 Pro',
          tags: [
            '轻微使用无刮痕',
            '128G',
            '屏幕显示正常',
            '有维修',
            '账户可正常退出'
          ],
          deal_price: 1900,
          evaluation: 3
        },
        {
          id: '2183173188920',
          model: '华为 P30 Pro',
          tags: [
            '轻微使用无刮痕',
            '128G',
            '屏幕显示正常',
            '有维修',
            '账户可正常退出'
          ],
          deal_price: 1600,
          evaluation: 5
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.main {
  width: 800px;
  margin: 0 auto;

  .head {
    margin: 30px 0;

    >img {
      width: 100px;
      height: 100px;
      border-radius: 6px;
    }

    &__info {
      padding-left: 1rem;

      >div {
        letter-spacing: 3px;
        padding-bottom: 0.7rem;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  .body {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .block {
      display: inline-block;
      height: 100px;
      margin: 14px 10px;
      padding: 0.5rem 1.5rem;
      border-radius: 6px;

      >p {
        font-size: 17px;
        font-weight: 500;
        letter-spacing: 3px;
      }

      >div {
        color: #232323;
        background: rgba(222, 222, 222, 0.5);
        padding: 0.3rem 0.5rem;
        border-radius: 4px;
      }
    }

    bg_shadow(c) {
      background: c;
    }

    .b1 {
      bg_shadow(#afbef8);
    }

    .b2 {
      bg_shadow(#f4b75f);
    }

    .b3 {
      bg_shadow(#f6bb13);
    }

    .b4 {
      bg_shadow(#5dcbe4);
    }

    .b5 {
      bg_shadow(#58c9b9);
    }

    .b6 {
      bg_shadow(#9dc8c8);
    }
  }

  .hist-order {
    border-radius: 6px;
    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.05);
    margin: 30px 0;
    height: 100px;
    padding: 1rem;
    display: flex;

    .price {
      width: 80px;
      height: 100%;
      color: #ffa426;
      font-size: 20px;
      margin: 0 1rem;
      display: flex;
      align-items: center;
    }

    .right {
      width: 100%;

      .tags {
        padding: 0 1rem;

        >span {
          color: #909399;
          display: inline-block;
          padding: 0.3rem 0.5rem;
          border-radius: 3px;
          background: #f1f1f1;
          font-size: small;
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>

<style lang="stylus">
.el-icon-star-on {
  margin-right: 7px;
  color: #ffa426;
}
</style>
