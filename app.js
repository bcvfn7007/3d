/* ==========================================================================
   Stanford School — Premium Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* --------------------------------------------------------------------------
     1. Dictionary & Translation Manager
     -------------------------------------------------------------------------- */
  const translations = {
    ru: {
      "cursor.view": "ОТКРЫТЬ",
      "logo.subtitle": "ШКОЛА",
      "nav.courses": "Курсы",
      "nav.results": "Результаты",
      "nav.teachers": "Преподаватели",
      "nav.certificates": "Сертификаты",
      "nav.cta": "Записаться",
      "hero.eyebrow": "BETTER FUTURE STARTS HERE",
      "hero.title_part1": "Раскрой",
      "hero.title_part2": "Свой",
      "hero.title_part3": "Английский",
      "hero.subtitle_text": "Премиальный языковой центр в Ташкенте. Мы не продаём уроки — мы гарантируем результат в виде сданных экзаменов и свободного общения.",
      "hero.cta": "Начать обучение",
      "stats.ielts": "Средний балл IELTS выпускников",
      "stats.group": "Максимум студентов в группе",
      "stats.native_num": "100%",
      "stats.native": "Опытные преподаватели с IELTS 8.5+",
      "courses.title": "Наши Курсы",
      "courses.duration": "Длительность:",
      "courses.intensity": "Интенсивность:",
      "courses.apply": "Записаться",
      "courses.ielts.title": "Интенсив IELTS",
      "courses.ielts.desc": "Полное погружение в формат экзамена. Стратегии для каждой секции, пробные тесты каждую неделю и обратная связь от экспертов.",
      "courses.ielts.duration_val": "3-6 месяцев",
      "courses.ielts.intensity_val": "3 раза в неделю по 2 часа",
      "courses.general.title": "General English",
      "courses.general.desc": "Развитие разговорной речи, грамматики и словарного запаса. Преодоление языкового барьера по уникальной методике.",
      "courses.general.duration_val": "4 месяца на уровень",
      "courses.general.intensity_val": "3 раза в неделю по 1.5 часа",
      "courses.speaking.title": "Разговорный клуб",
      "courses.speaking.desc": "Практика общения на актуальные темы с носителями языка и приглашенными гостями. Никаких учебников, только живой язык.",
      "courses.speaking.duration_val": "Постоянно",
      "courses.speaking.intensity_val": "Каждую субботу по 2 часа",
      "courses.kids.title": "Английский для детей",
      "courses.kids.desc": "Интерактивные занятия в игровой форме для детей от 7 до 12 лет. Учим любить английский с первых шагов.",
      "courses.kids.duration_val": "Учебный год",
      "courses.kids.intensity_val": "2 раза в неделю по 1.5 часа",
      "courses.business.title": "Business English",
      "courses.business.desc": "Деловая переписка, подготовка к презентациям и переговорам, специфическая лексика. Для специалистов и топ-менеджеров.",
      "courses.business.duration_val": "3 месяца",
      "courses.business.intensity_val": "3 раза в неделю по 1.5 часа",
      "courses.individual.title": "Индивидуальные занятия",
      "courses.individual.desc": "Персональная программа, адаптированная под ваши конкретные цели и график. Максимальное внимание преподавателя.",
      "courses.individual.duration_val": "Гибко",
      "courses.individual.intensity_val": "Индивидуальный график",
      "results.title": "Результаты учеников",
      "results.student1.name": "Азиз Каримов",
      "results.student1.feedback": "\"Благодаря Stanford School поднял балл с 5.5 до 7.5 за 4 месяца! Очень крутой формат тестов по субботам, сразу понимаешь свои слабые зоны.\"",
      "results.student2.name": "Нигора Усманова",
      "results.student2.feedback": "\"Моя цель была поступить в зарубежный вуз. Результат превзошел все ожидания — 8.5! Преподаватели очень требовательные, но это того стоило.\"",
      "results.before": "Было:",
      "results.after": "Стало:",
      "teachers.title": "Наша Команда",
      "teachers.t1.alt": "Образец аватара: Дилшод Исмоилов (Старший методист)",
      "teachers.t2.alt": "Образец аватара: Анна Новикова (Преподаватель)",
      "teachers.t3.alt": "Образец аватара: Сардор Каримов (Преподаватель)",
      "teachers.t1.name": "Дилшод Исмоилов",
      "teachers.t1.role": "Старший методист, IELTS 8.5",
      "teachers.t1.bio": "Опыт преподавания — 10 лет. Специализируется на подготовке к Speaking и Writing частям IELTS. Выпускник Вестминстерского университета.",
      "teachers.t2.name": "Анна Новикова",
      "teachers.t2.role": "Преподаватель General English, IELTS 8.5",
      "teachers.t2.bio": "Обучалась в Великобритании. Создает интерактивные уроки, помогающие студентам заговорить на английском с первого занятия.",
      "teachers.t3.name": "Сардор Каримов",
      "teachers.t3.role": "Куратор разговорных клубов, носитель языка",
      "teachers.t3.bio": "Прожил 12 лет в США. Специализируется на американском произношении, современном сленге и проведении дебатов.",
      "certificates.title": "Сертификаты школы",
      "certificates.subtitle": "(Все представленные документы являются интерактивными демонстрационными образцами)",
      "certificates.c1.aria": "Открыть образец сертификата IELTS 8.5 Бехзода Алиева",
      "certificates.c1.alt": "Образец сертификата IELTS 8.5 Бехзода Алиева",
      "certificates.c1.student": "Бехзод Алиев",
      "certificates.c1.type": "IELTS Academic (Образец)",
      "certificates.c2.aria": "Открыть образец сертификата IELTS 7.5 Шерзода Турсунова",
      "certificates.c2.alt": "Образец сертификата IELTS 7.5 Шерзода Турсунова",
      "certificates.c2.student": "Шерзод Турсунов",
      "certificates.c2.type": "IELTS Academic (Образец)",
      "certificates.c3.aria": "Открыть образец сертификата об окончании уровня C1 Мадины Саидовой",
      "certificates.c3.alt": "Образец сертификата об окончании уровня C1 Мадины Саидовой",
      "certificates.c3.student": "Мадина Саидова",
      "certificates.c3.type": "Курс General English C1 (Образец)",
      "form.heading": "Запишись на бесплатный урок",
      "form.subheading": "Пройди тестирование, получи персональный план подготовки и бесплатную консультацию методиста по IELTS.",
      "form.name_label": "Ваше имя",
      "form.name_placeholder": "Ваше имя",
      "form.phone_label": "Номер телефона",
      "form.phone_placeholder": "+998 __ ___ __ __",
      "form.course_label": "Выберите курс",
      "form.course_placeholder": "Выберите курс",
      "form.opt_ielts": "Интенсив IELTS",
      "form.opt_general": "General English",
      "form.opt_speaking": "Разговорный клуб",
      "form.opt_kids": "Английский для детей",
      "form.opt_business": "Business English",
      "form.opt_individual": "Индивидуальные занятия",
      "form.submit": "Оставить заявку",
      "form.success_title": "Заявка принята!",
      "form.success_desc": "Наш менеджер свяжется с вами в течение 15 минут для подтверждения записи.",
      "form.close": "Закрыть",
      "form.err_name": "Имя должно содержать не менее 2 букв",
      "form.err_phone": "Введите корректный номер телефона",
      "form.err_course": "Пожалуйста, выберите курс",
      "footer.sections": "Разделы",
      "footer.contacts": "Контакты",
      "footer.address": "Узбекистан, г. Ташкент, Мирабадский р-н, ул. Амира Темура, 42",
      "footer.copyright": "© 2026 Stanford School. Все права защищены. Лицензия Узб №409-12.",
      "footer.developer": "Разработано по стандартам",
      "lightbox.sr_title": "Образец сертификата во весь экран",
      "lightbox.close_aria": "Закрыть во весь экран"
    },
    uz: {
      "cursor.view": "OCHISH",
      "logo.subtitle": "MAKTABI",
      "nav.courses": "Kurslar",
      "nav.results": "Natijalar",
      "nav.teachers": "O'qituvchilar",
      "nav.certificates": "Sertifikatlar",
      "nav.cta": "Yozilish",
      "hero.eyebrow": "YAXSHI KELAJAK SHU YERDAN BOSHLANADI",
      "hero.title_part1": "Ingliz",
      "hero.title_part2": "tilingizni",
      "hero.title_part3": "kashf qiling",
      "hero.subtitle_text": "Toshkentdagi nufuzli til markazi. Biz darslarni sotmaymiz — imtihonlarni topshirish va erkin muloqot qilish ko'rinishidagi natijani kafolatlaymiz.",
      "hero.cta": "O'qishni boshlash",
      "stats.ielts": "Bitiruvchilarning o'rtacha IELTS balli",
      "stats.group": "Guruhdagi maksimal talabalar",
      "stats.native_num": "100%",
      "stats.native": "IELTS 8.5+ ballga ega tajribali o'qituvchilar",
      "courses.title": "Kurslarimiz",
      "courses.duration": "Davomiyligi:",
      "courses.intensity": "Jadalligi:",
      "courses.apply": "Yozilish",
      "courses.ielts.title": "IELTS Intensiv",
      "courses.ielts.desc": "Imtihon formatiga to'liq sho'ng'ish. Har bir bo'lim uchun strategiyalar, har hafta test sinovlari va ekspertlardan fikr-mulohazalar.",
      "courses.ielts.duration_val": "3-6 oy",
      "courses.ielts.intensity_val": "Haftada 3 marta, 2 soatdan",
      "courses.general.title": "General English",
      "courses.general.desc": "Og'zaki nutq, grammatika va so'z boyligini rivojlantirish. Noyob metodika bo'yicha til to'sig'ini engib o'tish.",
      "courses.general.duration_val": "Har bir darajaga 4 oy",
      "courses.general.intensity_val": "Haftada 3 marta, 1.5 soatdan",
      "courses.speaking.title": "Muloqot klubi",
      "courses.speaking.desc": "Ona tilida so'zlashuvchilar va taklif etilgan mehmonlar bilan dolzarb mavzularda muloqot amaliyoti. Darsliklarsiz, faqat jonli til.",
      "courses.speaking.duration_val": "Doimiy",
      "courses.speaking.intensity_val": "Har shanba, 2 soatdan",
      "courses.kids.title": "Bolalar uchun ingliz tili",
      "courses.kids.desc": "7 yoshdan 12 yoshgacha bo'lgan bolalar uchun o'yin shaklidagi interaktiv mashg'ulotlar. Birinchi qadamdanoq ingliz tilini sevishni o'rgatamiz.",
      "courses.kids.duration_val": "O'quv yili",
      "courses.kids.intensity_val": "Haftada 2 marta, 1.5 soatdan",
      "courses.business.title": "Biznes ingliz tili",
      "courses.business.desc": "Biznes yozishmalari, taqdimotlar va muzokaralarga tayyorgarlik, maxsus so'z birikmalari. Mutaxassislar va top-menejerlar uchun.",
      "courses.business.duration_val": "3 oy",
      "courses.business.intensity_val": "Haftada 3 marta, 1.5 soatdan",
      "courses.individual.title": "Yakka tartibdagi darslar",
      "courses.individual.desc": "Sizning aniq maqsadlaringiz va jadvalingizga moslashtirilgan shaxsiy dastur. O'qituvchining maksimal e'tibori.",
      "courses.individual.duration_val": "Moslashuvchan",
      "courses.individual.intensity_val": "Shaxsiy jadval",
      "results.title": "Talabalarimiz natijalari",
      "results.student1.name": "Aziz Karimov",
      "results.student1.feedback": "\"Stanford School tufayli 4 oy ichida ballimni 5.5 dan 7.5 gacha ko'tardim! Shanba kunidagi testlar formati juda zo'r, zaif tomonlaringizni darhol bilib olasiz.\"",
      "results.student2.name": "Nigora Usmanova",
      "results.student2.feedback": "\"Mening maqsadim chet el universitetiga kirish edi. Natija barcha kutilganlardan oshib ketdi — 8.5! O'qituvchilar juda talabchan, lekin bunga arziydi.\"",
      "results.before": "Oldin:",
      "results.after": "Keyin:",
      "teachers.title": "Jamoamiz",
      "teachers.t1.alt": "Avatar namunasi: Dilshod Ismoilov (Katta metodist)",
      "teachers.t2.alt": "Avatar namunasi: Anna Novikova (O'qituvchi)",
      "teachers.t3.alt": "Avatar namunasi: Sardor Karimov (O'qituvchi)",
      "teachers.t1.name": "Dilshod Ismoilov",
      "teachers.t1.role": "Katta metodist, IELTS 8.5",
      "teachers.t1.bio": "Pedagogik tajriba — 10 yil. IELTS imtihonining Speaking va Writing qismlariga tayyorlashga ixtisoslashgan. Vestminster universiteti bitiruvchisi.",
      "teachers.t2.name": "Anna Novikova",
      "teachers.t2.role": "General English o'qituvchisi, IELTS 8.5",
      "teachers.t2.bio": "Buyuk Britaniyada tahsil olgan. Talabalarga birinchi darsdanoq ingliz tilida so'zlashishga yordam beradigan interaktiv darslar yaratadi.",
      "teachers.t3.name": "Sardor Karimov",
      "teachers.t3.role": "Muloqot klublari kuratori, ona tilida so'zlashuvchi",
      "teachers.t3.bio": "AQShda 12 yil yashagan. Amerika talaffuzi, zamonaviy jargon va munozaralar o'tkazishga ixtisoslashgan.",
      "certificates.title": "Maktab sertifikatlari",
      "certificates.subtitle": "(Taqdim etilgan barcha hujjatlar interaktiv ko'rgazmali namunalar hisoblanadi)",
      "certificates.c1.aria": "Behzod Aliyev nomidagi IELTS 8.5 sertifikati namunasini ochish",
      "certificates.c1.alt": "Behzod Aliyev nomidagi IELTS 8.5 sertifikati namunasi",
      "certificates.c1.student": "Behzod Aliyev",
      "certificates.c1.type": "IELTS Academic (Namuna)",
      "certificates.c2.aria": "Sherzod Tursunov nomidagi IELTS 7.5 sertifikati namunasini ochish",
      "certificates.c2.alt": "Sherzod Tursunov nomidagi IELTS 7.5 sertifikati namunasi",
      "certificates.c2.student": "Sherzod Tursunov",
      "certificates.c2.type": "IELTS Academic (Namuna)",
      "certificates.c3.aria": "Madina Saidova nomidagi C1 darajasi tugallanganligi to'g'risidagi sertifikat namunasini ochish",
      "certificates.c3.alt": "Madina Saidova nomidagi C1 darajasi tugallanganligi to'g'risidagi sertifikat namunasi",
      "certificates.c3.student": "Madina Saidova",
      "certificates.c3.type": "General English C1 kursi (Namuna)",
      "form.heading": "Bepul darsga yoziling",
      "form.subheading": "Testdan o'ting, shaxsiy tayyorgarlik rejasi va IELTS metodistidan bepul maslahat oling.",
      "form.name_label": "Ismingiz",
      "form.name_placeholder": "Ismingiz",
      "form.phone_label": "Telefon raqamingiz",
      "form.phone_placeholder": "+998 __ ___ __ __",
      "form.course_label": "Kursni tanlang",
      "form.course_placeholder": "Kursni tanlang",
      "form.opt_ielts": "IELTS Intensiv",
      "form.opt_general": "General English",
      "form.opt_speaking": "Muloqot klubi",
      "form.opt_kids": "Bolalar uchun ingliz tili",
      "form.opt_business": "Biznes ingliz tili",
      "form.opt_individual": "Yakka tartibdagi darslar",
      "form.submit": "Ariza qoldirish",
      "form.success_title": "Ariza qabul qilindi!",
      "form.success_desc": "Menejerimiz darsni tasdiqlash uchun 15 daqiqa ichida siz bilan bog'lanadi.",
      "form.close": "Yopish",
      "form.err_name": "Ism kamida 2 ta harfdan iborat bo'lishi kerak",
      "form.err_phone": "To'g'ri telefon raqamini kiriting",
      "form.err_course": "Iltimos, kursni tanlang",
      "footer.sections": "Bo'limlar",
      "footer.contacts": "Aloqa",
      "footer.address": "O'zbekiston, Toshkent sh., Mirobod tumani, Amir Temur ko'chasi, 42",
      "footer.copyright": "© 2026 Stanford School. Barcha huquqlar himoyalangan. O'zb litsenziyasi №409-12.",
      "footer.developer": "Standartlar bo'yicha yaratilgan",
      "lightbox.sr_title": "Sertifikat namunasi to'liq ekranda",
      "lightbox.close_aria": "To'liq ekranni yopish"
    },
    en: {
      "cursor.view": "VIEW",
      "logo.subtitle": "SCHOOL",
      "nav.courses": "Courses",
      "nav.results": "Results",
      "nav.teachers": "Teachers",
      "nav.certificates": "Certificates",
      "nav.cta": "Enroll Now",
      "hero.eyebrow": "BETTER FUTURE STARTS HERE",
      "hero.title_part1": "Unlock",
      "hero.title_part2": "Your",
      "hero.title_part3": "English",
      "hero.subtitle_text": "A premium language school in Tashkent. We do not sell lessons — we guarantee results in the form of passed exams and fluent communication.",
      "hero.cta": "Start Learning",
      "stats.ielts": "Average IELTS score of graduates",
      "stats.group": "Maximum students per group",
      "stats.native_num": "100%",
      "stats.native": "Experienced teachers with IELTS 8.5+",
      "courses.title": "Our Courses",
      "courses.duration": "Duration:",
      "courses.intensity": "Intensity:",
      "courses.apply": "Apply",
      "courses.ielts.title": "IELTS Intensive",
      "courses.ielts.desc": "Full immersion in the exam format. Strategies for each section, weekly mock tests, and expert feedback.",
      "courses.ielts.duration_val": "3-6 months",
      "courses.ielts.intensity_val": "3 times a week, 2 hours each",
      "courses.general.title": "General English",
      "courses.general.desc": "Development of speaking skills, grammar, and vocabulary. Overcoming the language barrier using a unique methodology.",
      "courses.general.duration_val": "4 months per level",
      "courses.general.intensity_val": "3 times a week, 1.5 hours each",
      "courses.speaking.title": "Speaking Club",
      "courses.speaking.desc": "Speaking practice on topical themes with native speakers and invited guests. No textbooks, only real-life language.",
      "courses.speaking.duration_val": "Ongoing",
      "courses.speaking.intensity_val": "Every Saturday, 2 hours",
      "courses.kids.title": "Kids English",
      "courses.kids.desc": "Interactive game-based lessons for children from 7 to 12 years old. Teaching them to love English from the first steps.",
      "courses.kids.duration_val": "Academic year",
      "courses.kids.intensity_val": "2 times a week, 1.5 hours each",
      "courses.business.title": "Business English",
      "courses.business.desc": "Business correspondence, preparation for presentations and negotiations, specialized vocabulary. For specialists and top managers.",
      "courses.business.duration_val": "3 months",
      "courses.business.intensity_val": "3 times a week, 1.5 hours each",
      "courses.individual.title": "Private Lessons",
      "courses.individual.desc": "A personalized program tailored to your specific goals and schedule. Maximum teacher attention.",
      "courses.individual.duration_val": "Flexible",
      "courses.individual.intensity_val": "Individual schedule",
      "results.title": "Student Results",
      "results.student1.name": "Aziz Karimov",
      "results.student1.feedback": "\"Thanks to Stanford School, I raised my score from 5.5 to 7.5 in 4 months! The Saturday mock tests format is amazing; you immediately understand your weak areas.\"",
      "results.student2.name": "Nigora Usmanova",
      "results.student2.feedback": "\"My goal was to enter a foreign university. The result exceeded all expectations — 8.5! The teachers are very demanding, but it was absolutely worth it.\"",
      "results.before": "Before:",
      "results.after": "After:",
      "teachers.title": "Our Team",
      "teachers.t1.alt": "Sample avatar: Dilshod Ismoilov (Senior Methodist)",
      "teachers.t2.alt": "Sample avatar: Anna Novikova (Teacher)",
      "teachers.t3.alt": "Sample avatar: Sardor Karimov (Teacher)",
      "teachers.t1.name": "Dilshod Ismoilov",
      "teachers.t1.role": "Head Methodist, IELTS 8.5",
      "teachers.t1.bio": "Teaching experience — 10 years. Specializes in preparation for Speaking and Writing sections of IELTS. Graduate of Westminster University.",
      "teachers.t2.name": "Anna Novikova",
      "teachers.t2.role": "General English Teacher, IELTS 8.5",
      "teachers.t2.bio": "Studied in the UK. Creates interactive lessons that help students speak English from the very first lesson.",
      "teachers.t3.name": "Sardor Karimov",
      "teachers.t3.role": "Speaking Club Curator, Native Speaker",
      "teachers.t3.bio": "Lived in the US for 12 years. Specializes in American pronunciation, modern slang, and conducting debates.",
      "certificates.title": "School Certificates",
      "certificates.subtitle": "(All presented documents are interactive demonstration samples)",
      "certificates.c1.aria": "Open sample IELTS 8.5 certificate of Behzod Aliyev",
      "certificates.c1.alt": "Sample IELTS 8.5 certificate of Behzod Aliyev",
      "certificates.c1.student": "Behzod Aliyev",
      "certificates.c1.type": "IELTS Academic (Sample)",
      "certificates.c2.aria": "Open sample IELTS 7.5 certificate of Sherzod Tursunov",
      "certificates.c2.alt": "Sample IELTS 7.5 certificate of Sherzod Tursunov",
      "certificates.c2.student": "Sherzod Tursunov",
      "certificates.c2.type": "IELTS Academic (Sample)",
      "certificates.c3.aria": "Open sample C1 completion certificate of Madina Saidova",
      "certificates.c3.alt": "Sample C1 completion certificate of Madina Saidova",
      "certificates.c3.student": "Madina Saidova",
      "certificates.c3.type": "General English C1 Course (Sample)",
      "form.heading": "Book a Free Lesson",
      "form.subheading": "Take a placement test, get a personalized study plan, and a free consultation with an IELTS coordinator.",
      "form.name_label": "Your name",
      "form.name_placeholder": "Your name",
      "form.phone_label": "Phone number",
      "form.phone_placeholder": "+998 __ ___ __ __",
      "form.course_label": "Select a course",
      "form.course_placeholder": "Select a course",
      "form.opt_ielts": "IELTS Intensive",
      "form.opt_general": "General English",
      "form.opt_speaking": "Speaking Club",
      "form.opt_kids": "Kids English",
      "form.opt_business": "Business English",
      "form.opt_individual": "Private Lessons",
      "form.submit": "Submit Application",
      "form.success_title": "Application Received!",
      "form.success_desc": "Our manager will contact you within 15 minutes to confirm your booking.",
      "form.close": "Close",
      "form.err_name": "Name must contain at least 2 letters",
      "form.err_phone": "Please enter a valid phone number",
      "form.err_course": "Please select a course",
      "footer.sections": "Sections",
      "footer.contacts": "Contacts",
      "footer.address": "42 Amir Temur Str., Mirabad District, Tashkent, Uzbekistan",
      "footer.copyright": "© 2026 Stanford School. All rights reserved. Uzbekistan License No. 409-12.",
      "footer.developer": "Crafted to the standards of",
      "lightbox.sr_title": "Sample certificate full screen",
      "lightbox.close_aria": "Close full screen"
    }
  };

  let currentLang = localStorage.getItem('lang') || 'ru';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);

    // Update active state in switchers
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate text nodes using data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Translate input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Translate image alt tags (accessibility compliance for watermarks)
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('alt', translations[lang][key]);
      }
    });

    // Translate element aria-labels
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('aria-label', translations[lang][key]);
      }
    });
  }

  // Bind Switcher Clicks
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  // Apply initial language
  applyLanguage(currentLang);


  /* --------------------------------------------------------------------------
     2. Theme Management (Prevent FOUC, Persistent Theme switcher)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  function applyTheme(theme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]') || (() => {
      const meta = document.createElement('meta');
      meta.name = "theme-color";
      document.head.appendChild(meta);
      return meta;
    })();

    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      themeToggleBtn.setAttribute('aria-pressed', 'true');
      metaThemeColor.setAttribute('content', '#F7EFF4');
    } else {
      document.documentElement.classList.remove('light-theme');
      themeToggleBtn.setAttribute('aria-pressed', 'false');
      metaThemeColor.setAttribute('content', '#0A0410');
    }
    localStorage.setItem('theme', theme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.contains('light-theme');
    applyTheme(isLight ? 'dark' : 'light');
  });

  // Apply initial theme states (inline script already added class, sync buttons here)
  const initialTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
  applyTheme(initialTheme);


  /* --------------------------------------------------------------------------
     3. Smooth inertial scrolling (Lenis)
     -------------------------------------------------------------------------- */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync scroll positions for GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);


  /* --------------------------------------------------------------------------
     4. Spline 3D Viewer & Fallback Validation
     -------------------------------------------------------------------------- */
  const splineWrapper = document.getElementById('spline-wrapper');
  const splineViewer = splineWrapper ? splineWrapper.querySelector('spline-viewer') : null;

  if (splineViewer) {
    // Validate Spline viewer script loaded correctly, else hide it and show fallbacks
    let splineLoaded = false;
    
    // Safety timeout: If spline hasn't rendered within 3.5 seconds, trigger fallback poster
    const fallbackTimeout = setTimeout(() => {
      if (!splineLoaded) {
        console.warn("Spline viewer timed out or script is blocked. Displaying high-performance CSS gradient fallback.");
        if (splineWrapper) splineWrapper.style.opacity = '0';
      }
    }, 3500);

    splineViewer.addEventListener('load', () => {
      splineLoaded = true;
      clearTimeout(fallbackTimeout);
      splineWrapper.style.opacity = '1';
      console.log("Spline 3D Scene successfully loaded.");
    });
  }

  // Parallax Scroll for Hero Elements (3D wrapper + blobs)
  gsap.to('#spline-wrapper', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    yPercent: 15,
    scale: 1.03,
    opacity: 0.35
  });

  gsap.to('.hero-fallback-bg', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    yPercent: 10
  });


  /* --------------------------------------------------------------------------
     5. Desktop-Only Custom Spotlight Cursor & Magnetic Reactions
     -------------------------------------------------------------------------- */
  const customCursor = document.getElementById('custom-cursor');
  const ambientSpotlight = document.getElementById('ambient-spotlight');
  const isTouchDevice = window.matchMedia('(hover: none)').matches || ('ontouchstart' in window);

  if (!isTouchDevice && customCursor && ambientSpotlight) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update ambient glow location instantly (light spotlight)
      ambientSpotlight.style.left = `${mouseX}px`;
      ambientSpotlight.style.top = `${mouseY}px`;
    });

    // Smooth lerp follow action for custom cursor dot/badge
    const tick = () => {
      const ease = 0.15;
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;

      customCursor.style.left = `${cursorX}px`;
      customCursor.style.top = `${cursorY}px`;

      requestAnimationFrame(tick);
    };
    tick();

    // Attach Hover Classes
    const bindCursorHover = (selectors, className) => {
      document.querySelectorAll(selectors).forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add(className));
        el.addEventListener('mouseleave', () => customCursor.classList.remove(className));
      });
    };

    bindCursorHover('.nav-link-item, .theme-toggle, .lang-btn, .logo-link, #mobile-menu-toggle', 'hovering-link');
    bindCursorHover('.cta-button-nav, .cta-button-hero, .cta-button-mobile, .course-cta, .form-submit-btn, .success-close-btn', 'hovering-button');
    bindCursorHover('.cert-card-btn', 'hovering-cert');

    // 3D Card Tilt Effect (Stats cards & Results)
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        // Sensitivity multipliers
        const angleX = (yc - y) / 12;
        const angleY = (x - xc) / 12;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });

    // Elastic Magnetic Button Pull
    document.querySelectorAll('.magnetic, .magnetic-btn').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);
        
        // Offset element position (elastic pull)
        el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;

        // Independent inner content movement for depth
        const inner = el.querySelector('.cta-inner');
        if (inner) {
          inner.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        }
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
        const inner = el.querySelector('.cta-inner');
        if (inner) {
          inner.style.transform = 'translate(0px, 0px)';
        }
      });
    });
  }


  /* --------------------------------------------------------------------------
     6. GSAP Scrolling Animations
     -------------------------------------------------------------------------- */
  // Page Scroll Progress Indicator
  gsap.to('#scroll-progress-bar', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1
    },
    width: '100%',
    ease: 'none'
  });

  // Hero H1 Reveal Animation
  const heroTl = gsap.timeline();
  
  heroTl.from('.eyebrow-text', {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power3.out'
  });

  // Select all individual words in title and pull them up from clip path
  heroTl.from('.hero-title .word', {
    yPercent: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: 'power4.out',
    onComplete: () => {
      const title = document.querySelector('.hero-title');
      if (title) title.classList.add('animated');
    }
  }, '-=0.7');

  heroTl.from('.hero-subtitle', {
    opacity: 0,
    y: 25,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8');

  heroTl.from('#hero-cta', {
    scale: 0.92,
    opacity: 0,
    y: 25,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.7');

  // Stats Card Reveal
  gsap.from('.stat-card', {
    scrollTrigger: {
      trigger: '.stats-section',
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // Courses Card Reveal (Staggered Grid)
  gsap.from('.course-card', {
    scrollTrigger: {
      trigger: '.courses-section',
      start: 'top 75%',
    },
    opacity: 0,
    y: 60,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out'
  });

  // Progress Bar score reveals
  gsap.utils.toArray('.progress-bar').forEach(bar => {
    const scoreVal = parseFloat(bar.getAttribute('data-score'));
    const targetWidth = (scoreVal / 9.0) * 100; // Standardize relative to maximum IELTS score of 9.0

    gsap.to(bar, {
      scrollTrigger: {
        trigger: '.results-section',
        start: 'top 75%',
      },
      width: `${targetWidth}%`,
      duration: 1.8,
      ease: 'power4.out'
    });
  });

  // Results Cards Reveal
  gsap.from('.result-card', {
    scrollTrigger: {
      trigger: '.results-section',
      start: 'top 75%',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Teachers Cards Reveal
  gsap.from('.teacher-card', {
    scrollTrigger: {
      trigger: '.teachers-section',
      start: 'top 75%',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // Certificates Cards Reveal
  gsap.from('.cert-card-btn', {
    scrollTrigger: {
      trigger: '.certificates-section',
      start: 'top 75%',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // Contact Form Reveal
  gsap.from('.form-info-column', {
    scrollTrigger: {
      trigger: '.form-section',
      start: 'top 80%',
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.form-field-column', {
    scrollTrigger: {
      trigger: '.form-section',
      start: 'top 80%',
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
  });


  /* --------------------------------------------------------------------------
     7. Accessible Lightbox Gallery (Traps focus / handles escape keys)
     -------------------------------------------------------------------------- */
  const lightbox = document.getElementById('cert-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const closeBackdrop = document.getElementById('lightbox-close-backdrop');
  let lastActiveElement = null;

  function openLightbox(triggerBtn) {
    lastActiveElement = triggerBtn;
    const certSrc = triggerBtn.getAttribute('data-cert-src');
    const certAlt = triggerBtn.querySelector('img').getAttribute('alt');

    lightboxImg.setAttribute('src', certSrc);
    lightboxImg.setAttribute('alt', certAlt);

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    
    // Freeze background scroll
    lenis.stop();
    document.body.style.overflow = 'hidden';

    // Set focus to the close button inside the modal immediately
    setTimeout(() => {
      lightboxCloseBtn.focus();
    }, 100);

    // Bind keyboard event for escape keys and tab containment
    document.addEventListener('keydown', handleLightboxKeys);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.setAttribute('src', '');

    // Restore scroll controls
    lenis.start();
    document.body.style.overflow = '';

    // Remove keydown binder
    document.remove('keydown', handleLightboxKeys);

    // Restore focus to original button clicked
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  function handleLightboxKeys(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }

    // Force focus trap (only element in this lightbox dialog that receives focus is the close button)
    if (e.key === 'Tab') {
      e.preventDefault();
      lightboxCloseBtn.focus();
    }
  }

  // Bind clicks
  document.querySelectorAll('.cert-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      openLightbox(e.currentTarget);
    });
  });

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  closeBackdrop.addEventListener('click', closeLightbox);


  /* --------------------------------------------------------------------------
     8. Localized Form Submission & Uzbekistan Phone Masking
     -------------------------------------------------------------------------- */
  const phoneInput = document.getElementById('student-phone');
  const leadForm = document.getElementById('lead-form');
  const successOverlay = document.getElementById('form-success');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  // Input Phone mask for "+998 XX XXX XX XX" format
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let inputVal = e.target.value;
      
      // Strip anything that isn't a digit
      let digits = inputVal.replace(/\D/g, '');

      // Ensure starts with 998, if they deleted everything keep +998
      if (!digits.startsWith('998')) {
        digits = '998' + digits;
      }

      // Restrict digit length to 12 digits (998 + 9 digits local)
      digits = digits.substring(0, 12);

      // Build format: "+998 90 123 45 67"
      let formattedVal = '+998';
      
      if (digits.length > 3) {
        formattedVal += ' ' + digits.substring(3, 5);
      }
      if (digits.length > 5) {
        formattedVal += ' ' + digits.substring(5, 8);
      }
      if (digits.length > 8) {
        formattedVal += ' ' + digits.substring(8, 10);
      }
      if (digits.length > 10) {
        formattedVal += ' ' + digits.substring(10, 12);
      }

      e.target.value = formattedVal;
    });

    // Handle backspacing correctly so formatting doesn't lock typing
    phoneInput.addEventListener('keydown', (e) => {
      const input = e.target;
      if (e.key === 'Backspace') {
        const val = input.value;
        // If cursor is at a space, delete the space and the preceding character
        if (val.endsWith(' ')) {
          e.preventDefault();
          input.value = val.substring(0, val.length - 2);
          // Re-trigger input formatting
          const event = new Event('input', { bubbles: true });
          input.dispatchEvent(event);
        }
      }
    });
  }

  // Handle Form Submission
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl = document.getElementById('student-name');
      const courseEl = document.getElementById('course-select');
      
      const nameErr = document.getElementById('name-error');
      const phoneErr = document.getElementById('phone-error');
      const courseErr = document.getElementById('course-error');

      // Clear previous error labels
      nameEl.classList.remove('invalid');
      phoneInput.classList.remove('invalid');
      courseEl.classList.remove('invalid');
      nameErr.textContent = '';
      phoneErr.textContent = '';
      courseErr.textContent = '';

      let isValid = true;

      // Validate Name
      if (nameEl.value.trim().length < 2) {
        nameEl.classList.add('invalid');
        nameErr.textContent = translations[currentLang]["form.err_name"];
        isValid = false;
      }

      // Validate Phone Format (+998 XX XXX XX XX is exactly 17 chars long)
      if (phoneInput.value.length < 17) {
        phoneInput.classList.add('invalid');
        phoneErr.textContent = translations[currentLang]["form.err_phone"];
        isValid = false;
      }

      // Validate Course Choice
      if (!courseEl.value) {
        courseEl.classList.add('invalid');
        courseErr.textContent = translations[currentLang]["form.err_course"];
        isValid = false;
      }

      if (isValid) {
        // Mock lead transmission - display accessible success overlay
        successOverlay.classList.add('show');
        successOverlay.setAttribute('aria-hidden', 'false');
        lenis.stop(); // Freeze scroll background
        
        // Focus container for accessibility screen readers
        successOverlay.focus();
      }
    });
  }

  // Close Success Notification
  if (closeSuccessBtn && successOverlay) {
    const dismissSuccess = () => {
      successOverlay.classList.remove('show');
      successOverlay.setAttribute('aria-hidden', 'true');
      lenis.start(); // Restore scroll
      leadForm.reset(); // Reset form values
    };

    closeSuccessBtn.addEventListener('click', dismissSuccess);
  }


  /* --------------------------------------------------------------------------
     9. Mobile Navigation Control Menu
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', isExpanded);
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }
});
