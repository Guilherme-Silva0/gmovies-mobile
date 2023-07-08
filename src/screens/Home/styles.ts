import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242a32',
  },

  header: {
    padding: 25,
  },

  title: {
    marginTop: 30,
    color: '#efefef',
    fontSize: 24,
    lineHeight: 45,
    fontWeight: 'bold',
  },

  searchContainer: {
    backgroundColor: '#67686d',
    height: 42,
    padding: 10,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  inputSearch: {
    width: '80%',
    color: '#efefef',
    paddingLeft: 15,
  },

  movieList: {
    alignItems: 'center',
    padding: 35,
    paddingBottom: 100,
  },
})
