/* 
INFO: 
project: kalininModals
browsers: opera/chrome/FF/ie9/safari
markup: Sergey Kalinin 10/2014 (prozaik81-2@yandex.ru)
desc: $-плагин для вывода модальных окон. делался ка тестовое задание для какой-то шараги
version 1.0
*/

// ------------------------------------------------------------------------------------------------------ PLUGIN kalininModals IMPLEMENTATION------------
(function($){
	// -------------------------------------------------------------------------------------------------- options ----------	
	$.fn.kalininModals = function(options) {					
		var options = $.extend({},options);
			
		// ------------------------------------------------------------------------------------------ properties ---------	
		var self = $(this),
			selfModals = $('#modalOuter'),
			selfModalsWindow = $('#modalWindow'),
			head,
			info,
			actionsArr;	
		
		// ------------------------------------------------------------------------------------------ methods ------------	 
		function initForm(formNum){
			if(formNum == 1){
				head = 'Обратный звонок';
				
				info = '<div class="text">Укажите свой контактный телефон и имя, и мы перезвоним Вам</div> \
						<div class="cell"> \
							<label class="labe lbl_name" for="fld_name">Имя<sup>*</sup></label> \
							<input class="fld_name raduis10" type="text" name="fld_name" id="fld_name" /> \
							<div class="errors error_name">Введите Ваше имя</div> \
						</div> \
						<div class="cell"> \
							<label class="labe lbl_phone" for="fld_phone">Мобильный телефон<sup>*</sup><span class="code">+7</span></label> \
							<input class="fld_phone raduis10 mask" type="text" name="fld_phone" id="fld_phone" />	\
							<div class="errors error_phone">Введите Ваш телефон</div> \
						</div> \
						<div class="cell"> \
							<label class="labe lbl_comment" for="fld_comment">Комментарий</label> \
							<textarea class="comment raduis10" id="fld_comment"></textarea> \
							<div class="errors error_message"></div> \
						</div> \		';	

				$('#modalWindow').attr('action', '/microsoft.com');
				$('#buttonClose').show();
				$('#btnSubmit').val('Жду звонка').show();
			}
			else if(formNum == 2){
				head = 'Обратный звонок';
				
				info = '<div class="text">Исключение unknown software exception (0x0000096) в приложении по адресу 0x301a95f1</div>';

				$('#modalWindow').attr('action', '/google.com');
				$('#btnSubmit').val('Ок').show();
				$('#modalWindow').css('max-width', '350px');					
			}
			else if(formNum == 3){
				head = 'Обратный звонок';
				
				info = '<div class="text">Исключение unknown software exception (0x0000096) в приложении по адресу 0x301a95f1</div>';
				
				$('#modalWindow').attr('action', '/yandex.com');
				$('#btnSubmit').val('Ок').show();
				$('#ButtonCancel').show();	
				$('#modalWindow').css('max-width', '350px');
			};			
		}
		
		function makeBody(){
			$('#head .h2').text(head);
			$('#info').html(info);
		}
		
		function modalsVisibility(visibility){
			var	result;
			
			if(visibility){	
				result = 'block';
			}
			else{
				result = 'none';
				$('.actions input').hide();
				$('#buttonClose').hide();
				$('#modalWindow').css('max-width', '643px');
			};
			
			selfModals.css({
				'display': result
			});					
		}
		
		// ------------------------------------------------------------------------------------------ handlers -----------		
		function onClickControls(e){
			self = $(e.currentTarget);
			initForm(self.attr('data-form-num'));
			makeBody();
			
			modalsVisibility(true);
		}
		
		function onClickActions(){
			modalsVisibility(false);
		}				
		
		// ------------------------------------------------------------------------------------------ events -------------	
		$('#menuButton1, #menuButton2, #menuButton3').on('click', onClickControls);	
		
		$('#buttonClose, #ButtonCancel').on('click', onClickActions);		
	};
})($);

(function (){			
	// -------------------------------------------------------------------------------------- form_top 		
	$('#btnSubmit').on('click', function(){			
		var	flag = false,
			fld_name = $('#fld_name'),
			fld_phone = $('#fld_phone'),
			fld_comment = $('#fld_comment');
			
		console.log(fld_name.val());
		console.log(fld_phone.val());
		console.log(fld_comment.val());
		
		if(!$.trim(fld_name.val())){
			$('.error_name').addClass('yes_visible');
			flag = true;
		}	
		else{	
			$('.error_name').removeClass('yes_visible');
		}
		
		if(!$.trim(fld_phone.val())){
			$('.error_phone').addClass('yes_visible');
			flag = true;
		}	
		else{	
			$('.error_phone').removeClass('yes_visible');
		}		

		if(!flag){
			$('#modalWindow').find('input[type="text"]').val('');							
			$('#modalWindow').find('textarea').val('');							
			$('#modalOuter').css('display', 'none');	
						
			//send
			data = { 
				name: fld_name.val(),
				phone: fld_phone.val(),
				comment: fld_comment.val(),
			};
				
			$.ajax({
				type: 'POST',
				url: 'js/ajax/mailer.php',
				data: data,
				dataType: 'json',
				success: function (json) {
					if(json == 'success'){
						//console.log('yyt');
						
						$('#modal-8').modal();
						
						$('#modalWindow').find('input[type="text"]').val('');							
						$('#modalWindow').find('textarea').val('');							
						$('#modalOuter').css('display', 'none');							
					}
					else{
						//console.log('nnt');
					}
				}
			});	
		}

		return false;
	});	
})();




