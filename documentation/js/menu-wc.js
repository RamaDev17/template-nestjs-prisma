'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">pzn documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-e0ef0a931a8d1cebeb16b22bc266a8e08f372502acc4d83961774d9d9e73e948be3b23623a329c11c363eef3f81503153da2ac408ff9d766319e3696bc4796a8"' : 'data-bs-target="#xs-controllers-links-module-AppModule-e0ef0a931a8d1cebeb16b22bc266a8e08f372502acc4d83961774d9d9e73e948be3b23623a329c11c363eef3f81503153da2ac408ff9d766319e3696bc4796a8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e0ef0a931a8d1cebeb16b22bc266a8e08f372502acc4d83961774d9d9e73e948be3b23623a329c11c363eef3f81503153da2ac408ff9d766319e3696bc4796a8"' :
                                            'id="xs-controllers-links-module-AppModule-e0ef0a931a8d1cebeb16b22bc266a8e08f372502acc4d83961774d9d9e73e948be3b23623a329c11c363eef3f81503153da2ac408ff9d766319e3696bc4796a8"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e0ef0a931a8d1cebeb16b22bc266a8e08f372502acc4d83961774d9d9e73e948be3b23623a329c11c363eef3f81503153da2ac408ff9d766319e3696bc4796a8"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e0ef0a931a8d1cebeb16b22bc266a8e08f372502acc4d83961774d9d9e73e948be3b23623a329c11c363eef3f81503153da2ac408ff9d766319e3696bc4796a8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e0ef0a931a8d1cebeb16b22bc266a8e08f372502acc4d83961774d9d9e73e948be3b23623a329c11c363eef3f81503153da2ac408ff9d766319e3696bc4796a8"' :
                                        'id="xs-injectables-links-module-AppModule-e0ef0a931a8d1cebeb16b22bc266a8e08f372502acc4d83961774d9d9e73e948be3b23623a329c11c363eef3f81503153da2ac408ff9d766319e3696bc4796a8"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-eb16f4cb51f65d7dc7b3302b067b2974cec1f0770a1f38eda92f032388afa39ad46ab6a460887f35876af02479ca46f7ca8a618e5a70fc0b5c4a5045ea7f62bd"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-eb16f4cb51f65d7dc7b3302b067b2974cec1f0770a1f38eda92f032388afa39ad46ab6a460887f35876af02479ca46f7ca8a618e5a70fc0b5c4a5045ea7f62bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-eb16f4cb51f65d7dc7b3302b067b2974cec1f0770a1f38eda92f032388afa39ad46ab6a460887f35876af02479ca46f7ca8a618e5a70fc0b5c4a5045ea7f62bd"' :
                                            'id="xs-controllers-links-module-AuthModule-eb16f4cb51f65d7dc7b3302b067b2974cec1f0770a1f38eda92f032388afa39ad46ab6a460887f35876af02479ca46f7ca8a618e5a70fc0b5c4a5045ea7f62bd"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-eb16f4cb51f65d7dc7b3302b067b2974cec1f0770a1f38eda92f032388afa39ad46ab6a460887f35876af02479ca46f7ca8a618e5a70fc0b5c4a5045ea7f62bd"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-eb16f4cb51f65d7dc7b3302b067b2974cec1f0770a1f38eda92f032388afa39ad46ab6a460887f35876af02479ca46f7ca8a618e5a70fc0b5c4a5045ea7f62bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-eb16f4cb51f65d7dc7b3302b067b2974cec1f0770a1f38eda92f032388afa39ad46ab6a460887f35876af02479ca46f7ca8a618e5a70fc0b5c4a5045ea7f62bd"' :
                                        'id="xs-injectables-links-module-AuthModule-eb16f4cb51f65d7dc7b3302b067b2974cec1f0770a1f38eda92f032388afa39ad46ab6a460887f35876af02479ca46f7ca8a618e5a70fc0b5c4a5045ea7f62bd"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' :
                                        'id="xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TasksModule-c571375926a42ac3b548eb3a07aec48de6d3a69df57ab250a8efd62da0765d7e52a1110d32468990868a64dc59d35a0a8aac839b2b6731e49f7d89d34b32af1e"' : 'data-bs-target="#xs-controllers-links-module-TasksModule-c571375926a42ac3b548eb3a07aec48de6d3a69df57ab250a8efd62da0765d7e52a1110d32468990868a64dc59d35a0a8aac839b2b6731e49f7d89d34b32af1e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TasksModule-c571375926a42ac3b548eb3a07aec48de6d3a69df57ab250a8efd62da0765d7e52a1110d32468990868a64dc59d35a0a8aac839b2b6731e49f7d89d34b32af1e"' :
                                            'id="xs-controllers-links-module-TasksModule-c571375926a42ac3b548eb3a07aec48de6d3a69df57ab250a8efd62da0765d7e52a1110d32468990868a64dc59d35a0a8aac839b2b6731e49f7d89d34b32af1e"' }>
                                            <li class="link">
                                                <a href="controllers/TasksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TasksModule-c571375926a42ac3b548eb3a07aec48de6d3a69df57ab250a8efd62da0765d7e52a1110d32468990868a64dc59d35a0a8aac839b2b6731e49f7d89d34b32af1e"' : 'data-bs-target="#xs-injectables-links-module-TasksModule-c571375926a42ac3b548eb3a07aec48de6d3a69df57ab250a8efd62da0765d7e52a1110d32468990868a64dc59d35a0a8aac839b2b6731e49f7d89d34b32af1e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-c571375926a42ac3b548eb3a07aec48de6d3a69df57ab250a8efd62da0765d7e52a1110d32468990868a64dc59d35a0a8aac839b2b6731e49f7d89d34b32af1e"' :
                                        'id="xs-injectables-links-module-TasksModule-c571375926a42ac3b548eb3a07aec48de6d3a69df57ab250a8efd62da0765d7e52a1110d32468990868a64dc59d35a0a8aac839b2b6731e49f7d89d34b32af1e"' }>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTaskDto.html" data-type="entity-link" >CreateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link" >UpdateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskDto.html" data-type="entity-link" >UpdateTaskDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});