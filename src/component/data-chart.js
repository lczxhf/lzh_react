import '../css/company_manage.css'
import $ from "jquery"
import Chart from "chart.js"
import Common from "../js/common-method.js"
import Header from "./header.js"
import Search from "./search.js"

let Content = React.createClass({
  getInitialState: function(){
    return {
      type: 'bar',
      data:{
        labels: [],
        datasets:[{
            label:"",
            data:[],
            backgroundColor:""
        }]
      },
      options: null,
      beginDate: Common.getQueryString("beginDate"),
      endDate:   Common.getQueryString("endDate")
    }
  },
  getDefaultProps: function(){
    var props = Common.reactSetProps()
    props.top = 10
    return props
  },
  formatOption: function(){
    var options = {
              responsive: true,
              hover:{
                mode: 'label'
              },
              title: {
                display: true,
                position: 'top',
                text: '',
                fontSize:24
              }
            }
    var result = "";
    for (var i = 0; i <= arguments.length-1; i++) {
      if(i==(arguments.length-1)){
        eval("options"+result+"='"+arguments[i]+"'")
      }else{
        result += "['"+arguments[i]+"']"
      }
    }
    return options
  },
  setOption :function(beginDate,endDate){
    beginDate = Common.getFormDate(beginDate)
    endDate = Common.getFormDate(endDate)
    return this.formatOption("title","text",beginDate+"至"+endDate)
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
  generateData: function(beginDate,endDate){
    if(beginDate && endDate){
        var param = {companyID:this.props.companyID,beginDate:beginDate,endDate:endDate}
        $.get(this.props.host+this.props.get_all_data,param,function(obj){
                if(obj.code == 200 && obj.data != ""){
                  this.setState({data:this.formatData(obj.data),beginDate:beginDate,endDate:endDate,options:this.setOption(beginDate,endDate)});
                }else{
                  this.setState({data:null});
                }
        }.bind(this),'json')
    }
  },
  formatData: function(origin_data){
      var labels = []
      var datasets = []
      var backgroundColor = []
      var label = "工作时长"
      var data = []
      origin_data.slice(0,this.props.top).map(function(sub){
          backgroundColor.push(this.randomColor())
          labels.push(sub.name+"("+sub.departmentName+")")
          data.push((sub.duration/3600).toFixed(2))
      }.bind(this))
      datasets.push({
          label:label,
          data:data,
          backgroundColor:backgroundColor
      })
      return{
        labels: labels,
        datasets:datasets
      }
  },
  componentDidMount: function(){
      this.generateData(this.state.beginDate, this.state.endDate)
  },
  componentDidUpdate:function(){
      if(window.chart){
        window.chart.destroy();
        window.chart.update();
      }
      var ctx = this.refs.my_canvas.getContext("2d");
      window.chart = new Chart(ctx,{type:this.state.type,data:this.state.data,options:this.state.options})
  },
  render: function(){
    return (
      <div>
      <Header beginDate={this.state.beginDate} endDate={this.state.endDate}/>
      <Search clickCallBack={this.generateData}   beginDate={this.state.beginDate} endDate={this.state.endDate}/>
      <canvas id="myChart" width='400' height='400' ref="my_canvas"></canvas>
      </div>
    )
  }
})

ReactDOM.render(<Content />,document.getElementById("content"))
