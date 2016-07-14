import Chart from "chart.js"
import '../css/company_manage.css';

let Content = React.createClass({
  getInitialState: function(){
    return {

    }
  },
  getDefaultProps: function(){
    return {

    }
  },
  randomScalingFactor:function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  },
  randomColorFactor: function(){
    return Math.round(Math.random() * 255);
  },
  randomColor: function(){
    return 'rgba(' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',.7)';
  },
  componentDidMount: function(){
    var barChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: [this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor()],
                data: [this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor()]
            }, {
                hidden: true,
                label: 'Dataset 2',
                backgroundColor: [this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor()],
                data: [this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor()]
            }, {
                label: 'Dataset 3',
                backgroundColor: [this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor(),this.randomColor()],
                data: [this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor()]
            }]

        };
    var config = {
    type: 'bar',
    data:barChartData,
    options: {
        responsive: true,
        hover:{
          mode: 'dataset'
        },
        title: {
          display: true,
          position: 'top',
          text: '2016-07-01至2016-07-31',
          fontSize:24
        },
        legend: {
          // onClick: function(a,b){console.log(this);Chart.defaults.global.legend.onClick.bind(this,a,b)()},
        },
        tooltips:{
          enabled: true,
          mode: 'single',
          callbacks:{
            // beforeTitle: function(a,b){return 'beforeTitle'},
            // title: function(a,b){return 'title'},
            // afterTitle:function(a,b){return 'afterTitle'},
          }
        },
        scales: {
            yAxes: [{
                stacked: false
            }],
            xAxes:[{
                stacked: false,
                categoryPercentage: 0.5,
                barPercentage: 0.9
            }]
        }
    }
}

    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx,config)
    // Chart.defaults.global.hover.mode = 'single'
    // var ctx1 = document.getElementById("youChart").getContext("2d");
    // var myNewChart1 = new Chart(ctx1,config)
  },
  render: function(){
    return (
      <div>
      <canvas id="myChart" width='400' height='400'></canvas>
      <canvas id="youChart" width='400' height='400'></canvas>
      </div>
    )
  }
})

ReactDOM.render(<Content />,document.getElementById("content"))
