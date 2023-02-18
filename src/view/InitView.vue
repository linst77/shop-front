<template>
    <router-view></router-view>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import { del_local_storage } from '@/api/http.js'
export default {
    name:"App",
    data(){
        return{
            email : this.$route.params.email || null,
            language : this.$route.params.language || "EP",
            user_data : null,      // db
            order_data : null,     // db
        }
    },
    computed:{
        ...mapState(["profile"]),
    },
    created(){
        if (this.email != null){
            this.$store.commit("profile/set_language", this.language)
            this.$store.commit("profile/set_user_data", this.email)
            this.$store.dispatch("profile/get_user", this.email)
        }
    },
    methods:{
        ...mapMutations(["set_user_data", "set_language"]),
        ...mapActions(["get_user"]),
    },
}
</script>
<style>
</style>
