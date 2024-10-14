import './helpers/globalFunctions.js';
import BaseModal from './components/modals/BaseModal.js';
import Tooltip from "./components/common/Tooltip.js";

// info: Инициализация глобальных для приложения компонентов, функций или событий
document.addEventListener('DOMContentLoaded', (event) => {

    // info: Если находимся в режиме локальной разработки,
    //  отображаем в углу виджет со списком страниц для удобной навигации между ними.
    if (window?.APP?.mode === 'development') {
        const pages = [
            'index',
            'detail',
        ];

        import('./helpers/pagesWidget.js').then(module => {
            if (module) {
                module.default(pages);
            }
        });
    }

    // info: Функция для получения файла svg-спрайта и его вставки в DOM.
    if (window?.APP?.svgSpritePath) {
        (async () => {
            try {
                const response = await fetch(window.APP.svgSpritePath);
                const sprite = await response.text();
                const SVGContainer = document.getElementById('__SVG-container__');

                if (sprite || !response) {
                    SVGContainer.innerHTML = sprite;
                    SVGContainer.querySelector('style')
                        ?.remove();
                } else {
                    new Error('sprite loading error');
                }
            } catch (error) {
                throw error;
            }
        })();
    }

    document.querySelectorAll('.js-open-modal').forEach((modal) => {
        modal.addEventListener('click', BaseModal.showModal.bind(this, modal.dataset.modalId, {}))
    })

    document.querySelectorAll('.js-tooltip').forEach((element) => new Tooltip({
        element: element,
        showOnClick: true,
        placement: 'bottom'
    }))
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const comment = document.getElementById('comment');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');

        let isValid = true;

        // Сбрасываем стили ошибок
        [name, email, comment].forEach(field => {
            field.classList.remove('error-border');
        });

        // Проверяем каждое поле
        if (name.value.trim() === "") {
            name.classList.add('error-border');
            isValid = false;
        }
        if (email.value.trim() === "") {
            email.classList.add('error-border');
            isValid = false;
        }
        if (comment.value.trim() === "") {
            comment.classList.add('error-border');
            isValid = false;
        }

        if (!isValid) {
            errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
            successMessage.style.display = 'none'; // Скрываем сообщение об успехе
        } else {
            errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке
            successMessage.style.display = 'block'; // Показываем сообщение об успехе
            setTimeout(() => {
                successMessage.style.display = 'none'; // Скрываем сообщение через 2 секунды
            }, 2000);
        }
    });
});

//форма арендовать авто//

function submitForm() {
    console.log("Функция submitForm вызвана");
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const rentalPeriod = document.getElementById('rentalDuration').value;
    const messageElement = document.getElementById('formMessage');

    if (name && phone && rentalPeriod) {
        messageElement.textContent = "Заявка успешно отправлена";
    } else {
        messageElement.textContent = "Пожалуйста, заполните все поля";
    }
}

//Функция для кнопки "Арендовать авто"//

document.getElementById('submitButton').addEventListener('click', function() {
    const userName = document.getElementById('userName').value.trim();
    const userPhone = document.getElementById('userPhone').value.trim();
    const rentalDuration = document.getElementById('rentalDuration').value.trim();
    
    const successAlert = document.querySelector('.success-alert');
    const errorAlert = document.querySelector('.error-alert');
    
    if (userName && userPhone && rentalDuration) {
        successAlert.style.display = 'block';
        errorAlert.style.display = 'none';
        
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 2000); // Скрыть через 2 секунды
    } else {
        successAlert.style.display = 'none';
        errorAlert.style.display = 'block';
        
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 2000); // Скрыть через 2 секунды
    }
});