<template>
  <div class="mavonEditor">
    <no-ssr>
      <mavon-editor v-model="handbook" :toolbars="markdownOption" :language="'ja'" />
    </no-ssr>
  </div>
</template>
<script>
export default {
  data () {
    return {
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: true,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true
      },
      handbook: '#### Markdown'
    }
  }
}
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
