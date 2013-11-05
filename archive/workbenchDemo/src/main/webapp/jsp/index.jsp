<%@include file="includes/tags.jsp"%>
<html>
<c:set var="title">Merchant Center</c:set>
<%@include file="includes/tagHead.jsp"%>
<body class="logged_out marketing windows env-production ">

  <%@include file="includes/header.jsp"%>

  <div id="page-settings" class="context-loader-container" data-pjax-container="">



    <c:set var="selected">rules</c:set>
    <%@include file="includes/settingsNav.jsp"%>

    <div class="settings-content">

      <!-- Squadron -->
      <%@include file="includes/notificationBlock.jsp"%>



      <div class="boxed-group js-ssh-keys-box">

        <a href="javascript:;" id="add_key_action" class="js-show-new-ssh-key-form minibutton lighter bigger boxed-group-action" onclick="$('#newRule').toggleNice(function(){ callBridge(); });">Add Rule</a>
        <h3>Rules</h3>

        <div id="newRule" class="boxed-group js-new-ssh-key-box" style="display:none;">
          <h3>Add a rule</h3>
          <div class="boxed-group-inner">
            <div id="new_key_form_wrap" class="body">
            <form accept-charset="UTF-8"  class="new_public_key" id="new_key" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="6Bp5jQGUUA/GNAJipAmx0CD9BJDMHonjE+UKcC2zeDo="></div>
              
          <dl class="form">
            <dt><label>Name</label><img src="/images/help.png" align="bottom" class="help" alt="The name of this rule" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div class="fieldWithErrors"><input id="public_key_title" name="public_key[title]" size="30" type="text"></div></dd>
          </dl>
          <hr>
          <dl class="form">
            <dt><label>Triggers</label> <img src="/images/help.png" align="bottom" class="help" alt="The search and navigation states that trigger this rule" style="opacity: 0.2;" aria-describedby="ui-tooltip-8">
            </dt>
            <Br>
            <div id="ruleHolder">
            <div id="exampleRule">
            
            <dd><div class="fieldWithErrors">
            <span id="pronoun0">When a</span>             
            
            <div onclick="$('#navType0').toggle()" class="context-menu-container account-switcher-container js-menu-container js-context-menu">
  <span class="minibutton switcher with-image js-menu-target">
    <span id="navTypeValue0">
      
      Search term
    </span>
  </span>
  
   

  <div style="left:50px" class="context-pane js-menu-content js-account-switcher-pane" id="navType0">
    <a href="javascript:;"  class="close js-menu-close"><span class="mini-icon mini-icon-remove-close"></span></a>
      <div class="context-title">Choose trigger type</div>

      <div class="context-body pane-selector user-selector" >
        <ul class="js-navigation-container">
          <li class="selector-item js-navigation-item js-navigation-target" onclick="$('#navTypeValue0').html('Search term');  $('#pronoun0').html('When a'); $('.navValue0').hide(); $('#navValueSearch0').show()">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4>
                <a class="js-navigation-open" href="javascript:;" >
                  
                  Search term
                  
                </a>
            </h4>
          </li>
            <li class="selector-item js-navigation-item js-navigation-target" href="javascript:;" onclick="$('#navTypeValue0').html('Navigation');  $('#pronoun0').html('When a'); $('.navValue0').hide(); $('#navValueNavigation0').show()">
              <span class="mini-icon mini-icon-confirm"></span>
              <h4>
                <a class="js-navigation-open">
                  
                  Navigation
                  
                </a>
              </h4>
            </li>
            <li class="selector-item js-navigation-item js-navigation-target" onclick="$('#navTypeValue0').html('Event'); $('#pronoun0').html('When an'); $('.navValue0').hide(); $('#navValueEvent0').show()">
              <span class="mini-icon mini-icon-confirm"></span>
              <h4>
                <a class="js-navigation-open" href="javascript:;">
                  
                  Event
                  
                </a>
              </h4>
            </li>
        </ul>

        
      </div>
  </div>
</div>

