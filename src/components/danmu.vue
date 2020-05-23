<template>
    <v-app>
        <h1>hello 2020, B站多P视频弹幕分析器</h1>
        
        <v-row>
            <v-col
                cols=12
            >
                <v-text-field
                    label="搜索"
                    hint="请出入AV/BV号，不包括av和bv字母，回车确认"
                    outlined
                    append-icon="mdi-search"
                    v-model="videoid"

                    @keydown.enter="search"

                ></v-text-field>
                <br>
                <Video :info='videoinfo? videoinfo.data: null'></Video>

            </v-col>
            
            
            <!-- <v-col
                cols=4
            >
                <iframe></iframe>
            </v-col> -->
        </v-row>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Video from './video.vue'


@Component({
    name: 'Danmu',
    components:{Video}
})
export default class Danmu extends Vue{
    constructor(){
        super()

    }

    videoid: string = '13a4y1i7f4'
    videoinfo: object = null
    videostat: object = null

    
    async search(){
        console.log('press enter')
        if(this.videoid){
            const video_info = await this.$http.get(`spider/videoinfo?id=${this.videoid}`)
            this.videoinfo = video_info.data

            const video_stat = await this.$http.get(`spider/videostat?id=${this.videoid}`)
            this.videostat = video_stat.data
        }
    }


}
</script>