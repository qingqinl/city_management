var myChart = echarts.init(document.getElementById('map'));

$.getJSON('http://localhost:8000/api/bike', function(data) {

  var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lng, data[i].lat];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].available_bikes)
      });
    }
  }
  return res;
};

  var convertDataforOU = function (data) {
  var resOU = [];
  for (var i = 0; i < data.length; i++) {
    var availbikenumber = data[i].available_bikes;

      resOU = resOU.concat(availbikenumber);
  }
  return resOU;
};

var convertDataforOUN = function (data) {
  var resOU = [];
  for (var i = 0; i < data.length; i++) {
    var availbikenumber = data[i].name;

      resOU = resOU.concat(availbikenumber);
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

  var convertedData = [
    convertData(data.sort(compare("available_bikes")).slice(0, 6)),
      convertData(data.sort(compare("available_bikes")).slice(-5))
];

  var overuseData=[ convertDataforOU(data.sort(compare("available_bikes")).slice(0,6)),
  convertDataforOU(data.sort(compare("available_bikes")).slice(-5)),
      convertDataforOUN(data.sort(compare("available_bikes")).slice(0,6)),
      convertDataforOUN(data.sort(compare("available_bikes")).slice(-5))
  ];

console.log(convertedData);
console.log(overuseData);
myChart.setOption({
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
        width: '10%'
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
        data: overuseData[2].concat(overuseData[3])
    },
  leaflet: {
    center: [-6.254614,53.345922],
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
        max: 40,
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
      data: convertData(data),
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
      name: 'Under Use 5',
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


});


