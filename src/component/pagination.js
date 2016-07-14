// import React from 'react'
let Pagination = React.createClass({
  handleClick: function(page){
    if(page <= 1){
      page = 1;
    }else if (page >= this.props.count){
      page = this.props.count
    }
     this.props.callbackParent({page:page})
  },
  render: function(){
     if(this.props.page == null){
        return <div className="pagination"></div>
     }else{
       var result = [];
       var count = this.props.count
       var page = (this.props.page-2)>1 ? (this.props.page-2) : 1
       for (var i = 0; i < 5; i++) {
         if(page <= count){
           if(page == this.props.page){
             result.push(<li className="pagination-active">{page}</li>)
           }else{
             result.push(<li onClick={this.handleClick.bind(this,page)}>{page}</li>)
           }
         }
         page++;
       }
       return (
         <div className="pagination">
            <ul>
              <li onClick={this.handleClick.bind(this,1)}>{"<<"}</li>
              <li onClick={this.handleClick.bind(this,this.props.page-1)}>{'<'}</li>
              {result}
              <li onClick={this.handleClick.bind(this,this.props.page+1)}>{'>'}</li>
              <li onClick={this.handleClick.bind(this,this.props.count)}>{">>"}</li>
              <span className="page-count">共{this.props.count}页</span>
            </ul>

        </div>
      )
     }
   }
})

export default Pagination
