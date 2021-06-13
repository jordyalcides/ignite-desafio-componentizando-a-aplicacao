import { ReactNode } from "react";

export interface MoviesContextData {
	genres: GenreResponseProps[]
	selectedGenre: GenreResponseProps
	selectedGenreId: number
	movies: MovieProps[]
	handleClickButton: (id: number) => void
}

export interface MoviesProviderProps {
	children: ReactNode
}

export interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

export interface MovieProps {
	imdbID: string;
	Title: string;
	Poster: string;
	Ratings: Array<{
		Source: string;
		Value: string;
	}>;
	Runtime: string;
}
