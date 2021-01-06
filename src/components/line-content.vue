<template>
  <div class="line-content">
    <span v-for="(item, index) in content" :key="index" :style="item.css">{{
      item.text
    }}</span>
  </div>
</template>
<script>
export default {
  name: 'LineContent',
  props: {
    /**
     * log text content
     */
    content: Array
  }
}
</script>
