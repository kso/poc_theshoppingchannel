<%@include file="tags.jsp"%>
<div class="sort">

  <select style="float:right;display:inline-block;"><option>Relevancy</option>
    <option>Price</option>
    <option>Rating</option></select>
    <c:if test="${results.totalRecordCount == 0}">
    No results
    </c:if>
    <c:if test="${results.totalRecordCount > 0}">
  <span class="pageStuff">
  <b>${results.pageInfo.recordStart}
  -
  ${results.pageInfo.recordEnd}</b>
  of 
  <b>${results.totalRecordCount}</b>
  </span>
  <span class="nextPage">
    <a href="javascript:;" class="selected">1</a>
    <c:if test="${results.totalRecordCount > 10}">
      <a href="javascript:;">2</a>    <a href="javascript:;">></a>
    </c:if>
  </span>
    </c:if>
</div>

<div class="compare">
Compare up to 4 items
<img src="/images/compareThumbnail.png" width="25" id="compare0Img" class="compareImage">
<img src="/images/compareThumbnail.png" width="25" id="compare1Img" class="compareImage">
<img src="/images/compareThumbnail.png" width="25" id="compare2Img" class="compareImage">
<img src="/images/compareThumbnail.png" width="25" id="compare3Img" class="compareImage">
<button id="compareButton" class="smallCorner" onclick="$('#compareContainer').toggleNice();">Compare</button>
</div>

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
<img 
        src="${record['image']}" style="max-width:100px"><br>
        <b class="name">${record.name }</b>
</div>
</td>
</c:forEach>
</tr>
<tr>
<th></th>
<c:forEach items="${results.records}" var="record" varStatus="rI">
<td align="center" valign="top" class="recordIndex${rI.index}" style="display:none;"><img src="/images/addToCard.gif"></td>
</c:forEach>
</tr>
<c:forEach items="${results.records[0]}" var="entry">
<c:if test="${fn:length(entry.value) < 10}">
<tr id="${gc:md5(entry.key)}">
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
		compareList.splice($.inArray(pI, compareList), 1);
	} else {
		if (compareList.length < 4){
    		$('.recordIndex' + pI).show();	
    		compareList.push(pI);			
		}
	}

	$('.compareImage').attr('src', '/images/compareThumbnail.png');
	compareList.forEach(function(pItem, pIndex){
		$('#compare' + pIndex + 'Img').attr('src', $('#recordThumbnail' + pItem).attr('src'));
	});
}
<c:forEach items="${results.records[0]}" var="keys">
<c:if test="${fn:length(entry.value) < 10}">
<c:forEach items="${results.records}" var="record" varStatus="rI">
$('#${gc:md5(keys.key)}').append('<td valign="top" style="display:none" class="recordIndex${rI.index}">${gc:escapeJs(record[keys.key])}</td>')
</c:forEach>
</c:if>
</c:forEach>
</script>
</div>