import type {
	IAnimeFavoriteState,
	IAnimeSectionState,
	IDataMainSlider,
	IDataTabs,
	ISearchState,
} from "./interfaces";
import type {
	TCategoryAnime,
	TSeasonYearAnime,
	TStatusAnime,
	TTypeAnime,
} from "./types";

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
	"2019",
	"2018",
	"2017",
	"2016",
	"2015",
	"2014",
	"2013",
	"2012",
	"2011",
	"2010",
	"2009",
	"2008",
	"2007",
	"2006",
	"2005",
	"2004",
	"2003",
	"2002",
	"2001",
	"2000",
	"1999",
	"1998",
	"1997",
	"1996",
	"1995",
	"1994",
	"1993",
	"1992",
	"1991",
	"1990",
	"1989",
	"1988",
	"1987",
	"1986",
	"1985",
	"1984",
	"1983",
	"1982",
	"1981",
	"1980",
	"1979",
	"1978",
	"1977",
	"1976",
	"1975",
	"1974",
	"1973",
	"1972",
	"1971",
	"1970",
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

export const initialFavoriteState: IAnimeFavoriteState = {
	data: [],
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

export const dataModalFilter = [
	{ id: 1, title: "Tipos", data: dataTypesAnime },
	{ id: 2, title: "Categorias", data: dataCategoriesAnime },
	{ id: 3, title: "Años de temporadas", data: dataSeasonYearAnime },
	{ id: 4, title: "Estados", data: dataStatusAnime },
];
