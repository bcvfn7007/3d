/* ==========================================================================
   Stanford School — Premium Interactive Script v2.0
   UI/UX Pro Max: Cinematic animations, magnetic interactions, accessibility
   ========================================================================== */

/* --------------------------------------------------------------------------
   0. Preloader & Screen Reader Safety Controller
   -------------------------------------------------------------------------- */
let revealed = false;
let preloaderTimeout = null;
let progressInterval = null;

function revealSite(immediate = false) {
  if (revealed) return;
  revealed = true;

  if (preloaderTimeout) clearTimeout(preloaderTimeout);
  if (progressInterval) clearInterval(progressInterval);

  const preloader = document.getElementById('preloader');
  const appContent = document.getElementById('app-content');

  // Remove inert/aria-hidden from page content
  if (appContent) {
    appContent.removeAttribute('inert');
    appContent.removeAttribute('aria-hidden');
  }

  // Hide preloader overlay
  if (preloader) {
    const prefersMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (immediate || !prefersMotion || typeof gsap === 'undefined') {
      preloader.classList.add('preloader-hidden');
      preloader.setAttribute('inert', 'true');
      preloader.setAttribute('aria-hidden', 'true');
    } else {
      gsap.to(preloader, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.5,
        ease: 'power4.inOut',
        onComplete: () => {
          preloader.classList.add('preloader-hidden');
          preloader.setAttribute('inert', 'true');
          preloader.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }

  try {
    sessionStorage.setItem('visited', 'true');
  } catch (e) {
    console.warn('sessionStorage is not accessible', e);
  }

  if (typeof ScrollTrigger !== 'undefined') {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }
}

// Check if session visited already
let isVisited = false;
try {
  isVisited = sessionStorage.getItem('visited') === 'true';
} catch (e) {}

if (isVisited) {
  revealSite(true);
} else {
  preloaderTimeout = setTimeout(() => {
    revealSite(false);
  }, 4000);

  const counterEl = document.getElementById('preloader-counter');
  const progressBarEl = document.getElementById('preloader-progress-bar');
  let currentPct = 0;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealSite(true);
  } else {
    progressInterval = setInterval(() => {
      if (currentPct < 90) {
        currentPct += Math.floor(Math.random() * 4) + 1;
        if (currentPct > 90) currentPct = 90;
        updatePreloaderPct(currentPct);
      }
    }, 45);

    const handleLoad = () => {
      if (progressInterval) clearInterval(progressInterval);
      progressInterval = setInterval(() => {
        if (currentPct < 100) {
          currentPct += 4;
          if (currentPct >= 100) {
            currentPct = 100;
            clearInterval(progressInterval);
            setTimeout(() => revealSite(false), 200);
          }
          updatePreloaderPct(currentPct);
        }
      }, 25);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
  }

  function updatePreloaderPct(val) {
    const preloaderEl = document.getElementById('preloader');
    if (preloaderEl) preloaderEl.setAttribute('aria-valuenow', val);
    if (counterEl) counterEl.textContent = val.toString().padStart(2, '0');
    if (progressBarEl) progressBarEl.style.width = `${val}%`;
  }
}


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
    "results.student3.name": "Жасур Алимов",
    "results.student3.feedback": "\"Stanford School — лучший выбор в Ташкенте. Результат 7.0 говорит сам за себя. Особая благодарность преподавателям за отличную методику!\"",
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
    "results.student3.name": "Jasur Alimov",
    "results.student3.feedback": "\"Stanford School — Toshkentdagi eng yaxshi tanlov. Natija 7.0 o'zi uchun gapiradi. O'qituvchilarga ajoyib metodika uchun alohida rahmat!\"",
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
    "results.student3.name": "Jasur Alimov",
    "results.student3.feedback": "\"Stanford School is the best choice in Tashkent. My score of 7.0 speaks for itself. Special thanks to the teachers for the excellent methodology!\"",
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

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang]?.[key]) el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang]?.[key]) el.setAttribute('placeholder', translations[lang][key]);
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    if (translations[lang]?.[key]) el.setAttribute('alt', translations[lang][key]);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (translations[lang]?.[key]) el.setAttribute('aria-label', translations[lang][key]);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', e => applyLanguage(e.currentTarget.getAttribute('data-lang')));
});

applyLanguage(currentLang);


