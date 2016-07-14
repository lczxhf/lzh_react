// import React from 'react'
import Common from "../js/common-method.js"
let SingleTableDate = React.createClass({
  getDurationInfo: function(obj){
    var the_date = Common.getFormDate(obj.theDate)
    var first_sign =  Common.getFormTime(obj.records[0].record[0].dateSign)
    var last_sign = Common.getFormTime(obj.records[0].record[obj.records[0].record.length-1].dateSign)
    var duration_time = obj.records[0].countSamePlace
    return [the_date,first_sign,last_sign,duration_time]
  },
  render: function(){
    if(this.props.data == null){
      return <div className="data-table">
        <table id="data">
            <tbody>
                <tr><th>日期</th><th>开始时间</th><th>结束时间</th></tr>
                <tr className="data-tr"><td colSpan="10" className="nodata">暂无数据!...</td></tr>
             </tbody>
             </table>
             </div>
    }
    else{
      var page = this.props.page,
          start = (page-1)*this.props.pageNum,
          arr = this.props.data.details.slice(start,start+this.props.pageNum),
          order = start,
          result = null
      return (
            <div className="data-table">
              <table id="data">
            <tbody>
                <tr><th>日期</th><th>开始时间</th><th>结束时间</th><th>打卡次数</th></tr>
                {
                  arr.map(function(sub){
                     order++;
                     result = this.getDurationInfo(sub)
                     return (
                            <tr className="data-tr" key={order}>
                              <td>{result[0]}</td>
                              <td>{result[1]}</td>
                              <td>{result[2]}</td>
                              <td>{result[3]}</td>
                            </tr>
                          )
                  }.bind(this))
                }
             </tbody>
             </table>
             </div>
           )
    }
  }
})

export default SingleTableDate
