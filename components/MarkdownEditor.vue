<template>
  <div class="markdown-editor">
    <no-ssr>
      <mavon-editor
        v-model="model"
        :toolbars="markdownOption"
        language="ja"
      />
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object | null,
      default: null
    }
  },
  data () {
    return {
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        htmlcode: true
      }
    }
  }
}
</script>

<style scoped>
  .markdown-editor {
    width: 100%;
    height: 100%;
  }
</style>
