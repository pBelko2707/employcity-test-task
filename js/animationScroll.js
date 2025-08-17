document.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Получаем целевой элемент по ID из href
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Плавная прокрутка к элементу
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Добавляем класс активной ссылке (опционально)
            document.querySelectorAll('.header__link').forEach(lnk => {
                lnk.classList.remove('header__link--active');
            });
            this.classList.add('header__link--active');
        }
    });
});