document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModal = document.getElementById("closeModal");
    const successMessage = document.getElementById("successMessage");
    const closeSuccess = document.getElementById("closeSuccess");
    const form = document.getElementById("contactForm");

    // Открытие модального окна
    openModalBtn.onclick = function () {
        modal.style.display = "block";
    };

    // Закрытие модального окна
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // Закрытие модального окна при клике вне окна
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Закрытие сообщения об успехе
    closeSuccess.onclick = function () {
        successMessage.style.display = "none";
    };

    // Валидация и отправка формы
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Проверяем обязательные поля
        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !surname || !email) {
            alert("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        // Если все поля валидны, показываем сообщение об успехе
        successMessage.style.display = "block";

        // Симуляция отправки данных
        setTimeout(function () {
            modal.style.display = "none"; // Закрываем модальное окно
            form.reset(); // Очищаем форму
        }, 500);

        // Здесь можно добавить код для реальной отправки данных через AJAX
    });
});