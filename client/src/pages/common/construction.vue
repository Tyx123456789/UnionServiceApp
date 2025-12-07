<template>
  <view class="container">
    <view class="icon">🚧</view>
    <text class="text">该模块还在开发中...</text>
    <text class="sub-text">We are working hard on this feature</text>
    <button class="btn" @click="goHome">返回主页</button>
  </view>
</template>

<script setup>
const goHome = () => uni.switchTab({ url: '/pages/index/index' })
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f6fa;
}
.icon {
  font-size: 100rpx;
  margin-bottom: 40rpx;
}
.text {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}
.sub-text {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 60rpx;
}
.btn {
  background: #0091ff;
  color: white;
  padding: 0 60rpx;
  border-radius: 40rpx;
  font-size: 30rpx;
}
</style>
