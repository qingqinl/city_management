var myChart = echarts.init(document.getElementById('map'));

$.getJSON('http://localhost:8000/api/events', function(data) {

  var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].lon, data[i].lat];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].yes_rsvp_count + data[i].maybe_rsvp_count)
      });
    }
  }
  return res;
};
var eventsData = convertData(data);
console.log(eventsData);
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
  leaflet: {
    center: [-6.254614,53.345922],
    zoom: 14,
    roam: true,
  },
  legend: {
        orient: 'vertical',
        y: 'top',
        x:'right',
        data:[],
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
      name: 'Event : Expected attendance',
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


