export type BannerItem = {
  hrefUrl: string
  id: string
  imgUrl: string
  type: number
}

export type CategoryItem = {
  icon: string
  id: string
  name: string
}

/** 首页-热门推荐数据类型 */
export type HotItem = {
  /** 说明 */
  alt: string
  /** id */
  id: string
  /** 图片集合[ 图片路径 ] */
  pictures: string[]
  /** 跳转地址 */
  target: string
  /** 标题 */
  title: string
  /** 推荐类型 */
  type: string
}
