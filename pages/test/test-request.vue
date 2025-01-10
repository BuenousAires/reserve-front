<template>
	<view>
		<view v-for="item in params" :key="item.id">
			{{item.text}}
		</view>
		<view> {{word}} </view>
	</view>
</template>

<script>
import { getText, getError, getDelays } from '@/api/test.js';
import { msg } from '@/utils/msg.js'
export default{
	data() {
		return {
			params:[
				{id:1, text:'a'},
				{id:2, text:'b'},
				{id:3, text:'c'},
			],
			word: "ok",
		};
	},
	methods: {
		async getABC() {
			try {
				let response = await getText();
				this.params = response.data;
			} catch(e){
				msg(e)
			}
		},
		async getString() {
			try{
				let response = await getDelays();
				this.word = response.data;
			} catch(e) {
				msg(e)
			}
		},
		async loadData(){
			uni.showLoading({
				title:"加载中"
			});
			await this.getABC();
			await this.getString();
			uni.hideLoading();
		}
	},
	onLoad() {
		this.loadData();
	}
}
</script>

<style>
</style>