<%@include file="tags.jsp"%>


<c:if test="${fn:toLowerCase(param.q) eq 'admin' and (username eq 'roland.gossage@groupbyinc.com' or username eq 'will.warren@groupbyinc.com')}">
  <a href="createNewUser.html">Create User</a><br>
  <a href="deleteUser.html">Delete User</a>
  <a href="signOut.html">Sign Out</a>
</c:if>
<c:set var="navString">
  <c:forEach items="${results.availableNavigation}" var="nav">
    <c:set var="nav" value="${nav }" scope="request"/>
    <c:if test="${nav.displayName eq 'Department'}">
      <%@include file="navLink.jsp"%>
    </c:if>
    <c:if test="${nav.displayName ne 'Department'}">    
      <c:set var="jspInclude">navLink<str:capitalize>${nav.isRange ? 'range' : '' }</str:capitalize>.jsp</c:set>
      <jsp:include page="includes/${jspInclude}"/>
    </c:if>
  </c:forEach>  
</c:set>

<c:if test="${!empty navString}">
  ${navString}
</c:if>
<c:if test="${empty navString}">
  <b>No refinements remain</b>
</c:if>