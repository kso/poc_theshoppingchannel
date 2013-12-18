<%@include file="tags.jsp"%>
<li class="checkbox">
<label for="${refinement.id}">
<input id="${refinement.id}"  type="checkbox" checked="checked" value="<c:out value="${refinement.navigationName}:${refinement.low}..${refinement.high}"/>" onclick="uncheckrefinement()"/>
${refinement.navigationDisplayName}:<fmt:formatNumber pattern="0.00">${refinement.low}</fmt:formatNumber> ${empty refinement.high ? '+' : ' - '}${empty refinement.high ? '+' : prefix}<fmt:formatNumber pattern="0.00">${refinement.high}</fmt:formatNumber>
</label>
</li>