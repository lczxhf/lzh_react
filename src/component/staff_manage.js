// import React from 'react'
// import ReactDOM from 'react-dom'
import '../css/company_manage.css';
import $ from "jquery"
import Common from "../js/common-method.js"
import Search from "./search.js"
import Pagination from "./pagination.js"
import SingleTableData from "./single_table_data.js"
import Info from "./info.js";
import Header from "./header.js"

let Content = React.createClass({
  getInitialState: function(){
    return Common.reactSubInit()
  },
  getDefaultProps: function(){
    return Common.reactSetProps()
  },
  onChildChanged: function(hash){
       this.setState(hash);
  },
  onClickSearch: function(beginDate,endDate){
    var param = {companyID:this.props.companyID,beginDate:beginDate,endDate:endDate,userID:this.state.userID}
    $.get(this.props.host+this.props.get_single_data,param,function(obj){
          if(obj.code == 200 && obj.data != ""){
            this.setState({data:obj.data,page:1,count:Math.ceil(obj.data.details.length/this.props.pageNum),beginDate:param.beginDate,endDate:param.endDate});
          }else{
            this.setState({data:null});
          }
    }.bind(this),'json')
  },
  componentWillMount: function(){
    this.onClickSearch(this.state.beginDate,this.state.endDate)
  },
  render: function(){
    return(
      <div>
        <Header beginDate={this.state.beginDate} endDate={this.state.endDate}/>
        <Search clickCallBack={this.onClickSearch}  csvUrl={this.props.host+this.props.generate_csv+"?companyID="+this.props.companyID+"&beginDate="+this.state.beginDate+"&endDate="+this.state.endDate+"&userID="+this.state.userID} beginDate={this.state.beginDate} endDate={this.state.endDate}/>
        {
           this.state.data ? <Info name={this.state.data.name} workTime={this.state.data.durationAll/3600} durationTime={this.state.data.countAll}/> : <Info />
        }
        <SingleTableData page={this.state.page}  data={this.state.data} pageNum={this.props.pageNum}/>
        <Pagination page={this.state.page} callbackParent={this.onChildChanged} count={this.state.count}/>
      </div>
    )
  }
})
ReactDOM.render(<Content />,document.getElementById("content"))
