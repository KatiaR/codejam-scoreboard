import sessions from './data_files/sessions.js';

window.addEventListener('load', () => {
    document.onmouseover = function(e) {
        const target = e.target;

        const uid = target.getAttribute('uid');
        
        if (!uid) return;
        
        const tooltipElem = document.querySelector('.tooltip');
        tooltipElem.classList.add('active');

        const coords = target.getBoundingClientRect();
      
        let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2 + window.pageXOffset;
        if (left < 0) left = 0; 
      
       let top = coords.top - tooltipElem.offsetHeight - 5 + window.pageYOffset;
        if (top < 0) {
          top = coords.top + target.offsetHeight + 5;
        }
      
        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';

        const round = +target.getAttribute('round');

        const dataTime = sessions[0].rounds[round].solutions;
        let tooltipValue;
        if (dataTime[uid]) {
            const { code } = dataTime[uid];
            tooltipValue = code;
        } else {
            tooltipValue = null
        }
        tooltipElem.textContent = tooltipValue;
      };

      document.onmouseout = function(e) {
        const tooltipElem = document.querySelector('.tooltip');
        tooltipElem.classList.remove('active');
      };
})