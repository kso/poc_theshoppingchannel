<%@include file="../includes/tags.jsp"%>
<c:forEach items="${squadron.aircraft }" var="aircraft" varStatus="i">
  <span title="${aircraft.atc ? 'Master ' : '' }(${fn:toLowerCase(aircraft.type)})" class="member ${i.index%2 == 0 ? 'on' : '' } ${fn:toLowerCase(aircraft.type)}${aircraft.atc ? 'Master' : '' }">${aircraft.host}:${aircraft.port}</span>
</c:forEach>