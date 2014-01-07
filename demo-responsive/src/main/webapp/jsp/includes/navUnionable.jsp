<%@include file="tags.jsp"%>


<c:set var="elements" value="0"/>
<c:set var="select">
<c:set var="max" value="5"/>


<ul class="unstyled">

<c:forEach items="${nav.refinementValues}" var="value" varStatus="iC">
  <c:set var="shouldShow">
  	${!fn:startsWith(value['value'], '&')}
  </c:set>
  <c:if test="${shouldShow}">
  <c:if test="${iC.index < max}">
    <c:if test="${value['count'] > 0}">
      <c:set var="elements" value="${elements + 1}"/>
      <li>
      	<label for="${value['id']}" class="checkbox">
	   	  <input type="checkbox" class="checkbox" id="${value['id']}" value=""
	   	  		 onclick="updateurl(this, &quot;${nav['name']}&quot;, &quot;${value['value']}&quot;);">
	   	  </input>
    	  <str:truncateNicely upper="20"><str:capitalizeAllWords>${fn:toLowerCase(value['value'])}</str:capitalizeAllWords></str:truncateNicely>
    	  <span class="count">(${value['count'] })</span> 
      	</label>
      	</a>
      </li>
    </c:if>
  </c:if>
  <c:if test="${iC.index >= max}">
    <c:if test="${value['count'] > 0}">
      <c:set var="elements" value="${elements + 1}"/>
      <li>
      	<label for="${value['id']}" style="display:none" class="checkbox hide${gc:md5(nav.name)}">
	      <input type="checkbox" class="checkbox" id="${value['id']}" value=""
	      		 onclick="updateurl(this, &quot;${nav['name']}&quot;, &quot;${value['value']}&quot;);">
	      </input>
	      <str:truncateNicely upper="20"><str:capitalizeAllWords>${fn:toLowerCase(value['value'])}</str:capitalizeAllWords></str:truncateNicely>
	      <span class="count">(${value['count'] })</span> 
      	</label>
      </li>
    </c:if>
  </c:if>
  </c:if>
</c:forEach>
  <c:if test="${fn:length(nav.refinementValues) >= max}">
    <li><a href="javascript:;" onclick="$('div', $(this)).toggle();$('.hide${gc:md5(nav.name)}').toggle()"><div>more...</div><div style="display:none">less...</div></a></li>
  </c:if>
  <li>
  	<a href="javascript:;" onclick="$('#form').submit()" style="display:block; text-align:right;">Apply >></a>
  </li>
</ul>

</c:set>


<c:if test="${elements > 1}">
${select}
</c:if>