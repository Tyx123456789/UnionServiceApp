<template>
  <view class="mall-page">
    <view class="sticky-header">
      <view class="search-bar">
        <view class="search-input">
          <text class="icon-search">🔍</text>
          <text class="placeholder">搜索</text>
        </view>
        <text class="scan-icon">📷</text>
      </view>
      <view class="tabs">
        <text :class="['tab', currentTab === 0 ? 'active' : '']" @click="currentTab = 0">美食</text>
        <text :class="['tab', currentTab === 1 ? 'active' : '']" @click="currentTab = 1">职工健康</text>
        <text :class="['tab', currentTab === 2 ? 'active' : '']" @click="currentTab = 2">保险</text>
      </view>
    </view>

    <view class="ad-banner">
      <view class="ad-content">
        <text class="ad-title">职工普惠 幸福加倍</text>
      </view>
    </view>

    <view class="filter-bar">
      <text class="filter-item bold">综合 ⌄</text>
      <text class="filter-item">全部分类 ⌄</text>
      <text class="filter-item">排序 ⌄</text>
    </view>

    <view class="goods-list">
      <view class="goods-item" v-for="(item, i) in goods" :key="i" @click="goDetail(item.id)">
        <image class="thumb" :src="item.img" mode="aspectFill"></image>
        <view class="info">
          <text class="title">{{item.name}}</text>
          <view class="rating-row">
            <text class="stars">⭐⭐⭐⭐⭐ {{item.rating}}</text>
            <text class="sales">销量{{item.sales}}</text>
          </view>
          <view class="price-row">
            <text class="unit">¥</text>
            <text class="price">{{item.price}}</text>
            <text class="suffix">/人</text>
            <text class="dist">0.3km</text>
          </view>
          <view class="tags">
            <text class="tag orange">会员价3折</text>
            <text class="tag plain">满60减10</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { products } from '@/common/mockData.js'

const currentTab = ref(0)
const goods = ref([])

onMounted(() => {
  // Simulate API fetch
  goods.value = products
})

const goDetail = (id) => uni.navigateTo({ url: `/pages/product/detail?id=${id}` })
</script>

<style scoped>
.mall-page { background: #f5f5f5; min-height: 100vh; }
.sticky-header { background: white; padding: 20rpx 24rpx 0; }
.search-bar { display: flex; align-items: center; gap: 20rpx; margin-bottom: 20rpx; }
.search-input { flex: 1; background: #f0f0f0; height: 72rpx; border-radius: 36rpx; display: flex; align-items: center; justify-content: center; color: #999; font-size: 28rpx; }
.icon-search { margin-right: 10rpx; }
.scan-icon { font-size: 40rpx; }
.tabs { display: flex; justify-content: space-around; padding-bottom: 10rpx; }
.tab { font-size: 30rpx; padding: 10rpx 0; color: #666; position: relative; }
.tab.active { color: #ff5733; font-weight: bold; }
.tab.active::after { content: ''; position: absolute; bottom: 0; left: 20%; width: 60%; height: 6rpx; background: #ff5733; border-radius: 6rpx; }

.ad-banner { padding: 20rpx 24rpx; }
.ad-content { height: 180rpx; background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); border-radius: 16rpx; display: flex; align-items: center; justify-content: center; color: white; font-size: 40rpx; font-weight: bold; font-style: italic; }

.filter-bar { display: flex; justify-content: space-between; padding: 20rpx 40rpx; background: white; font-size: 28rpx; color: #666; border-bottom: 1rpx solid #eee; }
.filter-item.bold { color: #333; font-weight: bold; }

.goods-list { padding: 0 24rpx; background: white; }
.goods-item { display: flex; padding: 30rpx 0; border-bottom: 1rpx solid #f5f5f5; }
.thumb { width: 180rpx; height: 180rpx; border-radius: 12rpx; background: #eee; margin-right: 20rpx; }
.info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.title { font-size: 32rpx; font-weight: bold; color: #333; }
.rating-row { font-size: 24rpx; color: #666; display: flex; gap: 20rpx; }
.stars { color: #ff9900; }
.price-row { display: flex; align-items: baseline; }
.unit { color: #ff5733; font-size: 24rpx; }
.price { color: #ff5733; font-size: 40rpx; font-weight: bold; margin-right: 4rpx; }
.suffix { color: #ff5733; font-size: 24rpx; }
.dist { margin-left: auto; color: #999; font-size: 24rpx; }
.tags { display: flex; gap: 10rpx; }
.tag { font-size: 20rpx; padding: 2rpx 8rpx; border-radius: 6rpx; }
.tag.orange { border: 1rpx solid #ff5733; color: #ff5733; }
.tag.plain { border: 1rpx solid #ff9900; color: #ff9900; }
</style>
