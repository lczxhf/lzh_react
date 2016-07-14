var Info = React.createClass({
  render: function(){
    if(this.props.name == null){
      return <div></div>
    }else{
      return (
        <div className="record-info">
          <span className="record-name">{this.props.name}</span>
          <span className="work-time">工作时间:约{parseInt(this.props.workTime)}小时</span>
          <span className="duration-time">打卡次数:{this.props.durationTime}</span>
        </div>
      )
    }
  }
})

export default Info
