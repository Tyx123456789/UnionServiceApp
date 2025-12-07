<template>
  <view class="detail-page">
    <image class="hero-img" :src="product.img || '/static/cake.jpg'" mode="aspectFill"></image>
    
    <view class="info-card">
      <view class="header-row">
        <text class="prod-title">{{product.name}}</text>
      </view>
      <view class="tags-row">
        <text v-for="(tag, index) in (product.tags || [])" :key="index" :class="index % 2 === 0 ? 'blue-tag' : 'orange-tag'">{{tag}}</text>
      </view>
      <view class="price-box">
        <text class="curr-price"><text class="symbol">¥</text>{{product.price}}</text>
        <text class="orig-price">¥{{product.originalPrice}}</text>
      </view>
      <view class="meta-row">
        <text>月销量排名 {{16 - (product.id || 0)}}名</text>
        <text>规格 {{product.specs || '标准'}}</text>
        <text>已售 {{product.sales}}份</text>
      </view>
    </view>
    
    <view class="cell mt-20">
      <text class="label">配送费</text>
      <text class="val">¥{{product.deliveryFee || '0.00'}}</text>
    </view>
    <view class="cell">
      <text class="label">配送时间</text>
      <text class="val">{{product.deliveryTime || '今日送达'}}</text>
      <text class="arrow">></text>
    </view>

    <view class="action-bar">
      <view class="icons">
        <view class="icon-col"><text>❤</text><text class="txt">收藏</text></view>
        <view class="icon-col"><text>🔗</text><text class="txt">分享</text></view>
      </view>
      <view class="btns">
        <view class="btn cart" @click="addCart">加入购物车</view>
        <view class="btn buy" @click="goOrder">马上购买</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { products } from '@/common/mockData.js'

const product = ref({})
const productId = ref(1)

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  productId.value = parseInt(currentPage.options?.id || 1)
  
  const found = products.find(p => p.id === productId.value)
  if (found) {
    product.value = found
  } else {
    product.value = products[0]
  }
})

const addCart = () => {
  uni.showToast({ title: '已加入购物车', icon: 'success' })
}

const goOrder = () => {
  uni.navigateTo({ 
    url: `/pages/order/submit?id=${product.value.id}&price=${product.value.price}&name=${encodeURIComponent(product.value.name)}` 
  })
}
</script>

<style scoped>
.detail-page { background: #f5f5f5; padding-bottom: 120rpx; }
.hero-img { width: 100%; height: 500rpx; background: white; }
.info-card { background: white; padding: 30rpx; margin-bottom: 20rpx; }
.prod-title { font-size: 36rpx; font-weight: bold; color: #333; }
.tags-row { margin: 20rpx 0; display: flex; gap: 10rpx; }
.blue-tag { background: #e3f2fd; color: #2196f3; font-size: 20rpx; padding: 4rpx 10rpx; border-radius: 4rpx; }
.orange-tag { background: #fff3e0; color: #ff9800; font-size: 20rpx; padding: 4rpx 10rpx; border-radius: 4rpx; }
.price-box { margin-bottom: 20rpx; display: flex; align-items: baseline; }
.curr-price { color: #ff5733; font-size: 48rpx; font-weight: bold; margin-right: 20rpx; }
.symbol { font-size: 28rpx; }
.orig-price { color: #999; text-decoration: line-through; font-size: 28rpx; }
.meta-row { display: flex; justify-content: space-between; color: #999; font-size: 24rpx; }

.cell { background: white; padding: 30rpx; display: flex; justify-content: space-between; border-bottom: 1rpx solid #f5f5f5; font-size: 28rpx; color: #333; }
.mt-20 { margin-top: 20rpx; }
.val { flex: 1; text-align: right; margin-right: 10rpx; color: #666; }
.arrow { color: #ccc; }

.action-bar { position: fixed; bottom: 0; width: 100%; background: white; height: 100rpx; display: flex; box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05); }
.icons { width: 30%; display: flex; justify-content: space-around; align-items: center; }
.icon-col { display: flex; flex-direction: column; align-items: center; font-size: 20rpx; color: #666; }
.btns { flex: 1; display: flex; align-items: center; padding-right: 20rpx; }
.btn { flex: 1; text-align: center; height: 70rpx; line-height: 70rpx; color: white; font-size: 28rpx; }
.btn.cart { background: #4facfe; border-top-left-radius: 35rpx; border-bottom-left-radius: 35rpx; }
.btn.buy { background: #007aff; border-top-right-radius: 35rpx; border-bottom-right-radius: 35rpx; }
</style>
