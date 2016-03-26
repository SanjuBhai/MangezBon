$(document).ready(function(){
	
	// Disable all links with # or class disabled
	$('a[href="#"], a.disabled').click(function(e){
		e.preventDefault();
	});
	
	// Check and uncheck all checkboxes
	$('.first').click(function() {
		if( $(this).is(':checked') )
			$('.select').prop('checked',true);
		else
			$('.select').prop('checked',false);
	});

	// Confirm any operation
	$('.link').click(function(e){
		e.preventDefault();
		var confirmation = confirm( 'Are you sure you want to ' + $(this).data('action') );
		if( confirmation )
			location.href = $(this).attr('href');
	});
	
	// Scroll to particular element
	$('.scroll').click(function(e){
		e.preventDefault();
		var scroll_to = $(this).data('scroll');
		$('html, body').animate({scrollTop: $(scroll_to).offset().top }, 1000);	
	});
	
	// filter records
	$('.filter input').keyup(function(e){
		if( e.keyCode==13 )
			filter();
	});
	
	$('.filter input[type="reset"]').click(function(){
		$('.filter input[type="text"], .filter input[type="email"], .filter input[type="number"], .filter select').val('');
		$('.filter input[type="checkbox"], .filter input[type="radio"]').attr( 'checked', false );
		filter();
	});
	
	// Add row while adding multiple records
	var str = new Array();
	$('.add_row').each(function(){
		var tmp = $(this).data( 'id' );
		str[tmp] = '<tr>' + $('#' + tmp ).html() + '</tr>';
		$('#' + tmp ).remove();
	});
	
	$('.add_row').click(function(){
		var tmp = $(this).data( 'id' );
		$(this).closest('table').find('tbody').append( str[tmp] );
		
		$('.dateRequired').removeClass('dateRequired').addClass("date");
		$(".date").focus(function(){
			var $this = $(this);
			if(!$this.data('datepicker')) {
				$this.removeClass("hasDatepicker");
				$this.datepicker({dateFormat:'yy-mm-dd',changeMonth: true, changeYear: true })
				$this.datepicker("show");
			}
		});
	});
});

function filter( page )
{
	page = page ? page : 1;
	$('input[name="page"]').val( page );
	$('#filter-form').submit();
}

function get_current_file_name()
{
	var url = window.location.pathname;
	return url.substring( url.lastIndexOf('/') + 1 );
}

function movePage( file, target )
{
	location.href=file;
}

function validation( form_id, confirmation, password_match, email_match )
{
	var error = 0;
	$('#'+ form_id + ' .required' ).each(function(){		
		if( !$(this).val() )
			error = 1;
	});
	
	if( error )
	{		
		alertify.error("Please fill all the required fields marked with star.");
		return false;
	}
	else if( password_match && $('#new_password').val()!= $('#confirm_password').val() )
	{		
		alertify.error( "Passwords don't match." );		
		return false;						
	}
	else if( email_match && $('#new_email').val()!= $('#confirm_email').val() )
	{
		alertify.error("Emails don't match.");
		return false;
	}		
		
	if( confirmation )
	{
		var confirmation = confirm( 'Are you sure you want to submit' );
		if( !confirmation )
			return false;
	}
}

function get_states( country_id , state_id )
{
	if( country_id )
		$.post( ajax_url,{'action':'get_states','country_id':country_id },function(result){			
			$('#states').html( result );
			if( state_id )
				$('#states select').val( state_id );
		});
	else
	{
		var str = "<select name='state_id' class='required'><option value=''>---Select Country First---</option></select>";
		$('#states').html( str );
	}
}

function get_cities( state_id, city_id )
{
	if( state_id )
		$.post( ajax_url,{'action':'get_cities','state_id':state_id},function(result){			
			$('#cities').html( result );
			if( city_id )
				$('#cities select').val( city_id );
		});
	else
	{
		var str = "<select name='city_id' class='required'><option value=''>---Select State First---</option></select>";
		$('#cities').html(str);
	}
}

function remove_item( elem, send_ajax, table, key, val )
{
	if( send_ajax )
	{
		var confirmation = confirm( 'Are you sure want to remove permanently.' );
		if( confirmation )
		{
			$.post( ajax_url, {'action':'remove_item', 'table':table, 'key':key, 'val':val },function(){
				elem.closest('tr').remove();
			});
		}
	}
	else
		elem.closest('tr').remove();
}

function remove_banner_image( elem, image_id, image )
{
	if( image_id )
	{
		var confirmation = confirm( 'Are you sure want to remove permanently.' );
		if( confirmation )
		{
			$.post( ajax_url, {'action':'remove_banner_image', 'id':image_id, 'image':image },function(){
				elem.closest('tr').remove();
			});
		}
	}
	else
		elem.closest('tr').remove();
}