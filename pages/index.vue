<template>
  <v-container>
    <v-row>
      <v-container>
        <v-container>
          <v-text-field outlined label="検索フォーム製作中" append-icon="mdi-magnify" />
        </v-container>
      </v-container>
    </v-row>
    <v-row>
      <v-col cols="12" md="7">
        <blog-list />
      </v-col>
      <v-col cols="0" md="5" v-if="goodReplys">
        <v-container>
          <v-card color="basil">
            <v-card-title class="text-center justify-center py-6">
              <h1 class="font-weight-bold text-h5 primary--text">
                ユーザーランキング
              </h1>
            </v-card-title>
            <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" class="basil">
              <v-container>
                <v-tab-item>
                  <br>
                  <v-simple-table fixed-header height="600px">
                    <template #default>
                      <thead>
                        <tr>
                          <th class="text-center">
                            総合順位
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
                        <tr v-for="array in goodReplysRankingArraysAll" :key="array.goodedUserId">
                          <td class="text-center">
                            {{ rank(array.goodReplyCounts, goodReplysCountsArraysAll, 0) }}
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
                  <br>
                  <v-simple-table fixed-header height="600px">
                    <template #default>
                      <thead>
                        <tr>
                          <th class="text-center">
                            月間順位
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
                        <tr v-for="array in goodReplysRankingArraysMonth" :key="array.goodedUserId">
                          <td class="text-center">
                            {{ rank(array.goodReplyCounts, goodReplysCountsArraysMonth, 0) }}
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
                  <br>
                  <v-simple-table fixed-header height="600px">
                    <template #default>
                      <thead>
                        <tr>
                          <th class="text-center">
                            週刊順位
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
                        <tr v-for="array in goodReplysRankingArraysWeek" :key="array.goodedUserId">
                          <td class="text-center">
                            {{ rank(array.goodReplyCounts, goodReplysCountsArraysWeek, 0) }}
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
              </v-container>
            </v-tabs-items>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
    <v-fab-transition>
      <v-btn
        color="deep-orange darken-2"
        dark
        fixed
        absolute
        large
        bottom
        right
        fab
        to="/post"
        style="bottom: 50px"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      tab: null,
      items: [
        '総合', '月間', '週刊'
      ]
    }
  },
  computed: {
    avatars () {
      return this.$store.state.avatars.avatars
    },
    goodReplys () {
      return this.$store.state.goodReplys.goodReplys
    },
    goodReplysRankingArraysAll () {
      return this.$store.state.goodReplys.goodReplysRankingArraysAll
    },
    goodReplysCountsArraysAll () {
      return this.$store.state.goodReplys.goodReplysCountsArraysAll
    },
    goodReplysRankingArraysMonth () {
      return this.$store.state.goodReplys.goodReplysRankingArraysMonth
    },
    goodReplysCountsArraysMonth () {
      return this.$store.state.goodReplys.goodReplysCountsArraysMonth
    },
    goodReplysRankingArraysWeek () {
      return this.$store.state.goodReplys.goodReplysRankingArraysWeek
    },
    goodReplysCountsArraysWeek () {
      return this.$store.state.goodReplys.goodReplysCountsArraysWeek
    }
  },
  mounted () {
    this.$store.dispatch('goodReplys/init')
    this.$store.dispatch('goodReplys/rankingAll')
    this.$store.dispatch('goodReplys/rankingMonth')
    this.$store.dispatch('goodReplys/rankingWeek')
  },
  methods: {
    rank (value, arrs, updown) {
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
.primary--text {
  color: primary !important;
}
.noborder {
  border: 0px none;
}
</style>
