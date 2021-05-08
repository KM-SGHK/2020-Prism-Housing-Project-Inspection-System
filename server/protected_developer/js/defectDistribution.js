window.onload = function () {
    searchFlat({
        tower: "",
        floor: "",
        room: "",
        type: ""
    })
}

let imageWidth = 1057;
let imageHeight = 1057;
var viewBox = { x: -152, y: -9, w: imageWidth, h: imageHeight };
const svgSize = { w: imageWidth, h: imageHeight };
var isPanning = false;
var startPoint = { x: 0, y: 0 };
var endPoint = { x: 0, y: 0 };;
var scale = 1;

document.querySelector('#search-flat-form')
    .addEventListener('submit', async function (event) {
        event.preventDefault();
        const form = event.target;
        console.log(form);

        const formObject = {
            tower: form.tower.value,
            floor: form.floor.value,
            room: form.room.value,
            type: form.type.value,
        }
        console.log(formObject)

        searchFlat(formObject);
    });

async function searchFlat(formObj) {

    let fetchURL = "/flats/?"

    if (formObj.tower !== "") {
        fetchURL += `&tower=${formObj.tower}`;
    }
    if (formObj.floor !== "") {
        fetchURL += `&floor=${formObj.floor}`
    }
    if (formObj.room !== "") {
        fetchURL += `&room=${formObj.room}`
    }
    if (formObj.type !== "") {
        fetchURL += `&type=${formObj.type}`
    }



    console.log(`fetchURL is ${fetchURL}`)

    const res = await fetch(fetchURL, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const flats = await res.json();
    console.log(flats);

    const flatContainer = document.querySelector('#searchResultTable');
    flatContainer.innerHTML = `
        <table class="table table-striped table-dark searchFlatTable" >
        <thead class="searchFlatThead">
          <tr class="searchFlatTr">
            <th class="searchFlatTh" scope="col">單位</th>
            <th class="searchFlatTh" scope="col">房型</th>
            <th class="searchFlatTh" scope="col">呎數</th>
            <th class="searchFlatTh" scope="col"></th>
          </tr>
        </thead>
        <tbody id="flatResultTable">
        </tbody>
        </table>`; //每次先清空wall先再一次過加返data上去

    const resultContainer = document.querySelector('#flatResultTable');
    resultContainer.innerHTML = "";

    for (let flat of flats) {
        resultContainer.innerHTML += `
            <tr class="flat-row searchFlatTr">
            <td class="searchFlatTd">${flat.tower}座${flat.floor}樓${flat.room}室</td>
            <td class="searchFlatTd">${flat.type}</td>
            <td class="searchFlatTd">${flat.size_in_sq_ft}</td>
            <td>
            <button type="button" class="btn flatSelectButton" onclick="setModalOn(${flat.id})"}>檢查</button>
            </td>
            </tr>
            `
    }


}


const selectButton = document.querySelectorAll('.flatSelectButton');
const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector(".close");

async function setModalOn(flatId) {
    modal.style.display = "block";

    const svgImage = document.querySelector('#svgImage');
    const svgContainer = document.querySelector('#svgContainer');

    const res = await fetch(`/inspector/flats/${flatId}/spaces`);
    const result = await res.json();
    const spaces = result.length
    // console.log(spaces);

    const floorPlanContainer = document.querySelector('#myModal');
    svgImage.innerHTML = `
        <image href="/inspector/flats/${flatId}/floorplan" height="750" width="750"/>
        <g id="spacesGroup">
        </g>
        <g id="defectsGroup">
        </g>
        <g id="defectsDescription">
        </g>
        `;

    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    svgImage.setAttribute('key', `${flatId}`);
    svgImage.setAttribute('spaces', `${spaces}`);

    const spacesGroup = document.querySelector('#spacesGroup')

    for (let space of result) {
        const spaceLength = space.space.length;
        const defectsNum = space.defects_number ? space.defects_number : "0";
        // console.log(defectsNum);
        // console.log(space.centroidX, space.centroidY);
        // console.log(viewBox);
        spacesGroup.innerHTML += `
        <g class="spacesElement">
        <circle cx="${space.centroidX}" cy="${space.centroidY}" r="50" stroke="green" stroke-width="4" fill="yellow" />
            <text x="${space.centroidX - spaceLength * 8}" y="${space.centroidY - 8}" font-size="16" font-weight="800">${space.space}</text>
            <text x="${space.centroidX - defectsNum.length * 40}" y="${space.centroidY + 15}" font-size="14">現有瑕疵：${defectsNum}</text>
        </g>
        `
    }

    const floorplanRes = await fetch(`/reports/flatId/${flatId}/floorplan`);
    const defectsResult = await floorplanRes.json();
    // console.log(defectsResult);
    const defectsGroup = document.querySelector('#defectsGroup')
    const defectsDescription = document.querySelector('#defectsDescription')
    const defectsString = JSON.stringify(defectsResult)
    defectsDescription.setAttribute('defectsArr', `${defectsString}`)
    // const defectsArrLength = defectsResult.length;

    let i = 0
    for (let defectResult of defectsResult){
        let defectString = JSON.stringify(defectResult);
        if(defectResult.defectX!==null){
            defectsGroup.innerHTML+=`
            <circle cx="${defectResult.defectX}" cy="${defectResult.defectY}" r="15" stroke="green" stroke-width="4" fill="red" onmouseover="showDefectInfo(${i})" onmouseleave="hideDefectInfo()"/>
            `
        };
        i++;
    }
}

function showDefectInfo(defectsIndex){
    const defectsDescription = document.querySelector('#defectsDescription')
    const defectsArr = JSON.parse(defectsDescription.getAttribute('defectsArr'))
    defectsDescription.innerHTML = `
    <rect x="${defectsArr[defectsIndex].defectX-100}" y="${defectsArr[defectsIndex].defectY+25}" rx="20"  ry="20" width="200" height="150"
    style="fill:white;stroke:black;stroke-width:3;fill-opacity:1;stroke-opacity:0.9" />
    <Text x="${defectsArr[defectsIndex].defectX-90}" y="${defectsArr[defectsIndex].defectY+60}" font-size="12">檢驗位置：${defectsArr[defectsIndex].feature}</Text>
    <Text x="${defectsArr[defectsIndex].defectX-90}" y="${defectsArr[defectsIndex].defectY+80}" font-size="12">瑕疵類別：${defectsArr[defectsIndex].issue}</Text>
    <Text x="${defectsArr[defectsIndex].defectX-90}" y="${defectsArr[defectsIndex].defectY+100}" font-size="12">狀況描述：${defectsArr[defectsIndex].description}</Text>
    <Text x="${defectsArr[defectsIndex].defectX-90}" y="${defectsArr[defectsIndex].defectY+120}" font-size="12">更新日期：${defectsArr[defectsIndex].updated_at.slice(0,10)}</Text>
    <Text x="${defectsArr[defectsIndex].defectX-90}" y="${defectsArr[defectsIndex].defectY+140}" font-size="12">瑕疵狀態：${defectsArr[defectsIndex].status}</Text>

    `
    defectsDescription.style.visibility="visible";
    console.log(defectsArr[defectsIndex]);
}

function hideDefectInfo(){
    const defectsDescription = document.querySelector('#defectsDescription')
    defectsDescription.style.visibility= "hidden"

}

function setModalOff() {
    modal.style.display = "none";
    const floorPlanContainer = document.querySelector('#myModal');
    floorPlanContainer.innerHTML = "";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

async function mouseWheel(e) {
    e.preventDefault();
    var w = viewBox.w;
    var h = viewBox.h;
    var mx = e.offsetX;//mouse x  
    var my = e.offsetY;
    // console.log(w, h);
    var dw = w * Math.sign(e.deltaY) * 0.1;
    var dh = h * Math.sign(e.deltaY) * 0.1;
    var dx = dw * mx / svgSize.w;
    var dy = dh * my / svgSize.h;
    viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w - dw, h: viewBox.h - dh };
    scale = svgSize.w / viewBox.w;
    // zoomValue.innerText = `${Math.round(scale * 100) / 100}`;
    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

    // const spaces = parseFloat(svgImage.getAttribute('spaces'));
    // console.log(spaces)
    // const zoomValue = parseFloat(document.querySelector('#zoomValue').innerText);
    // console.log(zoomValue);
    const flatId = svgImage.getAttribute('key');
    const spacesGroup = document.querySelector('#spacesGroup')
    const defectsGroup = document.querySelector('#defectsGroup')
    const defectsDescription = document.querySelector('#defectsDescription')


    // console.log(spacesGroup);

        // console.log(viewBox);
        if (viewBox.w >= 650) {
            // for(i=0; i<spaces, i++;){
                spacesGroup.style.visibility = "visible"
                defectsGroup.style.visibility = "hidden"
                defectsDescription.style.visibility= "hidden"

            // }           
        } else {
            // for(i=0; i<spaces, i++;){
                spacesGroup.style.visibility = "hidden"
                defectsGroup.style.visibility = "visible"
            // }
            
        }
}


function mouseDown(e) {
    isPanning = true;
    startPoint = { x: e.x, y: e.y };
    // console.log(e.x);
}

function mouseMove(e) {
    if (isPanning) {
        endPoint = { x: e.x, y: e.y };
        var dx = (startPoint.x - endPoint.x) / scale;
        var dy = (startPoint.y - endPoint.y) / scale;
        var movedViewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };
        svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    }
}

function mouseUp(e) {
    if (isPanning) {
        endPoint = { x: e.x, y: e.y };
        var dx = (startPoint.x - endPoint.x) / scale;
        var dy = (startPoint.y - endPoint.y) / scale;
        viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };
        svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        isPanning = false;
    }
}

function mouseLeave(e) {
    isPanning = false;
}