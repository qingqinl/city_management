var myChart = echarts.init(document.getElementById('map'));

$.when($.getJSON('/static/json/pollutionnewest.json'),$.getJSON('/static/json/timeline.json')).done(function(data1,data2) {
//"2019-03-31T23:00:00.000Z"
        var convertData = function (data1, parameter, utc) {
            var res = [];
            for (var i = 0; i < data1[0].length; i++) {
                var geoCoord = [data1[0][i].longitude, data1[0][i].latitude];
                if (geoCoord && data1[0][i].parameter == parameter && data1[0][i].utc == utc) {
                    res.push(
                        geoCoord.concat(data1[0][i].value));
                }
            }
            return res;
        };


        function compare(property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2;
            }
        }

        var convertedData = [
            convertData(data1, "no2", "2019-03-31T22:00:00.000Z"),
            convertData(data1, "pm10", "2019-03-31T22:00:00.000Z"),
            convertData(data1, "so2", "2019-03-31T22:00:00.000Z"),
            convertData(data1, "pm25", "2019-03-31T22:00:00.000Z"),
            convertData(data1, "o3", "2019-03-31T22:00:00.000Z")
        ];


//console.log(data1);
//console.log(data2);
//console.log(convertedData);