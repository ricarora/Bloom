var startUps = new Array();

$(document).ready(function() {
	loadDefaults();
});

$("#search").click(function() {
	$('#results').empty();

	if($("#query").val().length > 0) {
		$.getJSON("https://api.angel.co/1/search?query=\"" + $("#query").val() + "&callback=?", function(json){

			for(var index in json) {

				var img  = '<img src="' + json[index].pic +'" />';
				var info = '<h1 class="title">' + json[index].name + '</h1>';
				info += '<p class="details">' + json[index].url + '</p>';
				info += '<h3><a href="#" class="sms">Send SMS to this company!</a></h3>';
				$('#results').prepend(getHtml(img, info));
			}
		});
	} else {
		loadDefaults();
	}
});

function loadDefaults() {
	$.getJSON("https://api.angel.co/1/startups?filter=raising&callback=?", function(json){
	
		for(var sIndex in json.startups) {
			startUps.push(cleanupStartupData(json.startups[sIndex]));
		}


		for(var index in startUps) {
	
			var img  = '<img src="' + startUps[index].logo +'" />';
			var info = '<h1 class="title">' + startUps[index].name + '</h1>';
			info += '<p class="details">' + startUps[index].desc + '</p>';
			info += '<h3 class="famt">Amount raising: ' + startUps[index].famt + '</h3>';
			info += '<h3 class="ramt">Amount raised: ' + startUps[index].ramt + '</h3>';
			info += '<h3><a href="#" class="sms">Send SMS to this company!</a></h3>';
	
	
			$('#results').prepend(getHtml1(img, info));
		}
		$(".sms").bind("click", function(evt){
			evt.preventDefault();
			var url = "https://datadipity.com/clickslide/girlswhocodesms.json?update&PHPSESSID=dvqbbkmm27tsi8uuvjmrqdfi60&postparam[num]=17402194120&postparam[message]=I want to invest!"
			$.ajax({
                                type: "GET",
                                url: url,
                                crossDomain: true,
                                success: function (data) {
                                    console.log("Made NML Request");
                                },
                                error: function (err) {
                                    console.log("NML Failed!");
                                    console.log(JSON.stringify(err));
                                }
                            });
		});
	});
}
function getHtml1(img, info) {

	return "<div class=\"startup\">" + 
	"<div class=\"imgs\">" + img + "</div>" + 
	"<div class=\"info\">" + info + "</div>" + 
	"</div>";
}

function getHtml(img, info) {

	return "<div class=\"startup\">" + 
	"<div class=\"imgs\">" + img + "</div>" + 
	"<div class=\"info\">" + info + "</div>" + 
	"</div>";
}

function cleanupStartupData(s) {
	return {
		"name" : s.name,
		"logo" : s.logo_url,
		"desc" : s.product_desc,
		"famt" : s.fundraising.raising_amount,
		"ramt" : s.fundraising.raised_amount
	}
}