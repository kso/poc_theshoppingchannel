<%@include file="tags.jsp"%>
<c:if test="${results.totalRecordCount > 0 }">
  ${results.pageInfo['recordStart']} - ${results.pageInfo['recordEnd']} of <fmt:formatNumber pattern="#,###">${results.totalRecordCount}</fmt:formatNumber>
</c:if>

<c:if test="${results.totalRecordCount == 0 }">
  No records found
</c:if>