/* --------------------------------------------------------------------------
   2. Theme Management
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
    themeToggleBtn?.setAttribute('aria-pressed', 'true');
    metaThemeColor.setAttribute('content', '#F5EEF5');
  } else {
    document.documentElement.classList.remove('light-theme');
    themeToggleBtn?.setAttribute('aria-pressed', 'false');
    metaThemeColor.setAttribute('content', '#060210');
  }
  localStorage.setItem('theme', theme);
}

themeToggleBtn?.addEventListener('click', () => {
  applyTheme(document.documentElement.classList.contains('light-theme') ? 'dark' : 'light');
});

const initialTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
applyTheme(initialTheme);


/* --------------------------------------------------------------------------
   3. Smooth Inertial Scrolling (Lenis)
   -------------------------------------------------------------------------- */
const lenis = new Lenis({
  duration: 1.25,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false
});

if (typeof ScrollTrigger !== 'undefined') {
  lenis.on('scroll', ScrollTrigger.update);
}

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


/* --------------------------------------------------------------------------
   4. Header Scroll Behaviour — adds .scrolled class
   -------------------------------------------------------------------------- */
const mainHeader = document.getElementById('main-header');
let lastScrollY = 0;
let headerVisible = true;

lenis.on('scroll', ({ scroll }) => {
  if (!mainHeader) return;

  // Add scrolled class for styling
  mainHeader.classList.toggle('scrolled', scroll > 60);

  // Auto-hide on scroll down, show on scroll up (after 200px)
  if (scroll > 200) {
    if (scroll > lastScrollY + 5 && headerVisible) {
      mainHeader.style.transform = 'translateY(-120%)';
      headerVisible = false;
    } else if (scroll < lastScrollY - 5 && !headerVisible) {
      mainHeader.style.transform = 'translateY(0)';
      headerVisible = true;
    }
  } else {
    mainHeader.style.transform = 'translateY(0)';
    headerVisible = true;
  }

  lastScrollY = scroll;
});

// Add smooth header transition
if (mainHeader) {
  mainHeader.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.4s ease, box-shadow 0.4s ease, background 0.4s ease';
}


/* --------------------------------------------------------------------------
   5. Spline 3D Viewer & Fallback Validation
   -------------------------------------------------------------------------- */
const splineWrapper = document.getElementById('spline-wrapper');
const splineViewer = splineWrapper?.querySelector('spline-viewer');

if (splineViewer) {
  let splineLoaded = false;

  const fallbackTimeout = setTimeout(() => {
    if (!splineLoaded && splineWrapper) {
      splineWrapper.style.opacity = '0';
      splineWrapper.style.pointerEvents = 'none';
    }
  }, 4000);

  splineViewer.addEventListener('load', () => {
    splineLoaded = true;
    clearTimeout(fallbackTimeout);
    if (splineWrapper) splineWrapper.style.opacity = '1';
    ScrollTrigger?.refresh();
  });

  splineViewer.addEventListener('error', () => {
    if (splineWrapper) splineWrapper.style.opacity = '0';
  });
}

// Hero parallax
if (typeof gsap !== 'undefined') {
  gsap.to('#spline-wrapper', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    yPercent: 18,
    scale: 1.05,
    opacity: 0.3
  });

  gsap.to('.hero-fallback-bg', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    yPercent: 12
  });
}


/* --------------------------------------------------------------------------
   6. Desktop Custom Cursor, Spotlight & Magnetic Reactions
   -------------------------------------------------------------------------- */
const customCursor = document.getElementById('custom-cursor');
const ambientSpotlight = document.getElementById('ambient-spotlight');
const isTouchDevice = window.matchMedia('(hover: none)').matches || ('ontouchstart' in window);

