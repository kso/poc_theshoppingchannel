<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Merchant Center</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">



    <c:set var="selected">products</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">

      <!-- Squadron -->
      <%@include file="includes/notificationBlock.jsp"%>



      <div class="boxed-group js-ssh-keys-box">

        <a href="javascript:;" id="add_key_action" class="js-show-new-ssh-key-form minibutton lighter bigger boxed-group-action" onclick="$('#newRule').toggleNice()">Upload Product</a>
        <h3>Products</h3>

        <div id="newRule" class="boxed-group js-new-ssh-key-box" style="display:none;">
          <h3>Add Product Feed</h3>
          <div class="boxed-group-inner" >
            <div id="new_key_form_wrap" class="body">
            <form accept-charset="UTF-8"  class="new_public_key" id="new_key" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="6Bp5jQGUUA/GNAJipAmx0CD9BJDMHonjE+UKcC2zeDo="></div>
              
          
          
        
              <p>
                <div id="inputhack">
                <button type="submit" class="classy primary">Upload CSV</button>
                <input id="fileupload" type="file" name="files[]" data-url="server/php/" multiple>
                </div>
              </p>
        </form>    </div>
          </div>
        </div>

        <div class="boxed-group-inner">
            <ul class="boxed-group-list standalone">
                <c:set var="mydates" value="<%= new java.util.Date[]{
                  new java.util.Date(System.currentTimeMillis() - (1 * 3538450000l) ),              
                  new java.util.Date(System.currentTimeMillis() - (2 * 3538450000l) ),                
                  new java.util.Date(System.currentTimeMillis() - (3 * 3538450000l) ),               
                  new java.util.Date(System.currentTimeMillis() - (4 * 3538450000l) ),                
                  new java.util.Date(System.currentTimeMillis() - (5 * 3538450000l) )} %>"/>
                <c:forEach items="1,2,3,4,5" var="i" varStatus="index">
                  <li id="template${i}" class="clearfix" >
                    <img src="/images/csv.png" align="left" >
                    Uploaded: <fmt:formatDate value="${mydates[index.index] }" pattern="yyyy/MM/dd"/> 
                    Product count: <fmt:formatNumber pattern="#,###">${124556 + (5-i)*359}</fmt:formatNumber> SKUs<br>
                    <c:if test="${i ne 1 }">
                    <a href="javascript:;" onclick="$('#template${i}').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                    <a href="javascript:;" onclick="$('#template${i}').toggleNice()" data-remote="" data-method="delete" class="minibutton js-remove-key"> Revert </a>
                    </c:if>
                   </li>
                </c:forEach>
            </ul>
        </div>
      </div>


    </div>

  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html>