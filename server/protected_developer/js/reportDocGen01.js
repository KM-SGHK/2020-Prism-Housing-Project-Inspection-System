// Step 1: Load Flats Data into the table

async function loadFlatsReadyForReports() {
    const res = await fetch('/reports_checkFlatsForReports', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const res2 = await fetch('/reports_FlatsReadyForReportsRatio', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const results = await res.json();

    const NumOfFlats= await res2.json();

    console.log(results)

    let NumOfFlatsWithReports=results.length
    let TotalNumOfFlats=NumOfFlats[0].count
    let NumOfFlatsWithoutReports=TotalNumOfFlats-NumOfFlatsWithReports

    console.log("testing before chart function")

    // PART 1: Load Pie Chart
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
         var data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              ['檢查報告已備之單位數目', NumOfFlatsWithReports],
              ['未有檢查報告之單位數目', NumOfFlatsWithoutReports],
         ]);

         var options = {
              title: '可供下載檢查報告之單位佔比',
              is3D: true,
         };

         var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
         chart.draw(data, options);
    }





    // PART 2: Load Table
    const flatShelf = document.querySelector('#loadFlatsData')
    const flatShelfHeader = document.querySelector('#flatShelfHeader')

    flatShelfHeader.innerHTML += `<h5> 共${results.length}份報告可供下載</h5> `


    for (let result of results) {
        flatShelf.innerHTML +=
            `
               
                <th scope="row" class="text-center">${result.id}</th>
                <td class="text-center">${result.tower}</td>
                <td class="text-center">${result.floor}${result.room}</td>
                <td class="text-center">
                <a href="/developer/reports_createFlatDoc/${result.id}" > 
                    <button type="button" class="btn flatSelectButton" id="getDoc">下載${result.floor}${result.room}單位檢查報告</button>
                </td>
               
                
              `
    }

    await getDocument()

}

loadFlatsReadyForReports()




//       <a href="/developer/reports_createFlatDoc/${result.id}" > 

{/* <td>
<a href="/developer/reports_deleteFlatDoc/${result.id}" > 
    <button type="button" class="btn flatSelectButton" id="getDoc">更新${result.floor}${result.room}單位現有報告</button>
</td> */}