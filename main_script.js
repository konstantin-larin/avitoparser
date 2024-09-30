// булевые переменные
let tryButtonIsAnimated = null;
let clickStub = null;

document.addEventListener('click', onCLick);
document.addEventListener('pointerover', onPointerOver);
document.addEventListener('pointerdown', onPointerDown);
document.addEventListener('pointerup', onPointerUp);


function onCLick(event) {
    if (event.target.closest('button')) {
        let button = event.target.closest('button');
        let modalWindow = document.getElementById('registration-window');
        switch (button.dataset.action) {
            case 'register':
                modalWindow.style.display = 'flex';
                break;
            case 'close-window':
                document.querySelector('.registration-form').style.display = 'block';
                document.querySelector('.success_reg').style.display = 'none';
                document.querySelector('.success_log').style.display = 'none';
                modalWindow.style.display = 'none';
                break;
            case 'try':
                if (clickStub) return;
                let onButton = true;

                function defineCursorPosition(event) {
                    let top = button.getBoundingClientRect().top + window.pageYOffset;
                    let bottom = button.getBoundingClientRect().bottom + window.pageYOffset;
                    let left = button.getBoundingClientRect().left + window.pageXOffset;
                    let right = button.getBoundingClientRect().right + window.pageXOffset;

                    if (event.pageX > left && event.pageX < right && event.pageY > top && event.pageY < bottom) {
                        onButton = true;
                    }
                    else {
                        onButton = false;
                    }
                }
                document.addEventListener('pointermove', defineCursorPosition);

                clickStub = true;
                tryButtonIsAnimated = true;
                let border = document.querySelector('.border-of_try-button');
                let deg = 97;
                let increase = setInterval(() => {
                    deg += 9;
                    if (deg >= 1177) {
                        clearInterval(increase);
                        deg = 97;
                        tryButtonIsAnimated = false;
                        clickStub = false;
                        if (onButton) {
                            document.removeEventListener('pointermove', defineCursorPosition);
                            return;
                        }
                        else {
                            document.removeEventListener('pointermove', defineCursorPosition);
                            border.style.opacity = 0;                            
                        }

                    }
                    button.style.setProperty('--border',
                        `linear-gradient(${deg}deg, #0FA6F7 19.02%, #FF6163 46.12%, #A169F7 68.04%, #97CF26 95.54%)`
                    );
                }, 10);

                break;
        }
    }
    if (event.target.closest('.price-list li')) {
        let target = event.target.closest('.price-list li');
        for (let elem of document.querySelectorAll('.price-list li')) {
            if (elem.classList.contains('chosen') && elem !== target) {
                elem.classList.remove('chosen');
            }
        }
        if (target.classList.contains('chosen')) {
            target.classList.remove('chosen');
        }
        else {
            target.classList.add('chosen');
        }
    }
}
function onPointerDown(event) {
    if (event.target.closest('.violet-lighting')) {
        event.target.closest('button').classList.add('violet-highlight');
    }
    else return;
}
function onPointerUp(event) {
    if (document.querySelector('.violet-highlight')) {
        document.querySelector('.violet-highlight').classList.remove('violet-highlight');
    }
    else return;
}
function onPointerOver(event) {
    if (event.target.closest('.try-button')) {    
        if(tryButtonIsAnimated)  return;        
        let border = document.querySelector('.border-of_try-button');        
        setTimeout(() => {
            border.style.opacity = 1;
        }, 0);
        event.target.closest('.try-button').onpointerleave = function(){
            if(tryButtonIsAnimated)  return;
            border.style.opacity = 0;   
        }
    }    
    else return;
}



document.querySelector('.registration-form').addEventListener('submit', function () {
    let nextForm = document.querySelector('.success_reg');
    nextForm.style.display = 'block';
    document.querySelector('.registration-form').style.display = 'none';
    nextForm.addEventListener('submit', function () {
        document.querySelector('.registration-form').style.display = 'block';
        document.getElementById('registration-window').style.display = 'none';
        nextForm.style.display = 'none';
    });
});

document.querySelector('.login-container .user-form').addEventListener('submit', function (event) {
    let modalWindow = document.getElementById('registration-window');
    modalWindow.style.display = 'flex';
    document.querySelector('.registration-form').style.display = 'none';
    let nextForm = document.querySelector('.success_log');
    nextForm.style.display = 'block';
    nextForm.addEventListener('submit', function () {
        document.querySelector('.registration-form').style.display = 'block';
        document.getElementById('registration-window').style.display = 'none';
        nextForm.style.display = 'none';
    });
});