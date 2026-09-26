'use strict';

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const email = 'arifhadikov@yandex.ru';
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Real project descriptions. Metrics describe the scope stated in the résumé.
const cases = {
  hr: {
    category: 'АЙКОВЕР ПРО / HR / АВТОМАТИЗАЦИЯ',
    title: 'Отпуск без ручной рутины',
    problem: 'После аудита HR-процессов требовалось автоматизировать оформление отпусков и связать учёт между корпоративными системами.',
    role: 'Провёл аудит, спроектировал и внедрил сервис: автоматическое бронирование в Bitrix24, расчёт дней отпуска и синхронизация с 1С УТ.',
    result: 'Компания полностью перешла на новый процесс. Сервисом пользуются все 300+ сотрудников.',
    tags: ['Аудит HR', 'Bitrix24', '1С УТ', 'Интеграции']
  },
  legal: {
    category: 'АЙКОВЕР ПРО / LEGAL / ДОКУМЕНТООБОРОТ',
    title: 'Договоры — в цифру',
    problem: 'Согласование договоров проходило на бумаге. Требовалось перевести его в цифровой формат при потоке около 100 договоров в месяц.',
    role: 'Перевёл согласование договоров в цифровой процесс через RPA в Bitrix24. Дополнительно спроектировал и внедрил новый процесс защиты исключительных прав компании.',
    result: 'Бумажный маршрут согласования заменён цифровым. Объём процесса — около 100 договоров в месяц.',
    tags: ['Bitrix24', 'RPA', 'Договоры', 'Оптимизация процессов']
  },
  marketplaces: {
    category: 'АЙКОВЕР ПРО / E-COMMERCE / ОПТИМИЗАЦИЯ',
    title: 'Фокус на том, что окупается',
    problem: 'Команда тратила более 60 часов в месяц на коммуникацию с поддержкой маркетплейсов по штрафам. Часть этой работы была экономически нецелесообразной.',
    role: 'Проанализировал процесс и установил порог рентабельности. Выявил категории товаров, по которым работа со штрафами не окупается.',
    result: 'Оптимизация снизила нецелевую нагрузку на команду: работа со штрафами сосредоточена на категориях, где она экономически оправдана. До изменений коммуникация с поддержкой занимала более 60 часов в месяц.',
    tags: ['Анализ процессов', 'Рентабельность', 'Маркетплейсы']
  },
  procurement: {
    category: 'НПК «ВТСС» / ПРОМЫШЛЕННОСТЬ / ПРОЦЕССЫ',
    title: 'Процессы, связанные в систему',
    problem: 'Внутренние процессы научно-промышленной компании не были формализованы. Согласование договоров закупок выполнялось на бумаге.',
    role: 'Описал и связал 30+ бизнес-процессов, сформировал единую карту. Спроектировал и внедрил маршрут согласования закупочных договоров в 1С Документооборот, разработал 10+ ТЗ и сопровождал реализацию.',
    result: 'Компания получила карту взаимосвязанных процессов и цифровой сценарий согласования договоров. Обучил 30 сотрудников работе с новыми процессами и автоматизированными сценариями.',
    tags: ['1С Документооборот', 'BPMN', 'EPC', 'Camunda', 'Bizagi']
  }
};

const approaches = [
  'Начинаю с интервью и изучения того, как процесс работает на самом деле.',
  'Связываю требования, сценарии пользователей и интеграции в единую модель.',
  'Сопровождаю разработку, проверяю сценарии и помогаю команде освоить решение.'
];

$$('[data-approach]').forEach(button => {
  button.addEventListener('click', () => {
    $$('[data-approach]').forEach(node => {
      const active = node === button;
      node.classList.toggle('is-active', active);
      node.setAttribute('aria-pressed', String(active));
    });
    $('#approach-note').textContent = approaches[Number(button.dataset.approach)];
  });
});

const stages = [
  {
    title: 'Сделать складские процессы прозрачными',
    text: 'Выявил требования к системе, описал складские операции и пользовательские сценарии. Сформировал основу для управления приёмкой, отгрузкой и адресным хранением.',
    caption: 'Операции связаны в единую модель'
  },
  {
    title: 'Спроектировать архитектуру и сценарии',
    text: 'Спроектировал архитектуру WMS и пользовательские сценарии в BPMN, UML и DFD. Проработал требования к модулям и взаимодействию систем.',
    caption: 'Архитектура, сценарии и связи между модулями'
  },
  {
    title: 'Запустить первый модуль в реальной работе',
    text: 'Модуль приёмки работает на одном складе, отгрузка тестируется. Складские процессы стали измеримыми: выявлены простои и проблемы избыточного найма. Масштабирование на второй склад — в перспективе.',
    caption: 'Приёмка в продуктиве · остальные статусы ниже'
  }
];

