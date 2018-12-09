
var hotel = {
	name: 'quay',
	rooms: 40,
	booked: 25,
	gym: true,
	roomType: ['트윈', '싱글', '스위트'],
	checkAvailability: function(){
		return this.rooms * this.booked;
	}
}


var z = checkAvailability();

console.log(z);