trim = function(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}
 
ltrim = function(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
rtrim = function(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function RemoveTag(row){
  $(row).parent().parent().remove();
}

$(document).ready(function(){
  $('#filters .minimize').click(function(){
    if($('#filters').css('margin') !== ('-' + ($('#filters').height() - 4) +'px 0px 0px')){
      $('#filters').css('margin', '-'+ ($('#filters').height() - 4) +'px 0px 0px 0px');
      $(this).html('\\/');
    }else{
      $('#filters').css('margin', '');
      $(this).html("/\\");
    }
  });
  $('.loading').each(function(){
    $(this).html("<svg><defs><filter id='f1' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='8' /></filter></defs><path d='M0 3 L" + $(window).width() + " 3'/><path filter='url(#f1)' d='M0 3 L" + $(window).width() + " 3'/></svg><svg><defs><filter id='f1' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='8' /></filter></defs><path d='M0 3 L" + $(window).width() + " 3'/><path filter='url(#f1)' d='M0 3 L" + $(window).width() + " 3'/></svg><svg><defs><filter id='f1' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='8' /></filter></defs><path d='M0 3 L" + $(window).width() + " 3'/><path filter='url(#f1)' d='M0 3 L" + $(window).width() + " 3'/></svg>");});
  $('.loading svg').each(function(index){
    $(this).css('animation','loading-anim 3s linear '+ index*0.2 +'s infinite');
  });
  $('#filter-wrapper, .loading, .minimize, .result').hide();
  ShowFilters = function(){
    $('#filters .loading').show();
    setTimeout(function(){
      $('#centred-filters h1').css('padding-left','0px');
      $('#filters').css('min-height','266px');
      setTimeout(function(){$('#filter-wrapper').stop(true).fadeIn({duration: 500, queue:false}).css('display', 'none').slideDown(500);},600);
      $('#filters .minimize').show(1000);
      $('#filters .loading').hide(1000);
      $('#results .loading').show();
    ShowResults();},5000);
  }
  ShowResults = function(){
    setTimeout(function(){
      $('#centred-results h1').css('padding-left','0px');
      $('.result').each(function(index){
        $(this).show(500);
      });
      $('#results .loading').hide(1000);
    },5000);
  }
  $('#steam-id-submit').click(function(){
    $(this).parent().html('<img style="width:50px;height:50px;vertical-align:middle" src="http://media.steampowered.com/steamcommunity/public/images/avatars/f1/f1d7cbf950c5ee2548c7adaad9f007b8cdab2234_full.jpg"/> AfroSpartan').css('font-size','30px');
    if($('#filter-wrapper').css('display') === 'none'){
      ShowFilters();
    }
  });
  $('#steam-id-input').click(function(){
    $(this).css('color','#000');
    if($(this).val() === 'Steam ID'){
      $(this).val('');
    }
  });
  $('#steam-id-input').blur(function(){
    $(this).css('color','#aaa');
    if($(this).val() === '' || trim($(this).val(), " ") === ''){
      $(this).val('Steam ID');
    }
  });
  $('#tags input[type="text"]').click(function(){
    $(this).css('color','#000');
    if($(this).val() === 'Tags'){
      $(this).val('');
    }
  });
  $('#tags input[type="text"]').blur(function(){
    $(this).css('color','#aaa');
    if($(this).val() === '' || trim($(this).val(), " ") === ''){
      $(this).val('Tags');
    }
  });
  $('.friend-cancel').click(function(){
    $(this).parent('tr').remove();
  });
  $('.tag').click(function(){
    $('#tag-selected-area table').append("<tr><td>"+$(this).html()+"</td><td><a onclick='RemoveTag(this)'><svg stroke='white' fill='white' height='20' width='20'><path d='M5 3 L10 8 15 3 17 5 12 10 17 14 15 17 10 12 5 17 3 15 8 10 3 5' /></svg></a></td></tr>");
    $('#tag-selected-area table tr').last().hide()
    $('#tag-selected-area table tr').last().show("slow");
    $(this).remove();
  });
});