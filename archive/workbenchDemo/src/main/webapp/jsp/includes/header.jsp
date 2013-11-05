<c:if test="${signedIn}">
<%@include file="headerSignedIn.jsp"%>
</c:if>
<c:if test="${!signedIn}">
<%@include file="headerSignedOut.jsp"%>
</c:if>