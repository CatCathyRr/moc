import { langType } from './lang-base';

export const lang: langType = {
  title: '烘炉智控',
  taizhou:'沃尔沃汽车台州工厂',
  predicting:'预测中',
  home:{
    coming:'即将上线',
    develop:'开发中……',
  },
  tabbar: {
    home: '首页',
    input: '输入',
    analysis: '分析',
    detail:'预测未开始',
    detailform:'预测成功',
    detailinput:'生产时间输入',
    error:'预测错误',
    loading:'加载中……',
    
  },
  language: {
    en: 'EN',
    zh: '中',
  },
  btn: {
    confirm: '确认',
    cancel: '取消',
    opsuccess:'操作成功',
    plsfill1:'请输入实际开机时间',
    plsfill2:'请选择是否接受预测结果',
    plsfill3:'请选择不接受预测原因',
    noinfo:'系统错误',
    notproday:'今天不是生产日',
  },
  
  predict:{
    phd:"预测升温时长",
    // edoven: "电泳烘房",
    pop: "开机时间精准预测",
    note:"注意：",
    ptt:"今日生产时刻: ",
    pwha:"真实预测时间点: ",
    ptha:"预计预测时间点: ",
    ns:"未开始",
    pe:"预测报错",
    nodata:"数据缺失",
    wrongdata:"数据错误",
    modelerror:"模型错误",
    others:"其他错误",
    dataic:"输入数据检查:",
    oventem:"烘炉温度",
    oventemdetail:"烘炉分段温度明细",
    more:"更多",
    roomtem:"室内温度",
    roomhum:"室内湿度",
    lastclose:"上次关机",
    watr:"是否接受预测结果？",
    yes:"是",
    no:"否",
    aoti:"输入实际开机时间:",
    today:"今日",
    totfplc:"开机时间 ( 数据来自PLC )",
    rwna:"不接受预测原因？",
    tsp:"短期停产",
    lsp:"长期停产",
    ptf:"生产临时故障",
    submit:"提交",
    tbupdated:"待更新",
    opentime:"预测开机时间",
    feedback:"反馈:",
  },
  input:{
    pti:"输入生产时间",
    sevengenerate:"增加生产计划",
    date:"日期",
    time:"时间",
    action:"操作",
    edit:"编辑",
    save:"保存",
    cancel:"取消",
    pls:"请选择",
    reason:"原因",
    datechoose:"选择日期",
    timechoose:"选择时间",
    confirm:"确定",
    delete:"删除",
    addsucceed:"添加成功",
    savesucceed:"保存成功",

  },
  analysispage:{
    choose:"选择时间区间",
    today:"今天",
    start:"开始",
    end:"结束",
    pr:"报表",
    ovens:"烘炉数量",
    es:"能源收益",
    aratio:"接受率",
    emt:"误差趋势",
    glfxd:"已上线x天",
    areport:"分析报告",
    ph:"预测历史",
    ct:"选择时间",
    cdsid:"输入 CDSID",
    edit:"编辑",
    last7:"过去7天",
    last30:"过去30天",
    last3m:"过去3月",
    latest7r:"过去7天预测结果",
    latest30r:"过去30天预测结果",
    latest3mr:"过去3月预测结果",
    date:"日期",
    pt:"预测时间",
    diff:"误差",
    accept:"是否接受？",
    error:"错误",
    yes:"是",
    download:"下载",
    email:"发送邮件",
    result:"结果"
  },
  week:{
    mon:"一",
    tue:"二",
    wed:"三",
    thu:"四",
    fri:"五",
    sat:"六",
    sun:"日",
  }
};