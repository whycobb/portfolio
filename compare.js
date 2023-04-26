var overlays = [];
var overlaid = false;

function togglewf() {
	if(overlays.length ==0) {
		overlays = document.getElementsByClassName("compare-overlay");
	}
	if(overlays.length > 0) {
		if(overlaid) {
			for(let i = 0; i < overlays.length; i++) {
				overlays[i].style.opacity = "0%";
				overlays[i].style.pointerEvents = "none";
			}
			overlaid = false;
		} else {
			for(let i = 0; i < overlays.length; i++) {
				overlays[i].style.opacity = "100%";
				overlays[i].style.pointerEvents = "auto";
			}
			overlaid = true;
		}
	}
}