//
var global_select_id = 0;
var global_max_count = 0;
var global_last_slct = 0;
var global_enb_loads = 0;
//
$(document).ready(function() {
//
	$('#auto_loader').hide();
	//
	$('#search_init').bind('input', function(){
		//
		var whattyped = $(this).val();
		//
		if(whattyped.length > 0){
			//
			global_select_id = 0;
			getthelist(whattyped);
			//
		}else{
			$('#auto_loader').hide();
		}
		//
	});
	//
	$(document).on('click', '.repeat_list_result', function(e) {
		//
		global_select_id = $(this).data('nm');
		class_assign_on_select();
		select_a_list();
		//
	});
	//
	$('html').click(function() {
    	//
    	if(global_enb_loads == 1){
    		//
    		cancel_auto_complete();
    		//
    	}
    	//
 	});
	//
//
});
//
function getthelist (whattyped) {
	// body...
	$('#auto_loader').show();
	global_enb_loads = 1;
	//
	$('.load_loading_here').show();
	// 
	var request = $.ajax({
	  url: "http://localhost/project_r/frontend/web/user/getuser", //your url here
	  method: "GET",
	  data: { serach_que : whattyped },
	  dataType: "JSON"
	});
	request.done(function(data) {
	  //
	  $('.load_loading_here').hide();
	  //
	  listdownresult(data.data,data.aurl);
	});
	request.fail(function( jqXHR, textStatus ) {
	  //alert( "Request failed: " + textStatus );
	});
	// 
}
//
function listdownresult(result,url_data){
	//
	$('#auto_loader').html('');
	//
	if(result !== 0){
		//
		for(var i = 0,j=1 ; i < result.length ; i++ , j++){
			//
			global_max_count++;
			//Make sure return data is in this format 
			var avatar_user = result[i].user_avt_name;
			var full_name_u = result[i].full_name;
			var email_of_ur = result[i].email;
			//
			if(avatar_user == null){avatar_user = 'null';}
			//
			var user_avatar = user_avatar_mixer(avatar_user,full_name_u,url_data);
			//Applay to the desired postion
			$('#auto_loader').append('<div class="repeat_list_result repeat_unique_'+j+'" data-sl="'+full_name_u+'" data-nm="'+j+'"><div class="col-md-12 nopadding"><div class="col-md-4">'+user_avatar+'</div><div class="col-md-8 nopadding auto_list_dlts"><div class="col-md-12 nopadding auto_dlts_name">'+full_name_u+'</div><div class="col-md-12 nopadding auto_dlts_email">'+email_of_ur+'</div></div></div></div>');
			//
		}
		//
	}else{
		//
		$('#auto_loader').append("<div class='col-md-12 no_results'>No results found!</div>");
		//
	}
	//
}
//
function user_avatar_mixer(image_name,user_name,url_data){
	//
	var user_avatar = '';
	//
	if(image_name.length > 4){
		imageurl = url_data + image_name;
		user_avatar = '<img src="'+imageurl+'" alt="Avatar" class="img-circle user_avatar">';
	}else{
		var return_color = user_avatar_no_image_color(user_name);
		var first_char_n = user_name.charAt(0);
		user_avatar = '<div class="user_avatar_name" style="background-color:'+return_color+'">'+first_char_n+'</div>';
	}
	//
	return user_avatar;
	//
}
//
function user_avatar_no_image_color(user_name){
	//
	var color_meterial = ['#E64A19','#F57C00','#388E3C','#00796B','#0097A7','#0288D1','#0288D1','#303F9F','#616161'];
	//
	var ascii_of_first = user_name.charCodeAt(0);
	//
	var color_assigned = '#E64A19';
	//
	if(ascii_of_first === 65 || ascii_of_first === 66 || 
	   ascii_of_first === 67 || ascii_of_first === 97 || 
	   ascii_of_first === 98 || 99){
		color_assigned = color_meterial[0];
    }
	if(ascii_of_first === 68 || ascii_of_first === 69 || 
	   ascii_of_first === 70 || ascii_of_first === 100 ||
	   ascii_of_first === 101 || ascii_of_first === 102){
		color_assigned = color_meterial[1];
    }
	if(ascii_of_first === 71 || ascii_of_first === 72 || 
	   ascii_of_first === 73 || ascii_of_first === 103 || 
	   ascii_of_first === 104 || ascii_of_first === 105){
		color_assigned = color_meterial[2];
	}
	if(ascii_of_first === 74 || ascii_of_first === 75 || 
	   ascii_of_first === 76 || ascii_of_first === 106 || 
	   ascii_of_first === 107 || ascii_of_first === 108){
		color_assigned = color_meterial[3];
    }
	if(ascii_of_first === 77 || ascii_of_first === 78 || 
	   ascii_of_first === 79 || ascii_of_first === 109 || 
	   ascii_of_first === 110 || ascii_of_first === 111){
		color_assigned = color_meterial[4];
    }
	if(ascii_of_first === 80 || ascii_of_first === 81 || 
		ascii_of_first === 82 || ascii_of_first === 112 || 
		ascii_of_first === 113 || ascii_of_first === 114){
		color_assigned = color_meterial[5];
    }
	if(ascii_of_first === 83 || ascii_of_first === 84 || 
	   ascii_of_first === 85 || ascii_of_first === 115 || 
	   ascii_of_first === 116 || ascii_of_first === 117){
		color_assigned = color_meterial[6];
    }
	if(ascii_of_first === 86 || ascii_of_first === 87 ||
	   ascii_of_first === 88 || ascii_of_first === 118 || 
	   ascii_of_first === 119 || ascii_of_first === 120){
		color_assigned = color_meterial[7];
    }
	if(ascii_of_first == ascii_of_first === 89 || 
	   ascii_of_first === 90 || ascii_of_first === 121 || 
	   ascii_of_first === 122){
		color_assigned = color_meterial[8];
    }
	//
	return color_assigned;
	//
}
//
function onSelectManual(event) {
	//
	var keycode = event.keyCode;
	//
	if(keycode == 40){ //Down key pressed refer key codes
		//
		global_select_change(1);
		//	
	}else if(keycode == 38){ //Up key is pressed
		//
		global_select_change(2);
		//	
	}else if(keycode == 37){ //Left key is pressed
		//
		global_select_change(3);
		//	
	}else if(keycode == 39){ //Right key is pressed
		//
		global_select_change(4);
		//	
	}else if(keycode == 13){ //Enter key is pressed
		//
		$('#auto_loader').hide();
		select_a_list();
		//	
	}else if(keycode == 27){ //Escape key is pressed
		//
		cancel_auto_complete();
		//	
	}
	//
}
//
function global_select_change(type_in){
	//
	if(type_in == 1){
		//
		if(global_select_id < global_max_count){
			//
			global_select_id++;
			//
		}else if(global_select_id == global_max_count){
			//
			global_select_id = 1;
			//
		}
		//
	}else if(type_in == 2){
		//
		if(global_select_id > 1){
			//
			global_select_id--;
			//
		}else if(global_select_id == 1){
			//
			global_select_id = global_max_count;
			//
		}
		//
	}else if(type_in == 3){
		//
		global_select_id = 1;
		//
	}else if(type_in == 4){
		//
		global_select_id = global_max_count;
		//
	}
	//
	class_assign_on_select();
	//
}
//
function class_assign_on_select(){
	//
	if(global_last_slct !== 0){
		//
		$('.repeat_unique_'+global_last_slct).removeClass('select_repeat');
		//
	}
	//
	global_last_slct = global_select_id;
	//
	$('.repeat_unique_'+global_select_id).addClass('select_repeat');
	//
}
//
function cancel_auto_complete(){
	//
	$('#auto_loader').hide();
	$('#search_init').val("");
	global_enb_loads = 0;
	//
}
//
function select_a_list(){
	//
	var slected_value = $('.repeat_unique_'+global_select_id).data('sl');
	//
	$('#search_init').val(slected_value);
	//
	load_with_value(slected_value);
	//
}
//
