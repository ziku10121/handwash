<template>
  <q-page>
    <!-- {{debugTxt}} -->
    <!-- Marquee -->
    <div v-if="marq_obj" :style="'height:'+v1+'vh;background-color:DodgerBlue;'">
      <marquee-text class="marquee" :duration="marq_obj.duration">{{marq_obj.text}}</marquee-text>
    </div>
    <!-- Temperature  -->
    <q-dialog v-model="show_temp" seamless position="top" >
      <q-card class="temp_card" >
        <q-card-section style="padding:6px 16px">
          <div class="row justify-between">
            <div class="row col items-center">
              <!-- <div class="col"><input type="text" v-model="v1"/></div> -->
              <div class="col-auto text-center">
                <!-- <button class="muteBtn">toggleMuted</button> -->
                <!-- env icon -->
                <q-icon v-if="temp_obj.event=='env'" class="text-primary" size="30px" name="filter_drama" /> 
                <!-- human icon -->
                <q-icon v-if="temp_obj.event!='env'" :class="temp_obj.event!='fever'?(temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" size="30px" name="accessibility" /> 
              </div>
              <div class="col text-center">
                <!-- {{temp}} -->
                <a :class="temp_obj.event!='fever'? (temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" style="font-size: 32px;">{{temp_obj.temp}}</a>
                <a :class="temp_obj.event!='fever'? (temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" style="font-size: 18px;">°C</a>
              </div>  
            </div>
            <div class="column col-4 items-end">
              <div v-if="temp_obj.event=='env'" class="col text-primary temp-state">Env</div>
              <div v-if="temp_obj.event=='normal'" class="col text-green-6 temp-state">Normal</div>
              <div v-if="temp_obj.event=='fever'" class="col text-negative temp-state">Fever</div>

              <div class="col text-right">
                <a v-if="temp_range" class="text-grey" style="font-size: 10px;">
                  {{temp_range.low}}~{{temp_range.high}}
                </a>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- VIDEO / PNG -->
    <div class="column" :style="'height:'+(100-v1)+'vh'">
      <div class="col-auto">
        <div class="row">
          <!-- Top Video -->
          <div v-if="top_video" class="col-lg-6 col-12">
            <q-media-player
              type="video"
              background-color="black"
              :muted="false"
              :autoplay="true"
              :sources="top_video"
              :loop="true"
              :disabled-seek="true"
              :hide-volume-btn="true"
              :no-controls="true"
              ref="qmp_top_video"
            ></q-media-player>
          </div>
          <div v-if="center_video" class="col-lg-6 col-12">
            <!-- Center Video -->
              <q-media-player
                type="video"
                background-color="black"
                :muted="true"
                :autoplay="true"
                :sources="center_video"
                :loop="true"
                :disabled-seek="true"
                :hide-volume-btn="true"
                :no-controls="true"
                ref="qmp_center_video"
              ></q-media-player>
          </div>
        </div>
      </div>
      <div class="col">
        <!-- Bottom JPEG -->
        <q-img v-if="bottomSrc!=''" :src="bottomSrc" style="height:100%"/>
      </div>
      <!-- <div class="col-auto" :style="'height:'+v2+'vh;background-color:black;'"></div> -->
    </div>
    <!-- Fever Beep -->
    <div class="column items-center q-pt-md" style="display:none">
      <q-media-player
        type="audio"
        background-color="black"
        :muted="false"
        :autoplay="false"
        :sources="heat_sound"
        :loop="false"
        :disabled-seek="false"
        :hide-volume-btn="false"
        :no-controls="false"
        ref="qmp_beep"
      ></q-media-player>
    </div>
  </q-page>
</template>

<script>

import { mqtt } from 'vue-mqtt';
import axios from 'axios';
import MarqueeText from "vue-marquee-text-component";

