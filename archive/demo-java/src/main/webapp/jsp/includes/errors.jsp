<%@include file="tags.jsp"%>
<c:if test="${!empty errors}">
  <div class="flash flash-error">
    <c:forEach items="${errors }" var="error">
      ${error }<br>
    </c:forEach>
    <span class="mini-icon mini-icon-remove-close close"></span>
  </div>
</c:if>