<div class="header">
<form id="form" action="/index.html" accept-charset="UTF-8" method="get">
  <input autocomplete="off" type="text" onkeydown="$('#refinements').val('')" name="q" id="q" class="cursorFocus" value="${param.q}">
  <input type="hidden" name="refinements" id="refinements" value="${param.refinements }">
  </form>
<a href="javascript:;" onclick="$('#form').submit()"><img src="/images/headerbb1.png"></a>
<a href="/index.html"><img src="/images/headerbb2.png"></a>

<%--


--%>
</div>

<%--
<script>

$('#q').autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: 'index.html',
          data: {
            action: "autocomplete",
            q: 'manufacturer:' + $('#q').val()
          },
          success: function( data ) {
            response( $.map( JSON.parse(data).autocomplete, function( item ) {
              return {
                label: item
              }
            }));
          }
        });
      },
      select: function( event, ui ) {
    	  $('#q').val('');
    	  $('#refinements').val('~manufacturer=' + ui.item.label);
    	  $('#form').submit();
        },
      minLength: 2
});

</script>
--%>

<script type="text/javascript">

  var cx = '017227377487357491314:y9gy8mmra7k';
  var key = 'AIzaSyDJOyOCHWzW6cuPYA3AQHIFXZVxzXjVF-U';

  function getSku(pUrl){
    var match = pUrl.match(/id=([^&]+)(&|$)/);
    return(match ? match[1] : "");
  }
  
  function formatSaytEntry(title, link, description, thumbnail, price, isPromotion){
	  title = title.replace(/[^a-zA-Z0-9 \\-]/g, '');
	  description = description.length > 100  ? description.substring(0, 100) + '...': description;
	  var sku = getSku(link);
	  console.log(link, sku);
    return '<tr class="cse-sayt-result"><td valign="top"><div class="cse-sayt-image">' + 
    	'<a class="' + link + '" href="/index.html?q=' + sku + '"><img src="' + thumbnail + '"></a></div></td>' 
    	+ '<td valign="top" class="cse-sayt-text">' 
    	+ '<div class="cse-sayt-title"><a class="cse-sayt-accessibility" href="/index.html?q=' + sku + '">' + title + '</a></div>' 
    	+ '<div class="cse-sayt-descr" style="margin-top:4px">' 
    	+ description + '</div><div class="cse-sayt-price">' + price + '</div></td></tr>';
  }
  
 var sayt_params = {
   sayt_format_entry: formatSaytEntry,
   sayt_max_results: 4,
   country: 'us',
   language: 'en',
   useCase: 'ShoppingApiUseCase',
   extra_params: {
     safe: false
   }
 };

 var setSaytCallback = function(sayt) {
    if (sayt == null) {
      // SAYT is disabled, initialize your current autocompletions code.
    } else {
      window['__gcs_sayt'] = sayt;
      completionObject = sayt['completionController'];
    }
  };

// Autocomplete options
 var autoCompletionOptions = {
   'maxCompletions': 5,
   'styleOptions': {
	   widthOffset:12,
       yOffset: 5,
       xAlign: 'left'
     }
 };

// Replace the searchText parameter below with your actual search box id
// Replace the searchForm parameter below with your actual form id where
// your search box belongs to
setupSayt(cx, key, 'q', 'form', setSaytCallback, autoCompletionOptions, sayt_params);
</script>
