<%@include file="tags.jsp"%>

<div id="recordHolder">


  <c:forEach items="${results.records}" var="record" varStatus="i">
    <div class="recordList">
    <table><tr>
      <td valign="top" align="center">

      <img src="${record.thumbnailImage}"
        id="recordThumbnail${i.index}" style="display:none">
      <img 
        onclick="$('#record${i.index}').toggleNice()" 
        src="${record['image']}" style="max-width:100px"
        class="mainImage"> 

        
        <label  for="compare${i.index}" class="compareLabel">
        <input id="compare${i.index}" onclick="toggleCompare(${i.index})" type="checkbox">
        Compare
        </label>




      </td>
      <td valign="top" width="100%">
      
          <div class="recordDetails">
            <b class="name">${record.name }</b><br>    
            <div class="model">
            
            <c:if test="${!empty record.modelNumber}">
              <b>Model:</b> ${record.modelNumber}
            </c:if>
            <c:if test="${!empty record.sku}">
              <b>SKU:</b> ${record.sku}
            </c:if>
            </div>
            
            
            <div class="rating">
<strong><!--fl39-->Customer Reviews:</strong>
<span itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">

<img src="http://images.bestbuy.com/BestBuy_US/images/global/misc/ratings_star_3_0.gif" alt="3 of 5">
<strong> <span itemprop="ratingValue"> 3 </span> of <span itemprop="bestRating">5</span>
</strong>
(<a href="/site/Samsung+-+Refurbished+51%22+Class+-+Plasma+-+1080p+-+600Hz+-+HDTV/5555414.p?skuId=5555414&amp;id=1218658992840#tabbed-customerreviews"><span itemprop="reviewCount">3</span> reviews</a>)
</span>
</div>
            
            <c:if test="${!empty record._snippet}">
            <div class="snippet">${record._snippet }</div>
            </c:if>
          </div>
        
         
      </td>
      <td valign="top">
        <div class="notes smallCorner">
        <div class="price">
        $<fmt:formatNumber pattern="#,###.00">${record.regularPrice }</fmt:formatNumber>
        </div>
        <div class="otherNotes">
          <ul>
            <c:if test="${!empty record.dollarSavings and record.dollarSavings ne '0.00'}">
            <li>$${record.dollarSavings} in savings</li>
            </c:if>
            <c:if test="${record.onlineAvailability}">
            <li>Available Online</li>
            </c:if>
            <c:if test="${record.freeShipping}">
            <li>Free Shipping</li>
            </c:if>
          </ul>
        </div>
        <img src="/images/addToCard.gif">
        </div>
      </td>
    </tr></table>
    <hr style="margin-bottom:20px;border-bottom:1px solid #EEEEEE;background-image:none">
    <div id="record${i.index}" style="display:none;font-size:10px;">
      <c:forEach items="${record}" var="entry">
        ${entry.key}: <span style="color:#999999">${entry.value }</span><br>
      </c:forEach>
      </div>
    <br><br>
    </div>
  </c:forEach>
</div>