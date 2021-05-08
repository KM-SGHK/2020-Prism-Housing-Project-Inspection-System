async function loadDeveloperReport3() {
    // 1. Load Data
    const res = await fetch('/reports_subcontractorPerformance');
    const subcontractorPerformanceReports = await res.json();
    // console.log(developerReport1s);

    // 2. Loop Data
    const developerReport3Container = document.querySelector('.devReport-container3');
    developerReport3Container.innerHTML = "";

    subcontractorPerformanceReports.sort(function(subcontractorPerformanceReports1, subcontractorPerformanceReports2){
        if(subcontractorPerformanceReports1.count>subcontractorPerformanceReports2.count){
            return -1
        }else if (subcontractorPerformanceReports1.count<subcontractorPerformanceReports2.count){
            return 1
        }else{
            return 0
        }
    })

    console.log(subcontractorPerformanceReports.sort())

    ordered_subcontractorPerformanceReports=subcontractorPerformanceReports.sort()

    let i=0

    for(let ordered_subcontractorPerformanceReport of ordered_subcontractorPerformanceReports){

        if(i==0){
            developerReport3Container.innerHTML += `
            <tr>
            <th scope="row">${ordered_subcontractorPerformanceReport.name} (值得關注)</th>
            <td>${ordered_subcontractorPerformanceReport.count}</td>
          </tr>
     
            
            `
        }else if(i>0){
            developerReport3Container.innerHTML += `
            <tr>
            <th scope="row">${ordered_subcontractorPerformanceReport.name}</th>
            <td>${ordered_subcontractorPerformanceReport.count}</td>
          </tr>
     
          `
            
        }

        i+=1
        
    }

    //3. data visualization

    

    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Element", "所涉單位問題數量", { role: "style" } ],
        [ordered_subcontractorPerformanceReports[0].name, parseInt(ordered_subcontractorPerformanceReports[0].count), "#b87333"],
        [ordered_subcontractorPerformanceReports[1].name, parseInt(ordered_subcontractorPerformanceReports[1].count), "silver"],
        [ordered_subcontractorPerformanceReports[2].name, parseInt(ordered_subcontractorPerformanceReports[2].count), "gold"],
        [ordered_subcontractorPerformanceReports[3].name, parseInt(ordered_subcontractorPerformanceReports[3].count), "color: #e5e4e2"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "建築外判商表現",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
  }






}


loadDeveloperReport3()