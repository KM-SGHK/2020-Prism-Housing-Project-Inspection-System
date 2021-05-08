const urlParams = new URLSearchParams(window.location.search);

const flatId = urlParams.get('flats');
const spaceId = urlParams.get('spaces');
const featureId = urlParams.get('features');
const defectId = urlParams.get('defects');

console.log(flatId, spaceId, featureId, defectId);


window.onload = async function () {
    const features = await getFeatureInfo(featureId);
    const defects = await getDefectInfo(defectId);
    await displayRecordsBeforePost(features, defects);
}


// (GET feature)
async function getFeatureInfo(featureId){
    const res1 = await fetch(`/inspector/features/${featureId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    console.log(res1);
    const features = await res1.json()
    console.log(features);
    return features;
}

// (GET defect) 
async function getDefectInfo(defectId){
    const res2 = await fetch(`/inspector/defects/${defectId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    console.log(res2);
    const defects = await res2.json();
    console.log(defects);
    return defects;
}

// Fill out the feature and defect boxes
async function displayRecordsBeforePost(feature, defect) {
    document.getElementById('date-of-inspection').innerHTML += `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
    document.getElementById('time-of-inspection').innerHTML += `${('0' + new Date().getHours()).slice(-2)}:${('0' + new Date().getMinutes()).slice(-2)}`
    document.getElementById('feature-information').innerHTML += feature[0].feature;
    document.getElementById('defect-information').innerHTML += defect[0].issue;
}

// 回上一頁
async function backLastPage() {
    window.location.replace(`/inspector/features.html?flats=${flatId}&spaces=${spaceId}`);
}

document.querySelector('#click-back').addEventListener('click', async function (event) {
    await backLastPage();
});


// (POST)
document.querySelector('#record-submission')
    .addEventListener('submit', async function (event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData();
        formData.append('description', form.description.value);
        formData.append('status', 'fixing'); // default 一有record就係要fixing
        formData.append('image', form.image.files[0]);
        formData.append('flat_id', flatId);
        formData.append('space_id', spaceId);
        formData.append('defect_id', defectId);
        
        console.log(form.image.files[0]);

        const res = await fetch('/newRecords', {
            method: "POST",
            body: formData
        });

        const result = await res.json();
        
        console.log(result);

        await backLastPage(); //post完後轉頁去search過單位
    });


// Preview defect photo just taken
document.querySelector('#defect-photo').addEventListener('change', async function preview(){
    let fileObject = this.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileObject);
    fileReader.onload = () => {
        let results = fileReader.result;
        let img = document.querySelector('#defect-image');
        img.setAttribute('src', results);
    }


    // Enlarge image taken
    document.getElementById('defect-image-enlarge-button').onclick = async function () {
        // display defect photo in modal
        document.getElementById('modal-defect-image').src = document.getElementById('defect-image').src;
    }
});


