<%@include file="tags.jsp"%>
<li>
<label class="checkbox" for="${refinement.id}">
<input id="${refinement.id}" type="checkbox" checked="checked" value="<c:out value="${refinement.navigationName}=${refinement.value}"/>" onclick="uncheckrefinement()"/>
${refinement.value}
</label>
</li>