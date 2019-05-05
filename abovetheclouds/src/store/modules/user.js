import { login,logout,getInfo} from '@/api/user'
import {getToken,setToken,removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
//用户登录
  login({ commit }, userInfo) {
   
    return new Promise((resolve, reject) => {
    let obj = {
           sellerName:userInfo.username, memberPasswd: userInfo.password
      }
      login({...obj}).then(response => {
        console.log(response,'1234567')
        const data = response.data

        commit('SET_TOKEN', data.token)

        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


  //获取用户信息
  getInfo({ commit,state }) {

    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response

        if (!data) {
          reject('验证失败，请重新登录.')
        }

        const {
          name,
          avatar
        } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户注销
  logout({ commit, state }) 
    {
      return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除令牌
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

