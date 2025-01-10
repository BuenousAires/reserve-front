<template>
	<view class="container">
		<div 
			class="background-image"
			:style="{backgroundImage: 'url(' + image.background +')'}"
		></div>
		<view class="wite-card-comm bottom-card">
			<picker-view 
				v-if="picker.visible"
				:indicator-style="picker.indicatorStyle"
				class="picker-view"
				@change="bindPickerChange" 
			>
				<picker-view-column>
					<view class="item" v-for="(item,index) in picker.datedays" :key="index">
						{{item}}
					</view>
				</picker-view-column>
			
				<picker-view-column>
				  <view class="item" v-for="(item,index) in picker.hours" :key="index">
						{{item}}
						</view>
				</picker-view-column>
			</picker-view>
		</view>
		
		<view class="tabbar-bottom">
			<view class="footer">
				<view class="message">
					<view>
						预定时间：{{reserveString}}
					</view>
				</view>
				<view class="btn" @click="handleBtnClick">
					<text>提交</text>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
import { formatDate } from "@/utils/timeUtils.js";
import { getReserveList } from "@/api/reserve";
import { msg } from '@/utils/msg';
import config from "@/config.js";
export default {
	data(){
		return {
			datemsg:{
				"year":new Date().getFullYear(),
				"month":new Date().getMonth() + 1,
				"day":new Date().getDate(),
				"hour":new Date().getHours(),
				"minuter": new Date().getMinutes(),
			},
			timeOptions:{
				start: '14:00', 
				end:'21:00', 
				step:'00:15'
			},
			choseTime: "",
			chosedTimeList:[],
			reserveString: "",
			picker:{
				weekday : {
					0: "星期日",
					1: "星期一",
					2: "星期二",
					3: "星期三",
					4: "星期四",
					5: "星期五",
					6: "星期六",
				},
				indicatorStyle: `height: 50px;`,
				hour: 0,
				datedays: [],
				hours: [],
				value: [0, 5],
				visible: true,
			},
			image: {
				background: config.baseUrl + "/static/image/banner.jpg",
			}
		};
	},
	methods: {
		async getReserveList(data){
			try {
				let response = await getReserveList(data);
				this.chosedTimeList = response.data;
			} catch (e) {
				msg(e);
			}
		},
		async loadData(){
			let data = {
				start: this.timeOptions.start,
				end: this.timeOptions.end,
				step: this.timeOptions.step
			};
			
			uni.showLoading({
				title:"加载中"
			});
			
			await this.getReserveList(data);
			
			uni.hideLoading();
		},
		getStartFormatTime(_step){
			let date = new Date();
			let [startHours, startMinuter] = this.timeOptions.start.split(":");
			
			let _datemsg = {
				year: date.getFullYear(),
				month: (date.getMonth() + 1).toString().padStart(2, '0'),
				day: date.getDate().toString().padStart(2, '0'),
				hour: startHours.padStart(2, '0'),
				minuter: startMinuter.padStart(2, '0'),
			};
			let res = _datemsg.year + '-' + 
								_datemsg.month + '-' + 
								_datemsg.day + ' ' + 
								_datemsg.hour + ':' + 
								_datemsg.minuter + ':' + '00';
			return res;
		},
		getResertString(FormatTime){
			let [date, time] = FormatTime.split(" ");
			let [year, month, day] = date.split("-");
			let [hour, minuter, sec] = time.split(":");
			
			let [stepHours, stepMinuters] = this.timeOptions.step.split(":");
			let step = (parseInt(stepHours,10) * 60 + parseInt(stepMinuters,10));
			
			let toTime = new Date;
			toTime.setHours(parseInt(hour));
			toTime.setMinutes(parseInt(minuter) + step);
			
			let res = month + '月' +
								day + '日' + ' ' +
								hour + ':' +
								minuter + '-' +
								toTime.getHours() + ':' +
								toTime.getMinutes().toString().padStart(2, '0');
			return res;
		},
		getHoursList: function (start, end, step) {
			let res = [];
			let [startHours, startMinuters] = start.split(":");
			let [endHours, endMinuters] = end.split(":");
			
			let startDate = new Date();
			startDate.setHours(parseInt(startHours,10));
			startDate.setMinutes(parseInt(startMinuters,10));
			
			let endDate = new Date();
			endDate.setHours(parseInt(endHours,10));
			endDate.setMinutes(parseInt(endMinuters,10));
			
			let [stepHours, stepMinuters] = step.split(":");
			let stepMin = parseInt(stepHours,10) * 60 + parseInt(stepMinuters,10);
			
			for (
				let i = startDate; 
				i <= endDate - stepMin; 
				startDate.setMinutes(startDate.getMinutes() + stepMin) 
			){
				let stepDate = new Date();
				stepDate.setHours(startDate.getHours());
				stepDate.setMinutes(startDate.getMinutes() + stepMin);
				let resString = startDate.getHours() + 
												":" + startDate.getMinutes().toString().padStart(2, '0') +
												"-" + stepDate.getHours() +
												":" + stepDate.getMinutes().toString().padStart(2, '0');
				res.push(resString)
			}
			return res
		},
		getDateDaysList: function (start, end, step) {
			
			let res = [];
			let startDate = new Date();
			startDate.setDate(startDate.getDate() + start);
			
			let endDate = new Date();
			endDate.setDate(endDate.getDate() + end);
		
			for (
				let i = startDate; 
				i <= endDate; 
				startDate.setDate(startDate.getDate() + step)
			) {
				let resString = 
					startDate.getMonth() + 1 + "月" + 
					startDate.getDate() + "日 " +
					this.picker.weekday[startDate.getDay()];
				res.push(resString)
			}
			return res
		},
		getInitHour: function (start, end, step){
			let date = new Date();
			
			let [startHours, startMinuters] = start.split(":");
			let [endHours, endMinuters] = end.split(":");
			
			let startDate = new Date();
			startDate.setHours(parseInt(startHours,10));
			startDate.setMinutes(parseInt(startMinuters,10));
			
			let endDate = new Date();
			endDate.setHours(parseInt(endHours,10));
			endDate.setMinutes(parseInt(endMinuters,10));
			
			let [stepHours, stepMinuters] = step.split(":");
			let stepMin = parseInt(stepHours,10) * 60 + parseInt(stepMinuters,10);
			
			if (date < startDate){
				return 0;
			}
			
			if(date > endDate) {
				return this.hours.length - 1;
			}
			
			return Math.floor((date - startDate)/1000/60/stepMin);
		},
		bindPickerChange: function (e){
			const val = e.detail.value
			
			let nowDate = new Date();
			if (val[0] === undefined){
				nowDate.setDate(nowDate.getDate());
			}else {
				nowDate.setDate(nowDate.getDate() + val[0]);
			}
			
			let [start, end] = this.picker.hours[0].split('-');
			if(val[1] != undefined){
				[start, end] = this.picker.hours[val[1]].split('-');
			}
			let [reserveHour, reserveMinuter] = start.split(':');
			
			let _dateMsg = {
				year: nowDate.getFullYear(),
				month: (nowDate.getMonth() + 1).toString().padStart(2, '0'),
				day: nowDate.getDate().toString().padStart(2, '0'),
				hour: reserveHour,
				minuter: reserveMinuter,
			};
			console.log(_dateMsg)
			let res = _dateMsg.year + '-' +
								_dateMsg.month + '-' + 
								_dateMsg.day + ' ' + 
								_dateMsg.hour + ':' + 
								_dateMsg.minuter + ':' + '00';
			
			this.choseTime = res;
		},
		handleBtnClick(){
			console.log("choseTime:" + this.choseTime
			+ ", chosedTimeList:" + this.chosedTimeList);
			if(this.chosedTimeList.includes(this.choseTime)){
				uni.showToast({
						title: "当前时间已被预约",
						duration: 1500,
						icon: 'none' ,
						mask: false
					});
			} else {
				let path = `/pages/reserve/userinfo?reserve_time=${this.choseTime}&step=${this.timeOptions.step}`;
				uni.navigateTo({ url: path });
			}
		},
	},
	watch: {
		choseTime(newValue) {
			this.reserveString = this.getResertString(this.choseTime);
		}
	},
	mounted() {
		this.choseTime = this.getStartFormatTime(this.timeOptions.step);
		this.picker.hours = this.getHoursList(
			this.timeOptions.start,
			this.timeOptions.end,
			this.timeOptions.step
		);
		
		this.picker.datedays = this.getDateDaysList(0, 5, 1);
	},
	onLoad() {
		this.loadData();
	}
}
</script>


<style lang="scss" scoped>
@import 'reserve.scss';
.background-image {
	background-size: cover; /* 覆盖整个元素 */
	background-position: center; /* 图片居中显示 */
	background-repeat: no-repeat; /* 不重复图片 */
	min-height: 60vh; /* 至少100%的视口高度 */
}
</style>