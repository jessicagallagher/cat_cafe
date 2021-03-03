$(document).ready(() => {
	const burger = $('.navbar-burger');
	const menu = $('.navbar-menu');

	$('.navbar-burger').click(() => {
		burger.toggleClass('is-active');
		menu.toggleClass('is-active');
	});
});

const showPassword = () => {
	let x = document.getElementById('password');
	if(x.type === 'password') {
		x.type = 'text';
	} else {
		x.type = 'password';
	};
};
