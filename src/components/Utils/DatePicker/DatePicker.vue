<template>
  <div>
    <vue-date-picker v-model="selectedDate"
                     :lang="language" />
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch, Prop } from "vue-property-decorator";
  import VueDatePicker from "vue2-datepicker";
  import Datepicker from "vue2-datepicker";
  import format from "date-fns/format";

  @Component({
    components: {
      VueDatePicker
    }
  })
  export default class DatePicker extends Vue {
    @Prop({ default: "yyyy-MM-dd" }) format!: string;

    selectedDate: string;
    language: Datepicker.Lang;

    constructor() {
      super();
      this.selectedDate = "";
      this.language = {
        days: ["일", "월", "화", "수", "목", "금", "토"],
        months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        pickers: ["next 7 days", "next 30 days", "previous 7 days", "previous 30 days"],
        placeholder: {
          date: "날짜를 선택해주세요.",
          dateRange: "Select Date Range"
        }
      }
    }

    @Watch("selectedDate")
    updateSelectedDate(value: Date) {
      this.$emit("input", value);
    }

  }
</script>
<style lang="scss" scoped>
</style>
