var saveBaseUrl = function(baseUrl){
	localStorage.baseUrl = baseUrl;
};

var saveAuthKey = function(authKey){
	localStorage.authKey = authKey;
};

var testGet = function(){
	var baseUrl = localStorage.baseUrl;
	var authKey = localStorage.authKey;
	var url = baseUrl+'/issues.xml?assigned_to_id=me&key='+authKey;
	$.ajax({
		url: url,
		dataType: 'xml'
	})
	.done(function(data){
		$("#debug-area").text(data);
	});
}