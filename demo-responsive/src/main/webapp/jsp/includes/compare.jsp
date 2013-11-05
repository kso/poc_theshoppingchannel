<div class="compare">
          <div class="row">
            <div class="span10">
              <span class="compare-label">Compare up to 4 items</span>
                            <img src="<c:url value="/img/compareThumbnail.png"/>" width="25" id="compare0Img" class="compareImage">
                            <img src="<c:url value="/img/compareThumbnail.png"/>" width="25" id="compare1Img" class="compareImage">
                            <img src="<c:url value="/img/compareThumbnail.png"/>" width="25" id="compare2Img" class="compareImage">
                            <img src="<c:url value="/img/compareThumbnail.png"/>" width="25" id="compare3Img" class="compareImage">
                            <a id="compareButton" class="smallCorner" onclick="$('#compareContainer').toggleNice();" href="javascript:;">Compare</a>
     
      <div id="compareContainer" style="display:none">
      <table>
        <tr>
          <th valign="top">
            <div class="products">
            Products
            </div>
          </th>
        
          <c:forEach items="${results.records}" var="record" varStatus="rI">
            <td align="center" valign="top" class="recordIndex${rI.index}" style="display:none;">
              <div class="productHeader">
                <img src="${record.allMeta['image']}" style="max-width:100px"><br>
                <b class="name">${record.allMeta['name']}</b>
              </div>
            </td>
          </c:forEach>
        </tr>
        <tr>
          <th>
          </th>
          <c:forEach items="${results.records}" var="record" varStatus="rI">
            <td align="center" valign="top" class="recordIndex${rI.index}" style="display:none;"><img src="<c:url value="/img/addToCard.gif"/>"></td>
          </c:forEach>
        </tr>
        <c:forEach items="${results.records[0].allMeta}" var="entry">
        
          <c:if test="${fn:length(entry.value) < 10 and !fn:contains('salesRankLongTerm salesRankMediumTerm source subclassId salesRankShortTerm protectionPlanTerm active department departmentId classId bestSellingRank', entry.key)}">
            <tr class="compareRow" id="${gc:md5(entry.key)}">
              <th valign="top">
                ${gc:uncamel(entry.key)}
              </th>
            </tr>
          </c:if>
        </c:forEach>
      </table>

<script>
var compareList = [];


function toggleCompare(pI){
  if ($.inArray(pI, compareList) != -1){
	    $('.recordIndex' + pI).hide();  
	    $('.recordIndex' + pI).removeClass('showing');
    compareList.splice($.inArray(pI, compareList), 1);
  } else {
    if (compareList.length < 4){
        $('.recordIndex' + pI).show();  
	    $('.recordIndex' + pI).addClass('showing');  
        compareList.push(pI);     
    }
  }
  
  $('.compareRow').each(function(pIndex, pItem){
	  var diff = false;
	  var oldValue = $('td.showing', $(pItem)).html();
	  $('td.showing', $(pItem)).each(function(pIndex, pTd){
		  var newValue = $(pTd).html();
		  if (newValue !== oldValue) {
		  	diff = true;
		  }
	  });
	  if (diff){
		  $(pItem).addClass('diff');
	  } else {
		  $(pItem).removeClass('diff');		  
	  }
  });

  $('.compareImage').attr('src', '<c:url value="/img/compareThumbnail.png"/>');
  compareList.forEach(function(pItem, pIndex){
    $('#compare' + pIndex + 'Img').attr('src', $('#recordThumbnail' + pItem).attr('src'));
  });
}
<c:forEach items="${results.records[0].allMeta}" var="keys">
<c:if test="${fn:length(entry.value) < 10}">
<c:forEach items="${results.records}" var="record" varStatus="rI">
$('#${gc:md5(keys.key)}').append('<td valign="top" style="display:none" class="recordIndex${rI.index}">${gc:escapeJs(record.allMeta[keys.key])}</td>')
</c:forEach>
</c:if>
</c:forEach>
</script>
</div>
            </div>
          </div>

        </div>