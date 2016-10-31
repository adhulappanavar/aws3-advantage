///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {AuthService} from "./auth/auth.service";

bootstrap(AppComponent, [AuthService, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy}), HTTP_PROVIDERS]);