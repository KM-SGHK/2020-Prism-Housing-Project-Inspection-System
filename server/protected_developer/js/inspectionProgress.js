async function loadDeveloperReport4() {
    // 1. Load Data
    const res = await fetch('/reports_inspectionProgress');
    const inspectionProgressReports = await res.json();
    console.log(inspectionProgressReports );

    // 2. Loop Data
    const developerReport4Container = document.querySelector('.devReport-container4');
    developerReport4Container.innerHTML = "";

    var expected_inspectedFlat_number = 300
    var finishingRate = inspectionProgressReports[0].count / expected_inspectedFlat_number * 100

    console.log(parseInt(inspectionProgressReports[0].count))

    for (let inspectionProgressReport of inspectionProgressReports) {
        developerReport4Container.innerHTML += `
        <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">已檢驗單位總數</th>
            <th scope="col">佔預期完成檢驗單位總數百份比(%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">${inspectionProgressReport.count}</th>
            <td>${finishingRate}</td>
          </tr>
        </tbody>
      </table>

     `
    }

    //3. data visualization
    
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['驗樓日數', '預期驗樓數量', '現階段已完成檢驗單位數量'],
          ['0日',  0,  0],
          ['100日',  300,  parseInt(inspectionProgressReports[0].count)]
        ]);

        var options = {
          title: '驗樓進度',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }

}

loadDeveloperReport4() 