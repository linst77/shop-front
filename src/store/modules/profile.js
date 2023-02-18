import { http, set_email_storage, set_language_storage, set_order_storage, get_local_storage, push_route } from '@/api/http'
// import router from '@/router/router.js'
// import axios from 'axios'
//del_local_storage

export default {
    namespaced: true,
    state: {
        // -------------------------------------------- user and order ------------------ //
        user_data: {
            "email" : "",
            "phone" :"",
            "first_name" : "",
            "last_name" : "",
            "address" : "",
            "shopify_id" : null,
            "currency" : ""
        },
        orders_data: null,
        language: "EP",
        context : null,
        user_profile: {
            "id": null,
            "phone":"23123",
            "first_name":"",
            "last_name":"",
            "name_a":"",
            "name_b":"",
            "name_c":"",
            "name_d":"",
            "location":"",
            "event_date":"",
            "preview":null,
            "finalview":null,
            "extra_info":"",
            "email":null,
            "order":null,
        },
        user_order: {
            "id":null,
            "product_title":"",
            "order_number":"",
            "shopify_order_id": "",
            "status":null,
            "phone":"",
            "first_name":"",
            "last_name":"",
            "date":"",
            "created":"",
            "product": null,
            "email": null
         },
         user_product: {
            "id":null,
            "product_title":"",
            "product_id":"",
            "items":null,
            "counts":"",
            "input_box":"",
            "description_index":"",
            "content_text":"",
            "front_content_text":"",
            "guide_text":"",
            "image_url":"",
            "review_url":"",
            "parts":""
         },

        // -------------------------------------------- profile ------------------------
    },
    mutations: {
        // -------------------------------------------- user and order ------------------ //
        set_user_data(state, user_data) {
            state.user_data = user_data
        },
        set_orders_data(state, orders_data) {
            state.orders_data = orders_data
        },
        set_language(state, language) {
            state.language = language
        },
        // -------------------------------------------- profile ------------------------
        set_user_profile(state, profile) {
            state.user_profile = profile
        },
        set_user_order(state, order) {
            state.user_order = order
        },
        set_user_product(state, product) {
            state.user_product = product
        },
    },
    actions: {
        ////--------get customer information with email
        async get_user({ state, commit }, email) {
            // find user wieh email
            if (email != null) {
                await http.user_verify(email)
                    .then((resp) => {
                        commit('set_user_data', resp.data)
                        set_email_storage(email)
                        set_language_storage(state.language)
                        // find user orders
                        http.order_verify(resp.data)
                            .then((resp) => {
                                commit('set_orders_data', resp.data)
                                push_route('customerorder')
                            })
                            .catch(() => {
                                push_route('noorder')
                            })
                    })
                    .catch(() => {
                        push_route('notfound')
                    })
            }
            else{
                push_route('notfound')
            }
        },

// 0. web initialize functions
    //---------------------- enter order.vue page
        async init_page({ state, dispatch }) {
            const storage_data = get_local_storage();
            if ( !state.user_data.email) {
                if (storage_data.email != null && storage_data.email) {
                    dispatch("get_user", storage_data.email)
                }
                else if(!storage_data.email || storage_data.email == null){
                    push_route('notfound')
                }
                else{
                    push_route('notfound')
                }
            }
        },

// 1. when user refresh in profile view
        async init_profile({ state, commit, dispatch }) {
            if ( !state.user_data.email) {
                const storage_data = get_local_storage();
                await http.user_verify(storage_data.email)
                    .then((resp) => {
                        commit('set_user_data', resp.data)
                        // find user orders
                        http.order_verify(resp.data)
                            .then((resp) => {
                                commit('set_orders_data', resp.data)
                                push_route('profile')
                            })
                            .catch(() => {
                                push_route('noorder')
                            })
                        http.user_profile( storage_data.order)
                        .then((resp=>{
                            commit('set_user_profile', resp.data[0])
                            commit('set_user_order', resp.data[1])
                            commit('set_user_product', resp.data[2])
                            dispatch("content/init_content", {
                                "order_id": resp.data[1].id,
                                "product_id": resp.data[1].product
                            }, { root: true })
                            push_route('profile')
                        }))
                    })
                    .catch(()=>{
                        push_route('notfound')
                    })
            }
        },

// 2. customer order function
        // -------------- get profile ---------------------//
        async get_profile({ dispatch, commit, }, { order_id }) {
            await http.user_profile(order_id)
                .then((resp) => {
                    commit('set_user_profile', resp.data[0])
                    commit('set_user_order', resp.data[1])
                    commit('set_user_product', resp.data[2])
                    set_order_storage(order_id)

                    // ------------------ init content ----------------//
                    dispatch("content/init_content", {
                        "order_id": resp.data[1].id,
                        "product_id": resp.data[1].product
                    }, { root: true })
                    push_route('profile')
                })
        },

// 3. profile submit button click
        async submit_profile({ commit }, { profile_id, data }) {
            await http.update_profile(profile_id, data)
                .then((resp) => {
                    commit('set_user_profile', resp.data[1])
                    commit('set_user_order', resp.data[0])
                    push_route('content')
                })
        },
    }
}


