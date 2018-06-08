import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import login from "../components/login";
import table from "../components/table";

Vue.use(Router);
// 这个是监听应用里面跳转
Router.prototype.goBack = function() {
    this.isBack = true;
    window.history.go(-1);
};
export default new Router({
    routes: [{
        path: "/",
        name: "HelloWorld",
        omponent: HelloWorld
    }, {
        path: "/login",
        name: "Login",
        component: login
    }, {
        path: "/table",
        name: "table",
        component: table
    }]
});