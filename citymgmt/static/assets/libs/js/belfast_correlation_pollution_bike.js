var myChart = echarts.init(document.getElementById('map'));

$.when($.getJSON('/static/json/corrbike.json'),$.getJSON('/static/json/timeline.json'),$.getJSON('/static/json/corrpollution.json')).done(function(data1,data2,data3) {
//"2019-03-31T23:00:00.000Z"
        var convertData = function (data1, parameter,  utc) {
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
console.log(data1);
        var GetStaitionUsageData = function (data1, data3, id, pollutant) {
            var res = []; var tempv = 0; var tempu = 0;
            for (var i = 0; i < data3[0].length; i++) {
                if (data3[0][i].index_id % 113 == id) {
                    tempv = tempv + Number(data3[0][i].aqi);
                }}
                for (var i = 0; i < data1[0].length; i++) {
                if (data1[0][i].index_id % 113 == id) {
                    tempu = tempu + Number(data1[0][i].available_bikes);
                }
            }
            res.push([tempu,tempv/10]);
            return res;
        };

    var BikeUsageConvertedData=[];
    for (var j = 1; j <= 112; j++)
    {
        BikeUsageConvertedData = BikeUsageConvertedData.concat(GetStaitionUsageData(data1, data3, j, 'aqi'));
    }

        function compare(property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value1 - value2;
            }
        }


console.log(BikeUsageConvertedData);

//console.log(convertedData);


option = {
    xAxis: {name:'Bike Usage'},
    yAxis: {name:'Pollution Index',min:30,max:40},
    series: [{
        symbolSize: 20,
        data: BikeUsageConvertedData,
        type: 'scatter'
    }]
};

myChart.setOption(option);

//myChart.on('brushselected', renderBrushed);

        setTimeout(() => {
            myChart.convertToPixel('leaflet', [0, 0]);
        }, 2000);

// https://developer.mozilla.org/en-US/docs/Web/Events/resize
        (function () {
            var throttle = function (type, name, obj) {
                obj = obj || window;
                var running = false;
                var func = function () {
                    if (running) {
                        return;
                    }
                    running = true;
                    requestAnimationFrame(function () {
                        obj.dispatchEvent(new CustomEvent(name));
                        running = false;
                    });
                };
                obj.addEventListener(type, func);
            };

            /* init - you can init any event */
            throttle("resize", "optimizedResize");
        })();

// handle event
        window.addEventListener("optimizedResize", function () {
            myChart.resize({
                width: 'auto',
                height: 'auto'
            });
        });

        /*setTimeout(function () {

}, 0);*/
        /*
function renderBrushed(params) {
    var mainSeries = params.batch[0].selected[0];

    var selectedItems = [];
    var categoryData = [];
    var barData = [];
    var maxBar = 30;
    var sum = 0;
    var count = 0;

    for (var i = 0; i < mainSeries.dataIndex.length; i++) {
        var rawIndex = mainSeries.dataIndex[i];
        var dataItem = convertedData[0][rawIndex];
        var pmValue = dataItem.value[2];

        sum += pmValue;
        count++;

        selectedItems.push(dataItem);
    }

    selectedItems.sort(function (a, b) {
        return a.value[2] - b.value[2];
    });

    for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
        categoryData.push(selectedItems[i].name);
        barData.push(selectedItems[i].value[2]);
    }

    this.setOption({
        yAxis: {
            data: categoryData
        },
        xAxis: {
            axisLabel: {show: !!count}
        },
        title: {
            id: 'statistic',
            text: count ? '平均: ' + (sum / count).toFixed(4) : ''
        },
        series: {
            id: 'bar',
            data: barData
        }
    });
}
*/



});

