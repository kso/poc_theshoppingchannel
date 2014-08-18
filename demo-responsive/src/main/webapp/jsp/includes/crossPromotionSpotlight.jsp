<div class="famous">
  <c:if test="${results.template.zonesByName['Rich Text'].type eq 'Rich_Content'}">
  	${results.template.zonesByName['Rich Text'].content}
  </c:if>
  <c:if test="${results.template.zonesByName['Rich Text'].type eq 'Content'}">
  	<h2>${results.template.zonesByName['Rich Text'].content}</h2>
  </c:if>
<c:if test="${!empty results.template.zonesByName['SKU'].records}">
  <br>
  <b>${results.template.zonesByName['SKU'].records[0].allMeta['name']}</b> <br>
  <img src="${results.template.zonesByName['SKU'].records[0].allMeta['image']}">
</c:if>
</div>
