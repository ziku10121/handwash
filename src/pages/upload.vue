<template>
  <q-page class="flex flex-center">


    <q-dialog v-model="update_ok" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="thumb_up" color="primary" text-color="white" />
          <span class="q-ml-sm">Update Success</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Warning Temperature Range</div>
        </q-card-section>
      </q-item>
      <q-separator />
        <q-card-section style="height: 150px;">
        <div class="col-12 text-center">
    <q-range
      class="q-mt-xl"
      v-model="TempLabel"
      color="negative"
      markers
      :marker-labels="arrayMarkerLabel"
      label-always
      :left-label-value="TempLabel.minTemp"
      :right-label-value="TempLabel.maxTemp"
      switch-label-side
      switch-marker-labels-side
      :min="35"
      :max="43"
    />
      <q-btn color="primary" label="update" @click="set_temperature(minTemp, maxTemp)"/>
      </div>
       </q-card-section>
    </q-card>


    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Header marquee</div>
          <!-- <div class="text-h6 q-mt-sm q-mb-xs">video in mp4 .mov format</div> -->
          <div class="text-caption text-grey">
            Edit Text for header marquee
          </div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section style="height: 250px;">

          <div style="width: 400px; height: 200px;">
        <marquee width="100%" height="50" class="text-h3" :scrollamount="marquee_speed" style="background-color:DodgerBlue;color:whitesmoke;">{{marquee_text}}</marquee>
          </div>
          <div class="q-px-sm q-mt-sm">
          Selected Speed is: <strong>{{ marquee_speed }}</strong>
          </div>
          <div class="q-px-sm q-mt-sm">
          preview will be valid in next loop
          </div>
          <div class="q-px-sm q-mt-sm">
          please UPDATE to save the changes.
          </div>

        </q-card-section>
        <q-separator vertical />
        <q-card-section  class="col-2">
            <!-- <div class="q-pa-md" style="width:320px">
              <q-input
                v-model="marquee_text"
                filled
                type="textarea"
              />
            </div> -->
            <div class="q-gutter-y-md column" style="width: 300px">
            <q-input
              v-model="marquee_text"
              filled
              clearable
              type="textarea"
              color="primary"
              label="Please enter marquee text"
            />
            </div>
            <div class="q-gutter-sm" horizontal>
              <q-radio keep-color v-model="marquee_speed" val="10" label="Slow" color="teal"  />
              <q-radio keep-color v-model="marquee_speed" val="25" label="Fast" color="orange" />
              <q-btn color="primary" label="update" @click="set_speed(marquee_speed, marquee_text)"/>
            </div>
        </q-card-section>
      </q-card-section>
    </q-card>


    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Top video</div>
          <!-- <div class="text-h6 q-mt-sm q-mb-xs">video in mp4 .mov format</div> -->
          <div class="text-caption text-grey">
            please upload video in .mov format
          </div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section style="height: 250px;">

          <div style="width: 400px; height: 200px;">
            <q-media-player type="video" background-color="black" :muted="true" :autoplay="true" :sources="topvideo"
              :loop="true" :disabled-seek="true" :hide-volume-btn="true" :no-controls="true"></q-media-player>
          </div>

        </q-card-section>
        <q-separator vertical />
        <q-card-section class="col-2">
          <div>
            <q-uploader style="max-width: 300px" url="http://192.168.0.104:1880/upload" label=".mov max 100M"
              :field-name="(file) => 'top.mov'"
              accept=".mov"
              />
          </div>
          <div>
            <q-file standout v-model="testfile" @input="testMethod">
              <template v-slot:append>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
                </q-avatar>
              </template>
            </q-file>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>

    <!-- center of card -->
    <br>

    <br>

    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Center video</div>
          <!-- <div class="text-h6 q-mt-sm q-mb-xs">video in mp4 .mov format</div> -->
          <div class="text-caption text-grey">
            please upload video in .mov format
          </div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section style="height: 250px;">

          <div style="width: 400px; height: 200px;">
            <q-media-player type="video" background-color="black" :muted="true" :autoplay="true" :sources="centervideo"
              :loop="true" :disabled-seek="true" :hide-volume-btn="true" :no-controls="true"
              ></q-media-player>
          </div>

        </q-card-section>
        <q-separator vertical />
        <q-card-section class="col-2">
          <div>
            <q-uploader style="max-width: 300px" url="http://192.168.0.104:1880/upload" label=".mov max 100M" @finish="centerC"
              :field-name="(file) => 'center.mov'"
              accept=".mov"
              />
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>



    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Buttom image</div>
          <!-- <div class="text-h6 q-mt-sm q-mb-xs">video in mp4 .mov format</div> -->
          <div class="text-caption text-grey">
            please upload imarquee_texte in .jpg format
          </div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section style="height: 200px;">

          <div class="col-4" style="width: 400px; height: 200px;">
            <q-img src="/buttom.jpg" width="400px" height="100px" />
          </div>

        </q-card-section>
        <q-separator vertical />
        <q-card-section class="col-2">
          <div>
            <q-uploader style="max-width: 300px" url="http://192.168.0.104:1880/upload" label=".jpg max 100M"
              :field-name="(file) => 'buttom.jpg'"
              accept=".jpg"
              />
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>




  </q-page>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',

  data() {
    return {
      // model: {
      //   min: 36,
      //   max: 42
      // },
      update_ok: false,
      TempLabel: {
        min: "",
        max: ""
      },
      arrayMarkerLabel: [
        { value: 35, label: '35??C' },
        { value: 36, label: '36??C' },
        { value: 37, label: '37??C' },
        { value: 38, label: '38??C' },
        { value: 39, label: '39??C' },
        { value: 40, label: '40??C' },
        { value: 41, label: '41??C' },
        { value: 42, label: '42??C' },
        { value: 43, label: '43??C' }
      ],
      marquee_speed:"25",
      marquee_text:"",
      // marquee_text: "????????????: ????????????WNBA??????????????????????????????-?????????.???????????????????????????????????????????????????????????????????????????????????????{????????????1??????}?????????????????????????????????!!!***??????***",
      intervalId: null, //data ?????????????????????id
      topvideo: [{
        // src: 'https://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/ToS-4k-1920.mov',
        src: '/top.mov',
        type: 'video/mp4'
      }],
      centervideo: [{
        // src: 'https://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/ToS-4k-1920.mov',
        src: '/center.mov',
        type: 'video/mp4'
      }],
      testfile:null,
    }
  },
  created() {
    // Subscribe mqtt
    // this.subscribe_topic = 'handwash/#'
    // this.$mqtt.subscribe(this.subscribe_topic)
    let one = "http://192.168.0.104:8080/marquee.txt"
    let two = "http://192.168.0.104:8080/temperature.txt"

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {

      const responseOne = responses[0].data

      this.marquee_speed = responseOne.marquee_speed
      this.marquee_text = responseOne.marquee_text

      const TempLabel = responses[1].data

      this.TempLabel.max = TempLabel.maxTemp
      this.TempLabel.min = TempLabel.minTemp

       console.log('responseOne: ', responseOne);
       console.log('TempLabel: ', TempLabel);


      // use/access the results
    })).catch(errors => {
      // react on errors.
       console.log('error ');
    })

    // axios
    //   .get('http://192.168.1.191:8080/marquee.txt')
    //   .then(res => {
    //     this.marquee_speed = res.data.marquee_speed;
    //     this.marquee_text = res.data.marquee_text;
    //     console.log('res.data: ', res.data);
    //   })
    //   .catch(error => {
    //     console.error('axios.post() error: ', error);
    //   });

  },
  computed: {
    minTemp () {
      return ` ${this.TempLabel.minTemp} ??C`
    },
    maxTemp () {
      return ` ${this.TempLabel.maxTemp} ??C`
    }
  },
  methods: {
    centerC(){
      console.log('centerCC');
      this.centervideo[0].src ='/top.mov';
      console.log(this.centervideo[0].src);
    },
    testMethod(){
      console.log('testMethod');
      console.log(this.testfile);
      let blob = new Blob([JSON.stringify(this.testfile, null, 2)], {
        type: "application/json",
      });
      console.log('tewstfile:',this.testfile,'\nblob:',blob);
      const bufReader = new FileReader();
      bufReader.readAsArrayBuffer(blob);
      bufReader.onload = function(){
        console.log(new Uint8Array(bufReader.result));
      }
      // reader.readAsArrayBuffer(blob);
    },
    reload() {

      this.$forceUpdate();

    },
    fnMarkerLabel (val) {
      return `${10 * val}%`
    },


    set_speed(marquee_speed,marquee_text) {
      var marquee_send =  marquee_speed + "/" + marquee_text
      console.log(marquee_send)
      axios.post('http://192.168.0.104:1880/upload_marquee',
      {marquee_speed: marquee_speed,marquee_text:marquee_text})
      .then((res) => {
        console.table("res.data: ", res.data)

        // popup dialog
        this.update_ok = true

      })
      .catch((error) => { console.error(error) })
    },


    set_temperature(minTemp, maxTemp) {
      axios.post('http://192.168.0.104:1880/upload_temperature',
      {minTemp: parseInt(minTemp.replace(/\D/g, "")),maxTemp: parseInt(maxTemp.replace(/\D/g, ""))})
      .then((res) => {
          console.table("res.data: ", res.data)
          // popup dialog
          this.update_ok = true

        })
      .catch((error) => { console.error(error) })
    }
  },
  mounted() {

  },


}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 780px
  margin  : 4px
</style>

<style>
div.scrollmenu {
  overflow: auto;
  white-space: nowrap;
  margin: 4px;
}

div.scrollmenu .thumbnail {
  display: inline-block;
  margin: 4px;
}
</style>
