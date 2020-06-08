
// 时间戳转化
Time.dateFormatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
        }
    }
    return fmt;
}

Time.padLeftZero = function (str) {
    return ('00' + str).substr(str.length);
};

// 验证码倒计时，仅供参考逻辑
Time.timeDjs = function (timeOutCode) {
    let time = setInterval(() => {
        timeOutCode--;
        if (timeOutCode == 0) {
            clearInterval(time)
            timeOutCode = 60;
        }

    }, 1000);
}

// 返回时间戳-》时间格式转化
Time.formatDate = function (dateStr, type = 'YYYY-MM-DD') {
    var timestap = dateStr.match(/(\d+)/g, (m) => {
        return m;
    })[0]
    var dateObj = new Date(Number(timestap))
    var formatStr = this.formatTime(dateObj, type)
    return formatStr;
}

Time.formatTime = function (time, format = "yyyy-mm-dd") {
    const d = time ? new Date(time) : new Date();
    const t = i => {
        return (i < 10 ? "0" : "") + i;
    };

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const weekday = d.getDay();

    return format.replace(
        /(yy){1,2}|m{1,2}|d{1,2}|h{1,2}|i{1,2}|s{1,2}|w{1,2}/gi,
        function (r) {
            switch (r.toUpperCase()) {
                case "YY":
                    return ("" + year).substr(2);
                case "YYYY":
                    return year;
                case "M":
                    return month;
                case "MM":
                    return t(month);
                case "D":
                    return day;
                case "DD":
                    return t(day);
                case "H":
                    return hour;
                case "HH":
                    return t(hour);
                case "I":
                    return minutes;
                case "II":
                    return t(minutes);
                case "S":
                    return seconds;
                case "SS":
                    return t(seconds);
                case "W":
                    return `星期${
                        ["日", "一", "二", "三", "四", "五", "六"][weekday]
                        }`;
                case "WW":
                    return [
                        "Sunday",
                        "Monday",
                        "TuesDay",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ][weekday];
            }
        }
    );
};

// 两个时间之间的分钟数
Time.getMinuteInDates = function (date1, date2) {
    var beginDate = new Date(Date.parse(date1.replace(/-/g, "/")));
    var endDate = new Date(Date.parse(date2.replace(/-/g, "/")));

    var date = endDate.getTime() - beginDate.getTime();

    var time = Math.floor(date / (1000 * 60));
    return time;
}

// yy/mm/dd hh:mm:ss-> yy-mm-dd
Time.replaceExp = function (str) {
    let str = str.split(' ')[0].replace(/\//g, '-');
    return str;
}

// 时间 个数转十数
Tools.addZero = function (num) {
    return num < 10 ? '0' + num : num
}

// 倒计时
// 返回发帖后出现的时间
Time.calcTime = function (timeStr, ServerNowTime, flag = 1) {
    let time = new Date(timeStr).getTime();
    let nowTime = ServerNowTime;
    let diffTime = '';
    diffTime = time - nowTime; // 时间戳之差

    if (diffTime == 0) {
        return {
            diffDay: this.addZero(0),
            diffHour: this.addZero(0),
            diffMin: this.addZero(0),
            diffSec: this.addZero(0),
        };
    } else {
        let diffYear = Math.floor(diffTime / (365 * 24 * 3600 * 1000))
        let diffMonth = Math.floor(diffTime / (30 * 24 * 3600 * 1000))
        let diffDay = Math.floor(diffTime / (24 * 3600 * 1000))
        let diffHour = Math.floor(diffTime % (24 * 3600 * 1000) / (3600 * 1000)); // 小时数
        let tmp1 = diffTime % (3600 * 1000); // 除去小时数剩余的时间
        let diffMin = Math.floor((diffTime % (3600 * 1000)) / (60 * 1000)); // 分钟数
        let tmp2 = tmp1 % (60 * 1000);
        let diffSec = Math.floor(tmp2 / 1000); // 秒数
        if (flag == 1) {
            return {
                diffDay: this.addZero(diffDay),
                diffHour: this.addZero(diffHour),
                diffMin: this.addZero(diffMin),
                diffSec: this.addZero(diffSec),
            };
        } else if (flag == 2) {
            if (diffYear) {
                return diffMonth + '年前'
            } else if (diffMonth) {
                return diffMonth + '月前'
            } else if (diffDay) {
                return diffDay + '天前'
            } else if (diffHour) {
                return diffHour + '小时前'
            } else if (diffMin) {
                return diffMin + '分钟前'
            }
        }
    }
}




export default Time