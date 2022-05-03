<template>
  <v-container>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-h5 basil--text">
          いいねランキング
        </h1>
      </v-card-title>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-container>
          <v-tab-item>
            <br>
            <v-simple-table fixed-header height="600px">
              <template #default>
                <thead>
                  <tr>
                    <th class="text-center">
                      順位
                    </th>
                    <th class="text-center">
                      アイコン
                    </th>
                    <th class="text-center">
                      ハンドルネーム
                    </th>
                    <th class="text-center">
                      いいね数
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="array in goodReplysRankingArrays" :key="array.goodReplyCounts">
                    <td class="text-center">
                      <!-- {{ index + 1 }} -->
                      {{ rank(array.goodReplyCounts, goodReplysCountsArrays, 0) }}
                    </td>
                    <td class="text-center">
                      <user-avatar :id="array.goodedUserId" :name="array.displayName.toString()" />
                    </td>
                    <td class="text-center">
                      {{ array.displayName }}
                    </td>
                    <td class="text-center">
                      {{ array.goodReplyCounts }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>月間</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>週刊</v-card-text>
            </v-card>
          </v-tab-item>
        </v-container>
      </v-tabs-items>
    </v-card>
    <br>
  </v-container>
</template>

<script>
export default {
  name: 'UserRanking',
  data () {
    return {
      tab: null,
      items: [
        '総合', '月間', '週刊'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  computed: {
    avatars () {
      return this.$store.state.avatars.avatars
    },
    goodReplys () {
      return this.$store.state.goodReplys.goodReplys
    },
    goodReplysRankingArrays () {
      return this.$store.state.goodReplys.goodReplysRankingArraysAll
    },
    goodReplysCountsArrays () {
      return this.$store.state.goodReplys.goodReplysCountsArrays
    }
  },
  mounted () {
    this.$store.dispatch('goodReplys/rankingAll')
  },
  methods: {
    rank (value, arrs, updown) {
      // let i, thisrank, arrayLength, sign
      if (typeof (updown) === 'undefined') {
        updown = 0
      }
      const sign = updown === 0 ? 1 : -1
      let thisrank = 1
      const arrayLength = arrs.length
      for (let i = 0; i < arrayLength; i++) {
        if (sign * (arrs[i] - value) > 0) {
          thisrank++
        }
      }
      return thisrank
    }
  }
}
</script>

<style scoped>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
.noborder {
  border: 0px none;
}
</style>
