/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

app.factory("feedsService", function($q) {
	return function(){
		var deferred = $q.defer();
		
		var resourceRequest = new WLResourceRequest("/adapters/StarterApplicationAdapter/getEngadgetFeeds", WLResourceRequest.GET, 30000);
		resourceRequest.send().then(
			$.proxy(function(data) {
				deferred.resolve(data.responseJSON.items);
			},this),
			
			$.proxy(function(error) {
				deferred.reject(error);
			},this)
		);
		
		return deferred.promise;
	};
});