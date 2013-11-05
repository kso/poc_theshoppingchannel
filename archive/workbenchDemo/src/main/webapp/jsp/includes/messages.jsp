<c:if test="${!empty messages}">
    <div class="flash flash-notice">
      <c:forEach items="${messages }" var="message">
      ${message }<br>
      </c:forEach>
      <span class="mini-icon mini-icon-remove-close close"></span>
    </div>
</c:if>