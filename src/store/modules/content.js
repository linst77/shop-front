import { http } from '@/api/http'

export default {
    namespaced: true,
    state: {
        // from django db_content

        // if modal window needs to pop up
        status_modal: false,
        loading_win : false,
        // if there is text needed
        text_input_modal: false,
        // each text
        text_content: null,
        text_index: null,
        text_order: null,


        content_status: false,
        clicked_image: null,
        clicked_id: null,
        clicked_index: null,
        clicked_order: null,
        clicked_type : null,
        guide_overlay: false,

        rotation : 0,

        // from django db_content
        file_data: [],
        content_user_data: {},

    },
    mutations: {
        set_file_data(state, data) {
            state.file_data = data
        },
        set_content_status(state, status) {
            state.file_status = status
        },
        set_status_modal(state, data) {
            state.status_modal = data
        },
        set_loading_win(state, data) {
            state.loading_win = data
        },
        set_status_text_input(state, data) {
            state.text_input_modal = data
        },
        set_text_input(state, data) {
            state.text_content = data
        },
        set_text_index(state, data) {
            state.text_index = data
        },
        set_text_order(state, data) {
            state.text_order = data
        },
        set_clicked_image(state, data) {
            state.clicked_image = data
        },
        set_clicked_id(state, data) {
            state.clicked_id = data
        },
        set_clicked_type(state, data){
            state.clicked_type = data
        },
        set_clicked_index(state, data) {
            state.clicked_index = data
        },
        set_clicked_order(state, data) {
            state.clicked_order = data
        },
        set_rotation( state, data){
            state.rotation = data
        },
        set_context_data(state, data) {
            state.content_user_data = data
            state.content_user_data.sub_title = JSON.parse(data.sub_title)
        },
    },
    actions: {
        // ------------------------------------------ user and order -----------------//
        async init_content({ commit }, { order_id, product_id }) {
            await http.getUserFiles(order_id, product_id)
                .then((resp) => {
                    commit('set_file_data', resp.data)
                    http.getContext(order_id)
                        .then((resp) => {
                            commit('set_context_data', resp.data)
                        })
                })
                .catch((err) => {
                    err
                })
        },


        // ----------------------- card image orders ----------------------- //
        sort_save({ state }, { index }) {
            var data = []
            if (state.file_data.length == 0) {
                return
            }
            else {
                for (var i = 0; i < state.file_data[index].length; i++) {
                    var item_id = state.file_data[index][i].id
                    data.push(
                        {
                            "id": item_id,
                            "orders": state.file_data[index][i].orders
                        }
                    )
                }
                http.sortFile(data)
            }
        },

        // ------------------------ content files upload --------------------- //
        async put_files({ state }, { id, data, index }) {
            await http.patchFile(id, data)
                .then((resp) => {
                    for (var i = 0; i < state.file_data[index].length; i++) {
                        if (state.file_data[index][i].id == resp.data.id) {
                            state.file_data[index][i] = resp.data
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        /// Cropper each file changes
        async put_eachfile({ state, commit }, { id, data }) {
            commit('set_status_modal', false)
            commit('set_loading_win', true)
            console
            
            await http.patchFile(id, data)
                .then((resp) => {
                    for (var i = 0; i < state.file_data.length; i++) {
                        for (var j = 0; j < state.file_data[i].length; j++) {
                            if (state.file_data[i][j].id == id) {
                                state.file_data[i][j].files = resp.data.files
                                state.file_data[i][j].thumbnail = resp.data.thumbnail
                                commit('set_clicked_image', resp.data.files)
                                commit('set_loading_win', false)
                                commit('set_status_modal', true)
                            }
                        }
                    }
                })
        },

        async crop_files({ state, commit }, { id, angle, data }) {
            await http.cropFile(id, angle, data)
                .then((resp) => {
                    for (var i = 0; i < state.file_data.length; i++) {
                        for (var j = 0; j < state.file_data[i].length; j++) {
                            if (state.file_data[i][j].id == id) {
                                state.file_data[i][j].files = resp.data.files
                                state.file_data[i][j].thumbnail = resp.data.thumbnail
                                commit('set_clicked_image', resp.data.files)
                            }
                        }
                    }
                })
        },


        /// Cropper test update
        async patch_context({ rootState, commit }) {
            let patch_id = rootState.content.content_user_data.id
            if (rootState.content.content_user_data.sub_title == null) { return }
            let patch_data = {
                "id": patch_id,
                "sub_title": JSON.stringify(rootState.content.content_user_data.sub_title)
            }
            await http.patchContext(patch_id, patch_data)
                .then((resp) => {
                    commit('set_context_data', resp.data)
                })
        },
        // review confirm
        async update_review( {commit}, {data}){
            http.review_confirm( data)
            .then((resp)=>{
                commit('profile/set_user_order', resp.data, { root: true } )
            })
        },
        /// final submit generating json in server
        async final_submit( {commit }, {id}){
            http.finalSubmit( id)
            .then((resp)=>{
                commit('profile/set_user_order', resp.data, { root: true } )
            })
        },

    }
}


