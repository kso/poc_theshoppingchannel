<%@include file="tags.jsp"%>
<ul class="images gridRecord">
  <c:forEach items="${results.records}" var="record" varStatus="i">
    <li class="smallCorner" >
    <table width="180"><tr><td colspan="2" valign="top">
      <a href="javascript:;" onclick="$('#record${i.index}').toggleNice()">
        <img style="border:1px solid #CCCCCC;padding:10px;width:180px;" class="smallCorner" title="${record['name']}" src="${record['largeImage'] == null ? record['image'] : record['largeImage']}" ></a>
    
        </td></tr><tr><td valign="top">
        </td><td valign="top">
        <span style="font-size:12px;font-weight:bolder">${record.name}</span> <span style="color:red">$${record.salePrice}</span> / <fmt:formatNumber pattern="#">${record.sku}</fmt:formatNumber>
        <!-- 
        <div class="snippet gridSnippet">${record._snippet}</div>
        -->
      <div id="record${i.index}" style="display:none">
      <c:forEach items="${record}" var="entry">
        <b style="font-weight:bolder">${entry.key}</b>: <span style="color:#999999">${entry.value }</span><br>
      </c:forEach>
      </div>
      </td>
      </tr></table>
    </li>
    ${i.index%3 == 2 ? '<div><hr></dirv>' : ''}
  </c:forEach>
  
</ul>