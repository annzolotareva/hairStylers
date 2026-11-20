const sections = document.querySelectorAll('section');
const track    = document.querySelector('.wheel-nav__track');
const labelEl  = document.querySelector('.wheel-nav__label');

const ANGLE_STEP = 30;
const ICONS = [
  { off: 'img/wheel-icons/hairdryerOf.png', on: 'img/wheel-icons/hairdryerOn.png' },
  { off: 'img/wheel-icons/lightOf.png', on: 'img/wheel-icons/lightOn.png' },
  { off: 'img/wheel-icons/motorOf.png', on: 'img/wheel-icons/motorOn.png' },
];
const TITLES = [
  'ФЕН-СТАЙЛЕР 2 В 1',  
  'СУПЕРЛЕГКИЙ',           
  'ИННОВАЦИОННЫЙ ЯПОНСКИЙ МОТОР',          
];
const dots = [];

sections.forEach(function (section, i) {
  const cfg = ICONS[i];
  if (!cfg) return;  

  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'wheel-nav__dot';
  dot.style.setProperty('--a', (i * ANGLE_STEP) + 'deg');

  const imgOff = document.createElement('img');
  imgOff.className = 'wheel-nav__icon wheel-nav__icon--default';
  imgOff.src = cfg.off;
  imgOff.alt = '';
  imgOff.draggable = false;

  const imgOn = document.createElement('img');
  imgOn.className = 'wheel-nav__icon wheel-nav__icon--active';
  imgOn.src = cfg.on;
  imgOn.alt = '';
  imgOn.draggable = false;

  dot.appendChild(imgOff);
  dot.appendChild(imgOn);

  dot.addEventListener('click', function () {
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  track.appendChild(dot);
  dots.push(dot);
});

function activate(i) {
  track.style.setProperty('--rotation', (-i * ANGLE_STEP) + 'deg');

  dots.forEach(function (d, j) {
    d.classList.toggle('is-active', j === i);
    d.setAttribute('aria-current', j === i ? 'true' : 'false');
  });
  labelEl.textContent = TITLES[i];
  labelEl.setAttribute('style', 'width: 130px;');
}

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const i = Array.from(sections).indexOf(entry.target);
      if (dots[i]) activate(i);

      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.5 });

sections.forEach(function (s) { observer.observe(s); });

activate(0);