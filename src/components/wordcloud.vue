<template>
  <div>
      <h1>弹幕数：{{ danmulist ? danmulist.length : ''}}</h1>
      <v-btn @click="saveimage">save</v-btn>
    <div class="wordcloud" id="main"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
const maskImage0 = new Image();
maskImage0.src = require(`../assets/mask0.png`)
const maskImage1 = new Image();
maskImage1.src = require(`../assets/mask1.png`)
const maskImage2 = new Image();
maskImage2.src = require(`../assets/mask2.png`)
const maskImage3 = new Image();
maskImage3.src = require(`../assets/mask3.png`)
const maskImage4 = new Image();
maskImage4.src = require(`../assets/mask4.png`)
const maskImage5 = new Image();
maskImage5.src = require(`../assets/mask5.png`)
const maskImage6 = new Image();
maskImage6.src = require(`../assets/mask6.png`)


const maskList = [maskImage0,maskImage1,maskImage2,maskImage3,maskImage4,maskImage5,maskImage6]






const echarts = require("echarts/lib/echarts");
require("echarts-wordcloud");

interface WordCloudData {
  name: string;
  value?: number;
}

@Component({
  name: "WordCloud",
})
export default class WordCloud extends Vue {
  constructor() {
    super();
  }

  word_cloud_view = null;
  word_cloud_options = {};
  word_data: WordCloudData[] = [];

  @Prop()
  danmulist;

  @Prop()
  filename

  mounted() {
    this.draw_word_cloud_view();
    this.init_view_data();
  }

  @Watch("danmulist")
  onDanmuChange() {
    const clouddata: WordCloudData[] = [];

    const clouddic = {}

    const cloudset = new Set()
    for (const index in this.danmulist) {
      const danmu = this.danmulist[index]
      cloudset.add(danmu._)
    }

    for (const index in this.danmulist) {
      const danmu = this.danmulist[index]
        if(clouddic[danmu._] && cloudset.has(danmu._)){
            clouddic[String(danmu._)] += 2000 
        }else{
            clouddic[String(danmu._)] = 300 + Math.random()*30000
        }
    }


    for(const name in clouddic){
        const value = clouddic[name]
        clouddata.push({
            name,
            value
        })
    }


    this.word_data = clouddata
    // maskImage.src = require(`../assets/mask1.png`)
    this.init_view_data()
  }

  draw_word_cloud_view() {
    if (this.word_cloud_view) {
      this.word_cloud_view.dispose();
    }
    this.word_cloud_view =
      document.getElementById("main") &&
      echarts.init(document.getElementById("main"), "macarons");
    // this.word_cloud_view &&
    //   this.word_cloud_view.setOption(this.word_cloud_options);
  }

  init_view_data() {
      const maskindex = Math.floor(Math.random()*7)
    const word_cloud_series = [
      {
        type: "wordCloud",
        shape: "circle",
        maskImage: maskList[maskindex],
        left: "center",
        top: "center",
        width: "100%",
        height: "100%",
        right: null,
        bottom: null,
        sizeRange: [6, 60],
        rotationRange: [-45, 90],
        autoSize: {
          enable: true,
          minSize: 600,
        },
        textPadding: 0,
        // rotationStep: 45,
        // gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          normal: {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            // Color can be a callback function or a color string
            color: function() {
              // Random color
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 256),
                  Math.round(Math.random() * 256),
                  Math.round(Math.random() * 256),
                ].join(",") +
                ")"
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
        data: this.word_data,
      },
    ];

    this.word_cloud_options = {
      series: word_cloud_series,
    };
    this.word_cloud_view.setOption(this.word_cloud_options);
  }


  saveimage(){
      const canvas = document.getElementsByTagName('canvas')[0]
      const a = document.createElement('a')
      a.href = canvas.toDataURL()
      a.download = this.filename
      a.click()
  }

  
}
</script>

<style scoped>
.wordcloud {
  width: 1920px;
  height:1080px;
}
</style>
