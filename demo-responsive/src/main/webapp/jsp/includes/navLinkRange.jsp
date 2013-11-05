<%@include file="tags.jsp"%>


<c:set var="elements" value="0"/>
<c:set var="select">

<ul class="unstyled">


<c:forEach items="${nav.refinementValues}" var="value">
  <c:if test="${value['count'] > 0}">
    <c:set var="elements" value="${elements + 1}"/>
    <li><a href="javascript:;" onclick="$('#refinements').val($('#refinements').val() + '~' + '<c:out value="${nav['name']}:${value['low']}..${value['high']}"/>');$('#form').submit()">
    $<fmt:formatNumber pattern="#,##0">${fn:toLowerCase(value['low'])}</fmt:formatNumber> 
    - 
    $<fmt:formatNumber pattern="#,##0">${fn:toLowerCase(value['high'])}</fmt:formatNumber>
    <span class="count">(${value['count'] })</span>
    </a></li>
  </c:if>
</c:forEach>
</c:set>

</ul>
<c:if test="${elements > 1}">
${select}
</c:if>