export default {
  name: 'HandWash',
  components:{
    MarqueeText,
  },
  data () {
    return {
      debugTxt:"",
      show_fever:false,
      show_temp: true,
      //mqtt
      temp_obj:{},    //temp
      //database
      temp_range:{},  //temp range
      marq_obj:{},    //marquee
      top_video:[],
      center_video:[],
      heat_sound:[],
      bottomSrc:'',

      intervalId: null, //data 定義一個定時器id
      fever_duration: 5,
      countdown:false,
      v1:15,

      url:"https://raw.githubusercontent.com/howardweng/quasar01/main/database.json",
      url_104:"http://192.168.0.104:9100/database.json"
    }
  },
  async created () {
    // 抓取初始值
    var status = await axios.get(this.url)
    .then((res)=>{
      let database = res.data;
      // console.log('res:',database);
      // this.debugMethod('res:'+JSON.stringify(database)+'/////');
      this.marq_obj = database.marquee;
      this.temp_range = database.temp_range;
      this.top_video = database.top_video;
      this.center_video = database.center_video;
      this.heat_sound = database.heat_sound;
      this.bottomSrc = database.bottom_img[0].src;
      return 'ok';
    })
    .catch((err)=>{
      // this.debugMethod('res:'+err+'/////');
      console.error(err);
    })

    if(status =='ok'){
      console.log('mqtt');
      this.subscribe_topic = "handwash/#";
      this.$mqtt.subscribe(this.subscribe_topic);
    }
  },
  mqtt: {
    'handwash/#' (data, topic) {

      this.object = JSON.parse(data)
      // console.log('topic: ', topic, ' this.object: ', this.object)
      if (topic === "handwash/" + 12345 + "/temp") {
        let tempObj = JSON.parse(data)
        // console.log('tempdata',tempObj);
        this.temp_obj = tempObj;
        if(this.temp_obj.event === "fever" && !this.countdown){
          this.startTimer(this.fever_duration);
          this.countdown = true; 
        }
      }
      if(topic === "handwash/update"){
        let updateObj = JSON.parse(data);
        console.log('推播',updateObj);
        switch (updateObj.command) {
          case "temp_range":
            this.temp_range = updateObj.content.temp_range;
            break;
          case "marquee":
            this.marq_obj = updateObj.content.marquee;
            break;
          case "top_video":
            this.top_video = updateObj.content.top_video;
            break;
          case "center_video":
            this.center_video = updateObj.content.center_video;
            break;
          case "heat_sound":
            this.heat_sound = updateObj.content.heat_sound;
            break;
          case "bottom_img":
            this.bottomSrc = updateObj.content.bottom_img[0].src;
            break;
          default:
            break;
        }
      }
    }
  },
  methods:{
    //停止計時器
    stop(){
      clearInterval(this.intervalId)
      //當清除定時器之後，重新讓intervalId為null
      this.intervalId = null;
      this.countdown = false;
    },
    startTimer(duration) {
      let timer = duration;
      let self = this;
      self.$refs.qmp_top_video.pause();
      self.$refs.qmp_beep.play();
      console.log("qmp_top_video Pasue、qmp_beep Play")
      this.intervalId = setInterval(() => {
        // console.log(timer);
        if (timer < 0) {
          self.$refs.qmp_top_video.play();
          self.$refs.qmp_beep.pause();
          console.log("qmp_top_video Play、qmp_beep Pause");
          this.stop();
        }
        timer--;
      }, 1000);
    },

    debugMethod(txt){
      this.debugTxt += txt +'\n';
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
}
</script>

<style scoped>
  .q_page{
    background-color: #000;
    height: 1920px;
  }
  .marquee{
    color:whitesmoke;
    font-size: 4.5em;
    vertical-align:bottom;
    padding-top:65px;
    padding-bottom:15px;
  }
  .temp-state{
    font-size:16px; 
    letter-spacing: 2px; 
    font-weight:500;
  }
  .temp_card{
    width: 250px; 
    opacity:0.7;
  }
</style>