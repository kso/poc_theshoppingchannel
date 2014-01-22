<%@include file="tags.jsp"%>
<c:set var="titleName">
Featured Items Title ${rowNumber}
</c:set>
<c:set var="queryName">
Featured Items Query ${rowNumber}
</c:set>
<li data-thumb="<c:url value="/img/empty.png"/>">
  <h3>${results.template.zonesByName[titleName].content}</h3>
  <div class="row">
  
  <c:forEach items="${results.template.zonesByName[queryName].records}" var="record" varStatus="recordI">
  <c:if test="${recordI.index < 4}">
    <div class="span2 ${recordI.first ? 'offset1' : ''}">
      <center>
      <img src="${!empty record.allMeta['largeImage'] ? record.allMeta['largeImage'] : record.allMeta['image']}" style="height:100px"/>
       </center>
      <h5><a href="#"><str:truncateNicely upper="45">${record.allMeta['name']}</str:truncateNicely></a></h5>
    </div>
  </c:if>
  </c:forEach>
    
  </div>
</li>