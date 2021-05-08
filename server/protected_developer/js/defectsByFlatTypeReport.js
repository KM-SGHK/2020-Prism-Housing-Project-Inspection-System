

async function loadDeveloperReport2() {
  // 1. Load Data
  const res1 = await fetch('/reports_defectsbyFlatType')
  const res2 = await fetch('/reports_type1FlatDefects')
  const overallFlatNumberByTypes = await res1.json();
  const FlatTypes_Defects = await res2.json()

  console.log("testing 1")
  console.log(overallFlatNumberByTypes)
  console.log("testing 2")
  console.log(FlatTypes_Defects)

  // 2. Loop Data
  const developerReport2Container1 = document.querySelector('.devReport-container2-1');
  developerReport2Container1.innerHTML = "";

  const developerReport2Container2 = document.querySelector('.devReport-container2-2');
  developerReport2Container2.innerHTML = "";


  //   //2.1. Set 每類單位urgency classes counter
  // var type1Flat_counter1 = 0
  // var type1Flat_counter2 = 0
  // var type1Flat_counter3 = 0


  // var type2Flat_counter1 = 0
  // var type2Flat_counter2 = 0
  // var type2Flat_counter3 = 0


  // var type3Flat_counter1 = 0
  // var type3Flat_counter2 = 0
  // var type3Flat_counter3 = 0


  // var type4Flat_counter1 = 0
  // var type4Flat_counter2 = 0
  // var type4Flat_counter3 = 0

  // CHART ONE DATA 
  //2.2. 計每類單位數目


  var type1Flat_number = parseInt(overallFlatNumberByTypes.flatType0)
  var type2Flat_number = parseInt(overallFlatNumberByTypes.flatType1)
  var type3Flat_number = parseInt(overallFlatNumberByTypes.flatType2)
  var type4Flat_number = parseInt(overallFlatNumberByTypes.flatType3)

  console.log(type1Flat_number)

  // // 2.3. 計檢驗單位總數
  var totalFlatNumber = type1Flat_number + type2Flat_number + type3Flat_number + type4Flat_number

  // //2.4. 計各類單位佔比
  var type1Flat_percentage = type1Flat_number / totalFlatNumber * 100
  var type2Flat_percentage = type2Flat_number / totalFlatNumber * 100
  var type3Flat_percentage = type3Flat_number / totalFlatNumber * 100
  var type4Flat_percentage = type4Flat_number / totalFlatNumber * 100

  //   // const types = ["1 B.R. with balcony",'1 M.B.R & 1 B.R. with balcony']

  //   // const counters = {
  //   //   "1 B.R. with balcony":{

  //   //   }
  //   // }

  //2.5. 將每類單位問題嚴重程度分等級

  //2.5.1 Type 1 Flats
  let flatType1_goodShape = []
  let flatType1_moderate = []
  let flatType1_serious = []

  let defected_type1_flats = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
    return (FlatTypes_Defects.type == '1 B.R. with balcony')
  })

  for (let defected_type1_flat of defected_type1_flats) {
    if (defected_type1_flat.count <= 5) {
      flatType1_goodShape.push(defected_type1_flat)
    } else if (defected_type1_flat.count >= 6 && defected_type1_flat.count <= 10) {
      flatType1_moderate.push(defected_type1_flat.count)
    } else if (defected_type1_flat.count >= 11) {
      flatType1_serious.push(defected_type1_flat.count)
    }
  }

  console.log("test 1")
  console.log(flatType1_goodShape.length)
  console.log(flatType1_moderate.length)
  console.log(flatType1_serious.length)


  //2.5.2 Type 2 Flats
  let flatType2_goodShape = []
  let flatType2_moderate = []
  let flatType2_serious = []

  let defected_type2_flats = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
    return (FlatTypes_Defects.type == '1 M.B.R & 1 B.R. with balcony')
  })

  for (let defected_type2_flat of defected_type2_flats) {
    if (defected_type2_flat.count <= 5) {
      flatType2_goodShape.push(defected_type2_flat)
    } else if (defected_type2_flat.count >= 6 && defected_type2_flat.count <= 10) {
      flatType2_moderate.push(defected_type2_flat.count)
    } else if (defected_type2_flat.count >= 11) {
      flatType2_serious.push(defected_type2_flat.count)
    }
  }

  console.log("test 2")
  console.log(flatType2_goodShape.length)
  console.log(flatType2_moderate.length)
  console.log(flatType2_serious.length)


  //2.5.3 Type 3 Flats
  let flatType3_goodShape = []
  let flatType3_moderate = []
  let flatType3_serious = []

  let defected_type3_flats = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
    return (FlatTypes_Defects.type == '2 B.R. without balcony')
  })

  for (let defected_type3_flat of defected_type3_flats) {
    if (defected_type3_flat.count <= 5) {
      flatType3_goodShape.push(defected_type3_flat)
    } else if (defected_type3_flat.count >= 6 && defected_type3_flat.count <= 10) {
      flatType3_moderate.push(defected_type3_flat.count)
    } else if (defected_type3_flat.count >= 11) {
      flatType3_serious.push(defected_type3_flat.count)
    }
  }

  console.log("test 3")
  console.log(flatType3_goodShape.length)
  console.log(flatType3_moderate.length)
  console.log(flatType3_serious.length)

  //2.5.4 Type 4 Flats
  let flatType4_goodShape = []
  let flatType4_moderate = []
  let flatType4_serious = []

  let defected_type4_flats = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
    return (FlatTypes_Defects.type == 'studio with balcony')
  })

  for (let defected_type4_flat of defected_type4_flats) {
    if (defected_type4_flat.count <= 5) {
      flatType4_goodShape.push(defected_type4_flat)
    } else if (defected_type4_flat.count >= 6 && defected_type4_flat.count <= 10) {
      flatType4_moderate.push(defected_type4_flat.count)
    } else if (defected_type4_flat.count >= 11) {
      flatType4_serious.push(defected_type4_flat.count)
    }
  }

  console.log("test 4")
  console.log(flatType4_goodShape.length)
  console.log(flatType4_moderate.length)
  console.log(flatType4_serious.length)


  //   // let defected_type1_flats_goodShape_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '1 B.R. with balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count <= 5)
  //   // }).length

  //   // console.log(defected_type1_flats_goodShape_number)

  //   // let defected_type1_flats_moderate_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '1 B.R. with balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count >= 6)
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count <= 10)
  //   // }).length

  //   // let defected_type1_flats_serious_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '1 B.R. with balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count >= 11)
  //   // }).length


  //   //2.5.2 type 2 flats
  //   // let defected_type2_flats_goodShape_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '1 M.B.R & 1 B.R. with balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count <= 5)
  //   // }).length

  //   // let defected_type2_flats_moderate_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '1 M.B.R & 1 B.R. with balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count >= 6)
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count <= 10)
  //   // }).length

  //   // let defected_type2_flats_serious_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '1 M.B.R & 1 B.R. with balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count >= 11)
  //   // }).length


  //   // //2.5.3 type 3 flats
  //   // let defected_type3_flats_goodShape_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '2 B.R. without balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count <= 5)
  //   // }).length

  //   // let defected_type3_flats_moderate_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '2 B.R. without balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count >= 6)
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count <= 10)
  //   // }).length

  //   // let defected_type3_flats_serious_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '2 B.R. without balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count >= 11)
  //   // }).length

  //   // //2.5.4 type 4 flats
  //   // let defected_type4_flats_goodShape_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '2 B.R. without balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count <= 5)
  //   // }).length

  //   // let defected_type4_flats_moderate_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '2 B.R. without balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count >= 6)
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count <= 10)
  //   // }).length

  //   // let defected_type4_flats_serious_number = FlatTypes_Defects.filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.type = '2 B.R. without balcony')
  //   // }).filter(function (FlatTypes_Defects) {
  //   //   return (FlatTypes_Defects.count >= 11)
  //   // }).length

  //2.5.5 naming

  for (i = 0; i < overallFlatNumberByTypes.length; i++) {
    if (overallFlatNumberByTypes[i].type == "1 B.R. with balcony") {
      var type1Flat_name = "一房單位"
    }
    else if (overallFlatNumberByTypes[i].type == "1 M.B.R & 1 B.R. with balcony") {
      var type2Flat_name = "連主人房大單位"
    } else if (overallFlatNumberByTypes[i].type == "2 B.R. without balcony") {
      var type3Flat_name = "兩房單位"
    } else if (overallFlatNumberByTypes[i].type == "studio with balcony") {
      var type4Flat_name = "開放式單位"
    }
  }



  // defected_type1_flats.map(function (defected_type1_flats) {
  //   if (defected_type1_flat.count <= 5) {
  //     return flatType1_goodShape.push(defected_type1_flat)
  //   // } else if (defected_type1_flat.count >= 6 && defected_type1_flat.count <= 10) {
  //   //   return flatType1_moderate.push(defected_type1_flat)
  //   // } else if (defected_type1_flat.count >= 11) {
  //   //   return flatType1_serious.push(defected_type1_flat)
  //   // }
  // }})

  // console.log(flatType1_goodShape.length)
  // console.log(flatType1_moderate.length)
  // console.log(flatType1_serious.length)
  // console.log(flatType1_moderate.length)
  // console.log(flatType1_serious.length)
  // }).filter(function (FlatTypes_Defects) {
  //       return (FlatTypes_Defects.count >= 6)
  //     }).filter(function (FlatTypes_Defects) {
  //       return (FlatTypes_Defects.count <= 10)
  //     }).length
  // console.log("NEW NEW TEST")
  //   console.log(defected_type1_flats)

  // for (let defected_type1_flat of  defected_type1_flats) {

  //         if (parseInt(defected_type1_flat.count) <= 5) {
  //             type1Flat_counter1 += 1
  //         } else if (parseInt(defected_type1_flat.count) >= 6 && parseInt(defected_type1_flat.count <= 10)) {
  //             type1Flat_counter2 += 1
  //         } else if (parseInt(defected_type1_flat.count) >= 11) {
  //             type1Flat_counter3 += 1
  //         }}
  //   //     } if (FlatTypes_Defects[i].type == "1 M.B.R & 1 B.R. with balcony") {
  //   //         var type2Flat_name = "連主人房大單位"
  //   //         if (parseInt(FlatTypes_Defects[i].count) <= 5) {
  //   //             type2Flat_counter1 += 1
  //   //         } else if (parseInt(FlatTypes_Defects[i].count) >= 6 && parseInt(FlatTypes_Defects[i].count) <= 10) {
  //   //             type2Flat_counter2 += 1
  //   //         } else if (parseInt(FlatTypes_Defects[i].count) >= 11) {
  //   //             type2Flat_counter3 += 1
  //   //         }
  //   //     } if (FlatTypes_Defects[i].type == "2 B.R. without balcony") {
  //   //         var type3Flat_name = "兩房單位"
  //   //         if (parseInt(FlatTypes_Defects[i].count) <= 5) {
  //   //             type3Flat_counter1 += 1
  //   //         } else if (parseInt(FlatTypes_Defects[i].count) >= 6 && parseInt(FlatTypes_Defects[i].count) <= 10) {
  //   //             type3Flat_counter2 += 1
  //   //         } else if (parseInt(FlatTypes_Defects[i].count) >= 11) {
  //   //             type3Flat_counter3 += 1
  //   //         }
  //   //     } if (FlatTypes_Defects[i].type == "studio with balcony") {
  //   //         var type4Flat_name = "開放式單位"
  //   //         if (parseInt(FlatTypes_Defects[i].count) <= 5) {
  //   //             type4Flat_counter1 += 1
  //   //         } else if (parseInt(FlatTypes_Defects[i].count) >= 6 && parseInt(FlatTypes_Defects[i].count) <= 10) {
  //   //             type4Flat_counter2 += 1
  //   //         } else if (parseInt(FlatTypes_Defects[i].count) >= 11) {
  //   //             type4Flat_counter3 += 1
  //   //         }
  // }

  // console.log("NEW TEST")
  // console.log(FlatTypes_Defects)
  //       console.log(type1Flat_counter1)
  // console.log(type1Flat_counter2)
  // console.log(type1Flat_counter3)

  // }

  // // console.log("testing3")
  // // console.log(type1Flat_counter1)
  // // console.log(type1Flat_counter2)
  // // console.log(type1Flat_counter3)

  // // console.log("testing 3.2")
  // // console.log(type2Flat_counter1)
  // // console.log(type2Flat_counter2)
  // // console.log(type2Flat_counter3)

  // // console.log("testing 3.3")
  // // console.log(type3Flat_counter1)
  // // console.log(type3Flat_counter2)
  // // console.log(type3Flat_counter3)

  // // console.log("testing 3.4")
  // // console.log(type4Flat_counter1)
  // // console.log(type4Flat_counter2)
  // // console.log(type4Flat_counter3)




  //2.6. 計每類單位問題嚴重程度分佈
  // var defects_flatType1_percentage1 =type1Flat_counter3/ type1Flat_number * 100
  // var defects_flatType1_percentage2 =type1Flat_counter2/ type1Flat_number * 100
  // var defects_flatType1_percentage3 =type1Flat_counter1/ type1Flat_number * 100



  var defects_flatType1_goodShape_percentage1 = flatType1_goodShape.length / type1Flat_number * 100
  var defects_flatType1_moderate_percentage2 = Math.floor(flatType1_moderate.length / type1Flat_number * 100)
  var defects_flatType1_serious_percentage3 = flatType1_serious.length / type1Flat_number * 100

  var defects_flatType2_goodShape_percentage1 = flatType2_goodShape.length / type2Flat_number * 100
  var defects_flatType2_moderate_percentage2 = flatType2_moderate.length / type2Flat_number * 100
  var defects_flatType2_serious_percentage3 = flatType2_serious.length / type2Flat_number * 100

  var defects_flatType3_goodShape_percentage1 = flatType3_goodShape.length / type3Flat_number * 100
  var defects_flatType3_moderate_percentage2 = flatType3_moderate.length / type3Flat_number * 100
  var defects_flatType3_serious_percentage3 = flatType3_serious.length / type3Flat_number * 100

  var defects_flatType4_goodShape_percentage1 = flatType4_goodShape.length / type4Flat_number * 100
  var defects_flatType4_moderate_percentage2 = flatType4_moderate.length / type4Flat_number * 100
  var defects_flatType4_serious_percentage3 = flatType4_serious.length / type4Flat_number * 100


  // // console.log("testing 3.5")
  // // console.log(defects_flatType1_percentage1)
  // // console.log(defects_flatType1_percentage2)
  // // console.log(defects_flatType1_percentage3)
  // // console.log(type1Flat_number)

  // // console.log("testing 3.6")
  // // console.log(defects_flatType2_percentage1)
  // // console.log(defects_flatType2_percentage2)
  // // console.log(defects_flatType2_percentage3)
  // // console.log(type2Flat_number)

  // // console.log("testing 3.7")
  // // console.log(defects_flatType3_percentage1)
  // // console.log(defects_flatType3_percentage2)
  // // console.log(defects_flatType3_percentage3)

  // // console.log("testing 3.8")
  // // console.log(defects_flatType4_percentage1)
  // // console.log(defects_flatType4_percentage2)
  // // console.log(defects_flatType4_percentage3)


  //2.7. innerHTML-Chart 1
  developerReport2Container1.innerHTML += `
      <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">已檢驗單位類型</th>
          <th scope="col">佔已檢驗單位總數百份比(%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">一房單位</th>
          <td>${type1Flat_percentage}</td>
        </tr>
        <tr>
        <th scope="row">連主人房大單位</th>
        <td>${type2Flat_percentage}</td>
        </tr>
        <tr>
        <th scope="row">兩房單位</th>
        <td>${type2Flat_percentage}</td>
        </tr>
        <tr>
        <th scope="row">開放式單位</th>
        <td>${type4Flat_percentage}</td>
        </tr> 
      </tbody>
    </table>




      `
  // 2.8. InnerHTML-Chart 2
  developerReport2Container2.innerHTML += `

      <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">已檢驗單位類型</th>
        <th scope="col">問題極為嚴重單位佔比(>11)(%)</th>
        <th scope="col">問題頗為嚴重單位佔比(6-10)(%)</th>
        <th scope="col">問題不算嚴重單位佔比(0-5)(%)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">一房單位</th>
        <td>${defects_flatType1_serious_percentage3}</td>
        <td>${defects_flatType1_moderate_percentage2}</td>
        <td>${defects_flatType1_goodShape_percentage1}</td>
      </tr>
      <tr>
      <th scope="row">連主人房大單位</th>
      <td>${defects_flatType2_serious_percentage3}</td>
      <td>${defects_flatType2_moderate_percentage2}</td>
      <td>${defects_flatType2_goodShape_percentage1}</td>
      </tr>
      <tr>
      <th scope="row">兩房單位</th>
      <td>${defects_flatType3_serious_percentage3}</td>
      <td>${defects_flatType3_moderate_percentage2}</td>
      <td>${defects_flatType3_goodShape_percentage1}</td>
      </tr>
      <th scope="row">開放式單位</th>
      <td>${defects_flatType4_serious_percentage3}</td>
      <td>${defects_flatType4_moderate_percentage2}</td>
      <td>${defects_flatType4_goodShape_percentage1}</td>
      </tr>
    </tbody>
  </table>
      `


  //2.9. Chart 1 data visualization

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawPieChart); //唔可以用drawChart 做function 名, 如果唔係會同下面同名既function撞, 被截糊

  function drawPieChart() {

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['一房單位', type1Flat_number],
      ['連主人房大單位', type2Flat_number],
      ['兩房單位', type3Flat_number],
      ['開放式單位', type4Flat_number]
    ]);

    var options = {
      title: '已檢查單位類型分佈'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }
  // google.charts.load("current", { 'packages': ["corechart"] });
  // google.charts.setOnLoadCallback(drawChart);

  //   function drawChart() {
  //      var data = google.visualization.arrayToDataTable([
  //           ['Task', 'Hours per Day'],
  //           [type1Flat_name, type1Flat_number  ],
  //           [type2Flat_name, type2Flat_number  ],
  //           [type3Flat_name, type3Flat_number  ],
  //           [type4Flat_name, type4Flat_number  ],
  //      ]);

  //      var options = {
  //           title: '已檢查單位類型分佈',
  //           is3D: true,
  //      };

  //      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
  //      chart.draw(data, options);
  // }




  //   var ctx = document.getElementById('myChart');

  //   var myPieChart = new Chart(ctx, {
  //     type: 'pie',
  //     data: {
  //       datasets: [{
  //           data: [type1Flat_number, type2Flat_number, type3Flat_number, type4Flat_number ]
  //       }],

  //       // These labels appear in the legend and in the tooltips when hovering different arcs
  //       labels: [
  //           'type1Flat_name',
  //           'type2Flat_name',
  //           'type3Flat_name',
  //           'type4Flat_name'
  //       ]
  //   },
  //     options: options
  // });






  //2.10. chart 2 data visualization
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['單位類型', '問題極為嚴重(>11)單位數量', '問題頗為嚴重(6-10)單位數量', '問題不算嚴重(0-5)單位數量'],
      ['一房單位', flatType1_serious.length, flatType1_moderate.length, flatType1_goodShape.length],
      ['連主人房大單位', flatType2_serious.length, flatType2_moderate.length, flatType2_goodShape.length],
      ['兩房單位', flatType3_serious.length, flatType3_moderate.length, flatType3_goodShape.length],
      ['開放式單位', flatType4_serious.length, flatType4_moderate.length, flatType4_goodShape.length]
    ]);

    var options = {
      chart: {
        title: '各類單位問題詳析'
      },
      bars: 'horizontal' // Required for Material Bar Charts.
    };


    var chart = new google.charts.Bar(document.getElementById('barchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }




}



loadDeveloperReport2()









