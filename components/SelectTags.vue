<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header color="orange" class="white--text">
        タグの選択
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-chip-group
          v-model="tagIndex"
          column
          multiple
          max="5"
        >
          <v-chip
            v-for="tag in tags"
            :key="tag.id"
            filter
            outlined
            @click="childTagSend(tag.id)"
          >
            {{ tag.tagName }}
          </v-chip>
        </v-chip-group>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'SelectTags',
  props: {
  },
  data () {
    return {
      tagIndex: []
    }
  },
  computed: {
    tags () {
      return this.$store.state.tags.tags
    }
  },
  mounted () {
  },
  methods: {
    childTagSend (tagId) {
      this.$emit('catchTag', tagId)
    }
  }
}
</script>

<style scoped>
</style>
