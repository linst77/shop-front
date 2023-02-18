//// -------- define ref for each input box
//// input ref name define
//// index 
const subtitle_refname = function (index1, index2) {
    let temp = "input_box_" + index1.toString() + "_" + index2.toString()
    return temp
};

//// -------- show input box regarding to django input_box array
//// index = draggable order number : single number
//// list = product.input_box : db from django
const subtitle_showwindow = function (index, lists) {
    let num = lists.length;
    let list
    //// if it is Vue proxy object, convert to array    
    if (typeof lists == "object") {
        list = JSON.parse(JSON.stringify(lists))
    } else list = lists
    if (num > 0) {
        for (let i = 0; i < num; i++) {
            if (index == list[i]) {
                return true;
            }
        }
    }
    else {
        return false
    }
};
const subtitle_readcontext = function (index, order, list) {
    let return_value = undefined || null
    if (list != undefined) {
        let for_order = list[index]

        if (index == for_order.index) {
            let text_array = for_order.text_array
            for (let k of text_array) {
                if (order === k.index) {
                    return k.text
                }
            }
        }
    }
    return return_value
}
export { subtitle_refname, subtitle_showwindow, subtitle_readcontext };
