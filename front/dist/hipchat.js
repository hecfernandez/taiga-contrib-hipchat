(function(){var HipChatAdmin,HipChatWebhooksDirective,debounce,initHipChatPlugin,module;debounce=function(wait,func){return _.debounce(func,wait,{leading:!0,trailing:!1})},HipChatAdmin=function(){function HipChatAdmin(rootScope,scope,repo,appMetaService,confirm,http,projectService){var promise;this.rootScope=rootScope,this.scope=scope,this.repo=repo,this.appMetaService=appMetaService,this.confirm=confirm,this.http=http,this.projectService=projectService,this.scope.sectionName="HipChat",this.scope.sectionSlug="hipchat",this.scope.project=this.projectService.project.toJS(),this.scope.projectId=this.scope.project.id,promise=this.repo.queryMany("hipchat",{project:this.scope.projectId}),promise.then(function(_this){return function(hipchathooks){var description,title;return _this.scope.hipchathook={project:_this.scope.projectId,notify_userstory_create:!0,notify_userstory_change:!0,notify_userstory_delete:!0,notify_task_create:!0,notify_task_change:!0,notify_task_delete:!0,notify_issue_create:!0,notify_issue_change:!0,notify_issue_delete:!0,notify_wikipage_create:!0,notify_wikipage_change:!0,notify_wikipage_delete:!0},hipchathooks.length>0&&(_this.scope.hipchathook=hipchathooks[0]),title=_this.scope.sectionName+" - Plugins - "+_this.scope.project.name,description=_this.scope.project.description,_this.appMetaService.setAll(title,description)}}(this)),promise.then(null,function(_this){return function(){return _this.confirm.notify("error")}}(this))}return HipChatAdmin.$inject=["$rootScope","$scope","$tgRepo","tgAppMetaService","$tgConfirm","$tgHttp","tgProjectService"],HipChatAdmin.prototype.testHook=function(){var promise;return promise=this.http.post(this.repo.resolveUrlForModel(this.scope.hipchathook)+"/test"),promise.success(function(_this){return function(_data,_status){return _this.confirm.notify("success")}}(this)),promise.error(function(_this){return function(data,status){return _this.confirm.notify("error")}}(this))},HipChatAdmin}(),HipChatWebhooksDirective=function($repo,$confirm,$loading,$analytics){var link;return link=function($scope,$el,$attrs){var form,submit,submitButton;return form=$el.find("form").checksley({onlyOneErrorElement:!0}),submit=debounce(2e3,function(_this){return function(event){var currentLoading,promise;if(event.preventDefault(),form.validate())return currentLoading=$loading().target(submitButton).start(),$scope.hipchathook.id?$scope.hipchathook.url?(promise=$repo.save($scope.hipchathook),promise.then(function(data){return $scope.hipchathook=data})):(promise=$repo.remove($scope.hipchathook),promise.then(function(data){return $scope.hipchathook={project:$scope.projectId,notify_userstory_create:!0,notify_userstory_change:!0,notify_userstory_delete:!0,notify_task_create:!0,notify_task_change:!0,notify_task_delete:!0,notify_issue_create:!0,notify_issue_change:!0,notify_issue_delete:!0,notify_wikipage_create:!0,notify_wikipage_change:!0,notify_wikipage_delete:!0}})):(promise=$repo.create("hipchat",$scope.hipchathook),promise.then(function(data){return $analytics.trackEvent("hipchat","create","Create hipchat integration",1),$scope.hipchathook=data})),promise.then(function(data){return currentLoading.finish(),$confirm.notify("success")}),promise.then(null,function(data){if(currentLoading.finish(),form.setErrors(data),data._error_message)return $confirm.notify("error",data._error_message)})}}(this)),submitButton=$el.find(".submit-button"),$el.on("submit","form",submit),$el.on("click",".submit-button",submit)},{link:link}},module=angular.module("taigaContrib.hipchat",[]),module.controller("ContribHipChatAdminController",HipChatAdmin),module.directive("contribHipchatWebhooks",["$tgRepo","$tgConfirm","$tgLoading","$tgAnalytics",HipChatWebhooksDirective]),initHipChatPlugin=function($tgUrls){return $tgUrls.update({hipchat:"/hipchat"})},module.run(["$tgUrls",initHipChatPlugin])}).call(this),angular.module("templates").run(["$templateCache",function($templateCache){$templateCache.put("/plugins/hipchat/hipchat.html",'\n<contrib-hipchat-webhooks ng-controller="ContribHipChatAdminController as ctrl">\n  <header>\n    <h1><span class="project-name">{{::project.name}}</span><span class="green">{{::sectionName}}</span></h1>\n  </header>\n  <form>\n    <label for="url">HipChat webhook url</label>\n    <div class="contrib-form-wrapper">\n      <fieldset class="contrib-input">\n        <input type="text" name="url" ng-model="hipchathook.url" placeholder="Write here the url" id="url" data-type="url"/>\n      </fieldset>\n      <fieldset ng-show="hipchathook.id" class="contrib-test"><a href="" title="Test" ng-click="ctrl.testHook()" class="button-gray">Test</a></fieldset>\n    </div>\n    <fieldset>\n      <h2>Notifications on Hipchat</h2>\n      <div class="check-item"><span>Enable notifications on Hipchat</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n    </fieldset>\n    <fieldset>\n      <h2>Notify Epics</h2>\n      <div class="check-item"><span>Create</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_epic_create"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Change</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_epic_change"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Delete</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_epic_delete"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n    </fieldset>\n    <fieldset>\n      <h2>Notify Epics related user stories</h2>\n      <div class="check-item"><span>Create</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_relateduserstory_create"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Delete</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_relateduserstory_delete"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n    </fieldset>\n    <fieldset>\n      <h2>Notify User Stories</h2>\n      <div class="check-item"><span>Create</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_userstory_create"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Change</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_userstory_change"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Delete</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_userstory_delete"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n    </fieldset>\n    <fieldset>\n      <h2>Notify Tasks</h2>\n      <div class="check-item"><span>Create</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_task_create"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Change</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_task_change"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Delete</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_task_delete"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n    </fieldset>\n    <fieldset>\n      <h2>Notify Issues</h2>\n      <div class="check-item"><span>Create</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_issue_create"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Change</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_issue_change"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Delete</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_issue_delete"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n    </fieldset>\n    <fieldset>\n      <h2>Notify Wiki</h2>\n      <div class="check-item"><span>Create</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_wikipage_create"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Change</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_wikipage_change"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n      <div class="check-item"><span>Delete</span>\n        <div class="check">\n          <input type="checkbox" name="notification" ng-model="hipchathook.notify_wikipage_delete"/>\n          <div></div><span translate="COMMON.YES" class="check-text check-yes"></span><span translate="COMMON.NO" class="check-text check-no"></span>\n        </div>\n      </div>\n    </fieldset>\n    <button type="submit" class="hidden"></button><a href="" title="Save" ng-click="ctrl.updateOrCreateHook(hipchathook)" class="button-green submit-button"><span>Save</span></a>\n  </form><a href="https://tree.taiga.io/support/contrib-plugins/hipchat-integration/" target="_blank" class="help-button">\n    <tg-svg svg-icon="icon-question"></tg-svg><span>Do you need help? Check out our support page!</span></a>\n</contrib-hipchat-webhooks>')}]);