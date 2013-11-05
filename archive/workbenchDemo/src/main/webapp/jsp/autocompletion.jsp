<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Merchant Center</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">



    <c:set var="selected">autocompletion</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">

      <!-- Squadron -->
      <%@include file="includes/notificationBlock.jsp"%>



      <div class="boxed-group js-ssh-keys-box">

        <a href="javascript:;" id="add_key_action" class="js-show-new-ssh-key-form minibutton lighter bigger boxed-group-action" onclick="$('#newRule').toggleNice()">Add Rule</a>
        <h3>Autocompletions</h3>

        

        
      </div>


    </div>

  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html>