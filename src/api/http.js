import axios from 'axios'
import router from '@/router/router.js'

// Lightsail Instancd with lightsail db
// const BASE_URL = 'http://127.0.0.1:8000/'
const BASE_URL = 'https://linst77jung.com/'
const SHOP = "https://linst77777.myshopify.com/"

// http requests
export const http = {
    // --------- entering user------------- //
    user_verify: function ( email) {
        return axios.post(BASE_URL + "shopify/",
            { "email": email })
    },
    order_verify: function ( user) {
        return axios.put(BASE_URL + "shopify/", user)
    },
    // --------- profile ------------- //
    user_profile:function( order_id){
        return axios.get(BASE_URL + "profile/" + order_id + "/userinfo/")
    },
    update_profile:function( profile_id, data){
        return axios.put(BASE_URL+ "shopify-profile/" + profile_id + "/", data)
    },

    // ----------content ------------- //
    getUserFiles(order_id, product_type) {
        return axios.get(BASE_URL + "shopify-files/" + order_id + "/" + product_type + "/")
    },
    getContext(id){
        return axios.get( BASE_URL + "content/" + id + "/context/")
    },
    //// ---------- files ---------------//
    // ----------fils sort ---------------//
    sortFile(data) {
        return axios.patch(BASE_URL + "files/fileorder/", data)
    },
    patchFile(id, data) {
        return axios.patch(BASE_URL + "files/" + id + "/", data)
    },
    cropFile(id, angle, data) {
        return axios.put(BASE_URL + "shopify-files/" + id + "/" + angle + "/", data)
    },
    patchContext( id, data){
        return axios.patch(BASE_URL + "content/" + id + "/cur-content/", data)
    },

    // --------- final submit ------------- //
    finalSubmit( id){
        return axios.get(BASE_URL + "shopify-profile/" + id +"/")
    }
}

// local storage api
export const set_email_storage = function (email) {
    localStorage.setItem("user_email", email);
}
export const set_language_storage = function (language) {
    localStorage.setItem("user_language", language);
}
export const set_order_storage = function( order_id){
    localStorage.setItem("user_order", order_id)
}
export const del_local_storage = function () {
    localStorage.removeItem("user_email")
    localStorage.removeItem("user_language");
    localStorage.removeItem("user_order");
}
export const get_local_storage = function(){
    const email = localStorage.getItem("user_email")
    const language = localStorage.getItem("user_language")
    const order = localStorage.getItem("user_order")
    return {
        "email" : email,
        "language" : language,
        "order" : order
    }
}

// router
export const push_route = function (target) {
    router.push({ name: target })
}
export const back_to_store = function(){
    del_local_storage()
    window.location.href=SHOP
}