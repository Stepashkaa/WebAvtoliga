document.addEventListener("DOMContentLoaded", function () {
    // Обработчики открытия и закрытия модального окна
    // const openModalBtn = document.getElementById("openModalBtn");
    // const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("myModal");
    const form = document.getElementById("contactForm");
    const successNotification = document.querySelector(".success");
    const errorNotification = document.querySelector(".error");

    // Кнопки, которые должны открывать форму
    const openModalButtons = document.querySelectorAll(".open-modal");
    const closeModalButton = document.getElementById("closeModal");

    // Функция для отправки данных в Telegram
    function sendDataToTelegram(formData) {
        const botToken = '7016228596:AAFEVtiH2Jl8za7cUWA9WDc5XXxkV0zkMqg'; // Токен вашего бота
        const chatId = '996784383'; // ID получателя (пользователя)
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`; // URL для отправки сообщения

        // Формируем сообщение в формате HTML
        const message = `
            📩 Вам новая заявка:
            <b>Имя:</b> ${formData.name}
            <b>Компания:</b> ${formData.surname}
            <b>E-mail:</b> ${formData.email}
            <b>Заказ:</b> ${formData.order || 'Не указано'}
        `;

        // Параметры, которые будем отправлять
        const params = {
            chat_id: chatId, // ID чата
            text: message, // Текст сообщения
            parse_mode: 'HTML' // Режим парсинга HTML
        };

        // Отправляем данные с помощью fetch API
        return fetch(apiUrl, {
            method: 'POST', // Метод отправки
            headers: {
                'Content-Type': 'application/json', // Указываем тип содержимого
            },
            body: JSON.stringify(params) // Преобразуем параметры в JSON
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
    }

    // Функция для валидации формы
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!name || !surname || !email) {
            console.log('Validation failed: Required fields are missing');
            alert("Пожалуйста, заполните все обязательные поля.");
            return false; // Форма невалидна
        }
        // Простая проверка корректности email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            console.log('Validation failed: Invalid email');
            alert("Пожалуйста, введите корректный email.");
            return false; // Форма невалидна
        }
        return true; // Форма валидна
    }

    // Функция для открытия модального окна
    function openModal() {
        modal.style.display = "block"; // Показываем модальное окно
        setTimeout(() => {
            modal.querySelector(".modal-content").classList.add("slide-in"); // Добавляем класс для анимации появления
        }, 10); // Небольшая задержка для корректного старта анимации
    }

    // Функция для закрытия модального окна
    function closeModal() {
        const modalContent = modal.querySelector(".modal-content");
        modalContent.classList.remove("slide-in"); // Убираем класс для анимации появления
        modalContent.classList.add("slide-out"); // Добавляем класс для анимации исчезновения

        setTimeout(() => {
            modal.style.display = "none"; // Скрываем модальное окно после завершения анимации
            modalContent.classList.remove("slide-out"); // Очищаем класс анимации исчезновения
        }, 300); // Время анимации (должно совпадать с animation-duration в CSS)
    }

    // Обработчик события отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы
        if (validateForm()) { // Проверяем форму на валидность
            const formData = { // Собираем данные из формы
                name: document.getElementById('name').value.trim(),
                surname: document.getElementById('surname').value.trim(),
                email: document.getElementById('email').value.trim(),
                order: document.getElementById('order').value.trim() || 'Не указано'
            };

            // Отправляем данные в Telegram
            sendDataToTelegram(formData)
                .then(result => {
                    console.log('Response from Telegram:', result); // Логируем ответ
                    if (result.ok) {
                        // Если данные успешно отправлены
                        successNotification.style.display = 'block';
                        form.reset(); // Очищаем форму
                    } else {
                        // Если произошла ошибка при отправке
                        errorNotification.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Обработка ошибки
                    errorNotification.style.display = 'block';
                });
        }
    });

    // Обработчики закрытия уведомлений
    document.querySelectorAll('.close-notification').forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            successNotification.style.display = 'none';
            errorNotification.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (!successNotification.contains(event.target)) {
            successNotification.style.display = 'none';
        }
        if (!errorNotification.contains(event.target)) {
            errorNotification.style.display = 'none';
        }
    });
    // Добавление обработчиков для всех кнопок, открывающих форму
    openModalButtons.forEach(button => {
        button.onclick = function () {
            openModal(); // Используем функцию openModal
        };
    });

    // Закрытие модального окна при клике на крестик
    closeModalButton.onclick = function () {
        closeModal(); // Используем функцию closeModal
    };

    // Закрытие модального окна при клике вне окна
    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal(); // Используем функцию closeModal
        }
    };
});