if (!isTouchDevice && customCursor && ambientSpotlight) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  customCursor.style.display = 'block';
  ambientSpotlight.style.display = 'block';

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Spotlight follows instantly
    ambientSpotlight.style.left = `${mouseX}px`;
    ambientSpotlight.style.top = `${mouseY}px`;
  });

  // Smooth lerp cursor
  const tick = () => {
    const ease = 0.14;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    customCursor.style.left = `${cursorX}px`;
    customCursor.style.top = `${cursorY}px`;
    requestAnimationFrame(tick);
  };
  tick();

  // Cursor hover state binder
  const bindCursorHover = (selectors, className) => {
    document.querySelectorAll(selectors).forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add(className));
      el.addEventListener('mouseleave', () => customCursor.classList.remove(className));
    });
  };

  bindCursorHover('.nav-link-item, .theme-toggle, .lang-btn, .logo-link, #mobile-menu-toggle, .footer-link-item, .footer-phone', 'hovering-link');
  bindCursorHover('.cta-button-nav, .cta-button-hero, .cta-button-mobile, .course-cta, .form-submit-btn, .success-close-btn, .mobile-nav-link', 'hovering-button');
  bindCursorHover('.cert-card-btn', 'hovering-cert');

  // ── Hero Score Card: Skill Bars Fill on Load ────────────────────
  setTimeout(() => {
    document.querySelectorAll('.score-mini-fill').forEach(bar => {
      const w = bar.getAttribute('data-w') || '80';
      bar.style.width = `${w}%`;
    });
  }, 1800);

  // Magnetic border glow (radial highlight follows cursor inside card)
  document.querySelectorAll('.stat-card, .result-card').forEach(card => {
    let rafId = null;
    card.addEventListener('mousemove', e => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
      });
    });
    const reset = () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.removeProperty('--x');
      card.style.removeProperty('--y');
    };
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchend', reset);
  });

  // 3D Card Tilt on stats cards
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const angleX = (yc - y) / 14;
      const angleY = (x - xc) / 14;
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Elastic Magnetic Pull for buttons & nav links
  document.querySelectorAll('.magnetic, .magnetic-btn').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      const inner = el.querySelector('.cta-inner');
      if (inner) inner.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
      const inner = el.querySelector('.cta-inner');
      if (inner) inner.style.transform = 'translate(0px, 0px)';
    });
  });
}


/* --------------------------------------------------------------------------
   7. GSAP Scroll Animations (UI/UX Pro Max: staggered, directional reveals)
   -------------------------------------------------------------------------- */
