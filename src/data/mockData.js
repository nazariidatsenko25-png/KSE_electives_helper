// Mock user profile data
export const mockUser = {
    id: 1,
    email: 'olena.kovalenko@kse.org.ua',
    first_name: 'Олена',
    last_name: 'Коваленко',
    major: 'Програмна інженерія',
    current_year: 2,
    total_credits: 72,
    creditsRequired: 240,
    gpa: 88.5,
    wishlist: [10, 14, 15] // Seeded courses for initial sync
};

// Mock transcript data
export const mockTranscript = [
    { course_code: 'CS101', course_name: 'Вступ до програмування', grade: 'A', credits: 6, semester: 'Осінь 2025' },
    { course_code: 'CS201', course_name: 'Структури даних', grade: 'A-', credits: 6, semester: 'Весна 2026' },
    { course_code: 'MATH101', course_name: 'Математичний аналіз I', grade: 'B+', credits: 6, semester: 'Осінь 2025' },
    { course_code: 'MATH201', course_name: 'Лінійна алгебра', grade: 'A', credits: 6, semester: 'Весна 2026' },
    { course_code: 'ECON101', course_name: 'Мікроекономіка', grade: 'B+', credits: 6, semester: 'Осінь 2025' },
    { course_code: 'ECON201', course_name: 'Макроекономіка', grade: 'A-', credits: 6, semester: 'Весна 2026' },
    { course_code: 'STAT101', course_name: 'Теорія ймовірностей', grade: 'B', credits: 6, semester: 'Осінь 2025' },
    { course_code: 'ENG201', course_name: 'Академічне письмо', grade: 'A', credits: 6, semester: 'Весна 2026' },
    { course_code: 'CS301', course_name: 'Бази даних', grade: 'A-', credits: 6, semester: 'Осінь 2026' },
    { course_code: 'CS302', course_name: 'Веб-розробка', grade: 'A', credits: 6, semester: 'Осінь 2026' },
    { course_code: 'PHIL101', course_name: 'Критичне мислення', grade: 'B+', credits: 6, semester: 'Осінь 2025' },
    { course_code: 'ECON301', course_name: 'Поведінкова економіка', grade: 'A-', credits: 6, semester: 'Осінь 2026' },
];

