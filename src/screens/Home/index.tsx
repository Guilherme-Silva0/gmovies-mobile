import { Text, TextInput, View } from 'react-native'
import { styles } from './styles.ts'

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você quer assistir?</Text>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar filme" />
      </View>
    </View>
  )
}
