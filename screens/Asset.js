const resources = {
     "add_birthday" :require('./../img/add_birthday.png'),
    // "blank_box" :require('./../img/blank_box.png'),
     "delete"     :require('./../img/delete.png'),
    // "down_arrow"     :require('./../img/down_arrow.png'),
    "main_logo"     :require('./../img/main_logo.png'),
    // "notification_off"     :require('./../img/notification_off.png'),
    // "notification_on":require('./../img/notification_on.png'),
     "pic_upload"        :require('./../img/pic_upload.png'),
    // "right_side_bar_on"      :require('./../img/right_side_bar_on.png'),
    // "right_side_bar"     :require('./../img/right_side_bar.png'),
     "small_logo"     :require('./../img/small_logo.png'),
    // "setting_on"     :require('./../img/setting_on.png'),
     "setting"     :require('./../img/setting.png'),
     "user"     :require('./../img/user.png'),
}

export function getAssetByFilename(filename){
    if(resources.hasOwnProperty(filename)){
        return resources[filename];
    }
    return null;
}