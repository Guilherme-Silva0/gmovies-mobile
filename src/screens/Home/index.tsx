import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from 'react-native'
import { styles } from './styles.ts'
import { MagnifyingGlass } from 'phosphor-react-native'
import { useEffect, useMemo, useState } from 'react'
import { api } from '../../services/api'
import { CardMovie } from '../../components/CardMovies'
import { useDebounce } from '../../hooks/useDebounce'

interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([])
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>()
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const { debounce } = useDebounce()

  const loadMoreData = async () => {
    setIsLoading(true)
    const response = await api.get('movie/popular', {
      params: {
        page,
      },
    })
    setDiscoveryMovies((oldMovies) => [...oldMovies, ...response.data.results])
    setPage((oldPage) => oldPage + 1)
    setIsLoading(false)
  }

  const filterMovies = async (query: string) => {
    setIsLoading(true)
    const response = await api.get('/search/movie', {
      params: {
        query,
      },
    })

    console.log('eita')

    if (response.data.results.length === 0) return

    setFilteredMovies(response.data.results)
    setIsLoading(false)
  }

  const handleSearch = (text: string) => {
    setSearch(text)

    if (text.length > 2) {
      debounce(() => filterMovies(text))
      return
    }

    setFilteredMovies([])
  }

  const movieData = useMemo(
    () => (search.length > 2 ? filteredMovies : discoveryMovies),
    [search.length, filteredMovies, discoveryMovies],
  )

  useEffect(() => {
    loadMoreData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>O que você quer assistir?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar filme"
            placeholderTextColor="#d1d5db"
            style={styles.inputSearch}
            value={search}
            onChangeText={handleSearch}
          />
          <MagnifyingGlass color="#fff" size={25} weight="light" />
        </View>
      </View>
      <View>
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={(item) => <CardMovie data={item.item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.movieList}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.6}
        />
        {isLoading && <ActivityIndicator size={50} color="#0296e5" />}
      </View>
    </View>
  )
}
