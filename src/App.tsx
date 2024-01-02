import MenuSelect from "./Components/MenuSelect";

const country = ['Russia', 'China', 'Spane', 'Canada', 'USA']

const App = () => {
  return <MenuSelect placeholder='Choose country' data={country} />
}

export default App;