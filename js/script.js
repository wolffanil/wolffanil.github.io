document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu'),
          closeElem = document.querySelector('.menu__close'),
          link = document.querySelectorAll('.menu__link a');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    const number = document.querySelectorAll('.footer__item-number'),
          liner = document.querySelectorAll('.footer__item-full div');
        
    number.forEach((item, i) => {
        liner[i].style.width = item.innerHTML;
    });

    link.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
});