<%@include file="tags.jsp"%>
<label for="${refinement._id}">
<input id="${refinement._id}" type="checkbox" checked="checked" value="${refinement['navigationName']}:${refinement['low']}..${refinement['high']}" onclick="uncheckrefinement()"/>
<c:set var="prefix">
<c:if test="${refinement.navigationName eq 'regularPrice' or refinement.navigationName == 'cost' }">
$
</c:if>
</c:set>
${prefix }<fmt:formatNumber pattern="#,###">${refinement.low}</fmt:formatNumber> ${empty refinement.high ? '+' : ' - '}${empty refinement.high ? '+' : prefix}<fmt:formatNumber pattern="#,###">${refinement.high}</fmt:formatNumber>
</label>