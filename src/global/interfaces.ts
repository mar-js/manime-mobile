import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps, ComponentType, JSX } from "react";
import type { ImageSourcePropType } from "react-native";

export type TIoniconsName = ComponentProps<typeof Ionicons>["name"];

export type TTypeAnime =
	| "All"
	| "ONA"
	| "OVA"
	| "TV"
	| "movie"
	| "music"
	| "special";

export type TStatusAnime = "All" | "current" | "finished" | "upcoming";

export type TSeasonYearAnime =
	| "All"
	| "2026"
	| "2025"
	| "2024"
	| "2023"
	| "2022"
	| "2021"
	| "2020"
	| "2019"
	| "2018"
	| "2017"
	| "2016"
	| "2015"
	| "2014"
	| "2013"
	| "2012"
	| "2011"
	| "2010"
	| "2009"
	| "2008"
	| "2007"
	| "2006"
	| "2005"
	| "2004"
	| "2003"
	| "2002"
	| "2001"
	| "2000"
	| "1999"
	| "1998"
	| "1997"
	| "1996"
	| "1995"
	| "1994"
	| "1993"
	| "1992"
	| "1991"
	| "1990"
	| "1989"
	| "1988"
	| "1987"
	| "1986"
	| "1985"
	| "1984"
	| "1983"
	| "1982"
	| "1981"
	| "1980"
	| "1979"
	| "1978"
	| "1977"
	| "1976"
	| "1975"
	| "1974"
	| "1973"
	| "1972"
	| "1971"
	| "1970";

export type TCategoryAnime =
	| "All"
	| "action"
	| "adventure"
	| "comedy"
	| "drama"
	| "fantasy"
	| "romance"
	| "sci-fi"
	| "slice-of-life";

export type TSelectType =
	| TTypeAnime
	| TStatusAnime
	| TSeasonYearAnime
	| TCategoryAnime;

export interface IAnimeFavoriteState {
	data: AnimeItem[];
	error: string | null;
}

export interface IAnimeCatalogStoreExtended
	extends Omit<IAnimeCatalogStore, "fetchAnimes"> {
	fetchAnimes: (
		query?: string,
		filters?: ISearchState["filters"],
	) => Promise<void>;
}

export interface IModalFilters {
	showModal: boolean;
	handlePressShowModal: () => void;
	handlePressResetFilters: () => void;
	handlePressSelectType: (
		idFilter: number,
		selectTypeValue: TSelectType,
	) => void;
	selectTypeValue: {
		type: TTypeAnime;
		category: TCategoryAnime;
		SeasonYear: TSeasonYearAnime;
		status: TStatusAnime;
	};
}

export interface ISearchState {
	query: string;
	showModal: boolean;
	filters: {
		type: TTypeAnime;
		category: TCategoryAnime;
		SeasonYear: TSeasonYearAnime;
		status: TStatusAnime;
	};
}

export interface ITitle {
	isVisibleBackBtn?: boolean;
}

export interface ITopSlider {
	data: IDataMainSlider[];
}

export interface IDataMainSlider {
	id: string;
	title: string;
	url: ImageSourcePropType;
}

export interface IHeadListAnime {
	title: string;
}

export interface IListAnime {
	title?: string;
	horizontal: boolean;
	animes: AnimeItem[];
	isLoading: boolean;
	isLoadingMore: boolean;
	handlerScrollInfinite: () => void;
	RenderComponent: ComponentType<
		{ anime: AnimeItem } & JSX.IntrinsicAttributes
	>;
}

export interface IAnimeCatalogStore {
	animes: IAnimeSectionState;
	trending: IAnimeSectionState;
	fetchAnimes: () => Promise<void>;
	fetchAnimesNextPage: () => Promise<void>;
	fetchTrending: () => Promise<void>;
	fetchTrendingNextPage: () => Promise<void>;
}

export interface IAnimeSectionState {
	data: AnimeItem[];
	isLoading: boolean;
	isLoadingMore: boolean;
	nextPageUrl: string | null;
	error: string | null;
}

export interface IServiceAnimesResponse {
	data: AnimeItem[];
	meta: Meta3;
	links: Links14;
}

export interface AnimeItem {
	id: string;
	type: string;
	links: Links;
	attributes: Attributes;
	relationships: Relationships;
}

export interface Links {
	self: string;
}

