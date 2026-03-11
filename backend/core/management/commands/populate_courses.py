from django.core.management.base import BaseCommand
from core.models import Course


COURSES = [
    {
        'code': 'CS101',
        'title': 'Вступ до програмування',
        'description': 'Основи програмування на Python: змінні, цикли, функції, ООП.',
        'ects_credits': 6,
        'trimester': 'Осінь 2026',
        'instructor': 'Проф. Мельник В.І.',
        'department': 'Комп\'ютерні науки',
        'prerequisites': '',
    },
    {
        'code': 'CS201',
        'title': 'Структури даних та алгоритми',
        'description': 'Масиви, списки, дерева, графи. Складність алгоритмів та методи оптимізації.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Коваленко О.М.',
        'department': 'Комп\'ютерні науки',
        'prerequisites': 'CS101',
    },
    {
        'code': 'CS301',
        'title': 'Машинне навчання',
        'description': 'Регресія, класифікація, нейронні мережі, глибоке навчання та практичні проєкти.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Сидоренко Т.Д.',
        'department': 'Комп\'ютерні науки',
        'prerequisites': 'CS201',
    },
    {
        'code': 'CS401',
        'title': 'Просунуте машинне навчання',
        'description': 'Deep learning, трансформери, генеративні моделі та їх застосування.',
        'ects_credits': 6,
        'trimester': 'Осінь 2027',
        'instructor': 'Проф. AI',
        'department': 'Комп\'ютерні науки',
        'prerequisites': 'CS301',
    },
    {
        'code': 'CS403',
        'title': 'Хмарні обчислення',
        'description': 'AWS, Azure, Docker, Kubernetes. Проєктування масштабованих хмарних систем та DevOps-практики.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Бондаренко А.С.',
        'department': 'Комп\'ютерні науки',
        'prerequisites': 'CS301',
    },
    {
        'code': 'ECON101',
        'title': 'Мікроекономіка',
        'description': 'Попит та пропозиція, ринкова рівновага, споживчий вибір, теорія фірми.',
        'ects_credits': 6,
        'trimester': 'Осінь 2026',
        'instructor': 'Проф. Григоренко М.П.',
        'department': 'Економіка',
        'prerequisites': '',
    },
    {
        'code': 'ECON201',
        'title': 'Макроекономіка',
        'description': 'ВВП, інфляція, безробіття, монетарна та фіскальна політика.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Петренко Л.К.',
        'department': 'Економіка',
        'prerequisites': 'ECON101',
    },
    {
        'code': 'ECON401',
        'title': 'Теорія ігор',
        'description': 'Стратегічна взаємодія, рівновага Неша, аукціони, теорія механізмів та застосування в економіці.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Литвиненко К.П.',
        'department': 'Економіка',
        'prerequisites': 'ECON101, MATH101',
    },
    {
        'code': 'ECON402',
        'title': 'Фінансова економіка',
        'description': 'Фінансові ринки, ціноутворення активів, портфельна теорія, деривативи та управління ризиками.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Шевченко Д.О.',
        'department': 'Економіка',
        'prerequisites': 'ECON201, STAT101',
    },
    {
        'code': 'MATH101',
        'title': 'Лінійна алгебра',
        'description': 'Матриці, вектори, лінійні перетворення, власні значення.',
        'ects_credits': 6,
        'trimester': 'Осінь 2026',
        'instructor': 'Проф. Іваненко Г.М.',
        'department': 'Математика',
        'prerequisites': '',
    },
    {
        'code': 'MATH201',
        'title': 'Математичний аналіз',
        'description': 'Границі, похідні, інтеграли, ряди. Теореми та застосування.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Іваненко Г.М.',
        'department': 'Математика',
        'prerequisites': 'MATH101',
    },
    {
        'code': 'MATH301',
        'title': 'Диференціальні рівняння',
        'description': 'Звичайні та частинні диференціальні рівняння. Чисельні методи розв\'язання та застосування в моделюванні.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Іваненко Г.М.',
        'department': 'Математика',
        'prerequisites': 'MATH101, MATH201',
    },
    {
        'code': 'STAT101',
        'title': 'Теорія ймовірностей та статистика',
        'description': 'Розподіли, гіпотези, регресійний аналіз, байєсівська статистика.',
        'ects_credits': 6,
        'trimester': 'Осінь 2026',
        'instructor': 'Проф. Козлова І.В.',
        'department': 'Математика',
        'prerequisites': 'MATH101',
    },
    {
        'code': 'DATA301',
        'title': 'Аналіз даних з Python',
        'description': 'Pandas, NumPy, Matplotlib, Scikit-learn. Практичний курс аналізу даних та побудови моделей.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Козлова І.В.',
        'department': 'Комп\'ютерні науки',
        'prerequisites': 'CS101, STAT101',
    },
    {
        'code': 'LAW201',
        'title': 'Цифрове право та ШІ',
        'description': 'Регулювання ШІ, захист персональних даних (GDPR), інтелектуальна власність у цифровому середовищі.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Ткаченко Н.Р.',
        'department': 'Право',
        'prerequisites': '',
    },
    {
        'code': 'PHIL101',
        'title': 'Філософія технологій',
        'description': 'Етика ШІ, філософія свідомості, вплив технологій на суспільство, трансгуманізм.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Дмитренко В.С.',
        'department': 'Гуманітарні науки',
        'prerequisites': '',
    },
    {
        'code': 'HIST201',
        'title': 'Історія економічної думки',
        'description': 'Від Адама Сміта до сучасності: класична, кейнсіанська, монетаристська школи.',
        'ects_credits': 6,
        'trimester': 'Осінь 2027',
        'instructor': 'Проф. Зеленський О.П.',
        'department': 'Гуманітарні науки',
        'prerequisites': '',
    },
    {
        'code': 'SOC301',
        'title': 'Соціологія цифрового суспільства',
        'description': 'Соціальні мережі, цифрова нерівність, онлайн-спільноти, вплив технологій на комунікацію.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Кравченко А.М.',
        'department': 'Гуманітарні науки',
        'prerequisites': '',
    },
    {
        'code': 'ENG201',
        'title': 'Академічне письмо англійською',
        'description': 'Структура академічних текстів, аргументація, цитування, підготовка до публікацій.',
        'ects_credits': 3,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Браун Дж.',
        'department': 'Гуманітарні науки',
        'prerequisites': '',
    },
    {
        'code': 'MGMT301',
        'title': 'Управління проєктами',
        'description': 'Agile, Scrum, Kanban. Планування, бюджетування та управління командою.',
        'ects_credits': 6,
        'trimester': 'Весна 2027',
        'instructor': 'Проф. Романенко Д.І.',
        'department': 'Менеджмент',
        'prerequisites': '',
    },
]


class Command(BaseCommand):
    help = 'Populate the course catalog with sample KSE courses'

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0
        for course_data in COURSES:
            code = course_data.pop('code')
            department = course_data.pop('department', '')
            obj, created = Course.objects.update_or_create(
                code=code,
                defaults=course_data,
            )
            if created:
                created_count += 1
            else:
                updated_count += 1
        self.stdout.write(self.style.SUCCESS(
            f'Done! Created {created_count} courses, updated {updated_count} courses. '
            f'Total: {Course.objects.count()} courses in DB.'
        ))
