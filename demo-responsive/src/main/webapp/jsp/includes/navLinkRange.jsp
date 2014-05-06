<%@include file="tags.jsp"%>


<c:set var="elements" value="0"/>
<c:set var="select">

<script>
	function addrefinementrange(name, low, high){
		$('#refinements').val($('#refinements').val() + '~' + name + '=' + low + '..' + high);
		$('#form').submit();
	}
</script>

<ul class="unstyled">
<c:forEach items="${nav.refinementValues}" var="value">
  <c:if test="${value.count > 0}">
    <c:set var="elements" value="${elements + 1}"/>
    <li><a href="javascript:;"
    		onclick="addrefinementrange('<c:out value="${nav.name}"/>', '<c:out value="${value.low}"/>', '<c:out value="${value.high}"/>'">
    $<fmt:formatNumber pattern="#,##0">${fn:toLowerCase(value.low)}</fmt:formatNumber> 
    - 
    $<fmt:formatNumber pattern="#,##0">${fn:toLowerCase(value.high)}</fmt:formatNumber>
    <span class="count">(${value.count})</span> 
    </a></li>
  </c:if>
</c:forEach>
</ul>
</c:set>

<c:if test="${elements > 1}">
${select}
</c:if>