if (typeof gsap !== 'undefined') {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    console.warn('GSAP ScrollTrigger register failed:', e);
  }

  // ── Score Countup Animations ──────────────────────────────────────────────
  gsap.utils.toArray('.countup-num').forEach(numSpan => {
    const targetVal = parseFloat(numSpan.getAttribute('data-target'));
    const obj = { value: 0 };
    gsap.to(obj, {
      value: targetVal,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.results-section', start: 'top 75%', once: true },
      onUpdate: () => { numSpan.textContent = obj.value.toFixed(1); }
    });
  });

  // ── Hero Before/After Mask Loop ───────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const heroMaskTl = gsap.timeline({ repeat: -1, yoyo: true });

    // Start fully hidden (clip-path from 0% width), expand to 100%, yoyo back
    heroMaskTl
      .to('.hero-mask-after', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 3.5,
        ease: 'power2.inOut',
        delay: 1.5
      })
      .to('.hero-mask-after', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.5,  // Hold at full
        ease: 'none'
      });

    // Show/hide the slider indicator line based on mask position
    gsap.to('.hero-mask-slider-line', {
      opacity: 1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'none',
      delay: 1
    });
  } else {
    // Reduced motion: just show "after" state
    gsap.set('.hero-mask-after', { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    gsap.set('.hero-mask-before', { display: 'none' });
  }

  // ── SVG Flourish Draw-on Scroll ───────────────────────────────────────────
  gsap.fromTo('.svg-flourish-path',
    { strokeDashoffset: 2200 },
    {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: '.flourish-transition-container',
        start: 'top 88%',
        end: 'bottom 10%',
        scrub: 1.5
      }
    }
  );

  gsap.from('.flourish-bg-text', {
    scrollTrigger: { trigger: '.flourish-transition-container', start: 'top 88%', scrub: true },
    opacity: 0, scale: 0.9, y: 30, ease: 'power2.out'
  });

  // ── Cinematic Parallax Divider ────────────────────────────────────────────
  gsap.to('.divider-parallax-bg', {
    scrollTrigger: {
      trigger: '.cinematic-divider',
      start: 'top bottom', end: 'bottom top',
      scrub: true
    },
    yPercent: 20, scale: 1.14, ease: 'none'
  });

  // ── Page Scroll Progress Indicator ───────────────────────────────────────
  gsap.to('#scroll-progress-bar', {
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.1 },
    width: '100%', ease: 'none'
  });

  // ── Hero Entrance Sequence ────────────────────────────────────────────────
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl
    .from('.eyebrow-text', {
      opacity: 0, y: 24, duration: 0.9, ease: 'power3.out'
    })
    .from('.hero-title .word', {
      yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.09,
      ease: 'power4.out',
      onComplete: () => document.querySelector('.hero-title')?.classList.add('animated')
    }, '-=0.6')
    .from('.hero-subtitle', {
      opacity: 0, y: 28, duration: 1, ease: 'power3.out'
    }, '-=0.7')
    .from('.hero-chip', {
      opacity: 0, y: 20, scale: 0.9, duration: 0.7, stagger: 0.1, ease: 'back.out(1.5)'
    }, '-=0.7')
    .from('#hero-cta', {
      scale: 0.88, opacity: 0, y: 28, duration: 1, ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-mask-wrapper', {
      opacity: 0, x: 40, scale: 0.95, duration: 1.2, ease: 'power3.out'
    }, '-=1')
    .from('.scroll-down-indicator', {
      opacity: 0, y: 15, duration: 0.8, ease: 'power2.out'
    }, '-=0.4');

  // ── Stats Cards Reveal (3D stagger from below) ────────────────────────────
  gsap.from('.stat-card', {
    scrollTrigger: { trigger: '.stats-grid', start: 'top 88%' },
    opacity: 0,
    y: 60,
    rotateX: -10,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    transformOrigin: 'top center'
  });

  // ── Courses Grid Staggered Entry ──────────────────────────────────────────
  gsap.from('.course-card', {
    scrollTrigger: { trigger: '.courses-grid', start: 'top 88%' },
    opacity: 0,
    y: 70,
    scale: 0.96,
    duration: 0.9,
    stagger: { amount: 0.6, grid: 'auto', from: 'start' },
    ease: 'power4.out'
  });

  // ── Section Titles Reveal ─────────────────────────────────────────────────
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: { trigger: title, start: 'top 90%', once: true },
      opacity: 0, y: 35, duration: 0.9, ease: 'power3.out'
    });
  });

  // ── Progress Bars Fill ────────────────────────────────────────────────────
  gsap.utils.toArray('.progress-bar').forEach(bar => {
    const score = parseFloat(bar.getAttribute('data-score'));
    const width = (score / 9.0) * 100;
    gsap.to(bar, {
      scrollTrigger: { trigger: '.results-grid', start: 'top 88%' },
      width: `${width}%`,
      duration: 2,
      ease: 'power4.out'
    });
  });

  // ── Results Cards: Asymmetric directional reveals ─────────────────────────
  const resultCards = document.querySelectorAll('.result-card');
  const directions = [
    { x: -90, y: 0, scale: 0.95 },    // Card 1: from left
    { x: 0,   y: 90, scale: 0.95 },   // Card 2: from below
    { x: 90,  y: 0, scale: 0.95 }     // Card 3: from right
  ];
  resultCards.forEach((card, i) => {
    const d = directions[i] || { x: 0, y: 80, scale: 0.95 };
    gsap.from(card, {
      scrollTrigger: { trigger: '.results-grid', start: 'top 88%' },
      opacity: 0, x: d.x, y: d.y, scale: d.scale,
      duration: 1.2, delay: i * 0.15, ease: 'power4.out'
    });
  });

  // ── Teachers Cards Reveal ─────────────────────────────────────────────────
  gsap.from('.teacher-card', {
    scrollTrigger: { trigger: '.teachers-grid', start: 'top 88%' },
    opacity: 0, y: 55, scale: 0.97,
    duration: 1, stagger: 0.16, ease: 'power3.out'
  });

  // ── Certificates Cards Reveal (fan effect) ────────────────────────────────
  const certCards = document.querySelectorAll('.cert-card-btn');
  certCards.forEach((card, i) => {
    const rotations = [-4, 0, 4];
    gsap.from(card, {
      scrollTrigger: { trigger: '.certificates-grid', start: 'top 90%' },
      opacity: 0, y: 60, rotate: rotations[i] || 0, scale: 0.95,
      duration: 1, delay: i * 0.15, ease: 'power3.out'
    });
  });

  // ── Form Section Reveals ──────────────────────────────────────────────────
  gsap.from('.form-info-column', {
    scrollTrigger: { trigger: '.form-grid', start: 'top 90%' },
    opacity: 0, x: -55, duration: 1, ease: 'power3.out'
  });

  gsap.from('.form-field-column', {
    scrollTrigger: { trigger: '.form-grid', start: 'top 90%' },
    opacity: 0, x: 55, duration: 1, ease: 'power3.out'
  });

  // ── Footer Brand Reveal ───────────────────────────────────────────────────
  gsap.from('.footer-brand, .footer-links-col', {
    scrollTrigger: { trigger: '.main-footer', start: 'top 95%' },
    opacity: 0, y: 35, duration: 0.8, stagger: 0.12, ease: 'power3.out'
  });
}


