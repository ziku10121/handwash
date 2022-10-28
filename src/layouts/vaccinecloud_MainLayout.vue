
<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white" height-hint="100" style="height:auto">
      <q-toolbar class="bg-white text-blue-grey-9 justify-center">
        
        <div class="col-5" style="text-align: left;">
          <q-btn flat no-caps to='/vaccinecloud_dashboard' label="">
            <span style="font-size: 20px; color:red; font-weight:bold;">Vaccine<span style="color:black; font-weight:normal; ">Cloud</span></span>
          </q-btn>
        </div>

        <div class="col-2">
          <q-img :src="logo_base64" style="height:80%; width:80%;">
            <q-btn flat no-caps size="100px" to='/menu' label="　   　"> </q-btn>
          </q-img>
        </div>

        <div class="col-5" style="text-align: right;">
          <q-btn no-caps outline color="blue-grey-8" :label="loginInfo.user_info.first_name" style="position:relative; right: 3%; font-size:75%;  width:auto-fill">
          <!-- <q-btn outline color="blue-grey-8" :label="12345" no-caps font-size = "24px"> -->
            <q-menu transition-show="scale" transition-hide="scale">
              <q-list style="min-width: 100%">

                <!-- <q-item to="/vaccinecloud_device_register" clickable v-ripple>
                  <q-item-section>註冊裝置</q-item-section>
                </q-item> -->

                <!-- <q-item to="/setting_account" clickable v-ripple>
                  <q-item-section align="center">平台設定</q-item-section>
                </q-item> -->

                <q-item to="/vaccinecloud_notification_logs" clickable v-ripple>
                  <q-item-section align="center">通知紀錄</q-item-section>
                </q-item>

                <q-item to="/vaccinecloud_device_setting" clickable v-ripple>
                  <q-item-section align="center">裝置設定</q-item-section>
                </q-item>

                <q-item to="/menu" clickable v-ripple>
                  <q-item-section align="center">回主選單</q-item-section>
                </q-item>
                
                <q-item to="/"  clickable v-ripple>
                  <q-item-section align="center" @click="logout()">登出</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      
      <router-view />
      
      <div style="width:100%">
        <p style="text-align:left; margin-left:1%; color:#d9d9d9"> Powered by 
          <a href="http://frrut.com/" target="_blank" style="color:#85d2ff;">
            frrut.com
          </a>
        </p>
      </div>

    </q-page-container>

    <q-footer v-if="$q.fullscreen.isActive === false" bordered class="bg-white">
        <!-- <div style="width:100%">
          <p style="text-align:right; color:#d9d9d9"> Powered by 
            <a href="http://frrut.com/" target="_blank" style="color:#85d2ff; margin-right:1%">
              frrut.com
            </a>
          </p>
        </div> -->
      <q-toolbar class = "bg-white text-blue-grey-9 justify-center">
        <!-- <q-toolbar-title align="center"> -->
          <!-- <q-btn-toggle
            flat
            size="1.4em"
            v-model="slide"
            :options="[
              { label: 'TE200', value: 'TE200' },
            ]"
          /> -->
        <!-- <q-space />
        <q-item to="/washing" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="eva-home" style="font-size: 3em;"/>
          </q-item-section>
        </q-item>
          <q-space />
          <q-separator vertical inset/>
        <q-space /> -->
          <!-- <q-space />
        <q-item to="/clinic" clickable v-ripple>
          <q-item-section>
            <q-icon name="mdi-hospital-building" style="font-size: 3em;"/>
          </q-item-section>
        </q-item>
          <q-space />

          <q-separator vertical inset/> -->

          <q-space />
        <q-item to="/vaccinecloud_dashboard" clickable v-ripple>
          <q-item-section>
            <q-icon name="dashboard" style="font-size: 3em;"/>
          </q-item-section>
        </q-item>
          <q-space />

          <!-- <q-separator vertical inset/>

          <q-space />
        <q-item to="/vaccinecloud_statistical_report" clickable v-ripple>
          <q-item-section>
            <q-icon name="las la-calendar-day" style="font-size: 3em;"/>
          </q-item-section>
        </q-item>
          <q-space /> -->

          <!-- <q-separator vertical inset/>
          <q-space />
        <q-item to="/vaccinecloud_popular_times" clickable v-ripple>
          <q-item-section>
            <q-icon name="timeline" style="font-size: 3em;"/>
          </q-item-section>
        </q-item>
          <q-space /> -->
          
          <q-separator vertical inset/>

          <q-space />
        <q-item to="/menu" clickable v-ripple>
          <q-item-section>
            <q-icon name="apps" style="font-size: 3em;"/>
          </q-item-section>
        </q-item>
          <q-space />

          <!-- <q-space />
          <q-separator vertical inset/>
          <q-space />
        <q-item to="/register" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="add_circle" style="font-size: 3em;"/>
          </q-item-section>
        </q-item>
          <q-space />
          <q-separator vertical inset/>
          <q-space />
        <q-item to="/account" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="perm_identity" style="font-size: 3em;"/>
          </q-item-section>
        </q-item>
          <q-space /> -->
          <!-- <q-separator vertical inset/> -->
        <!-- <q-space /> -->
        <!-- <q-item to="/GG300" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="highlight" style="font-size: 3em;"/>
          </q-item-section>
        </q-item> -->
          <!-- <q-space /> -->
        <!-- </q-toolbar-title> -->
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      logo_base64 : '',
      slide: '',
      search_text: '',
      search_show: false
    }
  },
  created () {
    this.loginInfo = JSON.parse(localStorage.getItem('loginInfo') || '{}')

    this.logo_base64 = this.loginInfo.user_info.logo_base64
    // console.log("layout_logo_base64: ", this.loginInfo.user_info.logo_base64)

    // console.log("this.loginInfo: ", this.loginInfo)
    // console.log("loginInfo.user_name: ", this.loginInfo.user_name)
    // console.log(this.loginInfo.id)
    // console.log(this.loginInfo.loginStatus)
    // console.log(this.loginInfo.username)
    // this.initial = this.loginInfo.user_name.charAt(0).toUpperCase()

  },
  methods:{
    logout(){
      localStorage.removeItem('loginInfo');
      this.$router.push('/login');
    },
  }
}
</script>
