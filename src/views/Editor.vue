<template>
  <div class="gridContainer">
    <div class="projectStructure">
      <Project-tree/>
    </div>
    <div class="editor">
      <Editor-text-input ref='editorTextInput'/>
    </div>
    <div class="preview">
      <Preview :pdf="compiledPDF"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import EditorTextInput from '@/components/editor/EditorTextInput.vue';
import Preview from '@/components/Preview.vue';
import ProjectTree from '@/components/ProjectTree.vue';

import EventBus from '@/services/EventBus';
import { LatexCompilerService } from '@/services/LatexCompilerService';

@Component({
  components: {
    Preview,
    EditorTextInput,
    ProjectTree,
  },
})
export default class Editor extends Vue {
  private compiledPDF: any = null;

  mounted() {
    this.addListeners();
  }

  beforeDestroy() {
    this.removeListeners();
  }

  private addListeners() {
    EventBus.$on('editor-compile-project', this.tryCompileProject);
  }

  private removeListeners() {
    EventBus.$off('editor-compile-project', this.tryCompileProject);
  }

  private tryCompileProject() {
    this.compileProject();
  }

  private async compileProject() {
    const { data } = this.$refs.editorTextInput as EditorTextInput;
    const dataToCompile = new Blob([data], { type: 'text/html' });
    const response = await LatexCompilerService.compilePDF(dataToCompile);

    console.log('response', response);

    this.compiledPDF = response.compiledPDF;
  }
}
</script>

<style scoped lang="scss">
.gridContainer {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr 2fr;
  gap: 0 0;
  width: 100vw;
  height: 95vh;
}
.projectStructure {
  grid-area: 1 / 1 / 2 / 2;
  border: 1px solid black;
}
.editor {
  grid-area: 1 / 2 / 2 / 3;
  border: 1px solid black;
}
.preview {
  grid-area: 1 / 3 / 2 / 4;
  border: 1px solid black;
}
</style>
