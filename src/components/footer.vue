<template>
  <div class="footer_container">
    <span class="footer_text">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const textArr = [
      "生气是拿别人做错的事来惩罚自己",
      "一个人的快乐，不是因为他拥有的多，而是因为他计较的少",
      "骄傲是胜利下的蛋，孵出来的却是失败",
      "未必钱多乐便多，财多累己招烦恼。清贫乐道真自在，无牵无挂乐逍遥",
      "用最少的悔恨面对过去。用最多的梦面对未来",
      "爱的力量大到可以使人忘记一切，却又小到连一粒嫉妒的沙石也不能容纳",
      "每个人都有潜在的能量，只是很容易：被习惯所掩盖，被时间所迷离，被惰性所消磨",
      "上帝从不埋怨人们的愚昧，人们却埋怨上帝的不公平",
      "一千个人就有一千种生存方式和生活道路，要想改变一些事情，首先得把自己给找回来",
      "记住该记住的，忘记该忘记的。改变能改变的，接受不能改变的",
      "假如我不能，我一定要；假如我一定要，我就一定能",
      "一个能从别人的观念来看事情，能了解别人心灵活动的人，永远不必为自己的前途担心",
      "能冲刷一切的除了眼泪，就是时间，以时间来推移感情，时间越长，冲突越淡，仿佛不断稀释的茶",
      "真正的爱，应该超越生命的长度、心灵的宽度、灵魂的深度",
      "如果失去了顽强的意志，困难就会给你戴上枷锁",
      "内心的欢乐是一个人过着健全的、正常的、和谐的生活所感到的喜悦",
      "生前的赞扬往往虚假，死后的议论常常真实",
      "竭力履行你的义务，你应该就会知道，你到底有多大价值",
      "生命的多少用时间计算，生命的价值用贡献计算",
      "点燃了的火炬不是为了火炬本身，就像我们的美德应该超过自己照亮别人",
      "没有逻辑的正能量就是负能量",
    ];
    const text = textArr[Math.floor(Math.random() * textArr.length)];
    return {
      text,
    };
  },
});
</script>

<style scoped>
.footer_container {
  width: 100%;
  height: 60px;
  background-color: #409eff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.footer_text {
  font-size: 15px;
  color: #ffffff;
  padding-right: 20px;
}
</style>
