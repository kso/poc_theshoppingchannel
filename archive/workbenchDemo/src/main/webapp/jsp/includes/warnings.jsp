<c:if test="${!empty warnings}">
    <div class="flash flash-warn">
      <c:forEach items="${warnings }" var="warning">
      ${warning}<br>
      </c:forEach>
      <span class="mini-icon mini-icon-remove-close close"></span>
    </div>
</c:if>