<c:set var="show" value="true"/>
<c:forEach items="${results.selectedRefinements}" var="sel">
  <c:if test="${sel.navigationName eq 'regularPrice'}">
    <c:set var="show" value="false"/>
  </c:if>
</c:forEach>
<c:if test="${show}">

<div class="search-sidebar-filter">
  <h3>${nav.displayName}<i class="icon-chevron-right pull-right"></i></h3>
  <c:set var="refs" value="${nav.refinementValues}"/>
  <c:set var="first" value="0"/>
  <c:set var="last" value="0"/>
  <c:forEach items="${refs}" var="ref" varStatus="c">
    <c:if test="${ref.count > 0}">
     <c:if test="${not empty refs[c.index].high}">
      <c:set var="last" value="${c.index}"/>
    </c:if>
     </c:if>
  </c:forEach>
  
  <c:forEach items="${gc:reverse(refs)}" var="ref" varStatus="c">
    <c:if test="${ref.count > 0}">
      <c:set var="first" value="${fn:length(refs) - c.index -1}"/>
    </c:if>
  </c:forEach>
  <c:set var="low" value="${refs[first].low}"/>
  <c:set var="high" value="${refs[last].high}"/> 

  
  <ul class="unstyled">
  <span id="high" style="float:right">$<fmt:formatNumber type="number" 
            maxFractionDigits="0" groupingUsed="false" value="${high}" /></span>
  <span id="low">$<fmt:formatNumber type="number" 
            maxFractionDigits="0" groupingUsed="false" value="${low}" /></span>
  <div id="slider"></div>
  <a href="javascript:;" onclick="$('#refinements').val($('#refinements').val() + '~' + 'regularPrice:' + $( '#slider' ).slider( 'values', 0 ) + '..' + $( '#slider' ).slider( 'values', 1 ));$('#form').submit();" style="text-align: right;display:block;">Apply >></a>
  <script>
    $( "#slider" ).slider({
        range: "max",
        min: <fmt:formatNumber type="number" 
            maxFractionDigits="0" groupingUsed="false" value="${low}" />,
        max: <fmt:formatNumber type="number" 
            maxFractionDigits="0" groupingUsed="false" value="${high}" />,
        values: [<fmt:formatNumber type="number" 
            maxFractionDigits="0" groupingUsed="false" value="${low}" />, <fmt:formatNumber type="number" 
            maxFractionDigits="0" groupingUsed="false" value="${high}" />],
        slide: function( event, ui ) {
          $( "#amount" ).val( ui.value );
          $( "#low" ).html( "$" + ui.values[0]);
          $( "#high" ).html( "$" + ui.values[1]);
        }
      });
      $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
  </script>
  
</ul>
</div>
</c:if>