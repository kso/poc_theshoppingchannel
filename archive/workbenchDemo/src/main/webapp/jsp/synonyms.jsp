<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Merchant Center</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">



    <c:set var="selected">synonyms</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">

      <!-- Squadron -->
      <%@include file="includes/notificationBlock.jsp"%>



      <div class="boxed-group js-ssh-keys-box">

        <a href="javascript:;" id="add_key_action" style="margin-right:130px" class="js-show-new-ssh-key-form minibutton lighter bigger boxed-group-action" onclick="$('#newRule2').hide();$('#newRule1').toggleNice()">Add One-Way</a>
        <a href="javascript:;" id="add_key_action" class="js-show-new-ssh-key-form minibutton lighter bigger boxed-group-action" onclick="$('#newRule1').hide();$('#newRule2').toggleNice()">Add Two-Way</a>

        <h3>Redirects</h3>
          
          <div id="newRule2" class="boxed-group js-new-ssh-key-box" style="display:none;">
          <h3>Add a two way synonym<img src="/images/help.png" align="bottom" class="help" alt="A two way redirect expands from any of the terms below to all of the other terms" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></h3>
          <div class="boxed-group-inner">
            <div id="new_key_form_wrap" class="body">
            <form accept-charset="UTF-8"  class="new_public_key" id="new_key" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="6Bp5jQGUUA/GNAJipAmx0CD9BJDMHonjE+UKcC2zeDo="></div>
              
          <dl class="form">
            <dt><label>Synonyms</label> (comma separated)<img src="/images/help.png" align="bottom" class="help" alt="The search term to create a synonym for" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div class="fieldWithErrors"><input id="public_key_title" name="public_key[title]" size="30" type="text"></div></dd>
          </dl>
         
              <p>
                <button type="submit" class="classy primary">Add synonym</button>
              </p>
        </form>    </div>
          </div>
        </div>
        
        <div id="newRule1" class="boxed-group js-new-ssh-key-box" style="display:none;">
          <h3>Add a one way synonym<img src="/images/help.png" align="bottom" class="help" alt="A one way redirect expands the query from the first word to the second, but not from the second word to the first" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></h3>
          <div class="boxed-group-inner">
            <div id="new_key_form_wrap" class="body">
            <form accept-charset="UTF-8"  class="new_public_key" id="new_key" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="6Bp5jQGUUA/GNAJipAmx0CD9BJDMHonjE+UKcC2zeDo="></div>
              
          <dl class="form">
            <dt><label>From</label><img src="/images/help.png" align="bottom" class="help" alt="The search term to create a synonym for" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div class="fieldWithErrors"><input id="public_key_title" name="public_key[title]" size="30" type="text"></div></dd>
          </dl>
          <dl class="form">
            <dt><label>To</label> (comma separated)<img src="/images/help.png" align="bottom" class="help" alt="The synonyms to expand to" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div class="fieldWithErrors"><input id="public_key_title" name="public_key[title]" size="30" type="text"></div></dd>
          </dl>
         
              <p>
                <button type="submit" class="classy primary">Add synonym</button>
              </p>
        </form>    </div>
          </div>
        </div>
        
        

        <div class="boxed-group-inner">
            <ul class="boxed-group-list standalone">
                <li id="picks1" class="clearfix">                  
                  <strong>Computer</strong> <img src="/images/chevronGt.png">Laptop, notebook, desktop
                  <a href="javascript:;" onclick="$('#picks1').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                </li>

                <li id="picks2" class="clearfix">                  
                  <strong>Notebook</strong> <img src="/images/chevronLt.png"> <img src="/images/chevronGt.png">Laptop
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