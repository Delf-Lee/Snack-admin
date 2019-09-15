<template>
  <div class="article-list">
    <custom-title title="에디터 어드민" />
    <!-- 탭 영역 -->
    <ul>
      <li><router-link :to="{ query: { type: 'news' }}">news(소식)</router-link></li>
      <li><router-link :to="{ query: { type: 'sub-news' }}">news(관련 소식)</router-link></li>
      <li><router-link  :to="{ query: { type: 'picks' }}">picks(아티클)</router-link></li>
    </ul>
    <!-- // 탭 영역 -->
    <!-- 버튼 영역 -->
    <div class="article-list__button-wrapper">
      <router-link :to="{ name: 'ArticleForm' }">소식 작성</router-link>
    </div>
    <!-- // 버튼 영역 -->
    <article-list-table :news="news"/>
    <b-pagination v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  :align="'center'"
                  aria-controls="my-table" />
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import ArticleListTable from "@/components/ArticleListTable/ArticleListTable.vue";
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";
  import { fetchNewsList } from "@/api";
  import { parseISO } from "@/utilities/parse-iso";


  Component.registerHooks([
    'beforeRouteEnter',
  ]);
  @Component({
    components: {
      CustomButton,
      CustomTitle,
      ArticleListTable
    }
  })
  export default class ArticleList extends Vue {
    news: INews[];
    currentPage: number;
    rows: number;
    perPage: number;

    constructor () {
      super();
      this.news = [];
      this.currentPage = 1;
      this.rows = 100;
      this.perPage = 10;
    }
    async created () {
      if (!this.$route.query.type) {
        this.$router.replace({ query: { type: 'news' }});
      }
      const startDateTime = parseISO(new Date("2019/08/05/00:00:00"));
      const endDateTime = parseISO(new Date("2019/08/12/11:59:59"));
      const response = await fetchNewsList({ startDateTime, endDateTime });
      this.news = response;
    }

  }
</script>
<style lang="scss" scoped>
  .article-list {
    position: relative;
    ul {
      overflow: hidden;
      margin-bottom: 63px;
      li {
        float: left;
        margin-right: 26px;
        a {
          font-size: 22px;
          font-weight: normal;
          color: #c8c5c5;
          &.router-link-exact-active {
            color: #0f0f0f;
          }
        }
      }
    }
    .article-list__button-wrapper {
      margin-bottom: 92px;
      text-align: right;
      a {
        padding: 13px 31px 11px;
        font-size: 18px;
        color: #fff;
        background-color: #3559e4;
      }
    }
    .article-list__pagination-wrapper {
      text-align: center;
    }
  }
</style>
