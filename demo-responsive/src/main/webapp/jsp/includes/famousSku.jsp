<c:if test="${!empty results.template.zonesByName['SKU mentioned'].records}">
<div class="famous">
  <c:if test="${results.template.zonesByName['Famous Person Text'].type eq 'Rich_Content'}">
  	${results.template.zonesByName['Famous Person Text'].content}
  </c:if>
  <c:if test="${results.template.zonesByName['Famous Person Text'].type eq 'Content'}">
  	<h2>${results.template.zonesByName['Famous Person Text'].content}</h2>
  </c:if>
  <br>
  <b>${results.template.zonesByName['SKU mentioned'].records[0].allMeta['name']}</b> <br>
  <img src="${results.template.zonesByName['SKU mentioned'].records[0].allMeta['largeImage']}">
</div>
</c:if>