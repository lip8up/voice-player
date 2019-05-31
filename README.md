# voice-player

Play voice with wechat voice ui styles.

## Usage

```vue
<template>
  <VoicePlayer :url="audio source url" :only="true or false"/>
</template>

<script>
import VoicePlayer from 'voice-player'
import 'voice-player/dist/voice-player.css'
</script>
```

## Vue Props

|name|type|description|
|:--:|:--:|:--|
|url|string|Voice audio source url|
|only|boolean|Uniqueness, only one voice can be played at a time, default is true|

## Instance Props

|name|type|description|
|:--:|:--:|:--|
|duration|number|Voice audio duration, in seconds|
|audio|HTMLAudioElement|The audio element|

## Instance Methods

|name|description|
|:--:|:--|
|toggle()|Toggle play & pause|
|play()|Play voice|
|pause()|Pause voice|
|pauseAll()|Pause all voices|

## Instance Events
|name|description|
|:--:|:--|
|play|When voice is playing|
|pause|When voice is paused|
