class Common{
  static getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!==null)return  unescape(r[2]); return null;
  }

  static getFormTime(strTime){
    var date = new Date(strTime*1000);
    return this.formDateTime(date.getHours())+":"+this.formDateTime(date.getMinutes())+":"+this.formDateTime(date.getSeconds());
  }

  static getFormDate(strTime){
    var date = new Date(strTime*1000);

    return this.formDateTime(date.getFullYear())+"-"+this.formDateTime(date.getMonth()+1)+"-"+this.formDateTime(date.getDate());
  }

  static formDateTime(date){
    if (date < 10){
       return "0"+date;
    }else{
      return date;
    }
  }

  static reactInit(){
    return {
      page: null,
      data: null,
      count:0,
      beginDate: null,
      endDate: null
    }
  }

  static reactSubInit(){
    return {
      page: null,
      data: null,
      count:0,
      beginDate: this.getQueryString("beginDate"),
      endDate: this.getQueryString("endDate"),
      userID: this.getQueryString("userID")
    }
  }

  static reactSetProps(){
    return {
      pageNum: 30,
      companyID: 1,
      host:"http://192.168.2.248:60080",
      generate_csv: "/rack/generate_csv",
      get_all_data: "/rack/fs_select_company_working_duration",
      get_single_data:"/rack/fs_select_member_working_record"
    }
  }
}

export default Common
