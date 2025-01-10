<template>
	<view>
		<uni-calendar @change="changeCalendarSelect" @monthSwitch="changeClanedarMonth" :selected="reservedDate"></uni-calendar>
		<view v-if="!isReserveDay" class="wite-card-comm bottom-card info-card center-flex">
			<view class="close-font">无预约</view>
		</view>
		<view v-if="isReserveDay">
			<view 
				v-for="item in reservePlan" :key="item.id"
				class="wite-card-comm bottom-card info-card center-flex"
			>
				<view class="name-card">
					姓名：{{item.name}}
				</view>
				<view class="number-card">
					人数：{{item.peopleNumber}}
				</view>
				<view class="phone-card">
					电话：{{item.phone}}
				</view>
				<view class="come-card">
					来访时间：{{item.startTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getReservedDays, getReserveByDay } from '@/api/reserve.js';
import { formatDate } from '@/utils/timeUtils';
import { msg } from '@/utils/msg';
export default{
	data(){
		return {
			calendarDate: "",
			reservedDate: [],
			reservePlan:[],
			isReserveDay: false,
		}
	},
	methods:{
		changeCalendarSelect(params){
			this.calendarDate = params.fulldate;
			this.loadData();
		},
		changeClanedarMonth(params){
			this.changeMonth(params.year, params.month);
		},
		async getReservedDayByYearWithMonth(year, month){
			let data = {
				year: year,
				month: month,
			}
			try {
				let respone = await getReservedDays(data);
				this.reservedDate = respone.data;
			} catch (e) {
				msg(e);
			}
		},
		async getReserveByDay(data){
			data = {date: data}
			try {
				let response = await getReserveByDay(data);
				if(response.data.length > 0) {
					this.isReserveDay = true;
					this.reservePlan = response.data;
				} else {
					this.isReserveDay = false;
				}
			} catch(e) {
				msg(e);
			}
		},
		async changeMonth(year, month){
			uni.showLoading({
				title:"加载中"
			});
			await this.getReservedDayByYearWithMonth(year, month);
			this.isReserveDay = false;
			uni.hideLoading();
		},
		async loadData() {
			const dateObj = new Date(this.calendarDate);
			const year = dateObj.getFullYear();
			const month = dateObj.getMonth() + 1;
			
			uni.showLoading({
				title:"加载中"
			});
			await this.getReservedDayByYearWithMonth(year, month);
			await this.getReserveByDay(this.calendarDate);
			uni.hideLoading();
		},
	},
	onLoad() {
		this.calendarDate = formatDate(new Date(), 'YYYY-MM-dd');
		this.loadData();
	}
}
</script>

<style lang="scss" scoped>
.center-flex {
	display: flex;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
}
.name-card{
	width: 70%;
}
.number-card{
	width: 30%;
}
.phone-card{
	width: 100%;
}
.come-card{
	width: 100%;
}
.info-card{
	padding: 15px;
	margin-top: 15px;
	margin-bottom: 15px;
	font-size: 15px;
	flex-wrap: wrap;
	.close-font{
		color: #C0C0C4;
	}
}
</style>