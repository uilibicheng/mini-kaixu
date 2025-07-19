export interface ILogin {
  jsCode: string
}

export interface ILoginByPhone extends ILogin {
  iv: string
  encryptedData: string
}

export interface ILogout {
  userToken: string
}
