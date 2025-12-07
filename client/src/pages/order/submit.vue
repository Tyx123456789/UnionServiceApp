<template>
  <view class="order-page">
    <view class="header-blue">
      <view class="status-row">
        <text class="big-txt">支付订单</text>
      </view>
      <view class="addr-box">
        <text class="order-no">订单号: {{orderNo}}</text>
        <text class="addr-txt">📍 南阳 · 文秀花园四单元二楼东户</text>
        <text class="date-txt">📅 {{orderTime}}</text>
      </view>
    </view>

    <view class="white-card mode-card">
      <view class="col">
        <text class="label">模式</text>
        <text class="val orange">普通配送 (标准)</text>
      </view>
      <view class="line"></view>
      <view class="col">
        <text class="label">配送时间</text>
        <text class="val red">50分钟</text>
      </view>
      <view class="line"></view>
      <view class="col">
        <text class="label">预计时间</text>
        <text class="val blue">12:59</text>
      </view>
    </view>

    <view class="white-card">
      <view class="row">
        <text>持有积分 2330</text>
      </view>
      <view class="row sb">
        <text>本次支付可使用积分 <text class="red">233</text></text>
        <view :class="['check', usePoints ? 'checked' : '']" @click="usePoints = !usePoints">
          <text v-if="usePoints">✔</text>
        </view>
      </view>
      <view class="row sb">
        <text>是否选择环保餐具</text>
        <view :class="['check', ecoFriendly ? 'checked' : '']" @click="ecoFriendly = !ecoFriendly">
          <text v-if="ecoFriendly">✔</text>
        </view>
      </view>
    </view>

    <view class="bill-card">
      <view class="row sb">
        <text>普通配送</text>
        <text>¥2.00</text>
      </view>
      <view class="row sb">
        <text>运费</text>
        <text>¥2.00</text>
      </view>
      <view class="row sb">
        <text>积分</text>
        <text>-¥{{usePoints ? '4.00' : '0.00'}}</text>
      </view>
      <view class="total-row">
        <text>应付 <text class="big-red">¥{{totalPrice}}</text></text>
      </view>
    </view>

    <button class="submit-btn" @click="doPay">确认支付</button>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { API_BASE } from '@/common/config.js'

const orderNo = ref('')
const orderTime = ref('')
const productPrice = ref(60.8)
const productName = ref('')
const productId = ref(1)

const usePoints = ref(true)
const ecoFriendly = ref(true)

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  productId.value = currentPage.options?.id || 1
  productPrice.value = parseFloat(currentPage.options?.price) || 60.8
  productName.value = decodeURIComponent(currentPage.options?.name || '商品')
  
  orderNo.value = generateOrderNo()
  orderTime.value = formatDateTime(new Date())
})

const generateOrderNo = () => {
  return Math.random().toString().slice(2, 18)
}

const formatDateTime = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

const totalPrice = computed(() => {
  let total = productPrice.value + 4
  if (usePoints.value) {
    total -= 4
  }
  return total.toFixed(2)
})

const doPay = async () => {
  uni.showLoading({ title: '支付中...' })
  
  try {
    const res = await uni.request({
      url: `${API_BASE}/api/order`,
      method: 'POST',
      data: {
        productId: productId.value,
        usePoints: usePoints.value,
        total: totalPrice.value
      }
    })
    
    uni.hideLoading()
    
    if (res.data.success) {
      uni.redirectTo({
        url: `/pages/pay/result?orderId=${res.data.orderId}&price=${totalPrice.value}`
      })
    }
  } catch (e) {
    uni.hideLoading()
    uni.redirectTo({
      url: `/pages/pay/result?orderId=NO.${Date.now()}&price=${totalPrice.value}`
    })
  }
}
</script>

<style scoped>
.order-page { background: #f5f5f5; min-height: 100vh; padding-bottom: 40rpx; }
.header-blue { background: #0091ff; padding: 20rpx 30rpx 100rpx; color: white; }
.status-row { text-align: center; margin-bottom: 30rpx; font-size: 36rpx; font-weight: bold; }
.addr-box { font-size: 28rpx; opacity: 0.9; line-height: 1.6; }
.order-no { display: block; margin-bottom: 10rpx; }
.addr-txt { display: block; margin-bottom: 10rpx; }
.date-txt { display: block; }
.white-card { background: white; margin: -60rpx 30rpx 20rpx; border-radius: 16rpx; padding: 30rpx; box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.05); }
.mode-card { display: flex; justify-content: space-between; align-items: center; }
.col { display: flex; flex-direction: column; align-items: center; flex: 1; }
.label { font-size: 24rpx; color: #999; margin-bottom: 10rpx; }
.val { font-size: 26rpx; font-weight: bold; }
.val.orange { color: #ff9800; }
.val.red { color: #ff3d00; }
.val.blue { color: #2979ff; }
.line { width: 1rpx; height: 60rpx; background: #eee; }

.row { padding: 20rpx 0; display: flex; align-items: center; font-size: 30rpx; color: #333; }
.row.sb { justify-content: space-between; }
.check { width: 40rpx; height: 40rpx; border-radius: 50%; border: 2rpx solid #ccc; display: flex; align-items: center; justify-content: center; color: transparent; }
.check.checked { background: #2979ff; border-color: #2979ff; color: white; font-size: 24rpx; }
.red { color: #ff3d00; }

.bill-card { background: white; margin: 20rpx 30rpx; border-radius: 16rpx; padding: 30rpx; position: relative; }
.bill-card::before {
  content: ''; position: absolute; top: -10rpx; left: 0; width: 100%; height: 20rpx; 
  background: radial-gradient(circle, transparent 10rpx, white 12rpx); background-size: 30rpx 30rpx; background-position: bottom;
}
.total-row { text-align: right; margin-top: 20rpx; border-top: 1rpx solid #eee; padding-top: 20rpx; font-size: 32rpx; }
.big-red { font-size: 40rpx; color: #ff3d00; font-weight: bold; }

.submit-btn { margin: 60rpx 30rpx; background: #ff5722; color: white; border-radius: 50rpx; }
</style>
