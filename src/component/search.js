// import React from 'react'
// import ReactDOM from 'react-dom'
import Common from "../js/common-method.js"
let Search = React.createClass({
  handleClick: function(){
    var beginDate = parseInt((new Date(this.refs.beginDate.value).getTime())/1000);
    var endDate = parseInt((new Date(this.refs.endDate.value).getTime())/1000);
    if((beginDate > endDate) || isNaN(beginDate) || isNaN(endDate)){
       alert("请输入正确的日期!")
       return
    }
    this.props.clickCallBack(beginDate,endDate)
  },

  handleFocus: function(event){
     setday(event.target,"yyyy-MM-dd",'2016-01-01','2117-01-01',1)
  },
  render: function(){
    return (
    <div className="search">
        <a href={this.props.csvUrl}><span className="download"></span></a>
        <span className="date-icon"></span>
        <input type="text" id="beginDate"  onFocus={this.handleFocus} readOnly="readonly" ref="beginDate" value={Common.getFormDate(this.props.beginDate)}/>
        <span>---</span>
        <input type="text" id="endDate"  onFocus={this.handleFocus} readOnly="readonly" ref="endDate" value={Common.getFormDate(this.props.endDate)}/>
        <button id="search" onClick={this.handleClick}></button>
    </div>
    )
  }
})

export default Search
