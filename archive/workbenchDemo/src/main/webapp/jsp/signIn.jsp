<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Sign in</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <%@include file="includes/errors.jsp"%>

  <div id="login" class="login_form">
    <form accept-charset="UTF-8" action="/manager/signIn.html" method="post">
      <input type="hidden" name="action" value="signIn"> <input type="hidden" name="url" value="${param.url}">
      <div style="margin: 0; padding: 0; display: inline"></div>
      <h1>Sign in</h1>
      <div class="formbody">
        <label for="email"> Email <br> <input class="text cursorFocus" id="email" name="email" style="width: 21em;" tabindex="2" type="text">
        
        

        </label><label for="password"> Password <br> <input class="text" id="password" name="password" style="width: 21em;" tabindex="2" type="password">
        
        

        </label>
         <p>
         <label class="submit_btn"> <input name="commit" tabindex="3" type="submit" value="Sign in"></label>
         <span style="float:right;margin-right:20px; margin-top:10px;"><a href="javascript:;" onclick="$('#passwordReset').toggleNice()">I forgot my password</a> </span>
         </p><br>
         <%@include file="includes/passwordBlock.jsp" %>
      </div>
    </form>
  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html> 