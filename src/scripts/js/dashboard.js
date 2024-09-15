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
    if(pieChart){
      google.charts.load('current', {'packages':['corechart']});
      const googleChart = async () => {

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
          'legend':{position: 'right',textStyle: {color: 'white', fontSize: 16}}
        };
        var chart = new google.visualization.PieChart(pieChart);
        chart.draw(data, options);
      }
      google.charts.setOnLoadCallback(googleChart);
    }
  });