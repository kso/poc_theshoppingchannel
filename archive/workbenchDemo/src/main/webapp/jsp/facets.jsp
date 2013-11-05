<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Merchant Center</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">



    <c:set var="selected">facets</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">

      <!-- Squadron -->
      <%@include file="includes/notificationBlock.jsp"%>



      <div class="boxed-group js-ssh-keys-box">

        <a href="javascript:;" id="add_key_action" class="js-show-new-ssh-key-form minibutton lighter bigger boxed-group-action" onclick="$('#newRule').toggleNice()">Add Facet</a>
        <h3>Facets</h3>

        <div id="newRule" class="boxed-group js-new-ssh-key-box" style="display:none;">
          <h3>Add a facet</h3>
          <div class="boxed-group-inner">
            <div id="new_key_form_wrap" class="body">
            <form accept-charset="UTF-8" class="new_public_key" id="new_key" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="6Bp5jQGUUA/GNAJipAmx0CD9BJDMHonjE+UKcC2zeDo="></div>
              
          <dl class="form">
            <dt><label>Facet Name</label><img src="/images/help.png" align="bottom" class="help" alt="The name of this facet" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div class="fieldWithErrors"><input id="public_key_title" name="public_key[title]" size="30" type="text"></div></dd>
          </dl>
         
              <p>
                <button type="submit" class="classy primary">Add facet</button>
              </p>
        </form>    </div>
          </div>
        </div>

        <div class="boxed-group-inner">
            <ul class="boxed-group-list standalone sortable">
                <li id="picks1" class="clearfix">                  
                  <strong>Price Range</strong>
                  <a href="javascript:;" onclick="$('#picks1').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" data-method="delete" class="minibutton js-remove-key"> Configure </a>
                </li>

                <li id="picks2" class="clearfix">                  
                  <strong>Availability</strong>
                  <a href="javascript:;" onclick="$('#picks2').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" data-method="delete" class="minibutton js-remove-key"> Configure </a>
                </li>
                <li id="picks3" class="clearfix">                  
                  <strong>Format</strong>
                  <a href="javascript:;" onclick="$('#picks3').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" data-method="delete" class="minibutton js-remove-key"> Configure </a>
                </li>
                
                <li id="picks5" class="clearfix">                  
                  <strong>Brand</strong>
                  <a href="javascript:;" onclick="$('#picks5').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" onclick="$('#brandDetail').toggleNice()" data-method="delete" class="minibutton js-remove-key"> Configure </a>
                  <div id="brandDetail" style="display:none">
                    <dl class="form">
                      <dt>Boost Values:<img src="/images/help.png" align="bottom" class="help" alt="Comma separated list of specific facet values to boost" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                      <dd><div class="fieldWithErrors"><input id="public_key_title" name="public_key[title]" size="30" type="text" value="Sony, Apple, Bose"></div></dd>
                    </dl>
                    <dl class="form">
                      <dt><input type="checkbox"> Use in Autocomplete<img src="/images/help.png" align="bottom" class="help" alt="Should this facet appear in the autocomplete" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    </dl>
                    <dl class="form">
                      <dt><input type="checkbox"> Make multi-select OR query<img src="/images/help.png" align="bottom" class="help" alt="Make this facet multi-select or" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    </dl>
                    <dl class="form">
                      <dt><input type="checkbox" checked="checked"> Precedence<img src="/images/help.png" align="bottom" class="help" alt="Only show this filter after another has been selected" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"> <select><option>Availability</option><option>Best Sellers</option><option selected="selected">Department</option><option>Format</option><option>Price</option><option>Rating</option></select></dt>
                    </dl>
                  </div>
                </li>
                <li id="picks6" class="clearfix">                  
                  <strong>Rating</strong>
                  <a href="javascript:;" onclick="$('#picks6').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" data-method="delete" class="minibutton js-remove-key"> Configure </a>
                </li>
                <li id="picks7" class="clearfix">                  
                  <strong>Best Sellers</strong>
                  <a href="javascript:;" onclick="$('#picks7').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" data-method="delete" class="minibutton js-remove-key"> Configure </a>
                </li>
            </ul>
        </div>
      </div>


    </div>

  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html>