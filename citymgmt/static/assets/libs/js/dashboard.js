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

        option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    orient: 'vertical',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 100,
                    left: null,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    width: 55,
                    height: null,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#999'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    symbol: 'none',
                    lineStyle: {
                        color: '#555'
                    },
                    checkpointStyle: {
                        color: '#bbb',
                        borderColor: '#777',
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false,
                        normal: {
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },
                    data: []
                },
                title: [{
                    text: '',
                    textAlign: 'center',
                    left: '73%',
                    top: '15%',
                    textStyle: {
                        fontSize: 100,
                        color: 'rgba(123, 123, 123, 0.7)'
                    }
                }],
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                tooltip: {
                    trigger: 'item'
                },


                leaflet: {
                    center: [-5.89545, 54.5952],
                    zoom: 14,
                    roam: true,
                },
                legend: {
                    orient: 'vertical',
                    y: 'top',
                    x: 'right',
                    data: ['AQI', 'CO', 'NO2', 'O3', 'pm10', 'pm25', 'SO2'],
                    textStyle: {
                        color: '#030101',
                        fontSize: 15, fontWeight: 'bold'
                    }
                },
                visualMap: {
                    min: 0,
                    max: 50,
                    calculable: true,
                    inRange: {
                        color: ['#11ba16', '#f4a053', '#d91631']
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
                series: [
                    {
                        name: 'AQI',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[0],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#dd4368'
                            }
                        }
                    },
                    {
                        name: 'CO',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[1],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#7edd3f'
                            }
                        }
                    },
                    {
                        name: 'NO2',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[2],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#8a69dd'
                            }
                        }
                    },
                    {
                        name: 'O3',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[3],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#6e8fdd'
                            }
                        }
                    },
                    {
                        name: 'pm10',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[4],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#78ddca'
                            }
                        }
                    }


                ],


                //animationEasing: 'elasticOut',

                animationEasing: 'elasticOut',
                /*animationDelayUpdate: function (idx) {
        return idx * 5;
    }*/
                //animationDurationUpdate: 10000,
                //animationEasingUpdate: 'quinticInOut'
            },
            options: []
        };


        for (var n = 0; n < 100; n++) {

            var utcchar = data2[0][n].utc;
            convertedData = [
                convertData(data1, "no2", utcchar),
                convertData(data1, "pm10", utcchar),
                convertData(data1, "so2", utcchar),
                convertData(data1, "pm25", utcchar),
                convertData(data1, "o3", utcchar)
            ];
            //convertedBikeStationDataVerbose = [convertBikeStationDataVerbose(data,n)];

            // convertedBikeStationData = [convertBikeStationData(data,n)];

            // convertedData = [
            // convertedBikeStationDataVerbose[0].sort(compare("Rentals")).slice(0, 5),
            //   convertedBikeStationDataVerbose[0].sort(compare("Rentals")).slice(-5)
            // ];


            //var
            option.baseOption.timeline.data.push(n + 2016);

            option.options.push({
                series: [
                    {
                        name: 'AQI',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[0],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#dd4368'
                            }
                        }
                    },
                    {
                        name: 'CO',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[1],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#7edd3f'
                            }
                        }
                    },
                    {
                        name: 'NO2',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[2],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#8a69dd'
                            }
                        }
                    },
                    {
                        name: 'O3',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[3],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#6e8fdd'
                            }
                        }
                    },
                    {
                        name: 'pm10',
                        type: 'heatmap',
                        coordinateSystem: 'leaflet',
                        //symbolSize: function (val) {
                        //  return Math.min(Math.max(val[2] / 1, 10),10.5);
                        //},
                        data: convertedData[4],
                        encode: {
                            value: 2
                        },
                        itemStyle: {
                            normal: {
                                color: '#78ddca'
                            }
                        }
                    }


                ]


            });
            /*option.options.push({
            title: {
                show: true,
                'text': n+2016 + ''
            },
            series: [{
        name: 'Male',
        type: 'bar',
        data: convertedPopulationData[n].MalePopArray.slice(0, 89),
    }, {
        name: 'Female',
        type: 'bar',
        data: convertedPopulationData[n].FemalePopArray.slice(0, 89),

    }]
        });*/
            myChart.setOption(option);
        }


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

