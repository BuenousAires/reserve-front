 // 本地环境
const dev = {
  baseUrl: 'http://localhost:8447/uni',
  env: "dev", 
  debug: true
}

const uat = {
	baseUrl: 'http://47.96.8.252:8447/uni',
	env: "uat", 
	debug: false
}

const prod = {
  baseUrl: 'http://8.140.240.201:8101/naicha-api',
  env: "prod", 
  debug: false
}

export default uat
 