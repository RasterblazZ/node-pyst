(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function () {
    let thisMonthEvents = []
    const calendarEl = document.getElementById('calendar');

    if(calendarEl){
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        timeZone: 'GMT-6',
        dateClick: function(info) {
          console.log(info)
        },
        datesSet: function (info) {
          fillEvents(info)
          styles()
        }
      });
      
      const fillEvents = async (info) => {
        thisMonthEvents = []
        calendar.removeAllEvents()
        // console.log(info)
        const response = await fetch(`${window.location.protocol}//${window.location.host}/subs/events`);
        const json = await response.json();
        
        var selectedDate = new Date(info.startStr);  // Crear una copia de la fecha original
        selectedDate.setDate(selectedDate.getDate() + 7);
  
        let currentDate = new Date(selectedDate);
        let year = currentDate.getFullYear();  // Get the full year (e.g., 2024)
        let month = currentDate.getMonth() + 1
  
        json.events.rows.forEach(sub => {
          let event = {
            title: `${sub.Nombre} ${(sub.Monto * (sub.Moneda == 'USD' ? 7.7 : 1)).toFixed(2)}`,
            start: `${year}-${(month.toString().length == 1 ? '0' + month : month)}-${(sub.MonthDay.toString().length == 1 ? '0' + sub.MonthDay : sub.MonthDay)}`,
            color: `${(sub.Tipo == 'Cuotas' ? '#8b8b02' : (sub.Tipo == 'Payment' ? '#20a500' : '#002e6b'))}`
          }
  
          // console.log(event)
          calendar.addEvent(event)
          thisMonthEvents.push(event)
        });
      }
  
      const styles = () => {
        let gridcells = document.getElementsByClassName('fc-daygrid-day')
        for (let index = 0; index < gridcells.length; index++) {
          gridcells[index].classList.add("hover:bg-gray-600");
          gridcells[index].classList.add("hover:cursor-pointer");
        }
      }
  
      const initializeCalendar = () => {
        calendar.render()
      }
  
      initializeCalendar()

    }
  });
},{}],2:[function(require,module,exports){
require('./dashboard.js');
require('./subscriptions.js');
},{"./dashboard.js":1,"./subscriptions.js":3}],3:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function () {
    const forms = {
        "subscription" : {
            "form_id" : "newsubscription-form",
            "table_id" : "subscription-table",
        },
        "payments" : {
            "form_id" : "newpayment-form",
            "table_id" : "payment-table",
        }
    }

    const changePage = (direction) => {
        // TODO: make this usefull when {forms} is bigger
        if(direction == 'right'){
            document.getElementById(forms.subscription.form_id).setAttribute('hidden','true')
            document.getElementById(forms.subscription.table_id).setAttribute('hidden','true')

            document.getElementById(forms.payments.form_id).removeAttribute('hidden')
            document.getElementById(forms.payments.table_id).removeAttribute('hidden')
        }else{
            document.getElementById(forms.payments.form_id).setAttribute('hidden','true')
            document.getElementById(forms.payments.table_id).setAttribute('hidden','true')

            document.getElementById(forms.subscription.form_id).removeAttribute('hidden')
            document.getElementById(forms.subscription.table_id).removeAttribute('hidden')
        }
    }

    const formLeft = document.getElementById('btn-change-form-left')
    if(formLeft)
        formLeft.addEventListener('click',(event)=>{
            changePage('left')
        })
    
    const formRight = document.getElementById('btn-change-form-right')
    if(formRight)
        formRight.addEventListener('click',(event)=>{
            changePage('right')
        })
})
},{}]},{},[2]);
