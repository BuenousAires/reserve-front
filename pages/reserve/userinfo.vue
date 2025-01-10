<template>
	<view  class="container d-flex flex-column">
		<view class="flex-fill form">
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label"><text style="color: red;">*</text>姓名</view>
					<view class="input flex-fill">
						<input type="text" placeholder="请填写姓名" placeholder-class="text-color-assist font-size-base" v-model="userInfoForm.nickName">
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label"><text style="color: red;">*</text>手机号码</view>
					<view class="input flex-fill" >
						<input type="text" placeholder="请输入11位手机号码" maxlength="11" placeholder-class="text-color-assist font-size-base" v-model="userInfoForm.telNumber">
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label"><text style="color: red;">*</text>人数</view>
					<view class="input flex-fill" >
						<input 
							type="text" 
							placeholder="请输入预约人数" 
							placeholder-class="text-color-assist font-size-base" 
							v-model="userInfoForm.peopleNumber"
						>
					</view>
				</view>
			</list-cell>
			<view class="d-flex align-items-center just-content-center" style="margin-top: 30px;">
				<button type="primary" class="save-btn" @tap="save">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
import listCell from '@/components/list-cell/list-cell'
import { nextStepTime, getMinuter } from '@/utils/timeUtils'
import { addReserve } from '@/api/reserve.js'

export default {
	components: {
		listCell
	},
	data() {
		return {
			userInfoForm: {
				nickName: '',
				telNumber: '',
				reserveTime: '',
				step: '',
				peopleNumber: '',
			}
		}
	},
	onLoad(options) {
		this.userInfoForm.reserveTime = options.reserve_time;
		this.userInfoForm.step = options.step;
	},
	methods: {
		save() {
			if(!/^1\d{10}$/.test(this.userInfoForm.telNumber)){
				this.$msg("请输入正确的手机号");
				return false;
			}
			
			let endTime = nextStepTime(
				this.userInfoForm.reserveTime, 
				this.userInfoForm.step
			);
			
			const data = {
				name: this.userInfoForm.nickName,
				phone: this.userInfoForm.telNumber,
				peopleNumber: this.userInfoForm.peopleNumber,
				startTime: this.userInfoForm.reserveTime,
				endTime: endTime,
				step: getMinuter(this.userInfoForm.step),
			}
			addReserve(data).then(() => {
				uni.showToast({
					title:'操作成功',
					icon:'success',
					duration: 2000
				});
				uni.navigateTo({
					url:'/pages/reserve/reserve'
				});
			}).catch(() => {
				uni.showToast({
					title:'操作失败',
					image:'../../static/images/fail.png',
					duration: 2000
				});
			})
		}
	}
}
</script>

<style lang="scss" scoped>
page {
	height: 100%;
}	

.container {
	padding: 20rpx 30rpx;
}

.form {
	border-radius: 8rpx;
}

.form-input {
	.label {
		width: 160rpx;
		font-size: $font-size-base;
		color: $text-color-base;
	}
	.input {
	}
}

.save-btn {
	width: 90%;
	border-radius: 50rem !important;
	font-size: $font-size-lg;
	background-color: black;
}
</style>