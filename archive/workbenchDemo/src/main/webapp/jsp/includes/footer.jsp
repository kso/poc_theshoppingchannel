<c:if test="${signedIn}">
  <%@include file="footerSignedIn.jsp"%>
</c:if>
<c:if test="${!signedIn}">
  <%@include file="footerSignedOut.jsp"%>
</c:if>

<div class="container footer">
<p class="right">Powered by<br><img align="middle" src="/images/google.png"/></p>
  <hr>
       
   <p class="right">© 2013 <span>GroupBy Inc</span> All rights reserved.         </p>

    <a class="left" href="http://groupbyinco.com/">
      <img src="/images/groupbyLogo.png" style="margin-right:20px;">
    </a>
    <ul id="legal">
        <li><a href="javascript:;">Terms of Service</a></li>
        <li><a href="javascript:;">Privacy</a></li>
        <li><a href="javascript:;">Security</a></li>
    </ul>
  </div>
  </div>
  
<%@include file="ga.jsp"%>