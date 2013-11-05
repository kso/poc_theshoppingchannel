<c:if test="${!empty results.template.zonesByName['SKU1'].records}">
 <div class="upsell">
  ${results.template.zonesByName['SKU1 Label'].content}<br/>
  <b>${results.template.zonesByName['SKU1'].records[0].allMeta['name']}</b><br/> 
  <img src="${results.template.zonesByName['SKU1'].records[0].allMeta['mediumImage']}">
</div>
</c:if>

<c:if test="${!empty results.template.zonesByName['SKU2'].records}">
 <div class="upsell">
  ${results.template.zonesByName['SKU2 Label'].content}<br/>
  <b>${results.template.zonesByName['SKU2'].records[0].allMeta['name']}</b><br/> 
  <img src="${results.template.zonesByName['SKU2'].records[0].allMeta['mediumImage']}">
</div>
</c:if>
