// import React from 'react'
let AllTableDate = React.createClass({
  render: function(){
    if(this.props.data == null){
      return <div className="data-table">
        <table id="data">
            <tbody>
                <tr><th>排名</th><th>姓名</th><th>总工作时长</th><th>部门名称</th><th>请假天数</th></tr>
                <tr className="data-tr"><td colSpan="10" className="nodata">暂无数据!...</td></tr>
             </tbody>
             </table>
             </div>
    }
    else{
      var page = this.props.page,
          start = (page-1)*this.props.pageNum,
          arr = this.props.data.slice(start,start+this.props.pageNum),
          order = start
      return (
            <div className="data-table">
              <table id="data">
            <tbody>
                <tr><th>排名</th><th>姓名</th><th>总工作时长</th><th>部门名称</th><th>请假天数</th><th>操作</th></tr>
                {
                  arr.map(function(sub){
                     order++;
                     return (<tr className="data-tr">
                              <td>{order}</td>
                              <td>{sub.name}</td>
                              <td>{(sub.duration/3600).toFixed(2)}</td>
                              <td>{sub.departmentName}</td>
                              <td>{sub.leaveDays}</td>
                              <td><a className="staff_info" target="_blank" href={this.props.user_page+"&userID="+sub.userID}>详情</a></td>
                            </tr>)
                  }.bind(this))
                }

             </tbody>
             </table>
             </div>
           )
    }
  }
})

export default AllTableDate
