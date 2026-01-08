// Init AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true
});

// Smooth Scroll (Lenis)
const lenis = new Lenis({
    lerp: 0.1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// --- ИНИЦИАЛИЗАЦИЯ WEBGL ЭФФЕКТА ---
// ВАЖНО: Эффект работает через Canvas. Убедитесь, что пути к фото верны.
new hoverEffect({
    parent: document.querySelector('#hero-webgl'),
    intensity: 0.4,            // Сила искажения (можно менять от 0.1 до 1.0)
    image1: '/src/img/one.jpg',     // Исходное фото
    image2: './src/img/two.jpg',     // Фото при наведении
    displacementImage: '/src/public/three.jpg', // Карта искажения (текстура шума/жидкости)
    imagesRatio: 650 / 600,    // Соотношение сторон вашего контейнера
    speedIn: 1.5,              // Скорость появления
    speedOut: 1.2              // Скорость исчезновения
});

console.log("Zent-Shift: Hero WebGL effect initialized with /img/ files.");
// Accordion Logic
const accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Закрываем все активные элементы
        accordionItems.forEach(el => el.classList.remove('active'));
        
        // Если кликнутый элемент не был активен, открываем его
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
// --- FORM LOGIC ---

// 1. Валидация телефона (только цифры)
const phoneInput = document.getElementById('phone-input');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
    });
}

// 2. Математическая капча
const captchaTask = document.getElementById('captcha-task');
const captchaInput = document.getElementById('captcha-input');
let captchaResult = 0;

function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaResult = a + b;
    if (captchaTask) captchaTask.innerText = `${a} + ${b}`;
}

generateCaptcha();

// 3. AJAX отправка
const form = document.getElementById('feedback-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сбрасываем сообщения
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';

        // Проверка капчи
        if (parseInt(captchaInput.value) !== captchaResult) {
            errorMsg.innerText = "Неверный ответ капчи. Попробуйте снова.";
            errorMsg.style.display = 'block';
            generateCaptcha();
            captchaInput.value = '';
            return;
        }

        // Имитация AJAX
        const submitBtn = form.querySelector('.form__submit');
        submitBtn.innerText = "Отправка...";
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerText = "Начать сейчас";
            submitBtn.disabled = false;
            
            // Успех
            successMsg.style.display = 'block';
            form.reset();
            generateCaptcha();
            
            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}
// --- MOBILE MENU LOGIC ---
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

function toggleMenu() {
    burgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    // Блокируем скролл при открытом меню
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

burgerBtn.addEventListener('click', toggleMenu);

// Закрываем меню при клике на ссылку
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) toggleMenu();
    });
});

// --- COOKIE LOGIC ---
const cookiePopup = document.getElementById('cookie-popup');
const cookieAcceptBtn = document.getElementById('cookie-accept');

window.addEventListener('load', () => {
    // Показываем куки через 2 секунды, если еще не приняли
    if (!localStorage.getItem('zent_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('show');
        }, 2000);
    }
});

cookieAcceptBtn.addEventListener('click', () => {
    localStorage.setItem('zent_cookies_accepted', 'true');
    cookiePopup.classList.remove('show');
});