const stageButtons = $$('[data-stage]');
function selectStage(index, focus = false) {
  stageButtons.forEach((button, position) => {
    const active = position === index;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
  const stage = stages[index];
  $('#stage-title').textContent = stage.title;
  $('#stage-text').textContent = stage.text;
  $('#warehouse-caption').textContent = stage.caption;
  $('.warehouse-visual').dataset.activeStage = String(index);
  const panel = $('#stage-panel');
  panel.setAttribute('aria-labelledby', stageButtons[index].id);
  panel.classList.remove('changing');
  void panel.offsetWidth;
  panel.classList.add('changing');
  if (focus) stageButtons[index].focus();
}
stageButtons.forEach((button, index) => {
  button.addEventListener('click', () => selectStage(index));
  button.addEventListener('keydown', event => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % stageButtons.length;
    else if (event.key === 'ArrowLeft') next = (index + stageButtons.length - 1) % stageButtons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = stageButtons.length - 1;
    else return;
    event.preventDefault();
    selectStage(next, true);
  });
});

const dialog = $('#case-dialog');
let dialogTrigger = null;
function openCase(key, trigger) {
  const item = cases[key];
  if (!item) return;
  dialogTrigger = trigger;
  $('#dialog-category').textContent = item.category;
  $('#dialog-title').textContent = item.title;
  const content = $('#dialog-content');
  content.replaceChildren();
  [['Задача', item.problem], ['Моя роль', item.role], ['Результат', item.result]].forEach(([heading, text], index) => {
    const section = document.createElement('section');
    if (index === 2) section.className = 'dialog-result';
    const title = document.createElement('h3');
    title.textContent = heading;
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    section.append(title, paragraph);
    content.append(section);
  });
  const tags = document.createElement('div');
  tags.className = 'tags';
  item.tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    tags.append(span);
  });
  content.append(tags);
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop = 0;
  $('.dialog-close').focus({ preventScroll: true });
}
$$('[data-case]').forEach(button => button.addEventListener('click', () => openCase(button.dataset.case, button)));
$('.dialog-close').addEventListener('click', () => dialog.close());
let pointerStartedOutside = false;
dialog.addEventListener('pointerdown', event => {
  const rect = dialog.getBoundingClientRect();
  pointerStartedOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
});
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (pointerStartedOutside && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  pointerStartedOutside = false;
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  dialogTrigger?.focus({ preventScroll: true });
});

const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
}
menuToggle.addEventListener('click', () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Закрыть меню' : 'Открыть меню');
});
$$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 700px)').addEventListener('change', closeMenu);

let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
}
$('.copy-email').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    showToast('Почта скопирована');
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents($('.email-link'));
    selection.removeAllRanges();
    selection.addRange(range);
    showToast('Выделил почту — скопируйте её вручную');
  }
});

// Reveal only after the observer is available; the page remains readable without JS.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.documentElement.classList.add('motion-ready');
  $$('.reveal').forEach(element => observer.observe(element));

  const metricsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      metricsObserver.unobserve(entry.target);
      if (motionPreference.matches) return;
      const target = Number(entry.target.dataset.count);
      const prefix = entry.target.dataset.prefix || '';
      const suffix = entry.target.dataset.suffix || '';
      const start = performance.now();
      const tick = now => {
        const elapsed = Math.min((now - start) / 900, 1);
        const progress = 1 - Math.pow(1 - elapsed, 3);
        entry.target.textContent = prefix + Math.round(target * progress) + suffix;
        if (elapsed < 1 && !motionPreference.matches) requestAnimationFrame(tick);
        else entry.target.textContent = prefix + target + suffix;
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(element => metricsObserver.observe(element));
}

const hero = $('.hero');
const diagram = $('.process-visual');
hero.addEventListener('pointermove', event => {
  if (motionPreference.matches || event.pointerType !== 'mouse' || window.innerWidth < 1200) return;
  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  diagram.style.setProperty('--parallax-x', `${x * 10}px`);
  diagram.style.setProperty('--parallax-y', `${y * 8}px`);
});
hero.addEventListener('pointerleave', () => {
  diagram.style.setProperty('--parallax-x', '0px');
  diagram.style.setProperty('--parallax-y', '0px');
});

let scrollFrame = false;
function updateScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  $('.scroll-progress').style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
  let activeId = '';
  ['projects', 'experience', 'skills'].forEach(id => {
    if (document.getElementById(id).getBoundingClientRect().top < window.innerHeight * 0.4) activeId = id;
  });
  $$('.desktop-nav a').forEach(link => {
    const active = link.hash === `#${activeId}`;
    link.classList.toggle('is-current', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollFrame = false;
}
window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = true;
  requestAnimationFrame(updateScroll);
}, { passive: true });
updateScroll();
