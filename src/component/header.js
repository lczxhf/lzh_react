let Header = React.createClass({
  render: function(){
    return (
      <div className="header">
          <div className="title"><span id="title">SENSETIME考勤统计</span></div>
          <div className="menu">
            <ul>
              <li><a href="attendance.html"><div className="menu-icon icon-tubiao"></div><span>考勤详情</span></a></li>
              <li><a href={"chart.html?beginDate="+this.props.beginDate+"&endDate="+this.props.endDate}><div className="menu-icon icon-tongji"></div><span>统计图</span></a></li>
            </ul>
          </div>
      </div>
    )
  }
})

export default Header
