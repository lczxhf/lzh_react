// import React from 'react'
// import ReactDOM from 'react-dom'
import '../css/company_manage.css';
import $ from "jquery"
import Common from "../js/common-method.js"
import Search from "./search.js"
import Pagination from "./pagination.js"
import AllTableData from "./all_table_data.js"

let Content = React.createClass({
  getInitialState: function(){
    return Common.reactInit()
  },
  getDefaultProps: function(){
    return Common.reactSetProps()
  },
  onChildChanged: function(hash){
       this.setState(hash);
  },
  onClickSearch: function(beginDate,endDate){
    var param = {companyID:this.props.companyID,beginDate:beginDate,endDate:endDate}
    console.log(param)
    $.get(this.props.host+this.props.get_all_data,param,function(obj){
            if(obj.code == 200 && obj.data != ""){
              this.setState({data:obj.data,page:1,count:Math.ceil(obj.data.length/this.props.pageNum),beginDate:beginDate,endDate:endDate});
            }else{
              this.setState({data:null});
            }
    }.bind(this),'json')
  },
  componentWillMount: function(){
    var end = new Date();
    var begin = new Date(end.getTime()-24*3600*6*1000)
    this.onClickSearch(parseInt(begin.getTime()/1000),parseInt(end.getTime()/1000))
  },
  render: function(){
    return(
      <div>
        <Search clickCallBack={this.onClickSearch}  csvUrl={this.props.host+this.props.generate_csv+"?companyID="+this.props.companyID+"&beginDate="+this.state.beginDate+"&endDate="+this.state.endDate} beginDate={this.state.beginDate} endDate={this.state.endDate}/>
        <AllTableData page={this.state.page}  data={this.state.data} pageNum={this.props.pageNum} user_page={"staff_manage.html?companyID="+this.props.companyID+"&beginDate="+this.state.beginDate+"&endDate="+this.state.endDate}/>
        <Pagination page={this.state.page} callbackParent={this.onChildChanged} count={this.state.count}/>
      </div>
    )
  }
})
ReactDOM.render(<Content />,document.getElementById("content"))
