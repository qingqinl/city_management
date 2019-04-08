var myChart = echarts.init(document.getElementById('map'));

$.getJSON('/static/json/population.json', function(data) {

  var convertPopulationData = function (data, year, gender) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = [data[i].Mid_Year_Ending, data[i].Gender, data[i].Age, data[i].Population_Projection];
    if (geoCoord && geoCoord[0]==year && geoCoord[1]==gender) {
      res.push(data[i].Population_Projection);
    }
  }
  return res;
};
var xAxisData=[];
for (var i = 1; i < 91; i++) {
    xAxisData.push(i);
}

var convertedPopulationData=[];
for (var i = 2016; i <= 2041; i++) {
    convertedPopulationData.push(
        {MalePopArray:convertPopulationData(data, i, 'Male'),
      FemalePopArray:convertPopulationData(data, i, 'Female'),
       AllPopArray:convertPopulationData(data, i, 'All People')}
    )
}

  function compare(property){
         return function(obj1,obj2){
             var value1 = obj1[property];
             var value2 = obj2[property];
             return value1 - value2;
         }
    }

//  var convertedData = [
//    convertData(data.sort(compare("available_bikes")).slice(0, 6)),
//      convertData(data.sort(compare("available_bikes")).slice(-5))
//];

console.log(convertedPopulationData);
//console.log(overuseData);
option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 1000,
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
                text: '2016',
                textAlign: 'center',
                left: '73%',
                top: '15%',
                textStyle: {
                    fontSize: 100,
                    color: 'rgba(123, 123, 123, 0.7)'
                }
            }],
            legend: {
        data: ['Male', 'Female'],
        align: 'left'
    },
    toolbox: {
        y: 'bottom',
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            }//,
            //dataView: {},
            //saveAsImage: {
            //    pixelRatio: 2
        //    }
        }
    },
    tooltip: {},
    xAxis: {
        data: xAxisData,
        silent: false,
        nameLocation: 'middle',
        name: 'Age Distribution',
        splitLine: {
            show: false
        },
        nameGap:29
    },
    yAxis: {
                max: 3500,
                min: 0,
        name: 'Number of Persons',
    },



        series: [{
        name: 'Male',
        type: 'bar',
        data: convertedPopulationData[0].MalePopArray.slice(0, 89),
        /*animationDelay: function (idx) {
            return idx * 10;
        }*/
    }, {
        name: 'Female',
        type: 'bar',
        data: convertedPopulationData[0].FemalePopArray.slice(0, 89),
        /*animationDelay: function (idx) {
            return idx * 10 + 100;
        }*/
    }],
    //animationEasing: 'elasticOut',
    /*animationDelayUpdate: function (idx) {
        return idx * 5;
    },*/
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
    //animationDurationUpdate: 10000,
    //animationEasingUpdate: 'quinticInOut'
        },
        options: []
    };
console.log(option.baseOption.toolbox.feature.magicType.type);
for (var n = 0; n < 26; n++) {
    /*if (option.baseOption.toolbox.feature.magicType.type=='stack')
    {option.baseOption.yAxis.max=7000;}
    else {option.baseOption.yAxis.max=3500;};;;;;;*/


        option.baseOption.timeline.data.push(n+2016);
        option.options.push({
            title: {
                show: true,
                'text': n+2016 + ''
            },
            series: [{
        name: 'Male',
        type: 'bar',
        data: convertedPopulationData[n].MalePopArray.slice(0, 89),
        /*animationDelay: function (idx) {
            return idx * 10;
        }*/
    }, {
        name: 'Female',
        type: 'bar',
        data: convertedPopulationData[n].FemalePopArray.slice(0, 89),
        /*animationDelay: function (idx) {
            return idx * 10 + 100;
        }*/
    }]
        });
    }
/*
option = {
    title: {
        text: 'Population'
    },
    legend: {
        data: ['Male', 'Female'],
        align: 'left'
    },
    toolbox: {
        // y: 'bottom',
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            }//,
            //dataView: {},
            //saveAsImage: {
            //    pixelRatio: 2
        //    }
        }
    },
    tooltip: {},
    xAxis: {
        data: xAxisData,
        silent: false,
        name: 'Age Distribution',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        name: 'Number of Persons',
    },
    series: [{
        name: 'Male',
        type: 'bar',
        data: convertedPopulationData[0].MalePopArray.slice(0, 89),
        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: 'Female',
        type: 'bar',
        data: convertedPopulationData[0].FemalePopArray.slice(0, 89),
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
};*/


    myChart.setOption(option);


});


