<c:if test="${!empty results.template.zonesByName['SKU mentioned'].records}">
<div class="famous">
  <h2>${results.template.zonesByName['Famous Person Text'].content}</h2>
  <br>
  <b>${results.template.zonesByName['SKU mentioned'].records[0].name}</b> <br>
  <img src="${results.template.zonesByName['SKU mentioned'].records[0].largeImage}">
</div>
</c:if>
