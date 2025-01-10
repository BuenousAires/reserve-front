import config from "@/config.js"

export const defHttp = ({
	url	= '',
	data = {},
	header = {"content-type": "application/json"},
	method = 'GET',
	api = config.baseUrl
}) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title:"加载中"
		});
		uni.request({
			url: api + url,
			header: header,
			method: method,
			data:{
				...data,
			},
			success: res => {
				setTimeout(() => {uni.hideLoading()}, 1000);
				console.log(res)
				if(res.data.status.code === 200){
					console.log("=========")
					resolve(res.data)
				} else {
					console.log("xxxxxxxxx")
					reject(res.data)
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}