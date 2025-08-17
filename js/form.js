document.addEventListener('DOMContentLoaded', function() {
    // Обработка кастомного select
    const selectSingle = document.querySelector('.__select');
    if (!selectSingle) return;

    const selectSingle_title = selectSingle.querySelector('.__select__title');
    const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

    // Toggle menu
    selectSingle_title.addEventListener('click', (e) => {
        e.stopPropagation();
        selectSingle.setAttribute('data-state',
            selectSingle.getAttribute('data-state') === 'active' ? '' : 'active');
    });

    // Close when click to option
    selectSingle_labels.forEach(label => {
        label.addEventListener('click', (evt) => {
            evt.stopPropagation();
            selectSingle_title.textContent = evt.target.textContent;
            selectSingle.setAttribute('data-state', '');
        });
    });

    // Close when click outside
    document.addEventListener('click', (e) => {
        if (!selectSingle.contains(e.target)) {
            selectSingle.setAttribute('data-state', '');
        }
    });

    // Закрытие при нажатии Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && selectSingle.getAttribute('data-state') === 'active') {
            selectSingle.setAttribute('data-state', '');
        }
    });

    // Обработка range input
    const rangeInput = document.querySelector('.form__range-input');
    const rangeValue = document.querySelector('.form__range-value');

    if (rangeInput && rangeValue) {
        rangeInput.addEventListener('input', () => {
            rangeValue.textContent = `${rangeInput.value}%`;
        });
    }

    // Обработка file input
    document.querySelectorAll('.form__file-input').forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'Прикрепить файл';
            const textElement = this.closest('.form__file').querySelector('.form__file-text');
            if (textElement) {
                textElement.textContent = fileName;
                this.closest('.form__file').classList.toggle('has-file', this.files.length > 0);
            }
        });
    });

    // Отправка формы
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Собираем данные формы
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Добавляем значение range
        if (rangeInput) {
            data.rangeValue = rangeInput.value;
        }

        // Добавляем выбранный вариант из кастомного select
        const selectedOption = document.querySelector('.__select__input:checked');
        if (selectedOption) {
            data.selectedSystem = selectedOption.nextElementSibling.textContent;
        }

        // Добавляем информацию о файле
        const fileInput = document.querySelector('.form__file-input');
        data.fileName = fileInput.files[0] ? fileInput.files[0].name : 'Файл не выбран';

        console.log('Данные формы:', data);

        // Показываем пользователю информацию
        alert(`Форма отправлена!\n\nИмя: ${data.name || 'не указано'}\nEmail: ${data.email || 'не указан'}\nСистема: ${data.selectedSystem || 'не выбрана'}\nПроцент: ${data.rangeValue || '0'}%\nФайл: ${data.fileName}`);

        // Сбрасываем форму
        this.reset();

        // Сбрасываем дополнительные элементы
        if (rangeValue) rangeValue.textContent = '75%';
        if (rangeInput) rangeInput.value = 75;
        if (selectSingle_title) selectSingle_title.textContent = 'Выберите тип системы';

        // Сбрасываем файловый инпут
        document.querySelectorAll('.form__file-text').forEach(el => {
            el.textContent = 'Прикрепить файл';
        });
        document.querySelectorAll('.form__file').forEach(el => {
            el.classList.remove('has-file');
        });
    });
});