import { Image, Pressable } from 'react-native'
import { styles } from './styles'

interface Movie {
  id: number
  poster_path: string
}

interface CardMoviesProps {
  data: Movie
  onPress?: () => void
}

export function CardMovie({ data, onPress }: CardMoviesProps) {
  return (
    <Pressable onPress={onPress} style={styles.cardMovie}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        }}
        alt=""
        style={styles.cardImage}
      />
    </Pressable>
  )
}
