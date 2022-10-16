(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-958bdcfa"],{6135:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[r("AdminNav"),t.isLoading?r("Spinner"):r("table",{staticClass:"table"},[r("thead",{staticClass:"thead-dark"},[r("tr",[r("th",{attrs:{scope:"col"}},[t._v("#")]),r("th",{attrs:{scope:"col"}},[t._v("Email")]),r("th",{attrs:{scope:"col"}},[t._v("Role")]),r("th",{attrs:{scope:"col",width:"140"}},[t._v("Action")])])]),r("tbody",t._l(t.users,(function(e){return r("tr",{key:e.id},[r("th",{attrs:{scope:"row"}},[t._v(t._s(e.id))]),r("td",[t._v(t._s(e.email))]),r("td",[t._v(t._s(t._f("changeTagName")(e.isAdmin)))]),r("td",[1!==e.id&&e.isAdmin?r("button",{staticClass:"btn btn-link",attrs:{type:"button",disabled:t.isProcessing},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),t.changeUserRole({userId:e.id,isAdmin:!e.isAdmin})}}},[t._v(" set as user ")]):t._e(),1===e.id||e.isAdmin?t._e():r("button",{staticClass:"btn btn-link",attrs:{type:"button",disabled:t.isProcessing},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),t.changeUserRole({userId:e.id,isAdmin:!e.isAdmin})}}},[t._v(" set as admin ")])])])})),0)])],1)},a=[],s=r("1da1"),i=r("5530"),c=(r("d3b7"),r("25f0"),r("d9e2"),r("d81d"),r("96cf"),r("e04c")),o=r("be6c"),u=r("2fa3"),d=r("2f62"),l=r("2375"),m={components:{AdminNav:c["a"],Spinner:l["a"]},data:function(){return{users:[],isLoading:!0,isProcessing:!1}},computed:Object(i["a"])({},Object(d["b"])(["currentUser"])),created:function(){this.fetchUser()},methods:{fetchUser:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.isLoading=!0,e.next=4,o["a"].users.get();case 4:r=e.sent,n=r.data,t.users=n.users,t.isLoading=!1,e.next=15;break;case 10:e.prev=10,e.t0=e["catch"](0),t.isLoading=!1,console.error(e.t0.message),u["a"].fire({icon:"error",title:"無法取得資料，請稍後再試"});case 15:case"end":return e.stop()}}),e,null,[[0,10]])})))()},changeUserRole:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n,a,s,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=t.userId,a=t.isAdmin,r.prev=1,e.isProcessing=!0,r.next=5,o["a"].users.userRole({userId:n,isAdmin:a.toString()});case 5:if(s=r.sent,c=s.data,"success"===c.status){r.next=9;break}throw new Error(c.message);case 9:e.users=e.users.map((function(t){return t.id===n?Object(i["a"])(Object(i["a"])({},t),{},{isAdmin:!t.isAdmin}):t})),e.isProcessing=!1,r.next=18;break;case 13:r.prev=13,r.t0=r["catch"](1),e.isProcessing=!1,console.error(r.t0.message),u["a"].fire({icon:"error",title:"無法更改狀態，請稍後再試"});case 18:case"end":return r.stop()}}),r,null,[[1,13]])})))()}},filters:{changeTagName:function(t){return t?"admin":"user"}}},f=m,g=r("2877"),p=Object(g["a"])(f,n,a,!1,null,null,null);e["default"]=p.exports},be6c:function(t,e,r){"use strict";r("b0c0");var n=r("2fa3");e["a"]={categories:{get:function(){return n["b"].get("/admin/categories")},create:function(t){var e=t.name;return n["b"].post("/admin/categories",{name:e})},deleteCategory:function(t){var e=t.categoryId;return n["b"].delete("/admin/categories/".concat(e))},editCategory:function(t){var e=t.categoryId,r=t.name;return n["b"].put("/admin/categories/".concat(e),{name:r})}},restaurants:{getDetail:function(t){var e=t.restaurantId;return n["b"].get("/admin/restaurants/".concat(e))},update:function(t){var e=t.restaurantId,r=t.formData;return n["b"].put("/admin/restaurants/".concat(e),r)},create:function(t){var e=t.formData;return n["b"].post("/admin/restaurants",e)},getRestaurants:function(){return n["b"].get("/admin/restaurants")},deleteRestaurant:function(t){var e=t.restaurantId;return n["b"].delete("/admin/restaurants/".concat(e))}},users:{get:function(){return n["b"].get("/admin/users")},userRole:function(t){var e=t.userId,r=t.isAdmin;return n["b"].put("/admin/users/".concat(e),{isAdmin:r})}}}},d81d:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").map,s=r("1dde"),i=s("map");n({target:"Array",proto:!0,forced:!i},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},e04c:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-3"},[r("h1",[t._v("餐廳後台")]),r("router-link",{attrs:{to:"/admin/restaurants"}},[t._v("Restaurants")]),t._v(" | "),r("router-link",{attrs:{to:"/admin/categories"}},[t._v("Categories")]),t._v(" | "),r("router-link",{attrs:{to:"/admin/users"}},[t._v("Users")])],1)},a=[],s=r("2877"),i={},c=Object(s["a"])(i,n,a,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-958bdcfa.72234535.js.map