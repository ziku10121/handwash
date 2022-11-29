<template>
    <q-carousel
        animated
        v-model="slide"
        :autoplay="autoplay"
        ref="carousel"
        infinite
        :height = "height+'px'"
    >
        <q-carousel-slide v-for="(img,index) in sources" :key="'carousel'+index" :name="index" :img-src="img.src" />
    </q-carousel>
</template>

<script>
export default {
    name:'photo',
    props:{
        height:{
            type:Number
        },
        autoplay:{
            type:[Boolean,Number,String],
            default:true,
        },
        sources:{
            type:Array,
            // required:ture,
            default(){
                return [{
                    src:"https://cdn.quasar.dev/img/mountains.jpg",
                    type:"images/jpeg"
                },
                {
                    src:"https://cdn.quasar.dev/img/parallax1.jpg",
                    type:"images/jpeg"
                },
                {
                    src:"https://cdn.quasar.dev/img/parallax2.jpg",
                    type:"images/jpeg"
                }]
            }
        }
    },
    data(){
        return{
            slide:1,
        }
    }
}
</script>

<style>

</style>