import App from './App'
import Vue from 'vue'
import store from './store'
import config from './config.js'

// 统一提示
function msg(title = "", duration = 1000, icon = 'none', mask = false) {
	uni.showToast({
		title: title,
		duration: duration,
		icon: icon ,// none success loading
		mask:mask
	});
}

// 异步请求数据
const request = function(path, method, data, failCallback, completeCallback){
	uni.showLoading({
		mask: true
	})
	return new Promise(resolve => {
		uni.request({
			url: config.baseUrl + path,
			data: data,
			method: method,
			timeout: 2000,
			header: {
				'Content-Type': 'application/json; charset=UTF-8',
				'token': store.getters.getToken
			},
			success: res=> {
				uni.hideLoading();
				console.log("[请求][" + method + "][" + path + "] [返回结果]", res.data);
				if(res.statusCode >= 200 && res.statusCode <= 300) {
					if (res.data.code === 200) {
						resolve(res.data);
					} else {
						if (failCallback){
							failCallback(res.data.message)
						} else {
							msg(res.data.message)
						} 
					}
				} else {
					msg("请求异常")
				}
			},
			fail: ()=>{
				uni.hideLoading();
				msg("服务器网络错误")
			},
			complete() {
				if(completeCallback){
					completeCallback()
				}
			}
		})
	})
}

const login = function(){
	const that = this;
	uni.login({
		provider:'weixin',
		success: res =>{
			console.log('微信登录 code:', res.code);
			that.$request('/user/login/weixin','post',{
				code:res.code
			}).then(result =>{
				that.$store.commit('login',result.data);
			})
		},
		fail: (err) => {
		  console.log('微信登录失败:', err);
		}
	})
}

const handlerLocalToken = function(){
	let token = uni.getStorageSync('token');
	uni.removeStorageSync('token');
	if (token) {
		let that = this;
		that.$store.commit('setToken', token);
		that.$request('/user/info', 'get').then(result => {
			console.log('[通过token登录]');
			that.$store.commit('login', result.data);
			that.$store.commit("setToken", result.data.token);
		});
	}
}


Vue.prototype.$store = store
Vue.prototype.$msg = msg;
Vue.prototype.$request = request;
Vue.prototype.$config = config

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