/* --------------------------------------------------------------------------
   8. Accessible Lightbox Gallery (Bug Fixed: removeEventListener)
   -------------------------------------------------------------------------- */
const lightbox = document.getElementById('cert-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
const closeBackdrop = document.getElementById('lightbox-close-backdrop');
let lastActiveElement = null;

function openLightbox(triggerBtn) {
  if (!lightbox || !lightboxImg) return;
  lastActiveElement = triggerBtn;

  const certSrc = triggerBtn.getAttribute('data-cert-src');
  const certAlt = triggerBtn.querySelector('img')?.getAttribute('alt') || '';

  lightboxImg.setAttribute('src', certSrc);
  lightboxImg.setAttribute('alt', certAlt);

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');

  lenis.stop();
  document.body.style.overflow = 'hidden';

  setTimeout(() => lightboxCloseBtn?.focus(), 120);
  document.addEventListener('keydown', handleLightboxKeys);
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');

  // Short delay before clearing src to allow close animation
  setTimeout(() => {
    if (lightboxImg) lightboxImg.setAttribute('src', '');
  }, 400);

  lenis.start();
  document.body.style.overflow = '';

  // ✅ BUG FIX: was `document.remove(...)`, corrected to `removeEventListener`
  document.removeEventListener('keydown', handleLightboxKeys);

  lastActiveElement?.focus();
}

function handleLightboxKeys(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'Tab') {
    e.preventDefault();
    lightboxCloseBtn?.focus();
  }
}

document.querySelectorAll('.cert-card-btn').forEach(btn => {
  btn.addEventListener('click', e => openLightbox(e.currentTarget));
});

lightboxCloseBtn?.addEventListener('click', closeLightbox);
closeBackdrop?.addEventListener('click', closeLightbox);


/* --------------------------------------------------------------------------
   9. Phone Input Masking (Uzbekistan +998 format)
   -------------------------------------------------------------------------- */
const phoneInput = document.getElementById('student-phone');

if (phoneInput) {
  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value) phoneInput.value = '+998 ';
  });

  phoneInput.addEventListener('input', e => {
    let digits = e.target.value.replace(/\D/g, '');
    if (!digits.startsWith('998')) digits = '998' + digits;
    digits = digits.substring(0, 12);

    let formatted = '+998';
    if (digits.length > 3) formatted += ' ' + digits.substring(3, 5);
    if (digits.length > 5) formatted += ' ' + digits.substring(5, 8);
    if (digits.length > 8) formatted += ' ' + digits.substring(8, 10);
    if (digits.length > 10) formatted += ' ' + digits.substring(10, 12);

    e.target.value = formatted;
  });

  phoneInput.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
      const val = e.target.value;
      if (val.endsWith(' ')) {
        e.preventDefault();
        e.target.value = val.slice(0, -2);
        e.target.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  });
}


/* --------------------------------------------------------------------------
   10. Form Submission & Validation
   -------------------------------------------------------------------------- */
const leadForm = document.getElementById('lead-form');
const successOverlay = document.getElementById('form-success');
const closeSuccessBtn = document.getElementById('close-success-btn');

