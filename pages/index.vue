<template>
	<div>
		<div 
			class="background-image" 
			:style="{backgroundImage: 'url(' + image.background +')'}"
		></div>
		<div class="wite-card-comm top-card">
			<div class="icon center-flex" @click="handleReserveClick">
				<div class="button">
					<div class="button-icon center-flex">
						<image class="icon-image" :src="image.reserve" mode="heightFix">
					</div>
					<div class="button-title center-flex">预 约</div>
				</div>	
			</div>
			<div class="icon center-flex" @click="handleCalendarClick">
				<div class="button">
					<div class="button-icon center-flex">
						<image class="icon-image" :src="image.calendar" mode="heightFix">
					</div>
					<div class="button-title center-flex">安 排</div>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
import config from "@/config.js";
export default{
	data(){
		return{
			image:{
				background: config.baseUrl + "/static/image/banner.jpg",
				reserve:"/static/images/reserve.png",
				calendar:"/static/images/calendar.png",
			}
		}
	},
	methods: {
		handleReserveClick(){
			uni.navigateTo({
				url:'/pages/reserve/reserve'
			});
		},
		handleCalendarClick(){
			uni.navigateTo({
				url:'/pages/calendar/calendar'
			});
		}
	},
}
</script>

<style lang="scss" scoped>
.background-image {
	background-size: cover; /* 覆盖整个元素 */
	background-position: center; /* 图片居中显示 */
	background-repeat: no-repeat; /* 不重复图片 */
	min-height: 60vh; /* 至少100%的视口高度 */
}
.center-flex {
	display: flex;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
}
.top-card {
	margin-top: -5vh;
	height: 20vh;
	display: flex;
}
.icon {
	height: 100%;
	width: 50%;
	.button {
		height: 100px;
		width: 100px;
		.button-icon {
			height: 80%;
			width: 100%;
			.icon-image {
				 height: 60%;
				 width: 100%;
			}
		}
		.button-title {
			height: 20%;
			width: 100%;
		}
	}
}
</style>