<template lang="jade">
#index-view.view
  gpk-editor
</template>

<script>
import GPKEditor from '../gpkeditor/GpkEditor.vue'
export default {
  name: 'index-view',
  components: {
    'gpk-editor': GPKEditor
  }
}
</script>

<style lang="stylus">
#index-view
  text-align left

  img
    width 200px
</style>
