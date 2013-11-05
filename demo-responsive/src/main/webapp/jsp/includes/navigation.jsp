<%@include file="tags.jsp"%>
<c:set var="navString">

<c:forEach items="${results.availableNavigation}" var="nav">
  <c:set var="navName">,${nav.name},</c:set>
  <c:if test="${!fn:contains(hide, navName)}">
    <c:if test="${nav.name eq 'regularPrice'}">
      <%@include file="slider.jsp"%>
    </c:if>
    <c:if test="${nav.name ne 'regularPrice'}">
      <div class="search-sidebar-filter">
        <h3>${nav.displayName}<i class="icon-chevron-right pull-right"></i></h3>
        <c:if test="${!nav.range}">
          <%@include file="navLink.jsp"%>
        </c:if>
        <c:if test="${nav.range}">
          <%@include file="navLinkRange.jsp"%>
        </c:if>
      </div>  
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