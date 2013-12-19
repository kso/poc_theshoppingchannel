<%@include file="tags.jsp"%>

<c:set var="showSearchTerm" value="false" />
 <% if(request.getParameter("q") != null) {
 if(!request.getParameter("q").equals("") && request.getParameter("tab")==null) {  %>
 	<c:set var="showSearchTerm" value="true" />
 <% } }%>

<div class="search-sidebar-refined">
  	<ul class="unstyled">
  		<script>
  		function uncheckrefinement(){
  			$('#refinements').val('');
  			$('#refinementsDivs input[type=checkbox]:checked').each(function(){
  				$('#refinements').val($('#refinements').val() + "~" + $(this).attr('value'));
  			});
  			$('#form').submit();
  		}
  		function removeSearchTerm()
		{
			document.getElementById("q").value="";
			document.getElementById("searchTerm").remove();
			$('#form').submit();
		}
  		</script>
  		
  		<div id="refinementsDiv">
  			<li class="title">Refined By:</li>
  			<c:if test="${showSearchTerm eq 'true'}">
  				<li>
				<label class="checkbox" id="searchTerm">
					<input type="checkbox" id="searchBox" checked="checked" value="<c:out value="searchTerm=${param.q}"/>" onclick="removeSearchTerm()"/>
					<span class="navg">Search Term: </span><span class="navgVal"><str:capitalize><c:out value="${param.q}"/></str:capitalize></span>
				</label>
				</li>
			</c:if>
  			<div id="refinementsDivs">
  			<c:if test="${fn:length(results.selectedRefinements) > 0}">
 		 		<c:forEach items="${results.selectedRefinements }" var="refinement">
   			 		<c:set var="refinement" value="${refinement }" scope="request"/>
    				<c:set var="jspInclude">refinementCheckbox<str:capitalize>${refinement.range ? 'range' : '' }</str:capitalize>.jsp</c:set>
    				<jsp:include page="includes/${jspInclude}"/>
  				</c:forEach>
			</c:if>
			</div>
		</div>
 	</ul>
</div>