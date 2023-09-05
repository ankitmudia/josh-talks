import { Inter } from "next/font/google";
import StartPage from "./StartPage";
import axios from "axios";

export default function Home(props) {
  return (
    <>
      <StartPage data={props} />
    </>
  );
}

export async function getStaticProps() {
  try {
    // Fetch initial data
    const response = await axios.get("https://opentdb.com/api.php?amount=15");
    const initialData = response.data.results;

    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return {
      props: {
        initialData: {},
      },
    };
  }
}
