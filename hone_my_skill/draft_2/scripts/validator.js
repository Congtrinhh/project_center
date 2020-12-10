function Validator(requirement) {
    const form = document.querySelector(requirement.form); // lấy ra thẻ form

    function getParentElement(element, parentSelector) {
        while(element.parentElement) {
            if (element.parentElement.matches(parentSelector)) {
                return element.parentElement;
            } else {
                element = element.parentElement;
            }
        }
    }

    function check(element, arrayOfRules) { // Nhận tham số là 1 thẻ input và 1 mảng các rule cho thẻ input đó
        const errorElement = getParentElement(element, requirement['form-group-selector']).querySelector(requirement['error-message-selector']);
        let errorMessage;

        for (let i=0; i<arrayOfRules.length; i++) {
            switch(element.type) {
                case 'radio':
                    errorMessage = arrayOfRules[i](element.checked);
                    break;
                case 'checkbox':
                    errorMessage = arrayOfRules[i](element.checked);
                    break;
                default:
                    errorMessage = arrayOfRules[i](element.value);
            }
            if (errorMessage) {
                errorElement.textContent = errorMessage;
                if(!getParentElement(element, requirement['form-group-selector']).classList.contains('error'))    getParentElement(element, requirement['form-group-selector']).classList.add('error'); 
                break;
            } else {
                errorElement.textContent = '';
                if(getParentElement(element, requirement['form-group-selector']).classList.contains('error'))    getParentElement(element, requirement['form-group-selector']).classList.remove('error'); 
            }
        }
        if (errorMessage)   return false;
        return true;
    }
    
    if (form) {

        let rulesSelector = {};

        form.onsubmit = function(e) {
            e.preventDefault();

            let isQualified = true;
            requirement.rules.forEach( (rule, idx) => {
                const elementList = form.querySelectorAll(rule.selector);
                for (let i=0; i<elementList.length; i++) {
                    let isTrue = true;
                    if (elementList[i].type === 'radio' || elementList[i].type === 'checkbox') {
                        let isElementTrue = check(elementList[i], [rule.test]);
                        if(isElementTrue) {
                            isTrue = isElementTrue;
                            break;
                        } else if (i===elementList.length-1) {
                            isTrue = isElementTrue;
                        }
                    } else {
                        isTrue = check(elementList[i], [rule.test]);
                    }

                    if(!isTrue)  isQualified = false;
                }
            });

            if(isQualified) {
                if (typeof requirement.onSubmit === 'function') {//Submit với Javascript
                    const enableInputs = form.querySelectorAll('[name]');
                    let dataFromForm = Array.from(enableInputs).reduce((acc, cur) => {
                        switch(cur.type) {
                            case 'radio':
                                if (!cur.matches(':checked')) return acc;
                                acc[cur.name] = cur.value;
                                break;
                            case 'checkbox':
                                if (!cur.matches(':checked')) return acc;

                                if (!Array.isArray(acc[cur.name]))  acc[cur.name] = [];
                                acc[cur.name].push(cur.value); 
                                break;
                            case 'file':
                                acc[cur.name] = cur.files;
                                break;
                            default:
                                acc[cur.name] = cur.value;
                        }
                        return acc;
                    }, {}); 
                    requirement.onSubmit(dataFromForm);
                } else {//Submit với trình duyệt mặc định
                    form.submit();
                }
            }
        
        }

        requirement.rules.forEach((aRule, idx) => {

            if (!Array.isArray(rulesSelector[aRule.selector])) {
                rulesSelector[aRule.selector] = [aRule.test];
            } else {
                rulesSelector[aRule.selector].push(aRule.test);
            }

            const inputList = form.querySelectorAll(aRule.selector);
            Array.from(inputList).forEach ( input => {
                if (input) {

                    input.onblur = function(e) { // blur event trong từng thẻ input
                        check(input, rulesSelector[aRule.selector]);
                    }
                    input.oninput = function(e) {
                        check(input, rulesSelector[aRule.selector]);
                    }
                }
            });

        });
    }
}


Validator.isRequired = function(selector, customMessage) {
    return {
        selector: selector,
        test: function(value) {
            return !value ? customMessage || 'Vui lòng nhập trường này' : '';
        }
    }
}
Validator.isEmail = function(selector, customMessage) {
    return {
        selector: selector,
        test: function(value) {
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value.trim()) ? '' : customMessage || 'Nhập một email';
        }
    }
}
Validator.minLength = function(selector, minLength, customMessage) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim().length >= minLength ? '' : customMessage || `Vui lòng nhập tối thiểu ${minLength} kí tự`;
        } 
    } 
}
Validator.isSame = function(selector, getPasswordValue, customMessage) {
    return {
        selector: selector,
        test: function(value) {
            return value === getPasswordValue() ? '' : customMessage || 'Trường này không khớp';
        }
    }
}
Validator.isNumber = function(selector, customMessage) {
    return {
        selector: selector,
        test: function(value) {
            return isNaN(value.trim()) || !value.trim() ? 'Vui lòng nhập số' : '';
        }
    }
}
Validator.isName = function(selector, customMessage) {
    return {
        selector: selector,
        test: function(value) {
            const regex = /^[a-zA-Z ]{2,30}$/;
            return regex.test(value.trim()) ? '' : 'Vui lòng nhập họ tên';
        }
    }
}