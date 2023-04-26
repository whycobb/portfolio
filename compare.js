
console.log("Hi!");

var overlays = [];
var overlaid = false;

function togglewf() {
	console.log("Hi again!");
	
	if(overlays.length ==0) {
		console.log("No overlays found yet");
		overlays = document.getElementsByClassName("compare-overlay");
	}
	if(overlays.length > 0) {
		console.log("Overlays found!");
		
		if(overlaid) {
			
			for(let i = 0; i < overlays.length; i++) {
				console.log("Overlay..." + (i+1));
				overlays[i].style.opacity = "0%";
			}
			overlaid = false;
			
		} else {
			
			for(let i = 0; i < overlays.length; i++) {
				console.log("Overlay..." + (i+1));
				overlays[i].style.opacity = "100%";
			}
			overlaid = true;
			
		}
		
		
		
		
		
	}
}