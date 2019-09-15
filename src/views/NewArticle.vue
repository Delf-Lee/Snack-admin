<template>
  <div class="new-article">
    <custom-title title="에디터 어드민 - 소식 작성" />
    <form @submit.prevent="onSubmitHandler">
      <!-- 입력 폼 레이아웃 -->
      <div class="new-article__form-layout">
        <div class="input-form has-paragraph">
          <label>
            <strong>제목</strong>
            <input type="text" v-model="title" />
            <p>가이드 : N자가 넘어가면 모바일에서 줄바꿈이 많이 일어나니 참고해주세요.</p>
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>날짜</strong>
            <date-picker v-model="date" />
            <p>가이드 : 발행하는 '주(week)'를 위해 설정하는 작업입니다. 선택 안할 시 디폴트는 작성 완료 시간 및 해당 주입니다.</p>
          </label>
        </div>

        <div class="input-form">
          <label>
            <strong>카테고리</strong>
            <select v-model="category">
              <option :key="option.value" v-for="option in options" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>목차링크</strong>
            <input type="text" v-model="topicLink" />
            <p>가이드 : 고유한 링크를 만들어 목차를 생성하는 작업이라 중요합니다. 공유할 때도 고유링크를 사용합니다.</p>
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>토픽(회사)</strong>
            <input type="text" v-model="topic" />
            <p>제한은 없으나, 가이드를 참조해주세요. <a>가이드 바로가기</a></p>
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>본문</strong>
            <editor v-model="contents" />
            <p>제한은 없으나, 가이드를 참조해주세요. <a>가이드 바로가기</a></p>
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>참고 링크</strong>
            <input type="text" v-model="link" />
            <p>가이드 : 이 소식을 작성하기 위해 참고한 뉴스링크나 소식링크가 있으면 적어주세요. 없으면 UI에 나타나지 않습니다.</p>
          </label>
        </div>

        <div class="input-form has-paragraph">
          <label>
            <strong>예약업로드</strong>
            <date-picker v-model="reservedDate" />
            <p>설정한 날짜에 업로드 됩니다.</p>
          </label>
        </div>
      </div>
      <!-- // 입력 폼 레이아웃 -->
      <!-- 미리보기 레이아웃 -->
      <div class="new-article__preview-layout">
        <strong>가이드 이미지 보기</strong>
        <div></div>
      </div>
      <!-- // 미리보기 레이아웃 -->
      <!-- 버튼 레이아웃 -->
      <div class="new-article__button-layout">
        <custom-button :type="'submit'" :size="'l'">
          작성 완료
        </custom-button>
        <custom-button :type="'cancel'" :size="'l'" :color="'type03'">
          취소
        </custom-button>
      </div>
      <!-- // 버튼 레이아웃 -->
    </form>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import DatePicker from "@/components/Utils/DatePicker/DatePicker.vue";
  import CustomTitle from "@/components/Utils/CustomTitle/CustomTitle.vue";
  import Editor from "@/components/Editor.vue";
  import CustomButton from "@/components/Utils/CustomButton/CustomButton.vue";
  import { createNews } from "@/api";
  import { INullable } from "@/@types/utility";
  import { OutputData } from "@editorjs/editorjs/types/data-formats/output-data";

  // @TODO 이후 데이터로 변경
  const options = [
    { value: "IT", text: "IT" }
  ];
  @Component({
    components: {
      CustomButton,
      CustomTitle,
      DatePicker,
      Editor
    }
  })
  export default class NewArticle extends Vue {
    title: string;
    date: INullable<Date>;
    link: string;
    topic: string;
    options: { value: string; text: string; }[];
    reservedDate: INullable<Date>;
    contents: OutputData["blocks"];
    output: string;
    topicLink: string;
    category: string;

    constructor() {
      super();
      this.title = "";
      this.date = null;
      this.link = "";
      this.topic = "";
      this.reservedDate = null;
      this.options = options;
      this.contents = [];
      this.output = "";
      this.topicLink = "";
      this.category = "";
    }
    onSubmitHandler (): void {
      const { title, date, category, topicLink, topic, contents, link, reservedDate } = this;
      if (!title) {
        alert("제목을 입력해주세요.");
        return;
      }
      if (!date) {
        alert("날짜를 입력해주세요.");
        return;
      }
      if (!topicLink) {
        alert("목차 링크를 입력해주세요.");
        return;
      }
      if (!topic) {
        alert("토픽(회사)를 입력해주세요.");
        return;
      }
      if (!contents) {
        alert("내용을 입력해주세요.");
        return;
      }
      if (!link) {
        alert("참고 링크을 입력해주세요.");
        return;
      }
      if (!reservedDate) {
        alert("예약 업로드 날짜를 입력해주세요.");
        return;
      }
      createNews({ title, date: date.toISOString(), category, topicLink, topic, contents, link, reservedDate: reservedDate.toISOString() });
    }
  }
</script>
<style lang="scss" scoped>
  .new-article {
    form {
      .new-article__form-layout {
        float: left;
        width: calc(100% - 370px);
        .input-form {
          margin-bottom: 32px;

          &.has-paragraph {
            margin-bottom: 24px;
          }

          label {
            position: relative;
            display: block;
            padding-left: 108px;

            strong {
              position: absolute;
              left: 0;
              top: 2px;
              font-size: 22px;
              font-weight: normal;
              color: #0f0f0f;
            }

            input, select {
              width: 100%;
              height: 48px;
              padding: 12px 18px;
              border: solid 1px #0f0f0f;
              font-size: 15px;
              color: #0f0f0f;
              -webkit-appearance: none;
              -webkit-border-radius: 0px;
              background: none;
            }

            p {
              margin-top: 12px;
              /deep/ a {
                color: #1716ff
              }
            }
          }

          /deep/ .mx-datepicker {
            width: 100%;

            input {
              width: 100%;
              height: 48px;
              border-radius: 0;
              padding: 12px 18px;
              border: solid 1px #0f0f0f;
              font-size: 15px;
              color: #0f0f0f;
            }
          }
        }
      }

      .new-article__preview-layout {
        width: 307px;
        float: right;

        strong {
          display: block;
          margin-bottom: 34px;
          font-size: 15px;
          font-weight: normal;
          color: #0f0f0f;
        }

        div {
          background-color: #b7b7b7;
          height: 909px;
        }
      }

      .new-article__button-layout {
        clear: both;
        text-align: center;

        /deep/ .custom-button {
          &.is-type01 {
            margin-right: 23px;
          }
        }
      }
    }
  }

</style>
