$(document).ready(function(){
	
	//highlight current / active link
	$('ul.main-menu li a').each(function(){
		if($($(this))[0].href==String(window.location))
			$(this).parent().addClass('active');
	});
	
	//animating menus on hover
	$('ul.main-menu li:not(.nav-header)').hover(function(){
		$(this).animate({'margin-left':'+=5'},300);
	},
	function(){
		$(this).animate({'margin-left':'-=5'},300);
	});
	
	//other things to do on document ready, seperated for ajax calls
	docReady();
});
		
function docReady()
{
	//datepicker
	$('.datepicker').datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : 'yy-mm-dd',
		yearRange: '1980, 2050',
		closeText: 'Done',
		buttonText: 'Go',
		buttonImage: false,
		buttonImageOnly: false
		//showButtonPanel : true,
		//showOn: "button",
	});
	
	//makes elements sortable, elements that sort need to have id attribute to save the result
	$('.sortable').sortable({
		revert:true,
		cancel:'.btn,.box-content,.nav-header',
		update:function(event,ui){
			//line below gives the ids of elements, you can make ajax call here to save it to the database
			//console.log($(this).sortable('toArray'));
		}
	});
	
	$('.btn-close').click(function(e){
		e.preventDefault();
		$(this).parent().parent().parent().fadeOut();
	});
	
	$('.btn-minimize').click(function(e){
		e.preventDefault();
		var $target = $(this).parent().parent().next('.box-content');
		if($target.is(':visible')) $('i',$(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
		else 					   $('i',$(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
		$target.slideToggle();
	});
}