const API_ENV = {
  isProd: process.env.API_ENV === 'production',
  isDev: process.env.API_ENV === 'development',
  isTest: process.env.API_ENV === 'test',
}
/**
 * 请求 api 路径
 * @type {String}
 */
// 旧接口
let API_URL = 'http://47.94.240.141:8080/admin'
// 新接口 --- 暂无开发环境
let NEW_API = ''
// 投票评级/用户封禁接口
let VotingAPI = ''
// 预览
let currentUrl = 'http://47.94.240.141:9002'

if (API_ENV.isProd) {
  API_URL = 'https://api.dapaopingji.com/admin'
  NEW_API = 'https://api.account.dapaopingji.com/api/admin'
  currentUrl = 'https://www.dprating.com'
  // 投票评级/用户封禁接口
  VotingAPI = 'https://api.dapaopingji.com/api'
  // API_URL = 'http://47.100.236.14/admin'
  // currentUrl = 'http://dapaopingji.com'
} else if (API_ENV.isTest) {
  API_URL = 'https://uat.api.dapaopingji.com/admin'
  NEW_API = 'http://106.14.191.99:6060/api/admin'
  currentUrl = 'http://uat.dapaopingji.com:9002'
  // 投票评级/用户封禁接口
  VotingAPI = 'http://106.14.191.99:8081/api'
}
// 默认链接----
// Txhash 地址
const txHash = 'https://etherscan.io'
// 默认圆图标
const defaultImg = 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website/default.svg'
// 默认大炮评级中文logo显示图
const defaultDpRatingImg = 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website-v2/logo-zh.svg'
// 默认轮播图
const defaultSowingMapImg = 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website/banner.png'

module.exports = {
  name: '后台管理系统',
  prefix: 'antdAdmin',
  footerText: 'Copyright © 2017-2018 DPRating.com All Rights Reserved',
  logo: '/dplogo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  currentUrl,
  txHash,
  defaultImg,
  defaultDpRatingImg,
  defaultSowingMapImg,
  api: {
    // 登陆
    userLogin: `${API_URL}/user/login`,
    // 登出
    userLogout: `${API_URL}/user/logout`,
    // 创建账号(项目方/分析师)
    createAccount: `${API_URL}/user/create`,
    // 申请记录
    // 获取列表
    applyRecordList: `${API_URL}/apply/list`,
    // 获取详情
    applyRecordDetail: `${API_URL}/apply/get`,
    // 是否公开 / 更新
    applyRecordUpdate: `${API_URL}/apply/update`,
    // 账号分配
    // 获取列表
    accountList: `${API_URL}/assignment/list`,
    // 发送账号
    // sendAccount: `${API_URL}/assignment/sendMail`,
    // 项目信息
    // 获取列表
    projectList: `${API_URL}/info/list`,
    // 开始评级
    projectLaunch: `${API_URL}/info/launch`,
    // 是否展示
    projectDisplay: `${API_URL}/info/display`,
    // 置顶
    projectSticky: `${NEW_API}/article/stickyCoins`,
    // 更新
    projectUpdate: `${API_URL}/info/save`,
    // 评级报告
    // 获取列表
    reportList: `${API_URL}/rating/list`,
    // 发布报告
    ratingRelease: `${API_URL}/rating/deploy`,
    // 更新 / 公开
    ratingUpdate: `${API_URL}/rating/update`,
    // 动态内容
    // 获取列表
    contentList: `${API_URL}/config/list`,
    // 新增
    contentAdd: `${API_URL}/config/add`,
    // 更新
    contentUpdate: `${API_URL}/config/update`,
    // 删除
    contentDelete: `${API_URL}/config/delete`,
    // 轮播图
    // 获取列表
    bannerList: `${API_URL}/banner/list`,
    // 新增
    bannerAdd: `${API_URL}/banner/save`,
    // 更新
    bannerUpdate: `${API_URL}/banner/update`,
    // 删除
    bannerDelete: `${API_URL}/banner/delete`,
    // 详情
    bannerDetail: `${API_URL}/banner/get`,
    // 交易所列表
    // 获取列表
    exchangeList: `${API_URL}/exchange/get?type=1`,
    // 添加交易所 / 投资机构
    exchangeAdd: `${API_URL}/exchange/create`,
    // 更新 / 删除
    exchangeUpdate: `${API_URL}/exchange/update`,
    // 获取投资机构列表
    agencyList: `${API_URL}/exchange/get?type=2`,
    // 友情链接
    // 列表
    linkList: `${API_URL}/link/list`,
    // 添加
    linkAdd: `${API_URL}/link/insert`,
    // 更新 / 删除
    linkUpdate: `${API_URL}/link/update`,
    // 上传文件
    fileUpload: `${API_URL}/user/signature`,
    // 行情分析
    // 列表
    analysisArticleList: `${NEW_API}/article/latestArticle`,
    // 删除
    analysisArticleDelete: `${NEW_API}/article/deletewords`,
    // 详情
    analysisDetail: `${NEW_API}/article/detail`,
    // 更新
    analysisUpdate: `${NEW_API}/article/update?sourceType=1`,
    // 加精
    analysisValue: `${NEW_API}/article/addValuable?sourceType=1`,
    // 置顶
    analysisSticky: `${NEW_API}/article/sticky?sourceType=1`,
    // 留言
    // 列表
    messageList: `${NEW_API}/article/leaveWords`,
    // 删除
    deleteLeaveWords: `${NEW_API}/article/deleteLeaveWords`,
    // 置顶
    messageSticky: `${NEW_API}/article/setCommentTop`,
    // 爆料
    // 列表
    brokeList: `${NEW_API}/article/latestExpose`,
    // 删除
    brokeDelete: `${NEW_API}/article/deleteExpose`,
    // 详情
    brokeDetail: `${NEW_API}/article/detail`,
    // 历史
    brokeHistory: `${NEW_API}/article/history`,
    // 更新
    brokeUpdate: `${NEW_API}/article/update?sourceType=7`,
    // 加精
    brokeValue: `${NEW_API}/article/addValuable?sourceType=7`,
    // 置顶
    brokeSticky: `${NEW_API}/article/sticky?sourceType=7`,
    // 投票相关
    // 创建投票
    createVoting: `${VotingAPI}/voting_periods/save`,
    // 列表
    votingList: `${VotingAPI}/voting_periods/list`,
    // 开启/关闭
    votingOpen: `${VotingAPI}/voting_periods/OpenOrOff`,
    // 更新
    votingUpdate: `${VotingAPI}/voting_periods/update`,
    // 投票项目
    // 列表
    votingProjectList: `${VotingAPI}/voting_details/list`,
    // 加票 / 入选 / 撤销
    votingProjectUpdate: `${VotingAPI}/voting_details/operation`,
    // 用户管理
    // 列表
    usersList: `${VotingAPI}/admin/user/list`,
    // 封号 / 认证
    usersBlocked: `${VotingAPI}/admin/user/operation`,

  },
  get token () {
    // 获取token
    return localStorage.getItem(`${this.prefix}token`)
  },
  failToken () {
    localStorage.removeItem(`${module.exports.prefix}token`)
    let from = location.pathname
    window.location = `${location.origin}/login?from=${from}`
  },
}
