var loadFriends = function(){
  $("#centred-footer").html('LOADING<br/><iframe src="http://steamcommunity.com/id/AfroSpartan/friends/?xml=1" ></iframe>');
  
}

var init = function(){

  var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
      elm = $('.loading')[0],
      animation = false,
      transformation = false,
      animationstring = 'animation',
      transformstring = 'transform',
      keyframeprefix = '',
      pfx = '';

  if( elm.style.animationName ) { animation = true; }    
  if( elm.style.transform ) { transformation = true; }    

  if( animation === false ) {
    for( var i = 0; i < domPrefixes.length; i++ ) {
      if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
        pfx = domPrefixes[ i ];
        animationstring = pfx + 'Animation';
        keyframeprefix = '-' + pfx.toLowerCase() + '-';
        animation = true;
        break;
      }
    }
  }
  
  if( transformation === false ) {
    for( var i = 0; i < domPrefixes.length; i++ ) {
      if( elm.style[ domPrefixes[i] + 'Transform' ] !== undefined ) {
        pfx = domPrefixes[ i ];
        transformstring = pfx + 'Transform';
        transformation = true;
        break;
      }
    }
  }
  var NewValue = ((($(document).width() - 966) * (90 - 65)) / (1980 - 966)) + 65;
  var NewValue2 = ((($(document).width() - 966) * (100 - 75)) / (1980 - 966)) + 75;
  var keyframes = ('@' + keyframeprefix + 'keyframes loading-anim { '+
                   '0%{'+'stroke-dasharray:200 2000;'+'stroke-dashoffset:200;'+'}'+
                   '30%{'+ 'stroke-dasharray:200 2000;'+'stroke-dashoffset:200;'+'}'+
                   '40%{'+'stroke-dasharray:50 2000;'+'stroke-dashoffset:-'+ (($(document).width() / 100) * 40)+';'+'}'+
                   NewValue+'%{'+'stroke-dasharray:50 2000;'+'stroke-dashoffset:-'+ (($(document).width() / 100) * 60) +';'+'}'+
                   NewValue2+'%{'+'stroke-dasharray:200 2000;'+'stroke-dashoffset:-'+($(document).width()) +';'+'}'+
                   '100%{'+'stroke-dasharray:200 2000;'+'stroke-dashoffset:-'+($(document).width()) +';'+'}'+'}');

  if(document.styleSheets && document.styleSheets.length){
    document.styleSheets[0].insertRule( keyframes, document.styleSheets[0].cssRules.length );
  }else{
    var s = document.createElement( 'style' );
    s.innerHTML = keyframes;
    document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
  }
}

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
  $('#footer').click(function(){
    loadFriends();
  });
  $(window).resize(function(){
    init();
  });
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
    $(this).html("<svg><defs><filter id='f2' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='1' /></filter><filter id='f1' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='8' /></filter></defs><path d='M0 3 L" + $(document).width() + " 3'/><path filter='url(#f1)' d='M0 3 L" + $(document).width() + " 3'/><path stroke-width='2' stroke='#fff' filter='url(#f2)' d='M0 2 L" + $(document).width() + " 2'/></svg><svg><defs><filter id='f2' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='1' /></filter><filter id='f1' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='8' /></filter></defs><path d='M0 3 L" + $(document).width() + " 3'/><path filter='url(#f1)' d='M0 3 L" + $(document).width() + " 3'/><path stroke-width='2' stroke='#fff' filter='url(#f2)' d='M0 2 L" + $(document).width() + " 2'/></svg><svg><defs><filter id='f2' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='1' /></filter><filter id='f1' x='3' y='-3'><feGaussianBlur in='SourceGraphic' stdDeviation='8' /></filter></defs><path d='M0 3 L" + $(document).width() + " 3'/><path filter='url(#f1)' d='M0 3 L" + $(document).width() + " 3'/><path stroke-width='2' stroke='#fff' filter='url(#f2)' d='M0 2 L" + $(document).width() + " 2'/></svg>");});
  $('.loading svg').each(function(index){
    $(this).css('animation','loading-anim 3s linear '+ index*0.2 +'s infinite');
  });
  $('#filter-wrapper, .loading, .minimize, #results-wrapper').hide();
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
      setTimeout(function(){$('#results-wrapper').stop(true).fadeIn({duration: 500, queue:false}).css('display', 'none').slideDown(500);},600);
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
  init();
});
