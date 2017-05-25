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

function searchGeonames(myUrl) {
                //build the DataTable
                $('#nearby').DataTable({
                    "ajax": {
                        "url": myUrl,
                        "dataSrc": "geonames"
                    },
                    "responsive": true,
                    "oLanguage": {
                        "sSearch": "Filter: "
                    },
                    "fnInitComplete": function(oSettings, json) {
                        initializePopovers();
                        initializePage();
                    },
                    "fnDrawCallback": function(oSettings) {
                        initializePopovers();
                    },
                    "aoColumns": [{
                            "mData": "feature",
                            "sDefaultContent": "",
                            "className": "text-center",
                            "mRender": function(data, type, full) { //assign icons based on location type
                                if (data === 'edu') {
                                    return '<i class="fa fa-graduation-cap" aria-hidden="true"></i>';
                                } else if (data === 'landmark') {
                                    return '<i class="fa fa-building-o" aria-hidden="true"></i>';
                                } else if (data === 'waterbody') {
                                    return '<i class="fa fa-tint" aria-hidden="true"></i>';
                                } else if (data === 'mountain') {
                                    return 'mtn';
                                } else {
                                    return '<i class="fa fa-lightbulb-o" aria-hidden="true"></i>';
                                };
                            }
                        },
                        {
                            "mData": "distance",
                            "mRender": function(data, type, full) {
                                if (localStorage.getItem("settings-distanceUnit") == "km") {
                                    return (Math.round(data * 100) / 100) + ' km'; //meters to KM
                                } else {
                                    return (Math.round(data * 100 * 0.62137) / 100) + ' mi'; //meters to Miles
                                }

                            }
                        },
                        {
                            "mData": "title",
                            "mRender": function(data, type, full) {
                                return data + ' <button type="button" class="btn btn-xs btn-circle pull-right" data-html="true" data-toggle="popover" data-content="<div class=\'text-center\'><a class=&quot;btn btn-info&quot; onclick=\'cordova.InAppBrowser.open(&quot;http://' + full.wikipediaUrl + '&quot;, &quot;_blank&quot;);\'>More Info</a><br><br><a class=&quot;btn btn-success&quot; onclick=\'cordova.InAppBrowser.open(&quot;http://maps.google.com/?q=' + full.lat + ',' + full.lng + '&quot;, &quot;_blank&quot;);\'>Get Directions</a></div>"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></button>'; //Create popovers when you click on ellipsis icon
                            }

                        }
                    ]
                });
            }