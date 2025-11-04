window.addEventListener('load' , read_item);
const fild = document.querySelector('#fild');
const btn_add = document.querySelector('#btn');
const content = document.querySelector('#con');
const DocDel = document.querySelector('#Doc');

 // خواندن داده‌ها از localStorage یا ساخت آرایه خالی
let myarray = [];
if (localStorage.getItem('ITEM')) {
    myarray = JSON.parse(localStorage.getItem('ITEM'));
}

 //اضافه کردن توسط دکمه
btn_add.addEventListener('click' , add_tm);
function add_tm(){
    if(fild.value !== ''){
        Swal.fire({
            title: 'Event Successfully Added',
            icon: 'success',
            timer: 2500,
            showConfirmButton: false
        });
        let text_event = fild.value;
    content.innerHTML += `
        <div class="tm css-selector">
        <p>${text_event}</p>
        <div class="btn-box">
            <button class="edit-button" id="del">
                <span class="material-symbols-outlined edit">edit_document</span>
            </button>
            <button class="delete-button" id="del">
                <span class="material-symbols-outlined delete">delete_forever</span>
            </button>
        </div>
        </div>`;
        saveTask(text_event);
        fild.value = '';
    }
};

 //اضافه کردن توسط کیبورد
fild.addEventListener('keydown' , add_tm2);
function add_tm2(e){
    if(e.key === 'Enter' && fild.value !== ''){
        Swal.fire({
            title: 'Event Successfully Added',
            icon: 'success',
            timer: 2500,
            showConfirmButton: false
        });
        let text_event2 = fild.value;
    content.innerHTML += `
        <div class="tm css-selector">
        <p>${text_event2}</p>
        <div class="btn-box">
            <button class="edit-button" id="del">
                <span class="material-symbols-outlined edit">edit_document</span>
            </button>
            <button class="delete-button" id="del">
                <span class="material-symbols-outlined delete">delete_forever</span>
            </button>
        </div>
        </div>`;
        saveTask(text_event2);
        fild.value = '';
    }
};

content.addEventListener('click' , Action_item)
function Action_item(e2){
    
    if (e2.target.closest('.delete-button')) {
        const item_del = e2.target.closest('.tm'); // والد اصلی آیتم
        if (!item_del) return;

        // حذف از عنصر مربوطه از ریشه
        item_del.remove();

        // حذف از آرایه و localStorage
        const itemText = item_del.querySelector('p').textContent.trim();
        const index = myarray.indexOf(itemText);
        if (index !== -1) myarray.splice(index, 1);
        localStorage.setItem('ITEM', JSON.stringify(myarray));

        //چک کردن localStorage
        if (myarray.length === 0) {
            localStorage.removeItem('ITEM');
        } else {
            localStorage.setItem('ITEM', JSON.stringify(myarray));
        }
        Swal.fire({
            title: 'Event Successfully Deleted',
            icon: 'success',
            timer: 2500,
            showConfirmButton: false
        });
    }
     // اگر روی دکمه ادیت کلیک شد
    else if (e2.target.closest('.edit-button')) {
        const item_edit = e2.target.closest('.tm'); 
        const p = item_edit.querySelector('p');         
        const fild = document.querySelector('#fild'); 

         // مقدار تسک فعلی رو درون input قرار بده
        fild.value = p.textContent.trim();

         // حذف عنصر از صفحه
        item_edit.remove();

        const index = myarray.indexOf(p.textContent.trim());
        if (index !== -1) {
        myarray.splice(index, 1);
        if (myarray.length === 0) {
            localStorage.removeItem('ITEM');
        } else {
            localStorage.setItem('ITEM', JSON.stringify(myarray));
        }
    }

    }
     //تایید یا عدم تایید یک todo
    else if (e2.target.classList.contains('tm')) e2.target.classList.toggle('done');
};

 // حذف همه تسک ها
DocDel.addEventListener('click' , DocumentDelete);
function DocumentDelete(){
    if(fild.value !== ''){
        Swal.fire({
            title: 'All Event Successfully Deleted',
            icon: 'success',
            timer: 2500,
            showConfirmButton: false
        });
        fild.value = '';
    }
};

function saveTask(text_event){
    myarray.push(text_event);
    localStorage.setItem('ITEM', JSON.stringify(myarray));
} 

 // تابع خواندن از localStorage
function getItem() {
    const data = localStorage.getItem('ITEM');
    return data ? JSON.parse(data) : [];
}

function read_item(){
    for (let task_add of getItem()) {
    content.innerHTML += `
        <div class="tm css-selector">
        <p>${task_add}</p>
        <div class="btn-box">
            <button class="edit-button" id="del">
                <span class="material-symbols-outlined edit">edit_document</span>
            </button>
            <button class="delete-button" id="del">
                <span class="material-symbols-outlined delete">delete_forever</span>
            </button>
        </div>
        </div>`;
    }
}

 //  حذف همه تسک‌ها
DocDel.addEventListener('click', () => {
    Swal.fire({
    title: "Do you want to delete all events?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't Delete`
    }).then((result) => {
    if (result.isConfirmed && content) {
        Swal.fire("Events Deleted!", "", "success");
        localStorage.removeItem('ITEM');
        content.innerHTML = '';
    } else if (result.isDenied) {
        Swal.fire("The deletion operation has stopped", "", "info");
    }
    });
});
