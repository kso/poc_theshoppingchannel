<%@include file="tags.jsp"%>
<!-- Search Result Listings -->


<c:forEach items="${results.records}" var="record" varStatus="status">
<c:if test="${status.count == results.template.zonesByName['Related Categories Index'].content}">

  <div class="search-results-grid withOutline">     
    <div class="row">
      <div class="span6">
        <span class="title"><a href="#">${results.template.zonesByName['Related Categories Title'].content}</a></span>
                        

        
      </div>
      <div class="span2">
                  
            <img src="${results.template.zonesByName['Related Categories Image'].content}" width="100"/><br>
            <br>
            <b> Related Categories<br></b>
            <a href="${results.template.zonesByName['Related Categories Url 1'].content}">
              <span class="title"><a href="#">${results.template.zonesByName['Related Categories Title 1'].content}</a></span>
            </a><br>
  
            <a href="${results.template.zonesByName['Related Categories Url 2'].content}">
              <span class="title"><a href="#">${results.template.zonesByName['Related Categories Title 2'].content}</a></span>
            </a><br>
            
            <a href="${results.template.zonesByName['Related Categories Url 3'].content}">
            <span class="title"><a href="#">${results.template.zonesByName['Related Categories Title 3'].content}</a></span>
            </a>
            
        </div>
      
    </div>
    <div id="a${status.index}AllDetails" style="display:none">
      <c:forEach items="${record.allMeta}" var="entry">
        <b style="font-weight:bolder">${entry.key}</b>: <span style="color:#999999">${entry.value }</span><br>
      </c:forEach>
    </div>
  </div>

</c:if>


<c:if test="${status.count == results.template.zonesByName['Double Width Index'].content}">

  <div class="search-results-grid twoZone" style="width:490px;">     
  <div class="row" >
      <div class="span2" style="width:490px;">
    <img src="<c:url value="${results.template.zonesByName['Double Width Spotlight'].content}"/>" width="490" height="230">
    </div>
    </div>
  </div>

</c:if>

<c:set var="m" value="${record.allMeta}"/>
  <div class="search-results-grid ${status.first ? 'first' : ''} ${status.last ? 'last' : ''}">	
  	<div class="row">
  		<div class="span2">
                  
            <img src="${record.allMeta.thumbnailImage}" id="recordThumbnail${status.index}" style="display:none">
            <img onclick="$('#a${status.index}AllDetails').toggle()" src="${m['image']}" alt="Placeholder Image" class="product-image" />
            
        </div>
  		<div class="span6">
  			<span class="title"><a href="#"><str:truncateNicely upper="35">${m['name']}</str:truncateNicely></a></span>
  			<p><strong>Model:</strong> ${m['modelNumber']} <strong>SKU:</strong> ${m['sku']}</p>
                        
        
  		</div>
  		
  	</div>
    <div id="a${status.index}AllDetails" style="display:none">
      <c:forEach items="${record.allMeta}" var="entry">
        <b style="font-weight:bolder">${entry.key}</b>: <span style="color:#999999">${entry.value }</span><br>
      </c:forEach>
    </div>
  </div>
</c:forEach>