
/**

  Webuddha wbTeamPro
  (c)2010 Webuddha.com, The Holodyn Corporation - All Rights Reserved

  Build with elements from http://www.jsgantt.com/

**/

var jQueryGantt = function(el, cfg){

  // Class Instance
  var ganttInst = this;

  // Object Definitions
  this.instance     = 'inst' + Math.floor(Math.random()*10000);
  this.container    = jQuery(el).data('ganttInst', this);
  this.chartDiv     = null;
  this.htmlElements = {};
  this.taskList     = [];
  this.config       = {
    'vViewOnly':          false,
    'vFormat':            'day',              // day, month
    'vCaptionType':       'resource',
    'vDateInputFormat':   'mm/dd/yyyy',
    'vDateDisplayFormat': 'mm/dd/yyyy',
    'vShowRes':           1,
    'vShowDur':           1,
    'vShowComp':          1,
    'vShowStartDate':     1,
    'vShowEndDate':       1,
    'vCalcDateRange':     0,
    'vForceBoundaries':   0,
    'vMinRows':           36,
    'vNameHeader':        'Action Name',
    'vMinCalOffset':      45,
    'vMaxCalOffset':      45
    };
  this.data         = {
    'vChartOffset':       {'left':0,'top':0},
    'vIsRendered':        0,
    'vNumUnits':          0,
    'vDepId':             1,
    'vFormatArr':         ['day','week','month','quarter'],
    'vQuarterArr':        [1,1,1,2,2,2,3,3,3,4,4,4],
    'vMonthDaysArr':      [31,28,31,30,31,30,31,31,30,31,30,31],
    'vMonthArr':          ['January','February','March','April','May','June','July','August','September','October','November','December']
    };
  jQuery.extend(this.config,cfg);

  // Localize with Main JS
  _addon_wbteampro.projectActionList.formWrapID = 'jQueryGanttTaskEditor';

  /********************************************************************
  Add Task to Stack
  ********************************************************************/
  this.addTaskItem = function(taskCfg){
    if( typeof(taskCfg) == 'object' && taskCfg['id'] ){
      var taskItem = new function(){

        this.ganttInst        = ganttInst;
        this.vID              = 0;
        this.vProjectID       = 0;
        this.vName            = '';
        this.vColor           = '';
        this.vLink            = '';
        this.vResource        = '';
        this.vComp            = 0;
        this.vParent          = 0;
        this.vChildren        = [];
        this.vOpen            = 1;
        this.vPredecessors    = [];
        this.vSuccessors      = [];
        this.vCaption         = '';
        this.vType            = '';
        this.vMile            = 0;
        this.vGroup           = 0;
        this.vStart           = ganttInst.getDateObj();
        this.vEnd             = ganttInst.getDateObj();
        this.vLevel           = 0;
        this.vNumKid          = 0;
        this.vVisible         = 1;
        this.x1               = 0;
        this.y1               = 0;
        this.x2               = 0;
        this.y2               = 0;

        this.setName          = function(pVal){ this.vName = pVal; };
        this.setParent        = function(pVal){ this.vParent = pVal; };
        this.setResource      = function(pVal){ this.vResource = pVal; };
        this.setType          = function(pVal){ this.vType = pVal; };
        this.setMile          = function(pVal){ this.vMile = pVal ? 1 : 0; };
        this.setGroup         = function(pVal){ this.vGroup = (!this.vMile && pVal ? 1 : 0); };
        this.setChildren      = function(pVal){ this.vChildren = (typeof(pVal)=='array' ? pVal : (typeof(pVal)=='string' ? String(pVal).split(',') : [])); this.setGroup(this.vChildren.length > 0); }
        this.setPredecessors  = function(pVal){ this.vPredecessors = (typeof(pVal)=='array' ? pVal : (typeof(pVal)=='string' ? String(pVal).split(',') : [])); };
        this.setSuccessors    = function(pVal){ this.vSuccessors = (typeof(pVal)=='array' ? pVal : (typeof(pVal)=='string' ? String(pVal).split(',') : [])); };
        this.setStart         = function(pVal){ this.vStart = pVal; };
        this.setEnd           = function(pVal){ this.vEnd = pVal; };
        this.setLevel         = function(pVal){ this.vLevel = pVal; };
        this.setNumKid        = function(pVal){ this.vNumKid = pVal; };
        this.setCompVal       = function(pVal){ this.vComp = Math.round(pVal); };
        this.setStartX        = function(pVal){ this.x1 = pVal; };
        this.setStartY        = function(pVal){ this.y1 = pVal; };
        this.setEndX          = function(pVal){ this.x2 = pVal; };
        this.setEndY          = function(pVal){ this.y2 = pVal; };
        this.setOpen          = function(pVal){ this.vOpen = pVal; };
        this.setVisible       = function(pVal){ this.vVisible = pVal; };

        this.getID            = function(){ return this.vID };
        this.getProjectID     = function(){ return this.vProjectID };
        this.getName          = function(){ return this.vName };
        this.getStart         = function(){ return this.vStart};
        this.getEnd           = function(){ return this.vEnd  };
        this.getColor         = function(){ return this.vColor};
        this.getLink          = function(){ return this.vLink };
        this.getType          = function(){ return this.vType };
        this.getMile          = function(){ return this.vMile };
        this.getPredecessors  = function(){ return this.vPredecessors; };
        this.getCaption       = function(){ return (this.vCaption ? this.vCaption : ''); };
        this.getResource      = function(){ return (this.vResource ? this.vResource : '&nbsp'); };
        this.getCompVal       = function(){ return (this.vComp ? this.vComp : 0); };
        this.getCompStr       = function(){ return this.getCompVal() + '%'; };
        this.getParent        = function(){ return this.vParent };
        this.getChildren      = function(){ return this.vChildren; }
        this.getGroup         = function(){ return this.vGroup };
        this.getOpen          = function(){ return this.vOpen };
        this.getLevel         = function(){ return this.vLevel };
        this.getNumKids       = function(){ return this.vNumKid };
        this.getStartX        = function(){ return this.x1 };
        this.getStartY        = function(){ return this.y1 };
        this.getEndX          = function(){ return this.x2 };
        this.getEndY          = function(){ return this.y2 };
        this.getVisible       = function(){ return this.vVisible };
        this.getDuration      = function(){
          var vFormat = this.ganttInst.config.vFormat;
          if (this.vMile){
            vDuration = '-';
          } else if (vFormat=='hour'){
          } else if (vFormat=='minute') {
          } else {
            var tmpPer = this.ganttInst.getTotalDays(this.getEnd(), this.getStart()) + 1;
            if(tmpPer == 1) vDuration = '1 Day';
              else vDuration = tmpPer + ' Days';
          }
          return vDuration;
        };

        if( taskCfg['id'] ) this.vID = taskCfg['id'];
        if( taskCfg['projectId'] ) this.vProjectID = taskCfg['projectId'];
        if( taskCfg['name'] ) this.vName = taskCfg['name'];
        if( taskCfg['color'] ) this.vColor = taskCfg['color'];
        if( taskCfg['url'] ) this.vLink = taskCfg['url'];
        if( taskCfg['resource'] ) this.vResource = taskCfg['resource'];
        if( taskCfg['completed'] ) this.vComp = Math.round(taskCfg['completed']);
        if( taskCfg['parentId'] ) this.vParent = taskCfg['parentId'];
        if( taskCfg['isOpen'] ) this.vOpen = taskCfg['isOpen'];
        if( taskCfg['predList'] ) this.setPredecessors(taskCfg['predList']);
        if( taskCfg['succList'] ) this.setSuccessors(taskCfg['succList']);
        if( taskCfg['caption'] ) this.vCaption = taskCfg['caption'];
        if( taskCfg['type'] ) this.vType = taskCfg['type'];
        if( taskCfg['type'] == 'milestone' ) this.setMile(1);
        if( taskCfg['type'] == 'group' ) this.setGroup(1);
        if( taskCfg['start_raw'] ) this.vStart = this.ganttInst.parseDateStr(taskCfg['start_raw'] );
        if( taskCfg['finish_raw'] ) this.vEnd = this.ganttInst.parseDateStr(taskCfg['finish_raw'] );
        if( taskCfg['dateStart'] ) this.vStart = this.ganttInst.parseDateStr(taskCfg['dateStart'], this.ganttInst.getDateInputFormat() );
        if( taskCfg['dateFinish'] ) this.vEnd = this.ganttInst.parseDateStr(taskCfg['dateFinish'], this.ganttInst.getDateInputFormat() );

      };
      this.taskList.push(taskItem);
      return taskItem;
    }
    return false;
  };

  /********************************************************************
  Setting / Returning Configuration
  ********************************************************************/
  this.getCfg = function(key,def){
    if( typeof(this.config[key]) == 'undefined' ) return def;
    return this.config[key];
  };
  this.setCfg = function(key,val){
    this.config[key] = val;
    return this.config[key];
  };
  this.setFormatArr = function()    {
    vFormatArr = [];
    for(var i = 0; i < arguments.length; i++) vFormatArr[i] = arguments[i];
    if(vFormatArr.length > 4) vFormatArr.length = 4;
  };
  this.setShowRes = function(pShow){ this.config.vShowRes = pShow; };
  this.setShowDur = function(pShow){ this.config.vShowDur = pShow; };
  this.setShowComp = function(pShow){ this.config.vShowComp = pShow; };
  this.setShowStartDate = function(pShow){ this.config.vShowStartDate = pShow; };
  this.setShowEndDate = function(pShow){ this.config.vShowEndDate = pShow; };
  this.setDateInputFormat = function(pShow){ this.config.vDateInputFormat = pShow; };
  this.setDateDisplayFormat = function(pShow){ this.config.vDateDisplayFormat = pShow; };
  this.setCaptionType = function(pType){ this.config.vCaptionType = pType };
  this.setFormat = function(pFormat){ this.config.vFormat = pFormat; this.render(); };
  this.getShowRes = function(){ return this.config.vShowRes };
  this.getShowDur = function(){ return this.config.vShowDur };
  this.getShowComp = function(){ return this.config.vShowComp };
  this.getShowStartDate = function(){ return this.config.vShowStartDate };
  this.getShowEndDate = function(){ return this.config.vShowEndDate };
  this.getDateInputFormat = function() { return this.config.vDateInputFormat };
  this.getDateDisplayFormat = function() { return this.config.vDateDisplayFormat };
  this.getCaptionType = function() { return String(this.config.vCaptionType).toLowerCase() };
  this.CalcTaskXY = function (){
    var vTaskDiv, vParDiv, vLeft, vTop, vHeight, vWidth;
    for(i = 0; i < this.taskList.length; i++){
      vID = this.taskList[i].getID();
      vParDiv  = document.getElementById('childgrid_'+vID);
      vBarDiv  = document.getElementById('bardiv_'+vID);
      if(vBarDiv) {
        this.taskList[i].setStartX( vBarDiv.offsetLeft );
        this.taskList[i].setStartY( vParDiv.offsetTop + vBarDiv.offsetTop + 6 );
        this.taskList[i].setEndX( vBarDiv.offsetLeft + vBarDiv.offsetWidth );
        this.taskList[i].setEndY( vParDiv.offsetTop + vBarDiv.offsetTop + 6 );
      };
    };
  };

  /********************************************************************
  ********************************************************************/
  this.isLeapYear = function(year){
    return (new Date(year, 1, 29).getMonth() == 1);
  }
  this.getDaysInMonth = function(year, month){
    return parseInt( new Date(year, month+1, 0).getDate() );
    /*
    if( month == 1 && this.isLeapYear(year) ) return 29;
    return this.data.vMonthDaysArr[ month ];
    */
  }
  this.getTotalDays = function(sDate,eDate){
  	if( typeof sDate !== 'object' )
  		sDate = Date.parse(sDate);
  	if( typeof eDate !== 'object' )
  		eDate = Date.parse(eDate);
  	return Math.ceil((sDate - eDate) / (24 * 60 * 60 * 1000));
  },
  this.getTotalMonths = function(sDate,eDate){
    var vTmpDate = (eDate.getFullYear() - sDate.getFullYear());
    var vRes =
      (vTmpDate > 1
      ? (((vTmpDate-1) * 12) + (11 - sDate.getMonth()) + (eDate.getMonth()+1))
      : (vTmpDate == 1
        ? ((11 - sDate.getMonth()) + (eDate.getMonth()+1))
        : (eDate.getMonth() - sDate.getMonth())
        )
      ) + 1;
    return vRes;
  }

  /********************************************************************
  ********************************************************************/
  this.toolTip = {
    'ganttInst': this,
    'mouseEv': null,
    'ptrpos': 0,
    'manualmode': false,
    'show': function( html ){
      if( html ) this.html( html );
      this.ganttInst.htmlElements.tooltip.css('display','block').css('opacity','1');
      return this;
    },
    'hide': function(){
      this.ganttInst.htmlElements.tooltip.css('display','none').css('opacity','0');
      if( this.mouseEv ) jQuery(document).unbind('mousemove',this.mouseEv);
      this.manualmode = false;
      return this;
    },
    'html': function( html ){
      this.ganttInst.htmlElements.tooltip.find('.txt .pad').html(html);
      if( html ) return this; return html;
    },
    'position': function(cfg){
      if( typeof(cfg) == 'boolean' && !this.manualmode ){
        if( this.mouseEv ) jQuery(document).unbind('mousemove',ganttInst.toolTip.mouseEv);
        this.mouseEv = function(e){ ganttInst.toolTip.position({'left': e.pageX - ganttInst.data.vChartOffset.left, 'top': e.pageY - ganttInst.data.vChartOffset.top }); };
        jQuery(document).bind('mousemove', this.mouseEv);
        return this;
      }
      if( typeof(cfg) == 'object' ){
        if( typeof(cfg.manualmode) == 'boolean' )
          this.manualmode = cfg.manualmode;
        var pp = this.ptrpos;
        if( (this.ptrpos && ((this.ganttInst.htmlElements.tooltip.offset().left + this.ganttInst.htmlElements.tooltip.width()) > Math.ceil(jQuery(window).width() / 2)))
          || (!this.ptrpos && ((this.ganttInst.htmlElements.tooltip.offset().left + this.ganttInst.htmlElements.tooltip.width()) > Math.ceil(jQuery(window).width() / 1.3))) ){
          if(!this.ptrpos){
            this.ganttInst.htmlElements.tooltip.find('.ptr').addClass('rt');
            this.ptrpos = 1;
          }
        } else if( this.ptrpos ){
          this.ptrpos = 0;
          this.ganttInst.htmlElements.tooltip.find('.ptr').removeClass('rt');
        }
        if( typeof(cfg.left) != 'undefined' ){
          if(this.ptrpos)
            this.ganttInst.htmlElements.tooltip.css('left',(cfg.left-205)+'px');
          else
            this.ganttInst.htmlElements.tooltip.css('left',(cfg.left-5)+'px');
        }
        if( typeof(cfg.top) != 'undefined' )
          this.ganttInst.htmlElements.tooltip.css('top',(cfg.top+20)+'px');
        return this;
      }
      return this.ganttInst.htmlElements.tooltip.position();
    },
    'init': function(){
      return jQuery('<div class="tooltip"><div class="ptr"></div><div class="txt"><div class="pad"></div></div></div>').appendTo(this.ganttInst.chartDiv);
    }
  };

  /********************************************************************
  ********************************************************************/
  this.getTask = function(pId)  {
    for(var i = 0; i < this.taskList.length; i++){
      if(this.taskList[i].getID()==pId)
        return this.taskList[i];
    }
  };

  /********************************************************************
  ********************************************************************/
  this.orderTaskList = function(pID){
    var newList = [];
    if( !pID ) pID = 0;
    for(var i = 0; i < this.taskList.length; i++){
      if( pID == this.taskList[i].getParent() ){
        newList.push( this.taskList[i] );
        var tmpList = this.orderTaskList(this.taskList[i].getID());
        if( tmpList.length )
          for(var t = 0; t < tmpList.length; t++)
            newList.push( tmpList[t] );
      }
    }
    return newList;
  }

  /********************************************************************
  ********************************************************************/
  this.prepTaskList = function(pList, pID, pRow, pLevel, pOpen){
    var vMinDate = this.getDateObj();
    var vMaxDate = this.getDateObj();
    var vMinSet  = 0;
    var vMaxSet  = 0;
    var vList    = pList;
    var vLevel   = pLevel;
    var i        = 0;
    var vNumKid  = 0;
    var vCompSum = 0;
    var vVisible = pOpen;
    for(i = 0; i < pList.length; i++){
      if(pList[i].getParent() == pID) {
        vVisible = pOpen;
        pList[i].setVisible(vVisible);
        if(vVisible==1 && pList[i].getOpen() == 0){ vVisible = 0; }
        pList[i].setLevel(vLevel);
        vNumKid++;
        if(pList[i].getGroup() == 1) {
          this.prepTaskList(vList, pList[i].getID(), i, vLevel+1, vVisible);
        };
        if( vMinSet==0 || pList[i].getStart() < vMinDate) {
          vMinDate = pList[i].getStart();
          vMinSet = 1;
        };
        if( vMaxSet==0 || pList[i].getEnd() > vMaxDate) {
          vMaxDate = pList[i].getEnd();
          vMaxSet = 1;
        };
        vCompSum += pList[i].getCompVal();
      }
    }
    if(pRow >= 0) {
      if( this.getCfg('vCalcDateRange') ){
        pList[pRow].setStart(vMinDate);
        pList[pRow].setEnd(vMaxDate);
      }
      pList[pRow].setNumKid(vNumKid);
      pList[pRow].setCompVal(Math.ceil(vCompSum/vNumKid));
    }
  };

  /********************************************************************
  ********************************************************************/
  this.getDateObj = function(y,m,d,h,i,s,ms){
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
    var tmp = new Date();
    if(y) tmp.setFullYear(y);
    if(m) tmp.setMonth(m);
    if(m) tmp.setDate(d);
    tmp.setHours( h ? h : 0 );
    tmp.setMinutes( i ? i : 0 );
    tmp.setSeconds( s ? s : 0 );
    return tmp;
  }

  /********************************************************************
  ********************************************************************/
  this.getMinDate = function(){
    var pFormat = this.config.vFormat;
    var vDate = this.getDateObj();
    vDate.setFullYear(this.taskList[0].getStart().getFullYear(), this.taskList[0].getStart().getMonth(), this.taskList[0].getStart().getDate());
    for(i = 0; i < this.taskList.length; i++){
      if(Date.parse(this.taskList[i].getStart()) < Date.parse(vDate))
        vDate.setFullYear(this.taskList[i].getStart().getFullYear(), this.taskList[i].getStart().getMonth(), this.taskList[i].getStart().getDate());
    }
    if ( pFormat== 'minute') {
    } else if (pFormat == 'hour' ) {
    } else if (pFormat=='day') {
      vDate.setDate(vDate.getDate() - this.config.vMinCalOffset); //1);
      while(vDate.getDay() > 0)
        vDate.setDate(vDate.getDate() - 1);
    } else if (pFormat=='week') {
    } else if (pFormat=='month') {
      vDate.setDate(1);
      if(vDate.getMonth() <= 2)
        vDate.setMonth( vDate.getMonth()-12 );
      while(vDate.getMonth() > 0)
        vDate.setMonth( vDate.getMonth()-1 );
    } else if (pFormat=='quarter') {
    };
    return(vDate);
  };

  /********************************************************************
  ********************************************************************/
  this.getMaxDate = function(){
    var pFormat = this.config.vFormat;
    var vDate = this.getDateObj();
    vDate.setFullYear(this.taskList[0].getEnd().getFullYear(), this.taskList[0].getEnd().getMonth(), this.taskList[0].getEnd().getDate());
    // Parse all Task End dates to find max
    for(i = 0; i < this.taskList.length; i++){
      if(Date.parse(this.taskList[i].getEnd()) > Date.parse(vDate)){
        vDate.setTime(Date.parse(this.taskList[i].getEnd()));
      }
    }
    if (pFormat == 'minute'){
    } else if (pFormat == 'hour') {
    }
    // Adjust max date to specific format boundaries (end of week or end of month)
    else if (pFormat=='day'){
      vDate.setDate(vDate.getDate() + this.config.vMaxCalOffset); //1);
      while(vDate.getDay() < 6)
        vDate.setDate(vDate.getDate() + 1);
    } else if (pFormat=='week'){
    }
    // Set to last day of current Month
    else if (pFormat=='month'){
      vDate.setDate(1);
      vDate.setMonth( vDate.getMonth()+24 );
      while(vDate.getMonth() < 11)
        vDate.setMonth( vDate.getMonth()+1 );
      vDate.setDate(this.getDaysInMonth(vDate.getFullYear(),vDate.getMonth()));
    }
    // Set to last day of current Quarter
    else if (pFormat=='quarter'){
    }
    return(vDate);
  };

  /********************************************************************
  ********************************************************************/
  this.formatDateStr = function(pDate,pFormatStr) {
    vYear4Str = pDate.getFullYear() + '';
    vYear2Str = vYear4Str.substring(2,4);
    vMonthStr = (pDate.getMonth()+1) + '';
    if( String(vMonthStr).length < 2 ) vMonthStr = '0' + vMonthStr;
    vDayStr   = pDate.getDate() + '';
    if( String(vDayStr).length < 2 ) vDayStr = '0' + vDayStr;
    var vDateStr = '';
    switch(pFormatStr) {
      case 'Y':           return( pDate.getFullYear() );
      case 'F Y':         return( this.data.vMonthArr[pDate.getMonth()] + ' ' + pDate.getFullYear() );
      case 'mm/yyyy':     return( vMonthStr + '/' + vYear4Str );
      case 'mm/dd/yyyy':  return( vMonthStr + '/' + vDayStr + '/' + vYear4Str );
      case 'dd/mm/yyyy':  return( vDayStr + '/' + vMonthStr + '/' + vYear4Str );
      case 'yyyy-mm-dd':  return( vYear4Str + '-' + vMonthStr + '-' + vDayStr );
      case 'mm/dd/yy':    return( vMonthStr + '/' + vDayStr + '/' + vYear2Str );
      case 'dd/mm/yy':    return( vDayStr + '/' + vMonthStr + '/' + vYear2Str );
      case 'yy-mm-dd':    return( vYear2Str + '-' + vMonthStr + '-' + vDayStr );
      case 'mm/dd':       return( vMonthStr + '/' + vDayStr );
      case 'dd/mm':       return( vDayStr + '/' + vMonthStr );
    }
    return $.datepicker.formatDate(pFormatStr, pDate);
  };

  /********************************************************************
  Parse Raw Date, return Date Object
  ********************************************************************/
  this.parseDateStr = function(pDateStr,pFormatStr) {
    if( typeof(pDateStr) == 'undefined' ) return this.getDateObj();
    var vDate = this.getDateObj();
    switch(pFormatStr){
      case 'mm/dd/yyyy':
        var vDateParts = pDateStr.split('/');
        vDate.setTime( Date.parse(pDateStr) );
        vDate.setFullYear(parseInt(vDateParts[2], 10), parseInt(vDateParts[0], 10) - 1, parseInt(vDateParts[1], 10));
        break;
      case 'dd/mm/yyyy':
        var vDateParts = pDateStr.split('/');
        vDate.setTime( Date.parse(pDateStr) );
        vDate.setFullYear(parseInt(vDateParts[2], 10), parseInt(vDateParts[1], 10) - 1, parseInt(vDateParts[0], 10));
        break;
      case 'yyyy-mm-dd':
        var vDateParts = pDateStr.split('-');
        vDate.setTime( Date.parse(pDateStr) );
        vDate.setFullYear(parseInt(vDateParts[0], 10), parseInt(vDateParts[1], 10) - 1, parseInt(vDateParts[2], 10));
        break;
      default:
      case 'timestamp':
        vDate.setTime( pDateStr*1000 );
        break;
    }
    return(vDate);
  };

  /********************************************************************
  Edit Task Row
  ********************************************************************/
  this.projectActionEdit = {

    'ganttInst': this,

    'saveTaskItem': function(taskItem){
      var fields = {
        'action_id':    taskItem.getID(),
        'date_start':   this.ganttInst.formatDateStr(taskItem.getStart(),'yyyy-mm-dd'),
        'date_finish':  this.ganttInst.formatDateStr(taskItem.getEnd(),'yyyy-mm-dd'),
        'format':       'basic',
        'view':         'raw',
        'task':         'project.action.gantt.edit',
        'act':          'update'
        };
      jQuery.getJSON("wbteampro.php", fields, function(data,stat,xhr){
        if( stat!='success' )
          alert('Error Storing Action: '+taskItem.getName()+' #'+taskItem.getID());
        });
    },

    'save': function(el,action_id,act){
      this.saveTaskEditor(el,action_id,act);
    },
    'saveTaskEditor': function(el,action_id,act){
      var div = this.ganttInst.htmlElements.divTaskEditor;
      var fields = {
        'view': 'raw',
        'task': 'project.action.gantt.edit',
        'act': 'apply'
        };
      jQuery('<div class="ajax-loading overlay">&nbsp;</div>').appendTo(div);
      jQuery(el).find('input,select,textarea').each(function(i,e){fields[ e.name ]=jQuery(e).val();});
      jQuery.getJSON("wbteampro.php", fields, function(data,stat,xhr){ ganttInst.projectActionEdit.saveTaskEditorReturn(el,fields,data,stat,xhr); });
    },

    'saveTaskEditorReturn': function(el,fields,data,stat,xhr){
      var div = this.ganttInst.htmlElements.divTaskEditor;
      if( div ){
        div.find('.ajax-loading').remove();
        if( data && data.error )
          return alert( data.error );
        var key, vData, vTask;
        if( fields.action_id == '' )
          return this.ganttInst.render();
        if( data && data.record ){
          vData = data.record;
          vTask = this.ganttInst.getTask(vData['action_id']);
          if( typeof(vTask) != 'undefined' ){
            if( vData['parent_action_id'] ) vTask.setParent( vData['parent_action_id'] );
          }
        }
        if( data && data.records ){
          for(key in data.records){
            vData = data.records[key];
            vTask = this.ganttInst.getTask(vData['id']);
            if( typeof(vTask) != 'undefined' ){
              if( vData['name'] ) vTask.setName( vData['name'] );
              if( vData['manager'] ) vTask.setResource( vData['manager'] );
              if( vData['assigned'] ) vTask.setResource( vData['assigned'] );
              if( vData['complete'] ) vTask.setCompVal( vData['complete'] );
              if( vData['start_raw'] ) vTask.setStart( this.ganttInst.parseDateStr(vData['start_raw'] ) );
              if( vData['finish_raw'] ) vTask.setEnd( this.ganttInst.parseDateStr(vData['finish_raw'] ) );
            }
          }
        }
        if( fields.act == 'save' )
          this.closeTaskEditor();
        return this.ganttInst.render();
      }
    },

    'close': function(el,action_id,act){
      this.closeTaskEditor(el,action_id,act);
    },
    'closeTaskEditor': function(el,action_id,act){
      var div = (this.ganttInst.htmlElements.divTaskEditor ? this.ganttInst.htmlElements.divTaskEditor : jQuery('#jQueryGanttTaskEditor'));
      jQuery(window).unbind('scroll', jQuery(div).data('scrollEvent'));
      jQuery(div).slideUp('fast',function(){
        var actionId = div.attr('action_id');
        if( actionId ) ganttInst.htmlElements.leftColTbl.find('tr[action_id='+actionId+']').removeClass('edit');
        div.remove();
        if( el ) ganttInst.projectActionEdit.openTaskEditor(el,action_id,act);
      });
      ganttInst.htmlElements.divTaskEditor = null;
    },

    'openTaskEditor': function(el, action_id, act){
      jQuery(el).closest('tr').addClass('edit');
      var act = (act ? act : 'edit');
      var div = this.ganttInst.htmlElements.divTaskEditor;
      if( div ){
        if( jQuery(div).hasClass(act+'-action'+action_id) )
          return this.closeTaskEditor();
        return this.closeTaskEditor(el,action_id,act);
      }
      div = this.ganttInst.htmlElements.divTaskEditor = jQuery('<div>')
        .attr('id', 'jQueryGanttTaskEditor')
        .attr('action_id', action_id)
        .addClass(String(act+'-action'+action_id+' tabItemEdit'))
        .css('position', 'absolute')
        .css('left', (this.ganttInst.container.find('#jQueryGanttLeft').width()) + 'px')
        .css('width', (this.ganttInst.container.width() - this.ganttInst.container.find('#jQueryGanttLeft').width()) + 'px')
        .css('height', (this.ganttInst.container.height()) + 'px')
        .appendTo(this.ganttInst.container);
      jQuery('<div class="ajax-loading">&nbsp;</div>').appendTo(div);
      var fields = {
        'view': 'raw',
        'task': 'project.action.gantt.edit',
        'jsObject': 'window.jQueryGanttStack.'+this.ganttInst.instance+'.projectActionEdit',
        'act': act,
        'display': 'gantt',
        'project_id': jQuery('#activerecordinfo').find('input[name=project_id]').val(),
        'action_id': (act=='new' ? 0 : action_id),
        'parent_action_id': (act=='new' ? action_id : 0)
        };
      jQuery.post("wbteampro.php", fields, function(data){
          jQuery(div).html( data );
          /**** Datepick ****/
          _addon_wbteampro.initDatePicker();
          _addon_wbteampro.initDateTimePicker();
          /**** Autogrow Areas ****/
          if( typeof(jQuery.AutoGrow2) == 'function' )
            jQuery(div).find("textarea.autogrow").AutoGrow2({minHeight:100,lineHeight:18});
          /**** subTabs ****/
          jQuery(div).find('div.subTabs a').each(function(n,el){
            jQuery(el).attr('href','javascript:void(0);');
            jQuery(el).click(function(){_addon_wbteampro.projectActionList.toggleSubTab(this);});
          });
          /**** Recurrence Form ****/
          if( _addon_wbteampro.projectActionList.recurFormMgr )
            _addon_wbteampro.projectActionList.recurFormMgr.init();
          /**** Maintain Top ****/
          var wrap = jQuery(div).children().get(0);
          jQuery(wrap)
            .css('position', 'absolute')
            .css('top', 0).css('left', 0)
            .css('width', jQuery(div).width() - jQuery(wrap).css('padding-left').replace(/px/,'') - jQuery(wrap).css('padding-right').replace(/px/,'') )
            .data('offset', jQuery(wrap).offset());
          jQuery(div)
            .data('scrollEvent', function(ev){
              var top = jQuery(window).scrollTop();
              if( top > jQuery(wrap).data('offset').top )
                jQuery(wrap).css('top', top - jQuery(wrap).data('offset').top );
              else
                jQuery(wrap).css('top', 0);
            });
          jQuery(window).bind('scroll', jQuery(div).data('scrollEvent')).scroll();
        });
    }

  };

  /********************************************************************
  Render Gantt Chart
  ********************************************************************/
  this.render = function(){
    var vMaxDate      = this.getDateObj();
    var vMinDate      = this.getDateObj();
    var vTmpDate      = this.getDateObj();
    var vNxtDate      = this.getDateObj();
    var vCurrDate     = this.getDateObj();
    var vTaskLeft     = 0;
    var vTaskRight    = 0;
    var vNumCols      = 0;
    var vID           = 0;
    var vMainTable    = "";
    var vLeftTable    = "";
    var vRightTable   = "";
    var vDateRowStr   = "";
    var vItemRowStr   = "";
    var vColWidth     = 0;
    var vColUnit      = 0;
    var vChartWidth   = 0;
    var vNumDays      = 0;
    var vUnitWidth    = 0;
    var vStr          = "";
    var vNameWidth    = 220;
    var vStatusWidth  = 70;
    var vRightWidth   = 482
    var tmpHtml       = '';
    if(this.taskList.length > 0){

      // Process all tasks preset parent date and completion %
      this.taskList = this.orderTaskList();
      this.prepTaskList(this.taskList, 0, -1, 1, 1);

      // Overall Chart Min/Max Date
      vMinDate = this.getMinDate();
      vMaxDate = this.getMaxDate();
      vNumDays = this.getTotalDays(vMaxDate, vMinDate);
      if( this.config.vFormat != 'month' && vNumDays > 730 ){
        this.config.vFormat = 'month';
        vMinDate = this.getMinDate();
        vMaxDate = this.getMaxDate();
        vNumDays = this.getTotalDays(vMaxDate, vMinDate);
      }

      if(this.config.vFormat == 'day') {
        vColWidth = 24;
        vColUnit  = 1;
      } else if(this.config.vFormat == 'week') {
        vColWidth = 37;
        vColUnit  = 7;
      } else if(this.config.vFormat == 'month') {
        vColWidth = 24;
        vColUnit  = 1;
      } else if(this.config.vFormat == 'quarter') {
        vColWidth = 60;
        vColUnit  = 90;
      } else if(this.config.vFormat=='hour') {
        vColWidth = 24;
        vColUnit  = 1;
      } else if(this.config.vFormat=='minute') {
        vColWidth = 24;
        vColUnit  = 1;
      }

      vNumUnits   = vNumDays / vColUnit;
      vChartWidth = vNumUnits * vColWidth + 1;
      vUnitWidth  = (vColWidth / vColUnit);

      var html = {};
      var doRightCol = false;

      // Build Main Table
      jQuery(this.container).css('position','relative');
      if( !this.chartDiv )
        this.chartDiv = jQuery('<div>')
          .addClass('jQueryGanttDisplayCell')
          .addClass( this.config.vFormat )
          .css('position','relative')
          .appendTo(this.container);
      jQuery(this.chartDiv)
        .css('visibility','hidden')
        .html('');
      html.mainTable = jQuery('<table cellpadding="0" cellspacing="0" border="0" id="jQueryGanttTable">').appendTo(this.chartDiv);
      html.mainRow = jQuery('<tr class="mainRow" valign="top">').appendTo(html.mainTable);
      html.leftCol = jQuery('<td class="leftCol">').appendTo(html.mainRow);
      html.centerCol = jQuery('<td class="centerCol">').appendTo(html.mainRow);
      html.centerColWrap = jQuery('<div class="centerColWrap">').appendTo(html.centerCol);
      if( doRightCol )
      	html.rightCol = jQuery('<td class="rightCol">').appendTo(html.mainRow);

      // Build Left Column
      html.leftColDiv = jQuery('<div class="leftColDiv" id="jQueryGanttLeft">').appendTo(html.leftCol);
      html.leftColTbl = jQuery('<table cellpadding="0" cellspacing="0" border="0" id="jQueryGanttTableLeft">').appendTo(html.leftColDiv);
      html.leftColTblRow = jQuery('<tr class="spacer">').appendTo(html.leftColTbl);
      html.leftColTblCol = jQuery('<td>').appendTo(html.leftColTblRow);
      // html.leftColTblCol.append('<div class="cfgForceBoundaries"><input type="checkbox" value="'+ganttInst.getCfg('vForceBoundaries')+'" /> <b>Boundaries</b></div>');
      // html.leftColTblCol.find('input').click(function(){ ganttInst.setCfg('vForceBoundaries', this.checked ? 1 : 0); });
      html.leftColTblRow = jQuery('<tr class="hlbl">').appendTo(html.leftColTbl);
      html.leftColTblCol = jQuery('<th class="name">').html(this.config.vNameHeader).appendTo(html.leftColTblRow);
      var vTaskId, vTaskIsGroup, vTaskRowId;
      for(i=0; i<this.taskList.length; i++){
        vTaskId = this.taskList[i].getID();
        vTaskRowId = this.taskList[i].getProjectID()+'x'+this.taskList[i].getParent()+'_'+this.taskList[i].getProjectID()+'x'+vTaskId;
        html.leftColTblRow = jQuery('<tr id="'+vTaskRowId+'" action_id="'+vTaskId+'" class="action '+this.taskList[i].getType()+' level'+this.taskList[i].getLevel()+'">').appendTo(html.leftColTbl);
        html.leftColTblCol = jQuery('<td class="name">').appendTo(html.leftColTblRow);
        html.leftColTblColDiv = jQuery('<div>').appendTo(html.leftColTblCol);
        if( this.taskList[i].getType() == 'project' )
          html.leftColTblColDivLnk = jQuery('<a>')
            .attr( 'target', '_blank' )
            .attr( 'title', this.taskList[i].getName() )
            .attr( 'href', 'wbteampro.php?task=project.edit&project_id=' + this.taskList[i].getID() )
            .data( 'taskItem', this.taskList[i] )
            .appendTo(html.leftColTblColDiv);
        else
          html.leftColTblColDivLnk = jQuery('<a'+(this.taskList[i].getGroup()?' class="expand"':'')+'>')
            .attr( 'title', this.taskList[i].getName() )
            .attr( 'href', 'javascript:void(0);' )
            .data( 'taskItem', this.taskList[i] )
            .click(function(){
              var taskItem = jQuery(this).data('taskItem');
              taskItem.ganttInst.projectActionEdit.openTaskEditor(this,taskItem.getID());
              })
            .appendTo(html.leftColTblColDiv);
        html.leftColTblColDivLnkTxt = jQuery('<span>')
          .html( this.taskList[i].getName() )
          .appendTo( html.leftColTblColDivLnk );
      }
      for(i=this.taskList.length; i<this.config.vMinRows; i++){
        html.leftColTblRow = jQuery('<tr>').appendTo(html.leftColTbl);
        html.leftColTblCol = jQuery('<td class="name">').appendTo(html.leftColTblRow);
        html.leftColTblColDiv = jQuery('<div>').appendTo(html.leftColTblCol);
      }

      // Build Center Column
	      html.centerColDiv = jQuery('<div class="centerColDiv" id="jQueryGanttCenter">').css('display','none').appendTo(html.centerColWrap);
	      html.centerColTblRows = [];

      // Center Header Follow Scroll
	      html.centerColTbl = jQuery('<table cellpadding="0" cellspacing="0" border="0" id="jQueryGanttTableCenter">').appendTo(html.centerColDiv);
	      html.centerColTbl.data('resizeEvent', function(ev){
          if( !html.centerColTbl.data('scrollEvent') ){
            if (ev) jQuery(window).unbind('resize', ev.handleObj.handler);
            return;
          }
	      	setTimeout(function(){
	      		html.centerColTbl.data('scrollEventData', {
							'colDivOffset': html.centerColDiv.offset()
	      		});
		    		html.centerColTbl.data('scrollEvent')();
	      	}, 100);
	      });
	      html.centerColTbl.data('scrollEvent', function(ev){
	      	if( !html.centerColTbl.data('resizeEvent') ){
            if (ev) jQuery(window).unbind('scroll', ev.handleObj.handler);
            return;
          }
          if( !html.centerColTbl.data('scrollEventData') ){
            html.centerColTbl.data('resizeEvent')(ev);
	      		return;
	      	}
	      	var sd = html.centerColScroller.data('scrollEventData');
	      	var st = jQuery(window).scrollTop();
	      	if( sd && st > sd.colDivOffset.top )
	      		html.centerColTbl.css('top', (st - sd.colDivOffset.top)+'px');
	      	else
	      		html.centerColTbl.css('top', '0px');
	      });
	      jQuery(window).bind('resize', html.centerColTbl.data('resizeEvent'));
	      jQuery(window).bind('scroll', html.centerColTbl.data('scrollEvent'));

      // Add Footer Floating Scroller
	      html.centerColScroller = jQuery('<div id="jQueryGanttCenterScroller">').appendTo(html.centerColWrap);
	      html.centerColScrollerMirror = jQuery('<div class="mirror">').appendTo(html.centerColScroller);
	      html.centerColScroller.data('resizeEvent', function(ev){
          if( !html.centerColScroller.data('scrollEvent') ){
            if (ev) jQuery(window).unbind('resize', ev.handleObj.handler);
            return;
          }
	      	setTimeout(function(){
	      		html.centerColScroller.data('scrollEventData', {
							'colDivOffset': html.centerColDiv.offset(),
							'colDivWidth': html.centerColDiv.width(),
							'colDivHeight': html.centerColDiv.height(),
							'height': html.centerColScroller.height(),
							'colTblWidth': html.centerColTbl.width()
	      		});
		    		html.centerColScroller.data('scrollEvent')();
	      	}, 100);
	      });
	      html.centerColScroller.data('scrollEvent', function(ev){
          if( !html.centerColScroller.data('resizeEvent') ){
            if (ev) jQuery(window).unbind('resize', ev.handleObj.handler);
            return;
          }
          if( !html.centerColScroller.data('scrollEventData') ){
	      		html.centerColScroller.data('resizeEvent')(ev);
	      		return;
	      	}
	      	var sd = html.centerColScroller.data('scrollEventData');
	      	var st = jQuery(window).scrollTop();
	      	var wh = jQuery(window).height();
      		html.centerColScrollerMirror.css('width', sd.colTblWidth+'px');
      		var top = ((wh - sd.colDivOffset.top - sd.height) + st);
      		if( top > sd.colDivHeight + sd.height + 24 )
      			top = sd.colDivHeight + sd.height + 24;
      		html.centerColScroller.css('top', top +'px');
      		html.centerColScroller.css('width', sd.colDivWidth+'px');
      		html.centerColScroller.scrollLeft( html.centerColDiv.scrollLeft() );
	      });
	      html.centerColScroller.data('scrollMirror', function(ev){
	      	html.centerColDiv.scrollLeft( html.centerColScroller.scrollLeft() );
	      });
	      jQuery(window).bind('resize', html.centerColScroller.data('resizeEvent'));
	      jQuery(window).bind('scroll', html.centerColScroller.data('scrollEvent'));
	      html.centerColScroller.bind('scroll', html.centerColScroller.data('scrollMirror'));

      // Build Right Column (never used - shell...)
      if( doRightCol ){
	      html.rightColDiv = jQuery('<div class="rightColDiv" id="jQueryGanttRight">').appendTo(html.rightCol);
	      html.rightColTbl = jQuery('<table cellpadding="0" cellspacing="0" border="0" id="jQueryGanttTableRight">').appendTo(html.rightColDiv);
	      html.rightColTblRow = jQuery('<tr class="spacer">').appendTo(html.rightColTbl);
	      html.rightColTblCol = jQuery('<td>').appendTo(html.rightColTblRow);
	      html.rightColTblRow = jQuery('<tr class="hlbl">').appendTo(html.rightColTbl);
	      html.rightColTblCol = jQuery('<th class="ctrl">').html('&nbsp;').appendTo(html.rightColTblRow);
	      var vTaskId, vTaskIsGroup, vTaskRowId;
	      for(i=0; i<this.taskList.length; i++){
	        vTaskId = this.taskList[i].getID();
	        html.rightColTblRow = jQuery('<tr action_id="'+vTaskId+'">').appendTo(html.rightColTbl);
	        html.rightColTblCol = jQuery('<td class="ctrl">').appendTo(html.rightColTblRow);
	        html.rightColTblColDiv = jQuery('<div>').appendTo(html.rightColTblCol);
	        html.rightColTblColDivLnk = jQuery('<a>')
	          .attr( 'target', '_blank' )
	          .attr( 'href', 'wbteampro.php?task=project.edit&project_id=' + this.taskList[i].getID() )
	          .data( 'taskItem', this.taskList[i] )
	          .appendTo(html.rightColTblColDiv);
	        html.rightColTblColDivLnkTxt = jQuery('<span>')
	          .html( 'X' )
	          .appendTo( html.rightColTblColDivLnk );
	      }
	      for(i=this.taskList.length; i<this.config.vMinRows; i++){
	        html.rightColTblRow = jQuery('<tr>').appendTo(html.rightColTbl);
	        html.rightColTblCol = jQuery('<td class="ctrl">').appendTo(html.rightColTblRow);
	        html.rightColTblColDiv = jQuery('<div>').appendTo(html.rightColTblCol);
	      }
      }

      // Build Major Date Row
      html.centerColTblRows[0] = jQuery('<tr class="jQueryGanttDateMajor">').appendTo(html.centerColTbl);
      vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());
      while(Date.parse(vTmpDate) <= Date.parse(vMaxDate)){
        vStr = vTmpDate.getFullYear() + '';
        vStr = vStr.substring(2,4);
        if(this.config.vFormat == 'minute') {
        } else if(this.config.vFormat == 'hour') {
        } else if(this.config.vFormat == 'week') {
        } else if(this.config.vFormat == 'month') {
          tmpHtml = this.formatDateStr(vTmpDate, 'Y');
          vTmpDate.setDate(vTmpDate.getDate()+( this.isLeapYear(vTmpDate.getFullYear()) ? 366 : 365));
          html.centerColTblCol = jQuery('<td colspan="12">').html(tmpHtml).appendTo(html.centerColTblRows[0]);
        } else if(this.config.vFormat == 'quarter') {
        } else {
          tmpHtml = this.formatDateStr(vTmpDate, 'F Y');
          vTmpDate.setDate(vTmpDate.getDate()+7);
          html.centerColTblCol = jQuery('<td colspan="7">').html(tmpHtml).appendTo(html.centerColTblRows[0]);
        }
      }

      // Build Minor Date Row
      html.centerColTblRows[1] = jQuery('<tr class="jQueryGanttDateMinor">').appendTo(html.centerColTbl);
      html.centerColTblTaskRow = jQuery('<tr class="jQueryGanttTask">');
      vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());
      vNxtDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());
      vNumCols = 0; vIsToday = false;
      while(Date.parse(vTmpDate) <= Date.parse(vMaxDate)){
        if(this.config.vFormat == 'minute'){
        } else if(this.config.vFormat == 'hour') {
        } else if(this.config.vFormat == 'week') {
        } else if(this.config.vFormat == 'month') {
          if( this.formatDateStr(vCurrDate,'mm/yyyy') == this.formatDateStr(vTmpDate,'mm/yyyy'))
            vIsToday = true;
          else
            vIsToday = false;
          jQuery('<td class="wd'+(vIsToday?' today':'')+'"><div style="width:'+vColWidth+'px">' + ((vTmpDate.getMonth())+1) + '</div></td>').appendTo(html.centerColTblRows[1]);
          vTmpDate.setDate(vTmpDate.getDate() + this.getDaysInMonth( vTmpDate.getFullYear(), vTmpDate.getMonth() ));
        } else if(this.config.vFormat == 'quarter') {
        } else {
          if( this.formatDateStr(vCurrDate,'mm/dd/yyyy') == this.formatDateStr(vTmpDate,'mm/dd/yyyy'))
            vIsToday = true;
          else
            vIsToday = false;
          if(vTmpDate.getDay() % 6 == 0)
            jQuery('<td class="we'+(vIsToday?' today':'')+'"><div style="width:'+vColWidth+'px">' + vTmpDate.getDate() + '</div></td>').appendTo(html.centerColTblRows[1]);
          else
            jQuery('<td class="wd'+(vIsToday?' today':'')+'"><div style="width:'+vColWidth+'px">' + vTmpDate.getDate() + '</div></td>').appendTo(html.centerColTblRows[1]);
          vTmpDate.setDate(vTmpDate.getDate() + 1);
        }
        vNumCols++;
      }

      // Build Task Rows
      var vMinLeft = -1;
      html.centerColTaskWrap = jQuery('<div id="jQueryGanttTaskList" style="width:'+(vNumCols * vColWidth)+'px;">').appendTo(html.centerColDiv);
      for(i=0; i<this.taskList.length; i++){

        vID        = this.taskList[i].getID();
        vTaskStart = this.taskList[i].getStart();
        vTaskEnd   = this.taskList[i].getEnd();
        // vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());

        if( this.config.vFormat == 'month' )
          vNumUnits = this.getTotalMonths( this.taskList[i].getStart(), this.taskList[i].getEnd() );
        else
          vNumUnits = this.getTotalDays(this.taskList[i].getEnd(), this.taskList[i].getStart()) + 1;

        // Build date string for Title
        html.tmp    = '';

        // Draw Milestone Bullet
        if( this.taskList[i].getMile() ) {

          // Build Modal / Left & Right Positions
          vDateRowStr = this.formatDateStr(vTaskStart,vDateDisplayFormat);
          vTaskLeft   = this.getTotalDays(this.taskList[i].getStart(), vMinDate);
          vTaskRight  = 1;
          vMinLeft    = (vMinLeft < 0 || vMinLeft > Math.ceil((vTaskLeft * (vUnitWidth) + 1)) ? Math.ceil((vTaskLeft * (vUnitWidth) + 1)) : vMinLeft);
          html.tmp +=
            '<div id=bardiv_' + vID + ' style="position:absolute; top:0px; left:' + Math.ceil((vTaskLeft * (vUnitWidth) + 1)) + 'px; height: 18px; width:160px; overflow:hidden;">' +
            '  <div id=taskbar_' + vID + ' title="' + this.taskList[i].getName() + ': ' + vDateRowStr + '" style="height: 16px; width:12px; overflow:hidden; cursor: pointer;">' +
            ((this.taskList[i].getCompVal() < 100) ? '&loz;' : '&diams;') +
            '  </div>' +
            '</div>';

        } else {

          // Build Modal / Left & Right Positions
          vDateRowStr = this.formatDateStr(vTaskStart,this.config.vDateDisplayFormat) + ' - ' + this.formatDateStr(vTaskEnd,this.config.vDateDisplayFormat);
          if (this.config.vFormat == 'month'){
            vTaskLeft   = this.getTotalMonths( vMinDate, this.taskList[i].getStart() ) - 1;
            vTaskRight  = vNumUnits;
          } else {
            vTaskRight  = this.getTotalDays(this.taskList[i].getEnd(), this.taskList[i].getStart()) + 1;
            vTaskLeft   = this.getTotalDays(this.taskList[i].getStart(), vMinDate);
          }
          vMinLeft = (vMinLeft < 0 || vMinLeft > Math.ceil(vTaskLeft * vUnitWidth) ? Math.ceil(vTaskLeft * vUnitWidth) : vMinLeft);

          // Draw Group Bar  which has outer div with inner group div and several small divs to left and right to create angled-end indicators
          if( this.taskList[i].getType() == 'project' ) {

            html.tmp +=
              '<div class="pwrap bfrm" id=bardiv_' + vID + ' style="left:' + Math.ceil(vTaskLeft * vUnitWidth) + 'px; width:' + Math.ceil(vTaskRight * vUnitWidth) + 'px">' +
              '  <div class="project" id=taskbar_' + vID + '>' +
              '    <div class="comp" style="width:' + this.taskList[i].getCompStr() + '"></div>' +
              '    <div class="ct" style="left:' + ((Math.ceil(vTaskRight * vUnitWidth)/2)-10) + 'px">'+ this.taskList[i].getCompStr() +'</div>' +
              '  </div>' +
              '</div>';

          }

          // Draw Group Bar  which has outer div with inner group div and several small divs to left and right to create angled-end indicators
          else if( this.taskList[i].getGroup() ) {

            html.tmp +=
              '<div class="gwrap bfrm" id="bardiv_' + vID + '" style="left:' + Math.ceil(vTaskLeft * vUnitWidth) + 'px; width:' + Math.ceil(vTaskRight * vUnitWidth) + 'px">' +
              '  <div class="task" id="taskbar_' + vID + '">' +
              '    <div class="comp" style="width:' + this.taskList[i].getCompStr() + '"></div>' +
              '    <div class="ct" style="left:' + ((Math.ceil(vTaskRight * vUnitWidth)/2)-10) + 'px">'+ this.taskList[i].getCompStr() +'</div>' +
              '    ' + ( this.config.vViewOnly === true ? '' : '<div class="dl"></div>' ) +
              '    ' + ( this.config.vViewOnly === true ? '' : '<div class="dr"></div>' ) +
              '  </div>' +
              '  <div class="le"></div><div class="re"></div>' +
              '</div>';

          }

          // Draw Task Bar  which has outer DIV with enclosed colored bar div, and opaque completion div
          else {

            html.tmp +=
              '<div class="twrap bfrm" id=bardiv_' + vID + ' style="left:' + Math.ceil(vTaskLeft * vUnitWidth) + 'px; width:' + Math.ceil(vTaskRight * vUnitWidth) + 'px">' +
              '  <div class="task" id=taskbar_' + vID + '>' +
              '    <div class="comp" style="width:' + this.taskList[i].getCompStr() + '"></div>' +
              '    <div class="ct" style="left:' + ((Math.ceil(vTaskRight * vUnitWidth)/2)-10) + 'px">'+ this.taskList[i].getCompStr() +'</div>' +
              '    ' + ( this.config.vViewOnly === true ? '' : '<div class="dl"></div>' ) +
              '    ' + ( this.config.vViewOnly === true ? '' : '<div class="dr"></div>' ) +
              '  </div>' +
              '</div>';

          }
        }

        if( this.getCaptionType() ) {
          html.tmp += '<div class="txtr" style="left:' + (Math.ceil(vTaskLeft * vUnitWidth) + Math.ceil(vTaskRight * vUnitWidth) + 6) + 'px">';
          switch( this.getCaptionType() ) {
            case 'caption':    html.tmp += this.taskList[i].getCaption();    break;
            case 'resource':   html.tmp += this.taskList[i].getResource();   break;
            case 'duration':   html.tmp += this.taskList[i].getDuration();   break;
            case 'complete':   html.tmp += this.taskList[i].getCompStr();    break;
          }
          // html.tmp += ' - '+this.formatDateStr(this.taskList[i].getStart(),'yyyy-mm-dd');
          // html.tmp += ' .. '+this.formatDateStr(this.taskList[i].getEnd(),'yyyy-mm-dd');
          html.tmp += '</div>';
        };

        html.taskRow = jQuery('<div id="childgrid_' + vID + '" class="trow">')
                          .data('taskItem', this.taskList[i])
                          .appendTo(html.centerColTaskWrap);
        html.taskRow.append(html.tmp);
        html.taskRow
          .find('.task')
          .mouseover(function(){
            var tItem = jQuery(this).closest('.trow').data('taskItem');
            var tDays = Math.ceil(((Date.parse(tItem.getEnd())-Date.parse(tItem.getStart()))/1000)/86400) + 1;
            ganttInst.toolTip
              .show(
                '<b>' + tItem.getName() + ' #' + tItem.getID() + '</b><br>' +
                '' + ganttInst.formatDateStr(tItem.getStart(), ganttInst.config.vDateDisplayFormat) + ' .. ' +
                '' + ganttInst.formatDateStr(tItem.getEnd(), ganttInst.config.vDateDisplayFormat) + ' (' + tDays + ' day' + (tDays > 1 ? 's' : '') + ')<br>' +
                '<i>' + tItem.getResource() + '</i><br>')
              .position(true);
          })
          .mouseout(function(){ if(!ganttInst.toolTip.manualmode)ganttInst.toolTip.hide(); });
        html.taskRow
          .find('.dl, .dr')
          .data('ganttInst', this)
          .data('taskLeft', Math.ceil(vTaskLeft * vUnitWidth))
          .data('taskWidth', Math.ceil(vTaskRight * vUnitWidth))
          .data('chartFormat', this.config.vFormat)
          .data('chartUnitWidth', vUnitWidth)
          .data('chartMinDate', vMinDate)
          .data('chartMaxDate', vMaxDate)
          .each( this.initTaskRow );
      }
      for(i=this.taskList.length; i<this.config.vMinRows; i++){
        html.taskRow = jQuery('<div class="trow">').appendTo(html.centerColTaskWrap);
      }

      // Add Today Overlay
      if( vCurrDate >= vMinDate && vCurrDate <= vMaxDate ){
        if (this.config.vFormat == 'month')
          vTaskLeft = this.getTotalMonths(vMinDate, vCurrDate) - 1;
        else
          vTaskLeft = this.getTotalDays(vCurrDate, vMinDate);
        html.todayDivCol = jQuery('<div class="todaycol" style="left:' + (Math.floor(vTaskLeft * vUnitWidth)+1) + 'px"></div>').appendTo(html.centerColTaskWrap);
      }

      // Render Tooltip
      html.tooltip = this.toolTip.init();

      // Finish Render
      jQuery(this.chartDiv).css('visibility','visible');
      jQuery(html.centerColDiv)
        .css('width', (jQuery(this.chartDiv).width() - jQuery(html.leftColDiv).width() - (doRightCol ? jQuery(html.rightColDiv).width() : 0)) + 'px')
        .css('display','block')
        .scrollLeft( vMinLeft - (vMinLeft % (24*7)) );
      jQuery(html.todayDivCol).height(jQuery(this.chartDiv).height());

      // Store Elements
      /*
      this.htmlElements.leftCol           = html.leftCol;
      this.htmlElements.leftColDiv        = html.leftColDiv;
      this.htmlElements.leftColTbl        = html.leftColTbl;
      this.htmlElements.centerCol         = html.centerCol;
      this.htmlElements.centerColDiv      = html.centerColDiv;
      this.htmlElements.centerColTbl      = html.centerColTbl;
      this.htmlElements.centerColTblRows  = html.centerColTblRows;
      this.htmlElements.centerColTaskWrap = html.centerColTaskWrap;
      this.htmlElements.mainRow           = html.mainRow;
      this.htmlElements.mainTable         = html.mainTable;
      this.htmlElements = html;
      */
      for( var k in html )
        this.htmlElements[ k ] = html[ k ];

      // Dependancies
      this.drawDependencies();

      // Dependancies
      this.data.vIsRendered = 1;

      // wbSortable
      /*
      if( jQuery('#jQueryGanttTableLeft').length )
        this.wbSortable = new wbSortable('jQueryGanttTableLeft', this.wbSortablePost);
      */

      // Update Frame
      this.onWindowResize();

      // Init Floaters
      html.centerColTbl.data('resizeEvent')();
      html.centerColScroller.data('resizeEvent')();

    }

  };

  /********************************************************************
  Initialize Task Dragging
  ********************************************************************/
  this.initTaskRow = function(n,el){
    if( ganttInst.config.vViewOnly === true ) return;
    var taskDragEl = el;
    var taskRow = null;
    var taskItem = null;
    var taskItemId = null;
    var taskItemPar = null;
    var taskDragDim = null;
    var taskDiv = null;
    var taskCpt = null;
    var taskCptWidth = null;
    var taskTxt = null;
    var taskTxtWidth = null;
    var taskLeft = null;
    var taskWidth = null;
    var taskStartDate = null;
    var taskEndDate = null;
    var minLeft = null;
    var minRight = null;
    var maxLeft = null;
    var maxRight = null;
    var chartUnitWidth = null;
    var chartFormat = null;
    var chartWidth = null;
    var chartMinDate = null;
    var chartMaxDate = null;
    jQuery(el)
      .draggable({
        'grid': [24,24],
        'axis':'x',
        'start': function(ev,ui){
          if( taskRow == null ){
            taskRow       = jQuery(el).closest('.trow');
            taskItem      = jQuery(taskRow).data('taskItem');
            taskItemId    = taskItem.getID();
            taskItemPar   = taskItem.ganttInst.getTask( taskItem.getParent() );
            taskDragDim   = {'width':jQuery(el).width(),'height':jQuery(el).height()};
            taskDiv       = taskRow.find('.bfrm');
            taskCpt       = taskRow.find('.ct');
            taskCptWidth  = taskCpt.width();
            taskTxt       = taskRow.find('.txtr');
            taskTxtWidth  = taskTxt.width();
            taskLeft      = (jQuery(this).data('taskLeft'));
            taskWidth     = (jQuery(this).data('taskWidth'));
            taskStartDate = null;
            taskEndDate   = null;
            minLeft       = 0;
            minRight      = 0;
            maxLeft       = 0;
            maxRight      = 0;
            chartUnitWidth= jQuery(this).data('chartUnitWidth');
            chartFormat   = jQuery(this).data('chartFormat');
            chartWidth    = jQuery('#jQueryGanttTaskList').width();
            chartMinDate  = jQuery(this).data('chartMinDate');
            chartMaxDate  = jQuery(this).data('chartMaxDate');
          }
          jQuery(this).addClass('active');
          taskLeft = taskDiv.position().left;
          taskWidth = taskDiv.width();
          taskStartDate = taskItem.getStart();
          taskEndDate = taskItem.getEnd();
          if( ganttInst.getCfg('vForceBoundaries') && taskItemPar ){
            if( chartFormat == 'month' ){
              minLeft   = (ganttInst.getTotalMonths(chartMinDate, taskItemPar.getStart()) * chartUnitWidth) - chartUnitWidth;
              maxLeft   = taskLeft + taskWidth - chartUnitWidth;
              minRight  = taskLeft + chartUnitWidth;
              maxRight  = (ganttInst.getTotalMonths(chartMinDate, taskItemPar.getEnd()) * chartUnitWidth);
            }
            else {
              minLeft   = ganttInst.getTotalDays(taskItemPar.getStart(), chartMinDate) * chartUnitWidth;
              maxLeft   = taskLeft + taskWidth - chartUnitWidth;
              minRight  = taskLeft + chartUnitWidth;
              maxRight  = (ganttInst.getTotalDays(taskItemPar.getEnd(), chartMinDate) * chartUnitWidth) + chartUnitWidth;
            }
          }
          else {
            minLeft   = 0;
            maxLeft   = taskLeft + taskWidth;
            minRight  = taskLeft + chartUnitWidth;
            maxRight  = chartWidth + chartUnitWidth;
          }
          if( ganttInst.getCfg('vForceBoundaries') ){
            var tPos, tDate = ganttInst.getDateObj();
            for(i=0; i<ganttInst.taskList.length; i++){
              if( taskItemId == ganttInst.taskList[i].getParent() ){
                tDate.setTime( ganttInst.taskList[i].getStart().getTime() );
                if( chartFormat == 'month' )
                  tPos = (ganttInst.getTotalMonths(chartMinDate, tDate) * chartUnitWidth) - chartUnitWidth;
                else
                  tPos = ganttInst.getTotalDays(tDate, chartMinDate) * chartUnitWidth;
                if( maxLeft > tPos ) maxLeft = tPos;
                tDate.setTime( ganttInst.taskList[i].getEnd().getTime() );
                if( chartFormat == 'month' )
                  tPos = (ganttInst.getTotalMonths(chartMinDate, tDate) * chartUnitWidth);
                else
                  tPos = (ganttInst.getTotalDays(tDate, chartMinDate) * chartUnitWidth) + chartUnitWidth;
                if( minRight < tPos ) minRight = tPos;
              }
            }
          }
          ganttInst.toolTip.show();
        },
        'drag': function(ev,ui){
          var nLeft   = taskLeft;
          var nWidth  = taskWidth;
          var nRight  = taskLeft;
          var sDate   = taskStartDate;
          var eDate   = taskEndDate;
          var tDate   = null;
          if( jQuery(this).hasClass('dl') ){
            nLeft = Math.round((taskLeft + ui.position.left) / chartUnitWidth) * chartUnitWidth;
            if( nLeft < minLeft ) nLeft = minLeft;
            else if( nLeft > maxLeft ) nLeft = maxLeft;
            nWidth = taskWidth + (taskLeft - nLeft);
            ui.position.left = 0;
            taskDiv.css('left',(nLeft)+'px');
            taskDiv.css('width',(nWidth)+'px');
            taskCpt.css('left',(Math.ceil(nWidth/2)-(taskCptWidth/2))+'px');
            if( chartFormat == 'month' ){
              tDate = taskStartDate.getDate();
              sDate.setTime( chartMinDate.getTime() );
              sDate.setDate( tDate );
              sDate.setMonth( chartMinDate.getMonth() + (nLeft / chartUnitWidth) );
            } else {
              sDate.setTime( chartMinDate.getTime() );
              sDate.setDate( chartMinDate.getDate() + (nLeft / chartUnitWidth) );
            }
          }
          else {
            nRight = Math.ceil((taskLeft + ui.position.left + taskDragDim.width) / chartUnitWidth) * chartUnitWidth;
            if( nRight < minRight ) nRight = minRight;
            else if( nRight > maxRight ) nRight = maxRight;
            nWidth = nRight - taskLeft;
            ui.position.left = nRight - taskLeft - taskDragDim.width;
            taskDiv.css('width',(nWidth)+'px');
            taskCpt.css('left',(Math.ceil(nWidth/2)-(taskCptWidth/2))+'px');
            taskTxt.css('left',(taskLeft+nWidth+6)+'px');
            if( chartFormat == 'month' ){
              tDate = taskEndDate.getDate();
              eDate.setTime( chartMinDate.getTime() );
              eDate.setDate( tDate );
              eDate.setMonth( chartMinDate.getMonth() + ((taskLeft+nWidth) / chartUnitWidth) - 1 );
            } else {
              eDate.setTime( chartMinDate.getTime() );
              eDate.setDate( chartMinDate.getDate() + ((taskLeft+nWidth) / chartUnitWidth) - 1 );
            }
          }
          ui.position.nLeft   = nLeft;
          ui.position.nWidth  = nWidth;
          var ot = jQuery(this).offset();
          var os = ganttInst.container.offset();
          var Td = Math.round(nWidth / chartUnitWidth);
          ganttInst.toolTip
            .position({
              'manualmode': true,
              'left': (ot.left - os.left),
              'top': (ot.top - os.top)
            })
            .html(
              '<b>' + taskItem.getName() + ' #' + taskItem.getID() + '</b><br>' +
              '' + ganttInst.formatDateStr(sDate, ganttInst.config.vDateDisplayFormat) + ' .. ' +
              '' + ganttInst.formatDateStr(eDate, ganttInst.config.vDateDisplayFormat) + '<br>' +
              '' + Td + ' day' + (Td > 1 ? 's' : '') + '<br>' +
              '<i>' + taskItem.getResource() + '</i><br>'
            );
        },
        'stop': function(ev,ui){
          var nDate   = ganttInst.getDateObj();
          var tDate   = null;
          var nLeft   = ui.position.nLeft;
          var nWidth  = ui.position.nWidth;
          nDate.setTime( chartMinDate.getTime() );
          jQuery(this).removeClass('active');
          ganttInst.toolTip.hide();
          if( jQuery(this).hasClass('dl') ){
            jQuery(this).css('left','0px').css('right','');
            if( chartFormat == 'month' ){
              nDate.setMonth( chartMinDate.getMonth() + (nLeft / chartUnitWidth) );
              nDate.setDate( taskItem.getStart().getDate() );
            } else {
              nDate.setDate( chartMinDate.getDate() + (nLeft / chartUnitWidth) );
            }
            taskItem.setStart(nDate);
          } else {
            jQuery(this).css('left','').css('right','0px');
            if( chartFormat == 'month' ){
              nDate.setMonth( chartMinDate.getMonth() + ((nLeft+nWidth) / chartUnitWidth) - 1 );
              nDate.setDate( taskItem.getEnd().getDate() );
            } else {
              nDate.setDate( chartMinDate.getDate() + ((nLeft+nWidth) / chartUnitWidth) - 1 );
            }
            taskItem.setEnd(nDate);
          }
          ganttInst.projectActionEdit.saveTaskItem( taskItem );
        }
    });
  };

  /********************************************************************
  ********************************************************************/
  this.sLine = function(x1,y1,x2,y2) {
    vLeft = Math.min(x1,x2);
    vTop  = Math.min(y1,y2);
    vWid  = Math.abs(x2-x1) + 1;
    vHgt  = Math.abs(y2-y1) + 1;
    vDoc  = document.getElementById('jQueryGanttTaskList');
    // retrieve DIV
    var oDiv = document.createElement('div');
    oDiv.id = "line" + this.data.vDepId++;
    oDiv.style.position = "absolute";
    oDiv.style.margin = "0px";
    oDiv.style.padding = "0px";
    oDiv.style.overflow = "hidden";
    oDiv.style.border = "0px";
    // set attributes
    oDiv.style.zIndex = 0;
    oDiv.style.backgroundColor = "red";
    oDiv.style.left = vLeft + "px";
    oDiv.style.top = vTop + "px";
    oDiv.style.width = vWid + "px";
    oDiv.style.height = vHgt + "px";
    oDiv.style.visibility = "visible";
    vDoc.appendChild(oDiv);
  };

  /********************************************************************
  ********************************************************************/
  this.dLine = function(x1,y1,x2,y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var x = x1;
    var y = y1;
    var n = Math.max(Math.abs(dx),Math.abs(dy));
    dx = dx / n;
    dy = dy / n;
    for ( i = 0; i <= n; i++ ){
      vx = Math.round(x);
      vy = Math.round(y);
      this.sLine(vx,vy,vx,vy);
      x += dx;
      y += dy;
    };
  };

  /********************************************************************
  ********************************************************************/
  this.drawDependency = function(x1,y1,x2,y2){
    if(x1 + 10 < x2){
      this.sLine(x1,y1,x1+4,y1);
      this.sLine(x1+4,y1,x1+4,y2);
      this.sLine(x1+4,y2,x2,y2);
      this.dLine(x2,y2,x2-3,y2-3);
      this.dLine(x2,y2,x2-3,y2+3);
      this.dLine(x2-1,y2,x2-3,y2-2);
      this.dLine(x2-1,y2,x2-3,y2+2);
    } else {
      this.sLine(x1,y1,x1+4,y1);
      this.sLine(x1+4,y1,x1+4,y2-10);
      this.sLine(x1+4,y2-10,x2-8,y2-10);
      this.sLine(x2-8,y2-10,x2-8,y2);
      this.sLine(x2-8,y2,x2,y2);
      this.dLine(x2,y2,x2-3,y2-3);
      this.dLine(x2,y2,x2-3,y2+3);
      this.dLine(x2-1,y2,x2-3,y2-2);
      this.dLine(x2-1,y2,x2-3,y2+2);
    }
  };

  /********************************************************************
  ********************************************************************/
  this.drawDependencies = function () {
    //First recalculate the x,y
    this.CalcTaskXY();
    this.clearDependencies();
    for(var i = 0; i < this.taskList.length; i++){
      var vPredList = this.taskList[i].getPredecessors();
      if(vPredList.length) {
        var n = vPredList.length;
        for(var k=0;k<n;k++) {
          var vTask = this.getTask(vPredList[k]);
          if( typeof(vTask)!='undefined' && vTask.getVisible() == 1 )
            this.drawDependency(vTask.getEndX(),vTask.getEndY(),this.taskList[i].getStartX()-1,this.taskList[i].getStartY())
        }
      }
    }
  };

  /********************************************************************
  ********************************************************************/
  this.clearDependencies = function(){
    var parent = document.getElementById('jQueryGanttTaskList');
    var depLine;
    var vMaxId = this.data.vDepId;
    for ( i=1; i<vMaxId; i++ ) {
      depLine = document.getElementById("line"+i);
      if (depLine) parent.removeChild(depLine);
    };
    this.data.vDepId = 1;
  };

  /********************************************************************
  Window Resize
  ********************************************************************/
  this.onWindowScroll = function(ev){
  };
  jQuery(window).scroll( {'ganttInst':this}, this.onWindowScroll );

  /********************************************************************
  Window Resize
  ********************************************************************/
  this.onWindowResize = function(ev){
    var ganttInst = (ev ? ev.data.ganttInst : this);
    ganttInst.data.vChartOffset = jQuery(ganttInst.container).offset();
    if(ganttInst.data.vResizeTimer)
      clearTimeout(ganttInst.data.vResizeTimer);
    ganttInst.data.vResizeTimer = setTimeout(function(){
      if( ganttInst.data.vIsRendered ){
        var leftColDiv = jQuery(ganttInst.container).find('#jQueryGanttLeft');
        // var rightColDiv = jQuery(ganttInst.container).find('#jQueryGanttRight');
        jQuery(ganttInst.container)
          .find('#jQueryGanttCenter')
          .css('width', (jQuery(ganttInst.container).width() - jQuery(leftColDiv).width()/* - jQuery(rightColDiv).width()*/) + 'px');
      }
    }, 100);
    ganttInst.onWindowScroll(ev);
  };
  jQuery(window).resize( {'ganttInst':this}, this.onWindowResize );

  /********************************************************************
  Store Instance
  ********************************************************************/
  if( !window.jQueryGanttStack ) window.jQueryGanttStack = {};
  window.jQueryGanttStack[this.instance] = this;
};
