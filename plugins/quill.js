import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const options = {
  placeholder: 'わからないこと、解決したいこと、教えてほしいことの詳細を入力してください。'
}

Vue.use(VueQuillEditor, options /* { default global options } */)
