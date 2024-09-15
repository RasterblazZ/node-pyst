document.addEventListener('DOMContentLoaded', function () {
    let thisMonthEvents = []
    const calendarEl = document.getElementById('calendar');
    if(calendarEl){
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        timeZone: 'GMT-6',
        dateClick: function(info) {
          clikDate(info)
        },
        datesSet: function (info) {
          fillEvents(info)
          styles()
        }
      });
      const clikDate = async (info) => {
        let modal = document.getElementById('dashboard-modal-id')
        let modalTitle = document.getElementById('dasboard-modal-title')
        let modaldimiss = document.getElementById('dashboard-modal-dimiss')
        let modalContent = document.getElementById('dasboard-modal-content')
        modaldimiss.addEventListener('click',(event)=>{
          modal.classList.add('hidden')
        })
        modal.classList.remove('hidden')
        modalTitle.innerHTML = info.dateStr

        let dateEvent = await fetch(`${window.location.protocol}//${window.location.host}/subs/events/${info.dateStr}`);
        let json = await dateEvent.json();

        let tbody = ''
        json.events.rows.forEach(element => {
          let row = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${element.Tipo} - ${element.Nombre}
                </th>
                <td class="px-6 py-4">${element.MonthDay}</td>
                <td class="px-6 py-4">${element.Monto.toFixed(2)}</td>
                <td class="px-6 py-4">${element.Moneda}</td>
            </tr>
          `
          tbody+=row
        });
        
        let table =
        `
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">Nombre</th>
                      <th scope="col" class="px-6 py-3">MonthDay</th>
                      <th scope="col" class="px-6 py-3">Monto</th>
                      <th scope="col" class="px-6 py-3">Moneda</th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}
                </tbody>
            </table>
        </div>
        `
        modalContent.innerHTML=table
      }
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
            title: `${sub.Nombre}`,
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
            title: 'Amount',
            titleTextStyle: {
              color: 'white'
            }
          },
          curveType:"none",
          'title':'Teorico vs Real',
          'width':400,
          'height':300,
          'backgroundColor': 'transparent',
          'chartArea':{width:'100%',height:'70%'},
          'titleTextStyle':{color:'white'},
          'colors':['#fcff58','#20a500']
          
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