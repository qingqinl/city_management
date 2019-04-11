var myChart = echarts.init(document.getElementById('map'));

$.getJSON('http://localhost:8000/api/pollution', function(data) {

  var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lng, data[i].lat];
    if (geoCoord) {
      res.push(
       geoCoord.concat(data[i].aqi)
      );
    }
  }
  return res;
};

  var convertDataforco = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lng, data[i].lat];
    if (geoCoord) {
      res.push(
       geoCoord.concat(data[i].co)
      );
    }
  }
  return res;
};

var convertDataforno2 = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lng, data[i].lat];
    if (geoCoord) {
      res.push(
       geoCoord.concat(data[i].no2)
      );
    }
  }
  return res;
};

var convertDataforo3 = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lng, data[i].lat];
    if (geoCoord) {
      res.push(
       geoCoord.concat(data[i].o3)
      );
    }
  }
  return res;
};

var convertDataforpm10 = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lng, data[i].lat];
    if (geoCoord) {
      res.push(
       geoCoord.concat(data[i].pm10)
      );
    }
  }
  return res;
};

var convertDataforpm25 = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lng, data[i].lat];
    if (geoCoord) {
      res.push(
       geoCoord.concat(data[i].pm25)
      );
    }
  }
  return res;
};

var convertDataforso2 = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lng, data[i].lat];
    if (geoCoord) {
      res.push(
       geoCoord.concat(data[i].so2)
      );
    }
  }
  return res;
};


  function compare(property){
         return function(obj1,obj2){
             var value1 = obj1[property];
             var value2 = obj2[property];
             return value1 - value2;
         }
    }

  var convertedData = [
      convertData(data),
      convertDataforco(data),
      convertDataforno2(data),
	  convertDataforo3(data),
	  convertDataforpm10(data),
	  convertDataforpm25(data),
	  convertDataforso2(data)
];


console.log(convertedData);
myChart.setOption({

  animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicInOut',
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut',
  tooltip: {
    trigger: 'item'
  },

  leaflet: {
    center: [-6.254614,53.345922],
    zoom: 12,
    roam: true,
  },
  legend: {
        orient: 'vertical',
        y: 'top',
        x:'right',
        data:['AQI','CO','NO2','O3','pm10','pm25','SO2'],
        textStyle: {
            color: '#030101',
          fontSize: 15, fontWeight: 'bold'
        }
    },
  visualMap: {
        min: 0,
        max: 100,
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

      data: convertedData[4],
      encode: {
        value: 2
            },
      itemStyle: {
        normal: {
          color: '#78ddca'
        }
      }
    },
    {
      name: 'pm25',
      type: 'heatmap',
      coordinateSystem: 'leaflet',
      //symbolSize: function (val) {
      //  return Math.min(Math.max(val[2] / 1, 10),10.5);
      //},
      data: convertedData[5],
      encode: {
        value: 2
            },
      itemStyle: {
        normal: {
          color: '#ddca26'
        }
      }
    },
     {
      name: 'SO2',
      type: 'heatmap',
      coordinateSystem: 'leaflet',
      //symbolSize: function (val) {
      //  return Math.min(Math.max(val[2] / 1, 10),10.5);
      //},
      data: convertedData[6],
      encode: {
        value: 2
            },
      itemStyle: {
        normal: {
          color: '#a7ddbe'
        }
      }
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


