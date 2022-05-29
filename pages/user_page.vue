<template>
  <v-container>
    <v-row justify="center">
      <user-avatar-big :id="userId" class="my-15" :name="userName" />
    </v-row>
    <v-row justify="center">
      <div class="mb-15 text-h4">
        {{ userName }}
      </div>
    </v-row>
    <div class="mb-10">
      <v-row justify="center">
        <v-chip v-if="rankingChip && goodReplysRankingArraysAllForThisUser[0]" class="mb-5" color="red" label outlined>
          ユーザーランキング&emsp;総合&emsp;{{ rank(goodReplysRankingArraysAllForThisUser[0].goodReplyCounts, goodReplysCountsArraysAll, 0) }}&emsp;位
        </v-chip>
      </v-row>
      <v-row justify="center">
        <v-chip v-if="rankingChip && goodReplysRankingArraysMonthForThisUser[0]" class="mb-5" color="orange" label outlined>
          ユーザーランキング&emsp;月間&emsp;{{ rank(goodReplysRankingArraysMonthForThisUser[0].goodReplyCounts, goodReplysCountsArraysMonth, 0) }}&emsp;位
        </v-chip>
      </v-row>
      <v-row justify="center">
        <v-chip v-if="rankingChip && goodReplysRankingArraysWeekForThisUser[0]" class="mb-5" color="green" label outlined>
          ユーザーランキング&emsp;週刊&emsp;{{ rank(goodReplysRankingArraysWeekForThisUser[0].goodReplyCounts, goodReplysCountsArraysWeek, 0) }}&emsp;位
        </v-chip>
      </v-row>
    </div>
    <v-row dense>
      <v-col cols="12">
        <v-card color="blue lighten-5">
          <v-toolbar dark color="blue darken-4">
            <v-toolbar-title class="mx-auto">
              自己紹介・曲紹介
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="avatar" class="content ql-editor" v-html="avatar[0].content" />
        </v-card>
      </v-col>
    </v-row>
    <br><br>
    <v-row>
      <own-questions-and-comments :userid="userId" />
    </v-row>
    <br>
  </v-container>
</template>

<script>
import OwnQuestionsAndComments from '~/components/OwnQuestionsAndComments.vue'
export default {
  name: 'UserPage',
  components: { OwnQuestionsAndComments },
  data () {
    return {
      userId: '',
      userName: '',
      rankingChip: true
    }
  },
  computed: {
    avatars () {
      return this.$store.state.avatars.avatars
    },
    avatar () {
      const avatar = this.avatars.filter((avatar) => {
        return avatar.user_id === this.userId
      })
      if (avatar.length === 0) {
        return 0
      } else {
        return avatar
      }
    },
    goodReplysRankingArraysAll () {
      return this.$store.state.goodReplys.goodReplysRankingArraysAll
    },
    goodReplysRankingArraysAllForThisUser () {
      const thisUser = this.goodReplysRankingArraysAll.filter((user) => {
        return user.goodedUserId === this.userId
      })
      if (thisUser.length === 0) {
        return 0
      } else {
        return thisUser
      }
    },
    goodReplysCountsArraysAll () {
      return this.$store.state.goodReplys.goodReplysCountsArraysAll
    },
    goodReplysRankingArraysMonth () {
      return this.$store.state.goodReplys.goodReplysRankingArraysMonth
    },
    goodReplysRankingArraysMonthForThisUser () {
      const thisUser = this.goodReplysRankingArraysMonth.filter((user) => {
        return user.goodedUserId === this.userId
      })
      if (thisUser.length === 0) {
        return 0
      } else {
        return thisUser
      }
    },
    goodReplysCountsArraysMonth () {
      return this.$store.state.goodReplys.goodReplysCountsArraysMonth
    },
    goodReplysRankingArraysWeek () {
      return this.$store.state.goodReplys.goodReplysRankingArraysWeek
    },
    goodReplysRankingArraysWeekForThisUser () {
      const thisUser = this.goodReplysRankingArraysWeek.filter((user) => {
        return user.goodedUserId === this.userId
      })
      if (thisUser.length === 0) {
        return 0
      } else {
        return thisUser
      }
    },
    goodReplysCountsArraysWeek () {
      return this.$store.state.goodReplys.goodReplysCountsArraysWeek
    }
  },
  mounted () {
    this.userId = this.$route.query.userId
    this.userName = this.$route.query.userName
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

<style>

</style>
