import { Ct as take, Lt as catchError, Q as materialize, Qn as Subject, St as ignoreElements, Xt as filter, mn as mergeMap, nt as groupBy, rr as Observable, tn as merge, ut as exhaustMap, vn as map, vt as dematerialize } from "./esm5-ChK3bs0s.js";
import { Fn as Injectable, Hi as setClassMetadata, Ol as ɵɵinject, Pn as Inject, Qn as Optional, Tl as ɵɵdefineInjector, _c as ErrorHandler, al as inject, dl as makeEnvironmentProviders, hl as provideEnvironmentInitializer, qn as NgModule, to as ɵɵdefineNgModule, wc as InjectionToken, wl as ɵɵdefineInjectable } from "./core-D6zx-NCn.js";
import { D as createAction, h as ScannedActionsSubject, i as FEATURE_STATE_PROVIDER, u as ROOT_STORE_PROVIDER, v as Store, x as StoreRootModule, y as StoreFeatureModule } from "./ngrx-store-D0LriATs.js";
//#region node_modules/@ngrx/effects/fesm2022/ngrx-effects.mjs
var DEFAULT_EFFECT_CONFIG = {
	dispatch: true,
	functional: false,
	useEffectsErrorHandler: true
};
var CREATE_EFFECT_METADATA_KEY = "__@ngrx/effects_create__";
/**
* @description
*
* Creates an effect from a source and an `EffectConfig`.
*
* @param source A function which returns an observable or observable factory.
* @param config A `EffectConfig` to configure the effect. By default,
* `dispatch` is true, `functional` is false, and `useEffectsErrorHandler` is
* true.
* @returns If `EffectConfig`#`functional` is true, returns the source function.
* Else, returns the source function result. When `EffectConfig`#`dispatch` is
* true, the source function result needs to be `Observable<Action>`.
*
* @usageNotes
*
* ### Class Effects
*
* ```ts
* @Injectable()
* export class FeatureEffects {
*   // mapping to a different action
*   readonly effect1$ = createEffect(
*     () => this.actions$.pipe(
*       ofType(FeatureActions.actionOne),
*       map(() => FeatureActions.actionTwo())
*     )
*   );
*
*   // non-dispatching effect
*   readonly effect2$ = createEffect(
*     () => this.actions$.pipe(
*       ofType(FeatureActions.actionTwo),
*       tap(() => console.log('Action Two Dispatched'))
*     ),
*     { dispatch: false } // FeatureActions.actionTwo is not dispatched
*   );
*
*   constructor(private readonly actions$: Actions) {}
* }
* ```
*
* ### Functional Effects
*
* ```ts
* // mapping to a different action
* export const loadUsers = createEffect(
*   (actions$ = inject(Actions), usersService = inject(UsersService)) => {
*     return actions$.pipe(
*       ofType(UsersPageActions.opened),
*       exhaustMap(() => {
*         return usersService.getAll().pipe(
*           map((users) => UsersApiActions.usersLoadedSuccess({ users })),
*           catchError((error) =>
*             of(UsersApiActions.usersLoadedFailure({ error }))
*           )
*         );
*       })
*     );
*   },
*   { functional: true }
* );
*
* // non-dispatching functional effect
* export const logDispatchedActions = createEffect(
*   () => inject(Actions).pipe(tap(console.log)),
*   { functional: true, dispatch: false }
* );
* ```
*/
function createEffect(source, config = {}) {
	const effect = config.functional ? source : source();
	const value = {
		...DEFAULT_EFFECT_CONFIG,
		...config
	};
	Object.defineProperty(effect, CREATE_EFFECT_METADATA_KEY, { value });
	return effect;
}
function getCreateEffectMetadata(instance) {
	return Object.getOwnPropertyNames(instance).filter((propertyName) => {
		if (instance[propertyName] && instance[propertyName].hasOwnProperty(CREATE_EFFECT_METADATA_KEY)) return instance[propertyName][CREATE_EFFECT_METADATA_KEY].hasOwnProperty("dispatch");
		return false;
	}).map((propertyName) => {
		return {
			propertyName,
			...instance[propertyName][CREATE_EFFECT_METADATA_KEY]
		};
	});
}
function getEffectsMetadata(instance) {
	return getSourceMetadata(instance).reduce((acc, { propertyName, dispatch, useEffectsErrorHandler }) => {
		acc[propertyName] = {
			dispatch,
			useEffectsErrorHandler
		};
		return acc;
	}, {});
}
function getSourceMetadata(instance) {
	return getCreateEffectMetadata(instance);
}
function getSourceForInstance(instance) {
	return Object.getPrototypeOf(instance);
}
function isClassInstance(obj) {
	return !!obj.constructor && obj.constructor.name !== "Object" && obj.constructor.name !== "Function";
}
function isClass(classOrRecord) {
	return typeof classOrRecord === "function";
}
function getClasses(classesAndRecords) {
	return classesAndRecords.filter(isClass);
}
function isToken(tokenOrRecord) {
	return tokenOrRecord instanceof InjectionToken || isClass(tokenOrRecord);
}
function mergeEffects(sourceInstance, globalErrorHandler, effectsErrorHandler) {
	const source = getSourceForInstance(sourceInstance);
	const sourceName = !!source && source.constructor.name !== "Object" ? source.constructor.name : null;
	return merge(...getSourceMetadata(sourceInstance).map(({ propertyName, dispatch, useEffectsErrorHandler }) => {
		const observable$ = typeof sourceInstance[propertyName] === "function" ? sourceInstance[propertyName]() : sourceInstance[propertyName];
		const effectAction$ = useEffectsErrorHandler ? effectsErrorHandler(observable$, globalErrorHandler) : observable$;
		if (dispatch === false) return effectAction$.pipe(ignoreElements());
		return effectAction$.pipe(materialize()).pipe(map((notification) => ({
			effect: sourceInstance[propertyName],
			notification,
			propertyName,
			sourceName,
			sourceInstance
		})));
	}));
}
var MAX_NUMBER_OF_RETRY_ATTEMPTS = 10;
function defaultEffectsErrorHandler(observable$, errorHandler, retryAttemptLeft = MAX_NUMBER_OF_RETRY_ATTEMPTS) {
	return observable$.pipe(catchError((error) => {
		if (errorHandler) errorHandler.handleError(error);
		if (retryAttemptLeft <= 1) return observable$;
		return defaultEffectsErrorHandler(observable$, errorHandler, retryAttemptLeft - 1);
	}));
}
var Actions = class Actions extends Observable {
	constructor(source) {
		super();
		if (source) this.source = source;
	}
	lift(operator) {
		const observable = new Actions();
		observable.source = this;
		observable.operator = operator;
		return observable;
	}
	/** @nocollapse */
	static {
		this.ɵfac = function Actions_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || Actions)(ɵɵinject(ScannedActionsSubject));
		};
	}
	/** @nocollapse */
	static {
		this.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
			token: Actions,
			factory: Actions.ɵfac,
			providedIn: "root"
		});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Actions, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [{
		type: Observable,
		decorators: [{
			type: Inject,
			args: [ScannedActionsSubject]
		}]
	}], null);
})();
/**
* `ofType` filters an Observable of `Actions` into an Observable of the actions
* whose type strings are passed to it.
*
* For example, if `actions` has type `Actions<AdditionAction|SubstractionAction>`, and
* the type of the `Addition` action is `add`, then
* `actions.pipe(ofType('add'))` returns an `Observable<AdditionAction>`.
*
* Properly typing this function is hard and requires some advanced TS tricks
* below.
*
* Type narrowing automatically works, as long as your `actions` object
* starts with a `Actions<SomeUnionOfActions>` instead of generic `Actions`.
*
* For backwards compatibility, when one passes a single type argument
* `ofType<T>('something')` the result is an `Observable<T>`. Note, that `T`
* completely overrides any possible inference from 'something'.
*
* Unfortunately, for unknown 'actions: Actions' these types will produce
* 'Observable<never>'. In such cases one has to manually set the generic type
* like `actions.ofType<AdditionAction>('add')`.
*
* @usageNotes
*
* Filter the Actions stream on the "customers page loaded" action
*
* ```ts
* import { ofType } from '@ngrx/effects';
* import * fromCustomers from '../customers';
*
* this.actions$.pipe(
*  ofType(fromCustomers.pageLoaded)
* )
* ```
*/
function ofType(...allowedTypes) {
	return filter((action) => allowedTypes.some((typeOrActionCreator) => {
		if (typeof typeOrActionCreator === "string") return typeOrActionCreator === action.type;
		return typeOrActionCreator.type === action.type;
	}));
}
var _ROOT_EFFECTS_GUARD = new InjectionToken("@ngrx/effects Internal Root Guard");
var USER_PROVIDED_EFFECTS = new InjectionToken("@ngrx/effects User Provided Effects");
var _ROOT_EFFECTS = new InjectionToken("@ngrx/effects Internal Root Effects");
var _ROOT_EFFECTS_INSTANCES = new InjectionToken("@ngrx/effects Internal Root Effects Instances");
var _FEATURE_EFFECTS = new InjectionToken("@ngrx/effects Internal Feature Effects");
var _FEATURE_EFFECTS_INSTANCE_GROUPS = new InjectionToken("@ngrx/effects Internal Feature Effects Instance Groups");
var EFFECTS_ERROR_HANDLER = new InjectionToken("@ngrx/effects Effects Error Handler", {
	providedIn: "root",
	factory: () => defaultEffectsErrorHandler
});
var ROOT_EFFECTS_INIT = "@ngrx/effects/init";
var rootEffectsInit = createAction(ROOT_EFFECTS_INIT);
function reportInvalidActions(output, reporter) {
	if (output.notification.kind === "N") {
		const action = output.notification.value;
		if (!isAction(action)) reporter.handleError(/* @__PURE__ */ new Error(`Effect ${getEffectName(output)} dispatched an invalid action: ${stringify(action)}`));
	}
}
function isAction(action) {
	return typeof action !== "function" && action && action.type && typeof action.type === "string";
}
function getEffectName({ propertyName, sourceInstance, sourceName }) {
	const isMethod = typeof sourceInstance[propertyName] === "function";
	return !!sourceName ? `"${sourceName}.${String(propertyName)}${isMethod ? "()" : ""}"` : `"${String(propertyName)}()"`;
}
function stringify(action) {
	try {
		return JSON.stringify(action);
	} catch {
		return action;
	}
}
var onIdentifyEffectsKey = "ngrxOnIdentifyEffects";
function isOnIdentifyEffects(instance) {
	return isFunction(instance, onIdentifyEffectsKey);
}
var onRunEffectsKey = "ngrxOnRunEffects";
function isOnRunEffects(instance) {
	return isFunction(instance, onRunEffectsKey);
}
var onInitEffects = "ngrxOnInitEffects";
function isOnInitEffects(instance) {
	return isFunction(instance, onInitEffects);
}
function isFunction(instance, functionName) {
	return instance && functionName in instance && typeof instance[functionName] === "function";
}
var EffectSources = class EffectSources extends Subject {
	constructor(errorHandler, effectsErrorHandler) {
		super();
		this.errorHandler = errorHandler;
		this.effectsErrorHandler = effectsErrorHandler;
	}
	addEffects(effectSourceInstance) {
		this.next(effectSourceInstance);
	}
	/**
	* @internal
	*/
	toActions() {
		return this.pipe(groupBy((effectsInstance) => isClassInstance(effectsInstance) ? getSourceForInstance(effectsInstance) : effectsInstance), mergeMap((source$) => {
			return source$.pipe(groupBy(effectsInstance));
		}), mergeMap((source$) => {
			return merge(source$.pipe(exhaustMap((sourceInstance) => {
				return resolveEffectSource(this.errorHandler, this.effectsErrorHandler)(sourceInstance);
			}), map((output) => {
				reportInvalidActions(output, this.errorHandler);
				return output.notification;
			}), filter((notification) => notification.kind === "N" && notification.value != null), dematerialize()), source$.pipe(take(1), filter(isOnInitEffects), map((instance) => instance.ngrxOnInitEffects())));
		}));
	}
	/** @nocollapse */
	static {
		this.ɵfac = function EffectSources_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || EffectSources)(ɵɵinject(ErrorHandler), ɵɵinject(EFFECTS_ERROR_HANDLER));
		};
	}
	/** @nocollapse */
	static {
		this.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
			token: EffectSources,
			factory: EffectSources.ɵfac,
			providedIn: "root"
		});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectSources, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [{ type: ErrorHandler }, {
		type: void 0,
		decorators: [{
			type: Inject,
			args: [EFFECTS_ERROR_HANDLER]
		}]
	}], null);
})();
function effectsInstance(sourceInstance) {
	if (isOnIdentifyEffects(sourceInstance)) return sourceInstance.ngrxOnIdentifyEffects();
	return "";
}
function resolveEffectSource(errorHandler, effectsErrorHandler) {
	return (sourceInstance) => {
		const mergedEffects$ = mergeEffects(sourceInstance, errorHandler, effectsErrorHandler);
		if (isOnRunEffects(sourceInstance)) return sourceInstance.ngrxOnRunEffects(mergedEffects$);
		return mergedEffects$;
	};
}
var EffectsRunner = class EffectsRunner {
	get isStarted() {
		return !!this.effectsSubscription;
	}
	constructor(effectSources, store) {
		this.effectSources = effectSources;
		this.store = store;
		this.effectsSubscription = null;
	}
	start() {
		if (!this.effectsSubscription) this.effectsSubscription = this.effectSources.toActions().subscribe(this.store);
	}
	ngOnDestroy() {
		if (this.effectsSubscription) {
			this.effectsSubscription.unsubscribe();
			this.effectsSubscription = null;
		}
	}
	/** @nocollapse */
	static {
		this.ɵfac = function EffectsRunner_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || EffectsRunner)(ɵɵinject(EffectSources), ɵɵinject(Store));
		};
	}
	/** @nocollapse */
	static {
		this.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
			token: EffectsRunner,
			factory: EffectsRunner.ɵfac,
			providedIn: "root"
		});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectsRunner, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [{ type: EffectSources }, { type: Store }], null);
})();
var EffectsRootModule = class EffectsRootModule {
	constructor(sources, runner, store, rootEffectsInstances, storeRootModule, storeFeatureModule, guard) {
		this.sources = sources;
		runner.start();
		for (const effectsInstance of rootEffectsInstances) sources.addEffects(effectsInstance);
		store.dispatch({ type: ROOT_EFFECTS_INIT });
	}
	addEffects(effectsInstance) {
		this.sources.addEffects(effectsInstance);
	}
	/** @nocollapse */
	static {
		this.ɵfac = function EffectsRootModule_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || EffectsRootModule)(ɵɵinject(EffectSources), ɵɵinject(EffectsRunner), ɵɵinject(Store), ɵɵinject(_ROOT_EFFECTS_INSTANCES), ɵɵinject(StoreRootModule, 8), ɵɵinject(StoreFeatureModule, 8), ɵɵinject(_ROOT_EFFECTS_GUARD, 8));
		};
	}
	/** @nocollapse */
	static {
		this.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: EffectsRootModule });
	}
	/** @nocollapse */
	static {
		this.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectsRootModule, [{
		type: NgModule,
		args: [{}]
	}], () => [
		{ type: EffectSources },
		{ type: EffectsRunner },
		{ type: Store },
		{
			type: void 0,
			decorators: [{
				type: Inject,
				args: [_ROOT_EFFECTS_INSTANCES]
			}]
		},
		{
			type: StoreRootModule,
			decorators: [{ type: Optional }]
		},
		{
			type: StoreFeatureModule,
			decorators: [{ type: Optional }]
		},
		{
			type: void 0,
			decorators: [{ type: Optional }, {
				type: Inject,
				args: [_ROOT_EFFECTS_GUARD]
			}]
		}
	], null);
})();
var EffectsFeatureModule = class EffectsFeatureModule {
	constructor(effectsRootModule, effectsInstanceGroups, storeRootModule, storeFeatureModule) {
		const effectsInstances = effectsInstanceGroups.flat();
		for (const effectsInstance of effectsInstances) effectsRootModule.addEffects(effectsInstance);
	}
	/** @nocollapse */
	static {
		this.ɵfac = function EffectsFeatureModule_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || EffectsFeatureModule)(ɵɵinject(EffectsRootModule), ɵɵinject(_FEATURE_EFFECTS_INSTANCE_GROUPS), ɵɵinject(StoreRootModule, 8), ɵɵinject(StoreFeatureModule, 8));
		};
	}
	/** @nocollapse */
	static {
		this.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: EffectsFeatureModule });
	}
	/** @nocollapse */
	static {
		this.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectsFeatureModule, [{
		type: NgModule,
		args: [{}]
	}], () => [
		{ type: EffectsRootModule },
		{
			type: void 0,
			decorators: [{
				type: Inject,
				args: [_FEATURE_EFFECTS_INSTANCE_GROUPS]
			}]
		},
		{
			type: StoreRootModule,
			decorators: [{ type: Optional }]
		},
		{
			type: StoreFeatureModule,
			decorators: [{ type: Optional }]
		}
	], null);
})();
var EffectsModule = class EffectsModule {
	static forFeature(...featureEffects) {
		const effects = featureEffects.flat();
		return {
			ngModule: EffectsFeatureModule,
			providers: [
				getClasses(effects),
				{
					provide: _FEATURE_EFFECTS,
					multi: true,
					useValue: effects
				},
				{
					provide: USER_PROVIDED_EFFECTS,
					multi: true,
					useValue: []
				},
				{
					provide: _FEATURE_EFFECTS_INSTANCE_GROUPS,
					multi: true,
					useFactory: createEffectsInstances,
					deps: [_FEATURE_EFFECTS, USER_PROVIDED_EFFECTS]
				}
			]
		};
	}
	static forRoot(...rootEffects) {
		const effects = rootEffects.flat();
		return {
			ngModule: EffectsRootModule,
			providers: [
				getClasses(effects),
				{
					provide: _ROOT_EFFECTS,
					useValue: [effects]
				},
				{
					provide: _ROOT_EFFECTS_GUARD,
					useFactory: _provideForRootGuard
				},
				{
					provide: USER_PROVIDED_EFFECTS,
					multi: true,
					useValue: []
				},
				{
					provide: _ROOT_EFFECTS_INSTANCES,
					useFactory: createEffectsInstances,
					deps: [_ROOT_EFFECTS, USER_PROVIDED_EFFECTS]
				}
			]
		};
	}
	/** @nocollapse */
	static {
		this.ɵfac = function EffectsModule_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || EffectsModule)();
		};
	}
	/** @nocollapse */
	static {
		this.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: EffectsModule });
	}
	/** @nocollapse */
	static {
		this.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectsModule, [{
		type: NgModule,
		args: [{}]
	}], null, null);
})();
function createEffectsInstances(effectsGroups, userProvidedEffectsGroups) {
	const effects = [];
	for (const effectsGroup of effectsGroups) effects.push(...effectsGroup);
	for (const userProvidedEffectsGroup of userProvidedEffectsGroups) effects.push(...userProvidedEffectsGroup);
	return effects.map((effectsTokenOrRecord) => isToken(effectsTokenOrRecord) ? inject(effectsTokenOrRecord) : effectsTokenOrRecord);
}
function _provideForRootGuard() {
	const runner = inject(EffectsRunner, {
		optional: true,
		skipSelf: true
	});
	const rootEffects = inject(_ROOT_EFFECTS, { self: true });
	if (!(rootEffects.length === 1 && rootEffects[0].length === 0) && runner) throw new TypeError(`EffectsModule.forRoot() called twice. Feature modules should use EffectsModule.forFeature() instead.`);
	return "guarded";
}
/**
* @usageNotes
*
* ### Providing effects at the root level
*
* ```ts
* bootstrapApplication(AppComponent, {
*   providers: [provideEffects(RouterEffects)],
* });
* ```
*
* ### Providing effects at the feature level
*
* ```ts
* const booksRoutes: Route[] = [
*   {
*     path: '',
*     providers: [provideEffects(BooksApiEffects)],
*     children: [
*       { path: '', component: BookListComponent },
*       { path: ':id', component: BookDetailsComponent },
*     ],
*   },
* ];
* ```
*/
function provideEffects(...effects) {
	const effectsClassesAndRecords = effects.flat();
	return makeEnvironmentProviders([getClasses(effectsClassesAndRecords), provideEnvironmentInitializer(() => {
		inject(ROOT_STORE_PROVIDER);
		inject(FEATURE_STATE_PROVIDER, { optional: true });
		const effectsRunner = inject(EffectsRunner);
		const effectSources = inject(EffectSources);
		const shouldInitEffects = !effectsRunner.isStarted;
		if (shouldInitEffects) effectsRunner.start();
		for (const effectsClassOrRecord of effectsClassesAndRecords) {
			const effectsInstance = isClass(effectsClassOrRecord) ? inject(effectsClassOrRecord) : effectsClassOrRecord;
			effectSources.addEffects(effectsInstance);
		}
		if (shouldInitEffects) inject(Store).dispatch(rootEffectsInit());
	})]);
}
//#endregion
export { Actions, EFFECTS_ERROR_HANDLER, EffectSources, EffectsFeatureModule, EffectsModule, EffectsRootModule, EffectsRunner, ROOT_EFFECTS_INIT, USER_PROVIDED_EFFECTS, createEffect, defaultEffectsErrorHandler, getEffectsMetadata, mergeEffects, ofType, provideEffects, rootEffectsInit };
