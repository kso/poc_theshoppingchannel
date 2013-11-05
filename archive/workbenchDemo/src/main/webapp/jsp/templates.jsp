<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Merchant Center</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production "> 
  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">



    <c:set var="selected">templates</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">

      <!-- Squadron -->
      <%@include file="includes/notificationBlock.jsp"%>



      <div class="boxed-group js-ssh-keys-box">

        <a href="javascript:;" id="add_key_action" class="js-show-new-ssh-key-form minibutton lighter bigger boxed-group-action" onclick="$('#newRule').toggleNice()">Add Template</a>
        <h3>Template</h3>

        <div id="newRule" class="boxed-group js-new-ssh-key-box" style="display:none;">
          <h3>Add template</h3>
          <div class="boxed-group-inner" >
            <div id="new_key_form_wrap" class="body">
            <form accept-charset="UTF-8"  class="new_public_key" id="new_key" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="6Bp5jQGUUA/GNAJipAmx0CD9BJDMHonjE+UKcC2zeDo="></div>
              
          
        <dl class="form">
            <dt><label>Name</label><img src="/images/help.png" align="bottom" class="help" alt="The name of this template" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div class="fieldWithErrors"><input id="public_key_title" name="public_key[title]" size="30" type="text"></div></dd>
          </dl>          
        
        
        <div id="zoneHolder">
        <dl class="form">
            <dt><label>Zones</label> <img src="/images/help.png" align="bottom" class="help" alt="The search and navigation states that trigger this rule" style="opacity: 0.2;" aria-describedby="ui-tooltip-8">
            </dt>
        </dl>
        <dl class="form" id="zone">
            <dd><div class="fieldWithErrors">
            <span id="pronoun0">Add a</span>             
            
            <div onclick="$('#navType0').toggle()" class="context-menu-container account-switcher-container js-menu-container js-context-menu">
  <span class="minibutton switcher with-image js-menu-target">
    <span id="navTypeValue0">
      
      Query zone
    </span>
  </span>
  
   

  <div style="left:50px" class="context-pane js-menu-content js-account-switcher-pane" id="navType0">
    <a href="javascript:;"  class="close js-menu-close"><span class="mini-icon mini-icon-remove-close"></span></a>
      <div class="context-title">Choose zone type</div>

      <div class="context-body pane-selector user-selector" >
        <ul class="js-navigation-container">
          <li class="selector-item js-navigation-item js-navigation-target" onclick="$('#navTypeValue0').html('Query zone');  ">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4>
                <a class="js-navigation-open" href="javascript:;" >
                  
                  Query zone
                  
                </a>
            </h4>
          </li>
            <li class="selector-item js-navigation-item js-navigation-target" href="javascript:;" onclick="$('#navTypeValue0').html('Content zone');  ">
              <span class="mini-icon mini-icon-confirm"></span>
              <h4>
                <a class="js-navigation-open">
                  
                  Content zone
                  
                </a>
              </h4>
            </li>
        </ul>

        
      </div>
  </div>
</div>

called 
            
  
  
  <div id="navValueSearch0" class="navValue0 fieldWithErrors"><input style="width:170px" name="public_key[title]" size="10" type="text"></div>
  
  
  
  
  
  
  
            
            
            
             
            
            
            
             
            </div></dd>
          </dl>
          
          </div>
          
          <a class="and" href="javascript:;" onclick="$('#zoneHolder').append($('#zone').clone())">add another</a>
        
              <p>
                <div id="inputhack" style="display:inline-block">
                <button type="button" class="classy ">Upload Thumbnail</button>
                <input id="fileupload" type="file" name="files[]" data-url="server/php/" multiple>
                </div>
                <div id="inputhack"  style="display:inline-block">
                <button type="button" class="classy ">Upload Image</button>
                <input id="fileupload" type="file" name="files[]" data-url="server/php/" multiple>
                </div>
              </p>
              <button type="button" class="classy primary" onclick="$('#newRule').toggleNice()">Add template</button>
              <bR><br>
              
        </form>    </div>
          </div>
        </div>
        
        

        <div class="boxed-group-inner">
            <ul class="boxed-group-list standalone">
                <c:forEach items="1,2,3,4,5" var="i">
                  <li id="template${i}" class="clearfix template">
                    <img src="/images/templates/template${i }.png" align="left"><b>${ i == 1 ? 'Default' : i == 2 ? 'List View: Promotion' : i == 3 ? 'Grid View: Zone and Banner' : i == 4 ? 'Grid View: Zone + Banner + Skyscraper' : 'List View: Zone + Banner'}</b><br> 
                    <fmt:formatNumber pattern="#">${i > 3 ? 0 : i%2==0 ? i/2 : i*2 }</fmt:formatNumber> rules use this template
                    <c:if test="${i > 3}">
                      <a href="javascript:;" onclick="$('#template${i}').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                    </c:if>
                    <a href="javascript:;" data-remote="" data-method="edit" class="minibutton js-remove-key"> Edit </a>
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