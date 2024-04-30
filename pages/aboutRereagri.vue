<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-data-table
          :headers="headers"
          :items="items"
          :disable-pagination="true"
          :hide-default-footer="true"
        ></v-data-table>
      </v-col>
    </v-row>
    <br>
    <!-- <v-data-table
    :headers="headers"
    :items="items"
    item-key="item"
    ></v-data-table> -->
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: '項目', value: 'item', width: '30%' },
        { text: '内容', value: 'content', width: '70%' }
      ],
      items: [
        {
          item: '名称',
          content: '一般社団法人リリアグリ'
        },
        // {
        //   item: '(Name)',
        //   content: 'Rebuild and Reactivate Agriculture General Incorporated Association（REREAGRI）'
        // },
        {
          item: '所在地',
          content: '〒285-0850千葉県佐倉市西ユーカリが丘一丁目6番地3'
        },
        // {
        //   item: '(Location)',
        //   content: '1-6-3 Nishiyukarigaoka, Sakura-city, Chiba 285-0850, Japan'
        // },
        {
          item: '法人設立の年月日',
          content: '令和2（2020）年5月29日'
        },
        // {
        //   item: '(Date of establishment)',
        //   content: 'May 29, 2020'
        // },
        {
          item: '代表理事',
          content: '内藤 晋介'
        },
        // {
        //   item: '(Representative Director)',
        //   content: 'NAITOH Shinsuke'
        // },
        {
          item: '電話番号',
          content: '050-5896-0293'
        },
        {
          item: '受付時間',
          content: '受付時間 平日18:00-20:00 土・日・祝日9:00-18:00'
        },
        {
          item: '事業内容',
          content: '(1)農林水産物及び食品の生産、加工、販売、輸出入 (2)地域特産物の生産、加工、販売、輸出入 (3)電子商取引（EC）サイトの企画、制作、販売、運営、管理 (4)ウェブサイトの企画、制作、販売、運営、管理 (5)農林水産業、食品産業及び地域活性化に関するコンサルティング (6)農林水産業、食品産業及び地域活性化に関する調査、研究 (7)地域活性化に関する事業の企画、制作、運営 (8)前各号に附帯又は関連する事業'
        }
        // {
        //   item: '(Business Description)',
        //   content: '(1) Production, processing, sales, import and export of agricultural, forestry and marine products and food products (2) Production, processing, sales, import and export of local specialties (3) Planning, production, sales, operation, and management of electronic commerce (EC) sites (4) Planning, production, sales, operation and management of the website (5) Consulting on agriculture, forestry and fisheries, food industry and regional revitalization (6) Research and study on agriculture, forestry and fisheries, food industry and regional revitalization (7) Planning, production and operation of projects related to regional revitalization (8) Projects incidental or related to the above'
        // }
      ]
    }
  }
}
</script>

<style>

</style>
