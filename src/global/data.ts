import type {
	IAnimeSectionState,
	IDataMainSlider,
	IDataTabs,
	ISearchState,
	TCategoryAnime,
	TSeasonYearAnime,
	TStatusAnime,
	TTypeAnime,
} from "./interfaces";

export const dataKitsuFilterMap: Record<keyof ISearchState["filters"], string> =
	{
		type: "subtype",
		category: "categories",
		SeasonYear: "seasonYear",
		status: "status",
	};

export const dataTypesAnime: TTypeAnime[] = [
	"All",
	"ONA",
	"OVA",
	"TV",
	"movie",
	"music",
	"special",
];

export const dataStatusAnime: TStatusAnime[] = [
	"All",
	"current",
	"finished",
	"upcoming",
];

export const dataSeasonYearAnime: TSeasonYearAnime[] = [
	"All",
	"2026",
	"2025",
	"2024",
	"2023",
	"2022",
	"2021",
	"2020",
];

export const dataCategoriesAnime: TCategoryAnime[] = [
	"All",
	"action",
	"adventure",
	"comedy",
	"drama",
	"fantasy",
	"romance",
	"sci-fi",
	"slice-of-life",
];

export const initialSectionState: IAnimeSectionState = {
	data: [],
	isLoading: false,
	isLoadingMore: false,
	nextPageUrl: null,
	error: null,
};

export const dataMainSlider: IDataMainSlider[] = [
	{
		id: "1",
		title: "Pura Adrenalina",
		url: require("../../assets/images/pure-adrenaline.png"),
	},
	{
		id: "2",
		title: "Rincón del Alma",
		url: require("../../assets/images/soul-corner.png"),
	},
	{
		id: "3",
		title: "Mundos de Sombra",
		url: require("../../assets/images/shadow-worlds.png"),
	},
];

export const dataTabs: IDataTabs[] = [
	{
		title: "Index",
		icon: "home",
	},
	{
		title: "Search",
		icon: "search",
	},
	{
		title: "Favorite",
		icon: "heart",
	},
	{
		title: "Profile",
		icon: "person",
	},
];