occurs with a value of
            
  
  
  <div id="navValueSearch0" class="navValue0 fieldWithErrors"><input style="width:170px" name="public_key[title]" size="10" type="text"></div>
  
  <div id="navValueNavigation0" style="display:none" class="navValue0 fieldWithErrors">
  
  
  <div onclick="$('#navValue0').toggle()" class="context-menu-container account-switcher-container js-menu-container js-context-menu">
  <span class="minibutton switcher with-image js-menu-target">
    <span id="navTypeValue0">
      
      Price 0 - 20.00
    </span>
  </span>
  
   

  <div style="left:283px" class="context-pane js-menu-content js-account-switcher-pane" id="navValue0">
    <a href="javascript:;"  class="close js-menu-close"><span class="mini-icon mini-icon-remove-close"></span></a>
      <div class="context-title">Choose Navigation state</div>

      <div class="context-body pane-selector user-selector" >
        <ul class="js-navigation-container">
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 0 - 20.00</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 20.00 - 40.00</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 40.00 - 60.00</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 60.00 - 80.00</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 80.00 - 100.00</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 100.00 - 150.00</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 150.00 - 200.00</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 200.00 - 400.00</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Price: 400.00 - 1000.00</a></h4>
          </li>         
            
            
        </ul>

        
      </div>
  </div>
</div>
  
  
  </div>
  
  
  <div id="navValueEvent0" style="display:none" class="navValue0 fieldWithErrors">




<div onclick="$('#navValueEvent20').toggle()" class="context-menu-container account-switcher-container js-menu-container js-context-menu">
  <span class="minibutton switcher with-image js-menu-target">
    <span id="navTypeValue0">
      
      No results
    </span>
  </span>
  
   

  <div style="left:283px" class="context-pane js-menu-content js-account-switcher-pane" id="navValueEvent20">
    <a href="javascript:;"  class="close js-menu-close"><span class="mini-icon mini-icon-remove-close"></span></a>
      <div class="context-title">Choose Event Type</div>

      <div class="context-body pane-selector user-selector" >
        <ul class="js-navigation-container">
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">No results</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">No navigation</a></h4>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target">
            <span class="mini-icon mini-icon-confirm"></span>
            <h4><a class="js-navigation-open" href="javascript:;">Custom URL parameter</a></h4>
          </li>  
        </ul>

        
      </div>
  </div>
