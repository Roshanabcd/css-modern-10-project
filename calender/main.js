const currdate = document.querySelector('.currdate');
const datesel = document.querySelector('.dateselect');
const datepick = document.querySelector('.datepicker');
const dsMonth = datesel.querySelector('.mnthname');
const dsDays = datesel.querySelector('.days');
const prevMonth = document.querySelector('.prev-month');
const nextMonth = document.querySelector('.next-month');
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

let currentDate = new Date();

const updateCalendar = (date) => {
  const mon = date.getMonth();
  const monname = months[mon];
  const dayname = days[date.getDay()];
  let day = date.getDate();
  const yr = date.getFullYear();
  const firstDay = new Date(yr, mon, 1).getDay();
  const daysinmon = new Date(yr, mon + 1, 0).getDate();
  
  const daySuffix = (day) => {
    switch (day) {
      case 1: case 21: case 31: return `${day}st`;
      case 2: case 22: return `${day}nd`;
      case 3: case 23: return `${day}rd`;
      default: return `${day}th`;
    }
  };
  
  day = daySuffix(day);
  currdate.textContent = `${dayname}, ${monname} ${day}, ${yr}`;
  dsMonth.innerHTML = monname;
  dsDays.innerHTML = '';

  for (let d = 0; d < days.length; d++) {
    dsDays.innerHTML += `<div class="dayn">${days[d].slice(0,3)}</div>`;
  }
  for (let j = 0; j < firstDay; j++) {
    dsDays.innerHTML += `<div class="nday"></div>`;
  }
  for (let i = 0; i < daysinmon; i++) {
    dsDays.innerHTML += `<div class="day">${i + 1}</div>`;
  }

  alldays = datesel.querySelectorAll('.day');
  alldays.forEach((d) => {
    d.addEventListener('click', () => {
      currentDate.setDate(parseInt(d.innerHTML));
      updateCalendar(currentDate);
			datepick.style.height = datepick.style.height === "40px" ? "225px" : "40px";
			datepick.style.borderRadius = "40px"
    });
  });
};

updateCalendar(currentDate);

currdate.addEventListener('click', () => {
  datepick.style.height = datepick.style.height === "40px" ? "225px" : "40px";
	datepick.style.borderRadius = datepick.style.borderRadius === "40px" ? "5px" : "40px"
});

prevMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar(currentDate);
});

nextMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar(currentDate);
});
