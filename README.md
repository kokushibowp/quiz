# Quiz

[Figma](https://disk.yandex.ru/d/6eNr8ROcm4SKmA)

## Запуск

### Backend

`cd backend`

`npm i`

`npm run start`

[swagger](http://localhost:3000/swagger)

Пользователь: `user@mail.ru:password`

### Frontend

`cd example`

`npm i`

`npm run dev`

## Задание

Цель задачи: создать игру-квиз. Фронтенд должен взаимодействовать с API. Проект должен представлять из себя одностраничное приложение. Для создания приложения рекомендуется использовать один из паттерно группы MV* (например, MVP)

### 1. **Экран 1: Форма авторизации и регистрации**

#### 1.1. Форма авторизации

- **Описание**: При первом открытии игры пользователю отображается форма авторизации.
- **Поля**:
  - Поле ввода электронной почты
  - Поле ввода пароля
- **Кнопки**:
  - Кнопка "Войти"
- **Валидация**:
  - Поля не должны быть пустыми.
  - При успешной авторизации осуществляется переход на экран списка викторин.
  - Если авторизация не удалась, должно выводиться сообщение об ошибке "Неверный логин или пароль".
- **Api**
  - При нажатии на кнопку "Войти" должен отправиться запрос на `/api/auth/login`.

##### 1.2. Кнопка перехода на форму регистрации

- Ссылка "Регистрация" При нажатии открывает экран регистрации.

---

### 2. **Экран 2: Форма регистрации**

#### 2.1. Форма регистрации

- **Описание**: Форма регистрации с двумя полями.
- **Поля**:
  - Поле ввода электронной почты
  - Поле ввода пароля
- **Кнопки**:
  - Кнопка "Зарегистрироваться"
- **Валидация**:
  - Поля не должны быть пустыми.
  - При успешной регистрации пользователь автоматически авторизуется, осуществляется переход на экран списка викторин.
  - При ошибки `409 Conflict` необходимо отобразить сообщение "Пользователь с таким email уже зарегистрирован".
- **Api**
  - При нажатии на кнопку "Зарегистрироваться" должен отправиться запрос на `/api/auth/register`.

---

### 3. **Экран 3: Список викторин**

#### 3.1. Проверка пользователя

- Если пользователь не вошел - происходит переход на экран авторизации.

#### 3.2. Запрос списка викторин

- После успешной авторизации нужно сделать запрос на `/api/quizzes` для получения списка викторин.
- Каждая викторина содержит:
  - ID викторины
  - Название викторины
  - Описание
  - Изображение
  - Количество просмотров

#### 3.3. Выбор викторины

- При клике на викторину делается запрос к `/api/quizzes/:id/questions` для получения списка вопросов и запрос к `/api/quizzes/:id/last-question` для получения индекса последнего неотвеченного вопроса.
- После этого осуществляется переход на экран вопросов.

---

### 4. **Экран 4: Вопросы квиза**

#### 4.1. Запрос вопросов

- При выборе викторины запрашиваются вопросы, которые содержат:
  - Текст вопроса
  - Опциональную картинку
  - Список вариантов ответов
  - ID вопроса
  - Ответ пользователя (при наличии)
  - Правильно ли ответил пользователь (при наличии)

#### 4.2. Навигация по вопросам

- Если пользователь уже начинал викторину, нужно определить последний неотвеченный вопрос с помощью запроса на `/api/quizzes/:id/last-question`.
- Вопросы отображаются по одному. Есть кнопка для отправки ответа на текущий вопрос.
- Пользователь может вернуться назад, но не может изменить ответ

#### 4.3. Выбор ответа

- При выборе одного из вариантов ответов отправляется запрос на `/api/questions/:id/answer` с параметром `answerIndex`, который содержит индекс выбранного ответа.
- **Обработка ответа**:
  - Если ответ правильный, необходимо обвести выбранный вариант зеленым, если неправильный - красным
  - Если ответ на этот вопрос уже был дан (статус `409 Conflict`), нужно сделать запрос к `/api/quizzes/:id/last-question` и перейти к следующему неотвеченному вопросу.

#### 4.4. Переход между вопросами

- После ответа на вопрос должна отобразиться кнопка перехода к следующему вопросу
- Если все вопросы пройдены, отображается экран с результатами.

---

### 5. **Экран 5: Результаты**

#### 5.1. Запрос результатов

- После завершения викторины должен быть сделан запрос на `/api/quizzes/:id/result` для получения результатов. Данные содержат:
  - Количество правильных ответов
  - Общее количество вопросов
  - Процент правильных ответов
  - Количество неотвеченных вопросов

---

#### 6. Логика API

- Все запросы к API должны учитывать наличие токена в заголовке для идентификации пользователя. Токен в формате Bearer.
  
  Пример заголовка авторизации: `Authorization: Bearer some-token-string`. Вместо `some-token-string` необходимо подставить полученный при авторизации токен.

---

### 7. **Дополнительно**

#### 7.1. Сохранение состояния

- Состояние пользователя должно сохраняться и восстанавливаться через `localStorage` (токен пользователя).
- Ключ для сохранения токена в `localStorage` должен быть `auth`.
- При открытии игры, если в `localStorage` есть токен, происходит автоматическая авторизация, и отображается экран списка викторин.

#### 7.2. Обработка ошибок

- При ошибки `401 Unauthorized` необходимо:
  - Удалить токен из `localStorage`.
  - Отобразить экран авторизации.
