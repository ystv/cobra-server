import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  helloThere: Scalars['String'];
  streamKeys?: Maybe<Array<Maybe<StreamKey>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addStreamKey?: Maybe<StreamKey>;
  addGenPwdStreamKey?: Maybe<StreamKey>;
  editStreamKey?: Maybe<StreamKey>;
  genTempStreamKey?: Maybe<StreamKey>;
  deleteStreamKey?: Maybe<Scalars['Boolean']>;
};


export type MutationAddStreamKeyArgs = {
  streamKey: Scalars['String'];
  pwd?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};


export type MutationAddGenPwdStreamKeyArgs = {
  streamKey: Scalars['String'];
  alias?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};


export type MutationEditStreamKeyArgs = {
  streamKey: Scalars['String'];
  pwd?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};


export type MutationGenTempStreamKeyArgs = {
  alias?: Maybe<Scalars['String']>;
  start: Scalars['String'];
  end: Scalars['String'];
};


export type MutationDeleteStreamKeyArgs = {
  streamKey: Scalars['String'];
};

export type StreamKey = {
  __typename?: 'StreamKey';
  streamKey: Scalars['String'];
  pwd?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  StreamKey: ResolverTypeWrapper<StreamKey>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  StreamKey: StreamKey;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  helloThere?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streamKeys?: Resolver<Maybe<Array<Maybe<ResolversTypes['StreamKey']>>>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addStreamKey?: Resolver<Maybe<ResolversTypes['StreamKey']>, ParentType, ContextType, RequireFields<MutationAddStreamKeyArgs, 'streamKey'>>;
  addGenPwdStreamKey?: Resolver<Maybe<ResolversTypes['StreamKey']>, ParentType, ContextType, RequireFields<MutationAddGenPwdStreamKeyArgs, 'streamKey'>>;
  editStreamKey?: Resolver<Maybe<ResolversTypes['StreamKey']>, ParentType, ContextType, RequireFields<MutationEditStreamKeyArgs, 'streamKey'>>;
  genTempStreamKey?: Resolver<Maybe<ResolversTypes['StreamKey']>, ParentType, ContextType, RequireFields<MutationGenTempStreamKeyArgs, 'start' | 'end'>>;
  deleteStreamKey?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteStreamKeyArgs, 'streamKey'>>;
};

export type StreamKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamKey'] = ResolversParentTypes['StreamKey']> = {
  streamKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pwd?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  StreamKey?: StreamKeyResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
