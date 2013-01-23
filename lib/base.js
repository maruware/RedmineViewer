var saveBaseUrl = function(baseUrl){
	localStorage.baseUrl = baseUrl;
	console.log(baseUrl);
};

var saveAuthKey = function(authKey){
	localStorage.authKey = authKey;
	console.log(authKey);
};

var testGet = function(){
	var baseUrl = localStorage.baseUrl;
	var authKey = localStorage.authKey;
	var url = baseUrl+'/issues.xml?assigned_to_id=me&key='+authKey;
	$.ajax({
		url: url,
		dataType: 'text'
	})
	.done(function(data){
		$("#debug-area").text(data);
	});
}

var getIssueList = function(onSuccess, onError){
	var baseUrl = localStorage.baseUrl;
	var authKey = localStorage.authKey;
	var url = baseUrl+'/issues.xml?assigned_to_id=me&key='+authKey;
	$.ajax({
		url: url,
		dataType: 'text'
	})
	.done(function(data){
		onSuccess(data);
	});
}

var updateIssueList = function(){
	getIssueList(function(data){
		$(data).find('issue').each(function(){
			var $tr = $('<tr></tr>');
			$("#issue-list").append($tr);
			var subject = $(this).children('subject').text();
			var status = $(this).children('status').attr('name');
			$('<td></td>').appendTo($tr).text(subject);
			$('<td></td>').appendTo($tr).text(status);

		});
	});
};

  $(document).ready(function(){
    if(localStorage.baseUrl){
      $("#url").val(localStorage.baseUrl);
    }
    if(localStorage.authKey){
      $("#auth-key").val(localStorage.authKey);
    }

    $("#savebtn").click(function(){
      saveBaseUrl($('#url').val());
      saveAuthKey($('#auth-key').val());
    });

    $("#debug-btn").click(function(){
    	testGet();
    });

    $("#update-btn").click(function(){
    	updateIssueList();
    });

    if(localStorage.baseUrl && localStorage.authKey){
    	updateIssueList();
    }
  });