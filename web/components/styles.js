import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    width: "auto",
    height: "100%",
  },
  header: {
    fontSize: 40,
    marginTop: 15,
    marginBottom: 60,
    color: "black",
  },
  input: { width: "70%", marginBottom: 20 },
  tab: {
    height: "35%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "85%",
    marginHorizontal: "auto",
    backgroundColor: "#f4f4f4",
    borderWidth: 2,
    borderColor: "gray",
    borderStyle: "dashed",
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#f4f4f4",
    marginVertical: 8,
    marginHorizontal: 4,
    paddingHorizontal: 20,
    borderRadius: 4,
    height: 70,
  },
  cardText: {
    padding: 2,
    fontSize: 22,
    paddingLeft: 30,
    alignSelf: "center",
    backgroundColor: "transparent",
    width: "100%",
    fontWeight: "bold",
    color: "black",
  },
});

export { styles };
