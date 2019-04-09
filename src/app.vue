<template>
  <div class="app">
    <VoicePlayer url="https://sample-videos.com/audio/mp3/crowd-cheering.mp3"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VoicePlayer from './index'

@Component({
  components: {
    VoicePlayer
  }
})
export default class App extends Vue {
}
</script>

<style lang="less" scoped>
</style>

