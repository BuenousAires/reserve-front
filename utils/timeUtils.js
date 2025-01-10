export function formatDate(date, format='YYYY-MM-dd HH:mm:ss') {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

	return format.replace('YYYY', year.toString())
							 .replace('MM', month)
							 .replace('dd', day)
							 .replace('HH', hours)
							 .replace('mm', minutes)
							 .replace('ss', seconds);
}

export function getMinuter(step){
	let [hour, minute] = step.split(':');
	return parseInt(hour) * 60 + parseInt(minute);
}

export function nextStepTime(time, step){
	let currentTime = new Date(time);
	let [hour, minute] = step.split(':');
	
	currentTime.setHours(currentTime.getHours() + parseInt(hour));
	currentTime.setMinutes(currentTime.getMinutes() + parseInt(minute));
	
	return formatDate(currentTime);
}