var myChart = echarts.init(document.getElementById('map'));

$.getJSON('/static/json/belfastbikeinone.json', function(data) {
    
  var convertBikeStationData = function (data, month) {
  var res = [];
  for (var i = 0+month; i < data.length-28-month; i+=28) {
    var geoCoord = [data[i].Longfitude-0.001, data[i].Latitude];
    if (geoCoord) {
      res.push({
        name: data[i]["Place name"],
        value: geoCoord.concat(data[i].Rentals)
      });
    }
  }
  return res;
};

  var convertBikeStationDataVerbose = function (data,month) {
  var res = [];
  for (var i = 0+month; i < data.length-28-month; i+=28) {
    var geoCoord = [data[i].Longfitude-0.001, data[i].Latitude];
    if (geoCoord) {
      res.push({
        name: data[i]["Place name"],
        value: geoCoord.concat(data[i].Rentals),
        Rentals:data[i].Rentals,
        Returns:data[i].Returns,
          Year:data[i].Year,
          Month:data[i].Month
      });
    }
  }
  return res;
};



  var convertDataforOU = function (data) {
  var resOU = [];
  for (var i = 0; i < data.length; i+=1) {
    var Rentals = data[i].Rentals;

      resOU = resOU.concat(Rentals
      );
  }
  return resOU;
};

var convertDataforOUN = function (data) {
  var resOU = [];
  for (var i = 0; i < data.length; i+=1) {
    var Rentals = data[i].name;

      resOU = resOU.concat(Rentals
      );
  }
  return resOU;
};

  function compare(property){
         return function(obj1,obj2){
             var value1 = obj1[property];
             var value2 = obj2[property];
             return value1 - value2;
         }
    }

    var convertedBikeStationDataVerbose = [convertBikeStationDataVerbose(data,0)];

    var convertedBikeStationData = [convertBikeStationData(data,0)];

    var convertedData = [
    convertedBikeStationDataVerbose[0].sort(compare("Rentals")).slice(0, 5),
      convertedBikeStationDataVerbose[0].sort(compare("Rentals")).slice(-5)
    ];

    var overuseData= [ convertDataforOU(convertedData[0]),
      convertDataforOU(convertedData[1]),
      convertDataforOUN(convertedData[0]),
      convertDataforOUN(convertedData[1])
    ];

  //convertDataforOUN(convertBikeStationDataVerbose(data,0)[0].sort(compare("Rentals")).slice(0, 5)).concat(convertDataforOUN(convertBikeStationDataVerbose(data,0)[0].sort(compare("Rentals")).slice(-5)))
    console.log(convertedBikeStationDataVerbose);
  console.log(convertedBikeStationData);
console.log(convertedData);
console.log(overuseData);

option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 2000,
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
    grid: {
        right: 40,
        top: 130,
        bottom: 350,
        width: '20%'
    },
    xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        boundaryGap: false,
        splitLine: {show: false},
        axisLine: {show: false},
        axisTick: {show: false},
        axisLabel: {margin: 2, textStyle: {color: '#000',
                    fontFamily: 'sans-serif',
                    fontSize: 15,
                    //fontStyle: 'italic',
                    fontWeight: 'bold'
                }},
    },
    yAxis: {
        type: 'category',
        name: 'TOP 5 overuse and underuse',
        nameGap: 26,
        nameTextStyle: {color: '#f00',fontSize: 16,fontStyle: 'italic',
                    fontWeight: 'bold'},
        axisLine: {show: false, lineStyle: {color: '#fff'}},
        axisTick: {show: false, lineStyle: {color: '#fff'}},
        axisLabel: {interval: 0, textStyle: {color: '#000',
            fontFamily: 'sans-serif',
                    fontSize: 15,
                    //fontStyle: 'italic',
                    fontWeight: 'bold'
          }},
        data: overuseData[2].concat(overuseData[3])//convertDataforOUN(convertBikeStationDataVerbose(data,0).sort(compare("Rentals")).slice(0, 5)).concat(convertDataforOUN(convertBikeStationDataVerbose(data,0).sort(compare("Rentals")).slice(-5)))
//overuseData[2].concat(overuseData[3])
    },
  leaflet: {
    center: [-5.89545,54.5952],
    zoom: 14,
    roam: true,
  },
  legend: {
        orient: 'vertical',
        y: 'top',
        x:'right',
        data:['available bike numbers','Over Use 5','Under Use 5'],
        textStyle: {
            color: '#030101',
          fontSize: 15, fontWeight: 'bold'
        }
    },
    visualMap: {
        min: 0,
        max: 1500,
        calculable: true,
        inRange: {
            color: ['#1317ba', '#c939f4', '#d91631']
        },
        textStyle: {
            color: '#fff'
        }
    },
    series: [{
      name: 'available bike numbers',
      type: 'scatter',
      coordinateSystem: 'leaflet',
      symbolSize: function (val) {
        return Math.min(Math.max(val[2] / 1, 10),10.5);
      },
      data: convertBikeStationData(data,0),
      encode: {
        value: 2
            },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#dd4368'
        }
      }
    },
    {
      name: 'Over Use 5',
      type: 'effectScatter',
      coordinateSystem: 'leaflet',
      data: convertedData[1],
      encode: {
                value: 2
            },
      symbolSize: function (val) {
        return Math.min(Math.max(val[2] / 1, 13),13);
      },
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#c939f4',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    },
      {
      name: 'Under Use 5',
      type: 'effectScatter',
      coordinateSystem: 'leaflet',
      data: convertedData[0],
      encode: {
                value: 2
            },
      symbolSize: function (val) {
        return Math.min(Math.max(val[2] / 1, 13),13);
      },
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#c939f4',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    },
      {
            id: 'bar',
            zlevel: 2,
            type: 'bar',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            },
            data: overuseData[0].concat(overuseData[1])
        }
  ],









    //animationEasing: 'elasticOut',

    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
    //animationDurationUpdate: 10000,
    //animationEasingUpdate: 'quinticInOut'
        },
        options: []
    };

