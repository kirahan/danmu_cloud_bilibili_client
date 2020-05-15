<template>
    <v-app>
        <h1>hello 2020, B站多P视频弹幕分析器</h1>
        
        <v-row>
            <v-col
                cols=8
            >
                <v-text-field
                    label="搜索"
                    hint="请出入AV/BV号，请包括av和bv字母，回车确认"
                    outlined
                    append-icon="mdi-search"
                ></v-text-field>
                <!-- <v-input
                    height=60
                    hint="请输入BV号"
                    label="查找视频"
                    append-icon='search'
                ></v-input> -->
                
            </v-col>
            
            
            <v-col
                cols=4
            >
                <iframe></iframe>
            </v-col>
        </v-row>
    </v-app>
</template>