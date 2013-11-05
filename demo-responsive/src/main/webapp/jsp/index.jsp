<%@include file="includes/tags.jsp"%>
<c:if test="${!empty results.redirect}">
  <c:redirect url="${results.redirect}" />
</c:if>
<c:set var="page">
  <c:choose>
   <c:when test="${!empty param.tab}">
      store.jsp
    </c:when>
    <c:when test="${results.template.name ne 'default'}">
     ${gc:replaceAll(results.template.name, ' ', '')}.jsp
    </c:when>
    <c:when test="${!empty param.q}">
      search.jsp
    </c:when>
  </c:choose>
</c:set>
<jsp:include page="${page}"/>