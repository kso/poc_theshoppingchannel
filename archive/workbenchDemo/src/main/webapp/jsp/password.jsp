<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Password Change</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">


    <c:set var="selected">password</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">


      <!-- Password -->
      <%@include file="includes/notificationBlock.jsp"%>

      <div class="boxed-group">
        <h3>General Settings</h3>
        <div class="boxed-group-inner">
          <form accept-charset="UTF-8" action="/manager/password.html" class="edit_user" id="change_password" method="post">
            <input type="hidden" name="action" value="changePassword">
            <div style="margin: 0; padding: 0; display: inline"></div>
            <dl class="form password-confirmation-form">
              <dt>
                <div class="fieldWithErrors">
                  <label for="user_old_password">Preview App URL</label>
                </div>
              </dt>
              <dd>
                <input class="cursorFocus" autocomplete="disabled" id="oldPassword" name="oldPassword" tabindex="2" type="text" value="http://bestbuy.com/index.html?previewKey=123123112322">
              </dd>
            </dl>
            
            
            <p>
              <button class="button classy" tabindex="2">Update</button>
            </p>
          </form>
        </div>
      </div>

<div class="boxed-group">
        <h3>Change Password</h3>
        <div class="boxed-group-inner">
          <form accept-charset="UTF-8" action="/manager/password.html" class="edit_user" id="change_password" method="post">
            <input type="hidden" name="action" value="changePassword">
            <div style="margin: 0; padding: 0; display: inline"></div>
            <dl class="form password-confirmation-form">
              <dt>
                <div class="fieldWithErrors">
                  <label for="user_old_password">Old password</label>
                </div>
              </dt>
              <dd>
                <input class="cursorFocus" autocomplete="disabled" id="oldPassword" name="oldPassword" tabindex="2" type="password" value="${oldPassword }">
              </dd>
            </dl>
            <dl class="form password-confirmation-form">
              <dt>
                <div class="fieldWithErrors">
                  <label for="user_new_password">New password</label>
                </div>
              </dt>
              <dd>
                <input autocomplete="disabled" data-autocheck-url="/signup_check/password" id="newPassword" name="newPassword" tabindex="2" type="password" value="${newPassword }">
              </dd>
            </dl>
            <dl class="form password-confirmation-form">
              <dt>
                <div class="fieldWithErrors">
                  <label for="user_confirm_new_password">Confirm New Password</label>
                </div>
              </dt>
              <dd>
                <input autocomplete="disabled" id="newPasswordAgain" name="newPasswordAgain" tabindex="2" type="password" value="${newPasswordAgain }">
              </dd>
            </dl>
            <p>
              <button class="button classy" tabindex="2">Update Password</button>
              <span><a href="javascript:;" onclick="$('#passwordReset').toggleNice()">I forgot my password</a> </span>
            </p>
            <%@include file="includes/passwordBlock.jsp" %>
          </form>
        </div>
      </div>

    </div>

  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html>