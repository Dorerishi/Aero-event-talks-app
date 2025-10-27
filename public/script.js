
document.addEventListener('DOMContentLoaded', () => {
  const eventTitle = document.getElementById('event-title');
  const scheduleContainer = document.getElementById('schedule-container');
  const searchBar = document.getElementById('search-bar');

  let talksData = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talksData = data;
      eventTitle.textContent = talksData.eventTitle;
      renderSchedule(talksData.schedule);
    });

  function renderSchedule(schedule) {
    scheduleContainer.innerHTML = '';
    schedule.forEach(item => {
      const scheduleItem = document.createElement('div');
      scheduleItem.classList.add('schedule-item');

      if (item.break) {
        scheduleItem.classList.add('break');
        scheduleItem.textContent = item.break;
      } else {
        const timeElement = document.createElement('div');
        timeElement.classList.add('schedule-time');
        timeElement.textContent = item.time;

        const talkDetails = document.createElement('div');
        talkDetails.classList.add('talk-details');

        const titleElement = document.createElement('h2');
        titleElement.classList.add('talk-title');
        titleElement.textContent = item.talk.title;

        const speakersElement = document.createElement('p');
        speakersElement.classList.add('talk-speakers');
        speakersElement.textContent = `by ${item.talk.speakers.join(', ')}`;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('talk-description');
        descriptionElement.textContent = item.talk.description;

        const categoryContainer = document.createElement('div');
        item.talk.category.forEach(cat => {
          const categoryElement = document.createElement('span');
          categoryElement.classList.add('talk-category');
          categoryElement.textContent = cat;
          categoryContainer.appendChild(categoryElement);
        });

        talkDetails.appendChild(titleElement);
        talkDetails.appendChild(speakersElement);
        talkDetails.appendChild(categoryContainer);
        talkDetails.appendChild(descriptionElement);

        scheduleItem.appendChild(timeElement);
        scheduleItem.appendChild(talkDetails);
      }
      scheduleContainer.appendChild(scheduleItem);
    });
  }

  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredSchedule = talksData.schedule.filter(item => {
      if (item.break) {
        return true;
      }
      return item.talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
    });
    renderSchedule(filteredSchedule);
  });
});
