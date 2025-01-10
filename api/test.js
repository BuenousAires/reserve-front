import { defHttp } from "@/utils/http/request"

export function getText(){
	return defHttp({
		url: '/test/test',
		method:'GET',
	});
}

export function getError(){
	return defHttp({
		url: '/test/test2',
		method:'GET',
	});
}

export function getDelays(){
	return defHttp({
		url: '/test/testDelays',
		method:'GET',
	});
}