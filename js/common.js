function getLocalTime(time){

    if(time == "" || time == undefined || time == null || time == "null" || time == "undefined"){
        return "";
    }else{
        var dtA = new Date(time);

        var year = dtA.getFullYear();
        var month = (dtA.getMonth()+1);
        if (("" + month).length  == 1) { month  = "0" + month;  }
        var date = dtA.getDate();
        if (("" + date).length  == 1) { date  = "0" + date;  }
        var hour = dtA.getHours();
        if (("" + hour).length  == 1) { hour  = "0" + hour;  }
        var minute = dtA.getMinutes();
        if (("" + minute).length  == 1) { minute  = "0" + minute;  }

        var finish = year+"-"+month+"-"+date+" "+hour+":"+minute;

        return finish;
    }
}

function isUTCString(sDate){
    if(sDate == undefined){
        return false;
    }
    var regExDate = /\b\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\dZ\b/;
    if (sDate.trim().match(regExDate)) {
        return true;
    } else{
        return false;
    }
}

/**
 * Change Date string format -> yyyy-MM-dd
 * @param {String} sDate
 * @returns {String}
 */
function changeDateFormat(sDate){
    if(sDate == "" || sDate == undefined || sDate == null || sDate == "null" || sDate == "undefined"){
        return "";
    }
    sDate = sDate.trim();
    var regExDate = [/\b\d{4}(?:0[1-9]|1[0-2])(?:0[1-9]|[1-2]\d|3[0-1])\b/
        ,/\b\d{4}[-/.](?:0[1-9]|1[0-2])[-/.](?:0[1-9]|[1-2]\d|3[0-1])\b/
        ,/\b\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\dZ\b/];
    var specialCharacter = /[/.]/gi;
    for(var i = 0; i < regExDate.length; i++){
        var res = sDate.match(regExDate[i]);
        if( res != undefined ){
            res = res[0];
            switch ( i ){
                case 0: // yyyyMMdd
                    return res.substring(0,4) + '-'
                        + res.substring(4,6) + '-'
                        + res.substring(6,8);
                case 1: // yyyy-MM-dd , yyyy/MM/dd , yyyy.MM.dd
                    return res.replace(specialCharacter,'-');
                case 2: // UTC Type
                    return res.substring(0,10);
                default:
                    return'';
            }
        }
    }
    // Test string is not a date format
    return '';
}

/**
 * Change Time string format -> hh:mm
 * @param {String} sTime
 * @returns {String}
 */
function changeTimeFormat(sTime){
    if(sTime == "" || sTime == undefined || sTime == null || sTime == "null" || sTime == "undefined"){
        return "";
    }
    sTime = sTime.trim();
    var regExDate = [/\b\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\dZ\b/,
        /\b(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:Z)\b/,
        /\b(?:[0-1]\d|2[0-3]):[0-5]\d\b/,
        /\b(?:[0-1]\d|2[0-3])[0-5]\d\b/];
    for(var i = 0; i < regExDate.length; i++){
        var res = sTime.match(regExDate[i]);
        if( res != undefined ){
            res = res[0];
            switch (i){
                case 0: // UTC Type
                    return res.substring(11,16);
                case 1: // hh:mm:ssZ | hh:mm:ss
                    return res.replace('Z','').substring(0,5);
                case 2: // hh:mm
                    return res;
                case 3: // hhmm
                    var hh = res.slice(0,2);
                    var mm = res.slice(2,4);
                    return hh + ':' + mm;
                default :
                    return '';
            }
        }
    }
    // Test string is not a date format
    return '';
}


/**
 * Change DateTime string format -> yyyy-MM-dd hh:mm
 * @param {String} sDateTime
 * @returns {String}
 */
function changeDateTimeFormat(sDateTime){
    if(sDateTime == "" || sDateTime == undefined || sDateTime == null || sDateTime == "null" || sDateTime == "undefined"){
        return "";
    }
    sDateTime = sDateTime.trim();
    var regExDate = [/\b\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\dZ\b/
        ,/\b\d{4}[-/.](?:0[1-9]|1[0-2])[-/.](?:0[1-9]|[1-2]\d|3[0-1])[ /](?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d\b/
        ,/\b\d{4}[-/.](?:0[1-9]|1[0-2])[-/.](?:0[1-9]|[1-2]\d|3[0-1])[ /](?:[0-1]\d|2[0-3]):[0-5]\d\b/
        ,/\b\d{4}(?:0[1-9]|1[0-2])(?:0[1-9]|[1-2]\d|3[0-1])(?:[0-1]\d|2[0-3])[0-5]\d\b/,];
    var specialCharacter = /[/.]/gi;
    for(var i = 0; i < regExDate.length; i++){
        var res = sDateTime.match(regExDate[i]);
        if( res != undefined ){
            res = res[0];
            switch (i){
                case 0: // UTC Type
                    return res.replace('T',' ').replace('Z','').substring(0,16);
                case 1: //yyyy-MM-dd , yyyy/MM/dd , yyyy.MM.dd hh:mm:ssZ | hh:mm:ss
                case 2: //yyyy-MM-dd , yyyy/MM/dd , yyyy.MM.dd hh:mm
                    return res.replace(specialCharacter,'-').substring(0,10) +
                        ' ' + res.replace(specialCharacter,'-').substring(11,16);
                case 3:
                    return res.substring(0,4)+ '-' + res.substring(4,6) + '-' + res.substring(6,8) +
                        ' ' + res.substring(8,10) + ':' + res.substring(10,12);
                default :
                    return '';
            }
        }
    }
    // Test string is not a date time format
    return '';
}

/**
 * 현재 시간을 utcTime으로 return 해주는 함수
 * @param date
 */
function changeTimeToUTCTime(date) {
    var dtA = new Date(date);
    return dtA.toISOString();
}