for (var n = 0; n < 28; n++) {

    convertedBikeStationDataVerbose = [convertBikeStationDataVerbose(data,n)];

    convertedBikeStationData = [convertBikeStationData(data,n)];

    convertedData = [
    convertedBikeStationDataVerbose[0].sort(compare("Rentals")).slice(0, 5),
      convertedBikeStationDataVerbose[0].sort(compare("Rentals")).slice(-5)
    ];

    overuseData= [ convertDataforOU(convertedData[0]),
      convertDataforOU(convertedData[1]),
      convertDataforOUN(convertedData[0]),
      convertDataforOUN(convertedData[1])
    ];
        //var
        option.baseOption.timeline.data.push(n+2016);

      option.options.push({
            series: [{
      name: 'available bike numbers',
      type: 'scatter',
      coordinateSystem: 'leaflet',
      symbolSize: function (val) {
        return Math.min(Math.max(val[2] / 1, 10),10.5);
      },
      data: convertBikeStationData(data,0),
      encode: {
        value: 2
            },
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#dd4368'
        }
      }
    },
    {
      name: 'Over Use 5',
      type: 'effectScatter',
      coordinateSystem: 'leaflet',
      data: convertedData[1],
      encode: {
                value: 2
            },
      symbolSize: function (val) {
        return Math.min(Math.max(val[2] / 1, 13),13);
      },
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#c939f4',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    },
      {
      name: 'Under Use 5',
      type: 'effectScatter',
      coordinateSystem: 'leaflet',
      data: convertedData[0],
      encode: {
                value: 2
            },
      symbolSize: function (val) {
        return Math.min(Math.max(val[2] / 1, 13),13);
      },
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: '#c939f4',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    },
      {
            id: 'bar',
            zlevel: 2,
            type: 'bar',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            },
            data: overuseData[0].concat(overuseData[1])
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

//myChart.setOption(option);

//myChart.on('brushselected', renderBrushed);

setTimeout(()=> {
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


