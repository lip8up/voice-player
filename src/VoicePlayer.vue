<template>
  <div class="voice-player" @click="toggle">
    <i :class="`trumpet${step}`"></i>
    <em v-if="duration > 0">{{duration}}"</em>
    <audio
      :src="url"
      preload="metadata"
      class="audio"
      @loadedmetadata="metaLoaded"
      @ended="ended"
      ref="audio"
    ></audio>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { requestInterval } from './util'

const instanceList: VoicePlayer[] = []

@Component
export default class VoicePlayer extends Vue {
  /**
   * Voice audio source url
   */
  @Prop({ type: String }) url!: string

  /**
   * Uniqueness, only one voice can be played at a time, default is true
   */
  @Prop({ type: Boolean, default: true }) only!: boolean

  public duration = 0

  private step = 2

  private animate: { clear: () => any } | null = null

  private playing = false

  public get audio() {
    return this.$refs.audio as HTMLAudioElement
  }

  constructor() {
    super()
    instanceList.push(this)
  }

  /**
   * Toggle play & pause
   */
  public toggle() {
    this.playing ? this.pause() : this.play()
  }

  /**
   * Play voice
   */
  public play() {
    this.only && this.pauseAll()

    this.playing = true
    this.startAnimate()
    this.audio.play()
    this.$emit('play')
  }

  /**
   * Pause voice
   */
  public pause() {
    this.playing = false
    this.stopAnimate()
    this.audio.pause()
    this.$emit('pause')
  }

  /**
   * Pause all voices
   */
  public pauseAll() {
    instanceList.forEach(it => it.pause())
  }

  private metaLoaded(ev: any) {
    this.duration = parseInt(ev.target.duration, 10)
  }

  private ended() {
    this.pause()
  }

  private startAnimate() {
    this.animate = requestInterval(() => {
      this.step = (this.step + 1) % 3
    }, 400, () => {
      this.step = 2
    })
  }

  private stopAnimate() {
    this.animate && this.animate.clear()
    this.animate = null
    this.step = 2
  }
}
</script>

<style lang="less" scoped>
@bg-color: #f3f3f3;

.voice-player {
  position: relative;
  min-width: 128px;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  margin-left: 8px;
  padding-left: 46px;
  font-size: 18px;
  font-family: Arial;
  background-color: @bg-color;
  user-select: none;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -8px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg) translateY(-50%);
    background-color: @bg-color;
    margin-top: -2px;
  }

  .trumpet0,
  .trumpet1,
  .trumpet2 {
    position: absolute;
    top: 0;
    left: 16px;
    width: 24px;
    height: 100%;
    background: url(./assets/voice0.png) no-repeat center;
    pointer-events: none;
  }

  .trumpet1 {
    background-image: url(./assets/voice1.png);
  }

  .trumpet2 {
    background-image: url(./assets/voice2.png);
  }

  em {
    position: relative;
    font-style: normal;
  }
}
</style>
