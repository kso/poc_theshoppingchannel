
<c:if test="${!empty results.template.zonesByName['Sku1'].records}">
<div class="upsell">
  ${results.template.zonesByName['Sku1 Title'].content}
  <b>${results.template.zonesByName['Sku1'].records[0].name}</b> 
  <img src="${results.template.zonesByName['Sku1'].records[0].mediumImage}">
</div>
</c:if>

<c:if test="${!empty results.template.zonesByName['Sku2'].records}">
<div class="upsell">
  ${results.template.zonesByName['Sku2 Title'].content}
  <b>${results.template.zonesByName['Sku2'].records[0].name}</b> 
  <img src="${results.template.zonesByName['Sku2'].records[0].mediumImage}">
</div>
</c:if>
