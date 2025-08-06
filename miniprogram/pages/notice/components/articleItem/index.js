// pages/notice/components/articleItem/index.ts
import { ComponentWithComputed } from "miniprogram-computed";
import router from "../../../../utils/router";

function formatRelativeDate(timeStr) {
  // 将输入时间字符串转为 Date 对象（自动处理本地时区）
  const inputDate = new Date(timeStr.replace(' ', 'T'));
  const now = new Date();

  // 辅助函数：比较两个日期的年月日是否相同
  const isSameDay = (d1, d2) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // 辅助函数：判断是否是昨天
  const isYesterday = (d1, d2) => {
    const yesterday = new Date(d2);
    yesterday.setDate(d2.getDate() - 1);
    return isSameDay(d1, yesterday);
  };

  // 判断逻辑
  if (isSameDay(inputDate, now)) {
    return '今天';
  } else if (isYesterday(inputDate, now)) {
    return '昨天';
  } else if (inputDate.getFullYear() === now.getFullYear()) {
    // 今年内的日期格式化（不补零）
    return `${inputDate.getMonth() + 1}月${inputDate.getDate()}日`;
  } else {
    // 非今年的完整日期格式（不补零）
    return `${inputDate.getFullYear()}年${inputDate.getMonth() + 1}月${inputDate.getDate()}日`;
  }
}

ComponentWithComputed({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      tyep: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  computed: {
    showTime(data) {
      const {create_time} = data.item
      if (create_time) {
        return formatRelativeDate(create_time)
      }
      return ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToWebView() {
      router.navigateTo({
        url: `/pages/webView/webView?url=${encodeURIComponent(this.data.item.url)}`
      })
    }
  }
})