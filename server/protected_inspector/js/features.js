const urlParams = new URLSearchParams(window.location.search);
const flatId = urlParams.get('flats');
const spaceId = urlParams.get('spaces');
console.log(`flat id is ${flatId}, space id is ${spaceId}`);

getFeatureInfo();

document.querySelector('#click-back').addEventListener('click', async function (event) {
    await backLastPage();
});


async function backLastPage() {
    window.location.replace(`/inspector/spaces.html?flats=${flatId}`);
}

async function getFeatureInfo(){
    const res = await fetch(`/inspector/flats/${flatId}/spaces/${spaceId}`,{
        method:"GET",
        headers: {"Content-Type":"application/json"}
    });
    const features = await res.json(); 
    console.log(features);

    const featuresContainer = document.querySelector('#accordionExample');
    featuresContainer.innerHTML = ""; //每次先清空wall先再一次過加返data上去
    
    const featureArr = [];
    const featureIdArr = [];

    for(let data of features){
        featureArr.push(data.feature);
        featureIdArr.push (data.id);
    }

    for(let i=0; i<featureArr.length; i++){
    featuresContainer.innerHTML += `
    <div class="card">
        <div class="card-header" id="headingOne">
            <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${featureIdArr[i]}" aria-expanded="true" aria-controls="collapse${featureIdArr[i]}" id="${featureIdArr[i]}">
                ${featureArr[i]}
                </button>
            </h2>
        </div>
        <div id="collapse${featureIdArr[i]}" class="collapse defectsInfo" aria-labelledby="headingOne" data-parent="#accordionExample">
        </div>
    </div>
    `
    }
    getDefectInfo();
}

async function getDefectInfo(){
    let buttons = document.querySelectorAll('button');
    const featureIdArr_ = [];

    for(let i=0; i<buttons.length; i++){
        featureIdArr_.push (buttons[i].id);
    }

    for(let id of featureIdArr_){
        const featureId = id;
        // console.log(featureId);
        const res = await fetch(`/inspector/flats/${flatId}/spaces/${spaceId}/features/${featureId}`,{
            // method:"GET",
            // headers: {"Content-Type":"application/json"}
        });
        const defects = await res.json();

        const defectsContainer = document.querySelector(`#collapse${featureId}`);
        defectsContainer.innerHTML = "";
        


        for(let defect of defects){

            const defectId = defect.id;
            const res = await fetch(`/inspector/flats/${flatId}/defects/${defectId}`,{
                method:"GET",
                headers: {"Content-Type":"application/json"}
            });
            const defectCount = await res.json();
            // console.log (defectCount[0].count);

            if (defectCount[0].count === '0'){
            defectsContainer.innerHTML += `
            
                <a href="/inspector/records-new.html?flats=${flatId}&spaces=${spaceId}&features=${featureId}&defects=${defectId}" > 
                <button type="button" class="btn btn-light">${defect.issue}</button>
                </a>

            `
            } else {
                defectsContainer.innerHTML += `
                <a href="/inspector/records-inspected.html?flats=${flatId}&spaces=${spaceId}&features=${featureId}&defects=${defectId}" > 
                <button type="button" class="btn btn-danger">${defect.issue}</button>
                </a>
                `
            }
        }
    }

}