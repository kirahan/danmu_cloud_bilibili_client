<template>

    <v-row v-if="info" class="pa-5">
      <v-col cols="3">
        <v-img contain :src="smallcover"></v-img>
      </v-col>
      <v-col cols="9">
        <p class="headline">{{ info.title }}</p>
        <span class="title">{{ info.desc }}</span>
        <br>
        <span class="subtitle-1 av-text">AV:{{ info.aid }}</span>
        <span class="subtitle-1 bv-text">{{ info.bvid }}</span>
        <span class="subtitle-1 default-text" >分类:{{ info.tname }}</span>
        <span class="subtitle-1 default-text">分P数:{{ info.videos }}</span>
        <br>
          <!-- <v-img contain class="owner-face" :src="smallface"></v-img> -->
          <span class="subtitle-3 small-text">UP: {{ info.owner.name }}</span>
          <span class="subtitle-3 small-text">点击: {{ info.stat.view }}</span>
          <span class="subtitle-3 small-text">弹幕: {{ info.stat.danmaku }}</span>
          <span class="subtitle-3 small-text">评论: {{ info.stat.reply }}</span>
          <br>
          <span class="subtitle-3 small-text">点赞: {{ info.stat.like }}</span>
          <span class="subtitle-3 small-text">收藏: {{ info.stat.favorite }}</span>
          <span class="subtitle-3 small-text">硬币: {{ info.stat.coin }}</span>
          <span class="subtitle-3 small-text">转发: {{ info.stat.share }}</span>
      </v-col>
       <v-col
        cols=6
        v-if="pages"
      >
    
          <v-btn class="player" v-for="page in pages" :key="page.cid" 
            @click="getdanmu(page.cid,page)"
            >
            p{{page.page}}|{{page.part}}
          </v-btn>


      </v-col>
      <v-col
        cols=12
      >
        <WorldCloud :filename="filename" :danmulist="danmulist"></WorldCloud>
      </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
const xml2js = require('xml2js');
import WorldCloud from './wordcloud.vue'



interface SUBVIDEO {
  cid: number;
  part: string;
  duration: number;
  page: number;
}
interface VSTAT {
  aid: number;
  view: number;
  danmaku: number;
  reply: number;
  favorite: number;
  coin: number;
  share: number;
  now_rank: number;
  his_rank: number;
  like: number;
  dislike: number;
  evaluation: string;
}
interface VOWNER {
  mid: number;
  name: string;
  face: string;
}

interface VINFO {
  title?: string;
  pic?: string;
  aid?: string;
  bvid?: string;
  videos?: number;
  owner?: VOWNER;
  pages?: SUBVIDEO[];
  stat?: VSTAT;
}

@Component({
  name: "Video",
  components: {WorldCloud},
})
export default class Video extends Vue {


  @Prop()
  info: VINFO

  danmulist: any = null
  filename = ''
  // danmu._   是弹幕内容
  // danmu.$.p 是弹幕参数

  constructor() {
    super();
  }


  async getdanmu(cid,page){
    // const video_danmu = await this.$http.get(`spider/danmu?cid=${cid}`)
    
    const video_danmu = await this.$http.get(`https://kanbilibili.com/danmaku/${cid}`)
    const that = this
    xml2js.parseStringPromise(video_danmu.data).then(function (result) {
      that.danmulist = result.i.d
      that.filename = page.page + '-' + page.part + '-' + result.i.d.length
    })
    
    
  }

  get pages(){
    return this.info ? this.info.pages : null
  }

  get smallcover(){
      const imgurl = this.info ? this.info.pic : null
      return 'https://' + imgurl.split('://')[1] + '@160w_100h.jpg'
  }

  get smallface(){
      const imgurl = this.info ? this.info.owner.face : null
      return 'https://' + imgurl.split('://')[1] + '@160w_100h.jpg'
  }

}
</script>

<style scoped>
.av-text {
  color: pink;
  padding-right: 30px;
}
.bv-text {
  color: lightskyblue;
  padding-right: 30px;
}
.default-text{
    padding-right: 30px;
}
.small-text{
    padding-right: 10px;
}
.owner-face{
    max-width: 50px;
    display: inline-block;
    margin-right: 50px;
}
.player{
  margin-right: 10px;
}
</style>
