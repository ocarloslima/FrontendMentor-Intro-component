let $inputs = document.querySelectorAll('.input');
let $errorList = document.querySelectorAll('.error');
let $span = document.querySelectorAll('.span');
let $submit = document.querySelector('#button');

let [$firstName, $lastName, $email, $password] = $inputs;

function createError(message, pos, spanElement) {
    $errorList[pos].style.display = 'inline';
    let error = document.createElement('span');
    error.classList.add('errorMessage');
    error.innerHTML = message;
    spanElement[pos].appendChild(error);
}

function returnDefault(element, pos) {
    let error = $span[pos].querySelector('.errorMessage');
    element.style.border = '1px solid #b9b6d36e';
    $errorList[pos].style.display = 'none';
    if (error && error.parentNode === $span[pos]) {
        $span[pos].removeChild(error);
    }
}

$email.addEventListener('blur', function () {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    let valid = regex.test(this.value);
    let error = $span[2].querySelector('.errorMessage');
    if (valid === false) {
        this.style.border = '1px solid #ff7a7a';
        if (!error) {
            createError('Looks like this is not an email', 2, $span)
        }
    } else {
        returnDefault($email, 2);
    }
});

$inputs.forEach($i => {
    $i.addEventListener('blur', function () {
        const inputName = this.dataset.name;
        let position = Array.from($inputs).indexOf(this);
        let error = $span[position].querySelector('.errorMessage');
        if (this !== $email) {
            if (this.value.trim() === '') {
                this.style.border = '1px solid #ff7a7a';
                if (!error) {
                    createError(`${inputName} cannot be empty`, position, $span);
                }
            } else {
                returnDefault(this, position);
            }
        }
    });
});

$submit.addEventListener('click', event => {
    $inputs.forEach($i => {
        const inputName = $i.dataset.name;
        let position = Array.from($inputs).indexOf($i);
        let error = $span[position].querySelector('.errorMessage');
        if ($i.value.trim() === '') {
            event.preventDefault();
            $i.style.border = '1px solid #ff7a7a';
            if (!error) {
                createError(`${inputName} cannot be empty`, position, $span);
            }
        }
    })
})