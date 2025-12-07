<template>
  <view class="page-container">
    <view class="header-bg">
      <view class="nav-title">维护职工合法权益<br>竭诚服务职工群体</view>
    </view>

    <view class="menu-card">
      <view class="menu-grid">
        <view class="menu-item" v-for="(item, index) in menuList" :key="index" @click="handleMenuClick(item)">
          <view class="icon-circle" :style="{background: item.color}">
            <text class="emoji">{{item.icon}}</text>
          </view>
          <text class="menu-text">{{item.name}}</text>
        </view>
      </view>
    </view>

    <view class="banner-box">
      <view class="banner-content">
        <text class="banner-tag">职工活动</text>
        <text class="banner-text">普惠服务，赋能美好生活</text>
      </view>
    </view>

    <view class="section-row">
      <view class="big-card" @click="goMall">
        <text class="card-title">职工福利专区</text>
        <text class="card-sub">普惠服务，赋能美好生活</text>
      </view>
      <view class="right-col">
        <view class="small-card blue">
          <text class="card-title">资讯</text>
          <text class="card-sub">实时掌握</text>
        </view>
        <view class="small-card purple">
          <text class="card-title">申请服务</text>
          <text class="card-sub">省心便捷</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const menuList = ref([
  { name: '入会服务', icon: '❤', color: '#ff6b6b', link: '/pages/common/construction' },
  { name: '办事大厅', icon: '🏛', color: '#4ecdc4', link: '/pages/common/construction' },
  { name: '维权咨询', icon: '⚖', color: '#ff9f43', link: '/pages/common/construction' },
  { name: '会员活动', icon: '🎭', color: '#ff9ff3', link: '/pages/common/construction' },
  { name: '福利商城', icon: '🛍', color: '#54a0ff', link: '/pages/mall/mall' },
  { name: '普惠服务', icon: '🎁', color: '#ff6b6b', link: '/pages/mall/mall' },
  { name: '党建天地', icon: '⭐', color: '#ff6b6b', link: '/pages/common/construction' },
  { name: '通知公告', icon: '📢', color: '#5f27cd', link: '/pages/common/construction' },
])

const handleMenuClick = (item) => {
  if (item.link) {
    if (item.link.includes('/pages/mall/mall')) {
      uni.switchTab({ url: item.link })
    } else {
      uni.navigateTo({ url: item.link })
    }
  } else {
    uni.showToast({ title: item.name, icon: 'none' })
  }
}

const goMall = () => {
  uni.switchTab({ url: '/pages/mall/mall' })
}
</script>

<style scoped>
.page-container { background: #f5f5f5; min-height: 100vh; padding-bottom: 20rpx; }
.header-bg {
  height: 380rpx;
  background: linear-gradient(180deg, #63c2ff 0%, #0091ff 100%);
  padding: 100rpx 40rpx 0;
  color: white;
}
.nav-title { font-size: 40rpx; font-weight: bold; line-height: 1.4; }
.menu-card {
  background: white; margin: -100rpx 24rpx 20rpx; border-radius: 20rpx; padding: 30rpx 0;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
}
.menu-grid { display: flex; flex-wrap: wrap; }
.menu-item { width: 25%; display: flex; flex-direction: column; align-items: center; margin-bottom: 30rpx; }
.icon-circle { width: 80rpx; height: 80rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 10rpx; }
.emoji { color: white; font-size: 40rpx; }
.menu-text { font-size: 24rpx; color: #333; }

.banner-box { margin: 0 24rpx 20rpx; height: 160rpx; background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%); border-radius: 16rpx; display: flex; align-items: center; padding: 0 40rpx; position: relative; overflow: hidden; }
.banner-tag { background: #ff0000; color: white; padding: 4rpx 10rpx; font-size: 24rpx; border-radius: 8rpx; margin-right: 20rpx; font-weight: bold; }
.banner-text { color: #d32f2f; font-weight: bold; font-size: 32rpx; }

.section-row { display: flex; padding: 0 24rpx; gap: 20rpx; }
.big-card { flex: 1; background: #fff5f0; padding: 30rpx; border-radius: 16rpx; height: 300rpx; position: relative; }
.right-col { flex: 1; display: flex; flex-direction: column; gap: 20rpx; }
.small-card { flex: 1; background: white; padding: 20rpx; border-radius: 16rpx; }
.small-card.blue { background: #e3f2fd; }
.small-card.purple { background: #f3e5f5; }
.card-title { font-size: 32rpx; font-weight: bold; display: block; margin-bottom: 10rpx; color: #333; }
.card-sub { font-size: 24rpx; color: #666; }
</style>
