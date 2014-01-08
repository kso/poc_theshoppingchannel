<%@include file="tags.jsp"%>

<!-- Search Result Listings -->
<c:forEach items="${results.records}" var="record" varStatus="status">
<c:set var="m" value="${record.allMeta}"/>
  <div class="search-results-listing  ${status.first ? 'first' : ''} ${status.last ? 'last' : ''}">			
  	<div class="row">
  		<div class="span2">
                  
            <img src="${record.allMeta.thumbnailImage}" id="recordThumbnail${status.index}" style="display:none">
            <img onclick="$('#a${status.index}AllDetails').toggle()" src="${m['image']}" alt="Placeholder Image" class="product-image" />
            <label  for="compare${status.index}" class="compareLabel">
            	<input id="compare${status.index}" onclick="toggleCompare(${status.index})" type="checkbox">
            	Compare 
            </label>
            
            <a href="#" class="compareLabel" id="more${status.index}" onclick="$('#requiredFields').val('');$('#q').val('');$('#refinements').val('');$('#q1').val('');$('#refinements').val($('#refinements').val() + '~' + 'manufacturer=${record.allMeta.manufacturer}' + '~' + 'department=${record.allMeta.department}'); $('#form').submit();">
            	More Like This
            </a> 
        </div>
        
  		<div class="span6">
  			<span class="title"><a href="#">${m['name']}</a></span>
  			<p><strong>Model:</strong> ${m['modelNumber']} <strong>SKU:</strong> ${m['sku']}</p>
                        
            <c:set var="starCount">
            <fmt:formatNumber pattern="#">${(m['regularPrice']/7)%5}</fmt:formatNumber>
            </c:set>
  			<p>Customer Reviews: 
            <c:forEach begin="0" end="${starCount}" step="1">
            <img src="img/yellowstar.gif" alt="Star" />
            </c:forEach>
            <c:forEach begin="${starCount}" end="3" step="1">
            <img src="img/emptystar.gif" alt="Star" />
            </c:forEach>
            
              (${starCount+1} of 5) (<a href="#">${starCount*3+7} reviews</a>)</p>                            
        
  		</div>
  		<div class="span2">
    		<div class="price-box">
    			<span class="price">$${m['regularPrice']}</span>
    			<span class="detail">${m['onlineAvailability'] ? 'Available Online' : 'In-Store Only'}</span>
    			<span class="detail">${m['freeShipping'] ? 'Free Shipping' : ''}</span>
    			<input type="button" value="Add to Cart" class="btn btn-add-cart">
    		</div>
  		</div>
  	</div>
    <div id="a${status.index}AllDetails" style="display:none">
      <c:forEach items="${record.allMeta}" var="entry">
        <b style="font-weight:bolder">${entry.key}</b>: <span style="color:#999999">${entry.value }</span><br>
      </c:forEach>
    </div>
  </div>
</c:forEach>