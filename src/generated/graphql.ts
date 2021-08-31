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

export type Asp = {
  __typename?: 'ASP';
  hwID: Scalars['ID'];
  name: Scalars['String'];
  sourceURL?: Maybe<Scalars['String']>;
  enablePlayback: Scalars['Boolean'];
  currentState: AspState;
};

export enum AspState {
  Offline = 'OFFLINE',
  Playing = 'PLAYING',
  Error = 'ERROR',
  Ready = 'READY'
}

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

export type Query = {
  __typename?: 'Query';
  helloThere: Scalars['String'];
  streamKeys?: Maybe<Array<Maybe<StreamKey>>>;
  streamApps: StreamApplications;
};

export type RtmpApplications = {
  __typename?: 'RTMPApplications';
  name?: Maybe<Scalars['String']>;
  streams?: Maybe<Array<Maybe<RtmpStreams>>>;
};

export type RtmpAudio = {
  __typename?: 'RTMPAudio';
  codec?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  channels?: Maybe<Scalars['Int']>;
  sampleRate?: Maybe<Scalars['Float']>;
};

export type RtmpClients = {
  __typename?: 'RTMPClients';
  id?: Maybe<Scalars['Int']>;
  address?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Int']>;
  flashVersion?: Maybe<Scalars['String']>;
  dropped?: Maybe<Scalars['Int']>;
  avSync?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Int']>;
  publishing?: Maybe<Scalars['Boolean']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type RtmpMeta = {
  __typename?: 'RTMPMeta';
  video?: Maybe<RtmpVideo>;
  audio?: Maybe<RtmpAudio>;
};

export type RtmpStreams = {
  __typename?: 'RTMPStreams';
  name?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Int']>;
  bwIn?: Maybe<Scalars['Int']>;
  bytesIn?: Maybe<Scalars['Int']>;
  bwOut?: Maybe<Scalars['Int']>;
  bytesOut?: Maybe<Scalars['Int']>;
  bwAudio?: Maybe<Scalars['Int']>;
  bwVideo?: Maybe<Scalars['Int']>;
  clients?: Maybe<Array<Maybe<RtmpClients>>>;
  meta?: Maybe<RtmpMeta>;
};

export type RtmpVideo = {
  __typename?: 'RTMPVideo';
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  framerate?: Maybe<Scalars['Float']>;
  codec?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  compat?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Float']>;
};

export type SrtStream = {
  __typename?: 'SRTStream';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  clients?: Maybe<Scalars['Int']>;
  created?: Maybe<Scalars['String']>;
};

export type StreamApplications = {
  __typename?: 'StreamApplications';
  srt: Array<Maybe<SrtStream>>;
  rtmp: Array<Maybe<RtmpApplications>>;
};

export type StreamKey = {
  __typename?: 'StreamKey';
  streamKey: Scalars['String'];
  pwd?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  StreamAppsUpdate: StreamApplications;
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
  ASP: ResolverTypeWrapper<Asp>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ASPState: AspState;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RTMPApplications: ResolverTypeWrapper<RtmpApplications>;
  RTMPAudio: ResolverTypeWrapper<RtmpAudio>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  RTMPClients: ResolverTypeWrapper<RtmpClients>;
  RTMPMeta: ResolverTypeWrapper<RtmpMeta>;
  RTMPStreams: ResolverTypeWrapper<RtmpStreams>;
  RTMPVideo: ResolverTypeWrapper<RtmpVideo>;
  SRTStream: ResolverTypeWrapper<SrtStream>;
  StreamApplications: ResolverTypeWrapper<StreamApplications>;
  StreamKey: ResolverTypeWrapper<StreamKey>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ASP: Asp;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Mutation: {};
  Query: {};
  RTMPApplications: RtmpApplications;
  RTMPAudio: RtmpAudio;
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  RTMPClients: RtmpClients;
  RTMPMeta: RtmpMeta;
  RTMPStreams: RtmpStreams;
  RTMPVideo: RtmpVideo;
  SRTStream: SrtStream;
  StreamApplications: StreamApplications;
  StreamKey: StreamKey;
  Subscription: {};
};

export type AspResolvers<ContextType = any, ParentType extends ResolversParentTypes['ASP'] = ResolversParentTypes['ASP']> = {
  hwID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enablePlayback?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  currentState?: Resolver<ResolversTypes['ASPState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addStreamKey?: Resolver<Maybe<ResolversTypes['StreamKey']>, ParentType, ContextType, RequireFields<MutationAddStreamKeyArgs, 'streamKey'>>;
  addGenPwdStreamKey?: Resolver<Maybe<ResolversTypes['StreamKey']>, ParentType, ContextType, RequireFields<MutationAddGenPwdStreamKeyArgs, 'streamKey'>>;
  editStreamKey?: Resolver<Maybe<ResolversTypes['StreamKey']>, ParentType, ContextType, RequireFields<MutationEditStreamKeyArgs, 'streamKey'>>;
  genTempStreamKey?: Resolver<Maybe<ResolversTypes['StreamKey']>, ParentType, ContextType, RequireFields<MutationGenTempStreamKeyArgs, 'start' | 'end'>>;
  deleteStreamKey?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteStreamKeyArgs, 'streamKey'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  helloThere?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streamKeys?: Resolver<Maybe<Array<Maybe<ResolversTypes['StreamKey']>>>, ParentType, ContextType>;
  streamApps?: Resolver<ResolversTypes['StreamApplications'], ParentType, ContextType>;
};

export type RtmpApplicationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RTMPApplications'] = ResolversParentTypes['RTMPApplications']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  streams?: Resolver<Maybe<Array<Maybe<ResolversTypes['RTMPStreams']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RtmpAudioResolvers<ContextType = any, ParentType extends ResolversParentTypes['RTMPAudio'] = ResolversParentTypes['RTMPAudio']> = {
  codec?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  channels?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sampleRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RtmpClientsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RTMPClients'] = ResolversParentTypes['RTMPClients']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flashVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dropped?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  avSync?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  publishing?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RtmpMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['RTMPMeta'] = ResolversParentTypes['RTMPMeta']> = {
  video?: Resolver<Maybe<ResolversTypes['RTMPVideo']>, ParentType, ContextType>;
  audio?: Resolver<Maybe<ResolversTypes['RTMPAudio']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RtmpStreamsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RTMPStreams'] = ResolversParentTypes['RTMPStreams']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bwIn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bytesIn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bwOut?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bytesOut?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bwAudio?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  bwVideo?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  clients?: Resolver<Maybe<Array<Maybe<ResolversTypes['RTMPClients']>>>, ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['RTMPMeta']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RtmpVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['RTMPVideo'] = ResolversParentTypes['RTMPVideo']> = {
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  framerate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  codec?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  compat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SrtStreamResolvers<ContextType = any, ParentType extends ResolversParentTypes['SRTStream'] = ResolversParentTypes['SRTStream']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clients?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StreamApplicationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamApplications'] = ResolversParentTypes['StreamApplications']> = {
  srt?: Resolver<Array<Maybe<ResolversTypes['SRTStream']>>, ParentType, ContextType>;
  rtmp?: Resolver<Array<Maybe<ResolversTypes['RTMPApplications']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StreamKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamKey'] = ResolversParentTypes['StreamKey']> = {
  streamKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pwd?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  StreamAppsUpdate?: SubscriptionResolver<ResolversTypes['StreamApplications'], "StreamAppsUpdate", ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ASP?: AspResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RTMPApplications?: RtmpApplicationsResolvers<ContextType>;
  RTMPAudio?: RtmpAudioResolvers<ContextType>;
  RTMPClients?: RtmpClientsResolvers<ContextType>;
  RTMPMeta?: RtmpMetaResolvers<ContextType>;
  RTMPStreams?: RtmpStreamsResolvers<ContextType>;
  RTMPVideo?: RtmpVideoResolvers<ContextType>;
  SRTStream?: SrtStreamResolvers<ContextType>;
  StreamApplications?: StreamApplicationsResolvers<ContextType>;
  StreamKey?: StreamKeyResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
