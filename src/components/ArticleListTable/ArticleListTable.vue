<template>
  <div class="article-list-table">
    <table>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">TOP</th>
          <th scope="col">카테고리</th>
          <th scope="col">토픽(회사)</th>
          <th scope="col">제목</th>
          <th scope="col">생성일</th>
          <th scope="col">수정일</th>
          <th scope="col">업로드 예약일</th>
          <th scope="col">수정/삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in news" :key="item.key">
          <td>{{ item.key }}</td>
          <td>TOP</td>
          <td>카테고리</td>
          <td>토픽(회사)</td>
          <td>{{ item.title }}</td>
          <td>{{ item.createdDate }}</td>
          <td>수정일</td>
          <td>업로드 예약일</td>
          <td>
            <button type="button">삭제</button>
          </td>
        </tr>
        <tr v-if="news.length === 0">
          <td colspan="9" class="is-empty">생성된 뉴스가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class ArticleListTable extends Vue {
    @Prop() news!: INews[];
    constructor () {
      super();
    }

  }
</script>
<style lang="scss" scoped>
  .article-list-table {
    margin-bottom: 40px;
    table{
      text-align: left;
      thead {
        th {
          padding: 7px 5px;
          font-size: 18px;
          font-weight: normal;
          color: #0f0f0f;
        }
      }
      tbody {
        td {
          padding: 7px 5px;
          font-size: 14px;
          font-weight: normal;
          color: #0f0f0f;
          button {
            color: #f10202;
          }
          &.is-empty {
            padding: 40px 0;
            font-size: 16px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
