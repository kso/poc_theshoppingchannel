<%@include file="tags.jsp"%>
<li>
	<label class="checkbox" for="${refinement.id}">
		<input id="${refinement.id}" type="checkbox" checked="checked" value="<c:out value="${refinement.navigationName}=${refinement.value}"/>" onclick="uncheckrefinement()"/>
		<span class="navg">${refinement.navigationDisplayName}:</span> <span class="navgVal"><str:capitalizeAllWords>${fn:toLowerCase(refinement.value)}</str:capitalizeAllWords></span>
	</label>
</li>