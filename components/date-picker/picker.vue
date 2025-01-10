<template>
    <view>
      <picker-view 
				:indicator-style="indicatorStyle" 
				:value="[0, hour]" 
				@change="bindChange" 
				class="picker-view"
			>
				<picker-view-column>
					<view class="item" v-for="(item,index) in datedays" :key="index">
						{{item}}
					</view>
				</picker-view-column>

				<picker-view-column>
				  <view class="item" v-for="(item,index) in hours" :key="index">
						{{item}}
						</view>
				</picker-view-column>
      </picker-view>
    </view>
</template>

<script>
export default {
	name: "pickerDate",
	data() {
		return {		
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
		}
	},
	props: {
		timeOptions:{
			type: Object,
		},
		dayOptions:{
			type: Object,
		},
		value: {
			type: String,
		}
	},
	created() {
		
		let date = new Date();
		this.hours = this.getHoursList(
			this.timeOptions.start,
			this.timeOptions.end,
			this.timeOptions.step
		);

		this.datedays = this.getDateDaysList(
			this.dayOptions.start,
			this.dayOptions.end,
			this.dayOptions.step
		);
		
		this.hour = this.getInitHour(
			this.timeOptions.start,
			this.timeOptions.end,
			this.timeOptions.step
		);
		console.log("------------------------",this.hours,this.datedays,this.hour)
	},
	methods: {
		bindChange: function (e) {
			const val = e.detail.value
			
			let nowDate = new Date();
			nowDate.setDate(nowDate.getDate() + val[0]);
			
			let [start, end] = this.hours[val[1]].split('-');
			let [reserveHour, reserveMinuter] = start.split(':');
			
			let _dateMsg = {
				year: nowDate.getFullYear(),
				month: (nowDate.getMonth() + 1).toString().padStart(2, '0'),
				day: nowDate.getDate().toString().padStart(2, '0'),
				hour: reserveHour,
				minuter: reserveMinuter,
			};
			
			let res = _dateMsg.year + '-' +
								_dateMsg.month + '-' + 
								_dateMsg.day + ' ' + 
								_dateMsg.hour + ':' + 
								_dateMsg.minuter + ':' + '00';
								
			this.$emit('update:value', res);
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
					this.weekday[startDate.getDay()];
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
		}
	}
}
</script>

<style>
		.picker-view {
			width: 100%;
			height: 600rpx;
			margin-top: 20rpx;
		}
		.item {
			line-height: 100rpx;
			text-align: center;
		}
</style>