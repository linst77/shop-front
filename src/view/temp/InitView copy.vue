<template>
    <router-view></router-view>
<a style="width:100%" href="https://linst77777.myshopify.com/"><v-btn height="50px" width="100%" elevation="0" color="orange"> Back to Store</v-btn></a>
<v-img src="https://shop-api-storage.s3.ap-northeast-2.amazonaws.com/static/images/temp/store/1/store1_front.jpg" cover max-height="200"></v-img>
<br>
<v-btn @click="run">Run</v-btn>
<br>

<v-card>
<nouser v-if="this.nouser_modal==true"></nouser>
</v-card>


<v-container>
    <v-card max-width="900px">
<v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Product
        </th>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Contact
        </th>

      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in this.order_data"
        :key="item.id"
      >
        <td><v-btn variant="outlined" size="large" @click="print_id( item.id, item.email)">{{ item.order_number }}</v-btn></td>
        <td>{{ item.product_title }}</td>
        <td>{{ item.date }}</td>
        <td>{{ user_data.email }}</td>
      </tr>
    </tbody>
  </v-table>
</v-card>


</v-container>


</template>

<script>
import axios from 'axios'
import Nouser from '@/components/NoUser.vue'
import router from '@/router/router.js'

export default {
    name:"App",
    data(){
        return{
            email : this.$route.params.email || null,
            language : this.$route.params.language || "EN",
            user_data : null,      // db
            order_data : null,     // db
            temp02 : null,
            nouser_modal : false,
            nodata_modal : false,
        }
    },
    components:{ 
        nouser : Nouser, 
    },
    created(){
        console.log( this.email)
        console.log( this.language)
        axios.post( 'http://127.0.0.1:8000/shopify/',{
            "email" : this.email
        })
        .then( resp=> {
           this.user_data = resp.data
           this.nouser_modal = false
           axios.put( 'http://127.0.0.1:8000/shopify/', this.user_data)
            .then( resp=>(
                this.order_data = resp.data
            ))
        })
        .catch( () =>{
            this.nouser_modal = true
        })
    },
    methods: {
        run(){
            console.log("wowowowo")
            axios.get( 'https://linst77jung.com/userinfo/')
            .then( resp=>(
               console.log( resp.data),

               router.push({ name: 'process' })
            ))
            .catch( ()=>{
                console.log( "None")
            })
            },
        print_id( order_id, user_email){
            console.log( order_id)
            console.log( user_email)

        }

    }
}
</script>

<style>

</style>