if (leadForm) {
  // Real-time validation feedback on blur
  const nameEl = document.getElementById('student-name');
  const courseEl = document.getElementById('course-select');
  const nameErr = document.getElementById('name-error');
  const phoneErr = document.getElementById('phone-error');
  const courseErr = document.getElementById('course-error');

  nameEl?.addEventListener('blur', () => {
    if (nameEl.value.trim().length < 2 && nameEl.value.trim().length > 0) {
      nameEl.classList.add('invalid');
      if (nameErr) nameErr.textContent = translations[currentLang]?.['form.err_name'] || '';
    } else {
      nameEl.classList.remove('invalid');
      if (nameErr) nameErr.textContent = '';
    }
  });

  nameEl?.addEventListener('input', () => {
    if (nameEl.classList.contains('invalid') && nameEl.value.trim().length >= 2) {
      nameEl.classList.remove('invalid');
      if (nameErr) nameErr.textContent = '';
    }
  });

  leadForm.addEventListener('submit', e => {
    e.preventDefault();

    const nameInputEl = document.getElementById('student-name');
    const courseInputEl = document.getElementById('course-select');
    const nameErrEl = document.getElementById('name-error');
    const phoneErrEl = document.getElementById('phone-error');
    const courseErrEl = document.getElementById('course-error');

    // Clear previous errors
    [nameInputEl, phoneInput, courseInputEl].forEach(el => el?.classList.remove('invalid'));
    [nameErrEl, phoneErrEl, courseErrEl].forEach(el => { if (el) el.textContent = ''; });

    let isValid = true;
    const lang = translations[currentLang];

    if (!nameInputEl || nameInputEl.value.trim().length < 2) {
      nameInputEl?.classList.add('invalid');
      if (nameErrEl) nameErrEl.textContent = lang?.['form.err_name'] || 'Введите имя';
      isValid = false;
    }

    if (!phoneInput || phoneInput.value.replace(/\D/g, '').length < 12) {
      phoneInput?.classList.add('invalid');
      if (phoneErrEl) phoneErrEl.textContent = lang?.['form.err_phone'] || 'Введите телефон';
      isValid = false;
    }

    if (!courseInputEl || !courseInputEl.value) {
      courseInputEl?.classList.add('invalid');
      if (courseErrEl) courseErrEl.textContent = lang?.['form.err_course'] || 'Выберите курс';
      isValid = false;
    }

    if (isValid && successOverlay) {
      successOverlay.classList.add('show');
      successOverlay.setAttribute('aria-hidden', 'false');
      lenis.stop();
      setTimeout(() => successOverlay.focus(), 100);
    }
  });
}

if (closeSuccessBtn && successOverlay) {
  closeSuccessBtn.addEventListener('click', () => {
    successOverlay.classList.remove('show');
    successOverlay.setAttribute('aria-hidden', 'true');
    lenis.start();
    leadForm?.reset();
    document.getElementById('student-phone')?.dispatchEvent(new Event('reset'));
  });
}


/* --------------------------------------------------------------------------
   11. Mobile Navigation
   -------------------------------------------------------------------------- */
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    const open = !isExpanded;

    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));

    // Animate mobile nav links with stagger
    if (open && typeof gsap !== 'undefined') {
      gsap.from('.mobile-nav-link', {
        opacity: 0, x: -20, duration: 0.4,
        stagger: 0.06, ease: 'power2.out', delay: 0.1
      });
    }
  });

  document.querySelectorAll('.mobile-nav-link, .cta-button-mobile').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
      if (mobileNav.classList.contains('open')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    }
  });
}


/* --------------------------------------------------------------------------
   12. Smooth Active Nav Link Highlighting
   -------------------------------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link-item, .mobile-nav-link');

if (sections.length && navLinks.length && typeof ScrollTrigger !== 'undefined') {
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => highlightNavLink(section.id),
      onEnterBack: () => highlightNavLink(section.id),
    });
  });

  function highlightNavLink(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.style.opacity = href === `#${id}` ? '1' : '0.75';
    });
  }
}


/* --------------------------------------------------------------------------
   13. UI/UX Pro Max: Parallax depth on hero chips & subtitle
   -------------------------------------------------------------------------- */
if (!isTouchDevice && typeof gsap !== 'undefined') {
  window.addEventListener('mousemove', e => {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

    gsap.to('.blob-1', {
      x: xRatio * 30, y: yRatio * 20, duration: 2, ease: 'power2.out'
    });
    gsap.to('.blob-2', {
      x: xRatio * -25, y: yRatio * -18, duration: 2.5, ease: 'power2.out'
    });
    gsap.to('.blob-3', {
      x: xRatio * 15, y: yRatio * 25, duration: 3, ease: 'power2.out'
    });
  });
}


/* --------------------------------------------------------------------------
   14. Keyboard Navigation Accessibility
   -------------------------------------------------------------------------- */
// Skip to main content link (implicit - focus on escape from preloader)
document.addEventListener('keydown', e => {
  // Close lightbox on Escape (already handled in lightbox section above)
  // Close mobile nav on Escape
  if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
    mobileToggle?.click();
    mobileToggle?.focus();
  }
});

// Prevent scroll restoration issues
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

console.log('%c Stanford School v2.0 ', 'background:#C1278C;color:#fff;padding:6px 12px;border-radius:4px;font-weight:bold;font-family:monospace');
console.log('%c UI/UX Pro Max — Premium Interactive Layer Active ', 'color:#EC407A;font-family:monospace');
