<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Merchant Center</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">



    <c:set var="selected">sort</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">

      <!-- Squadron -->
      <%@include file="includes/notificationBlock.jsp"%>



      <div class="boxed-group js-ssh-keys-box">

        <a href="javascript:;" id="add_key_action" class="js-show-new-ssh-key-form minibutton lighter bigger boxed-group-action" onclick="$('#newRule').toggleNice()">Add Sort</a>
        <h3>Sort</h3>

        <div id="newRule" class="boxed-group js-new-ssh-key-box" style="display:none;">
          <h3>Add a Sort Option</h3>
          <div class="boxed-group-inner">
            <div id="new_key_form_wrap" class="body">
            <form accept-charset="UTF-8" class="new_public_key" id="new_key" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="6Bp5jQGUUA/GNAJipAmx0CD9BJDMHonjE+UKcC2zeDo="></div>
              
          <dl class="form">
            <dt><label>Sort Field</label><img src="/images/help.png" align="bottom" class="help" alt="The field to sort by" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div class="fieldWithErrors"><input id="public_key_title" name="public_key[title]" size="30" type="text"></div></dd>
          </dl>
         
              <p>
                <button type="submit" class="classy primary">Add Sort</button>
              </p>
        </form>    </div>
          </div>
        </div>

        <div class="boxed-group-inner">
            <ul class="boxed-group-list standalone ">
                <li id="picks1" class="clearfix">                  
                  <strong>Relevancy</strong>
                </li>
                
                <li id="picks1" class="clearfix">                  
                  <strong>Price</strong>
                  <a href="javascript:;" onclick="$('#picks1').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                </li>

                <li id="picks2" class="clearfix">                  
                  <strong>Rating</strong>
                  <a href="javascript:;" onclick="$('#picks2').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                </li>
            </ul>
        </div>
      </div>


    </div>

  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html>