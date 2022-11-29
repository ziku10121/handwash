<template>
  <q-dialog v-model="tempBar" seamless position="top" >
      <q-card class="temp_card" >
        <q-card-section style="padding:10px 16px">
          <div class="row justify-between">
            <div class="row col items-center">
              <!-- <div class="col"><input type="text" v-model="v1"/></div> -->
              <div class="col-auto text-center">
                <!-- <button class="muteBtn">toggleMuted</button> -->
                <!-- env icon -->
                <q-icon v-if="temp_obj.event=='env'" class="text-primary" size="46px" name="filter_drama" /> 
                <!-- human icon -->
                <q-icon v-if="temp_obj.event!='env'" :class="temp_obj.event!='fever'?(temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" size="46px" name="accessibility" /> 
              </div>
              <div class="col text-center">
                <!-- {{temp}} -->
                <a :class="temp_obj.event!='fever'? (temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" style="font-size: 50px;">{{temp_obj.temp}}</a>
                <a :class="temp_obj.event!='fever'? (temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" style="font-size: 28px;">°C</a>
              </div>  
            </div>
            <div class="column col-auto items-end justify-center">
              <!-- Env -->
              <div v-if="temp_obj.event=='env'" class="col text-primary temp-state" style="font-size: 20px;">無體溫</div>
              <!-- Normal -->
              <div v-if="temp_obj.event=='normal'" class="col text-green-6 temp-state" style="font-size: 20px;">體溫正常</div>
              <!-- Fever -->
              <div v-if="temp_obj.event=='fever'" class="col text-negative temp-state" style="font-size: 20px;">體溫過高</div>

              <div class="col-auto text-right">
                <a v-if="temp_range" class="text-grey" style="font-size: 16px;">
                  {{temp_range.low}}~{{temp_range.high}}
                </a>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: 'Temperature',
    props:{
        temp_obj:{
            type: Object,
            default(){
                return{
                    event:"env",
                    temp:"35.1",
                    low_temp:"36.0",
                    high_temp:"38.4",
                }
            }
        },
        temp_range:{
            type:Object,
            default(){
                return{
                    low:"35.0",
                    high:"38.0"
                }
            }
        }
    },
    data(){
        return{
            tempBar:true,
        }
    }
}
</script>

<style scoped>
    .temp_card{
        width: 360px; 
        opacity:0.7;
    }   
</style>