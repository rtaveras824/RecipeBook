// ----------------------- Search Filters Toggle ---------------------------

var orderFilter = document.getElementById('order_filter');
var purchaseFilter = document.getElementById('purchase_filter');

function toggleOrderFilterDisplay(display) {
	if(display == 'all' || display == 'purchase') {
		orderFilter.style.display = 'inline-block';
	} else {
		orderFilter.style.display = "none";
	}
}
toggleOrderFilterDisplay(purchaseFilter.value);

purchaseFilter.addEventListener('click', function(event) {
	console.log('clicked', event.target.value);
	toggleOrderFilterDisplay(event.target.value);
});