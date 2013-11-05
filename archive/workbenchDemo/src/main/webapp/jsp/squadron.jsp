<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Manual</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">



    <c:set var="selected">squadron</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">

      <!-- Squadron -->
      <%@include file="includes/notificationBlock.jsp"%>



      <div class="boxed-group js-ssh-keys-box">


        <h3>Squadron</h3>

        <div class="boxed-group-inner">
          <c:if test="${!empty squadrons }">
            <ul class="boxed-group-list standalone">

              <c:forEach items="${squadrons }" var="squadron">
                <li id="${squadron.value.id }" class="clearfix"><strong>${squadron.key }</strong> (${squadron.value.id}) <a href="javascript:;" onclick="$('#squadron_${squadron.value.id}').toggleNice()">show
                    squadron members <span class="ajaxTimeout5000" data-load="/manager/squadron.html?action=countMembers&id=${squadron.value.id}"></span></a>
                    <c:if test="${squadron.key ne 'Default'}">
                    <a href="javascript:;" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  </c:if>
                  <div class="squadronContainer" id="squadron_${squadron.value.id }" style="display: none">
                    <div class="ajaxTimeout5000" data-load="/manager/squadron.html?action=loadMembers&id=${squadron.value.id}"></div>
                    <hr>
                  </div>
                </li>
              </c:forEach>
            </ul>
          </c:if>
        </div>
      </div>


    </div>

  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html>