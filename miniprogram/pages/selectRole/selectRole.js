// pages/selectRole/selectRole.ts
import { ComponentWithComputed } from "miniprogram-computed";
import userApi from "../../api/user"
import { goBack } from "../../utils/helpers"

const date = new Date()
const years = []
const months = []

const initYear = 1900
for (let i = initYear; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

const defaultBtn = {
  name: '立即进入开旭教师招聘',
  method: 'handleSubmit',
  color: '#FFFFFF',
}
const disabledBtn = {
  background: '#D2D5E2',
}
const activeBtn = {
  background: '#07C160',
}

ComponentWithComputed({
  /**
   * 页面的初始数据
   */
  data: {
    roleType: 1,
    years,
    months,
    pickerValue: [years.length - 1, 0],
    btnInfo: {
      ...defaultBtn,
      ...disabledBtn,
    },
    teacherInfo: {
      name: '',
      sex: 1, // 性别：0女1 男
      birthDate: '',
    },
    schoolInfo: {
      workUnit: '',
      contacts: '',
    }
  },

  watch: {
    'teacherInfo.**': function(info) {
      const {roleType} = this.data
      this.validData(roleType, {...info})
    },
    'schoolInfo.**': function(info) {
      const {roleType} = this.data
      this.validData(roleType, {...info})
    },
    roleType(val) {
      this.validData(val, {...this.data.teacherInfo, ...this.data.schoolInfo})
    }
  },

  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.switchRole()
    },
    
    validData(roleType, info) {
      let btn = {...disabledBtn}
      if (roleType === 1 && info.name && info.sex && info.birthDate) {
        btn = {...activeBtn}
      }
      if (roleType === 2 && info.workUnit && info.contacts) {
        btn = {...activeBtn}
      }
      this.setData({
        btnInfo: {
          ...defaultBtn,
          ...btn,
        },
      })
    },

    selectRoleType(e) {
      const { type } = e.currentTarget.dataset;
      this.setData({
        roleType: Number(type),
      })
      this.switchRole()
    },
  
    handleSelectSex(e) {
      const {sex} = e.currentTarget.dataset
      this.setData({
        ['teacherInfo.sex']: sex
      })
    },
  
    bindPickerChange(e) {
      console.log('e', e);
      const {value} = e.detail
      const {years, months} = this.data
      this.setData({
        ['teacherInfo.birthDate']: years[value[0]] + '-' + months[value[1]]
      })
    },
  
    async handleSubmit() {
      const {schoolInfo, teacherInfo, roleType} = this.data
      console.log('teacherInfo', teacherInfo);
      const params = roleType === 1 ? {...teacherInfo} : {...schoolInfo}
      await userApi.saveUserInfo(params)
      await this.switchRole()
      if (roleType === 1) {
        getApp().globalData.completeResumeMessageBox = true
      }
      goBack()
    },
  
    async switchRole() {
      
      await userApi.switchRole({
        roleType: this.data.roleType
      }, true)
    }
  }
})