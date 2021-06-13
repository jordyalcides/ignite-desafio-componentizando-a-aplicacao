import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { api } from "../../services/api";
import { GenreResponseProps, MovieProps, MoviesContextData, MoviesProviderProps } from './types'


const MoviesContext = createContext<MoviesContextData>(
	{} as MoviesContextData
)

export function MoviesProvider({ children }: MoviesProviderProps){

	const [genres, setGenres] = useState<GenreResponseProps[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
	const [selectedGenreId, setSelectedGenreId] = useState(1);

	const [movies, setMovies] = useState<MovieProps[]>([]);

	useEffect(() => {
		api.get<GenreResponseProps[]>('genres').then(response => {
		  setGenres(response.data);
		});
	}, []);

	useEffect(() => {
		api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
		  setMovies(response.data);
		});

		api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
		  setSelectedGenre(response.data);
		})
	}, [selectedGenreId]);


	function handleClickButton(id: number) {
		setSelectedGenreId(id);
	}

	return (
		<MoviesContext.Provider
			value={{
				genres,
				selectedGenre,
				selectedGenreId,
				movies,
				handleClickButton
			}}>
			{children}
		</MoviesContext.Provider>
	)
}

export function useMovies(){
	return useContext(MoviesContext)
}