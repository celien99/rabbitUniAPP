<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { XtxGuessInstance } from '@/types/component'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
const hotList = ref<HotItem[]>([])
const getHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}
const guessRef = ref<XtxGuessInstance>()
// 下拉刷新状态
const isTriggered = ref(false)
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHotData()])
})
const onRefresherrefresh = async () => {
  console.log('66666')
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHotData()])
  isTriggered.value = false
}
</script>

<template>
  <view class="viewport">
    <CustomNavbar />
    <scroll-view
      refresher-enabled
      @refresherrefresh="onRefresherrefresh"
      :refresher-triggered="isTriggered"
      class="scroll-view"
      scroll-y
    >
      <XtxSwiper :list="bannerList" />
      <CategoryPanel :list="categoryList" />
      <HotPanel :list="hotList" />
      <XtxGuess ref="guessRef" />
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
