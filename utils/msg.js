export function msg(error) {
	uni.showToast({
		title: "error：" + error.path,
		duration: 1500,
		icon: 'none' ,
		mask: false
	});
}