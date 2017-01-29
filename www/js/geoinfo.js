function initializePopovers(){
		//Fix bootstrap issue #16732 https://github.com/twbs/bootstrap/issues/16732
		$('body').on('hidden.bs.popover', function (e) {
		   $(e.target).data("bs.popover").inState.click = false;
		});

		//Initialize all popovers on the page-- this may need to later be after the table is populated
		$('[data-toggle="popover"]').popover({
			placement : 'left',
			title : 'Actions <a href="#" class="close popoverClose" data-dismiss="alert" style="position: relative; bottom: 3px; color: #2c3e50; text-decoration:none;">×</a>'
		});
		   
		//Close the popover if you click the X button
		$(document).on("click", ".popover .close" , function(){
			$(this).parents(".popover").popover('hide');
		});

		//Close the popover if you click anywhere outside of it
		$('body').on('click', function (e) {
		   $('[data-toggle="popover"]').each(function () {
			   //the 'is' for buttons that trigger popups
			   //the 'has' for icons within a button that triggers a popup
			   if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				   $(this).popover('hide');
			   }
		   });
		});
		
	}
	
function initializePage(){
	//close the navbar when you click anywhere else on the page
		$(document).click(function (event) {
			var clickover = $(event.target);
			var $navbar = $(".navbar-collapse");               
			var _opened = $navbar.hasClass("in");
			if (_opened === true && !clickover.hasClass("navbar-toggle")) {      
				$navbar.collapse('hide');
			}
		});
}

function initializeSettings(){
	if (typeof(Storage) !== "undefined") {
		//localstorage is available
		if(localStorage.getItem("settings-distanceUnit") === null){
			localStorage.setItem("settings-distanceUnit", "km");
		}
	} else {
		//localstorage is not available. all settings should be disabled.
	}
}

function testSettings(){
	if (typeof(Storage) !== "undefined") {
		//localstorage is available
	} else {
		//localstorage is not available. all settings should be disabled.
		$('#settings-id-distanceUnit').prop("disabled",true);
	}
}

function toggleCheckbox(setting){
	if (setting == "distanceUnit"){
		if (localStorage.getItem("settings-distanceUnit") == "km"){
			localStorage.setItem("settings-distanceUnit", "mi");
		} else {
			localStorage.setItem("settings-distanceUnit", "km");
		}
	}
}