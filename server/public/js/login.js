//login 失敗例子
document.querySelector('#error-message').innerHTML = ""

const searchParams = new URLSearchParams(window.location.search);
const errMessage = searchParams.get('error');
// console.log(errMessage)

if(errMessage){
    // const alertBox = document.createElement('div');
    // alertBox.classList.add('alert','alert-danger');
    // alertBox.textContent = errMessage;
    // document.querySelector('#error-message').appendChild(alertBox);
// }else{
    document.querySelector('#error-message').innerHTML = 
    `<div>
    登入失敗! 用戶名稱或密碼錯誤!
     </div>`;
}