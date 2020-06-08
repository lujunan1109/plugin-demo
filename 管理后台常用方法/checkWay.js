Tools.checkPhone = function (target, phone) {
    if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(phone))) {
        target.toast(target, '手机号码有误，请重填', 'error')
        return false;
    }
    return true
}

Tools.checkSignName = function (target, name) {
    if (!(/^[0-9a-zA-Z\u4e00-\u9fa5]+$/.test(name))) {
        target.toast(target, '标签只允许设置中文、数字以及字母', 'error')
        return false;
    }
    return true
}

// 名字除首尾第一个字外其他都为*
Tools.formatName = function (name) {
    let newStr;
    if (name.length === 2) {
        newStr = name.substr(0, 1) + '*';
    } else if (name.length > 2) {
        let char = '';
        for (let i = 0, len = name.length - 2; i < ((len > 4) ? 4 : len); i++) {
            char += '*';
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else {
        newStr = name;
    }
    return newStr;
}

// 判断是否是数字（是：true，否：false）
Tools.judgeIsNum = function (value) {
    console.log(value, typeof value)
    if (typeof value == 'string') {
        if (Number(value)) {
            return true;
        } else {
            return false
        }
    } else if (typeof value == 'number') {
        return true;
    }
}

// 判断是否有特殊符号（是：true，否：false）
Tools.hasSpecial = function (str) {
    console.log(str, typeof str, str == "number", str.toString())
    var stri = str.toString();
    console.log(stri, typeof stri)
    if (stri == 0) return false;
    for (var i in stri) {
        var asc = stri.charCodeAt(i);
        if (!(asc >= 48 && asc <= 57 || asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
            return true;
        }
    }
    return false;
}

Tools.turnMoney = function (val) {
    return Number(val).toFixed(2);
}

// 请求常用，参数序列化
Tools.handleGetParam = function (params) {
    var data = ''
    for (var key in params) {
        data = data + '&' + key + '=' + params[key]
    }
    return data.substring(1);
}

export default Tools;