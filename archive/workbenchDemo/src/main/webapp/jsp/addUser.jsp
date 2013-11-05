<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Password Change</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">


    <c:set var="selected">addUser</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">


      <!-- Password -->
      <%@include file="includes/notificationBlock.jsp"%>

      

<div class="boxed-group">
        <h3>Add User</h3>
        <div class="boxed-group-inner">
          <form accept-charset="UTF-8" action="/manager/index.html" class="edit_user" id="change_password" method="post">
          
            <input type="hidden" name="action" value="createNewUser">
            <div style="margin: 0; padding: 0; display: inline"></div>
            <dl class="form password-confirmation-form">
              <dt>
                <div class="fieldWithErrors">
                  <label for="user_old_password">Email</label>
                </div>
              </dt>
              <dd>
                <input class="cursorFocus" autocomplete="off" id="newEmail" name="newEmail" tabindex="2" type="text">
              </dd>
            </dl>
            <dl class="form password-confirmation-form">
              <dt>
                <div class="fieldWithErrors">
                  <label for="user_new_password">password</label>
                </div>
              </dt>
              <dd>
                <input autocomplete="off" data-autocheck-url="/signup_check/password" id="newPassword" name="newPassword" tabindex="2" type="password">
              </dd>
            </dl>
            <p>
              <button class="button classy" tabindex="2">Create User</button>
            </p>
          </form>
        </div>
      </div>

    </div>

  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html>