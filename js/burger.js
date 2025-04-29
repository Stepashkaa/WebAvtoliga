document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger-icon");
    const overlay = document.getElementById("overlay");
    const closeButton = document.querySelector(".close-btn");
    const cooperateButtons = document.querySelectorAll(".button_cooperate .custom-button");

    // Функция для открытия меню
    function openMenu() {
        document.body.classList.add("menu-open"); // Добавляем класс для body
        overlay.style.display = "block"; // Показываем overlay
        setTimeout(() => {
            overlay.classList.add("active"); // Добавляем класс active для анимации
        }, 100); // Небольшая задержка для корректного старта анимации
    }

    // Функция для закрытия меню
    function closeMenu() {
        overlay.classList.remove("active"); // Удаляем класс active для анимации
        setTimeout(() => {
            overlay.style.display = "none"; // Скрываем overlay после завершения анимации
            document.body.classList.remove("menu-open"); // Убираем класс menu-open
        }, 300); // Время анимации (должно совпадать с transition в CSS)
    }

    // Открытие панели при клике на бургер
    burger.addEventListener("click", openMenu);

    // Закрытие панели при клике на крестик
    closeButton.addEventListener("click", closeMenu);

    // Закрытие панели при клике вне области
    window.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeMenu();
        }
    });

    // Обработчик для якорных ссылок (плавная прокрутка и закрытие меню)
    document.querySelectorAll(".sidebar-menu a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Отменяем стандартное поведение ссылки

            const targetId = this.getAttribute("href").substring(1); // Получаем ID целевого элемента
            const targetElement = document.getElementById(targetId); // Находим целевой элемент

            if (targetElement) {
                // Плавная прокрутка к целевому элементу
                targetElement.scrollIntoView({ behavior: "smooth" });
            }

            closeMenu(); // Закрываем меню после клика
        });
    });

    // Перебираем все кнопки и добавляем обработчики
    cooperateButtons.forEach(cooperateButton => {
        cooperateButton.addEventListener("click", function (e) {
            e.preventDefault(); // Предотвращаем действие по умолчанию
            closeMenu(); // Закрываем боковое меню
            modal.style.display = "block"; // Показываем модальное окно
        });
    });

});