export interface Attributes {
	createdAt: string;
	updatedAt: string;
	slug: string;
	synopsis: string;
	coverImageTopOffset: number;
	titles: Titles;
	canonicalTitle: string;
	abbreviatedTitles: string[];
	averageRating: string;
	ratingFrequencies: RatingFrequencies;
	userCount: number;
	favoritesCount: number;
	startDate: string;
	endDate: string;
	popularityRank: number;
	ratingRank: number;
	ageRating: string;
	ageRatingGuide: string;
	subtype: TTypeAnime;
	status: string;
	tba: string;
	posterImage: PosterImage | null;
	coverImage: CoverImage | null;
	episodeCount: number;
	episodeLength: number;
	youtubeVideoId: string;
	showType: TTypeAnime;
	nsfw: boolean;
}

export interface Titles {
	en: string;
	en_jp: string;
	ja_jp: string;
}

export interface RatingFrequencies {
	"2": string;
	"3": string;
	"4": string;
	"5": string;
	"6": string;
	"7": string;
	"8": string;
	"9": string;
	"10": string;
	"11": string;
	"12": string;
	"13": string;
	"14": string;
	"15": string;
	"16": string;
	"17": string;
	"18": string;
	"19": string;
	"20": string;
}

export interface PosterImage {
	tiny: string;
	small: string;
	medium: string;
	large: string;
	original: string;
	meta: Meta;
}

export interface Meta {
	dimensions: Dimensions;
}

export interface Dimensions {
	tiny: Tiny;
	small: Small;
	medium: Medium;
	large: Large;
}

export interface Tiny {
	width: string | number;
	height: string | number;
}

export interface Small {
	width: string | number;
	height: string | number;
}

export interface Medium {
	width: string | number;
	height: string | number;
}

export interface Large {
	width: string | number;
	height: string | number;
}

export interface CoverImage {
	tiny: string;
	small: string;
	large: string;
	original: string;
	meta: Meta2;
}

export interface Meta2 {
	dimensions: Dimensions2;
}

export interface Dimensions2 {
	tiny: Tiny2;
	small: Small2;
	large: Large2;
}

export interface Tiny2 {
	width: string | number;
	height: string | number;
}

export interface Small2 {
	width: string | number;
	height: string | number;
}

export interface Large2 {
	width: string | number;
	height: string | number;
}

export interface Relationships {
	genres: Genres;
	categories: Categories;
	castings: Castings;
	installments: Installments;
	mappings: Mappings;
	reviews: Reviews;
	mediaRelationships: MediaRelationships;
	episodes: Episodes;
	streamingLinks: StreamingLinks;
	animeProductions: AnimeProductions;
	animeCharacters: AnimeCharacters;
	animeStaff: AnimeStaff;
}

export interface Genres {
	links: Links2;
}

export interface Links2 {
	self: string;
	related: string;
}

export interface Categories {
	links: Links3;
}

export interface Links3 {
	self: string;
	related: string;
}

export interface Castings {
	links: Links4;
}

export interface Links4 {
	self: string;
	related: string;
}

export interface Installments {
	links: Links5;
}

export interface Links5 {
	self: string;
	related: string;
}

export interface Mappings {
	links: Links6;
}

export interface Links6 {
	self: string;
	related: string;
}

export interface Reviews {
	links: Links7;
}

export interface Links7 {
	self: string;
	related: string;
}

export interface MediaRelationships {
	links: Links8;
}

export interface Links8 {
	self: string;
	related: string;
}

export interface Episodes {
	links: Links9;
}

export interface Links9 {
	self: string;
	related: string;
}

export interface StreamingLinks {
	links: Links10;
}

export interface Links10 {
	self: string;
	related: string;
}

export interface AnimeProductions {
	links: Links11;
}

export interface Links11 {
	self: string;
	related: string;
}

export interface AnimeCharacters {
	links: Links12;
}

export interface Links12 {
	self: string;
	related: string;
}

export interface AnimeStaff {
	links: Links13;
}

export interface Links13 {
	self: string;
	related: string;
}

export interface Meta3 {
	count: number;
}

export interface Links14 {
	first: string;
	prev: string;
	next: string;
	last: string;
}

export interface IDataTabs {
	title: string;
	icon: TIoniconsName;
}

export interface ITabIcon {
	icon: TIoniconsName;
	focused: boolean;
}
