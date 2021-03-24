import * as React from "react";
import { Text, TextInput, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  const [data, setData] = React.useState([]);
  const getPosts = () => {
    return fetch("https://jsonbox.io/box_1a966ae499308f58279d")
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          setData(json);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getPosts();

  // const data = await fetch(
  //   "https://jsonbox.io/box_1a966ae499308f58279d"
  // ).then((res) => res.json());
  // const postData = data ? data[-1].post : "";
  // console.log(postData);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Button title="Refresh" onPress={() => setData([])} />

      {data.length ? (
        data.map((e, i) => (
          <Text key={i} style={{ margin: 10 }}>
            Post: {e.post}
          </Text>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen

          fetch("https://jsonbox.io/box_1a966ae499308f58279d", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              post: postText,
            }),
          });
          navigation.navigate("Home", { post: postText });
        }}
      />
    </>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "VoteChain" }}
        />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
