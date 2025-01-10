import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		token: null,
		userInfo: null,
	},
	mutations: {
		login(state, userInfo) {
			console.log("[vuex] 登录", userInfo)
			state.token = userInfo.token;
			state.userInfo = userInfo;
			uni.setStorageSync('token',userInfo.token)
			uni.setStorageSync("userInfo", userInfo)
		},
		setUserInfo(state, userInfo){
			state.userInfo = userInfo;
			uni.setStorageSync("userInfo", userInfo) // 缓存用户的信息到本地
		},
		setToken(state, token){
			state.token = token;
			uni.setStorageSync('token', token)
		},
	},
	getters: {
		getUserInfo: state => {return state.userInfo; },
		getToken: state => {return state.token},
	}
})

export default store