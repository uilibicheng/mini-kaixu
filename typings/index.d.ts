/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    needLogin?: boolean
    alreadyLoadBaseInfo?: boolean
    waterMaskImg?: string
    companyLogo?: string
    shareCompanyLogo?: string
    language?: string
    kaiyunBindInfo?: object
    abTestCfg?: Array<{
      abTestCode: string
      isHit: boolean
    }>
  }
  getCompanyLogo?: any
  initLanguage?: any
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}
