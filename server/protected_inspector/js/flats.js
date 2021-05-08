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

async function searchFlat (formObj){
    
    let fetchURL = "/flats/?"
    
    if (formObj.tower !== ""){
        fetchURL+= `&tower=${formObj.tower}`;
    }
    if (formObj.floor !== ""){
        fetchURL+= `&floor=${formObj.floor}`
    }
    if (formObj.room !== ""){
        fetchURL+= `&room=${formObj.room}`
    }
    if (formObj.type !== ""){
        fetchURL+= `&type=${formObj.type}`
    }


    
    console.log(`fetchURL is ${fetchURL}`)

    const res = await fetch(fetchURL,{
        method:"GET",
        headers: {"Content-Type":"application/json"}
    });
    const flats = await res.json(); 
    console.log(flats);

    const flatContainer = document.querySelector('#flatResultTable');
    flatContainer.innerHTML = ""; //每次先清空wall先再一次過加返data上去

    for (let flat of flats) {
            flatContainer.innerHTML += `
            <tr class="flat-row searchFlatTr">
                <td class="searchFlatTd">${flat.tower}座${flat.floor}樓${flat.room}室</td>
                <td class="searchFlatTd">${flat.type}</td>
                <td class="searchFlatTd">${flat.size_in_sq_ft}</td>
                <td>
                <a href="/inspector/spaces.html?flats=${flat.id}" > 
                <button type="button" class="btn flatSelectButton"  data-flat-id="${flat}.id}">檢查</button>
                </a>
                </td>
            </tr>
            `
    }

}




