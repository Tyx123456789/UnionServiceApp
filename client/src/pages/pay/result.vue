<template>
  <view class="result-page">
    <view class="blue-area">
      <view class="status-box">
        <view class="icon-check">✔</view>
        <view class="right-txt">
          <text class="h1">支付成功!</text>
          <text class="h2">感谢您的购买</text>
        </view>
      </view>
    </view>

    <view class="receipt-card">
      <view class="amount">¥ {{price}}</view>
      <view class="divider"></view>
      <view class="info-row">
        <text class="label">订单编号：</text>
        <text class="val">{{orderId}}</text>
      </view>
      <view class="info-row">
        <text class="label">下单时间：</text>
        <text class="val">{{orderTime}}</text>
      </view>
      <view class="info-row">
        <text class="label">支付方式：</text>
        <text class="val">会员积分</text>
      </view>
      <view class="info-row">
        <text class="label">订单状态：</text>
        <text class="val">下单成功即将发货</text>
      </view>
    </view>

    <button class="detail-btn" @click="viewDetail">订单详情</button>
    <view class="tip">点击按钮，即可查看支付信用凭证</view>
    
    <button class="home-btn" @click="goHome">返回首页</button>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const orderId = ref('')
const price = ref('0.00')
const orderTime = ref('')

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  orderId.value = currentPage.options?.orderId || generateOrderId()
  price.value = currentPage.options?.price || '150.5'
  orderTime.value = formatDateTime(new Date())
})

const generateOrderId = () => {
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

const viewDetail = () => {
  uni.showToast({ title: '查看订单详情', icon: 'none' })
}

const goHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
.result-page { background: #f5f5f5; min-height: 100vh; display: flex; flex-direction: column; align-items: center; }
.blue-area { width: 100%; height: 350rpx; background: #0091ff; display: flex; justify-content: center; padding-top: 60rpx; }
.status-box { display: flex; align-items: center; color: white; gap: 30rpx; }
.icon-check { width: 100rpx; height: 100rpx; background: white; border-radius: 50%; color: #0091ff; font-size: 60rpx; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 0 20rpx rgba(255,255,255,0.5); }
.right-txt { display: flex; flex-direction: column; }
.h1 { font-size: 40rpx; font-weight: bold; margin-bottom: 10rpx; }
.h2 { font-size: 28rpx; opacity: 0.8; }

.receipt-card { width: 690rpx; background: white; margin-top: -100rpx; border-radius: 12rpx; padding: 60rpx 40rpx; box-sizing: border-box; box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.05); }
.amount { font-size: 60rpx; color: #333; text-align: center; font-weight: 500; margin-bottom: 40rpx; }
.divider { height: 1rpx; background: #eee; margin-bottom: 40rpx; }
.info-row { display: flex; margin-bottom: 30rpx; font-size: 28rpx; color: #666; }
.label { width: 160rpx; }
.val { flex: 1; color: #333; }

.detail-btn { width: 600rpx; height: 90rpx; line-height: 90rpx; background: #0091ff; color: white; border-radius: 45rpx; margin-top: 80rpx; font-size: 32rpx; }
.tip { margin-top: 20rpx; font-size: 24rpx; color: #ccc; }

.home-btn { width: 600rpx; height: 90rpx; line-height: 90rpx; background: white; color: #0091ff; border: 2rpx solid #0091ff; border-radius: 45rpx; margin-top: 30rpx; font-size: 32rpx; }
</style>
