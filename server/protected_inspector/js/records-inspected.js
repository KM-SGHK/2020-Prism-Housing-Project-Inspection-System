const urlParams = new URLSearchParams(window.location.search); // Extract relevant ids from query string
const flatId = urlParams.get('flats');
const spaceId = urlParams.get('spaces');
const defectId = urlParams.get('defects');


// (GET)
async function getRecordsFromDb(flatId, defectId) {

    const res = await fetch(`/inspector/records/${flatId}/${defectId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    const records = await res.json();

    return records;
}


// Function to insert records into HTML
async function displayRecords(recordToBeDisplayed) {
    document.getElementById('date-of-inspection').innerHTML += recordToBeDisplayed[0].inspection_timestamp.slice(0, 10);
    document.getElementById('time-of-inspection').innerHTML += recordToBeDisplayed[0].inspection_timestamp.slice(11, 16);
    document.getElementById('inspector-name').innerHTML += recordToBeDisplayed[0].inspector_name;
    if(recordToBeDisplayed[0].image !== null){
        document.getElementById('defect-image').src = `./uploads/photos_defect_records/${recordToBeDisplayed[0].image}`;
    };
    document.getElementById('feature-information').innerHTML += recordToBeDisplayed[0].feature;
    document.getElementById('defect-information').innerHTML += recordToBeDisplayed[0].issue;
    document.getElementById('defect-description').value = recordToBeDisplayed[0].description;
}



window.onload = async function () {
    const recordsFromDB = await getRecordsFromDb(flatId, defectId);
    await displayRecords(recordsFromDB);

    console.log(recordsFromDB);
    const recordId = recordsFromDB[0].record_id; //由flatId同defectId攞返recordId


    // 回上一頁
    async function backLastPage() {
        window.location.replace(`/inspector/features.html?flats=${flatId}&spaces=${spaceId}`);
    }


    // (UPDATE)
    document.getElementById('record-update')
        .addEventListener('click', async function (event) {
            const descriptionBox = document.getElementById('defect-description');

            const res = await fetch(`/inspector/records/${recordId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: descriptionBox.value
                })
            });
            
            const result = await res.json();
        });



    //(DELETE)
    document.getElementById('record-delete')
        .addEventListener('click', async function (event) {

            const res = await fetch(`/inspector/records/${recordId}`, {
                method: "DELETE"
            });

            const result = await res.json();
            await backLastPage(); //delete完後轉頁去search過單位
        })

    
    // click-back button    
    document.querySelector('#click-back').addEventListener('click', async function (event) {
        await backLastPage();
    });


    // Fullscreen image when enlarge button is clicked
    document.getElementById('defect-image-enlarge-button').onclick = async function () {
        console.log("enlarge is clicked!")
        // display defect photo in modal
        document.getElementById('modal-defect-image').src = document.getElementById('defect-image').src
    }



    // preview photo taken at image area
    document.querySelector('#defect-photo').addEventListener('change', async function preview(){
        let fileObject = this.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(fileObject);
        fileReader.onload = () => {
            let results = fileReader.result;
            let img = document.querySelector('#defect-image');
            img.setAttribute('src', results)
        }
    });


}








