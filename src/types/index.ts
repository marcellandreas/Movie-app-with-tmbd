export interface Movie {
  id: number
  title?: string
  name?: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  overview: string
  media_type?: string
  genres?: Genre[]
  genre_ids?: number[]
}

export interface Genre {
  id: number
  name: string
}

export interface Cast {
  id: number
  name: string
  profile_path: string
  character: string
}

export interface Video {
  id: string
  key: string
  name: string
  type: string
}

export interface ApiResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface DataFilmState {
  dataFilmNowPlaying: Movie[]
  dataFilmComingSoon: Movie[]
  dataFilmById: Movie | null
  genres: Genre[]
  dataPopular: {
    film: Movie[]
  }
  counterPage: {
    total_pages: number
    page: number
  }
}