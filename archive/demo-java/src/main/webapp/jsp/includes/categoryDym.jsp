<%@include file="tags.jsp"%>
<c:set var="didit" value="false"/>
<c:if test="${empty results.availableNavigationByName['department'] and fn:length(results.availableNavigationByName['department'].refinementValues) > 1}">
  <c:forEach items="${results.availableNavigation}" var="nav">
    <c:if test="${nav.name eq 'department'}">
      <c:set var="last" value="${nav.refinementValues[0].count}" />
      <c:forEach items="${nav.refinementValues}" var="val">
        <c:if test="${val.count > 10 && val.count / last > 0.9}">
          <c:if test="${!didit}">Search within: </c:if><a href="javascript:;" onclick="$('#refinements').val($('#refinements').val() + '~${nav.name}=' + '${val.value}');$('#form').submit();"><str:capitalize> ${fn:toLowerCase(val.value)}</str:capitalize></a>
          <c:set var="didit" value="true"/>
          <c:set var="last" value="${val.count}" />
        </c:if>
      </c:forEach> 
    </c:if>
  </c:forEach>
</c:if>

<c:if test="${didit}">

</c:if>