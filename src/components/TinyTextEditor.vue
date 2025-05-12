<template>
  <editor :init="init" />
</template>

<script>
import { defineComponent } from "vue";

// TinyMCE
import "tinymce/tinymce";
import "tinymce/icons/default/icons";
import "tinymce/themes/silver/theme";
// import 'tinymce/models/dom/model'
import "tinymce/skins/ui/oxide/skin.css";
import contentUiCss from "tinymce/skins/ui/oxide/content.css?inline";

// TinyMCE plugins
// https://www.tiny.cloud/docs/tinymce/6/plugins/
import "tinymce/plugins/lists/plugin";
import "tinymce/plugins/link/plugin";
import "tinymce/plugins/image/plugin";
import "tinymce/plugins/table/plugin";
import "tinymce/plugins/code/plugin";
import "tinymce/plugins/help/plugin";
import "tinymce/plugins/wordcount/plugin";

import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
  name: "App",
  components: {
    editor: Editor,
  },
  setup() {
    return {
      init: {
        skin: false,
        plugins: "lists link image table code help wordcount",
        content_css: false,
        content_style: contentUiCss.toString(),
      },
    };
  },
});
</script>
<style>
.tox-tinymce-aux {
  z-index: 13000 !important;
}

.tox-tinymce {
  border-radius: 8px;
}
</style>
