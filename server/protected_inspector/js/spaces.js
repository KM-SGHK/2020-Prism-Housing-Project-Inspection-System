// const { url } = require("inspector");

const urlParams = new URLSearchParams(window.location.search);
const flatId = urlParams.get('flats');
console.log(flatId);

getFlatInfo();
getSpaceInfo();

async function getFlatInfo() {

    const res = await fetch(`/inspector/flats/${flatId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const flat = await res.json();
    console.log(flat);

    const flatContainer = document.querySelector('#show-flat-info');
    flatContainer.innerHTML = ""; //每次先清空wall先再一次過加返data上去

    for (let data of flat) {
        flatContainer.innerHTML += `

        <div class = "container-fluid show-flat-block">
        <table class="table table-dark searchFlatTable" >
        <thead class="searchFlatThead">
        </thead>
        <tbody>
            <tr class="flat-row searchFlatTr">
            <td class="searchFlatTd">座號</td>
            <td class="searchFlatTd">${data.tower}</td>
            </tr>
            <tr class="flat-row searchFlatTr">
            <td class="searchFlatTd">樓層</td>
            <td class="searchFlatTd">${data.floor}</td>
            </tr>
            <tr class="flat-row searchFlatTr">
            <td class="searchFlatTd">室號</td>
            <td class="searchFlatTd">${data.room}</td>
            </tr>
            <tr class="flat-row searchFlatTr">
            <td class="searchFlatTd">呎數</td>
            <td class="searchFlatTd">${data.size_in_sq_ft}</td>
            </tr>
            <tr class="flat-row searchFlatTr">
            <td class="searchFlatTd">房型</td>
            <td class="searchFlatTd">${data.type}</td>
            </tr>
            <tr class="flat-row searchFlatTr">
            <td class="searchFlatTd">預計推出日期</td>
            <td class="searchFlatTd">${data.target_completion_date.slice(0, 10)}</td>
            </tr>
        </tbody>
        </div>
        
        `
    }
};

async function getSpaceInfo() {
    const res = await fetch(`/inspector/flats/${flatId}/spaces`); //, {
        // method: "GET",
        // headers: { "Content-Type": "application/json" }
        // });
    const spaces = await res.json();
    console.log(spaces);

    const spacesContainer = document.querySelector('#show-space-info');
    spacesContainer.innerHTML = "";


    for (let data of spaces) {
        spacesContainer.innerHTML += `
        <div class="space-block">
        <a href="/inspector/features.html?flats=${flatId}&spaces=${data.id}" > 
            <h4>${data.space}</h4>
        </a>
        </div>
        `
    }
};

document.querySelector('#click-back').addEventListener('click', async function (event) {
    await backLastPage();
});

async function backLastPage() {
    window.location.replace(`/inspector/flats.html`);
}