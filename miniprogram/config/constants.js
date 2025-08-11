export const DEFAULT_HOST = 'http://124.221.101.120:11993'

export const TABBAR_ROUTE = [
  '/pages/index/index.js',
  '/pages/notice/notice',
  '/pages/message/message',
  '/pages/mine/mine'
]

export const STORAGE = {
  USER_TOKEN: 'userToken',
  CURRENT_ROLE_TYPE: 'currentRoleType',
  USER_BASE_INFO: 'userBaseInfo',
}

export const COLOR = {
  MAIN_COLOR: '#07C160',
  INVITE_COLOR: '#1477FF'
}

export const JOB_INTENTION_KEY = {
  XDXK: 'xdxk',
  XZDQ: 'xzdq',
  YXDQ: 'yxdq',
  QWXZ: 'qwxz',
  DWXZ: 'dwxz',
  GWXZ: 'gwxz',
  QZZT: 'qzzt',
}

export const JOB_INTENTION_LABEL = {
  [JOB_INTENTION_KEY.XDXK]: '学段学科',
  [JOB_INTENTION_KEY.YXDQ]: '意向地区',
  [JOB_INTENTION_KEY.QWXZ]: '期望薪资',
  [JOB_INTENTION_KEY.DWXZ]: '单位性质',
  [JOB_INTENTION_KEY.GWXZ]: '岗位性质',
  [JOB_INTENTION_KEY.QZZT]: '求职状态',
}

export const DICT_TYPE_MAP = {
  education: 'EDUCATION',
  identity: 'IDENTITY',
  schoolStage: 'SCHOOL_STAGE',
  subject: 'SUBJECT',
  jobStatus: 'JOB_STATUS',
  // 福利：WELFARE
  // 单位性质：UNIT_NATURE
  // 工作性质：JOB_NATURE
  // 工作经验：EXPERIENCE
  // 学历：EDUCATION
  // 学段：SCHOOL_STAGE
  // 学科：SUBJECT
}

export const PROVICNCE_CODE = {
  DEFAULT: '000000000000',
  ZJ: '330000000000'
}

// 单位性质选项
export const SCHOOL_NATURE_OPTION = [
  {
    label: '公办',
    value: '1',
  },
  {
    label: '民办',
    value: '2',
  },
]

// 岗位性质选项
export const JOB_NATURE_OPTION = [
  {
    label: '编制',
    value: '1',
  },
  {
    label: '非编',
    value: '2',
  },
]

