<%@include file="tags.jsp"%>
<c:set var="navString">

<c:if test="${fn:length(results.availableNavigation) > 0}">
  <script>
    function updateurl(cb, name, val){
      var refinement = '~' + name + "=" + val;
      if(cb.checked){
          $('#refinements').val($('#refinements').val() + refinement);
      } else {
    	  $('#refinements').val($('#refinements').val().replace(refinement, ''));
      }
    }
  </script>
</c:if>
<c:forEach items="${results.availableNavigation}" var="nav">
  <c:set var="navName">,${nav.name},</c:set>
  <c:set var="shouldShow">
  	<c:if test="${!nav.unionable}">true</c:if>
  	<c:if test="${nav.unionable}">
	  <c:set var="found" value="false"/>
	  <c:forEach items="${results.selectedRefinements}" var="ref">
	  	<c:if test="${nav.name eq ref.navigationName}">
	  		<c:set var="found" value="true"/>
	  	</c:if>
	  </c:forEach>
	  ${!found}
  	</c:if>
  </c:set>
  <c:if test="${shouldShow}">
  <c:if test="${!fn:contains(hide, navName)}">
    <c:if test="${nav.name eq 'regularPrice'}">
      <%@include file="slider.jsp"%>
    </c:if>
    <c:if test="${nav.name ne 'regularPrice'}">
      <div class="search-sidebar-filter">
        <h3>${nav.displayName}<c:if test="${nav.unionable}"> (OR)</c:if><i class="icon-chevron-right pull-right"></i></h3>
        <c:if test="${!nav.range}">
	        <c:if test="${nav.unionable}">
	          <%@include file="navUnionable.jsp"%>
	        </c:if>
	        <c:if test="${!nav.unionable}">
	          <%@include file="navLink.jsp"%>
	        </c:if>
        </c:if>
        <c:if test="${nav.range}">
          <%@include file="navLinkRange.jsp"%>
        </c:if>
      </div>  
    </c:if>
  </c:if>
  </c:if>
</c:forEach>
</c:set>
<c:if test="${!empty navString}">
  <b>Refine Results</b>
  ${navString}
</c:if>
<c:if test="${empty navString}">
  <b>No refinements remain</b>
</c:if>