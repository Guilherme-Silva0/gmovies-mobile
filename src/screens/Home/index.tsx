import { FlatList, Text, TextInput, View } from 'react-native'
import { styles } from './styles.ts'
import { MagnifyingGlass } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { CardMovie } from '../../components/CardMovies'

interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([])

  const loadMoreData = async () => {
    const response = await api.get('movie/popular')
    setDiscoveryMovies(response.data.results)
  }

  useEffect(() => {
    loadMoreData()
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
          />
          <MagnifyingGlass color="#fff" size={25} weight="light" />
        </View>
      </View>
      <View>
        <FlatList
          data={discoveryMovies}
          numColumns={3}
          renderItem={(item) => <CardMovie data={item.item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.movieList}
        />
      </View>
    </View>
  )
}
