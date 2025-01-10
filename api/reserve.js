import { defHttp } from "@/utils/http/request"

export function addReserve(data) {
	return defHttp({
		url:'/reserve/save',
		method:'POST',
		data: data,
	});
}

export function getReserveList(data){
	return defHttp({
		url: '/reserve/reserveList',
		method: 'GET',
		data: data,
	});
}

export function getReservedDays(data) {
	return defHttp({
		url: '/reserve/getReservedDay',
		method:'GET',
		data: data,
	});
}

export function getReserveByDay(data) {
	return defHttp({
		url: '/reserve/getReserveByDay',
		method: 'GET',
		data: data,
	});
}