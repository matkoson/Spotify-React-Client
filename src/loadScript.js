export default function loadScript({src,id,callback}){
	if(id&& document.getElementById(id))return;
	const script = document.createElement('script');
	if(callback)
	script.onload = callback;
	if(id)script.setAttribute('id',id);
	script.setAttribute('src',src);
	document.body.appendChild(script);
}