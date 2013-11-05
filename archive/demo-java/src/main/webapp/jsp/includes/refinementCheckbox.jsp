<%@include file="tags.jsp"%>
<label for="${refinement._id}">
<input id="${refinement._id}" type="checkbox" checked="checked" value="${refinement['navigationName']}=${refinement['value']}" onclick="uncheckrefinement()"/>
<str:capitalize>
<c:if test="${refinement.value eq 'true' or refinement.value eq 'false'}">
${refinement.value ? '' : 'Not '}${refinement.displayName}
</c:if>
<c:if test="${refinement.value ne 'true' and refinement.value ne 'false'}">
${fn:toLowerCase(refinement.value)}
</c:if>
</str:capitalize>
</label>