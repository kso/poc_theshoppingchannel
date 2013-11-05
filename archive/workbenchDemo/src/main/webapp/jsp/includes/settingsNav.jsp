<div id="settings-nav" class="menu-container js-settings-next">
  <ul class="menu accordion js-settings-pjax" data-pjax="">
    <li class="section"><a href="javascript:;" class="section-head">Merchandising</a>
      <ul class="expanded section-nav">
        <li><a href="/manager/index.html" class="${selected eq 'rules' ? 'selected': ''}">Rules</a></li>
        <li><a href="/manager/templates.html" class="${selected eq 'templates' ? 'selected': ''}">Templates</a></li>
      </ul></li>
  </ul>
  <br>
  <ul class="menu accordion js-settings-pjax" data-pjax="">
    <li class="section"><a href="javascript:;" class="section-head">Query Rewrite</a>
      <ul class="expanded section-nav">
        <li><a href="javascript:;" class="${selected eq 'boosting' ? 'selected': ''}">Biasing</a></li>
        <li><a href="javascript:;" class="${selected eq 'boosting' ? 'selected': ''}">Boosting</a></li>
        <li><a href="/manager/facets.html" class="${selected eq 'facets' ? 'selected': ''}">Facets</a></li>
        <li><a href="/manager/phrases.html" class="${selected eq 'phrases' ? 'selected': ''}">Phrases</a></li>
        <li><a href="/manager/redirects.html" class="${selected eq 'redirects' ? 'selected': ''}">Redirects</a></li>
        <li><a href="/manager/spelling.html" class="${selected eq 'spelling' ? 'selected': ''}">Spelling</a></li>
        <li><a href="/manager/sort.html" class="${selected eq 'sort' ? 'selected': ''}">Sort</a></li>
        <li><a href="/manager/synonyms.html" class="${selected eq 'synonyms' ? 'selected': ''}">Synonyms</a></li>
      </ul></li>
  </ul>
  <br>
  <ul class="menu accordion js-settings-pjax" data-pjax="">
    <li class="section"><a href="javascript:;" class="section-head">Admin</a>
      <ul class="expanded section-nav">
        <li><a href="/manager/products.html" class="${selected eq 'products' ? 'selected': ''}">Product Feed</a></li>
        <c:if test="${username eq 'will.warren@groupbyinc.com' or username eq 'roland.gossage@groupbyinc.com'}">
          <li><a href="/manager/addUser.html" class="${selected eq 'addUser' ? 'selected': ''}">Add User</a></li>
          <li><a href="/manager/deleteUser.html" class="${selected eq 'deleteUser' ? 'selected': ''}">Delete User</a></li>
        </c:if>
        <li><a href="/manager/password.html" class="${selected eq 'password' ? 'selected': ''}">Settings</a></li>
      </ul></li>
  </ul>
</div>