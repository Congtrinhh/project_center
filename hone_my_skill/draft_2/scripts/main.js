const studentList = document.querySelector('.student-list');
const studentForm = document.querySelector('.student-form');
const studentFormBtn =document.querySelector('.student-form__btn');
const deleteForm = document.querySelector('#delete-form');
const deleteBtn = document.querySelector('.delete-btn');
let checkIdForm = true;
const url = 'http://localhost:3000/student';

let requirementCreate = {//validate form nhap
    form: '#student-form',
    'error-message-selector': '.student-form__error',
    // 'password-input-selector': '#password-input',
    'form-group-selector': '#student-form > p',
    rules: [
        Validator.isRequired('#id'),
        Validator.isRequired('#full-name'),
        Validator.isRequired('#age'),
        Validator.isRequired('#gender'),
        Validator.isRequired('#current-address'),
        Validator.isRequired('#faculty'),
        Validator.isNumber('#id'),
        Validator.isNumber('#age'),
        Validator.isName('#full-name'),
    ],
};
Validator(requirementCreate);
let requirementDelete = {
    form: '#delete-form',
    'error-message-selector': '.student-form__error',
    // 'password-input-selector': '#password-input',
    'form-group-selector': '#delete-form > p',
    rules: [
        Validator.isRequired('#delete-id'),
        Validator.isNumber('#delete-id')
    ],
}
Validator(requirementDelete);
requirementDelete.isWrongId = function(hasId) {
    if (!hasId) {
        if (!document.querySelector(requirementDelete['form-group-selector']).classList.contains('error')) {
            document.querySelector(requirementDelete['form-group-selector']).classList.add('error');
            document.querySelector(`${requirementDelete.form} ${requirementDelete['error-message-selector']}`).textContent = 'Id không tồn tại';
        }
    } else {
        if (document.querySelector(requirementDelete['form-group-selector']).classList.contains('error')) {
            document.querySelector(requirementDelete['form-group-selector']).classList.remove('error');
            document.querySelector(`${requirementDelete.form} ${requirementDelete['error-message-selector']}`).textContent = '';
        }
    }
}

function start() {
    getNewestList(renderNewestList);
    // studentFormBtn.onclick = function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     createNewStudent();
    // };
    setTimeout(function() {
        deleteStudentByClick(url, studentList)
        updateStudentByClick(url, studentList);
    }, 1000);
};
start();
requirementCreate.onSubmit = function(dataToSend) {
    let demand = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(dataToSend) // body data type must match "Content-Type" header
    };
    fetch(url, demand)
    .then(res => res.json())
    .then(dataSent => {
        console.log(dataSent);
    })
    .catch(err => {
        if (err.message.includes('Unexpected token E in JSON at position')) {
            document.querySelector(`${requirementCreate.form} input[id="id"] ~ span`).textContent = 'Id bi trung';
        }
    });
}
requirementDelete.onSubmit = function(idObject) {
    const id = idObject['delete-id'];
    fetch(url)
    .then(res => res.json())
    .then(students => {
        for (let student of students) {
            if (student.id === id) {
                // studentList.querySelector(`.${id}`).remove();
                return true;
            };
        }
        return false;
    })
    .then((result) => {
        if (result) {
            let demand = {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            }
            fetch(`${url}/${id}`, demand)
            .then(res => res.json())
            .then(data => {
                checkIdForm = true;
            })
            .catch(err => {
                console.log('There has been an error: ', err);
            });
        } else {
            checkIdForm = false;
            requirementDelete.isWrongId(checkIdForm);
        }
    })
}


function getNewestList(callback) {
    fetch(url)
    .then(response => response.json())
    .then(callback)
    .catch(err => {
        console.log('There has been an error: ', err);
    });
};
function renderNewestList(data) {
    let stdArr = data.map((student, idx) => {
        return `<li class="${student.id}">
            <span class="student-form__input-id">Id: ${student.id}</span>
            <span class="student-form__input-full-name">Họ tên: ${student['full-name']}</span>
            <span class="student-form__input-age">Tuổi: ${student.age}</span>
            <span class="student-form__input-gender">Giới tính: ${student.gender}</span>
            <span class="student-form__input-current-address">Địa chỉ hiện tại: ${student['current-address']}</span>
            <span class="student-form__input-faculty">Khoa: ${student.faculty}</span>
            <button class="btn delete-btn">Xóa</button>
            <button class="btn update-btn">Sửa</button>
        </li>`;
    });
    studentList.innerHTML = stdArr.join('');
};
function createNewStudent() {
    let info = {
        id: document.querySelector('input[type="text"][name="id"]').value,
        name: document.querySelector('input[type="text"][name="full-name"][id="full-name"]').value,
        age: document.querySelector('input[type="text"][name="age"]').value,
        gender: document.querySelector('input[type="text"][name="gender"]').value,
        'current-address': document.querySelector('input[type="text"][name="current-address"]').value,
        faculty: document.querySelector('input[type="text"][name="faculty"]').value,
    };
    let demand = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(info) // body data type must match "Content-Type" header
    };
    fetch(url, demand)
    .then(response => response.json())
    .catch(err => {
        console.log('There has been an error: ', err);
    });
}
function deleteStudentByClick(url, list) {
    let arr = list.querySelectorAll('li');
    for (let item of arr) {
        item.querySelector('button.delete-btn').onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.target.parentElement.remove();

            let demand = {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(info) // body data type must match "Content-Type" header
            };
            fetch(`${url}/${item.className}`, demand)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log('There has been an error: ', err);
            })
        };
    }
};
function updateStudentByClick(url, list) {
    let studentArr = list.querySelectorAll('li');
    Array.from(studentArr).forEach(item => {
        item.querySelector('button.update-btn').onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            const idStd = studentForm.querySelector('#id');
            const nameStd = studentForm.querySelector('#full-name');
            const ageStd = studentForm.querySelector('#age');
            const genderStd = studentForm.querySelector('#gender');
            const addressStd = studentForm.querySelector('#current-address');
            const facultyStd = studentForm.querySelector('#faculty');

            const regex = /^[^:]+:\s?/g;
            idStd.value = item.querySelector('span[class*="id"]').textContent.replace(regex, '');
            nameStd.value = item.querySelector('span[class*="full-name"]').textContent.replace(regex, '');
            ageStd.value = item.querySelector('span[class*="age"]').textContent.replace(regex, '');
            genderStd.value = item.querySelector('span[class*="gender"]').textContent.replace(regex, '');
            addressStd.value = item.querySelector('span[class*="current-address"]').textContent.replace(regex, '');
            facultyStd.value = item.querySelector('span[class*="faculty"]').textContent.replace(regex, '');

            studentFormBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                let info = {
                    id: document.querySelector('input[type="text"][name="id"]').value,
                    'full-name': document.querySelector('input[type="text"][name="full-name"]').value,
                    age: document.querySelector('input[type="text"][name="age"]').value,
                    gender: document.querySelector('input[type="text"][name="gender"]').value,
                    'current-address': document.querySelector('input[type="text"][name="current-address"]').value,
                    faculty: document.querySelector('input[type="text"][name="faculty"]').value,
                };
                let demand = {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(info) // body data type must match "Content-Type" header
                };
                fetch(`${url}/${item.className}`, demand)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log('There has been an error: ', err);
                });
            }
        }
    });
}