// Mock course catalog
export const mockCatalog = [
    {
        "id": 10,
        "code": "МАТ101",
        "name": "Кількісні статистики",
        "instructor": "Володимир Павленко",
        "instructorTitle": "expert",
        "credits": 6,
        "duration": 10,
        "startWeek": 5,
        "termLength": 16,
        "practicePercentage": 40,
        "enrollmentType": {
            "mandatory": 40,
            "elective": 60
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 47
            },
            {
                "name": "КН",
                "value": 38
            },
            {
                "name": "Інше",
                "value": 15
            }
        ],
        "gradingBreakdown": {
            "exam": 55,
            "project": 39,
            "homework": 6
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "PhD",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Математика",
        "description": "Розширений курс про статистики. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 34
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.3,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%20%D0%9F%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 12 роками досвіду в індустрії (Математика).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-10",
        "maxPoints": 100,
        "weeklyPoints": [
            19,
            2,
            5,
            4,
            4,
            4,
            3,
            28,
            3,
            28
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "Базові навички критичного мислення",
                    "ПРА102 Глобальна інтелектуальної власності",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "ЕКО104 Кількісні макроекономіки",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розвинути критичне мислення",
                "Навчитися працювати з даними"
            ],
            "outcomes": [
                "Застосовувати отримані знання",
                "Підготувати дослідницький проєкт",
                "Аналізувати інформацію"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 23,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 29,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "24",
                    "total": 24,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "24",
                    "total": 24,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 87.3,
        "passRate60Plus": 93,
        "attendanceMandatory": true,
        "bonusPointsAvailable": true,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 100,
        "lectureHours": 48,
        "practiceHours": 32
    },
    {
        "id": 11,
        "code": "ПРА102",
        "name": "Глобальна інтелектуальної власності",
        "instructor": "Андрій Мороз",
        "instructorTitle": "expert",
        "credits": 6,
        "duration": 9,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 53,
        "enrollmentType": {
            "mandatory": 93,
            "elective": 7
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 41
            },
            {
                "name": "КН",
                "value": 36
            },
            {
                "name": "Інше",
                "value": 23
            }
        ],
        "gradingBreakdown": {
            "exam": 42,
            "project": 12,
            "homework": 46
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Українська",
        "next_term": true,
        "category": "core",
        "department": "Право",
        "description": "Розширений курс про інтелектуальної власності. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 1
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%90%D0%BD%D0%B4%D1%80%D1%96%D0%B9%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 9 роками досвіду в індустрії (Право).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-11",
        "maxPoints": 100,
        "weeklyPoints": [
            8,
            5,
            2,
            3,
            2,
            5,
            4,
            29,
            42
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ124 Теорія машинного навчання",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Застосовувати правові норми на практиці",
                "Зрозуміти основи правової системи"
            ],
            "outcomes": [
                "Провести юридичну експертизу",
                "Виступити в суді",
                "Скласти договір",
                "Оформити позовну заяву"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 16,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 20,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "25",
                    "total": 25,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "39",
                    "total": 39,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 79.6,
        "passRate60Plus": 91,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 90,
        "lectureHours": 42,
        "practiceHours": 48
    },
    {
        "id": 12,
        "code": "МАТ103",
        "name": "Корпоративна топології",
        "instructor": "Проф. Олександр Гаврилюк",
        "instructorTitle": "professor",
        "credits": 3,
        "duration": 9,
        "startWeek": 4,
        "termLength": 16,
        "practicePercentage": 46,
        "enrollmentType": {
            "mandatory": 8,
            "elective": 92
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 59
            },
            {
                "name": "КН",
                "value": 28
            },
            {
                "name": "Інше",
                "value": 13
            }
        ],
        "gradingBreakdown": {
            "exam": 57,
            "project": 39,
            "homework": 4
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "Магістр",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Математика",
        "description": "Розширений курс про топології. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 13
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.3,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%20%D0%93%D0%B0%D0%B2%D1%80%D0%B8%D0%BB%D1%8E%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Математика, автор 22 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-12",
        "maxPoints": 100,
        "weeklyPoints": [
            13,
            5,
            2,
            5,
            5,
            4,
            4,
            21,
            41
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО149 Методи фінансового менеджменту",
                    "МАТ110 Методи топології",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розуміти базові концепції дисципліни",
                "Розвинути критичне мислення"
            ],
            "outcomes": [
                "Підготувати дослідницький проєкт",
                "Застосовувати отримані знання",
                "Аналізувати інформацію"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 21,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 27,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "16",
                    "total": 16,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "36",
                    "total": 36,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 87,
        "passRate60Plus": 80,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 51,
        "lectureHours": 21,
        "practiceHours": 18
    },
    {
        "id": 13,
        "code": "ЕКО104",
        "name": "Кількісні макроекономіки",
        "instructor": "Проф. Оксана Мороз",
        "instructorTitle": "professor",
        "credits": 3,
        "duration": 12,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 51,
        "enrollmentType": {
            "mandatory": 91,
            "elective": 9
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 41
            },
            {
                "name": "КН",
                "value": 37
            },
            {
                "name": "Інше",
                "value": 22
            }
        ],
        "gradingBreakdown": {
            "exam": 40,
            "project": 13,
            "homework": 47
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": false,
        "category": "core",
        "department": "Економіка",
        "description": "Розширений курс про макроекономіки. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 27
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.4,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BA%D1%81%D0%B0%D0%BD%D0%B0%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Економіка, автор 25 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-13",
        "maxPoints": 100,
        "weeklyPoints": [
            -3,
            3,
            2,
            3,
            3,
            4,
            2,
            17,
            4,
            4,
            5,
            56
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ECON401 Теорія ігор",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Оцінювати вплив макроекономічних шоків",
                "Будувати економетричні прогнози",
                "Зрозуміти базові економічні моделі"
            ],
            "outcomes": [
                "Розрахувати ВВП та інфляцію",
                "Аналізувати поведінку споживачів",
                "Будувати регресійні моделі"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 10,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 22,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "15",
                    "total": 15,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "53",
                    "total": 53,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 79.6,
        "passRate60Plus": 100,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 47,
        "lectureHours": 21,
        "practiceHours": 22
    },
    {
        "id": 14,
        "code": "КОМ105",
        "name": "Стратегічне баз даних",
        "instructor": "Олена Мельник",
        "instructorTitle": "lecturer",
        "credits": 6,
        "duration": 14,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 59,
        "enrollmentType": {
            "mandatory": 20,
            "elective": 80
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 56
            },
            {
                "name": "КН",
                "value": 28
            },
            {
                "name": "Інше",
                "value": 16
            }
        ],
        "gradingBreakdown": {
            "exam": 34,
            "project": 20,
            "homework": 46
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про баз даних. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 21
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.9,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BB%D0%B5%D0%BD%D0%B0%20%D0%9C%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 9 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-14",
        "maxPoints": 100,
        "weeklyPoints": [
            7,
            2,
            4,
            4,
            2,
            4,
            5,
            15,
            2,
            5,
            2,
            2,
            4,
            42
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "CS401 Штучний інтелект",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Навчитися проектувати архітектуру ПЗ",
                "Опанувати алгоритмічне мислення"
            ],
            "outcomes": [
                "Написати власну програму",
                "Оптимізувати SQL запити",
                "Налаштувати CI/CD",
                "Створити веб-застосунок"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 21,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 32,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "10",
                    "total": 10,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "37",
                    "total": 37,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 92.3,
        "passRate60Plus": 93,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 87,
        "lectureHours": 38,
        "practiceHours": 55
    },
    {
        "id": 15,
        "code": "ПРА106",
        "name": "Теорія корпоративного права",
        "instructor": "Юлія Мороз",
        "instructorTitle": "lecturer",
        "credits": 6,
        "duration": 11,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 38,
        "enrollmentType": {
            "mandatory": 33,
            "elective": 67
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 44
            },
            {
                "name": "КН",
                "value": 34
            },
            {
                "name": "Інше",
                "value": 22
            }
        ],
        "gradingBreakdown": {
            "exam": 48,
            "project": 26,
            "homework": 26
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 31
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.5,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%AE%D0%BB%D1%96%D1%8F%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 12 роками досвіду в індустрії (Право).",
        "maxPoints": 100,
        "weeklyPoints": [
            3,
            5,
            5,
            5,
            4,
            2,
            5,
            28,
            3,
            2,
            38
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ECON402 Фінансова економіка",
                    "МАТ103 Корпоративна топології",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Зрозуміти основи правової системи",
                "Захищати права клієнтів",
                "Застосовувати правові норми на практиці"
            ],
            "outcomes": [
                "Провести юридичну експертизу",
                "Оформити позовну заяву",
                "Виступити в суді",
                "Скласти договір"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 20,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 23,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "24",
                    "total": 24,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "33",
                    "total": 33,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 92,
        "passRate60Plus": 87,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 87,
        "lectureHours": 58,
        "practiceHours": 35
    },
    {
        "id": 16,
        "code": "ПРА107",
        "name": "Вступ до інтелектуальної власності",
        "instructor": "Проф. Юлія Бондаренко",
        "instructorTitle": "professor",
        "credits": 4,
        "duration": 13,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 64,
        "enrollmentType": {
            "mandatory": 95,
            "elective": 5
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 48
            },
            {
                "name": "КН",
                "value": 33
            },
            {
                "name": "Інше",
                "value": 19
            }
        ],
        "gradingBreakdown": {
            "exam": 59,
            "project": 19,
            "homework": 22
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Магістр",
        "language": "Українська",
        "next_term": false,
        "category": "core",
        "department": "Право",
        "description": "Розширений курс про інтелектуальної власності. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 10
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.8,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%AE%D0%BB%D1%96%D1%8F%20%D0%91%D0%BE%D0%BD%D0%B4%D0%B0%D1%80%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Право, автор 31 наукових статей у міжнародних виданнях.",
        "maxPoints": 100,
        "weeklyPoints": [
            3,
            5,
            5,
            2,
            4,
            5,
            3,
            20,
            4,
            4,
            2,
            3,
            40
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ127 Вступ до баз даних",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Навчитися аналізувати нормативні акти",
                "Застосовувати правові норми на практиці",
                "Захищати права клієнтів"
            ],
            "outcomes": [
                "Провести юридичну експертизу",
                "Виступити в суді",
                "Скласти договір"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 13,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 35,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "15",
                    "total": 15,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "37",
                    "total": 37,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 87.4,
        "passRate60Plus": 80,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 67,
        "lectureHours": 19,
        "practiceHours": 34
    },
    {
        "id": 17,
        "code": "КОМ108",
        "name": "Прикладна штучного інтелекту",
        "instructor": "Олена Власенко",
        "instructorTitle": "expert",
        "credits": 2,
        "duration": 14,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 68,
        "enrollmentType": {
            "mandatory": 15,
            "elective": 85
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 46
            },
            {
                "name": "КН",
                "value": 26
            },
            {
                "name": "Інше",
                "value": 28
            }
        ],
        "gradingBreakdown": {
            "exam": 48,
            "project": 31,
            "homework": 21
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": true,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про штучного інтелекту. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 37
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.9,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BB%D0%B5%D0%BD%D0%B0%20%D0%92%D0%BB%D0%B0%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 7 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-17",
        "maxPoints": 100,
        "weeklyPoints": [
            -1,
            5,
            3,
            5,
            2,
            4,
            5,
            20,
            4,
            3,
            3,
            4,
            5,
            38
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ105 Стратегічне баз даних",
                    "КОМ118 Кількісні криптографії",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Навчитися проектувати архітектуру ПЗ",
                "Розробляти масштабовані системи",
                "Опанувати алгоритмічне мислення"
            ],
            "outcomes": [
                "Налаштувати CI/CD",
                "Створити веб-застосунок",
                "Написати власну програму"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 15,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 35,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "16",
                    "total": 16,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "34",
                    "total": 34,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 81.5,
        "passRate60Plus": 97,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 29,
        "lectureHours": 10,
        "practiceHours": 21
    },
    {
        "id": 18,
        "code": "ПРА109",
        "name": "Корпоративна корпоративного права",
        "instructor": "Проф. Володимир Власенко",
        "instructorTitle": "professor",
        "credits": 5,
        "duration": 13,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 59,
        "enrollmentType": {
            "mandatory": 100,
            "elective": 0
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 52
            },
            {
                "name": "КН",
                "value": 21
            },
            {
                "name": "Інше",
                "value": 27
            }
        ],
        "gradingBreakdown": {
            "exam": 35,
            "project": 27,
            "homework": 38
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 36
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.2,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%20%D0%92%D0%BB%D0%B0%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Право, автор 18 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-18",
        "maxPoints": 100,
        "weeklyPoints": [
            11,
            5,
            3,
            4,
            2,
            2,
            3,
            21,
            4,
            2,
            2,
            2,
            39
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ118 Кількісні криптографії",
                    "КОМ105 Стратегічне баз даних",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Захищати права клієнтів",
                "Застосовувати правові норми на практиці",
                "Навчитися аналізувати нормативні акти"
            ],
            "outcomes": [
                "Провести юридичну експертизу",
                "Оформити позовну заяву",
                "Виступити в суді"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 21,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 26,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "17",
                    "total": 17,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "36",
                    "total": 36,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 92.6,
        "passRate60Plus": 87,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 80,
        "lectureHours": 29,
        "practiceHours": 41
    },
    {
        "id": 19,
        "code": "МАТ110",
        "name": "Методи топології",
        "instructor": "Володимир Ковальчук",
        "instructorTitle": "expert",
        "credits": 5,
        "duration": 8,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 46,
        "enrollmentType": {
            "mandatory": 97,
            "elective": 3
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 51
            },
            {
                "name": "КН",
                "value": 26
            },
            {
                "name": "Інше",
                "value": 23
            }
        ],
        "gradingBreakdown": {
            "exam": 55,
            "project": 25,
            "homework": 20
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "PhD",
        "language": "Українська",
        "next_term": false,
        "category": "core",
        "department": "Математика",
        "description": "Розширений курс про топології. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 19
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.8,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%20%D0%9A%D0%BE%D0%B2%D0%B0%D0%BB%D1%8C%D1%87%D1%83%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 11 роками досвіду в індустрії (Математика).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-19",
        "maxPoints": 100,
        "weeklyPoints": [
            4,
            4,
            3,
            2,
            5,
            3,
            20,
            59
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА128 Системний корпоративного права",
                    "МЕН129 Кількісні психології ділових відносин",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розвинути критичне мислення",
                "Навчитися працювати з даними",
                "Розуміти базові концепції дисципліни"
            ],
            "outcomes": [
                "Підготувати дослідницький проєкт",
                "Аналізувати інформацію"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 10,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 21,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "15",
                    "total": 15,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "54",
                    "total": 54,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 77.6,
        "passRate60Plus": 91,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 87,
        "lectureHours": 34,
        "practiceHours": 29
    },
    {
        "id": 20,
        "code": "КОМ111",
        "name": "Вступ до криптографії",
        "instructor": "Юлія Мороз",
        "instructorTitle": "lecturer",
        "credits": 5,
        "duration": 8,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 33,
        "enrollmentType": {
            "mandatory": 16,
            "elective": 84
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 38
            },
            {
                "name": "КН",
                "value": 32
            },
            {
                "name": "Інше",
                "value": 30
            }
        ],
        "gradingBreakdown": {
            "exam": 42,
            "project": 27,
            "homework": 31
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "Бакалавр",
        "language": "Англійська",
        "next_term": true,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про криптографії. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 30
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.2,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%AE%D0%BB%D1%96%D1%8F%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 9 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-20",
        "maxPoints": 100,
        "weeklyPoints": [
            24,
            3,
            3,
            5,
            5,
            2,
            18,
            40
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ112 Аналіз баз даних",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Розробляти масштабовані системи",
                "Працювати з базами даних",
                "Опанувати алгоритмічне мислення"
            ],
            "outcomes": [
                "Створити веб-застосунок",
                "Написати власну програму",
                "Налаштувати CI/CD",
                "Оптимізувати SQL запити"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 25,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 25,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "14",
                    "total": 14,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "36",
                    "total": 36,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 75.7,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 62,
        "lectureHours": 59,
        "practiceHours": 29
    },
    {
        "id": 21,
        "code": "КОМ112",
        "name": "Аналіз баз даних",
        "instructor": "Петро Ткаченко",
        "instructorTitle": "lecturer",
        "credits": 2,
        "duration": 14,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 43,
        "enrollmentType": {
            "mandatory": 22,
            "elective": 78
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 59
            },
            {
                "name": "КН",
                "value": 34
            },
            {
                "name": "Інше",
                "value": 7
            }
        ],
        "gradingBreakdown": {
            "exam": 41,
            "project": 25,
            "homework": 34
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про баз даних. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 16
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%20%D0%A2%D0%BA%D0%B0%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 13 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-21",
        "maxPoints": 100,
        "weeklyPoints": [
            -3,
            5,
            3,
            2,
            4,
            3,
            2,
            24,
            5,
            5,
            4,
            4,
            4,
            38
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА144 Кількісні інтелектуальної власності",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Навчитися проектувати архітектуру ПЗ",
                "Опанувати алгоритмічне мислення",
                "Розробляти масштабовані системи"
            ],
            "outcomes": [
                "Створити веб-застосунок",
                "Налаштувати CI/CD",
                "Оптимізувати SQL запити"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 11,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 33,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "21",
                    "total": 21,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "35",
                    "total": 35,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 96.4,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 25,
        "lectureHours": 20,
        "practiceHours": 15
    },
    {
        "id": 22,
        "code": "ПРА113",
        "name": "Теорія корпоративного права",
        "instructor": "Марія Шевченко",
        "instructorTitle": "expert",
        "credits": 4,
        "duration": 13,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 68,
        "enrollmentType": {
            "mandatory": 18,
            "elective": 82
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 59
            },
            {
                "name": "КН",
                "value": 37
            },
            {
                "name": "Інше",
                "value": 4
            }
        ],
        "gradingBreakdown": {
            "exam": 57,
            "project": 34,
            "homework": 9
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 17
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.6,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9C%D0%B0%D1%80%D1%96%D1%8F%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 5 роками досвіду в індустрії (Право).",
        "maxPoints": 100,
        "weeklyPoints": [
            17,
            2,
            3,
            4,
            5,
            5,
            2,
            24,
            5,
            4,
            3,
            3,
            23
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "МАТ120 Основи статистики",
                    "КОМ111 Вступ до криптографії",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Застосовувати правові норми на практиці",
                "Навчитися аналізувати нормативні акти",
                "Захищати права клієнтів"
            ],
            "outcomes": [
                "Скласти договір",
                "Виступити в суді",
                "Провести юридичну експертизу"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 25,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 34,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "21",
                    "total": 21,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "20",
                    "total": 20,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 88.5,
        "passRate60Plus": 95,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 67,
        "lectureHours": 17,
        "practiceHours": 36
    },
    {
        "id": 23,
        "code": "МЕН114",
        "name": "Кількісні психології ділових відносин",
        "instructor": "Володимир Лисенко",
        "instructorTitle": "lecturer",
        "credits": 2,
        "duration": 11,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 68,
        "enrollmentType": {
            "mandatory": 85,
            "elective": 15
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 30
            },
            {
                "name": "КН",
                "value": 37
            },
            {
                "name": "Інше",
                "value": 33
            }
        ],
        "gradingBreakdown": {
            "exam": 46,
            "project": 19,
            "homework": 35
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Англійська",
        "next_term": false,
        "category": "core",
        "department": "Менеджмент",
        "description": "Розширений курс про психології ділових відносин. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 4
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.5,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%20%D0%9B%D0%B8%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 10 роками досвіду в індустрії (Менеджмент).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-23",
        "maxPoints": 100,
        "weeklyPoints": [
            24,
            2,
            3,
            3,
            4,
            3,
            2,
            23,
            3,
            2,
            31
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА113 Теорія корпоративного права",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розвинути критичне мислення",
                "Навчитися працювати з даними"
            ],
            "outcomes": [
                "Підготувати дослідницький проєкт",
                "Застосовувати отримані знання"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 23,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 29,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "21",
                    "total": 21,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "27",
                    "total": 27,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 81,
        "passRate60Plus": 85,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 32,
        "lectureHours": 9,
        "practiceHours": 19
    },
    {
        "id": 24,
        "code": "КОМ115",
        "name": "Теорія криптографії",
        "instructor": "Проф. Петро Кравченко",
        "instructorTitle": "professor",
        "credits": 4,
        "duration": 14,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 51,
        "enrollmentType": {
            "mandatory": 77,
            "elective": 23
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 59
            },
            {
                "name": "КН",
                "value": 31
            },
            {
                "name": "Інше",
                "value": 10
            }
        ],
        "gradingBreakdown": {
            "exam": 43,
            "project": 12,
            "homework": 45
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "PhD",
        "language": "Українська",
        "next_term": false,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про криптографії. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 27
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.5,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%20%D0%9A%D1%80%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 17 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-24",
        "maxPoints": 100,
        "weeklyPoints": [
            -9,
            2,
            3,
            2,
            4,
            2,
            3,
            30,
            5,
            5,
            2,
            4,
            2,
            45
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО104 Кількісні макроекономіки",
                    "ЕКО117 Стратегічне мікроекономіки",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Опанувати алгоритмічне мислення",
                "Розробляти масштабовані системи",
                "Працювати з базами даних"
            ],
            "outcomes": [
                "Налаштувати CI/CD",
                "Створити веб-застосунок"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 13,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 21,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "25",
                    "total": 25,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "41",
                    "total": 41,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 95,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 49,
        "lectureHours": 35,
        "practiceHours": 36
    },
    {
        "id": 25,
        "code": "ЕКО116",
        "name": "Прикладна мікроекономіки",
        "instructor": "Проф. Олександр Лисенко",
        "instructorTitle": "professor",
        "credits": 5,
        "duration": 10,
        "startWeek": 6,
        "termLength": 16,
        "practicePercentage": 32,
        "enrollmentType": {
            "mandatory": 86,
            "elective": 14
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 55
            },
            {
                "name": "КН",
                "value": 34
            },
            {
                "name": "Інше",
                "value": 11
            }
        ],
        "gradingBreakdown": {
            "exam": 52,
            "project": 38,
            "homework": 10
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Бакалавр",
        "language": "Англійська",
        "next_term": false,
        "category": "core",
        "department": "Економіка",
        "description": "Розширений курс про мікроекономіки. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 11
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%20%D0%9B%D0%B8%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Економіка, автор 23 наукових статей у міжнародних виданнях.",
        "maxPoints": 100,
        "weeklyPoints": [
            9,
            4,
            4,
            2,
            3,
            5,
            2,
            25,
            3,
            43
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА130 Прикладна корпоративного права",
                    "ПРА144 Кількісні інтелектуальної власності",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Навчитися аналізувати ринкові структури",
                "Зрозуміти базові економічні моделі"
            ],
            "outcomes": [
                "Будувати регресійні моделі",
                "Аналізувати поведінку споживачів",
                "Розрахувати ВВП та інфляцію"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 15,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 22,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "23",
                    "total": 23,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "40",
                    "total": 40,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 81.9,
        "passRate60Plus": 89,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 76,
        "lectureHours": 50,
        "practiceHours": 24
    },
    {
        "id": 26,
        "code": "ЕКО117",
        "name": "Стратегічне мікроекономіки",
        "instructor": "Оксана Ткаченко",
        "instructorTitle": "expert",
        "credits": 4,
        "duration": 13,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 33,
        "enrollmentType": {
            "mandatory": 100,
            "elective": 0
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 39
            },
            {
                "name": "КН",
                "value": 30
            },
            {
                "name": "Інше",
                "value": 31
            }
        ],
        "gradingBreakdown": {
            "exam": 38,
            "project": 17,
            "homework": 45
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Економіка",
        "description": "Розширений курс про мікроекономіки. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 8
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.5,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BA%D1%81%D0%B0%D0%BD%D0%B0%20%D0%A2%D0%BA%D0%B0%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 10 роками досвіду в індустрії (Економіка).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-26",
        "maxPoints": 100,
        "weeklyPoints": [
            13,
            2,
            4,
            5,
            3,
            4,
            5,
            25,
            4,
            2,
            5,
            5,
            23
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ127 Вступ до баз даних",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Будувати економетричні прогнози",
                "Навчитися аналізувати ринкові структури"
            ],
            "outcomes": [
                "Розрахувати ВВП та інфляцію",
                "Будувати регресійні моделі"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 24,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 34,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "23",
                    "total": 23,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "19",
                    "total": 19,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 81.4,
        "passRate60Plus": 86,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 68,
        "lectureHours": 35,
        "practiceHours": 17
    },
    {
        "id": 27,
        "code": "КОМ118",
        "name": "Кількісні криптографії",
        "instructor": "Проф. Наталія Мороз",
        "instructorTitle": "professor",
        "credits": 5,
        "duration": 11,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 34,
        "enrollmentType": {
            "mandatory": 96,
            "elective": 4
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 33
            },
            {
                "name": "КН",
                "value": 23
            },
            {
                "name": "Інше",
                "value": 44
            }
        ],
        "gradingBreakdown": {
            "exam": 55,
            "project": 29,
            "homework": 16
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про криптографії. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 19
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.8,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%96%D1%8F%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 42 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-27",
        "maxPoints": 100,
        "weeklyPoints": [
            4,
            2,
            4,
            3,
            4,
            3,
            2,
            16,
            5,
            5,
            52
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ124 Теорія машинного навчання",
                    "МАТ103 Корпоративна топології",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Опанувати алгоритмічне мислення",
                "Розробляти масштабовані системи",
                "Навчитися проектувати архітектуру ПЗ"
            ],
            "outcomes": [
                "Написати власну програму",
                "Створити веб-застосунок",
                "Налаштувати CI/CD"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 16,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 21,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "13",
                    "total": 13,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "50",
                    "total": 50,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 82.3,
        "passRate60Plus": 88,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 76,
        "lectureHours": 49,
        "practiceHours": 25
    },
    {
        "id": 28,
        "code": "КОМ119",
        "name": "Методи машинного навчання",
        "instructor": "Проф. Тетяна Кравченко",
        "instructorTitle": "professor",
        "credits": 2,
        "duration": 8,
        "startWeek": 7,
        "termLength": 16,
        "practicePercentage": 56,
        "enrollmentType": {
            "mandatory": 100,
            "elective": 0
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 30
            },
            {
                "name": "КН",
                "value": 36
            },
            {
                "name": "Інше",
                "value": 34
            }
        ],
        "gradingBreakdown": {
            "exam": 51,
            "project": 31,
            "homework": 18
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": false,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про машинного навчання. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 32
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.7,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%A2%D0%B5%D1%82%D1%8F%D0%BD%D0%B0%20%D0%9A%D1%80%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 43 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-28",
        "maxPoints": 100,
        "weeklyPoints": [
            11,
            2,
            5,
            5,
            5,
            4,
            23,
            45
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО149 Методи фінансового менеджменту",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Навчитися проектувати архітектуру ПЗ",
                "Опанувати алгоритмічне мислення"
            ],
            "outcomes": [
                "Написати власну програму",
                "Налаштувати CI/CD",
                "Створити веб-застосунок"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 13,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 26,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "20",
                    "total": 20,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "41",
                    "total": 41,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 80.8,
        "passRate60Plus": 84,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 35,
        "lectureHours": 11,
        "practiceHours": 14
    },
    {
        "id": 29,
        "code": "МАТ120",
        "name": "Основи статистики",
        "instructor": "Петро Лисенко",
        "instructorTitle": "expert",
        "credits": 6,
        "duration": 11,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 60,
        "enrollmentType": {
            "mandatory": 28,
            "elective": 72
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 50
            },
            {
                "name": "КН",
                "value": 25
            },
            {
                "name": "Інше",
                "value": 25
            }
        ],
        "gradingBreakdown": {
            "exam": 54,
            "project": 15,
            "homework": 31
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "PhD",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Математика",
        "description": "Розширений курс про статистики. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 6
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%20%D0%9B%D0%B8%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 8 роками досвіду в індустрії (Математика).",
        "maxPoints": 100,
        "weeklyPoints": [
            -4,
            5,
            2,
            5,
            2,
            4,
            4,
            22,
            2,
            5,
            53
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА106 Теорія корпоративного права",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розуміти базові концепції дисципліни",
                "Навчитися працювати з даними"
            ],
            "outcomes": [
                "Аналізувати інформацію",
                "Підготувати дослідницький проєкт",
                "Застосовувати отримані знання"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 14,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 21,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "17",
                    "total": 17,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "48",
                    "total": 48,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 78.5,
        "passRate60Plus": 89,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 107,
        "lectureHours": 29,
        "practiceHours": 44
    },
    {
        "id": 30,
        "code": "КОМ121",
        "name": "Обчислювальний криптографії",
        "instructor": "Проф. Андрій Павленко",
        "instructorTitle": "professor",
        "credits": 6,
        "duration": 14,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 45,
        "enrollmentType": {
            "mandatory": 95,
            "elective": 5
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 51
            },
            {
                "name": "КН",
                "value": 23
            },
            {
                "name": "Інше",
                "value": 26
            }
        ],
        "gradingBreakdown": {
            "exam": 49,
            "project": 28,
            "homework": 23
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": false,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про криптографії. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 40
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.6,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%90%D0%BD%D0%B4%D1%80%D1%96%D0%B9%20%D0%9F%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 26 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-30",
        "maxPoints": 100,
        "weeklyPoints": [
            -3,
            5,
            4,
            3,
            3,
            5,
            3,
            24,
            3,
            3,
            3,
            4,
            3,
            40
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ115 Теорія криптографії",
                    "ПРА106 Теорія корпоративного права",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Розробляти масштабовані системи",
                "Працювати з базами даних",
                "Опанувати алгоритмічне мислення"
            ],
            "outcomes": [
                "Налаштувати CI/CD",
                "Оптимізувати SQL запити",
                "Написати власну програму"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 19,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 26,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "19",
                    "total": 19,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "36",
                    "total": 36,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 82.1,
        "passRate60Plus": 100,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 102,
        "lectureHours": 43,
        "practiceHours": 35
    },
    {
        "id": 31,
        "code": "КОМ122",
        "name": "Корпоративна криптографії",
        "instructor": "Володимир Павленко",
        "instructorTitle": "lecturer",
        "credits": 2,
        "duration": 11,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 56,
        "enrollmentType": {
            "mandatory": 88,
            "elective": 12
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 56
            },
            {
                "name": "КН",
                "value": 22
            },
            {
                "name": "Інше",
                "value": 22
            }
        ],
        "gradingBreakdown": {
            "exam": 45,
            "project": 22,
            "homework": 33
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Бакалавр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про криптографії. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 1
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.9,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%20%D0%9F%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 5 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-31",
        "maxPoints": 100,
        "weeklyPoints": [
            20,
            5,
            2,
            4,
            3,
            2,
            3,
            25,
            5,
            3,
            28
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ124 Теорія машинного навчання",
                    "МЕН114 Кількісні психології ділових відносин",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Навчитися проектувати архітектуру ПЗ",
                "Розробляти масштабовані системи",
                "Працювати з базами даних"
            ],
            "outcomes": [
                "Написати власну програму",
                "Оптимізувати SQL запити",
                "Створити веб-застосунок",
                "Налаштувати CI/CD"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 20,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 34,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "22",
                    "total": 22,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "24",
                    "total": 24,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 94.3,
        "passRate60Plus": 85,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 33,
        "lectureHours": 12,
        "practiceHours": 15
    },
    {
        "id": 32,
        "code": "ПРА123",
        "name": "Сучасна корпоративного права",
        "instructor": "Михайло Власенко",
        "instructorTitle": "expert",
        "credits": 5,
        "duration": 14,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 50,
        "enrollmentType": {
            "mandatory": 39,
            "elective": 61
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 37
            },
            {
                "name": "КН",
                "value": 25
            },
            {
                "name": "Інше",
                "value": 38
            }
        ],
        "gradingBreakdown": {
            "exam": 44,
            "project": 38,
            "homework": 18
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Англійська",
        "next_term": true,
        "category": "elective",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 20
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.7,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%20%D0%92%D0%BB%D0%B0%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 13 роками досвіду в індустрії (Право).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-32",
        "maxPoints": 100,
        "weeklyPoints": [
            9,
            4,
            5,
            5,
            5,
            4,
            4,
            27,
            2,
            5,
            5,
            3,
            3,
            19
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ECON402 Фінансова економіка",
                    "CS401 Штучний інтелект",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Захищати права клієнтів",
                "Навчитися аналізувати нормативні акти"
            ],
            "outcomes": [
                "Провести юридичну експертизу",
                "Виступити в суді"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 25,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 35,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "25",
                    "total": 25,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "15",
                    "total": 15,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 96.4,
        "passRate60Plus": 82,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 76,
        "lectureHours": 37,
        "practiceHours": 37
    },
    {
        "id": 33,
        "code": "КОМ124",
        "name": "Теорія машинного навчання",
        "instructor": "Михайло Лисенко",
        "instructorTitle": "expert",
        "credits": 5,
        "duration": 12,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 49,
        "enrollmentType": {
            "mandatory": 75,
            "elective": 25
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 34
            },
            {
                "name": "КН",
                "value": 25
            },
            {
                "name": "Інше",
                "value": 41
            }
        ],
        "gradingBreakdown": {
            "exam": 45,
            "project": 37,
            "homework": 18
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": false,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про машинного навчання. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 3
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.9,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%20%D0%9B%D0%B8%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 14 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-33",
        "maxPoints": 100,
        "weeklyPoints": [
            -4,
            4,
            2,
            5,
            5,
            2,
            5,
            17,
            2,
            3,
            4,
            55
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "LAW201 Цифрове право та ШІ",
                    "КОМ121 Обчислювальний криптографії",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Працювати з базами даних",
                "Навчитися проектувати архітектуру ПЗ",
                "Розробляти масштабовані системи"
            ],
            "outcomes": [
                "Налаштувати CI/CD",
                "Написати власну програму",
                "Створити веб-застосунок",
                "Оптимізувати SQL запити"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 13,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 21,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "13",
                    "total": 13,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "53",
                    "total": 53,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 84.6,
        "passRate60Plus": 83,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 78,
        "lectureHours": 37,
        "practiceHours": 35
    },
    {
        "id": 34,
        "code": "КОМ125",
        "name": "Аналіз криптографії",
        "instructor": "Проф. Юлія Савченко",
        "instructorTitle": "professor",
        "credits": 4,
        "duration": 11,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 48,
        "enrollmentType": {
            "mandatory": 78,
            "elective": 22
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 52
            },
            {
                "name": "КН",
                "value": 22
            },
            {
                "name": "Інше",
                "value": 26
            }
        ],
        "gradingBreakdown": {
            "exam": 37,
            "project": 39,
            "homework": 24
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Українська",
        "next_term": true,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про криптографії. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 21
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.8,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%AE%D0%BB%D1%96%D1%8F%20%D0%A1%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 32 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-34",
        "maxPoints": 100,
        "weeklyPoints": [
            18,
            4,
            2,
            3,
            2,
            4,
            5,
            18,
            3,
            2,
            39
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ147 Аналіз штучного інтелекту",
                    "ПРА141 Інноваційна корпоративного права",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Навчитися проектувати архітектуру ПЗ",
                "Розробляти масштабовані системи",
                "Працювати з базами даних"
            ],
            "outcomes": [
                "Налаштувати CI/CD",
                "Створити веб-застосунок",
                "Оптимізувати SQL запити",
                "Написати власну програму"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 15,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 34,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "14",
                    "total": 14,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "37",
                    "total": 37,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 87.9,
        "passRate60Plus": 89,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 53,
        "lectureHours": 35,
        "practiceHours": 32
    },
    {
        "id": 35,
        "code": "ПРА126",
        "name": "Стратегічне корпоративного права",
        "instructor": "Оксана Кравченко",
        "instructorTitle": "lecturer",
        "credits": 5,
        "duration": 11,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 46,
        "enrollmentType": {
            "mandatory": 24,
            "elective": 76
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 53
            },
            {
                "name": "КН",
                "value": 40
            },
            {
                "name": "Інше",
                "value": 7
            }
        ],
        "gradingBreakdown": {
            "exam": 46,
            "project": 27,
            "homework": 27
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "Бакалавр",
        "language": "Англійська",
        "next_term": true,
        "category": "elective",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 25
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.7,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BA%D1%81%D0%B0%D0%BD%D0%B0%20%D0%9A%D1%80%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 15 роками досвіду в індустрії (Право).",
        "maxPoints": 100,
        "weeklyPoints": [
            8,
            2,
            3,
            3,
            5,
            2,
            5,
            15,
            3,
            4,
            50
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА141 Інноваційна корпоративного права",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Захищати права клієнтів",
                "Зрозуміти основи правової системи",
                "Застосовувати правові норми на практиці"
            ],
            "outcomes": [
                "Скласти договір",
                "Оформити позовну заяву",
                "Виступити в суді",
                "Провести юридичну експертизу"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 20,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 23,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "12",
                    "total": 12,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "45",
                    "total": 45,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 83.2,
        "passRate60Plus": 91,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 76,
        "lectureHours": 40,
        "practiceHours": 34
    },
    {
        "id": 36,
        "code": "КОМ127",
        "name": "Вступ до баз даних",
        "instructor": "Наталія Мороз",
        "instructorTitle": "expert",
        "credits": 4,
        "duration": 11,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 70,
        "enrollmentType": {
            "mandatory": 12,
            "elective": 88
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 33
            },
            {
                "name": "КН",
                "value": 22
            },
            {
                "name": "Інше",
                "value": 45
            }
        ],
        "gradingBreakdown": {
            "exam": 31,
            "project": 28,
            "homework": 41
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про баз даних. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 25
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.4,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%96%D1%8F%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 15 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-36",
        "maxPoints": 100,
        "weeklyPoints": [
            3,
            5,
            2,
            5,
            3,
            2,
            4,
            23,
            5,
            5,
            43
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ122 Корпоративна криптографії",
                    "КОМ147 Аналіз штучного інтелекту",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Розробляти масштабовані системи",
                "Навчитися проектувати архітектуру ПЗ",
                "Працювати з базами даних"
            ],
            "outcomes": [
                "Написати власну програму",
                "Налаштувати CI/CD"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 17,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 21,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "21",
                    "total": 21,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "41",
                    "total": 41,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 79.1,
        "passRate60Plus": 84,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 51,
        "lectureHours": 21,
        "practiceHours": 48
    },
    {
        "id": 37,
        "code": "ПРА128",
        "name": "Системний корпоративного права",
        "instructor": "Проф. Оксана Лисенко",
        "instructorTitle": "professor",
        "credits": 3,
        "duration": 11,
        "startWeek": 4,
        "termLength": 16,
        "practicePercentage": 59,
        "enrollmentType": {
            "mandatory": 100,
            "elective": 0
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 53
            },
            {
                "name": "КН",
                "value": 34
            },
            {
                "name": "Інше",
                "value": 13
            }
        ],
        "gradingBreakdown": {
            "exam": 43,
            "project": 23,
            "homework": 34
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Українська",
        "next_term": false,
        "category": "core",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 38
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.7,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BA%D1%81%D0%B0%D0%BD%D0%B0%20%D0%9B%D0%B8%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Право, автор 28 наукових статей у міжнародних виданнях.",
        "maxPoints": 100,
        "weeklyPoints": [
            11,
            4,
            3,
            2,
            3,
            4,
            4,
            28,
            5,
            3,
            33
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА144 Кількісні інтелектуальної власності",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Захищати права клієнтів",
                "Навчитися аналізувати нормативні акти",
                "Застосовувати правові норми на практиці"
            ],
            "outcomes": [
                "Скласти договір",
                "Провести юридичну експертизу",
                "Виступити в суді",
                "Оформити позовну заяву"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 17,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 29,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "23",
                    "total": 23,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "31",
                    "total": 31,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 78.9,
        "passRate60Plus": 91,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 44,
        "lectureHours": 19,
        "practiceHours": 27
    },
    {
        "id": 38,
        "code": "МЕН129",
        "name": "Кількісні психології ділових відносин",
        "instructor": "Андрій Мороз",
        "instructorTitle": "lecturer",
        "credits": 4,
        "duration": 11,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 36,
        "enrollmentType": {
            "mandatory": 18,
            "elective": 82
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 36
            },
            {
                "name": "КН",
                "value": 24
            },
            {
                "name": "Інше",
                "value": 40
            }
        ],
        "gradingBreakdown": {
            "exam": 55,
            "project": 38,
            "homework": 7
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": true,
        "category": "elective",
        "department": "Менеджмент",
        "description": "Розширений курс про психології ділових відносин. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 3
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.7,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%90%D0%BD%D0%B4%D1%80%D1%96%D0%B9%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 14 роками досвіду в індустрії (Менеджмент).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-38",
        "maxPoints": 100,
        "weeklyPoints": [
            12,
            4,
            2,
            5,
            3,
            2,
            2,
            28,
            4,
            2,
            36
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "МІЖ145 Корпоративна політології",
                    "ЕКО142 Вступ до фінансового менеджменту",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розвинути критичне мислення",
                "Навчитися працювати з даними",
                "Розуміти базові концепції дисципліни"
            ],
            "outcomes": [
                "Аналізувати інформацію",
                "Підготувати дослідницький проєкт"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 24,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 20,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "23",
                    "total": 23,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "33",
                    "total": 33,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 75.2,
        "passRate60Plus": 94,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 62,
        "lectureHours": 37,
        "practiceHours": 21
    },
    {
        "id": 39,
        "code": "ПРА130",
        "name": "Прикладна корпоративного права",
        "instructor": "Проф. Наталія Мороз",
        "instructorTitle": "professor",
        "credits": 4,
        "duration": 9,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 54,
        "enrollmentType": {
            "mandatory": 9,
            "elective": 91
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 49
            },
            {
                "name": "КН",
                "value": 40
            },
            {
                "name": "Інше",
                "value": 11
            }
        ],
        "gradingBreakdown": {
            "exam": 46,
            "project": 38,
            "homework": 16
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Магістр",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 18
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.7,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%96%D1%8F%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Право, автор 38 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-39",
        "maxPoints": 100,
        "weeklyPoints": [
            19,
            3,
            3,
            4,
            5,
            2,
            4,
            23,
            37
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "DATA301 Аналіз даних з Python",
                    "КОМ125 Аналіз криптографії",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Навчитися аналізувати нормативні акти",
                "Зрозуміти основи правової системи"
            ],
            "outcomes": [
                "Провести юридичну експертизу",
                "Оформити позовну заяву",
                "Виступити в суді",
                "Скласти договір"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 21,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 29,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "18",
                    "total": 18,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "32",
                    "total": 32,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 84.3,
        "passRate60Plus": 93,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 51,
        "lectureHours": 32,
        "practiceHours": 37
    },
    {
        "id": 40,
        "code": "МЕН131",
        "name": "Сучасна психології ділових відносин",
        "instructor": "Михайло Кравченко",
        "instructorTitle": "expert",
        "credits": 6,
        "duration": 13,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 57,
        "enrollmentType": {
            "mandatory": 18,
            "elective": 82
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 46
            },
            {
                "name": "КН",
                "value": 33
            },
            {
                "name": "Інше",
                "value": 21
            }
        ],
        "gradingBreakdown": {
            "exam": 31,
            "project": 37,
            "homework": 32
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Менеджмент",
        "description": "Розширений курс про психології ділових відносин. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 36
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.7,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%20%D0%9A%D1%80%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 12 роками досвіду в індустрії (Менеджмент).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-40",
        "maxPoints": 100,
        "weeklyPoints": [
            -3,
            2,
            4,
            5,
            5,
            2,
            5,
            25,
            2,
            3,
            2,
            3,
            45
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА106 Теорія корпоративного права",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Навчитися працювати з даними",
                "Розуміти базові концепції дисципліни",
                "Розвинути критичне мислення"
            ],
            "outcomes": [
                "Підготувати дослідницький проєкт",
                "Застосовувати отримані знання"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 13,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 24,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "22",
                    "total": 22,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "41",
                    "total": 41,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 95.2,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 90,
        "lectureHours": 39,
        "practiceHours": 51
    },
    {
        "id": 41,
        "code": "МАТ132",
        "name": "Вступ до статистики",
        "instructor": "Олена Лисенко",
        "instructorTitle": "lecturer",
        "credits": 6,
        "duration": 11,
        "startWeek": 5,
        "termLength": 16,
        "practicePercentage": 54,
        "enrollmentType": {
            "mandatory": 16,
            "elective": 84
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 36
            },
            {
                "name": "КН",
                "value": 29
            },
            {
                "name": "Інше",
                "value": 35
            }
        ],
        "gradingBreakdown": {
            "exam": 37,
            "project": 25,
            "homework": 38
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Математика",
        "description": "Розширений курс про статистики. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 15
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.6,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BB%D0%B5%D0%BD%D0%B0%20%D0%9B%D0%B8%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 9 роками досвіду в індустрії (Математика).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-41",
        "maxPoints": 100,
        "weeklyPoints": [
            9,
            3,
            5,
            4,
            5,
            5,
            5,
            14,
            2,
            3,
            45
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА128 Системний корпоративного права",
                    "ЕКО138 Економіка фірми",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розуміти базові концепції дисципліни",
                "Розвинути критичне мислення",
                "Навчитися працювати з даними"
            ],
            "outcomes": [
                "Застосовувати отримані знання",
                "Підготувати дослідницький проєкт",
                "Аналізувати інформацію"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 16,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 31,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "10",
                    "total": 10,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "43",
                    "total": 43,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 82.3,
        "passRate60Plus": 97,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 81,
        "lectureHours": 46,
        "practiceHours": 53
    },
    {
        "id": 42,
        "code": "МЕН133",
        "name": "Кібернетична психології ділових відносин",
        "instructor": "Андрій Ткаченко",
        "instructorTitle": "expert",
        "credits": 3,
        "duration": 11,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 38,
        "enrollmentType": {
            "mandatory": 6,
            "elective": 94
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 57
            },
            {
                "name": "КН",
                "value": 23
            },
            {
                "name": "Інше",
                "value": 20
            }
        ],
        "gradingBreakdown": {
            "exam": 31,
            "project": 23,
            "homework": 46
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "PhD",
        "language": "Англійська",
        "next_term": true,
        "category": "elective",
        "department": "Менеджмент",
        "description": "Розширений курс про психології ділових відносин. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 7
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.2,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%90%D0%BD%D0%B4%D1%80%D1%96%D0%B9%20%D0%A2%D0%BA%D0%B0%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 12 роками досвіду в індустрії (Менеджмент).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-42",
        "maxPoints": 100,
        "weeklyPoints": [
            12,
            4,
            5,
            5,
            3,
            5,
            2,
            25,
            2,
            4,
            33
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО116 Прикладна мікроекономіки",
                    "ЕКО138 Економіка фірми",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розуміти базові концепції дисципліни",
                "Розвинути критичне мислення"
            ],
            "outcomes": [
                "Підготувати дослідницький проєкт",
                "Аналізувати інформацію",
                "Застосовувати отримані знання"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 21,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 29,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "22",
                    "total": 22,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "28",
                    "total": 28,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 82.5,
        "passRate60Plus": 91,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 38,
        "lectureHours": 32,
        "practiceHours": 20
    },
    {
        "id": 43,
        "code": "МІЖ134",
        "name": "Стратегічне політології",
        "instructor": "Проф. Володимир Ткаченко",
        "instructorTitle": "professor",
        "credits": 3,
        "duration": 14,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 43,
        "enrollmentType": {
            "mandatory": 83,
            "elective": 17
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 36
            },
            {
                "name": "КН",
                "value": 27
            },
            {
                "name": "Інше",
                "value": 37
            }
        ],
        "gradingBreakdown": {
            "exam": 58,
            "project": 32,
            "homework": 10
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "Бакалавр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Міжнародні відносини",
        "description": "Розширений курс про політології. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 26
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%20%D0%A2%D0%BA%D0%B0%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Міжнародні відносини, автор 41 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-43",
        "maxPoints": 100,
        "weeklyPoints": [
            2,
            4,
            3,
            3,
            2,
            2,
            5,
            14,
            5,
            2,
            3,
            2,
            4,
            49
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ125 Аналіз криптографії",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розуміти базові концепції дисципліни",
                "Розвинути критичне мислення"
            ],
            "outcomes": [
                "Аналізувати інформацію",
                "Підготувати дослідницький проєкт"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 10,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 35,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "10",
                    "total": 10,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "45",
                    "total": 45,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 80.9,
        "passRate60Plus": 88,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 53,
        "lectureHours": 21,
        "practiceHours": 16
    },
    {
        "id": 44,
        "code": "ЕКО135",
        "name": "Прикладна фінансового менеджменту",
        "instructor": "Андрій Шевченко",
        "instructorTitle": "expert",
        "credits": 4,
        "duration": 12,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 41,
        "enrollmentType": {
            "mandatory": 75,
            "elective": 25
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 42
            },
            {
                "name": "КН",
                "value": 35
            },
            {
                "name": "Інше",
                "value": 23
            }
        ],
        "gradingBreakdown": {
            "exam": 56,
            "project": 27,
            "homework": 17
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Магістр",
        "language": "Українська",
        "next_term": false,
        "category": "core",
        "department": "Економіка",
        "description": "Розширений курс про фінансового менеджменту. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 38
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.6,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%90%D0%BD%D0%B4%D1%80%D1%96%D0%B9%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 14 роками досвіду в індустрії (Економіка).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-44",
        "maxPoints": 100,
        "weeklyPoints": [
            -6,
            3,
            5,
            5,
            5,
            4,
            4,
            25,
            2,
            3,
            5,
            45
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ECON401 Теорія ігор",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Зрозуміти базові економічні моделі",
                "Будувати економетричні прогнози",
                "Оцінювати вплив макроекономічних шоків"
            ],
            "outcomes": [
                "Аналізувати поведінку споживачів",
                "Розрахувати ВВП та інфляцію"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 14,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 24,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "22",
                    "total": 22,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "40",
                    "total": 40,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 82.7,
        "passRate60Plus": 82,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 59,
        "lectureHours": 36,
        "practiceHours": 25
    },
    {
        "id": 45,
        "code": "МЕН136",
        "name": "Стратегічне психології ділових відносин",
        "instructor": "Проф. Тетяна Власенко",
        "instructorTitle": "professor",
        "credits": 5,
        "duration": 10,
        "startWeek": 4,
        "termLength": 16,
        "practicePercentage": 67,
        "enrollmentType": {
            "mandatory": 8,
            "elective": 92
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 40
            },
            {
                "name": "КН",
                "value": 35
            },
            {
                "name": "Інше",
                "value": 25
            }
        ],
        "gradingBreakdown": {
            "exam": 49,
            "project": 19,
            "homework": 32
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Менеджмент",
        "description": "Розширений курс про психології ділових відносин. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 35
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.9,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%A2%D0%B5%D1%82%D1%8F%D0%BD%D0%B0%20%D0%92%D0%BB%D0%B0%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Менеджмент, автор 35 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-45",
        "maxPoints": 100,
        "weeklyPoints": [
            22,
            2,
            4,
            4,
            5,
            3,
            3,
            23,
            3,
            31
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО137 Системний мікроекономіки",
                    "МІЖ134 Стратегічне політології",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Навчитися працювати з даними",
                "Розвинути критичне мислення",
                "Розуміти базові концепції дисципліни"
            ],
            "outcomes": [
                "Підготувати дослідницький проєкт",
                "Аналізувати інформацію"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 24,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 31,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "18",
                    "total": 18,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "27",
                    "total": 27,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 96.8,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 80,
        "lectureHours": 23,
        "practiceHours": 47
    },
    {
        "id": 46,
        "code": "ЕКО137",
        "name": "Системний мікроекономіки",
        "instructor": "Оксана Шевченко",
        "instructorTitle": "lecturer",
        "credits": 5,
        "duration": 10,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 44,
        "enrollmentType": {
            "mandatory": 8,
            "elective": 92
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 52
            },
            {
                "name": "КН",
                "value": 32
            },
            {
                "name": "Інше",
                "value": 16
            }
        ],
        "gradingBreakdown": {
            "exam": 45,
            "project": 32,
            "homework": 23
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Економіка",
        "description": "Розширений курс про мікроекономіки. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 30
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.8,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BA%D1%81%D0%B0%D0%BD%D0%B0%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 14 роками досвіду в індустрії (Економіка).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-46",
        "maxPoints": 100,
        "weeklyPoints": [
            20,
            2,
            2,
            3,
            3,
            3,
            3,
            18,
            2,
            44
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО135 Прикладна фінансового менеджменту",
                    "ECON401 Теорія ігор",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Будувати економетричні прогнози",
                "Оцінювати вплив макроекономічних шоків",
                "Зрозуміти базові економічні моделі"
            ],
            "outcomes": [
                "Будувати регресійні моделі",
                "Формувати монетарну політику"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 12,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 35,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "14",
                    "total": 14,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "39",
                    "total": 39,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 92.5,
        "passRate60Plus": 87,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 75,
        "lectureHours": 42,
        "practiceHours": 33
    },
    {
        "id": 47,
        "code": "ЕКО138",
        "name": "Економіка фірми",
        "instructor": "Валентин Гвоздій",
        "instructorTitle": "expert",
        "credits": 2,
        "duration": 11,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 69,
        "enrollmentType": {
            "mandatory": 95,
            "elective": 5
        },
        "facultySplit": [
            {
                "name": "Бізнес",
                "value": 60
            },
            {
                "name": "Аналітика",
                "value": 35
            },
            {
                "name": "Інше",
                "value": 5
            }
        ],
        "gradingBreakdown": {
            "exam": 51,
            "project": 20,
            "homework": 29
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "PhD",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Економіка",
        "description": "Розширений курс про макроекономіки. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 11
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 5,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%B0%D0%BB%D0%B5%D0%BD%D1%82%D0%B8%D0%BD+%D0%93%D0%B2%D0%BE%D0%B7%D0%B4%D1%96%D0%B9&background=random&color=fff&size=128",
        "instructorBio": "Старший партнер юридичної фірми GOLAW.",
        "instructorLinkedIn": "https://linkedin.com/in/valentyngvozdiy",
        "maxPoints": 100,
        "weeklyPoints": [
            2,
            2,
            12,
            2,
            12,
            12,
            2,
            2,
            22,
            2,
            32
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ECON401 Теорія ігор",
                    "Базові навички аналітичного мислення та роботи з даними",
                    "Володіння Excel / Google Sheets на базовому рівні",
                    "Навички командної роботи та комунікації",
                    "Розуміння базових економічних категорій"
                ],
                "niceToHave": [
                    "Попереднє знайомство з бізнес-процесами",
                    "Навички створення презентацій (PowerPoint/Google Slides)",
                    "Базові знання з мікроекономіки",
                    "Інтерес до роботи реальних компаній"
                ]
            },
            "justification": "Курс «Економіка фірми» є фундаментальною частиною підготовки бакалаврів програм «Бізнес економіка» та «Економіка та великі дані» Київської школи економіки. Він розроблений для студентів першого року навчання та не вимагає поглиблених знань у сфері бізнесу чи фінансів.",
            "goals": [
                "Сформувати системне розуміння фірми як економічної системи.",
                "Навчити студентів аналізувати ресурси, виробничі процеси, витрати.",
                "Розвинути здатність приймати економічно обґрунтовані рішення.",
                "Навчити інтерпретувати результати діяльності підприємства."
            ],
            "outcomes": [
                "Пояснювати сутність фірми як економічної системи.",
                "Оцінювати структуру та ефективність використання основного капіталу.",
                "Аналізувати оборотні кошти.",
                "Оцінювати продуктивність праці та витрати на персонал.",
                "Формувати виробничу програму та аналізувати логістичні рішення.",
                "Розраховувати витрати та формувати ціну.",
                "Аналізувати фінансові результати (прибуток, рентабельність)."
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях, виконання завдань",
                    "perItem": "1 бал за семінар",
                    "total": 15,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Індивідуальні практичні",
                    "details": "Міні-есе, практичні розрахунки, міні-кейси",
                    "perItem": "10",
                    "total": 40,
                    "deadline": "Після кожного блоку"
                },
                {
                    "type": "Групова робота",
                    "details": "Проміжна презентація 1 (5 тиждень)",
                    "perItem": "10",
                    "total": 10,
                    "deadline": "Тиждень 5"
                },
                {
                    "type": "Групова робота",
                    "details": "Проміжна презентація 2 (9 тиждень)",
                    "perItem": "10",
                    "total": 10,
                    "deadline": "Тиждень 9"
                },
                {
                    "type": "Групова робота",
                    "details": "Фінальна презентація",
                    "perItem": "25",
                    "total": 25,
                    "deadline": "Тиждень 11"
                }
            ]
        },
        "historicalAverage": 91.3,
        "passRate60Plus": 90,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 28,
        "lectureHours": 10,
        "practiceHours": 22
    },
    {
        "id": 48,
        "code": "КОМ139",
        "name": "Кількісні машинного навчання",
        "instructor": "Василь Гаврилюк",
        "instructorTitle": "lecturer",
        "credits": 2,
        "duration": 14,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 59,
        "enrollmentType": {
            "mandatory": 90,
            "elective": 10
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 38
            },
            {
                "name": "КН",
                "value": 27
            },
            {
                "name": "Інше",
                "value": 35
            }
        ],
        "gradingBreakdown": {
            "exam": 43,
            "project": 24,
            "homework": 33
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": true,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про машинного навчання. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 31
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.2,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D1%8C%20%D0%93%D0%B0%D0%B2%D1%80%D0%B8%D0%BB%D1%8E%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 15 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-48",
        "maxPoints": 100,
        "weeklyPoints": [
            -8,
            2,
            3,
            2,
            4,
            5,
            2,
            28,
            2,
            5,
            2,
            4,
            2,
            47
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА128 Системний корпоративного права",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Опанувати алгоритмічне мислення",
                "Розробляти масштабовані системи"
            ],
            "outcomes": [
                "Оптимізувати SQL запити",
                "Написати власну програму"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 11,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 20,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "24",
                    "total": 24,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "45",
                    "total": 45,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 80.7,
        "passRate60Plus": 90,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 33,
        "lectureHours": 11,
        "practiceHours": 16
    },
    {
        "id": 49,
        "code": "ПРА140",
        "name": "Міжнародна корпоративного права",
        "instructor": "Тетяна Гаврилюк",
        "instructorTitle": "lecturer",
        "credits": 6,
        "duration": 9,
        "startWeek": 7,
        "termLength": 16,
        "practicePercentage": 33,
        "enrollmentType": {
            "mandatory": 83,
            "elective": 17
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 34
            },
            {
                "name": "КН",
                "value": 27
            },
            {
                "name": "Інше",
                "value": 39
            }
        ],
        "gradingBreakdown": {
            "exam": 58,
            "project": 32,
            "homework": 10
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Англійська",
        "next_term": false,
        "category": "core",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 40
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.8,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%A2%D0%B5%D1%82%D1%8F%D0%BD%D0%B0%20%D0%93%D0%B0%D0%B2%D1%80%D0%B8%D0%BB%D1%8E%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 5 роками досвіду в індустрії (Право).",
        "maxPoints": 100,
        "weeklyPoints": [
            13,
            2,
            5,
            2,
            2,
            5,
            4,
            14,
            53
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ111 Вступ до криптографії",
                    "MATH301 Диференціальні рівняння",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Застосовувати правові норми на практиці",
                "Зрозуміти основи правової системи",
                "Захищати права клієнтів"
            ],
            "outcomes": [
                "Провести юридичну експертизу",
                "Оформити позовну заяву"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 14,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 23,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "12",
                    "total": 12,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "51",
                    "total": 51,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 83,
        "passRate60Plus": 92,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 99,
        "lectureHours": 54,
        "practiceHours": 27
    },
    {
        "id": 50,
        "code": "ПРА141",
        "name": "Інноваційна корпоративного права",
        "instructor": "Василь Ковальчук",
        "instructorTitle": "expert",
        "credits": 3,
        "duration": 8,
        "startWeek": 6,
        "termLength": 16,
        "practicePercentage": 59,
        "enrollmentType": {
            "mandatory": 33,
            "elective": 67
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 41
            },
            {
                "name": "КН",
                "value": 32
            },
            {
                "name": "Інше",
                "value": 27
            }
        ],
        "gradingBreakdown": {
            "exam": 39,
            "project": 38,
            "homework": 23
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Право",
        "description": "Розширений курс про корпоративного права. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 7
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.8,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D1%8C%20%D0%9A%D0%BE%D0%B2%D0%B0%D0%BB%D1%8C%D1%87%D1%83%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 8 роками досвіду в індустрії (Право).",
        "maxPoints": 100,
        "weeklyPoints": [
            25,
            3,
            5,
            2,
            3,
            5,
            21,
            36
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "LAW201 Цифрове право та ШІ",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Навчитися аналізувати нормативні акти",
                "Зрозуміти основи правової системи",
                "Захищати права клієнтів"
            ],
            "outcomes": [
                "Виступити в суді",
                "Оформити позовну заяву"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 21,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 29,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "18",
                    "total": 18,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "32",
                    "total": 32,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 85.9,
        "passRate60Plus": 86,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 53,
        "lectureHours": 15,
        "practiceHours": 22
    },
    {
        "id": 51,
        "code": "ЕКО142",
        "name": "Вступ до фінансового менеджменту",
        "instructor": "Дмитро Шевченко",
        "instructorTitle": "expert",
        "credits": 3,
        "duration": 11,
        "startWeek": 4,
        "termLength": 16,
        "practicePercentage": 68,
        "enrollmentType": {
            "mandatory": 8,
            "elective": 92
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 32
            },
            {
                "name": "КН",
                "value": 39
            },
            {
                "name": "Інше",
                "value": 29
            }
        ],
        "gradingBreakdown": {
            "exam": 57,
            "project": 20,
            "homework": 23
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Бакалавр",
        "language": "Українська",
        "next_term": true,
        "category": "elective",
        "department": "Економіка",
        "description": "Розширений курс про фінансового менеджменту. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 40
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 5,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%BE%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 10 роками досвіду в індустрії (Економіка).",
        "maxPoints": 100,
        "weeklyPoints": [
            -3,
            2,
            4,
            5,
            4,
            5,
            5,
            24,
            5,
            3,
            46
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ119 Методи машинного навчання",
                    "CS401 Штучний інтелект",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Оцінювати вплив макроекономічних шоків",
                "Зрозуміти базові економічні моделі"
            ],
            "outcomes": [
                "Аналізувати поведінку споживачів",
                "Розрахувати ВВП та інфляцію",
                "Формувати монетарну політику"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 12,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 26,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "19",
                    "total": 19,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "43",
                    "total": 43,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 83.7,
        "passRate60Plus": 93,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 50,
        "lectureHours": 13,
        "practiceHours": 27
    },
    {
        "id": 52,
        "code": "ЕКО143",
        "name": "Міжнародна фінансового менеджменту",
        "instructor": "Михайло Лисенко",
        "instructorTitle": "expert",
        "credits": 6,
        "duration": 13,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 48,
        "enrollmentType": {
            "mandatory": 22,
            "elective": 78
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 32
            },
            {
                "name": "КН",
                "value": 32
            },
            {
                "name": "Інше",
                "value": 36
            }
        ],
        "gradingBreakdown": {
            "exam": 45,
            "project": 22,
            "homework": 33
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Економіка",
        "description": "Розширений курс про фінансового менеджменту. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 27
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.1,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%20%D0%9B%D0%B8%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 12 роками досвіду в індустрії (Економіка).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-52",
        "maxPoints": 100,
        "weeklyPoints": [
            2,
            4,
            4,
            4,
            4,
            4,
            5,
            19,
            5,
            3,
            4,
            5,
            37
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ125 Аналіз криптографії",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Будувати економетричні прогнози",
                "Оцінювати вплив макроекономічних шоків",
                "Зрозуміти базові економічні моделі"
            ],
            "outcomes": [
                "Будувати регресійні моделі",
                "Аналізувати поведінку споживачів",
                "Формувати монетарну політику"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 21,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 28,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "16",
                    "total": 16,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "35",
                    "total": 35,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 79.4,
        "passRate60Plus": 87,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 88,
        "lectureHours": 48,
        "practiceHours": 44
    },
    {
        "id": 53,
        "code": "ПРА144",
        "name": "Кількісні інтелектуальної власності",
        "instructor": "Проф. Дмитро Кравченко",
        "instructorTitle": "professor",
        "credits": 6,
        "duration": 8,
        "startWeek": 4,
        "termLength": 16,
        "practicePercentage": 69,
        "enrollmentType": {
            "mandatory": 83,
            "elective": 17
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 59
            },
            {
                "name": "КН",
                "value": 35
            },
            {
                "name": "Інше",
                "value": 6
            }
        ],
        "gradingBreakdown": {
            "exam": 48,
            "project": 36,
            "homework": 16
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Українська",
        "next_term": true,
        "category": "core",
        "department": "Право",
        "description": "Розширений курс про інтелектуальної власності. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 9
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.7,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%BE%20%D0%9A%D1%80%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Право, автор 46 наукових статей у міжнародних виданнях.",
        "maxPoints": 100,
        "weeklyPoints": [
            30,
            4,
            3,
            3,
            2,
            3,
            24,
            31
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "МЕН114 Кількісні психології ділових відносин",
                    "ПРА107 Вступ до інтелектуальної власності",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Зрозуміти основи правової системи",
                "Захищати права клієнтів"
            ],
            "outcomes": [
                "Провести юридичну експертизу",
                "Скласти договір",
                "Виступити в суді",
                "Оформити позовну заяву"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 19,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 33,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "19",
                    "total": 19,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "29",
                    "total": 29,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 91.1,
        "passRate60Plus": 96,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 93,
        "lectureHours": 27,
        "practiceHours": 60
    },
    {
        "id": 54,
        "code": "МІЖ145",
        "name": "Корпоративна політології",
        "instructor": "Проф. Михайло Павленко",
        "instructorTitle": "professor",
        "credits": 6,
        "duration": 13,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 51,
        "enrollmentType": {
            "mandatory": 97,
            "elective": 3
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 51
            },
            {
                "name": "КН",
                "value": 20
            },
            {
                "name": "Інше",
                "value": 29
            }
        ],
        "gradingBreakdown": {
            "exam": 37,
            "project": 18,
            "homework": 45
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "PhD",
        "language": "Українська",
        "next_term": false,
        "category": "core",
        "department": "Міжнародні відносини",
        "description": "Розширений курс про політології. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 39
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.9,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D0%BE%20%D0%9F%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Міжнародні відносини, автор 33 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-54",
        "maxPoints": 100,
        "weeklyPoints": [
            1,
            4,
            3,
            4,
            2,
            5,
            3,
            17,
            3,
            2,
            3,
            3,
            50
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "МЕН131 Сучасна психології ділових відносин",
                    "КОМ125 Аналіз криптографії",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розуміти базові концепції дисципліни",
                "Розвинути критичне мислення",
                "Навчитися працювати з даними"
            ],
            "outcomes": [
                "Аналізувати інформацію",
                "Підготувати дослідницький проєкт"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 20,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 22,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "13",
                    "total": 13,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "45",
                    "total": 45,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 86.1,
        "passRate60Plus": 92,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 83,
        "lectureHours": 48,
        "practiceHours": 49
    },
    {
        "id": 55,
        "code": "КОМ146",
        "name": "Стратегічне штучного інтелекту",
        "instructor": "Юлія Савченко",
        "instructorTitle": "lecturer",
        "credits": 3,
        "duration": 8,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 33,
        "enrollmentType": {
            "mandatory": 33,
            "elective": 67
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 35
            },
            {
                "name": "КН",
                "value": 27
            },
            {
                "name": "Інше",
                "value": 38
            }
        ],
        "gradingBreakdown": {
            "exam": 44,
            "project": 37,
            "homework": 19
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про штучного інтелекту. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 13
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.1,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%AE%D0%BB%D1%96%D1%8F%20%D0%A1%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 11 роками досвіду в індустрії (Комп'ютерні науки).",
        "maxPoints": 100,
        "weeklyPoints": [
            6,
            3,
            3,
            4,
            5,
            3,
            16,
            60
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА140 Міжнародна корпоративного права",
                    "ПРА106 Теорія корпоративного права",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Розробляти масштабовані системи",
                "Працювати з базами даних",
                "Навчитися проектувати архітектуру ПЗ"
            ],
            "outcomes": [
                "Оптимізувати SQL запити",
                "Написати власну програму",
                "Налаштувати CI/CD",
                "Створити веб-застосунок"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 11,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 20,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "12",
                    "total": 12,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "57",
                    "total": 57,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 80.7,
        "passRate60Plus": 100,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 45,
        "lectureHours": 30,
        "practiceHours": 15
    },
    {
        "id": 56,
        "code": "КОМ147",
        "name": "Аналіз штучного інтелекту",
        "instructor": "Проф. Петро Кравченко",
        "instructorTitle": "professor",
        "credits": 2,
        "duration": 9,
        "startWeek": 5,
        "termLength": 16,
        "practicePercentage": 38,
        "enrollmentType": {
            "mandatory": 24,
            "elective": 76
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 31
            },
            {
                "name": "КН",
                "value": 24
            },
            {
                "name": "Інше",
                "value": 45
            }
        ],
        "gradingBreakdown": {
            "exam": 31,
            "project": 27,
            "homework": 42
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "PhD",
        "language": "Англійська",
        "next_term": false,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про штучного інтелекту. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 19
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 3.7,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%20%D0%9A%D1%80%D0%B0%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 30 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-56",
        "maxPoints": 100,
        "weeklyPoints": [
            14,
            2,
            2,
            5,
            4,
            4,
            4,
            16,
            49
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО137 Системний мікроекономіки",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Розробляти масштабовані системи",
                "Опанувати алгоритмічне мислення"
            ],
            "outcomes": [
                "Налаштувати CI/CD",
                "Створити веб-застосунок"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 14,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 27,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "13",
                    "total": 13,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "46",
                    "total": 46,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 75.1,
        "passRate60Plus": 80,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 31,
        "lectureHours": 18,
        "practiceHours": 11
    },
    {
        "id": 57,
        "code": "КОМ148",
        "name": "Теорія алгоритмів",
        "instructor": "Наталія Шевченко",
        "instructorTitle": "expert",
        "credits": 4,
        "duration": 9,
        "startWeek": 2,
        "termLength": 16,
        "practicePercentage": 46,
        "enrollmentType": {
            "mandatory": 84,
            "elective": 16
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 31
            },
            {
                "name": "КН",
                "value": 20
            },
            {
                "name": "Інше",
                "value": 49
            }
        ],
        "gradingBreakdown": {
            "exam": 39,
            "project": 34,
            "homework": 27
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "PhD",
        "language": "Українська",
        "next_term": true,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про алгоритмів. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня PhD.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 8
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9D%D0%B0%D1%82%D0%B0%D0%BB%D1%96%D1%8F%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 13 роками досвіду в індустрії (Комп'ютерні науки).",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-57",
        "maxPoints": 100,
        "weeklyPoints": [
            21,
            3,
            2,
            4,
            2,
            5,
            2,
            21,
            40
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ124 Теорія машинного навчання",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Опанувати алгоритмічне мислення",
                "Навчитися проектувати архітектуру ПЗ",
                "Працювати з базами даних"
            ],
            "outcomes": [
                "Написати власну програму",
                "Налаштувати CI/CD",
                "Оптимізувати SQL запити",
                "Створити веб-застосунок"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 23,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 24,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "17",
                    "total": 17,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "36",
                    "total": 36,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 91.3,
        "passRate60Plus": 100,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 51,
        "lectureHours": 37,
        "practiceHours": 32
    },
    {
        "id": 58,
        "code": "ЕКО149",
        "name": "Методи фінансового менеджменту",
        "instructor": "Проф. Володимир Ковальчук",
        "instructorTitle": "professor",
        "credits": 5,
        "duration": 12,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 61,
        "enrollmentType": {
            "mandatory": 80,
            "elective": 20
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 59
            },
            {
                "name": "КН",
                "value": 25
            },
            {
                "name": "Інше",
                "value": 16
            }
        ],
        "gradingBreakdown": {
            "exam": 38,
            "project": 13,
            "homework": 49
        },
        "semester": "Літо 2027",
        "term": "Літо",
        "level": "Магістр",
        "language": "Українська",
        "next_term": true,
        "category": "core",
        "department": "Економіка",
        "description": "Розширений курс про фінансового менеджменту. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Магістр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 26
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.7,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%20%D0%9A%D0%BE%D0%B2%D0%B0%D0%BB%D1%8C%D1%87%D1%83%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Економіка, автор 22 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-58",
        "maxPoints": 100,
        "weeklyPoints": [
            8,
            2,
            3,
            3,
            5,
            4,
            3,
            13,
            2,
            3,
            4,
            50
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО135 Прикладна фінансового менеджменту",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Зрозуміти базові економічні моделі",
                "Будувати економетричні прогнози",
                "Оцінювати вплив макроекономічних шоків"
            ],
            "outcomes": [
                "Формувати монетарну політику",
                "Будувати регресійні моделі"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 12,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 31,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "10",
                    "total": 10,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "47",
                    "total": 47,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 96.9,
        "passRate60Plus": 82,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 78,
        "lectureHours": 28,
        "practiceHours": 44
    },
    {
        "id": 59,
        "code": "КОМ150",
        "name": "Сучасна алгоритмів",
        "instructor": "Проф. Дмитро Мороз",
        "instructorTitle": "professor",
        "credits": 2,
        "duration": 8,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 33,
        "enrollmentType": {
            "mandatory": 100,
            "elective": 0
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 46
            },
            {
                "name": "КН",
                "value": 31
            },
            {
                "name": "Інше",
                "value": 23
            }
        ],
        "gradingBreakdown": {
            "exam": 40,
            "project": 35,
            "homework": 25
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Бакалавр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Розширений курс про алгоритмів. Спрямований на практичні та теоретичні навички. Рекомендовано для рівня Бакалавр.",
        "prerequisites": [],
        "spots": {
            "total": 40,
            "taken": 16
        },
        "schedule": "Пн, Ср — 12:00-13:20",
        "rating": 4.4,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%BE%20%D0%9C%D0%BE%D1%80%D0%BE%D0%B7&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 42 наукових статей у міжнародних виданнях.",
        "maxPoints": 100,
        "weeklyPoints": [
            17,
            4,
            4,
            5,
            3,
            5,
            17,
            45
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "MATH301 Диференціальні рівняння",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Опанувати алгоритмічне мислення",
                "Працювати з базами даних",
                "Розробляти масштабовані системи"
            ],
            "outcomes": [
                "Оптимізувати SQL запити",
                "Написати власну програму",
                "Створити веб-застосунок",
                "Налаштувати CI/CD"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 16,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 27,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "14",
                    "total": 14,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "43",
                    "total": 43,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 91.3,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 33,
        "lectureHours": 18,
        "practiceHours": 9
    },
    {
        "id": 1,
        "code": "CS401",
        "name": "Штучний інтелект",
        "instructor": "Проф. Марія Ткаченко",
        "instructorTitle": "professor",
        "credits": 6,
        "duration": 11,
        "startWeek": 4,
        "termLength": 16,
        "practicePercentage": 33,
        "enrollmentType": {
            "mandatory": 91,
            "elective": 9
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 58
            },
            {
                "name": "КН",
                "value": 40
            },
            {
                "name": "Інше",
                "value": 2
            }
        ],
        "gradingBreakdown": {
            "exam": 35,
            "project": 25,
            "homework": 40
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Комп'ютерні науки",
        "description": "Вступ до методів ШІ: пошук, оптимізація, машинне навчання, нейронні мережі та обробка природної мови.",
        "prerequisites": [
            "CS201",
            "MATH201"
        ],
        "spots": {
            "total": 40,
            "taken": 32
        },
        "schedule": "Пн, Ср — 10:30-12:00",
        "rating": 4.7,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9C%D0%B0%D1%80%D1%96%D1%8F%20%D0%A2%D0%BA%D0%B0%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 17 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-1",
        "maxPoints": 100,
        "weeklyPoints": [
            6,
            2,
            5,
            3,
            2,
            2,
            5,
            26,
            4,
            5,
            40
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "МЕН114 Кількісні психології ділових відносин",
                    "КОМ146 Стратегічне штучного інтелекту",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Навчитися проектувати архітектуру ПЗ",
                "Розробляти масштабовані системи"
            ],
            "outcomes": [
                "Створити веб-застосунок",
                "Написати власну програму"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 16,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 25,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "22",
                    "total": 22,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "37",
                    "total": 37,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 80.6,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 86,
        "lectureHours": 63,
        "practiceHours": 31
    },
    {
        "id": 2,
        "code": "CS402",
        "name": "Кібербезпека",
        "instructor": "Проф. Василь Шевченко",
        "instructorTitle": "professor",
        "credits": 2,
        "duration": 11,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 61,
        "enrollmentType": {
            "mandatory": 32,
            "elective": 68
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 31
            },
            {
                "name": "КН",
                "value": 25
            },
            {
                "name": "Інше",
                "value": 44
            }
        ],
        "gradingBreakdown": {
            "exam": 54,
            "project": 31,
            "homework": 15
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Бакалавр",
        "language": "Англійська",
        "next_term": false,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Основи захисту інформації: криптографія, мережева безпека, аналіз вразливостей, етичний хакінг.",
        "prerequisites": [
            "CS201"
        ],
        "spots": {
            "total": 35,
            "taken": 28
        },
        "schedule": "Вт, Чт — 13:30-15:00",
        "rating": 4.5,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D1%8C%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 18 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-2",
        "maxPoints": 100,
        "weeklyPoints": [
            14,
            4,
            5,
            3,
            5,
            4,
            5,
            15,
            4,
            2,
            39
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА144 Кількісні інтелектуальної власності",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Працювати з базами даних",
                "Навчитися проектувати архітектуру ПЗ"
            ],
            "outcomes": [
                "Створити веб-застосунок",
                "Оптимізувати SQL запити"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 24,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 29,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "12",
                    "total": 12,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "35",
                    "total": 35,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 83.8,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 27,
        "lectureHours": 13,
        "practiceHours": 20
    },
    {
        "id": 3,
        "code": "ECON401",
        "name": "Теорія ігор",
        "instructor": "Проф. Юлія Гаврилюк",
        "instructorTitle": "professor",
        "credits": 2,
        "duration": 10,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 36,
        "enrollmentType": {
            "mandatory": 81,
            "elective": 19
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 42
            },
            {
                "name": "КН",
                "value": 31
            },
            {
                "name": "Інше",
                "value": 27
            }
        ],
        "gradingBreakdown": {
            "exam": 47,
            "project": 14,
            "homework": 39
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Бакалавр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Економіка",
        "description": "Стратегічна взаємодія, рівновага Неша, аукціони, теорія механізмів та застосування в економіці.",
        "prerequisites": [
            "ECON101",
            "MATH101"
        ],
        "spots": {
            "total": 50,
            "taken": 41
        },
        "schedule": "Пн, Ср — 09:00-10:30",
        "rating": 4.8,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%AE%D0%BB%D1%96%D1%8F%20%D0%93%D0%B0%D0%B2%D1%80%D0%B8%D0%BB%D1%8E%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Економіка, автор 10 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-3",
        "maxPoints": 100,
        "weeklyPoints": [
            13,
            5,
            4,
            4,
            2,
            4,
            4,
            15,
            4,
            45
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ЕКО104 Кількісні макроекономіки",
                    "КОМ115 Теорія криптографії",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Оцінювати вплив макроекономічних шоків",
                "Зрозуміти базові економічні моделі"
            ],
            "outcomes": [
                "Формувати монетарну політику",
                "Розрахувати ВВП та інфляцію"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 11,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 33,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "13",
                    "total": 13,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "43",
                    "total": 43,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 82.7,
        "passRate60Plus": 87,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 27,
        "lectureHours": 21,
        "practiceHours": 12
    },
    {
        "id": 4,
        "code": "CS403",
        "name": "Хмарні обчислення",
        "instructor": "Оксана Власенко",
        "instructorTitle": "lecturer",
        "credits": 6,
        "duration": 8,
        "startWeek": 4,
        "termLength": 16,
        "practicePercentage": 65,
        "enrollmentType": {
            "mandatory": 36,
            "elective": 64
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 55
            },
            {
                "name": "КН",
                "value": 35
            },
            {
                "name": "Інше",
                "value": 10
            }
        ],
        "gradingBreakdown": {
            "exam": 48,
            "project": 24,
            "homework": 28
        },
        "semester": "Осінь 2027",
        "term": "Осінь",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": true,
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "AWS, Azure, Docker, Kubernetes. Проєктування масштабованих хмарних систем та DevOps-практики.",
        "prerequisites": [
            "CS301"
        ],
        "spots": {
            "total": 30,
            "taken": 30
        },
        "schedule": "Вт, Чт — 10:30-12:00",
        "rating": 4.3,
        "teachingFormat": "Flipped Classroom",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9E%D0%BA%D1%81%D0%B0%D0%BD%D0%B0%20%D0%92%D0%BB%D0%B0%D1%81%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 9 роками досвіду в індустрії (Комп'ютерні науки).",
        "maxPoints": 100,
        "weeklyPoints": [
            14,
            2,
            3,
            4,
            3,
            5,
            18,
            51
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "ПРА144 Кількісні інтелектуальної власності",
                    "ECON402 Фінансова економіка",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Розробляти масштабовані системи",
                "Працювати з базами даних"
            ],
            "outcomes": [
                "Оптимізувати SQL запити",
                "Написати власну програму",
                "Налаштувати CI/CD"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 12,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 26,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "16",
                    "total": 16,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "46",
                    "total": 46,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 79.5,
        "passRate60Plus": 98,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 105,
        "lectureHours": 26,
        "practiceHours": 49
    },
    {
        "id": 5,
        "code": "ECON402",
        "name": "Фінансова економіка",
        "instructor": "Тетяна Шевченко",
        "instructorTitle": "expert",
        "credits": 3,
        "duration": 10,
        "startWeek": 3,
        "termLength": 16,
        "practicePercentage": 55,
        "enrollmentType": {
            "mandatory": 80,
            "elective": 20
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 45
            },
            {
                "name": "КН",
                "value": 29
            },
            {
                "name": "Інше",
                "value": 26
            }
        ],
        "gradingBreakdown": {
            "exam": 48,
            "project": 36,
            "homework": 16
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Англійська",
        "next_term": true,
        "category": "core",
        "department": "Економіка",
        "description": "Фінансові ринки, ціноутворення активів, портфельна теорія, деривативи та управління ризиками.",
        "prerequisites": [
            "ECON201",
            "STAT101"
        ],
        "spots": {
            "total": 45,
            "taken": 38
        },
        "schedule": "Пн, Ср — 13:30-15:00",
        "rating": 4.6,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%A2%D0%B5%D1%82%D1%8F%D0%BD%D0%B0%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 6 роками досвіду в індустрії (Економіка).",
        "maxPoints": 100,
        "weeklyPoints": [
            10,
            3,
            5,
            5,
            5,
            2,
            2,
            28,
            2,
            38
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "DATA301 Аналіз даних з Python",
                    "КОМ118 Кількісні криптографії",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс забезпечує фундаментальне розуміння економічних процесів у сучасному світі.",
            "goals": [
                "Оцінювати вплив макроекономічних шоків",
                "Будувати економетричні прогнози"
            ],
            "outcomes": [
                "Розрахувати ВВП та інфляцію",
                "Аналізувати поведінку споживачів",
                "Будувати регресійні моделі",
                "Формувати монетарну політику"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 21,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 20,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "25",
                    "total": 25,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "34",
                    "total": 34,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 81.8,
        "passRate60Plus": 95,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 50,
        "lectureHours": 18,
        "practiceHours": 22
    },
    {
        "id": 6,
        "code": "DATA301",
        "name": "Аналіз даних з Python",
        "instructor": "Проф. Юлія Мельник",
        "instructorTitle": "professor",
        "credits": 2,
        "duration": 9,
        "startWeek": 5,
        "termLength": 16,
        "practicePercentage": 54,
        "enrollmentType": {
            "mandatory": 40,
            "elective": 60
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 49
            },
            {
                "name": "КН",
                "value": 22
            },
            {
                "name": "Інше",
                "value": 29
            }
        ],
        "gradingBreakdown": {
            "exam": 51,
            "project": 34,
            "homework": 15
        },
        "semester": "Весна 2027",
        "category": "elective",
        "department": "Комп'ютерні науки",
        "description": "Pandas, NumPy, Matplotlib, Scikit-learn. Практичний курс аналізу даних та побудови моделей.",
        "prerequisites": [
            "CS101",
            "STAT101"
        ],
        "spots": {
            "total": 35,
            "taken": 20
        },
        "schedule": "Вт, Чт — 15:00-16:30",
        "rating": 4.9,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%AE%D0%BB%D1%96%D1%8F%20%D0%9C%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA&background=random&color=fff&size=128",
        "instructorBio": "Викладач кафедри Комп'ютерні науки, автор 20 наукових статей у міжнародних виданнях.",
        "instructorLinkedIn": "https://linkedin.com/in/instructor-6",
        "maxPoints": 100,
        "weeklyPoints": [
            20,
            2,
            3,
            2,
            3,
            4,
            2,
            28,
            36
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "МІЖ145 Корпоративна політології",
                    "МЕН133 Кібернетична психології ділових відносин",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Курс готує студентів до вирішення складних інженерних задач у сфері розробки програмного забезпечення.",
            "goals": [
                "Працювати з базами даних",
                "Навчитися проектувати архітектуру ПЗ",
                "Опанувати алгоритмічне мислення"
            ],
            "outcomes": [
                "Створити веб-застосунок",
                "Налаштувати CI/CD",
                "Написати власну програму",
                "Оптимізувати SQL запити"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 14,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 27,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "25",
                    "total": 25,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "34",
                    "total": 34,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 90.4,
        "passRate60Plus": 84,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "language": "Англійська",
        "selfStudyHours": 34,
        "lectureHours": 12,
        "practiceHours": 14
    },
    {
        "id": 7,
        "code": "LAW201",
        "name": "Цифрове право та ШІ",
        "instructor": "Василь Шевченко",
        "instructorTitle": "lecturer",
        "credits": 6,
        "duration": 10,
        "startWeek": 1,
        "termLength": 16,
        "practicePercentage": 62,
        "enrollmentType": {
            "mandatory": 13,
            "elective": 87
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 36
            },
            {
                "name": "КН",
                "value": 32
            },
            {
                "name": "Інше",
                "value": 32
            }
        ],
        "gradingBreakdown": {
            "exam": 30,
            "project": 20,
            "homework": 50
        },
        "semester": "Весна 2027",
        "term": "Весна",
        "level": "Магістр",
        "language": "Українська",
        "next_term": false,
        "category": "elective",
        "department": "Право",
        "description": "Регулювання ШІ, захист персональних даних (GDPR), інтелектуальна власність у цифровому середовищі.",
        "prerequisites": [],
        "spots": {
            "total": 60,
            "taken": 15
        },
        "schedule": "Ср — 15:00-18:00",
        "rating": 4.2,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D1%8C%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 11 роками досвіду в індустрії (Право).",
        "maxPoints": 100,
        "weeklyPoints": [
            16,
            4,
            4,
            5,
            2,
            4,
            3,
            25,
            4,
            33
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ119 Методи машинного навчання",
                    "КОМ125 Аналіз криптографії",
                    "Базові навички критичного мислення",
                    "Диплом бакалавра",
                    "Знання англійської мови B2+"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Дисципліна є обов'язковою для формування базових компетенцій сучасного юриста.",
            "goals": [
                "Застосовувати правові норми на практиці",
                "Захищати права клієнтів",
                "Зрозуміти основи правової системи"
            ],
            "outcomes": [
                "Скласти договір",
                "Провести юридичну експертизу",
                "Оформити позовну заяву"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 17,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 29,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "23",
                    "total": 23,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "31",
                    "total": 31,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 77.3,
        "passRate60Plus": 93,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "selfStudyHours": 82,
        "lectureHours": 37,
        "practiceHours": 61
    },
    {
        "id": 8,
        "code": "MATH301",
        "name": "Диференціальні рівняння",
        "instructor": "Петро Шевченко",
        "instructorTitle": "expert",
        "credits": 2,
        "duration": 9,
        "startWeek": 5,
        "termLength": 16,
        "practicePercentage": 55,
        "enrollmentType": {
            "mandatory": 83,
            "elective": 17
        },
        "facultySplit": [
            {
                "name": "Економіка",
                "value": 41
            },
            {
                "name": "КН",
                "value": 39
            },
            {
                "name": "Інше",
                "value": 20
            }
        ],
        "gradingBreakdown": {
            "exam": 54,
            "project": 28,
            "homework": 18
        },
        "semester": "Весна 2027",
        "category": "core",
        "department": "Математика",
        "description": "Звичайні та частинні диференціальні рівняння. Чисельні методи розв'язання та застосування в моделюванні.",
        "prerequisites": [
            "MATH101",
            "MATH201"
        ],
        "spots": {
            "total": 40,
            "taken": 25
        },
        "schedule": "Пн, Чт — 15:00-16:30",
        "rating": 4.1,
        "teachingFormat": "Regular",
        "instructorPhoto": "https://ui-avatars.com/api/?name=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%20%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE&background=random&color=fff&size=128",
        "instructorBio": "Експерт-практик із 15 роками досвіду в індустрії (Математика).",
        "maxPoints": 100,
        "weeklyPoints": [
            20,
            3,
            4,
            3,
            2,
            2,
            5,
            27,
            34
        ],
        "detailedSyllabus": {
            "prerequisites": {
                "mustHave": [
                    "КОМ122 Корпоративна криптографії",
                    "Базові навички критичного мислення",
                    "Шкільна програма"
                ],
                "niceToHave": [
                    "Попередній досвід",
                    "Цікавість до предмету"
                ]
            },
            "justification": "Цей курс розширює світогляд студента та формує необхідні soft-skills.",
            "goals": [
                "Розуміти базові концепції дисципліни",
                "Розвинути критичне мислення",
                "Навчитися працювати з даними"
            ],
            "outcomes": [
                "Застосовувати отримані знання",
                "Аналізувати інформацію",
                "Підготувати дослідницький проєкт"
            ],
            "gradingTable": [
                {
                    "type": "Активність на семінарах",
                    "details": "Участь у дискусіях",
                    "perItem": "1-2 бали",
                    "total": 18,
                    "deadline": "Щотижня"
                },
                {
                    "type": "Домашні завдання",
                    "details": "Практичні кейси",
                    "perItem": "5-10 балів",
                    "total": 27,
                    "deadline": "Раз на 2 тижні"
                },
                {
                    "type": "Курсовий проєкт",
                    "details": "Командна робота",
                    "perItem": "23",
                    "total": 23,
                    "deadline": "Тиждень 8"
                },
                {
                    "type": "Фінальний іспит",
                    "details": "Письмовий тест",
                    "perItem": "32",
                    "total": 32,
                    "deadline": "Останній тиждень"
                }
            ]
        },
        "historicalAverage": 96.2,
        "passRate60Plus": 84,
        "studentTypes": [
            "1-й рік Бізнес-економіки",
            "1-й рік Аналітики"
        ],
        "syllabusUrl": "/syllabus-dummy.pdf",
        "language": "Українська",
        "selfStudyHours": 31,
        "lectureHours": 13,
        "practiceHours": 16
    }
];

export const mockUsers = [
    { id: 101, nickname: 'dmytro_kh', first_name: 'Дмитро', last_name: 'Хоменко', major: 'Комп\'ютерні науки', current_year: 3, avatarColor: '#2563EB' },
    { id: 102, nickname: 'anna_shev', first_name: "Демьян", last_name: 'Батенко ', major: 'Економіка', current_year: 2, avatarColor: '#DC2626' },
    { id: 103, nickname: 'max_bondar', first_name: 'Серафим', last_name: 'Вайбкодовіч', major: 'Право', current_year: 4, avatarColor: '#059669' },
    { id: 104, nickname: 'sofia_tk', first_name: 'Софія', last_name: 'Ткаченко', major: 'Програмна інженерія', current_year: 2, avatarColor: '#7C3AED' },
    { id: 105, nickname: 'artem_lit', first_name: 'Артем', last_name: 'Литвиненко', major: 'Комп\'ютерні науки', current_year: 3, avatarColor: '#D97706' },
    { id: 106, nickname: 'olga_mel', first_name: 'Ольга', last_name: 'Мельник', major: 'Фінанси', current_year: 2, avatarColor: '#DB2777' },
];

// Active course enrollments per student (userId → courseId[])
export const mockEnrollments = {
    1:   [10, 12, 15, 21],      // mockUser (Олена Коваленко)
    101: [11, 16, 23, 30],      // Дмитро Хоменко
    102: [13, 20, 28, 35],      // Демьян Батенко
    103: [14, 18, 25, 32],      // Серафим Вайбкодовіч
    104: [10, 17, 22, 34],      // Софія Ткаченко
    105: [12, 19, 26, 33],      // Артем Литвиненко
    106: [15, 24, 29, 36],      // Ольга Мельник
};

// Mock comments for elective courses (courseId → comments[])
export const mockComments = {
    2: [ // CS402 — Кібербезпека
        { id: 1, userId: 101, text: 'Хтось вже проходив цей курс? Чи багато практики?', timestamp: '2027-01-10T14:20:00Z' },
        { id: 2, userId: 104, text: 'Так! Дуже крутий курс, є хакатони і CTF-змагання 🔥', timestamp: '2027-01-10T15:05:00Z' },
        { id: 3, userId: 102, text: 'А без досвіду в Linux можна йти?', timestamp: '2027-01-11T09:30:00Z' },
        { id: 4, userId: 105, text: 'Можна, але краще підтягнути базу — перші тижні будуть інтенсивні', timestamp: '2027-01-11T10:15:00Z' },
    ],
    4: [ // CS403 — Хмарні обчислення
        { id: 5, userId: 105, text: 'Місць вже немає 😭 може хтось знає чи буде додатковий набір?', timestamp: '2027-01-12T11:00:00Z' },
        { id: 6, userId: 101, text: 'Зазвичай після першого тижня хтось відпадає, спробуй прийти на першу лекцію', timestamp: '2027-01-12T11:45:00Z' },
        { id: 7, userId: 103, text: 'Підтверджую, минулого року так само було — потім місця з\'явились', timestamp: '2027-01-12T12:30:00Z' },
    ],
    6: [ // DATA301 — Аналіз даних з Python
        { id: 8, userId: 102, text: 'Найкращий курс за всю програму! Козлова — топ викладач 🐍', timestamp: '2027-01-08T16:00:00Z' },
        { id: 9, userId: 106, text: 'Погоджуюсь! Після цього курсу вже отримала стажування в аналітиці', timestamp: '2027-01-08T17:20:00Z' },
        { id: 10, userId: 104, text: 'А який рівень Python потрібен? Я тільки основи знаю', timestamp: '2027-01-09T08:45:00Z' },
        { id: 11, userId: 101, text: 'Основ вистачить, перші 3 тижні — повторення синтаксису + pandas', timestamp: '2027-01-09T09:30:00Z' },
        { id: 12, userId: 105, text: 'Домашки об\'ємні, але реально цікаві — аналіз реальних датасетів', timestamp: '2027-01-09T10:00:00Z' },
    ],
    7: [ // LAW201 — Цифрове право та ШІ
        { id: 13, userId: 103, text: 'Рекомендую всім! Ткаченко пояснює складне право простою мовою', timestamp: '2027-01-15T13:00:00Z' },
        { id: 14, userId: 106, text: 'Дуже актуальна тема з GDPR, корисно для будь-якої спеціальності', timestamp: '2027-01-15T14:30:00Z' },
    ],
};

// Mock reviews for courses (auto-generated for all courses)
export const mockReviews = {
    10: [
        {
            id: 100,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2026-07-01T18:00:00Z',
            likes: 0,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
        {
            id: 101,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2026-07-04T13:17:00Z',
            likes: 3,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
    ],
    11: [
        {
            id: 102,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2026-08-08T18:00:00Z',
            likes: 1,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
        {
            id: 103,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2026-08-11T13:17:00Z',
            likes: 4,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
        {
            id: 104,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2026-08-14T20:34:00Z',
            likes: 7,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
    ],
    12: [
        {
            id: 105,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2026-09-15T18:00:00Z',
            likes: 2,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
    ],
    13: [
        {
            id: 106,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2026-10-22T18:00:00Z',
            likes: 3,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
        {
            id: 107,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2026-10-25T13:17:00Z',
            likes: 6,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
    ],
    14: [
        {
            id: 108,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2026-11-02T18:00:00Z',
            likes: 4,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
        {
            id: 109,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2026-11-05T13:17:00Z',
            likes: 7,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
        {
            id: 110,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2026-11-08T20:34:00Z',
            likes: 10,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
    ],
    15: [
        {
            id: 111,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2026-12-09T18:00:00Z',
            likes: 5,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
    ],
    16: [
        {
            id: 112,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2026-07-16T18:00:00Z',
            likes: 6,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
        {
            id: 113,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2026-07-19T13:17:00Z',
            likes: 9,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
    ],
    17: [
        {
            id: 114,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2026-08-23T18:00:00Z',
            likes: 7,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
        {
            id: 115,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2026-08-26T13:17:00Z',
            likes: 10,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
        {
            id: 116,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2026-08-02T20:34:00Z',
            likes: 13,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
    ],
    18: [
        {
            id: 117,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2026-09-03T18:00:00Z',
            likes: 8,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
    ],
    19: [
        {
            id: 118,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2026-10-10T18:00:00Z',
            likes: 9,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
        {
            id: 119,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2026-10-13T13:17:00Z',
            likes: 12,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
    ],
    20: [
        {
            id: 120,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2026-11-17T18:00:00Z',
            likes: 10,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
        {
            id: 121,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2026-11-20T13:17:00Z',
            likes: 13,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
        {
            id: 122,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2026-11-23T20:34:00Z',
            likes: 16,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
    ],
    21: [
        {
            id: 123,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2026-12-24T18:00:00Z',
            likes: 11,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
    ],
    22: [
        {
            id: 124,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2026-07-04T18:00:00Z',
            likes: 12,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
        {
            id: 125,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2026-07-07T13:17:00Z',
            likes: 15,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
    ],
    23: [
        {
            id: 126,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2026-08-11T18:00:00Z',
            likes: 13,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
        {
            id: 127,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2026-08-14T13:17:00Z',
            likes: 16,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
        {
            id: 128,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2026-08-17T20:34:00Z',
            likes: 1,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
    ],
    24: [
        {
            id: 129,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2026-09-18T18:00:00Z',
            likes: 14,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
    ],
    25: [
        {
            id: 130,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2026-10-25T18:00:00Z',
            likes: 15,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
        {
            id: 131,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2026-10-01T13:17:00Z',
            likes: 0,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
    ],
    26: [
        {
            id: 132,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2026-11-05T18:00:00Z',
            likes: 16,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
        {
            id: 133,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2026-11-08T13:17:00Z',
            likes: 1,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
        {
            id: 134,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2026-11-11T20:34:00Z',
            likes: 4,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
    ],
    27: [
        {
            id: 135,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2026-12-12T18:00:00Z',
            likes: 17,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
    ],
    28: [
        {
            id: 136,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2026-07-19T18:00:00Z',
            likes: 0,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
        {
            id: 137,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2026-07-22T13:17:00Z',
            likes: 3,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
    ],
    29: [
        {
            id: 138,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2026-08-26T18:00:00Z',
            likes: 1,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
        {
            id: 139,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2026-08-02T13:17:00Z',
            likes: 4,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
        {
            id: 140,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2026-08-05T20:34:00Z',
            likes: 7,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
    ],
    30: [
        {
            id: 141,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2026-09-06T18:00:00Z',
            likes: 2,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
    ],
    31: [
        {
            id: 142,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2026-10-13T18:00:00Z',
            likes: 3,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
        {
            id: 143,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2026-10-16T13:17:00Z',
            likes: 6,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
    ],
    32: [
        {
            id: 144,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2026-11-20T18:00:00Z',
            likes: 4,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
        {
            id: 145,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2026-11-23T13:17:00Z',
            likes: 7,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
        {
            id: 146,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2026-11-26T20:34:00Z',
            likes: 10,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
    ],
    33: [
        {
            id: 147,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2026-12-27T18:00:00Z',
            likes: 5,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
    ],
    34: [
        {
            id: 148,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2026-07-07T18:00:00Z',
            likes: 6,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
        {
            id: 149,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2026-07-10T13:17:00Z',
            likes: 9,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
    ],
    35: [
        {
            id: 150,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2026-08-14T18:00:00Z',
            likes: 7,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
        {
            id: 151,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2026-08-17T13:17:00Z',
            likes: 10,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
        {
            id: 152,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2026-08-20T20:34:00Z',
            likes: 13,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
    ],
    36: [
        {
            id: 153,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2026-09-21T18:00:00Z',
            likes: 8,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
    ],
    37: [
        {
            id: 154,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2026-10-01T18:00:00Z',
            likes: 9,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
        {
            id: 155,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2026-10-04T13:17:00Z',
            likes: 12,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
    ],
    38: [
        {
            id: 156,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2026-11-08T18:00:00Z',
            likes: 10,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
        {
            id: 157,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2026-11-11T13:17:00Z',
            likes: 13,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
        {
            id: 158,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2026-11-14T20:34:00Z',
            likes: 16,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
    ],
    39: [
        {
            id: 159,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2026-12-15T18:00:00Z',
            likes: 11,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
    ],
    40: [
        {
            id: 160,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2027-07-22T18:00:00Z',
            likes: 12,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
        {
            id: 161,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2027-07-25T13:17:00Z',
            likes: 15,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
    ],
    41: [
        {
            id: 162,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2027-08-02T18:00:00Z',
            likes: 13,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
        {
            id: 163,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2027-08-05T13:17:00Z',
            likes: 16,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
        {
            id: 164,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2027-08-08T20:34:00Z',
            likes: 1,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
    ],
    42: [
        {
            id: 165,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2027-09-09T18:00:00Z',
            likes: 14,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
    ],
    43: [
        {
            id: 166,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2027-10-16T18:00:00Z',
            likes: 15,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
        {
            id: 167,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2027-10-19T13:17:00Z',
            likes: 0,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
    ],
    44: [
        {
            id: 168,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2027-11-23T18:00:00Z',
            likes: 16,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
        {
            id: 169,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2027-11-26T13:17:00Z',
            likes: 1,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
        {
            id: 170,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2027-11-02T20:34:00Z',
            likes: 4,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
    ],
    45: [
        {
            id: 171,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2027-12-03T18:00:00Z',
            likes: 17,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
    ],
    46: [
        {
            id: 172,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2027-07-10T18:00:00Z',
            likes: 0,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
        {
            id: 173,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2027-07-13T13:17:00Z',
            likes: 3,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
    ],
    47: [
        {
            id: 174,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2027-08-17T18:00:00Z',
            likes: 1,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
        {
            id: 175,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2027-08-20T13:17:00Z',
            likes: 4,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
        {
            id: 176,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2027-08-23T20:34:00Z',
            likes: 7,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
    ],
    48: [
        {
            id: 177,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2027-09-24T18:00:00Z',
            likes: 2,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
    ],
    49: [
        {
            id: 178,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2027-10-04T18:00:00Z',
            likes: 3,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
        {
            id: 179,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2027-10-07T13:17:00Z',
            likes: 6,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
    ],
    50: [
        {
            id: 180,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2027-11-11T18:00:00Z',
            likes: 4,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
        {
            id: 181,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2027-11-14T13:17:00Z',
            likes: 7,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
        {
            id: 182,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2027-11-17T20:34:00Z',
            likes: 10,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
    ],
    51: [
        {
            id: 183,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2027-12-18T18:00:00Z',
            likes: 5,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
    ],
    52: [
        {
            id: 184,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2027-07-25T18:00:00Z',
            likes: 6,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
        {
            id: 185,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2027-07-01T13:17:00Z',
            likes: 9,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
    ],
    53: [
        {
            id: 186,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2027-08-05T18:00:00Z',
            likes: 7,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
        {
            id: 187,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2027-08-08T13:17:00Z',
            likes: 10,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
        {
            id: 188,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2027-08-11T20:34:00Z',
            likes: 13,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
    ],
    54: [
        {
            id: 189,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2027-09-12T18:00:00Z',
            likes: 8,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
    ],
    55: [
        {
            id: 190,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2027-10-19T18:00:00Z',
            likes: 9,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
        {
            id: 191,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2027-10-22T13:17:00Z',
            likes: 12,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
    ],
    56: [
        {
            id: 192,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2027-11-26T18:00:00Z',
            likes: 10,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
        {
            id: 193,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2027-11-02T13:17:00Z',
            likes: 13,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
        {
            id: 194,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2027-11-05T20:34:00Z',
            likes: 16,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
    ],
    57: [
        {
            id: 195,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2027-12-06T18:00:00Z',
            likes: 11,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
    ],
    58: [
        {
            id: 196,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2027-07-13T18:00:00Z',
            likes: 12,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Відкрите спілкування з викладачем — відповідав на всі запитання.' },
                { q: 'Наскільки велике навантаження?', a: 'Збалансоване — поєднує самостійну роботу і аудиторні заняття.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Однозначно так! Один з кращих курсів програми.' },
            ]
        },
        {
            id: 197,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2027-07-16T13:17:00Z',
            likes: 15,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
    ],
    59: [
        {
            id: 198,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2027-08-20T18:00:00Z',
            likes: 13,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
        {
            id: 199,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2027-08-23T13:17:00Z',
            likes: 16,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
        {
            id: 200,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2027-08-26T20:34:00Z',
            likes: 1,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
    ],
    60: [
        {
            id: 201,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2027-09-27T18:00:00Z',
            likes: 14,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Практичні кейси з індустрії та розбір реальних ситуацій.' },
                { q: 'Наскільки велике навантаження?', a: 'Доволі інтенсивне, особливо в кінці семестру.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але готуйтесь до активної роботи.' },
            ]
        },
    ],
    61: [
        {
            id: 202,
            authorId: 102,
            isAnonymous: false,
            grade: 'A-',
            gpa: 87,
            date: '2027-10-07T18:00:00Z',
            likes: 15,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Гостьові лектори та їхній практичний досвід.' },
                { q: 'Наскільки велике навантаження?', a: 'Навантаження велике, але всі завдання цікаві.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Обов\'язково — особливо для тих, хто хоче піти в цю сферу.' },
            ]
        },
        {
            id: 203,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2027-10-10T13:17:00Z',
            likes: 0,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
    ],
    62: [
        {
            id: 204,
            authorId: 105,
            isAnonymous: false,
            grade: 'B+',
            gpa: 78,
            date: '2027-11-14T18:00:00Z',
            likes: 16,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Командний проект — навчились ефективно розподіляти ролі.' },
                { q: 'Наскільки велике навантаження?', a: 'У першій половині легко, далі темп зростає.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, але попередньо підтягніть теорію.' },
            ]
        },
        {
            id: 205,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2027-11-17T13:17:00Z',
            likes: 1,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
        {
            id: 206,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2027-11-20T20:34:00Z',
            likes: 4,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
    ],
    63: [
        {
            id: 207,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2027-12-21T18:00:00Z',
            likes: 17,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Інтерактивні дискусії та дебати на семінарах.' },
                { q: 'Наскільки велике навантаження?', a: 'Нормальне для рівня магістра.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую всім незалежно від спеціалізації.' },
            ]
        },
    ],
    64: [
        {
            id: 208,
            authorId: 103,
            isAnonymous: false,
            grade: 'B+',
            gpa: 83,
            date: '2027-07-01T18:00:00Z',
            likes: 0,
            dislikes: 2,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Детальний аналіз кейсів і можливість застосувати теорію.' },
                { q: 'Наскільки велике навантаження?', a: 'Є щотижневі завдання, але все реально встигнути.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так, якщо вас цікавить практичне застосування знань.' },
            ]
        },
        {
            id: 209,
            authorId: 104,
            isAnonymous: false,
            grade: 'A',
            gpa: 95,
            date: '2027-07-04T13:17:00Z',
            likes: 3,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
    ],
    65: [
        {
            id: 210,
            authorId: 106,
            isAnonymous: false,
            grade: 'A-',
            gpa: 85,
            date: '2027-08-08T18:00:00Z',
            likes: 1,
            dislikes: 3,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Чітка структура курсу та зрозумілі критерії оцінювання.' },
                { q: 'Наскільки велике навантаження?', a: 'Важкувато, але результат того вартий.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Частково — залежить від ваших цілей.' },
            ]
        },
        {
            id: 211,
            authorId: null,
            isAnonymous: true,
            grade: 'A',
            gpa: 90,
            date: '2027-08-11T13:17:00Z',
            likes: 4,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Нестандартні завдання, що вимагали творчого мислення.' },
                { q: 'Наскільки велике навантаження?', a: 'Значна кількість читань, але дуже пізнавальних.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Так! Після цього курсу отримав оффер на стажування.' },
            ]
        },
        {
            id: 212,
            authorId: null,
            isAnonymous: true,
            grade: 'B+',
            gpa: 76,
            date: '2027-08-14T20:34:00Z',
            likes: 7,
            dislikes: 1,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Актуальна тематика, пов\'язана з реальними трендами ринку.' },
                { q: 'Наскільки велике навантаження?', a: 'Помірне — якщо розподіляти час рівномірно.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Рекомендую — дає гарну базу для подальшого розвитку.' },
            ]
        },
    ],
    66: [
        {
            id: 213,
            authorId: 101,
            isAnonymous: false,
            grade: 'A',
            gpa: 91,
            date: '2027-09-15T18:00:00Z',
            likes: 2,
            dislikes: 0,
            questions: [
                { q: 'Що було найцікавішим у курсі?', a: 'Міждисциплінарний підхід — поєднання теорії і практики.' },
                { q: 'Наскільки велике навантаження?', a: 'Невелике відносно інших курсів програми.' },
                { q: 'Чи рекомендуєте ви цей курс?', a: 'Дуже рекомендую, викладач — справжній професіонал.' },
            ]
        },
    ],
};
