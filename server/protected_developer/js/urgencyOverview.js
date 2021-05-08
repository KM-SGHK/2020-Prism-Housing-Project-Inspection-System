async function loadDeveloperReport1() {
     // 1. Load Data
     const res = await fetch('/reports');
     const developerReport1s = await res.json();
     console.log("comment1"+developerReport1s);

     // 2. Loop Data
     const developerReport1Container1 = document.querySelector('.devReport-container1');
     developerReport1Container1.innerHTML = "";

     // const developerReport1Container2 = document.querySelector('#devReport-container2');
     // developerReport1Container2.innerHTML = "";

     // var urgency1_counter1 = 0
     // var urgency2_counter2 = 0
     // var urgency3_counter3 = 0


     let totalFlatNo=developerReport1s.type1+developerReport1s.type2+developerReport1s.type3
     // for (i = 0; i < developerReport1s.length; i++) {
     //      if (parseInt(developerReport1s[i].count) <= 5) {
     //           urgency1_counter1 += 1
     //      } else if (parseInt(developerReport1s[i].count) >= 6 && developerReport1s[i].count <= 10) {
     //           urgency2_counter2 += 1
     //      } else if (parseInt(developerReport1s[i].count) >= 11) {
     //           urgency3_counter3 += 1
     //      }
     // }

     let urgencyPercentage1 = Math.round(developerReport1s.type1/ totalFlatNo * 100)
     let urgencyPercentage2 = Math.round(developerReport1s.type2/ totalFlatNo * 100)
     let urgencyPercentage3 = Math.round(developerReport1s.type3/ totalFlatNo * 100)

     // console.log(developerReport1s.type1)

     // let data = [urgency1_counter1, urgency2_counter2, urgency3_counter3]
     // console.log("counter test")
     // console.log(data)


     // 3. 逐個DATA  塞返落去
     developerReport1Container1.innerHTML += `
            <table class="table">
            <thead class="thead-dark">
    <tr>
      <th scope="col">單位問題等級</th>
      <th scope="col">已檢查單位佔比(%)</th>
      <th scope="col">已檢查單位數目</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row">極為嚴重(問題數目:>11)</th>
      <td>${urgencyPercentage3}</td>
      <td>${developerReport1s.type3}</td>
    </tr>
    <th scope="row">頗為嚴重(問題數目:6-10)</th>
    <td>${urgencyPercentage2}</td>
    <td>${developerReport1s.type2}</td>
    </tr>
    <th scope="row">問題不大(問題數目:0-5)</th>
      <td>${urgencyPercentage1}</td>
      <td>${developerReport1s.type1}</td>
    </tr>
</tbody>
</table>
      `

     //  developerReport1Container2.innerHTML += `
     google.charts.load("current", { packages: ["corechart"] });
     google.charts.setOnLoadCallback(drawChart);

     function drawChart() {
          var data = google.visualization.arrayToDataTable([
               ['Task', 'Hours per Day'],
               ['問題極為嚴重單位', developerReport1s.type3],
               ['問題頗為嚴重單位', developerReport1s.type2],
               ['問題不算嚴重單位', developerReport1s.type1],
          ]);

          var options = {
               title: '已檢查單位狀況',
               is3D: true,
          };

          var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
          chart.draw(data, options);
     }












}


loadDeveloperReport1()




     // var ctx = document.getElementById('myChart').getContext('2d');
     // var myPieChart = new Chart(ctx, {
     //     type: 'pie',
     //     data: {
     //          datasets: [{
     //              data: [${urgency3_counter3}, ${urgency2_counter2}, ${urgency1_counter1}]
     //          }],
     //          labels: [
     //               '問題極為嚴重單位佔比',
     //               '問題頗為嚴重單位佔比',
     //               '問題不算嚴重單位佔比'
     //           ]
     //       },
     //     options: options
     // });