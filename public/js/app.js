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
        let json = await response.json();
        
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

    const pieChart = document.getElementById('piechart_div')
    const lineChart = document.getElementById('linechart_div')
    if(pieChart && lineChart){
      google.charts.load('current', {'packages':['corechart']});
      const pieChartInitialize = async () => {
        const response = await fetch(`${window.location.protocol}//${window.location.host}/subs/events`);
        let events = await response.json();

        let dataRows = []
        let total = 0
        let totalPayments = 0;
        events.totals.rows.forEach((value)=>{
          if(value.Tipo != 'Payment'){
            dataRows.push([value.Tipo,value.SubTotal])
            total += value.SubTotal
          }else{
            totalPayments += value.SubTotal
          }
        })
        dataRows.push(['Restante',totalPayments - total])

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows(dataRows);
        var options = 
        {
          'title':'Tipos de gasto',
          'width':400,
          'height':300,
          'backgroundColor': 'transparent',
          'chartArea':{width:'90%',height:'90%'},
          'titleTextStyle':{color:'white'},
          'legend':{position: 'right',textStyle: {color: 'white', fontSize: 16}},
          'colors':['#002e6b','#8b8b02','#002e6b','#002e6b','#002e6b','#20a500']
        };
        var chart = new google.visualization.PieChart(pieChart);
        chart.draw(data, options);
      }
      const lineChartInitialize = async () => {
        let response = await fetch(`${window.location.protocol}//${window.location.host}/subs/rptteoricvreal`);
        let values = await response.json();

        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Teoric');
        data.addColumn('number', 'Real');

        let dataRows = []
        // console.log(values.data)
        values.data.forEach((value)=>{
          let dateString = value.full_date;
          let parts = dateString.split('-');
          let date = new Date(parts[0], parts[1] - 1, parts[2]);
          dataRows.push([date,value.teoric_amount,value.real_amount])
        })

        data.addRows(dataRows);

        var options = {
          hAxis: {
            title: 'Date',
            titleTextStyle: {
              color: 'white'
            }
          },
          vAxis: {
            title: 'Popularity',
            titleTextStyle: {
              color: 'white'
            }
          },
          series: {
            1: {curveType: 'function'},
          },
          'title':'Teorico vs Real',
          'width':400,
          'height':300,
          'backgroundColor': 'transparent',
          'chartArea':{width:'100%',height:'70%'},
          'titleTextStyle':{color:'white'},
          'colors':['#002e6b','#20a500']
          
        };

        var chart = new google.visualization.LineChart(lineChart);
        chart.draw(data, options);
      }
      const labelColorFix = () => {

        let texts = document.querySelectorAll("svg > g > g > g > text");
        texts.forEach(text => {
            if (text.getAttribute('fill') == '#444444') {
                text.setAttribute('fill','white')
            }
          })
      }
      const initializeCharts = async () => {
        pieChartInitialize()
        lineChartInitialize()
        setTimeout(labelColorFix, 1000);
      }
      google.charts.setOnLoadCallback(initializeCharts);
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
