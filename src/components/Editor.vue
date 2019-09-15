<template>
  <div class="editor" id="codex-editor">
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, PropSync } from "vue-property-decorator";
  import EditorJS from "@editorjs/editorjs";
  import List from "@editorjs/list";
  import Header from "@editorjs/header";
  import ImageTool from "@editorjs/image";
  import Embed from "@editorjs/embed";
  import { INullable } from "@/@types/utility";

  @Component({
    name: "Editor"
  })
  export default class Editor extends Vue {
    editorRef: INullable<EditorJS>;

    constructor() {
      super();
      this.editorRef = null;
    }

    created() {
      const that = this;
      this.editorRef = new EditorJS({
        holderId: "codex-editor",
        minHeight: 292,
        tools: {
          header: Header,
          embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
              services: {
                youtube: true
              }
            }
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          image: {
            class: ImageTool
          }
        },
        onChange (): void {
          that.onChangeHandler();
        }
      });
    }

    @Prop() private msg!: string;

    async onChangeHandler () {
      if (!this.editorRef) {
        return;
      }
      try {
        const { blocks } = await this.editorRef.save();
        this.$emit("input", blocks);
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>

<style scoped lang="scss">
  .editor {
    text-align: left;
    height: 100%;
    border: solid 1px #0f0f0f;
    /deep/ .ce-block__content {
      max-width: unset;
      margin: 0;
      padding: 12px 18px;
    }
    /deep/ .ce-toolbar__plus {
      left: -66px;
    }
  }
</style>