</div>







  </div>
  
  
            
            
            
            
            
            <a class="and" href="javascript:;" onclick="$('#ruleHolder').append($('#exampleRule').clone())">and</a> 
            
             <br><br>
            </div></dd>
            </div>
            
            </div>
          </dl>
          
          <dl>
            <dt><label><a href="javascript:;" onclick="$('#advanced').toggleNice()">advanced criteria >></a></label></dt>
          </dl>          
          <div id="advanced" style="display:none">
          <table width="540">
          <tr>
          <td>

          <dl class="form">
            <dd>
            <div class="fieldWithErrors">
            <label for="check1">
            <input id="check1" type="checkbox" onclick="$('#check2').removeAttr('disabled');"> apply the rule at this point and deeper<img src="/images/help.png" align="bottom" class="help" alt="If checked, this rule will apply at the trigger state, and additional navigation and searches will keep this rule firing" style="opacity: 0.2;" aria-describedby="ui-tooltip-8">
            </label>
            </div>
            <br><br>
            </dd>
            <dd>
            <div class="fieldWithErrors">            
            <label for="check2">
            <input id="check2" type="checkbox"  disabled="disabled"> apply context to zones<img src="/images/help.png" align="bottom" class="help" alt="If checked, all the zones that populate based on a query will also update as the user navigates" style="opacity: 0.2;" aria-describedby="ui-tooltip-8">
            </label>
            </div>
            <br><br>
            </dd>
            <dd>
            <div class="fieldWithErrors">
            <label for="check3">
            <input id = "check3" type="checkbox"> Use A-B testing with 50/50 split<img src="/images/help.png" align="bottom" class="help" alt="If checked, this rule will only fire 50% of the time." style="opacity: 0.2;" aria-describedby="ui-tooltip-8">
            </label>
            </div>
            <br><br>
            </dd>
          </dl>
          
          </td>
          <td valign="top">
            <table><tr><td>
            <dl class="form">
              <dt><label>Start Date</label></dt>
              <dd><div class="fieldWithErrors"><input autocomplete="off" class="datepicker" id="startDate" name="public_key[title]" size="10" type="text"></div></dd>
            </dl>
            </td><td>
            <dl class="form">
              <dt><label>End Date</label></dt>
              <dd><div class="fieldWithErrors"><input autocomplete="off" class="datepicker" id="endDate" name="public_key[title]" size="10" type="text"></div></dd>
            </dl>
            </td></tr></table>
          
          </td>
          </tr></table>

          </div>
            
                     <hr>

          <dl class="form">
            <dt><label>Template</label><img src="/images/help.png" align="bottom" class="help" alt="The template that this rule will use" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div class="fieldWithErrors">
              <ul class="boxed-group-list standalone templateSelect">
                <c:forEach items="1,2,3,4,5" var="i">
                  <li id="template${i}" class="clearfix templatesSmall">
                    <a href="javascript:;" onclick="$('.templatesSmall a').removeClass('highlight');$(this).addClass('highlight');$('.templates').hide();$('#templateBig${i}').toggleNice()"><img src="/images/templates/template${i }.png"></a>
                   </li>
                </c:forEach>
                
                <c:forEach items="1,2,3,4,5" var="i">
                   <div id="templateBig${i }" class="templates" style="display:none">
                   <c:choose>
                   <c:when test="${i ==1  }">                   
                   <img src="/images/templates/templateBig${i}.png">
                   <dl class="form">
                    <dt><label>No configuration required</label></dt>
                    </dl>
                   </div>
                   </c:when>
                   <c:when test="${i ==2  }">
                   <img src="/images/templates/templateBig${i}.png">
                   <dl class="form">
                    <dt><label>Promotion Query</label><img src="/images/help.png" align="bottom" class="help" alt="This zone requires a search query, enter it in the box below" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    <dd><div class="fieldWithErrors"><input type="text"/></div></dd>
                    </dl>
                   </div>
                   </c:when>
                   <c:when test="${i ==3  }">
                   <img src="/images/templates/templateBig${i}.png">
                   <dl class="form">
                    <dt><label>Zone 1 Query</label><img src="/images/help.png" align="bottom" class="help" alt="This zone requires a search query, enter it in the box below" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    <dd><div class="fieldWithErrors"><input type="text"/></div></dd>
                   </dl>
                   <dl class="form">
                    <dt><label>Zone 2 banner image name</label><img src="/images/help.png" align="bottom" class="help" alt="This zone requires specific content, contact your merchant center administrator if you are unsure" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    <dd><div class="fieldWithErrors"><input type="text"/></div></dd>
                    </dl>
                   </div>
                   </c:when>
                   <c:when test="${i ==4  }">
                   <img src="/images/templates/templateBig${i}.png">
                   <dl class="form">
                    <dt><label>Zone 1 Query</label><img src="/images/help.png" align="bottom" class="help" alt="This zone requires a search query, enter it in the box below" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    <dd><div class="fieldWithErrors"><input type="text"/></div></dd>
                   </dl>
                   <dl class="form">
                    <dt><label>Zone 2 banner image name</label><img src="/images/help.png" align="bottom" class="help" alt="This zone requires specific content, contact your merchant center administrator if you are unsure" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    <dd><div class="fieldWithErrors"><input type="text"/></div></dd>
                    </dl>
                    <dl class="form">
                    <dt><label>Zone 3 Query</label><img src="/images/help.png" align="bottom" class="help" alt="This zone requires a search query, enter it in the box below" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    <dd><div class="fieldWithErrors"><input type="text"/></div></dd>
                   </dl>
                   </div>
                   </c:when>
                   <c:when test="${i ==5  }">
                   <img src="/images/templates/templateBig${i}.png">
                   <dl class="form">
                    <dt><label>Zone 1: 3 item query</label><img src="/images/help.png" align="bottom" class="help" alt="This zone requires a search query, enter it in the box below" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    <dd><div class="fieldWithErrors"><input type="text"/></div></dd>
                   </dl>
                   <dl class="form">
                    <dt><label>Zone 2: banner image name</label><img src="/images/help.png" align="bottom" class="help" alt="This zone requires specific content, contact your merchant center administrator if you are unsure" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
                    <dd><div class="fieldWithErrors"><input type="text"/></div></dd>
                    </dl>
                   </div>
                   </c:when>
                   </c:choose>
                </c:forEach>
            </ul>
            </div></dd>
          </dl>
          
          
          <dl class="form">
            <dt><label><a href="javascript:;" onclick="$('#bob').attr('src', 'http://quickstart.groupbyinc.com/index.html?q=speaker systems&preview=true');$('#preview').toggleNice()">Preview</a></label><img src="/images/help.png" align="bottom" class="help" alt="Preview this rule before you save it" style="opacity: 0.2;" aria-describedby="ui-tooltip-8"></dt>
            <dd><div id="preview" style="display:none">
              <dl class="form">
              <table><tr><td>
              <b><label>Start Date</label></b>
              </td><td>
              <div class="fieldWithErrors"><input autocomplete="off" class="datepicker" id="startDate2" name="public_key[title]" size="10" type="text"></div>
              </td></tr></table>
            </dl>
              <iframe id="bob" src="" width="101%" height="600" style="margin-left:-5px;border-top:3px solid #009900;padding-top:3px;"></iframe>
            </div></dd>
          </dl>
              <p>
                <button type="button" class="classy primary" onclick="$('#newRule').toggleNice(function(){ $('#halloween').toggleNice();})">Add rule</button>
              </p>
        </form>    </div>
          </div>
        </div>

        <div class="boxed-group-inner">
            <ul class="boxed-group-list standalone sortable">
                <li id="picks1" class="clearfix">
                  <img align="left" src="/images/templates/template1.png" height="50" style="margin-right:6px;">
                <strong>Flat Screen</strong><br> 
                   Active | Triggered by navigation Category:Flat Screen + <a href="javascript:;" onclick="$('#heather').toggleNice()">4 more</a>
                  <div id="heather" class="triggers" style="display:none"><ul><li>"heather's picks"</li>
                  <li>"heathers picks"</li><li>"top picks"</li>&gt;Today's Top Picks</ul></div>
                  <a href="javascript:;" onclick="$('#picks1').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" data-remote="" data-method="edit" class="minibutton js-remove-key"> Edit </a>
                </li>
                
                <li id="picks2" class="clearfix">
                 <img align="left" src="/images/templates/template4.png" height="50" style="margin-right:6px;">
                <strong>MP3 Player</strong> <br>
                  Active | Triggered by "mp3 player" + <a href="javascript:;" onclick="$('#harry').toggleNice()">3 more</a>
                  <div id="harry" class="triggers" style="display:none"><ul><li>"harry"</li>
                  <li>"hary poter"</li><li>"harry poter"</li></ul></div>
                  <a href="javascript:;" onclick="$('#picks2').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" data-remote="" data-method="edit" class="minibutton js-remove-key"> Edit </a>
                </li>
                
                <li id="halloween" class="clearfix" style="display:none">
                 <img align="left" src="/images/templates/template5.png" height="50" style="margin-right:6px;">
                <strong>Speaker Systems</strong> <br>
                  Active | Triggered by a search for speaker systems 
                  <a href="javascript:;" onclick="callBridge(true);$('#halloween').toggleNice()" data-remote="" data-method="delete" class="minibutton danger js-remove-key"> Delete </a>
                  <a href="javascript:;" data-remote="" data-method="edit" class="minibutton js-remove-key"> Edit </a>
                </li>
            </ul>
        </div>
      </div>


    </div>

  </div>

  <%@include file="includes/footer.jsp"%>
</body>
</html>