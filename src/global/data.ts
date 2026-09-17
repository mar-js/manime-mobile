import type {
	IAnimeSectionState,
	IDataMainSlider,
	IDataTabs,
	TTypeAnime,
} from "./interfaces";

export const initialSectionState: IAnimeSectionState = {
	data: [],
	isLoading: false,
	isLoadingMore: false,
	nextPageUrl: null,
	error: null,
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
