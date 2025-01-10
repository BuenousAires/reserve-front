import config from "@/config.js";

export const defHttp = ({
	url = '',
	method = 'GET',
	data = {},
	header = {"content-type": "application/json"},
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.baseUrl + url,
			header: header,
			method: method,
			data: {
				...data
			},
			success:(res) =>{
				if(res.statusCode === 200) {
					if (res.data.status.code == 200) {
						resolve(res.data);
					} else {
						reject({
							code:res.data.status.code, 
							path: url,
							message:res.data.status.message,
						});
					}
				} else {
					reject({
						code: res.data.status, 
						path: res.data.path,
						message:res.data.error,
					});
				}
					
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}