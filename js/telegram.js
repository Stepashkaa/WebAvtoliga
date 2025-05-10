document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("myModal");
    const form = document.getElementById("contactForm");
    const successNotification = document.querySelector(".success");
    const errorNotification = document.querySelector(".error");
    const openModalButtons = document.querySelectorAll(".open-modal");
    const closeModalButton = document.getElementById("closeModal");
    let scrollPosition = 0;

    function sendDataToTelegram(formData) {
        const botToken = '7016228596:AAFEVtiH2Jl8za7cUWA9WDc5XXxkV0zkMqg';
        const chatId = '996784383';
        const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const message = `
            📩 Вам новая заявка:
            <b>Имя:</b> ${formData.name}
            <b>E-mail:</b> ${formData.email}
            <b>Телефон:</b> ${formData.phone}
            <b>Заказ:</b> ${formData.order || 'Не указано'}
        `;

        const params = {
            chat_id: chatId, 
            text: message, 
            parse_mode: 'HTML' 
        };

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(params)
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
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name || !email || !phone) {
            console.log('Validation failed: Required fields are missing');
            alert("Пожалуйста, заполните все обязательные поля.");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            console.log('Validation failed: Invalid email');
            alert("Пожалуйста, введите корректный email.");
            return false;
        }
        const phonePattern = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
        if (!phonePattern.test(phone)) {
            console.log('Validation failed: Invalid phone number');
            alert("Пожалуйста, введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX.");
            return false; 
        }
        return true;
    }
    function openModal() {
        scrollPosition = window.scrollY;
        document.body.classList.add("modal-open");
        document.body.style.top = `-${scrollPosition}px`;
        modal.style.display = "block";
        setTimeout(() => {
            modal.querySelector(".modal-content").classList.add("slide-in");
        }, 10);
    }
    // Функция для закрытия модального окна
    function closeModal() {
        const modalContent = modal.querySelector(".modal-content");
        modalContent.classList.remove("slide-in"); 
        modalContent.classList.add("slide-out"); 
        setTimeout(() => {
            modal.style.display = "none";
            modalContent.classList.remove("slide-out");
            document.body.classList.remove("modal-open");
            document.documentElement.style.scrollBehavior = "auto";
            document.body.style.top = "";
            window.scrollTo(0, scrollPosition);
            document.documentElement.style.scrollBehavior = "";
        }, 300);
    }

    // Обработчик события отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы
        if (validateForm()) { // Проверяем форму на валидность
            const formData = { // Собираем данные из формы
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                order: document.getElementById('order').value.trim() || 'Не указано'
            };

            // Отправляем данные в Telegram
            sendDataToTelegram(formData)
                .then(result => {
                    console.log('Response from Telegram:', result);
                    if (result.ok) {
                        // Если данные успешно отправлены
                        successNotification.style.display = 'block';
                        form.reset();
                    } else {
                        errorNotification.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
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
    openModalButtons.forEach(button => {
        button.onclick = function () {
            openModal();
        };
    });
    // Закрытие модального окна при клике на крестик
    closeModalButton.onclick = function () {
        closeModal();
    };
    // Закрытие модального окна при клике вне окна
    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };
});